'use client';

import React, { useState } from 'react';
import { MOCK_CUSTOMERS, Customer } from '@/data/customers';

export default function AdminCustomersPage() {
  const [filter, setFilter] = useState<'all' | 'retail' | 'wholesale' | 'pending'>('all');

  const filteredCustomers = MOCK_CUSTOMERS.filter((c) => {
    if (filter === 'retail') return c.type === 'retail';
    if (filter === 'wholesale') return c.type === 'wholesale';
    if (filter === 'pending') return c.status === 'pending';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-300">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">CRM Portal</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Customer CRM</h1>
        </div>
      </div>

      <div className="flex space-x-2 border-b border-neutral-200 pb-2">
        {(['all', 'retail', 'wholesale', 'pending'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
              filter === tab ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-900 text-white font-serif uppercase tracking-wider">
              <th className="p-3">Customer Name</th>
              <th className="p-3">Contact Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Account Type</th>
              <th className="p-3">Total Orders</th>
              <th className="p-3">Total Spent</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="p-3 font-bold text-neutral-900">
                  {cust.name}
                  {cust.companyName && <span className="block text-[10px] text-neutral-400 font-normal">{cust.companyName}</span>}
                </td>
                <td className="p-3 text-neutral-700">{cust.email}</td>
                <td className="p-3 text-neutral-600">{cust.phone}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${cust.type === 'wholesale' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                    {cust.type}
                  </span>
                </td>
                <td className="p-3 text-neutral-800 font-semibold">{cust.totalOrders}</td>
                <td className="p-3 font-bold text-neutral-900">₹{cust.totalSpent.toLocaleString('en-IN')}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${cust.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {cust.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
