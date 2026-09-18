'use client';

import React, { useState } from 'react';
import { MOCK_QUOTATIONS, Quotation } from '@/data/customers';

export default function AdminQuotationsPage() {
  const [quotes, setQuotes] = useState<Quotation[]>(MOCK_QUOTATIONS);

  const handleStatus = (id: string, status: Quotation['status']) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">B2B Pricing RFQ</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Quotation Requests ({quotes.length})</h1>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-900 text-white font-serif uppercase tracking-wider">
              <th className="p-3">Quote ID</th>
              <th className="p-3">Business Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="p-3 font-bold text-neutral-900">{q.quoteNumber}</td>
                <td className="p-3 font-semibold text-neutral-800">{q.businessName}</td>
                <td className="p-3 text-neutral-600">{q.contactPerson} ({q.email})</td>
                <td className="p-3 font-bold text-neutral-900">₹{q.grandTotal.toLocaleString('en-IN')}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold uppercase text-[10px]">
                    {q.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-1">
                  <button
                    onClick={() => handleStatus(q.id, 'sent')}
                    className="px-2 py-1 bg-neutral-900 text-white text-[10px] uppercase font-bold hover:bg-neutral-800"
                  >
                    Send Quote
                  </button>
                  <button
                    onClick={() => handleStatus(q.id, 'accepted')}
                    className="px-2 py-1 bg-emerald-600 text-white text-[10px] uppercase font-bold hover:bg-emerald-700"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
