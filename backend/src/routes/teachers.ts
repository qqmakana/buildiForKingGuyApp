import express from 'express';
import { query } from '../database/init';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

// Get all teachers
router.get('/', authMiddleware, (req, res) => {
  try {
    const teachers = query(`
      SELECT id, email, name, teacher_id
      FROM users
      WHERE role = 'teacher'
      ORDER BY name ASC
    `);

    res.json(teachers);
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get teacher by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const results = query(`
      SELECT id, email, name, teacher_id
      FROM users
      WHERE role = 'teacher' AND id = ?
    `, [req.params.id]);
    const teacher = results[0];

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json(teacher);
  } catch (error) {
    console.error('Get teacher error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

