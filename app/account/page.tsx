'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';
import { useWishlist } from '@/context/WishlistContext';
import { MOCK_ORDERS } from '@/data/customers';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, Package, Clock, CheckCircle2 } from 'lucide-react';

export default function AccountPage() {
  const { user, setRole } = useRole();
  const { wishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'profile'>('overview');

  const retailOrders = MOCK_ORDERS.filter((o) => o.type === 'retail');

  const handleLogout = () => {
    setRole('guest');
  };

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Account Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <div className="p-5 bg-[#FFF9EF] text-[#212529] border border-[#E8E0D0] shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C4A35A] block">
                Customer Account
              </span>
              <h3 className="font-serif font-bold text-base text-[#212529]">{user.name}</h3>
              <p className="text-xs text-[#6B7280] truncate">{user.email || 'customer@example.com'}</p>
            </div>

            <nav className="bg-[#FFF9EF] border border-[#E8E0D0] text-xs font-semibold uppercase tracking-wider space-y-1 p-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left flex items-center space-x-2.5 p-2.5 transition-colors ${
                  activeTab === 'overview' ? 'bg-[#C4A35A] text-white font-bold' : 'text-[#212529] hover:bg-neutral-200'
                }`}
              >
                <User className="w-4 h-4 text-[#C4A35A]" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left flex items-center space-x-2.5 p-2.5 transition-colors ${
                  activeTab === 'orders' ? 'bg-[#C4A35A] text-white font-bold' : 'text-[#212529] hover:bg-neutral-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>My Orders ({retailOrders.length})</span>
              </button>
              <Link
                href="/wishlist"
                className="w-full text-left flex items-center space-x-2.5 p-2.5 text-[#212529] hover:bg-neutral-200"
              >
                <Heart className="w-4 h-4" />
                <span>Saved Wishlist ({wishlist.length})</span>
              </Link>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left flex items-center space-x-2.5 p-2.5 transition-colors ${
                  activeTab === 'addresses' ? 'bg-[#C4A35A] text-white font-bold' : 'text-[#212529] hover:bg-neutral-200'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center space-x-2.5 p-2.5 text-rose-600 hover:bg-[#F5F0E5] font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Account View */}
          <main className="flex-1 space-y-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Retail Dashboard</span>
              <h1 className="font-serif text-3xl font-bold text-[#212529] mt-1">Welcome Back, {user.name}</h1>
            </div>

            {/* Dashboard Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-[#FFF9EF] border border-[#E8E0D0] space-y-1">
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Total Orders</span>
                <div className="font-serif text-2xl font-bold text-[#212529]">{retailOrders.length}</div>
              </div>
              <div className="p-4 bg-[#FFF9EF] border border-[#E8E0D0] space-y-1">
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Pending Orders</span>
                <div className="font-serif text-2xl font-bold text-amber-600">0</div>
              </div>
              <div className="p-4 bg-[#FFF9EF] border border-[#E8E0D0] space-y-1">
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Completed Orders</span>
                <div className="font-serif text-2xl font-bold text-emerald-600">{retailOrders.length}</div>
              </div>
              <div className="p-4 bg-[#FFF9EF] border border-[#E8E0D0] space-y-1">
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Wishlist Items</span>
                <div className="font-serif text-2xl font-bold text-[#C4A35A]">{wishlist.length}</div>
              </div>
            </div>

            {/* Content Tab View */}
            {activeTab === 'overview' || activeTab === 'orders' ? (
              <div className="border border-[#E8E0D0] bg-[#FBF8F1]">
                <div className="p-4 border-b border-[#E8E0D0] bg-[#FFF9EF]">
                  <h3 className="font-serif font-bold text-base text-[#212529]">Recent Order History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-100 text-[#212529] font-serif uppercase tracking-wider border-b border-[#E8E0D0]">
                        <th className="p-3">Order #</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Items</th>
                        <th className="p-3">Total Amount</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {retailOrders.map((ord) => (
                        <tr key={ord.id} className="border-b border-[#E8E0D0] hover:bg-[#FFF9EF]">
                          <td className="p-3 font-bold text-[#212529]">{ord.orderNumber}</td>
                          <td className="p-3 text-[#6B7280]">{ord.createdAt}</td>
                          <td className="p-3 text-[#212529]">
                            {ord.items.map((i) => `${i.productName} (${i.size})`).join(', ')}
                          </td>
                          <td className="p-3 font-bold text-[#212529]">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold text-[10px] uppercase">
                              {ord.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] space-y-4 text-xs">
                <h3 className="font-serif font-bold text-lg text-[#212529]">Saved Address</h3>
                <div className="p-4 bg-[#FBF8F1] border border-neutral-300 max-w-sm space-y-1">
                  <span className="font-bold text-[#212529]">{user.name}</span>
                  <p className="text-[#6B7280]">#42, Indiranagar 100ft Road, Commercial Complex</p>
                  <p className="text-[#6B7280]">Bengaluru, KA 560038</p>
                  <p className="text-[#6B7280]">Phone: +91 98765 43210</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
