import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';

interface ProductModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductModal({ onClose, onSuccess }: ProductModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Laptops');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('10');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/products', {
        name,
        description,
        price: parseFloat(price),
        category,
        image: image || 'https://picsum.photos/seed/product/500/500',
        stock: parseInt(stock)
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] premium-shadow overflow-hidden translate-y-0 opacity-100 transition-all">
        <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold">Add Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2">Product Name</label>
              <input 
                required
                className="w-full bg-neutral-50 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-neutral-200"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2">Description</label>
              <textarea 
                required
                rows={3}
                className="w-full bg-neutral-50 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-neutral-200"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2">Price ($)</label>
                <input 
                  type="number"
                  required
                  className="w-full bg-neutral-50 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-neutral-200"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2">Stock</label>
                <input 
                  type="number"
                  required
                  className="w-full bg-neutral-50 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-neutral-200"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2">Category</label>
              <select 
                className="w-full bg-neutral-50 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-neutral-200"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option>Laptops</option>
                <option>Audio</option>
                <option>Furniture</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2">Image URL (Optional)</label>
              <input 
                className="w-full bg-neutral-50 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-neutral-200"
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={e => setImage(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold hover:bg-neutral-800 transition-all premium-shadow disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
