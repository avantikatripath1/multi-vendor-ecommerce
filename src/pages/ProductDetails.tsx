import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Product } from '../types';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Shield, Truck, RefreshCcw, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
    </div>
  );

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors mb-12 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[3rem] overflow-hidden bg-neutral-100 aspect-square"
        >
          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
            </div>
            <h1 className="text-5xl font-display font-bold leading-tight">{product.name}</h1>
            <p className="text-3xl font-display font-medium">${product.price.toLocaleString()}</p>
          </div>

          <p className="text-neutral-500 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">Sold by {product.vendorName}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-200 rounded-full h-14 p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-neutral-100 rounded-full transition-colors text-xl"
                >
                  -
                </button>
                <div className="w-12 text-center font-bold">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-neutral-100 rounded-full transition-colors text-xl"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow h-14 bg-neutral-900 text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all premium-shadow active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-3xl border border-neutral-100 bg-white space-y-3">
              <Truck className="w-6 h-6 text-neutral-400" />
              <p className="font-bold text-sm">Free Shipping</p>
              <p className="text-xs text-neutral-500">On orders over $500</p>
            </div>
            <div className="p-6 rounded-3xl border border-neutral-100 bg-white space-y-3">
              <RefreshCcw className="w-6 h-6 text-neutral-400" />
              <p className="font-bold text-sm">Easy Returns</p>
              <p className="text-xs text-neutral-500">30-day money back</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
