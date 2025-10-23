// Vercel Serverless Function for Backend API
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'andile-m-afrika-school-secret-key-2024-super-secure';

// In-memory database for demo
const users = [
  {
    id: 1,
    email: 'student@andile.edu',
    password: '$2a$10$rK5HdNvWB.lK3yJ9BqYGqOqXqR6K8QJdCKZkN8nKGKqQvJ4mJ5nKG', // student123
    role: 'student',
    name: 'Student User'
  },
  {
    id: 2,
    email: 'teacher@andile.edu',
    password: '$2a$10$rK5HdNvWB.lK3yJ9BqYGqOqXqR6K8QJdCKZkN8nKGKqQvJ4mJ5nKG', // teacher123
    role: 'teacher',
    name: 'Teacher User'
  },
  {
    id: 3,
    email: 'admin@andile.edu',
    password: '$2a$10$rK5HdNvWB.lK3yJ9BqYGqOqXqR6K8QJdCKZkN8nKGKqQvJ4mJ5nKG', // admin123
    role: 'admin',
    name: 'Admin User'
  }
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Andile M-Afrika API is running' });
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Andile M-Afrika API is running' });
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user
app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Mock data endpoints
app.get('/api/classes', (req, res) => {
  res.json([
    { id: 1, name: 'Mathematics 101', teacher: 'Dr. Smith', students: 25 },
    { id: 2, name: 'Physics 201', teacher: 'Prof. Johnson', students: 20 },
    { id: 3, name: 'Chemistry 301', teacher: 'Dr. Williams', students: 18 }
  ]);
});

app.get('/api/grades', (req, res) => {
  res.json([
    { id: 1, subject: 'Mathematics', grade: 85, student: 'Student User' },
    { id: 2, subject: 'Physics', grade: 92, student: 'Student User' },
    { id: 3, subject: 'Chemistry', grade: 78, student: 'Student User' }
  ]);
});

app.get('/api/assignments', (req, res) => {
  res.json([
    { id: 1, title: 'Math Assignment 1', dueDate: '2025-11-01', status: 'pending' },
    { id: 2, title: 'Physics Lab Report', dueDate: '2025-10-28', status: 'submitted' },
    { id: 3, title: 'Chemistry Quiz', dueDate: '2025-10-25', status: 'completed' }
  ]);
});

app.get('/api/attendance', (req, res) => {
  res.json([
    { id: 1, date: '2025-10-22', status: 'present', class: 'Mathematics 101' },
    { id: 2, date: '2025-10-21', status: 'present', class: 'Physics 201' },
    { id: 3, date: '2025-10-20', status: 'absent', class: 'Chemistry 301' }
  ]);
});

app.get('/api/students', (req, res) => {
  res.json([
    { id: 1, name: 'Student User', email: 'student@andile.edu', grade: 'Grade 11' }
  ]);
});

app.get('/api/teachers', (req, res) => {
  res.json([
    { id: 1, name: 'Dr. Smith', email: 'smith@andile.edu', subject: 'Mathematics' },
    { id: 2, name: 'Prof. Johnson', email: 'johnson@andile.edu', subject: 'Physics' }
  ]);
});

app.get('/api/announcements', (req, res) => {
  res.json([
    { id: 1, title: 'Welcome to School', content: 'Welcome message', date: '2025-10-22' },
    { id: 2, title: 'Holiday Notice', content: 'Holiday information', date: '2025-10-20' }
  ]);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Export for Vercel Serverless
module.exports = app;
