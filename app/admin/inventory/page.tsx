'use client';

import React from 'react';
import { PRODUCTS } from '@/data/products';

export default function AdminInventoryPage() {
  const inStock = PRODUCTS.filter((p) => p.stockCount >= 100);
  const lowStock = PRODUCTS.filter((p) => p.stockCount < 100 && p.stockCount > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Stock Control</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Inventory Levels &amp; Warehousing</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-neutral-200 shadow-sm">
          <span className="text-xs font-bold uppercase text-neutral-500">Total SKU Items</span>
          <div className="font-serif text-2xl font-bold text-neutral-900 mt-1">{PRODUCTS.length}</div>
        </div>
        <div className="p-4 bg-white border border-neutral-200 shadow-sm">
          <span className="text-xs font-bold uppercase text-emerald-600">Sufficient Stock</span>
          <div className="font-serif text-2xl font-bold text-emerald-700 mt-1">{inStock.length}</div>
        </div>
        <div className="p-4 bg-white border border-neutral-200 shadow-sm">
          <span className="text-xs font-bold uppercase text-rose-600">Low Stock Alert</span>
          <div className="font-serif text-2xl font-bold text-rose-600 mt-1">{lowStock.length}</div>
        </div>
        <div className="p-4 bg-white border border-neutral-200 shadow-sm">
          <span className="text-xs font-bold uppercase text-neutral-500">Total Warehouse Units</span>
          <div className="font-serif text-2xl font-bold text-neutral-900 mt-1">21,490 pcs</div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-900 text-white font-serif uppercase tracking-wider">
              <th className="p-3">SKU</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Current Stock</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((prod) => (
              <tr key={prod.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="p-3 font-mono font-bold text-neutral-800">SKU-{prod.id.toUpperCase()}</td>
                <td className="p-3 font-bold text-neutral-900">{prod.name}</td>
                <td className="p-3 text-neutral-600">{prod.category}</td>
                <td className="p-3 font-bold text-neutral-900">{prod.stockCount} pcs</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${prod.stockCount > 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {prod.stockCount > 100 ? 'In Stock' : 'Low Stock'}
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
