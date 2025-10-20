import { useState } from 'react';
import { Users, Search, Plus, Mail, Phone, MapPin } from 'lucide-react';

export default function Students() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  // Mock data
  const students = [
    {
      id: 's1',
      name: 'John Doe',
      studentId: 'STU001',
      email: 'john.doe@student.andile.edu',
      phone: '+27 123 456 789',
      grade: 'Grade 10',
      class: '10A',
      address: '123 Main St, Johannesburg',
      gpa: 3.8,
      attendance: 95,
    },
    {
      id: 's2',
      name: 'Jane Smith',
      studentId: 'STU002',
      email: 'jane.smith@student.andile.edu',
      phone: '+27 123 456 790',
      grade: 'Grade 10',
      class: '10A',
      address: '456 Oak Ave, Johannesburg',
      gpa: 3.9,
      attendance: 98,
    },
    {
      id: 's3',
      name: 'Mike Johnson',
      studentId: 'STU003',
      email: 'mike.johnson@student.andile.edu',
      phone: '+27 123 456 791',
      grade: 'Grade 11',
      class: '11B',
      address: '789 Pine Rd, Johannesburg',
      gpa: 3.6,
      attendance: 92,
    },
    {
      id: 's4',
      name: 'Sarah Williams',
      studentId: 'STU004',
      email: 'sarah.williams@student.andile.edu',
      phone: '+27 123 456 792',
      grade: 'Grade 11',
      class: '11A',
      address: '321 Elm St, Johannesburg',
      gpa: 4.0,
      attendance: 99,
    },
    {
      id: 's5',
      name: 'Tom Brown',
      studentId: 'STU005',
      email: 'tom.brown@student.andile.edu',
      phone: '+27 123 456 793',
      grade: 'Grade 12',
      class: '12C',
      address: '654 Maple Dr, Johannesburg',
      gpa: 3.7,
      attendance: 94,
    },
  ];

  const grades = ['all', ...Array.from(new Set(students.map(s => s.grade)))];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">Manage student information and records</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus size={20} className="mr-2" />
          Add Student
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-primary-50 border-primary-200">
          <p className="text-sm text-primary-700 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-primary-900">{students.length}</p>
        </div>
        <div className="card bg-green-50 border-green-200">
          <p className="text-sm text-green-700 mb-1">Average GPA</p>
          <p className="text-3xl font-bold text-green-900">
            {(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)}
          </p>
        </div>
        <div className="card bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-700 mb-1">Avg Attendance</p>
          <p className="text-3xl font-bold text-blue-900">
            {(students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="input pl-10 appearance-none"
            >
              {grades.map(grade => (
                <option key={grade} value={grade}>
                  {grade === 'all' ? 'All Grades' : grade}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.studentId}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {student.grade}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone size={16} className="mr-2 flex-shrink-0" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{student.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-600">Class</p>
                    <p className="font-semibold text-gray-900">{student.class}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-600">GPA</p>
                    <p className="font-semibold text-gray-900">{student.gpa}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-600">Attendance</p>
                    <p className="font-semibold text-gray-900">{student.attendance}%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn-primary flex-1 py-2 text-sm">
                    View Profile
                  </button>
                  <button className="btn-secondary flex-1 py-2 text-sm">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="card text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

