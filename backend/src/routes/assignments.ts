import express from 'express';
import { query } from '../database/init';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

// Get all assignments
router.get('/', authMiddleware, (req, res) => {
  try {
    const assignments = query(`
      SELECT a.*, c.name as class_name, c.subject
      FROM assignments a
      JOIN classes c ON a.class_id = c.id
      ORDER BY a.due_date DESC
    `);

    res.json(assignments);
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get assignment by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const results = query(`
      SELECT a.*, c.name as class_name, c.subject
      FROM assignments a
      JOIN classes c ON a.class_id = c.id
      WHERE a.id = ?
    `, [req.params.id]);
    const assignment = results[0];

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (error) {
    console.error('Get assignment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

