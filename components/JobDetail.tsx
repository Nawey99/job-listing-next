import React from "react";

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

interface JobDetailProps {
    job: JobPosting;
}

const JobDetail = ({ job }: JobDetailProps) => {
    return (
        <div className="flex p-6 gap-3">
            {/* First div: Description, Responsibilities, Ideal Candidate, When and Where (unchanged) */}
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-bold text-black">Description</h2>
                    <p className="text-black text-s">{job.description}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-black">Responsibilities</h2>
                    <ul className="list-disc pl-5 text-black text-s">
                        {job.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-black">Ideal Candidate</h2>
                    <p className="text-gray-700 text-s">
                        <strong>Age:</strong> {job.ideal_candidate.age}
                        <br />
                        <strong>Gender:</strong> {job.ideal_candidate.gender}
                        <br />
                        <strong>Traits:</strong>
                        <ul className="list-disc pl-5">
                            {job.ideal_candidate.traits.map((trait, index) => (
                                <li key={index}>{trait}</li>
                            ))}
                        </ul>
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-black">When and Where</h2>
                    <p className="text-gray-700 text-s">{job.when_where}</p>
                </div>
            </div>

            {/* Second div: About, Categories, Required Skills (updated to match image with wider About section) */}
            <div className="p-4">
                {/* About Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#56CDAD] mb-2">About</h2>
                    <div className="flex flex-row flex-wrap gap-4"> {/* Changed to flex-row with flex-wrap and gap-4 */}
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">⏰</span> {/* Placeholder icon */}
                            <span>Posted On</span>
                            <span className="ml-auto font-medium">{job.about.posted_on}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">⏳</span> {/* Placeholder icon */}
                            <span>Deadline</span>
                            <span className="ml-auto font-medium">{job.about.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">📍</span> {/* Placeholder icon */}
                            <span>Location</span>
                            <span className="ml-auto font-medium">{job.about.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">📅</span> {/* Placeholder icon */}
                            <span>Start Date</span>
                            <span className="ml-auto font-medium">{job.about.start_date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-blue-500">📅</span> {/* Placeholder icon */}
                            <span>End Date</span>
                            <span className="ml-auto font-medium">{job.about.end_date}</span>
                        </div>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#56CDAD] mb-2">Categories</h2>
                    <div className="flex gap-2 flex-wrap">
                        {job.about.categories.map((category, index) => (
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
                        {job.about.required_skills.map((skill, index) => (
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