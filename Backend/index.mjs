import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import countsRouter from './routers/counts.mjs';
import conferencePaper from './routers/conferencePaper.mjs';
import researchPaper from './routers/researchPaper.mjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use('/api', countsRouter);
app.use('/api', conferencePaper);
app.use('/api', researchPaper);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
