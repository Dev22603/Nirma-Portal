import React, { useState, useEffect } from 'react';
import { fetchCounts, fetchResearch, fetchConferences } from './api';
import TableView from './components/TableView';

function App() {
    const [counts, setCounts] = useState({ researchPaperCount: 0, conferencePaperCount: 0 });
    const [view, setView] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchCounts();
            setCounts(response.data);
            console.log(response.data);
        };
        fetchData();
    }, []);

    const handleViewChange = async (view) => {
        setView(view);
        let response;
        if (view === 'research') {
            response = await fetchResearch();
        } else {
            response = await fetchConferences();
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

            {view && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        {view === 'research' ? 'Research Papers' : 'Conference Papers'}
                    </h2>
                    <TableView data={data} />
                </div>
            )}
        </div>
    );
}

export default App;
