import { useAuth } from '../context/AuthContext';
import { TrendingUp, BookOpen, Clock, Award, Calendar, Bell, Play, Target, Trophy } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();

  // Mock data
  const performanceData = [
    { week: 'Week 1', score: 75 },
    { week: 'Week 2', score: 78 },
    { week: 'Week 3', score: 82 },
    { week: 'Week 4', score: 85 },
    { week: 'Week 5', score: 88 },
    { week: 'Week 6', score: 90 },
  ];

  const courseProgress = [
    { course: 'Math', progress: 85 },
    { course: 'Science', progress: 92 },
    { course: 'English', progress: 88 },
    { course: 'History', progress: 90 },
    { course: 'CS', progress: 95 },
  ];

  const upcomingDeadlines = [
    { title: 'Math Assignment 3', course: 'Mathematics', due: '2 days', priority: 'high' },
    { title: 'Lab Report', course: 'Science', due: '5 days', priority: 'medium' },
    { title: 'Essay Draft', course: 'English', due: '1 week', priority: 'low' },
  ];

  const recentActivity = [
    { action: 'Completed', item: 'Physics Quiz 2', time: '2 hours ago', icon: Trophy, color: 'text-green-600' },
    { action: 'Started', item: 'Math Chapter 5', time: '5 hours ago', icon: Play, color: 'text-blue-600' },
    { action: 'Submitted', item: 'English Essay', time: '1 day ago', icon: Award, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Welcome Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-12 px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-blue-100 text-lg">
                {user?.role === 'student' && "Ready to continue your learning journey?"}
                {user?.role === 'teacher' && "Your students are making great progress!"}
                {user?.role === 'admin' && "Here's your school overview dashboard."}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold">90%</div>
                <div className="text-blue-100 text-sm mt-1">Avg Performance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Courses Enrolled', value: '7', icon: BookOpen, color: 'bg-blue-500', change: '+2 this month' },
            { label: 'Assignments Due', value: '4', icon: Clock, color: 'bg-orange-500', change: '3 upcoming' },
            { label: 'Average Grade', value: '88%', icon: Award, color: 'bg-green-500', change: '+5% improvement' },
            { label: 'Learning Streak', value: '12', icon: Trophy, color: 'bg-purple-500', change: 'days in a row' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft hover:shadow-card transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Performance Overview</h3>
                <p className="text-sm text-gray-600 mt-1">Your progress over the last 6 weeks</p>
              </div>
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#999" style={{ fontSize: '12px' }} />
                <YAxis stroke="#999" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Upcoming Deadlines</h3>
              <Target className="text-orange-500" size={20} />
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    deadline.priority === 'high' ? 'bg-red-500' :
                    deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{deadline.title}</p>
                    <p className="text-xs text-gray-600">{deadline.course}</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">Due in {deadline.due}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm">
              View All Assignments →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Progress */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Course Progress</h3>
                <p className="text-sm text-gray-600 mt-1">Track your progress across all courses</p>
              </div>
              <BookOpen className="text-blue-500" size={24} />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={courseProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="course" stroke="#999" style={{ fontSize: '12px' }} />
                <YAxis stroke="#999" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar 
                  dataKey="progress" 
                  fill="#2563eb" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              <Calendar className="text-purple-500" size={20} />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className={`${activity.color} bg-opacity-10 p-2 rounded-lg`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{activity.action}</span> {activity.item}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm">
              View All Activity →
            </button>
          </div>
        </div>

        {/* Announcements */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Important Announcement</h3>
                <p className="text-gray-700 mb-2">Parent-Teacher Conference scheduled for October 25th. Check your schedule for your time slot.</p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View Details →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
