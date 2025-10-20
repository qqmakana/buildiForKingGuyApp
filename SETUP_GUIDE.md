# 🚀 Setup Guide - Andile M-Afrika School Management System

Complete step-by-step guide to get the school management system up and running.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     # Should output: v18.x.x or higher
     ```

2. **npm** (comes with Node.js) or **yarn**
   - Verify installation:
     ```bash
     npm --version
     # Should output: 9.x.x or higher
     ```

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

### System Requirements

- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB free space
- **OS**: macOS, Windows, or Linux

## 📥 Installation

### Step 1: Navigate to Project Directory

```bash
cd /Users/qaqambilemakana/Desktop/ancBoys
```

### Step 2: Install All Dependencies

Run this single command to install dependencies for both frontend and backend:

```bash
npm run install:all
```

This command will:
1. Install root dependencies
2. Install frontend dependencies
3. Install backend dependencies

**Alternative (Manual Installation):**

```bash
# Root dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..

# Backend dependencies
cd backend
npm install
cd ..
```

### Step 3: Verify Installation

Check that all dependencies are installed:

```bash
# Check frontend
cd frontend && npm list --depth=0

# Check backend  
cd ../backend && npm list --depth=0
```

## ⚙️ Configuration

### Backend Configuration

1. **Environment Variables**

   The backend `.env` file is already configured. If you need to modify it:

   ```bash
   cd backend
   ```

   Edit `.env`:
   ```env
   PORT=5000
   JWT_SECRET=andile_m_afrika_secret_key_2025
   NODE_ENV=development
   ```

   **Security Note**: In production, change the `JWT_SECRET` to a strong, random string.

2. **Database**

   The SQLite database will be automatically created when you first run the backend.
   - Location: `backend/school.db`
   - The database is pre-seeded with demo data

### Frontend Configuration

The frontend is pre-configured. The Vite proxy settings in `frontend/vite.config.ts` automatically forward API requests to the backend.

No additional configuration needed! 🎉

## 🏃‍♂️ Running the Application

### Option 1: Run Everything Together (Recommended)

From the root directory:

```bash
npm run dev
```

This starts:
- **Frontend** on http://localhost:3000
- **Backend** on http://localhost:5000

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 3: Run Only Frontend (Backend separately)

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2  
cd frontend
npm run dev
```

## 🌐 Accessing the Application

Once running, open your browser and navigate to:

**Frontend Application**: http://localhost:3000

The backend API runs on: http://localhost:5000

## 🔐 Login Credentials

Use these demo accounts to test different user roles:

### Administrator Access
- **Email**: `admin@andile.edu`
- **Password**: `admin123`
- Full system access, can manage everything

### Teacher Access
- **Email**: `teacher@andile.edu`
- **Password**: `teacher123`
- Can manage classes, grades, and students

### Student Access
- **Email**: `student@andile.edu`
- **Password**: `student123`
- Can view classes, grades, and assignments

## 🧪 Testing

### Quick Test Checklist

After starting the application:

1. ✅ **Login Test**
   - Go to http://localhost:3000
   - Try logging in with admin credentials
   - Should redirect to dashboard

2. ✅ **Navigation Test**
   - Click through different menu items
   - Dashboard, Classes, Assignments, etc.
   - All pages should load without errors

3. ✅ **API Test**
   - Backend should be running on port 5000
   - Visit: http://localhost:5000/api/health
   - Should return: `{"status":"ok","message":"Andile M-Afrika API is running"}`

4. ✅ **Role Test**
   - Logout and login with different accounts
   - Verify each role sees appropriate menus
   - Student shouldn't see admin features

### API Testing with curl

Test the backend directly:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@andile.edu","password":"admin123"}'
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Port Already in Use

**Error**: `Port 3000 is already in use`

**Solutions**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change the port in vite.config.ts
```

#### Issue 2: Backend Not Starting

**Error**: `Cannot find module 'express'`

**Solution**:
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

#### Issue 3: Database Issues

**Error**: `SQLITE_ERROR: no such table: users`

**Solution**:
```bash
cd backend
rm school.db  # Delete the database
npm run dev   # Restart - it will recreate and seed
```

#### Issue 4: TypeScript Errors

**Error**: `Cannot find module '@types/...'`

**Solution**:
```bash
# Reinstall TypeScript dependencies
cd frontend
npm install --save-dev typescript @types/react @types/react-dom

cd ../backend
npm install --save-dev typescript @types/node @types/express
```

#### Issue 5: CORS Errors

**Error**: `Access-Control-Allow-Origin`

**Solution**:
- Backend CORS is configured to allow all origins in development
- If issues persist, check `backend/src/server.ts` CORS configuration

#### Issue 6: Build Errors

**Error**: During `npm run build`

**Solution**:
```bash
# Clear cache and rebuild
cd frontend
rm -rf node_modules dist .vite
npm install
npm run build
```

### Getting Help

If you encounter issues not listed here:

1. **Check Console Logs**
   - Browser console (F12) for frontend errors
   - Terminal output for backend errors

2. **Check File Permissions**
   ```bash
   # Make sure you have write permissions
   ls -la backend/
   ```

3. **Verify Node Version**
   ```bash
   node --version
   # Must be v18 or higher
   ```

4. **Clean Install**
   ```bash
   # Nuclear option - start fresh
   rm -rf node_modules frontend/node_modules backend/node_modules
   rm -rf frontend/dist backend/dist
   npm run install:all
   ```

## 📊 Development Tools

### Recommended Browser Extensions

- **React Developer Tools** - Debug React components
- **Redux DevTools** - If you add Redux later
- **JSON Viewer** - Pretty print API responses

### Recommended VS Code Extensions

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript Vue Plugin** - Better TypeScript support
- **Tailwind CSS IntelliSense** - Tailwind autocomplete

## 🎯 Next Steps

Once everything is running:

1. **Explore the System**
   - Try all three user roles
   - Navigate through all pages
   - Test different features

2. **Review the Code**
   - Check `frontend/src/pages/` for page components
   - Check `backend/src/routes/` for API endpoints
   - Understand the database schema in `backend/src/database/init.ts`

3. **Customize**
   - Modify colors in `frontend/tailwind.config.js`
   - Add new features
   - Customize the school name and branding

4. **Deploy** (when ready)
   - Choose a hosting provider
   - Configure environment variables
   - Set up a production database

## 📚 Additional Resources

- **React Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Express.js Guide**: https://expressjs.com/

## ✅ Quick Start Checklist

- [ ] Node.js installed (v18+)
- [ ] Project dependencies installed
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can login with demo accounts
- [ ] All pages loading correctly
- [ ] No console errors

---

**You're all set! 🎉**

If you completed all steps successfully, your Andile M-Afrika School Management System is ready to use!

