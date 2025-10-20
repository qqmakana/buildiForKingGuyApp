export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  studentId?: string;
  teacherId?: string;
  grade?: string;
  class?: string;
  subjects?: string[];
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  teacherId: string;
  students: number;
  subject: string;
  schedule: string;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  assignment: string;
  score: number;
  maxScore: number;
  date: string;
  feedback?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  description: string;
  totalPoints: number;
  submitted?: boolean;
  grade?: number;
  status: 'pending' | 'submitted' | 'graded' | 'late';
}

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  class: string;
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: 'all' | 'students' | 'teachers' | 'parents';
}

export interface Schedule {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  class: string;
}

