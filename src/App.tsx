import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { User } from './types';
import { CartProvider } from './context/CartContext';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) return null;

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
          <Navbar user={user} onLogout={logout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route path="/register" element={<Register onLogin={login} />} />
              
              {/* Protected Routes */}
              <Route 
                path="/orders" 
                element={user ? <Orders /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/vendor" 
                element={user?.role === 'VENDOR' ? <VendorDashboard /> : <Navigate to="/" />} 
              />
              <Route 
                path="/admin" 
                element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />} 
              />
            </Routes>
          </main>
          <footer className="py-12 bg-white border-t border-neutral-100 mt-20">
            <div className="max-w-7xl mx-auto px-6 text-center text-neutral-400 text-sm">
              © 2026 Nexus E-commerce. Crafted for the modern web.
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}
