import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ClipboardList, Calendar, Clock, FileText, CheckCircle, AlertCircle, Plus } from 'lucide-react';

export default function Assignments() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  // Mock data
  const assignments = [
    {
      id: '1',
      title: 'Calculus Problem Set',
      subject: 'Mathematics',
      class: 'Math 101',
      dueDate: '2025-10-25',
      description: 'Complete exercises 1-20 from chapter 5',
      totalPoints: 100,
      submitted: true,
      grade: 85,
      status: 'graded' as const,
    },
    {
      id: '2',
      title: 'Lab Report: Chemical Reactions',
      subject: 'Science',
      class: 'Chemistry',
      dueDate: '2025-10-28',
      description: 'Write a detailed report on the lab experiment conducted on Oct 20',
      totalPoints: 50,
      submitted: false,
      status: 'pending' as const,
    },
    {
      id: '3',
      title: 'Essay: Shakespeare Analysis',
      subject: 'English',
      class: 'English Lit',
      dueDate: '2025-10-30',
      description: 'Analyze the themes in Hamlet (1500 words minimum)',
      totalPoints: 100,
      submitted: true,
      status: 'submitted' as const,
    },
    {
      id: '4',
      title: 'Python Programming Project',
      subject: 'Computer Science',
      class: 'CS 101',
      dueDate: '2025-11-05',
      description: 'Build a simple calculator using Python',
      totalPoints: 150,
      submitted: false,
      status: 'pending' as const,
    },
    {
      id: '5',
      title: 'World War II Research Paper',
      subject: 'History',
      class: 'History',
      dueDate: '2025-11-10',
      description: 'Research and write about a specific WWII event (2000 words)',
      totalPoints: 100,
      submitted: false,
      status: 'pending' as const,
    },
  ];

  const filteredAssignments = assignments.filter(assignment => 
    filter === 'all' || assignment.status === filter
  );

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' },
      submitted: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle, text: 'Submitted' },
      graded: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Graded' },
      late: { color: 'bg-red-100 text-red-700', icon: AlertCircle, text: 'Late' },
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
        <Icon size={16} className="mr-1" />
        {badge.text}
      </span>
    );
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'student' && 'Your assignments and submissions'}
            {user?.role === 'teacher' && 'Manage class assignments'}
            {user?.role === 'admin' && 'All assignments overview'}
          </p>
        </div>
        {user?.role === 'teacher' && (
          <button className="btn-primary flex items-center">
            <Plus size={20} className="mr-2" />
            Create Assignment
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
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
        </div>
        <div
          onClick={() => setFilter('pending')}
          className={`card cursor-pointer transition-all ${
            filter === 'pending' ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
          }`}
        >
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {assignments.filter(a => a.status === 'pending').length}
          </p>
        </div>
        <div
          onClick={() => setFilter('submitted')}
          className={`card cursor-pointer transition-all ${
            filter === 'submitted' ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
          }`}
        >
          <p className="text-sm text-gray-600">Submitted</p>
          <p className="text-2xl font-bold text-blue-600">
            {assignments.filter(a => a.status === 'submitted').length}
          </p>
        </div>
        <div
          onClick={() => setFilter('graded')}
          className={`card cursor-pointer transition-all ${
            filter === 'graded' ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
          }`}
        >
          <p className="text-sm text-gray-600">Graded</p>
          <p className="text-2xl font-bold text-green-600">
            {assignments.filter(a => a.status === 'graded').length}
          </p>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => {
          const daysUntilDue = getDaysUntilDue(assignment.dueDate);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

          return (
            <div key={assignment.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      assignment.status === 'graded' ? 'bg-green-100' :
                      assignment.status === 'submitted' ? 'bg-blue-100' :
                      'bg-yellow-100'
                    }`}>
                      <ClipboardList className={`h-6 w-6 ${
                        assignment.status === 'graded' ? 'text-green-600' :
                        assignment.status === 'submitted' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{assignment.title}</h3>
                        {getStatusBadge(assignment.status)}
                      </div>
                      <p className="text-gray-600 mb-3">{assignment.class} • {assignment.subject}</p>
                      <p className="text-gray-700 mb-4">{assignment.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <FileText size={16} className="mr-2" />
                          {assignment.totalPoints} points
                        </div>
                        {assignment.grade && (
                          <div className="flex items-center font-semibold text-green-600">
                            <CheckCircle size={16} className="mr-2" />
                            Grade: {assignment.grade}/{assignment.totalPoints}
                          </div>
                        )}
                      </div>

                      {!isOverdue && isDueSoon && (
                        <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-sm text-orange-800">
                            <AlertCircle className="inline mr-2" size={16} />
                            Due in {daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'}!
                          </p>
                        </div>
                      )}

                      {isOverdue && assignment.status === 'pending' && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">
                            <AlertCircle className="inline mr-2" size={16} />
                            Overdue by {Math.abs(daysUntilDue)} {Math.abs(daysUntilDue) === 1 ? 'day' : 'days'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 lg:w-40">
                  {user?.role === 'student' && (
                    <>
                      {assignment.status === 'pending' && (
                        <button className="btn-primary w-full">
                          Submit
                        </button>
                      )}
                      {assignment.status === 'submitted' && (
                        <button className="btn-secondary w-full">
                          View Submission
                        </button>
                      )}
                      {assignment.status === 'graded' && (
                        <button className="btn-secondary w-full">
                          View Feedback
                        </button>
                      )}
                    </>
                  )}
                  {user?.role === 'teacher' && (
                    <>
                      <button className="btn-primary w-full">
                        View Submissions
                      </button>
                      <button className="btn-secondary w-full">
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="card text-center py-12">
          <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
          <p className="text-gray-600">No {filter !== 'all' ? filter : ''} assignments at this time</p>
        </div>
      )}
    </div>
  );
}

