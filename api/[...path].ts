// Vercel Serverless Function for all API routes
import express from 'express';
import cors from 'cors';
import authRoutes from '../backend/src/routes/auth';
import classRoutes from '../backend/src/routes/classes';
import gradeRoutes from '../backend/src/routes/grades';
import assignmentRoutes from '../backend/src/routes/assignments';
import attendanceRoutes from '../backend/src/routes/attendance';
import studentRoutes from '../backend/src/routes/students';
import teacherRoutes from '../backend/src/routes/teachers';
import announcementRoutes from '../backend/src/routes/announcements';
import { initDatabase } from '../backend/src/database/init';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/announcements', announcementRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Andile M-Afrika API is running' });
});

// Initialize database
let dbInitialized = false;
app.use(async (req, res, next) => {
  if (!dbInitialized) {
    try {
      await initDatabase();
      dbInitialized = true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
  }
  next();
});

export default app;

