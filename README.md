# 📚 Andile M-Afrika School Management System

A sophisticated, modern, and easy-to-use school management system built with cutting-edge technologies.

![School Management System](https://img.shields.io/badge/School-Management-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6)
![Node.js](https://img.shields.io/badge/Node.js-20-339933)

## ✨ Features

### 🎓 For Students
- **Dashboard**: Personalized overview with performance metrics
- **Classes**: View enrolled classes and schedules
- **Assignments**: Track assignments, due dates, and submissions
- **Grades**: Monitor academic performance across subjects
- **Schedule**: Weekly timetable with real-time class tracking
- **Announcements**: Stay updated with school news

### 👨‍🏫 For Teachers
- **Class Management**: Manage multiple classes and students
- **Grade Management**: Record and track student performance
- **Assignment Creation**: Create and manage assignments
- **Attendance Tracking**: Mark and monitor student attendance
- **Student Overview**: Access student profiles and progress

### 👨‍💼 For Administrators
- **Complete Overview**: Dashboard with school-wide statistics
- **User Management**: Manage students, teachers, and staff
- **Class Administration**: Create and organize classes
- **Reports & Analytics**: Comprehensive data insights
- **Announcement Management**: Broadcast important information

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Recharts** - Beautiful data visualization
- **Lucide Icons** - Modern icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe server code
- **SQLite (Better-SQLite3)** - Embedded database
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
cd /Users/qaqambilemakana/Desktop/ancBoys
```

2. **Install dependencies**
```bash
npm run install:all
```

This will install dependencies for both frontend and backend.

3. **Start the development servers**
```bash
npm run dev
```

This starts both the frontend (port 3000) and backend (port 5000) concurrently.

### Individual Commands

**Frontend only:**
```bash
cd frontend
npm install
npm run dev
```

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

## 🔐 Demo Accounts

The system comes with pre-configured demo accounts:

### Administrator
- **Email**: `admin@andile.edu`
- **Password**: `admin123`
- **Access**: Full system access

### Teacher
- **Email**: `teacher@andile.edu`
- **Password**: `teacher123`
- **Access**: Class and student management

### Student
- **Email**: `student@andile.edu`
- **Password**: `student123`
- **Access**: Personal academic portal

## 📁 Project Structure

```
ancBoys/
├── frontend/                # React frontend application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── database/       # Database initialization
│   │   ├── routes/         # API route handlers
│   │   ├── utils/          # Utility functions
│   │   └── server.ts       # Express server
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                # Environment variables
│
├── package.json            # Root package.json
└── README.md              # This file
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID

### Grades
- `GET /api/grades` - Get all grades
- `GET /api/grades/student/:studentId` - Get student grades

### Assignments
- `GET /api/assignments` - Get all assignments
- `GET /api/assignments/:id` - Get assignment by ID

### Attendance
- `GET /api/attendance` - Get attendance records

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID

### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get announcement by ID

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth transitions
- **Dark Mode Ready**: Color scheme supports future dark mode implementation
- **Accessibility**: Built with WCAG guidelines in mind
- **Performance**: Optimized for fast loading and smooth interactions

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend Configuration

The frontend is configured to proxy API requests to the backend. See `vite.config.ts`.

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

### Backend
```bash
cd backend
npm run build
npm start
```

## 🐳 Docker Support (Optional)

While the current setup doesn't require Docker for development, you can easily containerize the application later for production deployment.

**Why we chose this approach:**
- Faster development iteration
- Easier debugging
- Simpler initial setup
- Docker can be added when deploying to production

To add Docker support later, you would create:
- `Dockerfile` for frontend
- `Dockerfile` for backend
- `docker-compose.yml` for orchestration

## 🤝 Contributing

This is a school management system designed for Andile M-Afrika School. For feature requests or issues, please contact the development team.

## 📝 License

MIT License - feel free to use this for educational purposes.

## 🔒 Security Notes

⚠️ **Important for Production:**
- Change the `JWT_SECRET` in production
- Use environment-specific `.env` files
- Enable HTTPS
- Implement rate limiting
- Add input sanitization
- Use a production database (PostgreSQL/MySQL)

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] File upload for assignments
- [ ] Video conferencing integration
- [ ] Mobile applications (iOS/Android)
- [ ] Parent portal
- [ ] Payment integration
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Report card generation

## 💡 Support

For technical support or questions:
- Email: support@andile.edu
- Documentation: See inline code comments
- Issues: Contact your system administrator

## 🙏 Acknowledgments

Built with modern web technologies to provide the best experience for students, teachers, and administrators at Andile M-Afrika School.

---

**Made with ❤️ for Andile M-Afrika School**

