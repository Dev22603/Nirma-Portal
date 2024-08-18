import { Router } from 'express';
import pool from '../db/database.mjs';

const router = Router();

router.get('/bookChapters', async (req, res) => {
    try {
        const bookChaptersResult = await pool.query('SELECT * FROM book_chapters');
        res.json(bookChaptersResult.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
