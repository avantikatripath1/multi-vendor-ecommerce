import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { User, Role } from '../types';
import { motion } from 'motion/react';
import { Mail, Lock, User as UserIcon, ArrowRight, AlertCircle, ShoppingBag, Store } from 'lucide-react';
import { cn } from '../lib/utils';

interface RegisterProps {
  onLogin: (user: User, token: string) => void;
}

export default function Register({ onLogin }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('CUSTOMER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      onLogin(res.data.user, res.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white p-10 rounded-[2.5rem] premium-shadow border border-neutral-100 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold">Join Nexus</h1>
            <p className="text-neutral-500">Choose your account type and get started.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setRole('CUSTOMER')}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all text-left space-y-2",
                role === 'CUSTOMER' ? "border-neutral-900 bg-neutral-50" : "border-neutral-100 hover:border-neutral-200"
              )}
            >
              <ShoppingBag className={cn("w-6 h-6", role === 'CUSTOMER' ? "text-neutral-900" : "text-neutral-400")} />
              <div>
                <p className="font-bold text-sm">Customer</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">I want to shop</p>
              </div>
            </button>
            <button 
              onClick={() => setRole('VENDOR')}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all text-left space-y-2",
                role === 'VENDOR' ? "border-neutral-900 bg-neutral-50" : "border-neutral-100 hover:border-neutral-200"
              )}
            >
              <Store className={cn("w-6 h-6", role === 'VENDOR' ? "text-neutral-900" : "text-neutral-400")} />
              <div>
                <p className="font-bold text-sm">Vendor</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">I want to sell</p>
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-50 border-none rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-neutral-200 transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-50 border-none rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-neutral-200 transition-all font-medium"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-50 border-none rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-neutral-200 transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all premium-shadow disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Get Started'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="text-center text-sm text-neutral-500">
            Already have an account? {' '}
            <Link to="/login" className="text-neutral-900 font-bold hover:underline">Sign in</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
