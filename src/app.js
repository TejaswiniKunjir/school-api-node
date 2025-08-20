import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import schoolsRouter from './routes/schools.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({ status: true, message: 'School API is running' });
});

app.use('/schools', schoolsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: false, message: 'Not found' });
});

export default app;
