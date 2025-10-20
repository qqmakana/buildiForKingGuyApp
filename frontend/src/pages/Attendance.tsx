import { useState } from 'react';
import { UserCheck, X, Clock, CheckCircle, Calendar, Filter } from 'lucide-react';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock data
  const attendanceRecords = [
    {
      id: '1',
      studentId: 's1',
      studentName: 'John Doe',
      studentNumber: 'STU001',
      date: '2025-10-20',
      status: 'present' as const,
      class: 'Mathematics 101',
      time: '09:00 AM',
    },
    {
      id: '2',
      studentId: 's2',
      studentName: 'Jane Smith',
      studentNumber: 'STU002',
      date: '2025-10-20',
      status: 'present' as const,
      class: 'Mathematics 101',
      time: '09:00 AM',
    },
    {
      id: '3',
      studentId: 's3',
      studentName: 'Mike Johnson',
      studentNumber: 'STU003',
      date: '2025-10-20',
      status: 'late' as const,
      class: 'Mathematics 101',
      time: '09:15 AM',
      notes: 'Arrived 15 minutes late',
    },
    {
      id: '4',
      studentId: 's4',
      studentName: 'Sarah Williams',
      studentNumber: 'STU004',
      date: '2025-10-20',
      status: 'absent' as const,
      class: 'Mathematics 101',
      notes: 'Sick leave',
    },
    {
      id: '5',
      studentId: 's5',
      studentName: 'Tom Brown',
      studentNumber: 'STU005',
      date: '2025-10-20',
      status: 'excused' as const,
      class: 'Mathematics 101',
      notes: 'Doctor appointment',
    },
  ];

  const classes = ['all', ...Array.from(new Set(attendanceRecords.map(r => r.class)))];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = record.date === selectedDate;
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    return matchesDate && matchesClass;
  });

  const stats = {
    total: filteredRecords.length,
    present: filteredRecords.filter(r => r.status === 'present').length,
    absent: filteredRecords.filter(r => r.status === 'absent').length,
    late: filteredRecords.filter(r => r.status === 'late').length,
    excused: filteredRecords.filter(r => r.status === 'excused').length,
  };

  const attendanceRate = stats.total > 0 
    ? ((stats.present + stats.late + stats.excused) / stats.total * 100).toFixed(1)
    : 0;

  const getStatusBadge = (status: string) => {
    const badges = {
      present: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle, text: 'Present' },
      absent: { color: 'bg-red-100 text-red-700 border-red-200', icon: X, text: 'Absent' },
      late: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock, text: 'Late' },
      excused: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle, text: 'Excused' },
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badge.color}`}>
        <Icon size={16} className="mr-1" />
        {badge.text}
      </span>
    );
  };

  const handleStatusChange = (recordId: string, newStatus: string) => {
    console.log(`Changing status for ${recordId} to ${newStatus}`);
    // In real app, this would update the database
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600 mt-1">Track and manage student attendance</p>
      </div>

      {/* Summary Card */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 mb-2">Today's Attendance Rate</p>
            <p className="text-4xl font-bold">{attendanceRate}%</p>
            <p className="text-primary-100 mt-2">
              {stats.present} present • {stats.absent} absent • {stats.late} late
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <UserCheck className="h-12 w-12" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input pl-10 appearance-none"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls === 'all' ? 'All Classes' : cls}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card bg-green-50 border-green-200">
          <p className="text-sm text-green-700 mb-1">Present</p>
          <p className="text-2xl font-bold text-green-900">{stats.present}</p>
        </div>
        <div className="card bg-red-50 border-red-200">
          <p className="text-sm text-red-700 mb-1">Absent</p>
          <p className="text-2xl font-bold text-red-900">{stats.absent}</p>
        </div>
        <div className="card bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-700 mb-1">Late</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.late}</p>
        </div>
        <div className="card bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-700 mb-1">Excused</p>
          <p className="text-2xl font-bold text-blue-900">{stats.excused}</p>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Attendance Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Student #</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Class</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold mr-3">
                        {record.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{record.studentName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{record.studentNumber}</td>
                  <td className="py-3 px-4 text-gray-600">{record.class}</td>
                  <td className="py-3 px-4">{getStatusBadge(record.status)}</td>
                  <td className="py-3 px-4 text-gray-600">{record.time || '-'}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.notes || '-'}</td>
                  <td className="py-3 px-4">
                    <select
                      onChange={(e) => handleStatusChange(record.id, e.target.value)}
                      value={record.status}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                      <option value="excused">Excused</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRecords.length === 0 && (
        <div className="card text-center py-12">
          <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance records</h3>
          <p className="text-gray-600">No records found for the selected date and class</p>
        </div>
      )}
    </div>
  );
}

