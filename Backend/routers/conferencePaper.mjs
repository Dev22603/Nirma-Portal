import { Router } from 'express';
import pool from '../db/index.mjs';

const router = Router();

router.get('/conferencePaper', async (req, res) => {
    try {
        const conferencePaperResult = await pool.query('SELECT * FROM conference_paper');
        res.json(conferencePaperResult.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
