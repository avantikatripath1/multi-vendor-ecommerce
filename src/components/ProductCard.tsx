import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="block overflow-hidden rounded-3xl bg-neutral-100 mb-4 aspect-[4/5] relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </Link>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
          {product.category}
        </div>
        <button 
          onClick={() => addToCart(product, 1)}
          className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-neutral-900 text-white p-3 rounded-full premium-shadow active:scale-90"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Link to={`/product/${product.id}`} className="font-display font-semibold text-lg hover:text-neutral-600 transition-colors line-clamp-1">
            {product.name}
          </Link>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>By {product.vendorName}</span>
          <span className="font-display font-bold text-neutral-900 text-lg">${product.price.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
