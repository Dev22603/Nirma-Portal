import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import countsRouter from './routers/counts.mjs';
import allRoutes from './routers/allRoutes.mjs';
// import conferencePaper from './routers/conferencePaper.mjs';
// import researchPaper from './routers/researchPaper.mjs';
// import journalPaper from './routers/journalPaper.mjs';
// import bookChapters from './routers/bookChapters.mjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.use('/api', countsRouter);
app.use('/api', allRoutes);
// app.use('/api', conferencePaper);
// app.use('/api', researchPaper);
// app.use('/api', journalPaper);
// app.use('/api', bookChapters);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
