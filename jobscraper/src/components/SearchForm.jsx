import React from 'react';
import { FiSearch } from 'react-icons/fi'; // Assuming you're using react-icons for icons

const SearchForm = ({ skill, setSkill, handleSearch }) => {
    return (
        <>
            <form onSubmit={handleSearch} id="jobSearchForm" >
                    <input type="search" id="default-search" class="form-input block w-full text-sm " value={skill}
                    onChange={(e) => setSkill(e.target.value)} placeholder="Enter Skill" required />
                    <button type="submit" class="bg-transparent-700 hover:bg-blue-800 "><FiSearch /></button>
            </form>

        </>
    );
};

export default SearchForm;
