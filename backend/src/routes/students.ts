import express from 'express';
import { query } from '../database/init';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

// Get all students
router.get('/', authMiddleware, (req, res) => {
  try {
    const students = query(`
      SELECT id, email, name, student_id, grade, class
      FROM users
      WHERE role = 'student'
      ORDER BY name ASC
    `);

    res.json(students);
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const results = query(`
      SELECT id, email, name, student_id, grade, class
      FROM users
      WHERE role = 'student' AND id = ?
    `, [req.params.id]);
    const student = results[0];

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

