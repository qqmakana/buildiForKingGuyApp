import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Clock, Search, Play, Star, Award } from 'lucide-react';

export default function Classes() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data with course-style information
  const classes = [
    {
      id: '1',
      name: 'Mathematics 101',
      description: 'Master advanced algebra and geometry concepts with real-world applications',
      grade: 'Grade 10',
      teacher: 'Mr. John Smith',
      teacherId: 't1',
      students: 28,
      subject: 'Mathematics',
      schedule: 'Mon, Wed, Fri • 9:00 AM',
      room: 'A101',
      progress: 65,
      rating: 4.8,
      enrolled: true,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
      level: 'Intermediate',
      duration: '12 weeks'
    },
    {
      id: '2',
      name: 'Physics',
      description: 'Introduction to classical mechanics, motion, and forces',
      grade: 'Grade 11',
      teacher: 'Dr. Sarah Johnson',
      teacherId: 't2',
      students: 24,
      subject: 'Science',
      schedule: 'Tue, Thu • 10:30 AM',
      room: 'B205',
      progress: 45,
      rating: 4.9,
      enrolled: true,
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop',
      level: 'Advanced',
      duration: '14 weeks'
    },
    {
      id: '3',
      name: 'English Literature',
      description: 'Explore classic and contemporary literature with critical analysis',
      grade: 'Grade 10',
      teacher: 'Mrs. Emily Williams',
      teacherId: 't3',
      students: 30,
      subject: 'English',
      schedule: 'Mon, Wed, Fri • 1:00 PM',
      room: 'C302',
      progress: 80,
      rating: 4.7,
      enrolled: true,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
      level: 'Beginner',
      duration: '10 weeks'
    },
    {
      id: '4',
      name: 'Computer Science',
      description: 'Programming fundamentals with Python, algorithms, and data structures',
      grade: 'Grade 11',
      teacher: 'Mr. Michael Brown',
      teacherId: 't4',
      students: 22,
      subject: 'Technology',
      schedule: 'Tue, Thu • 2:00 PM',
      room: 'D105',
      progress: 30,
      rating: 5.0,
      enrolled: true,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      level: 'Intermediate',
      duration: '16 weeks'
    },
    {
      id: '5',
      name: 'World History',
      description: 'World history from 1900 to present with focus on major events',
      grade: 'Grade 10',
      teacher: 'Prof. David Lee',
      teacherId: 't5',
      students: 26,
      subject: 'Social Studies',
      schedule: 'Mon, Wed • 11:00 AM',
      room: 'E201',
      progress: 55,
      rating: 4.6,
      enrolled: true,
      image: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400&h=250&fit=crop',
      level: 'Beginner',
      duration: '12 weeks'
    },
  ];

  const categories = ['all', 'Mathematics', 'Science', 'English', 'Technology', 'Social Studies'];

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || cls.subject === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {user?.role === 'student' ? 'My Courses' : 'All Courses'}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            {user?.role === 'student' && 'Continue learning and track your progress'}
            {user?.role === 'teacher' && 'Manage your teaching courses and students'}
            {user?.role === 'admin' && 'Oversee all courses and manage curriculum'}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-gray-900 shadow-lg focus:ring-2 focus:ring-white outline-none text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Courses' : category}
            </button>
          ))}
        </div>

        {/* Stats */}
        {user?.role === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-medium">Enrolled</p>
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{filteredClasses.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-medium">In Progress</p>
                <Play className="text-green-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{filteredClasses.filter(c => c.progress < 100).length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-medium">Avg Progress</p>
                <Award className="text-orange-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round(filteredClasses.reduce((sum, c) => sum + c.progress, 0) / filteredClasses.length)}%
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-medium">Avg Rating</p>
                <Star className="text-yellow-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {(filteredClasses.reduce((sum, c) => sum + c.rating, 0) / filteredClasses.length).toFixed(1)}
              </p>
            </div>
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer">
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                  {course.level}
                </div>
                {user?.role === 'student' && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between text-white text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {course.subject}
                  </span>
                  <span className="text-xs text-gray-500">• {course.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-500 mr-2">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-sm font-semibold text-gray-900">{course.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({course.students} students)</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold mr-2">
                      {course.teacher.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{course.teacher}</span>
                  </div>
                  <Clock size={16} className="text-gray-400" />
                </div>

                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all">
                  {user?.role === 'student' ? 'Continue Learning' : 'View Course'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
