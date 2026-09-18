'use client';

import React from 'react';
import Link from 'next/link';
import { MudraLogo } from '@/components/brand/MudraLogo';
import { Printer, Download } from 'lucide-react';

export default function WholesaleInvoicesPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D0]">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Tax Invoice Preview</span>
            <h1 className="font-serif text-3xl font-bold text-[#212529] mt-1">GST Tax Invoice #INV-2026-089</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 hover:bg-neutral-800"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <Link href="/wholesale/dashboard" className="px-4 py-2 border border-neutral-300 text-xs font-bold text-[#212529] hover:bg-neutral-100">
              Back
            </Link>
          </div>
        </div>

        {/* Tax Invoice Document Template */}
        <div className="bg-[#FBF8F1] border-2 border-neutral-900 p-8 space-y-6 shadow-xl print:shadow-none print:border-none">
          <div className="flex justify-between items-start pb-6 border-b border-neutral-300">
            <MudraLogo size="sm" />
            <div className="text-right text-xs text-[#6B7280]">
              <h2 className="font-serif font-bold text-base text-[#212529] uppercase">ORIGINAL TAX INVOICE</h2>
              <p>Invoice No: <strong>MF-INV-2026-089</strong></p>
              <p>Invoice Date: <strong>25 Aug 2026</strong></p>
              <p>Mudra GSTIN: <strong>29AAACM1234F1Z9</strong></p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 text-xs border-b border-neutral-300 pb-6">
            <div>
              <span className="font-bold text-[#212529] uppercase block mb-1">Billed To (Customer):</span>
              <p className="font-bold text-neutral-800">Apex Corporate Garments Ltd</p>
              <p className="text-[#6B7280]">GSTIN: 29ABCDE1234F1Z5</p>
              <p className="text-[#6B7280]">Apex Towers, Tech Park Phase 2, Whitefield</p>
              <p className="text-[#6B7280]">Bengaluru, KA 560066</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#212529] uppercase block mb-1">Supplier Details:</span>
              <p className="font-bold text-neutral-800">MUDRA FASHIONS TEXTILES PVT LTD</p>
              <p className="text-[#6B7280]">Commercial Complex, Indiranagar</p>
              <p className="text-[#6B7280]">Bengaluru, KA 560038</p>
              <p className="text-[#6B7280]">Email: billing@mudrafashions.com</p>
            </div>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-100 font-bold uppercase border-b border-neutral-300">
                <th className="p-2">Item Description</th>
                <th className="p-2">HSN Code</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Unit Rate</th>
                <th className="p-2 text-right">Taxable Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E8E0D0]">
                <td className="p-2">ProServe Corporate Uniform Shirt (White / Size M)</td>
                <td className="p-2">62052000</td>
                <td className="p-2">100 pcs</td>
                <td className="p-2">₹480</td>
                <td className="p-2 text-right font-bold">₹48,000</td>
              </tr>
              <tr className="border-b border-[#E8E0D0]">
                <td className="p-2">ProServe Corporate Uniform Shirt (White / Size L)</td>
                <td className="p-2">62052000</td>
                <td className="p-2">150 pcs</td>
                <td className="p-2">₹480</td>
                <td className="p-2 text-right font-bold">₹72,000</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end pt-4">
            <div className="w-64 space-y-1.5 text-xs text-[#212529]">
              <div className="flex justify-between">
                <span>Subtotal Taxable Amount</span>
                <span className="font-bold">₹1,20,000</span>
              </div>
              <div className="flex justify-between">
                <span>CGST (2.5%)</span>
                <span>₹3,000</span>
              </div>
              <div className="flex justify-between">
                <span>SGST (2.5%)</span>
                <span>₹3,000</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#212529] pt-2 border-t border-neutral-300">
                <span>Total Invoice Value</span>
                <span className="text-[#C4A35A]">₹1,26,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
