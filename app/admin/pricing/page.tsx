'use client';

import React, { useState } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import { Check } from 'lucide-react';

export default function AdminPricingPage() {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [savedMsg, setSavedMsg] = useState(false);

  const handlePriceChange = (id: string, field: 'price' | 'wholesalePrice' | 'moq', val: number) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleSaveAll = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Batch Pricing</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Retail vs Wholesale Tier Rates</h1>
        </div>
        <button
          onClick={handleSaveAll}
          className="px-4 py-2 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 hover:bg-[#A8893D]"
        >
          {savedMsg ? <Check className="w-4 h-4" /> : null}
          <span>{savedMsg ? 'Saved All Changes!' : 'Save Pricing Matrix'}</span>
        </button>
      </div>

      <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-900 text-white font-serif uppercase tracking-wider">
              <th className="p-3">Product Name</th>
              <th className="p-3">Retail Price (₹)</th>
              <th className="p-3">Wholesale Tier Rate (₹)</th>
              <th className="p-3">Wholesale MOQ</th>
              <th className="p-3">Margin %</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((prod) => {
              const wsPrice = prod.wholesalePrice || Math.round(prod.price * 0.6);
              const margin = Math.round(((prod.price - wsPrice) / prod.price) * 100);
              return (
                <tr key={prod.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="p-3 font-bold text-neutral-900">{prod.name}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={prod.price}
                      onChange={(e) => handlePriceChange(prod.id, 'price', parseInt(e.target.value) || 0)}
                      className="w-24 p-1 border border-neutral-300 font-semibold focus:outline-none focus:border-[#C4A35A]"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={wsPrice}
                      onChange={(e) => handlePriceChange(prod.id, 'wholesalePrice', parseInt(e.target.value) || 0)}
                      className="w-24 p-1 border border-neutral-300 font-bold text-[#C4A35A] focus:outline-none focus:border-[#C4A35A]"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={prod.moq || 20}
                      onChange={(e) => handlePriceChange(prod.id, 'moq', parseInt(e.target.value) || 0)}
                      className="w-20 p-1 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    />
                  </td>
                  <td className="p-3 font-bold text-emerald-700">{margin}% Margin</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
