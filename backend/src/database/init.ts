import initSqlJs, { Database as SqlDatabase } from 'sql.js';
import { hashPassword } from '../utils/auth';
import * as fs from 'fs';
import * as path from 'path';

let db: SqlDatabase;
const dbPath = path.join(__dirname, '../../school.db');

export const initDatabase = async () => {
  const SQL = await initSqlJs();
  
  // Load existing database or create new one
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')),
      student_id TEXT,
      teacher_id TEXT,
      grade TEXT,
      class TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS classes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      grade TEXT NOT NULL,
      teacher_id TEXT NOT NULL,
      subject TEXT NOT NULL,
      schedule TEXT,
      room TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS grades (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      class_id TEXT NOT NULL,
      assignment TEXT NOT NULL,
      score REAL NOT NULL,
      max_score REAL NOT NULL,
      feedback TEXT,
      date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS assignments (
      id TEXT PRIMARY KEY,
      class_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      due_date DATE NOT NULL,
      total_points INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      class_id TEXT NOT NULL,
      date DATE NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('present', 'absent', 'late', 'excused')),
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author_id TEXT NOT NULL,
      priority TEXT NOT NULL CHECK(priority IN ('low', 'medium', 'high')),
      target_audience TEXT NOT NULL CHECK(target_audience IN ('all', 'students', 'teachers', 'parents')),
      date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Check if we need to seed data
  const result = db.exec('SELECT COUNT(*) as count FROM users');
  const userCount = result[0]?.values[0]?.[0] || 0;
  
  if (userCount === 0) {
    console.log('🌱 Seeding database with initial data...');
    seedDatabase();
  }

  // Save database to file
  saveDatabase();

  console.log('✅ Database initialized successfully');
};

const saveDatabase = () => {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
};

const seedDatabase = () => {
  const hashedPassword = hashPassword('admin123');
  const hashedTeacherPassword = hashPassword('teacher123');
  const hashedStudentPassword = hashPassword('student123');

  // Insert admin user
  db.run(`
    INSERT INTO users (id, email, password, name, role)
    VALUES (?, ?, ?, ?, ?)
  `, ['admin1', 'admin@andile.edu', hashedPassword, 'Administrator', 'admin']);

  // Insert teachers
  const teachers = [
    ['t1', 'john.smith@andile.edu', 'Mr. John Smith'],
    ['t2', 'sarah.johnson@andile.edu', 'Dr. Sarah Johnson'],
    ['t3', 'emily.williams@andile.edu', 'Mrs. Emily Williams'],
    ['t4', 'michael.brown@andile.edu', 'Mr. Michael Brown'],
    ['t5', 'david.lee@andile.edu', 'Prof. David Lee'],
  ];

  teachers.forEach(([id, email, name]) => {
    db.run(`
      INSERT INTO users (id, email, password, name, role, teacher_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [id, email, hashedTeacherPassword, name, 'teacher', id]);
  });

  // Insert teacher login
  db.run(`
    INSERT INTO users (id, email, password, name, role, teacher_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `, ['teacher1', 'teacher@andile.edu', hashedTeacherPassword, 'Demo Teacher', 'teacher', 'teacher1']);

  // Insert students
  const students = [
    ['s1', 'john.doe@student.andile.edu', 'John Doe', 'STU001', 'Grade 10', '10A'],
    ['s2', 'jane.smith@student.andile.edu', 'Jane Smith', 'STU002', 'Grade 10', '10A'],
    ['s3', 'mike.johnson@student.andile.edu', 'Mike Johnson', 'STU003', 'Grade 11', '11B'],
    ['s4', 'sarah.williams@student.andile.edu', 'Sarah Williams', 'STU004', 'Grade 11', '11A'],
    ['s5', 'tom.brown@student.andile.edu', 'Tom Brown', 'STU005', 'Grade 12', '12C'],
  ];

  students.forEach(([id, email, name, studentId, grade, cls]) => {
    db.run(`
      INSERT INTO users (id, email, password, name, role, student_id, grade, class)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, email, hashedStudentPassword, name, 'student', studentId, grade, cls]);
  });

  // Insert student login
  db.run(`
    INSERT INTO users (id, email, password, name, role, student_id, grade, class)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, ['student1', 'student@andile.edu', hashedStudentPassword, 'Demo Student', 'student', 'STU999', 'Grade 10', '10A']);

  // Insert classes
  const classes = [
    ['c1', 'Mathematics 101', 'Grade 10', 't1', 'Mathematics', 'Mon, Wed, Fri - 9:00 AM', 'A101', 'Advanced algebra and geometry'],
    ['c2', 'Physics', 'Grade 11', 't2', 'Science', 'Tue, Thu - 10:30 AM', 'B205', 'Classical mechanics'],
    ['c3', 'English Literature', 'Grade 10', 't3', 'English', 'Mon, Wed, Fri - 1:00 PM', 'C302', 'Literature analysis'],
    ['c4', 'Computer Science', 'Grade 11', 't4', 'Technology', 'Tue, Thu - 2:00 PM', 'D105', 'Programming with Python'],
    ['c5', 'History', 'Grade 10', 't5', 'Social Studies', 'Mon, Wed - 11:00 AM', 'E201', 'World history 1900-present'],
  ];

  classes.forEach(([id, name, grade, teacherId, subject, schedule, room, description]) => {
    db.run(`
      INSERT INTO classes (id, name, grade, teacher_id, subject, schedule, room, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, name, grade, teacherId, subject, schedule, room, description]);
  });

  // Insert announcements
  const announcements = [
    ['a1', 'Parent-Teacher Conference', 'Our annual parent-teacher conference will be held on October 25th.', 'admin1', 'high', 'all', '2025-10-20'],
    ['a2', 'Sports Day Event', 'The annual sports day will take place on October 28th.', 'admin1', 'medium', 'students', '2025-10-18'],
    ['a3', 'Mid-term Examination Schedule', 'Mid-term exams will begin on November 1st.', 'admin1', 'high', 'students', '2025-10-15'],
  ];

  announcements.forEach(([id, title, content, authorId, priority, audience, date]) => {
    db.run(`
      INSERT INTO announcements (id, title, content, author_id, priority, target_audience, date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [id, title, content, authorId, priority, audience, date]);
  });

  // Save after seeding
  saveDatabase();
  console.log('✅ Database seeded successfully');
};

export const getDb = () => db;

export const query = (sql: string, params: any[] = []) => {
  const stmt = db.prepare(sql);
  if (params.length > 0) {
    stmt.bind(params);
  }
  const result: any[] = [];
  while (stmt.step()) {
    result.push(stmt.getAsObject());
  }
  stmt.free();
  return result;
};

export const run = (sql: string, params: any[] = []) => {
  db.run(sql, params);
  saveDatabase();
};

export default { initDatabase, getDb, query, run };
