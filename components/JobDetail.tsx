import React from "react";

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
    requiredSkills: string[]; // Added requiredSkills to match API
    paymentOption: {
        currency: string;
        paymentType: string;
    };
}

interface JobDetailProps {
    job: JobPosting;
}

const JobDetail = ({ job }: JobDetailProps) => {
    return (
        <div className="flex p-6 gap-3">
            {/* First div: Description, Responsibilities, Ideal Candidate, When and Where */}
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-bold text-black">Description</h2>
                    <p className="text-black text-s">{job.description}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-black">Responsibilities</h2>
                    <ul className="list-disc pl-5 text-black text-s">
                        {job.responsibilities.split('\n').map((responsibility: string, index: number) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-black">Ideal Candidate</h2>
                    <p className="text-gray-700 text-s">{job.idealCandidate}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-black">When and Where</h2>
                    <p className="text-gray-700 text-s">{job.whenAndWhere}</p>
                </div>
            </div>

            {/* Second div: About, Categories, Required Skills */}
            <div className="p-4">
                {/* About Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#56CDAD] mb-2">About</h2>
                    <div className="flex flex-row flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">⏰</span>
                            <span>Posted On</span>
                            <span className="ml-auto font-medium">{new Date(job.datePosted).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">⏳</span>
                            <span>Deadline</span>
                            <span className="ml-auto font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">📍</span>
                            <span>Location</span>
                            <span className="ml-auto font-medium">{job.location.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">📅</span>
                            <span>Start Date</span>
                            <span className="ml-auto font-medium">{new Date(job.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">📅</span>
                            <span>End Date</span>
                            <span className="ml-auto font-medium">{new Date(job.endDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#56CDAD] mb-2">Categories</h2>
                    <div className="flex gap-2 flex-wrap">
                        {job.categories.map((category: string, index: number) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 rounded-full bg-orange-200 text-orange-800"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Required Skills Section */}
                <div>
                    <h2 className="text-xl font-bold text-[#56CDAD] mb-2">Required Skills</h2>
                    <div className="flex gap-2 flex-wrap">
                        {job.requiredSkills.map((skill: string, index: number) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 rounded-full bg-purple-200 text-[#4640DE]"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;