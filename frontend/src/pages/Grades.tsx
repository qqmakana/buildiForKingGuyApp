import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, TrendingDown, Minus, Search, Filter } from 'lucide-react';

export default function Grades() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data
  const grades = [
    {
      id: '1',
      studentId: 's1',
      studentName: 'John Doe',
      subject: 'Mathematics',
      assignment: 'Mid-term Exam',
      score: 85,
      maxScore: 100,
      date: '2025-10-15',
      feedback: 'Excellent work on algebra problems!',
      trend: 'up'
    },
    {
      id: '2',
      studentId: 's1',
      studentName: 'John Doe',
      subject: 'Science',
      assignment: 'Lab Report',
      score: 92,
      maxScore: 100,
      date: '2025-10-12',
      feedback: 'Outstanding lab methodology',
      trend: 'up'
    },
    {
      id: '3',
      studentId: 's1',
      studentName: 'John Doe',
      subject: 'English',
      assignment: 'Essay',
      score: 88,
      maxScore: 100,
      date: '2025-10-10',
      feedback: 'Good structure and arguments',
      trend: 'same'
    },
    {
      id: '4',
      studentId: 's1',
      studentName: 'John Doe',
      subject: 'History',
      assignment: 'Research Project',
      score: 90,
      maxScore: 100,
      date: '2025-10-08',
      feedback: 'Thorough research and analysis',
      trend: 'up'
    },
    {
      id: '5',
      studentId: 's1',
      studentName: 'John Doe',
      subject: 'Computer Science',
      assignment: 'Programming Assignment',
      score: 95,
      maxScore: 100,
      date: '2025-10-05',
      feedback: 'Clean code and excellent logic',
      trend: 'up'
    },
  ];

  const subjects = ['all', ...Array.from(new Set(grades.map(g => g.subject)))];

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.assignment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grade.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || grade.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const averageGrade = grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length;

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="text-green-500" size={20} />;
    if (trend === 'down') return <TrendingDown className="text-red-500" size={20} />;
    return <Minus className="text-gray-500" size={20} />;
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Grades</h1>
        <p className="text-gray-600 mt-1">
          {user?.role === 'student' && 'Your academic performance'}
          {user?.role === 'teacher' && 'Student grades and assessments'}
          {user?.role === 'admin' && 'All grades overview'}
        </p>
      </div>

      {/* Summary Card */}
      {user?.role === 'student' && (
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 mb-2">Overall Average</p>
              <p className="text-4xl font-bold">{averageGrade.toFixed(1)}%</p>
              <p className="text-primary-100 mt-2">Based on {grades.length} assessments</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <TrendingUp className="h-12 w-12" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input pl-10 appearance-none"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grades List */}
      <div className="space-y-4">
        {filteredGrades.map((grade) => {
          const percentage = (grade.score / grade.maxScore) * 100;
          return (
            <div key={grade.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{grade.assignment}</h3>
                    {getTrendIcon(grade.trend)}
                  </div>
                  <p className="text-gray-600 mb-1">{grade.subject}</p>
                  <p className="text-sm text-gray-500">{grade.date}</p>
                  {grade.feedback && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <span className="font-medium">Feedback:</span> {grade.feedback}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <div className={`text-3xl font-bold ${getGradeColor(percentage)}`}>
                    {percentage.toFixed(0)}%
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {grade.score} / {grade.maxScore}
                  </p>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className={`h-2 rounded-full ${
                        percentage >= 90 ? 'bg-green-500' :
                        percentage >= 80 ? 'bg-blue-500' :
                        percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGrades.length === 0 && (
        <div className="card text-center py-12">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No grades found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

