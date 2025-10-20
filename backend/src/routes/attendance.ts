import express from 'express';
import { query as dbQuery } from '../database/init';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

// Get attendance records
router.get('/', authMiddleware, (req, res) => {
  try {
    const { date, classId } = req.query;
    let sql = `
      SELECT a.*, u.name as student_name, u.student_id as student_number, c.name as class_name
      FROM attendance a
      JOIN users u ON a.student_id = u.id
      JOIN classes c ON a.class_id = c.id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (date) {
      sql += ' AND a.date = ?';
      params.push(date);
    }
    
    if (classId) {
      sql += ' AND a.class_id = ?';
      params.push(classId);
    }
    
    sql += ' ORDER BY a.date DESC, u.name ASC';
    
    const attendance = dbQuery(sql, params);

    res.json(attendance);
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

