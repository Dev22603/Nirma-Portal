import { Router } from 'express';
import pool from '../db/database.mjs';
import {getbookChapters, getconferencePaper, getCount, getjournalPaper, getresearchPaper} from '../controllers/allcontroller.mjs';

const router = Router();

// Counts route
router.get('/counts',getCount);


// Research Paper route
router.get('/researchPaper',getresearchPaper);

// Conference Paper route
router.get('/conferencePaper', getconferencePaper);

// Book Chapters route
router.get('/bookChapters', getbookChapters);

// Journal Paper route with filters
router.get('/journalPaper', getjournalPaper);

export default router;
