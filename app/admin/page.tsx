'use client';

import React from 'react';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';
import { MOCK_ORDERS } from '@/data/customers';
import { PRODUCTS } from '@/data/products';
import { DollarSign, ShoppingBag, FileCheck, AlertTriangle, Plus, CheckCircle2, ArrowRight, Package } from 'lucide-react';

export default function AdminDashboardPage() {
  const { wholesaleApplications, updateApplicationStatus } = useRole();

  const pendingApps = wholesaleApplications.filter((a) => a.status === 'pending');
  const lowStockProducts = PRODUCTS.filter((p) => p.stockCount <= 25);
  const totalSales = 1820000;

  return (
    <div className="space-y-6">
      {/* Simple Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
          <p className="text-xs text-neutral-500 mt-0.5">Welcome back! Manage orders, products, and wholesale requests.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-[#C4A35A] text-white text-xs font-bold rounded-lg hover:bg-[#A8893D] transition-colors shadow-sm flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* 4 Simple Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-5 bg-white border border-neutral-200 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">₹{totalSales.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-emerald-600 font-semibold block">+24% vs last month</span>
        </div>

        {/* Stat 2 */}
        <div className="p-5 bg-white border border-neutral-200 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">1,482</div>
          <span className="text-[11px] text-neutral-500 block">Retail &amp; Wholesale combined</span>
        </div>

        {/* Stat 3 */}
        <div className="p-5 bg-white border border-neutral-200 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending B2B Requests</span>
            <FileCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{pendingApps.length}</div>
          <Link href="/admin/wholesale-applications" className="text-[11px] text-[#C4A35A] font-bold hover:underline block">
            Review Applications →
          </Link>
        </div>

        {/* Stat 4 */}
        <div className="p-5 bg-white border border-neutral-200 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{lowStockProducts.length}</div>
          <Link href="/admin/inventory" className="text-[11px] text-rose-600 font-bold hover:underline block">
            Manage Inventory →
          </Link>
        </div>
      </div>

      {/* Main Action Section: Pending Wholesale Applications Quick Approval */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-neutral-900">Wholesale Partner Applications Needing Approval</h3>
            <p className="text-xs text-neutral-500">Click &quot;Approve&quot; to immediately unlock wholesale tier rates for the business client.</p>
          </div>
          <Link href="/admin/wholesale-applications" className="text-xs font-bold text-[#C4A35A] hover:underline">
            View All ({wholesaleApplications.length}) →
          </Link>
        </div>

        <div className="divide-y divide-neutral-200 text-xs">
          {pendingApps.length === 0 ? (
            <div className="p-6 text-center text-neutral-500 font-medium">
              ✨ No pending applications. All wholesale requests have been processed!
            </div>
          ) : (
            pendingApps.map((app) => (
              <div key={app.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-neutral-900 text-sm">{app.businessName}</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                      GST: {app.gstNumber}
                    </span>
                  </div>
                  <p className="text-neutral-600 text-xs">
                    Contact: <strong>{app.contactPerson}</strong> ({app.email} • {app.phone}) | Location: {app.city}, {app.state}
                  </p>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => updateApplicationStatus(app.id, 'approved')}
                    className="px-4 py-2 bg-emerald-600 text-white font-bold rounded text-xs hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    ✓ Approve Account
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(app.id, 'rejected')}
                    className="px-3 py-2 bg-neutral-200 text-neutral-700 font-semibold rounded text-xs hover:bg-neutral-300 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Simple Recent Orders Summary */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <h3 className="font-bold text-sm text-neutral-900">Recent Customer Orders</h3>
          <Link href="/admin/orders" className="text-xs font-bold text-[#C4A35A] hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-100 text-neutral-700 font-bold uppercase tracking-wider">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer / Business</th>
                <th className="p-3">Type</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {MOCK_ORDERS.slice(0, 4).map((ord) => (
                <tr key={ord.id} className="hover:bg-neutral-50">
                  <td className="p-3 font-mono font-bold text-neutral-900">{ord.orderNumber}</td>
                  <td className="p-3 font-medium text-neutral-800">{ord.customerName}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${ord.type === 'wholesale' ? 'bg-rose-100 text-[#C4A35A]' : 'bg-neutral-200 text-neutral-700'}`}>
                      {ord.type}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-neutral-900">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded uppercase">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link href="/admin/orders" className="text-[#C4A35A] font-bold hover:underline">
                      Manage →
                    </Link>
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
