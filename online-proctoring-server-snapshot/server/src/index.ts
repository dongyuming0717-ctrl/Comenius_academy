import express from 'express';
import path from 'path';
import cors from 'cors';
import proctoringRouter from './routes/proctoring.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const TMUA_DIR = path.resolve(process.cwd(), '../../papers/TMUA');

app.use(cors());
app.use(express.json());

app.use('/api/papers/tmua', express.static(TMUA_DIR));
app.use('/api', proctoringRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
