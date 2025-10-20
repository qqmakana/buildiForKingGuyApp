import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../database/init';
import { comparePassword, generateToken } from '../utils/auth';

const router = express.Router();

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
], (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const users = query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);

    // Remove password from response
    delete user.password;

    // Get subjects if student
    let subjects: string[] = [];
    if (user.role === 'student') {
      subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science'];
    }

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        studentId: user.student_id,
        teacherId: user.teacher_id,
        grade: user.grade,
        class: user.class,
        subjects,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', (req, res) => {
  // This would normally use authMiddleware, simplified for now
  res.json({ message: 'User profile endpoint' });
});

export default router;

