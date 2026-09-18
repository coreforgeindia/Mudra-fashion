'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-300">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Catalog Management</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Products ({PRODUCTS.length})</h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 hover:bg-[#A8893D] shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Product</span>
        </Link>
      </div>

      <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-900 text-white font-serif uppercase tracking-wider">
              <th className="p-3">Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Retail Price</th>
              <th className="p-3">Wholesale Price</th>
              <th className="p-3">MOQ</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((prod) => (
              <tr key={prod.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="p-3">
                  <div className="relative w-12 h-16 bg-neutral-100 border border-neutral-200">
                    <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-3 font-bold text-neutral-900">{prod.name}</td>
                <td className="p-3 text-neutral-600">{prod.subcategory || prod.category}</td>
                <td className="p-3 font-bold text-neutral-900">₹{prod.price.toLocaleString('en-IN')}</td>
                <td className="p-3 text-[#C4A35A] font-bold">₹{(prod.wholesalePrice || Math.round(prod.price * 0.6)).toLocaleString('en-IN')}</td>
                <td className="p-3 text-neutral-700">{prod.moq || 20} pcs</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-[10px] font-bold ${prod.stockCount > 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {prod.stockCount} in stock
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <Link href={`/product/${prod.slug}`} className="p-1.5 text-neutral-500 hover:text-neutral-900 inline-block">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button className="p-1.5 text-neutral-500 hover:text-neutral-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-neutral-500 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
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
