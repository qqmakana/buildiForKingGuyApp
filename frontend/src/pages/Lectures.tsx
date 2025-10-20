import { useState } from 'react';
import { Play, CheckCircle, Lock, Clock, FileText, Download, MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

export default function Lectures() {
  const [selectedVideo, setSelectedVideo] = useState('1-1');
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock course structure with videos
  const courseModules = [
    {
      id: 1,
      title: 'Week 1: Introduction to Mathematics',
      duration: '2 hours',
      lessons: [
        { id: '1-1', title: 'Course Overview', duration: '10:24', completed: true, locked: false },
        { id: '1-2', title: 'Basic Algebra Review', duration: '25:18', completed: true, locked: false },
        { id: '1-3', title: 'Linear Equations', duration: '32:45', completed: false, locked: false },
        { id: '1-4', title: 'Practice Problems', duration: '15:30', completed: false, locked: false },
      ]
    },
    {
      id: 2,
      title: 'Week 2: Advanced Topics',
      duration: '2.5 hours',
      lessons: [
        { id: '2-1', title: 'Quadratic Equations', duration: '28:15', completed: false, locked: false },
        { id: '2-2', title: 'Graphing Functions', duration: '35:20', completed: false, locked: false },
        { id: '2-3', title: 'Word Problems', duration: '22:45', completed: false, locked: false },
      ]
    },
    {
      id: 3,
      title: 'Week 3: Geometry',
      duration: '3 hours',
      lessons: [
        { id: '3-1', title: 'Triangles and Angles', duration: '30:00', completed: false, locked: true },
        { id: '3-2', title: 'Area and Perimeter', duration: '25:30', completed: false, locked: true },
        { id: '3-3', title: 'Circle Theorems', duration: '28:45', completed: false, locked: true },
      ]
    },
  ];

  const currentLesson = courseModules
    .flatMap(m => m.lessons)
    .find(l => l.id === selectedVideo);

  const resources = [
    { name: 'Lecture Slides.pdf', size: '2.4 MB', type: 'PDF' },
    { name: 'Practice Exercises.pdf', size: '1.8 MB', type: 'PDF' },
    { name: 'Solution Guide.pdf', size: '3.2 MB', type: 'PDF' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Player - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-xl overflow-hidden shadow-soft">
              {/* Video Container */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 aspect-video">
                {/* Placeholder for video player */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isPlaying ? (
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-6 shadow-2xl transform hover:scale-110 transition-all"
                    >
                      <Play size={48} fill="currentColor" />
                    </button>
                  ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play size={32} fill="white" />
                        </div>
                        <p className="text-lg font-semibold">Video Player</p>
                        <p className="text-sm text-gray-400 mt-2">
                          In production, integrate with YouTube, Vimeo, or your video hosting service
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Controls Overlay (shown on hover) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <Play size={24} />
                    </button>
                    <div className="flex-1 bg-gray-600 rounded-full h-1">
                      <div className="bg-blue-500 h-1 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-white text-sm">10:24 / 25:18</span>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentLesson?.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {currentLesson?.duration}
                      </div>
                      <div className="flex items-center">
                        <CheckCircle size={16} className="mr-1 text-green-500" />
                        1,234 students completed
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ThumbsUp size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share2 size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex space-x-8">
                    <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-semibold">
                      Overview
                    </button>
                    <button className="pb-3 text-gray-600 hover:text-gray-900">
                      Resources
                    </button>
                    <button className="pb-3 text-gray-600 hover:text-gray-900">
                      Discussion
                    </button>
                  </div>
                </div>

                {/* Overview Content */}
                <div className="prose max-w-none">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">About this lecture</h3>
                  <p className="text-gray-700 mb-4">
                    In this lecture, we'll cover the fundamental concepts of linear equations and how to solve them step by step. 
                    You'll learn different methods including substitution and elimination.
                  </p>
                  
                  <h4 className="text-md font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                    <li>Understanding linear equations</li>
                    <li>Solving equations using substitution method</li>
                    <li>Applying elimination technique</li>
                    <li>Real-world applications</li>
                  </ul>

                  {/* Resources */}
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Downloadable Resources</h4>
                  <div className="space-y-2">
                    {resources.map((resource, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="bg-red-100 p-2 rounded">
                            <FileText size={20} className="text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{resource.name}</p>
                            <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Download size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Section */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare size={24} className="text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Discussion (23 comments)</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    JS
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-gray-900 mb-1">John Smith</p>
                      <p className="text-sm text-gray-700">Great explanation! This really helped me understand the concept.</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <button className="hover:text-blue-600">Reply</button>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Curriculum - Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft sticky top-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Course Content</h2>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>12 lessons</span>
                  <span>7.5 hours</span>
                </div>
                <div className="mt-3 bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">25% Complete (3 of 12 lessons)</p>
              </div>

              {/* Module List */}
              <div className="max-h-[600px] overflow-y-auto">
                {courseModules.map((module) => (
                  <div key={module.id} className="border-b border-gray-200 last:border-0">
                    <div className="p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1">{module.title}</h3>
                      <p className="text-xs text-gray-600">{module.lessons.length} lessons • {module.duration}</p>
                    </div>
                    <div>
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => !lesson.locked && setSelectedVideo(lesson.id)}
                          disabled={lesson.locked}
                          className={`w-full text-left p-4 hover:bg-blue-50 transition-colors flex items-center space-x-3 ${
                            selectedVideo === lesson.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                          } ${lesson.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className={`flex-shrink-0 ${
                            lesson.completed ? 'text-green-500' : 
                            lesson.locked ? 'text-gray-400' : 'text-blue-600'
                          }`}>
                            {lesson.completed ? (
                              <CheckCircle size={20} fill="currentColor" />
                            ) : lesson.locked ? (
                              <Lock size={20} />
                            ) : (
                              <Play size={20} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm truncate ${
                              selectedVideo === lesson.id ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-500">{lesson.duration}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Lesson Button */}
              <div className="p-4 border-t border-gray-200">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center space-x-2">
                  <span>Next Lesson</span>
                  <Play size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

