import express from 'express';
import { query } from '../database/init';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

// Get all announcements
router.get('/', authMiddleware, (req, res) => {
  try {
    const announcements = query(`
      SELECT a.*, u.name as author
      FROM announcements a
      JOIN users u ON a.author_id = u.id
      ORDER BY a.date DESC
    `);

    res.json(announcements);
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get announcement by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const results = query(`
      SELECT a.*, u.name as author
      FROM announcements a
      JOIN users u ON a.author_id = u.id
      WHERE a.id = ?
    `, [req.params.id]);
    const announcement = results[0];

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    console.error('Get announcement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

