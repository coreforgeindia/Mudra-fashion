'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CATEGORIES } from '@/data/products';
import { Save, ArrowLeft, Plus, Check } from 'lucide-react';

export default function AdminAddProductPage() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'shirts',
    subcategory: 'Formal Shirts',
    retailPrice: '',
    wholesalePrice: '',
    moq: '20',
    sku: 'SH-NEW-01',
    stock: '150',
    fabric: 'Superfine Giza Cotton',
    material: '100% Cotton',
    fit: 'Slim Fit',
    pattern: 'Solid Micro-Structure',
    description: '',
    careInstructions: 'Machine wash cold gentle, Do not bleach',
    sizeChartType: 'shirt',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
        <div>
          <Link href="/admin/products" className="text-xs text-[#C4A35A] hover:underline flex items-center space-x-1 font-bold mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-neutral-900">Add New Product</h1>
        </div>
      </div>

      {submitted ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold space-y-2">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span className="text-sm">Product created successfully in store catalog!</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 p-6 shadow-sm space-y-8 text-xs">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-neutral-900 pb-2 border-b border-neutral-200">
              1. Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-bold text-neutral-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Giza Cotton Formal Shirt"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Main Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Subcategory *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Formal Shirts / Corporate Uniforms"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Description *</label>
              <textarea
                rows={3}
                required
                placeholder="Product description and craftsmanship highlights..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
              />
            </div>
          </div>

          {/* Pricing & MOQ */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-neutral-900 pb-2 border-b border-neutral-200">
              2. Pricing &amp; B2B Wholesale Tier
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Retail Price (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="1299"
                  value={formData.retailPrice}
                  onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Wholesale Price (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="750"
                  value={formData.wholesalePrice}
                  onChange={(e) => setFormData({ ...formData, wholesalePrice: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Wholesale MOQ (Pcs)</label>
                <input
                  type="number"
                  required
                  value={formData.moq}
                  onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-neutral-900 pb-2 border-b border-neutral-200">
              3. Fabric &amp; Garment Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Fabric Name</label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Material %</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Garment Fit Cut</label>
                <input
                  type="text"
                  value={formData.fit}
                  onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Size Chart Matrix System</label>
                <select
                  value={formData.sizeChartType}
                  onChange={(e) => setFormData({ ...formData, sizeChartType: e.target.value })}
                  className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                >
                  <option value="shirt">Formal Shirts Chart</option>
                  <option value="pants">Formal Pants Chart</option>
                  <option value="tshirt">Casual T-Shirts Chart</option>
                  <option value="labcoat">Lab Coats Chart</option>
                  <option value="uniform">Corporate Uniforms Chart</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#A8893D] transition-colors flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save &amp; Publish Product</span>
          </button>
        </form>
      )}
    </div>
  );
}
