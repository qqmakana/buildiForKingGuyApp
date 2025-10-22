import { useState } from 'react';
import { Bell, Calendar, Plus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Announcements() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Mock data
  const announcements = [
    {
      id: '1',
      title: 'Parent-Teacher Conference',
      content: 'Dear parents and guardians, our annual parent-teacher conference will be held on October 25th from 9 AM to 5 PM. Please schedule your appointments through the school portal.',
      author: 'Principal Johnson',
      date: '2025-10-20',
      priority: 'high' as const,
      targetAudience: 'all' as const,
    },
    {
      id: '2',
      title: 'Sports Day Event',
      content: 'The annual sports day will take place on October 28th. All students are required to participate. Parents are welcome to attend and cheer for their children.',
      author: 'Coach Mike Davis',
      date: '2025-10-18',
      priority: 'medium' as const,
      targetAudience: 'students' as const,
    },
    {
      id: '3',
      title: 'Mid-term Examination Schedule',
      content: 'Mid-term exams will begin on November 1st and continue through November 5th. The detailed schedule has been posted on the notice board and emailed to all students.',
      author: 'Academic Director',
      date: '2025-10-15',
      priority: 'high' as const,
      targetAudience: 'students' as const,
    },
    {
      id: '4',
      title: 'Library Extended Hours',
      content: 'The school library will now be open until 7 PM on weekdays to give students more time for research and study. Weekend hours remain unchanged.',
      author: 'Librarian Mrs. Brown',
      date: '2025-10-12',
      priority: 'low' as const,
      targetAudience: 'students' as const,
    },
    {
      id: '5',
      title: 'Staff Development Workshop',
      content: 'All teaching staff are required to attend the professional development workshop on October 30th. Classes will be suspended for the day.',
      author: 'HR Department',
      date: '2025-10-10',
      priority: 'high' as const,
      targetAudience: 'teachers' as const,
    },
    {
      id: '6',
      title: 'School Lunch Menu Update',
      content: 'We have updated our cafeteria menu to include more healthy and diverse options. The new menu is available on our website.',
      author: 'Cafeteria Manager',
      date: '2025-10-08',
      priority: 'low' as const,
      targetAudience: 'all' as const,
    },
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesPriority = filter === 'all' || announcement.priority === filter;
    const matchesAudience = announcement.targetAudience === 'all' || 
                           announcement.targetAudience === 'students' ||
                           announcement.targetAudience === 'teachers';
    return matchesPriority && matchesAudience;
  });

  const getPriorityBadge = (priority: string) => {
    const badges = {
      high: { color: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle },
      medium: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Bell },
      low: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Bell },
    };
    const badge = badges[priority as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badge.color}`}>
        <Icon size={16} className="mr-1" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysAgo = (dateString: string) => {
    const today = new Date();
    const announcementDate = new Date(dateString);
    const diffTime = today.getTime() - announcementDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-1">Stay updated with school news and events</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'teacher') && (
          <button className="btn-primary flex items-center">
            <Plus size={20} className="mr-2" />
            New Announcement
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setFilter('all')}
          className={`card cursor-pointer transition-all ${
            filter === 'all' ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
          }`}
        >
          <p className="text-sm text-gray-600">All</p>
          <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
        </div>
        <div
          onClick={() => setFilter('high')}
          className={`card cursor-pointer transition-all ${
            filter === 'high' ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
          }`}
        >
          <p className="text-sm text-gray-600">High Priority</p>
          <p className="text-2xl font-bold text-red-600">
            {announcements.filter(a => a.priority === 'high').length}
          </p>
        </div>
        <div
          onClick={() => setFilter('medium')}
          className={`card cursor-pointer transition-all ${
            filter === 'medium' ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
          }`}
        >
          <p className="text-sm text-gray-600">Medium Priority</p>
          <p className="text-2xl font-bold text-yellow-600">
            {announcements.filter(a => a.priority === 'medium').length}
          </p>
        </div>
        <div
          onClick={() => setFilter('low')}
          className={`card cursor-pointer transition-all ${
            filter === 'low' ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
          }`}
        >
          <p className="text-sm text-gray-600">Low Priority</p>
          <p className="text-2xl font-bold text-blue-600">
            {announcements.filter(a => a.priority === 'low').length}
          </p>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className={`card hover:shadow-lg transition-shadow cursor-pointer ${
              announcement.priority === 'high' ? 'border-l-4 border-red-500' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-lg ${
                announcement.priority === 'high' ? 'bg-red-100' :
                announcement.priority === 'medium' ? 'bg-yellow-100' :
                'bg-blue-100'
              } flex-shrink-0`}>
                <Bell className={`h-6 w-6 ${
                  announcement.priority === 'high' ? 'text-red-600' :
                  announcement.priority === 'medium' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{announcement.title}</h3>
                  {getPriorityBadge(announcement.priority)}
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{announcement.content}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(announcement.date)}
                  </div>
                  <span>•</span>
                  <span>{getDaysAgo(announcement.date)}</span>
                  <span>•</span>
                  <span className="font-medium">By {announcement.author}</span>
                  <span>•</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full capitalize">
                    {announcement.targetAudience}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="card text-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements</h3>
          <p className="text-gray-600">No {filter !== 'all' ? filter + ' priority' : ''} announcements at this time</p>
        </div>
      )}
    </div>
  );
}

