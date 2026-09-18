'use client';

import React, { useState } from 'react';
import { MOCK_ORDERS, Order } from '@/data/customers';
import { Eye, CheckCircle2 } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: status });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-300">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Order Fulfillment</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Orders Management ({orders.length})</h1>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-900 text-white font-serif uppercase tracking-wider">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Type</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="p-3 font-bold text-neutral-900">{ord.orderNumber}</td>
                <td className="p-3 text-neutral-800 font-semibold">{ord.customerName}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${ord.type === 'wholesale' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                    {ord.type}
                  </span>
                </td>
                <td className="p-3 font-bold text-neutral-900">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                    {ord.paymentStatus}
                  </span>
                </td>
                <td className="p-3">
                  <select
                    value={ord.orderStatus}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['orderStatus'])}
                    className="p-1 border border-neutral-300 font-semibold text-[11px] text-neutral-800 bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelectedOrder(ord)}
                    className="p-1.5 text-neutral-700 hover:text-[#C4A35A] font-bold flex items-center space-x-1 ml-auto"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-neutral-900 max-w-lg w-full p-6 border border-neutral-200 shadow-2xl relative space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
              <h3 className="font-serif font-bold text-lg text-neutral-900">
                Order {selectedOrder.orderNumber}
              </h3>
              <button onClick={() => setSelectedOrder(null)} className="text-xs font-bold text-neutral-400 hover:text-neutral-900">
                Close ✕
              </button>
            </div>

            <div className="text-xs space-y-2">
              <p><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.customerEmail})</p>
              <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
            </div>

            <div className="border border-neutral-200 bg-neutral-50 p-3 space-y-2 text-xs">
              <span className="font-bold text-neutral-900 block border-b border-neutral-200 pb-1">Order Items</span>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.productName} ({it.size} / {it.color}) x {it.quantity}</span>
                  <span className="font-bold">₹{it.total.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="text-right font-serif font-bold text-base text-[#C4A35A]">
              Total: ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
