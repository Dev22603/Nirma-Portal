import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const fetchCounts = () => api.get('/counts');
export const fetchResearch = () => api.get('/researchPaper');
export const fetchConferences = () => api.get('/conferencePaper');
export const fetchbookChapters = () => api.get('/bookChapters');
// export const fetchJournal = () => api.get('/journalPaper');
export const fetchJournalWithFilters = (startMonth = '', startYear = '', endMonth = '', endYear = '') => {
    console.log(`/journalPaper?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`);
    return api.get(`/journalPaper?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`);
};









