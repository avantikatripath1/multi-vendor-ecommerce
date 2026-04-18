import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import api from '../services/api';

export default function Cart() {
  const { items, totalPrice, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        totalAmount: totalPrice
      };

      await api.post('/orders', orderData);
      clearCart();
      navigate('/orders');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">Review</h2>
          <p className="text-5xl font-display font-bold">Your Bag</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm mb-8 animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-neutral-100 space-y-6">
          <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-300">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-display font-bold">Your cart is empty</p>
            <p className="text-neutral-500">Looks like you haven't added anything yet.</p>
          </div>
          <Link to="/" className="inline-block bg-neutral-900 text-white px-8 py-3 rounded-full font-bold hover:bg-neutral-800 transition-all">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="bg-white p-6 rounded-[2rem] border border-neutral-100 flex gap-6 items-center">
                <div className="w-24 h-24 rounded-2xl bg-neutral-100 overflow-hidden shrink-0">
                  <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-display font-bold text-lg">{item.product.name}</h3>
                  <p className="text-sm text-neutral-500">Vendor: {item.product.vendorName}</p>
                  <p className="text-xs font-bold text-neutral-400 mt-1">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-display font-bold text-xl">${(item.product.price * item.quantity).toLocaleString()}</p>
                  <button 
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-10 rounded-[2.5rem] border border-neutral-100 premium-shadow space-y-8 sticky top-24">
              <h3 className="text-2xl font-display font-bold">Summary</h3>
              
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="pt-4 border-t border-neutral-100 flex justify-between text-xl font-display font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all premium-shadow disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Checkout'} <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-bold uppercase tracking-widest justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Secure Checkout Powered by Nexus
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
