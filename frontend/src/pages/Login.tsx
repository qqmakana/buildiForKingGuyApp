import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { School, Mail, Lock, AlertCircle, BookOpen, Users, Award } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Student', email: 'student@andile.edu', password: 'student123', icon: BookOpen, color: 'bg-blue-500' },
    { role: 'Teacher', email: 'teacher@andile.edu', password: 'teacher123', icon: Users, color: 'bg-green-500' },
    { role: 'Admin', email: 'admin@andile.edu', password: 'admin123', icon: Award, color: 'bg-purple-500' },
  ];

  const quickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-white p-3 rounded-xl">
              <School className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-white">Andile M-Afrika</span>
          </div>
          
          <div className="mt-16 space-y-8">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Transform Your<br />
              Learning Journey
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Access world-class education, connect with expert instructors, and achieve your academic goals.
            </p>

            {/* Features */}
            <div className="mt-12 space-y-4">
              {[
                { icon: BookOpen, text: 'Interactive Online Courses' },
                { icon: Users, text: 'Expert Instructors' },
                { icon: Award, text: 'Certified Programs' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-white">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-blue-100 text-sm relative z-10">
          © 2025 Andile M-Afrika School. Empowering minds, shaping futures.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="bg-blue-600 p-3 rounded-xl">
              <School className="h-8 w-8 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">Andile M-Afrika</span>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue your learning</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base"
                    placeholder="your.email@andile.edu"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-4 text-center">Quick Demo Access</p>
              <div className="grid grid-cols-3 gap-3">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    onClick={() => quickLogin(account.email, account.password)}
                    className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group"
                  >
                    <div className={`${account.color} p-2 rounded-lg mb-2 group-hover:scale-110 transition-transform`}>
                      <account.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{account.role}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">Click to auto-fill credentials</p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
