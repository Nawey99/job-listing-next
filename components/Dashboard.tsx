import React from "react";
import JobCard from "./JobCard";
import Link from "next/link";
import jobPostings from "../data/jobs.json";
import JobDetail from "./JobDetail";

interface JobPosting {
    title: string;
    description: string;
    responsibilities: string[];
    ideal_candidate: {
        age: string;
        gender: string;
        traits: string[];
    };
    when_where: string;
    about: {
        posted_on: string;
        deadline: string;
        location: string;
        start_date: string;
        end_date: string;
        categories: string[];
        required_skills: string[];
    };
    company: string;
    image: string;
}

const Dashboard = () => {
    const jobs: JobPosting[] = jobPostings.job_postings;

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

                {jobs.map((job, index) => (
                    <Link
                        key={index}
                        href={`/job/${index}`} // or job.id if you have one
                        className="w-full h-auto rounded-3xl border border-gray-300 hover:shadow-md p-4 block"
                    >
                        <JobCard
                            id={index}
                            title={job.title}
                            description={job.description}
                            company={job.company}
                            location={job.about.location}
                            image={job.image}
                            categories={job.about.categories}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
