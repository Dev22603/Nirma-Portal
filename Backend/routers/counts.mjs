import { Router } from 'express';
import pool from '../db/database.mjs';

const router = Router();

router.get('/counts', async (req, res) => {
    try {
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
    }
});

export default router;
