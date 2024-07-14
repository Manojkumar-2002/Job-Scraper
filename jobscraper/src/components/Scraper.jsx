import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import JobList from './JobList';

const Scraper = () => {
    const [skill, setSkill] = useState('');
    const [jobResults, setJobResults] = useState([]);
    const [searched, setSearched] = useState(false); // Track if user has searched

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://127.0.0.1:5000/find_jobs', {
                params: { skill }
            });
            setJobResults(response.data);
            setSearched(true); // Set searched to true after successful search
        } catch (error) {
            console.error('Error fetching job results:', error);
        }
    };

    return (
        <>
            <h1 className="text-10xl font-bold mb-4 text-center Head">Job Scraper</h1>
            <div className="container">


                <div>
                    {searched && jobResults.length === 0 ? (
                        <p className="text-gray-600 text-center mt-4">No job results found.</p>
                    ) : (
                        jobResults.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold mt-2">Job Results</h2><hr/><hr/>
                                <div className="grid gap-4">
                                    <JobList jobResults={jobResults} />
                                </div>
                            </div>
                        )
                    )}
                </div>
                <SearchForm skill={skill} setSkill={setSkill} handleSearch={handleSearch} />

            </div>
        </>
    );
};

export default Scraper;
