'use client';

import React from 'react';
import { CATEGORIES } from '@/data/products';
import Image from 'next/image';

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Structure</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Product Categories ({CATEGORIES.length})</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-white border border-neutral-200 p-4 space-y-3 shadow-sm">
            <div className="relative aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
              <Image src={cat.image} alt={cat.name} fill className="object-cover" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#C4A35A]">{cat.itemCount} Designs</span>
              <h3 className="font-serif text-lg font-bold text-neutral-900">{cat.name}</h3>
              <p className="text-xs text-neutral-500 line-clamp-2 mt-1">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
