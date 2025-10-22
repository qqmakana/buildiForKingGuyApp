import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types';
import { API_URL } from '../config';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Try backend first, fallback to mock data if unavailable
      try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(user);
        return;
      } catch (backendError) {
        // Backend unavailable, use mock authentication
        console.log('Backend unavailable, using demo mode');
      }

      // Mock authentication for demo
      const mockUsers: Record<string, any> = {
        'student@andile.edu': {
          id: 's1',
          email: 'student@andile.edu',
          name: 'Demo Student',
          role: 'student',
          studentId: 'STU001',
          grade: 'Grade 10',
          class: '10A',
          subjects: ['Mathematics', 'Science', 'English', 'History', 'Computer Science']
        },
        'teacher@andile.edu': {
          id: 't1',
          email: 'teacher@andile.edu',
          name: 'Demo Teacher',
          role: 'teacher',
          teacherId: 'TCH001'
        },
        'admin@andile.edu': {
          id: 'admin1',
          email: 'admin@andile.edu',
          name: 'Administrator',
          role: 'admin'
        }
      };

      const mockUser = mockUsers[email];
      if (mockUser && password.includes('123')) {
        const token = 'demo-token-' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

