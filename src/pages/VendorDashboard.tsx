import { useState, useEffect } from 'react';
import api from '../services/api';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Package, DollarSign, TrendingUp, Edit2, Trash2 } from 'lucide-react';
import ProductModal from '../components/ProductModal';

export default function VendorDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchMyProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Implementation for delete would go here in server.ts
        alert('Delete functionality is reserved for production environments. In this mock, we refresh the list.');
        fetchMyProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">Management</h2>
          <p className="text-5xl font-display font-bold">Vendor Dashboard</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-neutral-900 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-neutral-800 transition-all premium-shadow active:scale-95"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <ProductModal 
            onClose={() => setShowModal(false)} 
            onSuccess={fetchMyProducts}
          />
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Sales', value: '$12,450', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Orders', value: '84', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Revenue Growth', value: '+12.5%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-display font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden premium-shadow">
        <div className="p-8 border-b border-neutral-100">
          <h3 className="text-xl font-display font-bold">Your Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                <th className="px-8 py-4">Product</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4">Stock</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 italic font-medium">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-display font-bold text-neutral-900 not-italic">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-tighter not-italic">Active</span>
                  </td>
                  <td className="px-8 py-6 not-italic font-bold">${product.price}</td>
                  <td className="px-8 py-6 not-italic text-neutral-500">{product.stock} in stock</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 not-italic">
                      <button className="p-2 hover:bg-neutral-200 rounded-full transition-colors text-neutral-600 outline-none focus:ring-2 focus:ring-neutral-200">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500 outline-none focus:ring-2 focus:ring-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
