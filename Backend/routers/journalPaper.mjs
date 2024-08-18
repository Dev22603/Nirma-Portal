import { Router } from 'express';
import pool from '../db/database.mjs';

const router = Router();

router.get('/journalPaper', async (req, res) => {
    try {
        const journalPaperResult = await pool.query('select * from journal_paper');
        res.json(journalPaperResult.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
