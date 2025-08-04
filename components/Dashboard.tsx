import React from "react";
import JobCard from "./JobCard";
import Link from "next/link";

interface JobPosting {
    id: string;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    idealCandidate: string;
    categories: string[];
    opType: string;
    startDate: string;
    endDate: string;
    deadline: string;
    location: string[];
    whenAndWhere: string;
    orgName: string;
    logoUrl: string;
    isBookmarked: boolean;
    isRolling: boolean;
    datePosted: string;
    applicantsCount: number;
    viewsCount: number;
    orgID: string;
    createdBy: string;
    orgPrimaryPhone: string;
    orgEmail: string;
    orgWebsite: string;
    isPaid: boolean;
    average_rating: number;
    total_reviews: number;
    engagementType: string;
    requiredSkills: string[];
    paymentOption: {
        currency: string;
        paymentType: string;
    };
}

const Dashboard = async () => {
    try {
        const response = await fetch('https://akil-backend.onrender.com/opportunities/search', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch opportunities');
        }

        const { data: jobs }: { data: JobPosting[] } = await response.json();

        return (
            <div className="mx-20 my-30">
                <div className="flex flex-col gap-10">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p className="text-black text-2xl font-bold">Opportunities</p>
                            <p className="text-gray-500">Showing {jobs.length} results</p>
                        </div>
                        <div className="flex text-black gap-2">
                            <p className="text-gray-500">Sort by: </p>
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

                    {jobs.map((job) => (
                        <Link
                            key={job.id}
                            href={`/jobs/${job.id}`}
                            className="w-full h-auto rounded-3xl border border-gray-300 hover:shadow-md p-4 block"
                        >
                            <JobCard
                                id={job.id}
                                title={job.title}
                                description={job.description}
                                company={job.orgName}
                                location={job.location.join(', ')}
                                image={job.logoUrl || '/placeholder.png'} // Fallback image
                                categories={job.categories}
                                mode={job.opType}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return (
            <div className="mx-20 my-30">
                <p className="text-red-500">Failed to load opportunities. Please try again later.</p>
            </div>
        );
    }
};

export default Dashboard;
