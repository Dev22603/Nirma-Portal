// import { Router } from 'express';
// import pool from '../db/database.mjs';

// const router = Router();

// router.get('/journalPaper', async (req, res) => {
//     try {
//         const journalPaperResult = await pool.query('select * from journal_paper');
//         res.json(journalPaperResult.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export default router;
import { Router } from 'express';
import pool from '../db/database.mjs';

const router = Router();

router.get('/journalPaper', async (req, res) => {
    const { startMonth, startYear, endMonth, endYear } = req.query;

    if (!startMonth || !startYear || !endMonth || !endYear) {
        // return res.status(400).json({ error: 'Missing required query parameters' });
        try {
                    const journalPaperResult = await pool.query('select * from journal_paper');
                    res.json(journalPaperResult.rows);
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
    }
    else
    {

    try {
        const query = `
        SELECT * 
        FROM journal_paper 
        WHERE 
            ( "Year of Publication" = $1 AND "Month of Publication" >= $2 ) 
            OR 
            ( "Year of Publication" = $3 AND "Month of Publication" <= $4 ) 
            OR 
            ( "Year of Publication" > $1 AND "Year of Publication" < $3 )
    `;
    
        const journalPaperResult = await pool.query(query, [startYear, startMonth, endYear, endMonth]);
        res.json(journalPaperResult.rows);
    } catch (error) {
        console.error('Error fetching journal papers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
});

export default router;


