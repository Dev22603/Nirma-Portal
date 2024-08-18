import { Router } from 'express';
import pool from '../db/database.mjs';

const router = Router();

router.get('/researchPaper', async (req, res) => {
    try {
        const researchPaperResult = await pool.query('SELECT * FROM research_paper');
        res.json(researchPaperResult.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
