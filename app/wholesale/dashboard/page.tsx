'use client';

import React from 'react';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';
import { MOCK_ORDERS, MOCK_QUOTATIONS } from '@/data/customers';
import { Building2, ShoppingBag, FileText, CheckCircle2, Clock, Package, Download, User, ArrowRight } from 'lucide-react';

export default function WholesaleDashboardPage() {
  const { role, user, wholesaleApplications } = useRole();

  const wholesaleOrders = MOCK_ORDERS.filter((o) => o.type === 'wholesale');
  const totalPurchaseValue = wholesaleOrders.reduce((acc, o) => acc + o.totalAmount, 0);

  const existingApp = wholesaleApplications.find(
    (a) => a.email === user.email || (user.companyName && a.businessName === user.companyName)
  );

  const isApproved = role === 'wholesale_approved' || (existingApp && existingApp.status === 'approved');
  const isPending = role === 'wholesale_pending' || (existingApp && existingApp.status === 'pending');

  return (
    <div className="bg-[#F8FAFC] text-[#212529] min-h-screen pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Simple Business Welcome Card */}
        <div className="bg-[#FBF8F1] border border-[#E8E0D0] p-6 sm:p-8 rounded-xl shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-[#F5F0E5] text-[#C4A35A] text-[11px] font-bold uppercase rounded">
                  B2B Wholesale Account
                </span>
                <span className="text-xs text-neutral-400">•</span>
                <span className="text-xs font-mono text-[#6B7280]">GST: {user.gstNumber || '29ABCDE1234F1Z5'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#212529] mt-1">
                {user.companyName || 'Apex Corporate Garments Ltd'}
              </h1>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Contact: <strong>{user.name}</strong> ({user.email || 'procurement@apexcorp.com'})
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/wholesale/products"
                className="px-5 py-2.5 bg-[#C4A35A] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#A8893D] transition-colors shadow-sm flex items-center space-x-2"
              >
                <Package className="w-4 h-4" />
                <span>Browse Bulk Catalog</span>
              </Link>
            </div>
          </div>

          {/* Simple Status Banner */}
          {isApproved ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-xs flex items-center justify-between text-emerald-900">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="font-bold">Your Wholesale Account is Approved &amp; Active!</strong>
                  <span className="block text-emerald-800 text-[11px]">
                    You have unlocked wholesale tier rates (35%–55% off), bulk size matrices, and GST tax credit invoices.
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-200 text-emerald-900 text-[10px] font-bold uppercase rounded-full">
                APPROVED
              </span>
            </div>
          ) : isPending ? (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg text-xs flex items-center justify-between text-amber-900">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <strong className="font-bold">Application Under Admin Review</strong>
                  <span className="block text-amber-800 text-[11px]">
                    Your business application is being reviewed by Admin. Click below to approve it instantly.
                  </span>
                </div>
              </div>
              <Link
                href="/admin/wholesale-applications"
                className="px-3 py-1.5 bg-amber-600 text-white text-[10px] font-bold uppercase rounded-lg hover:bg-amber-700 whitespace-nowrap"
              >
                Approve in Admin
              </Link>
            </div>
          ) : null}
        </div>

        {/* Clean Portal Navigation Tabs */}
        <div className="bg-[#FBF8F1] border border-[#E8E0D0] rounded-xl p-2 flex items-center space-x-2 overflow-x-auto text-xs font-bold uppercase">
          <Link
            href="/wholesale/dashboard"
            className="px-4 py-2.5 bg-neutral-900 text-white rounded-lg whitespace-nowrap flex items-center space-x-2"
          >
            <Building2 className="w-4 h-4 text-[#C4A35A]" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/wholesale/products"
            className="px-4 py-2.5 text-[#212529] hover:bg-neutral-100 rounded-lg whitespace-nowrap flex items-center space-x-2"
          >
            <Package className="w-4 h-4" />
            <span>Wholesale Products</span>
          </Link>
          <Link
            href="/wholesale/orders"
            className="px-4 py-2.5 text-[#212529] hover:bg-neutral-100 rounded-lg whitespace-nowrap flex items-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bulk Orders</span>
          </Link>
          <Link
            href="/wholesale/quotations"
            className="px-4 py-2.5 text-[#212529] hover:bg-neutral-100 rounded-lg whitespace-nowrap flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Quotations (RFQ)</span>
          </Link>
          <Link
            href="/wholesale/invoices"
            className="px-4 py-2.5 text-[#212529] hover:bg-neutral-100 rounded-lg whitespace-nowrap flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>GST Invoices</span>
          </Link>
          <Link
            href="/wholesale/company-profile"
            className="px-4 py-2.5 text-[#212529] hover:bg-neutral-100 rounded-lg whitespace-nowrap flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Company Profile</span>
          </Link>
        </div>

        {/* 4 Simple Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-[#6B7280] uppercase">Active Orders</span>
            <div className="text-2xl font-bold text-[#212529]">
              {wholesaleOrders.filter((o) => o.orderStatus === 'processing' || o.orderStatus === 'shipped').length}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold block">1 order in transit</span>
          </div>

          <div className="p-5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-[#6B7280] uppercase">Pending RFQs</span>
            <div className="text-2xl font-bold text-[#212529]">
              {MOCK_QUOTATIONS.filter((q) => q.status === 'pending' || q.status === 'sent').length}
            </div>
            <span className="text-[11px] text-amber-600 font-semibold block">Under quote review</span>
          </div>

          <div className="p-5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-[#6B7280] uppercase">Completed Orders</span>
            <div className="text-2xl font-bold text-[#212529]">12</div>
            <span className="text-[11px] text-[#6B7280] block">Fulfilled shipments</span>
          </div>

          <div className="p-5 bg-[#F5F0E5]/70 border border-[#E8D5A3] rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-[#A8893D] uppercase">Total Purchase Value</span>
            <div className="text-2xl font-bold text-[#C4A35A]">
              ₹{totalPurchaseValue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-[#6B7280] font-semibold block">GST tax credit applied</span>
          </div>
        </div>

        {/* Simple Recent Bulk Orders Table */}
        <div className="bg-[#FBF8F1] border border-[#E8E0D0] rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#E8E0D0] bg-[#FFF9EF] flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#212529]">Recent Bulk Orders &amp; Dispatches</h3>
            <Link href="/wholesale/orders" className="text-xs font-bold text-[#C4A35A] hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-100 text-[#212529] font-bold uppercase">
                  <th className="p-3">Order Number</th>
                  <th className="p-3">Items Summary</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Tax Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {wholesaleOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FFF9EF]">
                    <td className="p-3 font-mono font-bold text-[#212529]">{ord.orderNumber}</td>
                    <td className="p-3 text-neutral-800 font-medium">
                      {ord.items[0]?.productName} ({ord.items.reduce((a, i) => a + i.quantity, 0)} pcs)
                    </td>
                    <td className="p-3 font-bold text-[#212529]">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded">
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase rounded">
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link href="/wholesale/invoices" className="text-[#C4A35A] font-bold hover:underline">
                        Download Invoice →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
