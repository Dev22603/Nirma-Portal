import React, { useState, useEffect } from 'react';
import { fetchCounts, fetchResearch, fetchConferences, fetchbookChapters, fetchJournal } from './api'; // Import functions for all data types
import TableView from './components/TableView';

function App() {
    const [counts, setCounts] = useState({
        researchPaperCount: 0, 
        conferencePaperCount: 0,
        bookChapterCount: 0,          // State for book chapters count
        journalCount: 0                // State for journal papers count
    });

    const [view, setView] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchCounts();  // Assuming fetchCounts now returns counts for all four types
            setCounts(response.data);
            console.log(response.data);
        };
        fetchData();
    }, []);

    const handleViewChange = async (view) => {
        setView(view);
        let response;

        switch(view) {
            case 'research':
                response = await fetchResearch();
                break;
            case 'conferences':
                response = await fetchConferences();
                break;
            case 'bookchapters':
                response = await fetchbookChapters();
                break;
            case 'journal':
                response = await fetchJournal();
                break;
            default:
                response = { data: [] };
        }

        console.log(response);
        setData(response.data);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Number of research papers: 
                <a href="#" className="text-blue-500 underline" onClick={() => handleViewChange('research')}>
                    {counts.researchPaperCount}
                </a>
            </h1>
            <h1 className="text-2xl font-bold mb-4">
                Number of conference papers: 
                <a href="#" className="text-blue-500 underline" onClick={() => handleViewChange('conferences')}>
                    {counts.conferencePaperCount}
                </a>
            </h1>
            <h1 className="text-2xl font-bold mb-4">
                Number of booksChapters: 
                <a href="#" className="text-blue-500 underline" onClick={() => handleViewChange('bookchapters')}>
                    {counts.bookChapterCount}
                </a>
            </h1>
            <h1 className="text-2xl font-bold mb-4">
                Number of JournalPapers: 
                <a href="#" className="text-blue-500 underline" onClick={() => handleViewChange('journal')}>
                    {counts.journalCount}
                </a>
            </h1>

            {view && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        {view === 'research' ? 'Research Papers' :
                         view === 'conferences' ? 'Conference Papers' :
                         view === 'bookchapters' ? 'Book Chapters' :
                         'Journal Papers'}
                    </h2>
                    <TableView data={data} />
                </div>
            )}
        </div>
    );
}

export default App;
