import React from 'react';

const JobList = ({ jobResults }) => {
    return (
        <div className="mt-4">
            {jobResults.length === 0 ? (
                <p className="text-gray-600">No jobs found</p>
            ) : (
                <div className="grid gap-4 jobs">
                    {jobResults.map((job, index) => (
                        <div key={index} className="border border-gray-300 shadow-lg bg-white rounded-lg ">
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2"><b>Job:</b>{job.job_name}</h2>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2"><b>Company: </b>{job.company_name}</h3>
                                <p className="text-sm text-gray-600 mb-2"><b>Skills:</b> {job.skills}</p>
                                <p className="text-sm text-gray-600 mb-2"><b>Location:</b> {job.location}</p>
                                <p className="text-sm text-gray-600 mb-2"><b>Posted Time:</b> {job.posted_date}</p>
                                <a href={job.more_info_link} className="more-info px-4 py-2" target="_blank" rel="noopener noreferrer">More Info</a>
                                <hr/><br/>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobList;
