import pool from '../db/database.mjs';
  
  const getCount=async(req,res)=>{try {
    const conferenceCountResult = await pool.query('SELECT COUNT(*) FROM conference_paper');
    const researchCountResult = await pool.query('SELECT COUNT(*) FROM research_paper');
    const journalCountResult = await pool.query('SELECT COUNT(*) FROM journal_paper');
    const bookCountResult = await pool.query('SELECT COUNT(*) FROM book_chapters');
    console.log(researchCountResult);
    res.json({
        researchPaperCount: researchCountResult.rows[0].count,
        conferencePaperCount: conferenceCountResult.rows[0].count,
        journalPaperCount: journalCountResult.rows[0].count,
        bookChaptersCount: bookCountResult.rows[0].count,
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}};


const getresearchPaper=async(req,res)=>{try {
    const researchPaperResult = await pool.query('SELECT * FROM research_paper');
    res.json(researchPaperResult.rows);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}};


const getconferencePaper=async(req,res)=>{try {
    const conferencePaperResult = await pool.query('SELECT * FROM conference_paper');
    res.json(conferencePaperResult.rows);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}};


const getbookChapters=async(req,res)=>{
    try {
        const bookChaptersResult = await pool.query('SELECT * FROM book_chapters');
        res.json(bookChaptersResult.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getjournalPaper=async(req,res)=>{
const { startMonth, startYear, endMonth, endYear } = req.query;

    if (!startMonth || !startYear || !endMonth || !endYear) {
        try {
            const journalPaperResult = await pool.query('SELECT * FROM journal_paper');
            res.json(journalPaperResult.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        try {
            const query = `
                SELECT * 
                FROM journal_paper 
                WHERE 
                    ("Year of Publication" = $1 AND "Month of Publication" >= $2) 
                    OR 
                    ("Year of Publication" = $3 AND "Month of Publication" <= $4) 
                    OR 
                    ("Year of Publication" > $1 AND "Year of Publication" < $3)
            `;
    
            const journalPaperResult = await pool.query(query, [startYear, startMonth, endYear, endMonth]);
            res.json(journalPaperResult.rows);
        } catch (error) {
            console.error('Error fetching journal papers:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }};


export{getCount,getresearchPaper,getconferencePaper,getbookChapters,getjournalPaper};