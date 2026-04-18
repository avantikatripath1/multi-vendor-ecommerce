import { useState, useEffect } from 'react';
import api from '../services/api';
import { Order } from '../types';
import { Package, Clock, CheckCircle, ChevronRight } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div>
        <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">History</h2>
        <p className="text-5xl font-display font-bold">Your Orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-16 rounded-[3rem] border border-neutral-100 text-center">
          <p className="text-neutral-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 premium-shadow flex flex-wrap gap-8 items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center text-white">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Order ID: {order.id}</p>
                  <p className="font-display font-bold text-xl">{order.items.length} Items Purchased</p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Total</p>
                  <p className="font-display font-bold text-2xl">${order.totalAmount.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full text-xs font-bold uppercase tracking-widest">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {order.status}
                  </div>
                  <button className="mt-2 text-sm font-bold text-neutral-400 hover:text-neutral-900 flex items-center gap-1 group">
                    View Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
