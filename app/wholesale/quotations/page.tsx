'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_QUOTATIONS } from '@/data/customers';

export default function WholesaleQuotationsPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D0]">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Commercial RFQ</span>
            <h1 className="font-serif text-3xl font-bold text-[#212529] mt-1">Quotation Requests (RFQ)</h1>
          </div>
          <Link href="/wholesale/dashboard" className="text-xs font-bold text-[#6B7280] hover:text-[#212529] underline">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="border border-[#E8E0D0] bg-[#FBF8F1]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-100 text-[#212529] font-serif uppercase tracking-wider border-b border-[#E8E0D0]">
                <th className="p-3">Quote No</th>
                <th className="p-3">Business</th>
                <th className="p-3">Items Requested</th>
                <th className="p-3">Subtotal</th>
                <th className="p-3">GST Tax</th>
                <th className="p-3">Grand Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Valid Until</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_QUOTATIONS.map((q) => (
                <tr key={q.id} className="border-b border-[#E8E0D0] hover:bg-[#FFF9EF]">
                  <td className="p-3 font-bold text-[#212529]">{q.quoteNumber}</td>
                  <td className="p-3 font-semibold text-neutral-800">{q.businessName}</td>
                  <td className="p-3 text-[#212529]">
                    {q.items.map((i) => `${i.productName} (${i.requestedQty} pcs)`).join(', ')}
                  </td>
                  <td className="p-3 text-neutral-800">₹{q.subtotal.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-[#6B7280]">₹{q.gstAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-bold text-[#212529]">₹{q.grandTotal.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                        q.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : q.status === 'sent'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#6B7280]">{q.validUntil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
