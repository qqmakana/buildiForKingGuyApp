import { useState } from 'react';
import { GraduationCap, Search, Plus, Mail, Phone, BookOpen } from 'lucide-react';

export default function Teachers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data
  const teachers = [
    {
      id: 't1',
      name: 'Mr. John Smith',
      teacherId: 'TCH001',
      email: 'john.smith@andile.edu',
      phone: '+27 123 456 800',
      department: 'Mathematics',
      subjects: ['Algebra', 'Geometry', 'Calculus'],
      classes: 6,
      students: 180,
      experience: '10 years',
    },
    {
      id: 't2',
      name: 'Dr. Sarah Johnson',
      teacherId: 'TCH002',
      email: 'sarah.johnson@andile.edu',
      phone: '+27 123 456 801',
      department: 'Science',
      subjects: ['Physics', 'Chemistry'],
      classes: 5,
      students: 150,
      experience: '15 years',
    },
    {
      id: 't3',
      name: 'Mrs. Emily Williams',
      teacherId: 'TCH003',
      email: 'emily.williams@andile.edu',
      phone: '+27 123 456 802',
      department: 'English',
      subjects: ['English Literature', 'Creative Writing'],
      classes: 7,
      students: 210,
      experience: '8 years',
    },
    {
      id: 't4',
      name: 'Mr. Michael Brown',
      teacherId: 'TCH004',
      email: 'michael.brown@andile.edu',
      phone: '+27 123 456 803',
      department: 'Technology',
      subjects: ['Computer Science', 'Web Development'],
      classes: 4,
      students: 120,
      experience: '6 years',
    },
    {
      id: 't5',
      name: 'Prof. David Lee',
      teacherId: 'TCH005',
      email: 'david.lee@andile.edu',
      phone: '+27 123 456 804',
      department: 'Social Studies',
      subjects: ['History', 'Geography'],
      classes: 6,
      students: 180,
      experience: '20 years',
    },
  ];

  const departments = ['all', ...Array.from(new Set(teachers.map(t => t.department)))];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.teacherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600 mt-1">Manage teaching staff and their assignments</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus size={20} className="mr-2" />
          Add Teacher
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-primary-50 border-primary-200">
          <p className="text-sm text-primary-700 mb-1">Total Teachers</p>
          <p className="text-3xl font-bold text-primary-900">{teachers.length}</p>
        </div>
        <div className="card bg-green-50 border-green-200">
          <p className="text-sm text-green-700 mb-1">Total Classes</p>
          <p className="text-3xl font-bold text-green-900">
            {teachers.reduce((sum, t) => sum + t.classes, 0)}
          </p>
        </div>
        <div className="card bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-700 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-blue-900">
            {teachers.reduce((sum, t) => sum + t.students, 0)}
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
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input pl-10 appearance-none"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {teacher.name.split(' ').slice(-2).map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-gray-600">{teacher.teacherId}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    {teacher.department}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone size={16} className="mr-2 flex-shrink-0" />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen size={16} className="mr-2 flex-shrink-0" />
                    <span>{teacher.subjects.join(', ')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-600">Classes</p>
                    <p className="font-semibold text-gray-900">{teacher.classes}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-600">Students</p>
                    <p className="font-semibold text-gray-900">{teacher.students}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-600">Experience</p>
                    <p className="font-semibold text-gray-900">{teacher.experience.split(' ')[0]}</p>
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

      {filteredTeachers.length === 0 && (
        <div className="card text-center py-12">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

