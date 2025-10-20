import express from 'express';
import { query } from '../database/init';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

// Get all classes
router.get('/', authMiddleware, (req, res) => {
  try {
    const classes = query(`
      SELECT c.*, u.name as teacher_name,
             (SELECT COUNT(*) FROM users WHERE role = 'student' AND grade = c.grade) as students
      FROM classes c
      JOIN users u ON c.teacher_id = u.id
    `);

    res.json(classes);
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get class by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const results = query(`
      SELECT c.*, u.name as teacher_name
      FROM classes c
      JOIN users u ON c.teacher_id = u.id
      WHERE c.id = ?
    `, [req.params.id]);
    const classData = results[0];

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(classData);
  } catch (error) {
    console.error('Get class error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

