import React, { useState, useEffect } from 'react';
import { fetchJournalWithFilters } from '../api'; // Import your API function
import TableView from './TableView'; // Import your TableView component

function JournalPapersWithFilter() {
    const [data, setData] = useState([]);
    const [startMonth, setStartMonth] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endYear, setEndYear] = useState('');

    // Fetch all journal papers on initial load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchJournalWithFilters();
            setData(response.data);
        };
        fetchData();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Call the API with the user-provided filters
        const response = await fetchJournalWithFilters(startMonth, startYear, endMonth, endYear);
        setData(response.data); // Update the data to display the filtered results
    };

    const handleFilter = async()=>{
        console.log("Hii");
        console.log(startMonth,startYear,endMonth,endYear);
        const response = await fetchJournalWithFilters(startMonth,startYear,endMonth,endYear);
        setData(response.data);
    }



    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Journal Papers</h2>

            {/* Form for input fields */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex space-x-4">
                    <input
                        type="number"
                        placeholder="Start Month"
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        type="number"
                        placeholder="Start Year"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        type="number"
                        placeholder="End Month"
                        value={endMonth}
                        onChange={(e) => setEndMonth(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        type="number"
                        placeholder="End Year"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        className="border p-2"
                    />
                    <button type="submit" onClick={handleFilter} className="bg-blue-500 text-white p-2">
                        Submit
                    </button>
                </div>
            </form>

            {/* Displaying the data in a table */}
            <TableView data={data} />
        </div>
    );
}



export default JournalPapersWithFilter;





