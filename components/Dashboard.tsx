"use client";

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  orgName: string;
  categories: string[];
  opType: string;
  location: string[];
  logoUrl: string;
}

interface Bookmark {
  eventID: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [loadingBookmarkId, setLoadingBookmarkId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  // ... (All the useEffect and handler functions remain exactly the same) ...
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          "https://akil-backend.onrender.com/opportunities/search"
        );
        if (!res.ok) throw new Error("Failed to fetch opportunities");
        const data = await res.json();
        setJobs(data.data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      const fetchBookmarks = async () => {
        try {
          const res = await fetch(
            "https://akil-backend.onrender.com/bookmarks",
            {
              headers: { Authorization: `Bearer ${session.accessToken}` },
            }
          );
          if (res.ok) {
            const { data }: { data: Bookmark[] } = await res.json();
            const bookmarkedIds = new Set(
              data.map((bookmark) => bookmark.eventID)
            );
            setBookmarkedJobs(bookmarkedIds);
          } else {
            console.error("Failed to fetch bookmarks");
          }
        } catch (err) {
          console.error("Error fetching bookmarks:", err);
        }
      };
      fetchBookmarks();
    }
  }, [status, session]);

  const handleBookmarkToggle = async (jobId: string) => {
    if (status !== "authenticated" || !session?.accessToken) {
      alert("You must be logged in to bookmark jobs.");
      return;
    }
    if (loadingBookmarkId === jobId) return;

    setLoadingBookmarkId(jobId);

    const isCurrentlyBookmarked = bookmarkedJobs.has(jobId);
    const originalBookmarks = new Set(bookmarkedJobs);

    setBookmarkedJobs((prev) => {
      const newSet = new Set(prev);
      if (isCurrentlyBookmarked) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });

    const url = `https://akil-backend.onrender.com/bookmarks/${jobId}`;
    const method = isCurrentlyBookmarked ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });

      if (!response.ok) {
        alert("Failed to update bookmark. Please try again.");
        setBookmarkedJobs(originalBookmarks);
        console.error("API Error:", await response.text());
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      setBookmarkedJobs(originalBookmarks);
      console.error("Fetch Error:", error);
    } finally {
      setLoadingBookmarkId(null);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="mx-20 my-30">
        <p className="text-red-500">
          Failed to load opportunities. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-20 my-5">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <p className="text-black text-2xl font-bold">Opportunities</p>
            <p className="text-gray-500">
              Showing {filteredJobs.length} results
            </p>
          </div>
          <div className="flex text-black gap-2">
            <p className="text-gray-500">Sort by:</p>
            <h3>
              Most relevant{" "}
              <svg
                className="w-4 h-4 inline-block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.1 1.02l-4.25 4.5a.75.75 0 01-1.1 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </h3>
          </div>
        </div>

        <div className="w-full mb-6">
          {/* --- THIS IS THE ONLY LINE THAT HAS CHANGED --- */}
          <input
            type="text"
            placeholder="Search by job title..."
            className="w-full p-3 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredJobs.map((job) => (
          <Link
            key={`${job.id}-${bookmarkedJobs.has(job.id)}`}
            href={`/jobs/${job.id}`}
            className="w-full h-auto rounded-3xl border border-gray-300 hover:shadow-md p-4 block"
          >
            <JobCard
              id={job.id}
              title={job.title}
              description={job.description}
              company={job.orgName}
              location={job.location.join(", ")}
              image={job.logoUrl || "/placeholder.png"}
              categories={job.categories}
              mode={job.opType}
              isAuthenticated={status === "authenticated"}
              isBookmarked={bookmarkedJobs.has(job.id)}
              onBookmarkToggle={() => handleBookmarkToggle(job.id)}
              isLoading={loadingBookmarkId === job.id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
