import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Award, BookOpen, Edit } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  // Mock additional user data
  const profileData = {
    email: user?.email || 'user@andile.edu',
    phone: '+27 123 456 789',
    address: '123 Main Street, Johannesburg, South Africa',
    dateOfBirth: '2005-05-15',
    enrollmentDate: '2020-01-15',
    studentId: user?.studentId || 'STU001',
    grade: user?.grade || 'Grade 10',
    class: user?.class || '10A',
    gpa: 3.8,
    attendance: 95,
    subjects: user?.subjects || ['Mathematics', 'Science', 'English', 'History', 'Computer Science'],
    achievements: [
      'Honor Roll 2024',
      'Science Fair Winner 2023',
      'Perfect Attendance Q1 2025',
      'Math Olympiad Bronze Medal',
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">View and manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
            <p className="text-gray-600 mb-2 capitalize">{user?.role}</p>
            {user?.role === 'student' && (
              <>
                <p className="text-sm text-gray-600 mb-4">{profileData.studentId}</p>
                <div className="flex justify-center gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{profileData.gpa}</p>
                    <p className="text-xs text-gray-600">GPA</p>
                  </div>
                  <div className="border-r border-gray-300"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{profileData.attendance}%</p>
                    <p className="text-xs text-gray-600">Attendance</p>
                  </div>
                </div>
              </>
            )}
            <button className="btn-primary w-full flex items-center justify-center">
              <Edit size={18} className="mr-2" />
              Edit Profile
            </button>
          </div>

          {/* Quick Stats */}
          {user?.role === 'student' && (
            <div className="card mt-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Grade</span>
                  <span className="font-semibold text-gray-900">{profileData.grade}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Class</span>
                  <span className="font-semibold text-gray-900">{profileData.class}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Enrolled Subjects</span>
                  <span className="font-semibold text-gray-900">{profileData.subjects.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <User className="mr-2 h-5 w-5 text-primary-600" />
                Personal Information
              </h3>
              <button className="btn-secondary text-sm py-2">
                <Edit size={16} className="mr-2 inline" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Full Name</label>
                <div className="flex items-center text-gray-900">
                  <User size={18} className="mr-3 text-gray-400" />
                  {user?.name}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Email</label>
                <div className="flex items-center text-gray-900">
                  <Mail size={18} className="mr-3 text-gray-400" />
                  {profileData.email}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Phone</label>
                <div className="flex items-center text-gray-900">
                  <Phone size={18} className="mr-3 text-gray-400" />
                  {profileData.phone}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Date of Birth</label>
                <div className="flex items-center text-gray-900">
                  <Calendar size={18} className="mr-3 text-gray-400" />
                  {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-2 block">Address</label>
                <div className="flex items-center text-gray-900">
                  <MapPin size={18} className="mr-3 text-gray-400" />
                  {profileData.address}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          {user?.role === 'student' && (
            <>
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-primary-600" />
                  Subjects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profileData.subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                        <BookOpen size={20} className="text-primary-600" />
                      </div>
                      <span className="font-medium text-gray-900">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary-600" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  {profileData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                    >
                      <Award size={24} className="text-yellow-600 mr-3 flex-shrink-0" />
                      <span className="font-medium text-gray-900">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Additional Details */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Enrollment Date</span>
                <span className="font-semibold text-gray-900">
                  {new Date(profileData.enrollmentDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Account Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Last Login</span>
                <span className="font-semibold text-gray-900">Today at 8:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

