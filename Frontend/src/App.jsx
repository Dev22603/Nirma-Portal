import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { fetchCounts, fetchResearch, fetchConferences, fetchbookChapters } from './api';
import TableView from './components/TableView';
import JournalPapersWithFilter from './components/JournalPapersWithFilter'; // Import the new component

function Home() {
    const [counts, setCounts] = useState({
        researchPaperCount: 0, 
        conferencePaperCount: 0,
        bookChapterCount: 0,    
        journalCount: 0    
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchCounts();
            console.log('Counts Response:', response.data);  // Check if all counts are present
            
            // Make sure to use the exact keys from the API response
            setCounts({
                researchPaperCount: response.data.researchPaperCount,
                conferencePaperCount: response.data.conferencePaperCount,
                bookChapterCount: response.data.bookChaptersCount,  // Correct key
                journalCount: response.data.journalPaperCount       // Correct key
            });
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Number of research papers: 
                <Link to="/researchpaper" className="text-blue-500 underline">
                    {counts.researchPaperCount}
                </Link>
            </h1>
            <h1 className="text-2xl font-bold mb-4">
                Number of conference papers: 
                <Link to="/conferencepaper" className="text-blue-500 underline">
                    {counts.conferencePaperCount}
                </Link>
            </h1>
            <h1 className="text-2xl font-bold mb-4">
                Number of book chapters: 
                <Link to="/bookchapters" className="text-blue-500 underline">
                    {counts.bookChapterCount}
                </Link>
            </h1>
            <h1 className="text-2xl font-bold mb-4">
                Number of journal papers: 
                <Link to="/journalpaper" className="text-blue-500 underline">
                    {counts.journalCount}
                </Link>
            </h1>
        </div>
    );
}

function ResearchPapers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchResearch();
            setData(response.data);
        };
        fetchData();
    }, []);

    return <TableView data={data} />;
}

function ConferencePapers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchConferences();
            setData(response.data);
        };
        fetchData();
    }, []);

    return <TableView data={data} />;
}

function BookChapters() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchbookChapters();
            setData(response.data);
        };
        fetchData();
    }, []);

    return <TableView data={data} />;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/researchpaper" element={<ResearchPapers />} />
                <Route path="/conferencepaper" element={<ConferencePapers />} />
                <Route path="/bookchapters" element={<BookChapters />} />
                <Route path="/journalpaper" element={<JournalPapersWithFilter />} /> {/* Use the new component */}
            </Routes>
        </Router>
    );
}

export default App;













