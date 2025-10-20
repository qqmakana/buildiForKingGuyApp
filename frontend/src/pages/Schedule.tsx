import { useState } from 'react';
import { Calendar, Clock, MapPin, BookOpen } from 'lucide-react';

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Mock data
  const schedule = {
    Monday: [
      { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. John Smith', room: 'A101' },
      { time: '09:15 - 10:15', subject: 'English', teacher: 'Mrs. Emily Williams', room: 'C302' },
      { time: '10:30 - 11:30', subject: 'Science', teacher: 'Dr. Sarah Johnson', room: 'B205' },
      { time: '11:45 - 12:45', subject: 'History', teacher: 'Prof. David Lee', room: 'E201' },
      { time: '13:30 - 14:30', subject: 'Physical Education', teacher: 'Coach Mike Davis', room: 'Gym' },
    ],
    Tuesday: [
      { time: '08:00 - 09:00', subject: 'Computer Science', teacher: 'Mr. Michael Brown', room: 'D105' },
      { time: '09:15 - 10:15', subject: 'Mathematics', teacher: 'Mr. John Smith', room: 'A101' },
      { time: '10:30 - 11:30', subject: 'Art', teacher: 'Ms. Lisa Anderson', room: 'F301' },
      { time: '11:45 - 12:45', subject: 'Science', teacher: 'Dr. Sarah Johnson', room: 'B205' },
      { time: '13:30 - 14:30', subject: 'Music', teacher: 'Mr. James Wilson', room: 'G102' },
    ],
    Wednesday: [
      { time: '08:00 - 09:00', subject: 'English', teacher: 'Mrs. Emily Williams', room: 'C302' },
      { time: '09:15 - 10:15', subject: 'History', teacher: 'Prof. David Lee', room: 'E201' },
      { time: '10:30 - 11:30', subject: 'Mathematics', teacher: 'Mr. John Smith', room: 'A101' },
      { time: '11:45 - 12:45', subject: 'Computer Science', teacher: 'Mr. Michael Brown', room: 'D105' },
      { time: '13:30 - 14:30', subject: 'Physical Education', teacher: 'Coach Mike Davis', room: 'Gym' },
    ],
    Thursday: [
      { time: '08:00 - 09:00', subject: 'Science', teacher: 'Dr. Sarah Johnson', room: 'B205' },
      { time: '09:15 - 10:15', subject: 'English', teacher: 'Mrs. Emily Williams', room: 'C302' },
      { time: '10:30 - 11:30', subject: 'Art', teacher: 'Ms. Lisa Anderson', room: 'F301' },
      { time: '11:45 - 12:45', subject: 'Mathematics', teacher: 'Mr. John Smith', room: 'A101' },
      { time: '13:30 - 14:30', subject: 'History', teacher: 'Prof. David Lee', room: 'E201' },
    ],
    Friday: [
      { time: '08:00 - 09:00', subject: 'Computer Science', teacher: 'Mr. Michael Brown', room: 'D105' },
      { time: '09:15 - 10:15', subject: 'Science', teacher: 'Dr. Sarah Johnson', room: 'B205' },
      { time: '10:30 - 11:30', subject: 'English', teacher: 'Mrs. Emily Williams', room: 'C302' },
      { time: '11:45 - 12:45', subject: 'Physical Education', teacher: 'Coach Mike Davis', room: 'Gym' },
      { time: '13:30 - 14:30', subject: 'Music', teacher: 'Mr. James Wilson', room: 'G102' },
    ],
  };

  const getCurrentClass = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = days[now.getDay() - 1]; // Monday = 0
    
    if (currentDay && schedule[currentDay as keyof typeof schedule]) {
      const todaySchedule = schedule[currentDay as keyof typeof schedule];
      return todaySchedule.find(cls => {
        const [start] = cls.time.split(' - ');
        const startHour = parseInt(start.split(':')[0]);
        return currentHour >= startHour && currentHour < startHour + 1;
      });
    }
    return null;
  };

  const currentClass = getCurrentClass();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-600 mt-1">Your weekly class schedule</p>
      </div>

      {/* Current Class Card */}
      {currentClass && (
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 mb-2">Current Class</p>
              <p className="text-2xl font-bold mb-1">{currentClass.subject}</p>
              <p className="text-primary-100">{currentClass.teacher}</p>
              <p className="text-primary-100 mt-2">{currentClass.time} • Room {currentClass.room}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <BookOpen className="h-12 w-12" />
            </div>
          </div>
        </div>
      )}

      {/* Day Selector */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDay === day
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {schedule[selectedDay as keyof typeof schedule].map((cls, index) => {
          const isCurrentClass = currentClass && 
                                  cls.time === currentClass.time && 
                                  cls.subject === currentClass.subject &&
                                  selectedDay === days[new Date().getDay() - 1];
          
          return (
            <div
              key={index}
              className={`card hover:shadow-lg transition-shadow ${
                isCurrentClass ? 'ring-2 ring-primary-500 bg-primary-50' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`p-4 rounded-lg ${
                  isCurrentClass ? 'bg-primary-600' : 'bg-gray-100'
                } flex-shrink-0`}>
                  <Clock className={`h-6 w-6 ${
                    isCurrentClass ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{cls.subject}</h3>
                      <p className="text-gray-600">{cls.teacher}</p>
                    </div>
                    {isCurrentClass && (
                      <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      {cls.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      Room {cls.room}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="btn-secondary py-2 px-4 whitespace-nowrap">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary-600" />
          Weekly Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                {days.map((day) => (
                  <th key={day} className="text-left py-3 px-4 font-semibold text-gray-700">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.Monday.map((_, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {schedule.Monday[index].time}
                  </td>
                  {days.map((day) => {
                    const cls = schedule[day as keyof typeof schedule][index];
                    return (
                      <td key={day} className="py-3 px-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{cls.subject}</p>
                          <p className="text-xs text-gray-600">{cls.room}</p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

