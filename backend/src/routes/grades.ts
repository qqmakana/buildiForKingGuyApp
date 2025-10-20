import express from 'express';
import { query } from '../database/init';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

// Get grades
router.get('/', authMiddleware, (req, res) => {
  try {
    const grades = query(`
      SELECT g.*, u.name as student_name, c.name as class_name, c.subject
      FROM grades g
      JOIN users u ON g.student_id = u.id
      JOIN classes c ON g.class_id = c.id
      ORDER BY g.date DESC
    `);

    res.json(grades);
  } catch (error) {
    console.error('Get grades error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get grades by student
router.get('/student/:studentId', authMiddleware, (req, res) => {
  try {
    const grades = query(`
      SELECT g.*, c.name as class_name, c.subject
      FROM grades g
      JOIN classes c ON g.class_id = c.id
      WHERE g.student_id = ?
      ORDER BY g.date DESC
    `, [req.params.studentId]);

    res.json(grades);
  } catch (error) {
    console.error('Get student grades error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

