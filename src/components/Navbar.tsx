import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, LogOut, Menu, Search } from 'lucide-react';
import { User } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-neutral-200/50 h-16 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">NEXUS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Shop</Link>
          <Link to="/" className="hover:text-neutral-900 transition-colors">Categories</Link>
          {user?.role === 'VENDOR' && (
            <Link to="/vendor" className="text-blue-600 hover:text-blue-700">Vendor Panel</Link>
          )}
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="text-purple-600 hover:text-purple-700">Admin</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-neutral-100 border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-neutral-200 transition-all outline-none"
            />
          </div>

          <Link to="/cart" className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-neutral-700" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l pl-4 ml-2">
              <Link to="/orders" className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <UserIcon className="w-5 h-5 text-neutral-700" />
              </Link>
              <button 
                onClick={() => { onLogout(); navigate('/'); }}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <LogOut className="w-5 h-5 text-neutral-700" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-neutral-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all premium-shadow"
            >
              Sign In
            </Link>
          )}
          
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
