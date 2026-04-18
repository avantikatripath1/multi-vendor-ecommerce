import { useState, useEffect } from 'react';
import api from '../services/api';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-60 scale-105"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-8"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase">
              New Collection 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tight">
              Elevate Your <br /> Everyday.
            </h1>
            <p className="text-xl text-neutral-300 max-w-lg leading-relaxed">
              Curated by experts, chosen by you. Discover the finest selection of premium products from top global vendors.
            </p>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-neutral-900 px-8 py-4 rounded-full font-bold hover:bg-neutral-100 transition-all flex items-center gap-2 group"
              >
                Shop Now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Explore Categories
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">Collections</h2>
            <p className="text-4xl font-display font-bold">Featured Categories</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                setSelectedCategory(category.name);
                document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer premium-shadow"
            >
              <img 
                src={category.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={category.name}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{category.name}</h3>
                <div className="h-1 w-0 group-hover:w-full bg-white transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">
              {selectedCategory ? `Browsing ${selectedCategory}` : 'Curated'}
            </h2>
            <p className="text-4xl font-display font-bold">
              {selectedCategory ? `${selectedCategory} Collection` : 'Trending Products'}
            </p>
          </div>
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-sm font-bold border-b-2 border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-all"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products
            .filter(product => !selectedCategory || product.category === selectedCategory)
            .map((product) => (
              // @ts-ignore
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
}
