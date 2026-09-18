'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES, Product } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Filter, SlidersHorizontal, Grid2X2, Grid3X3, LayoutGrid, X, Check, ArrowUpDown, Sparkles, Scissors } from 'lucide-react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState<boolean>(false);

  const fabrics = ['Giza Cotton', 'Linen', 'Poly-Viscose', 'Wool Blend'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Fabric Filter
      if (selectedFabric !== 'all' && !product.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }
      // Stock Filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [selectedCategory, selectedFabric, inStockOnly, sortBy]);

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) + (selectedFabric !== 'all' ? 1 : 0) + (inStockOnly ? 1 : 0);

  return (
    <div className="bg-[#FBF8F1] text-[#212529] min-h-screen pb-20 pt-6">
      {/* 1. Header & Breadcrumb Banner */}
      <div className="bg-[#FBF8F1] border-b border-[#E8E0D0] py-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <div className="flex items-center space-x-2 text-xs text-[#6B7280] mb-2">
              <Link href="/" className="hover:text-[#212529]">Home</Link>
              <span>/</span>
              <span className="text-[#C4A35A] font-bold uppercase tracking-wider">Shop Collection</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">
                  Tailored Excellence
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#212529] mt-1">
                  Men&apos;s Wear &amp; Luxury Textiles
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] max-w-md">
                Showing {filteredProducts.length} items curated for luxury gentlemen and bespoke tailoring connoisseurs.
              </p>
            </div>
          </ScrollReveal>

          {/* 2. Top Category Pills Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-8 pb-2 no-scrollbar border-t border-[#E8E0D0]/60 mt-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all rounded-sm ${
                selectedCategory === 'all'
                  ? 'bg-[#212529] text-white shadow-md'
                  : 'bg-[#FFF9EF] border border-[#E8E0D0] text-[#212529] hover:bg-[#F5F0E5]'
              }`}
            >
              All Items ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all rounded-sm ${
                  selectedCategory === cat.slug
                    ? 'bg-[#C4A35A] text-white shadow-md'
                    : 'bg-[#FFF9EF] border border-[#E8E0D0] text-[#212529] hover:bg-[#F5F0E5]'
                }`}
              >
                {cat.name} ({cat.itemCount})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Filter */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="p-5 bg-[#FFF9EF] border border-[#E8E0D0] rounded-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D0]">
                <h3 className="font-serif font-bold text-sm text-[#212529] uppercase tracking-wider">
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedFabric('all');
                      setInStockOnly(false);
                    }}
                    className="text-[11px] text-[#C4A35A] font-bold hover:underline"
                  >
                    Reset ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Categories Filter */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
                  Category
                </span>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left p-2 rounded transition-colors flex items-center justify-between ${
                      selectedCategory === 'all' ? 'bg-[#C4A35A] text-white font-bold' : 'hover:bg-[#F5F0E5] text-[#212529]'
                    }`}
                  >
                    <span>All Categories</span>
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left p-2 rounded transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug ? 'bg-[#C4A35A] text-white font-bold' : 'hover:bg-[#F5F0E5] text-[#212529]'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Types Filter */}
              <div className="pt-2 border-t border-[#E8E0D0]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
                  Fabric Type
                </span>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedFabric('all')}
                    className={`w-full text-left p-2 rounded transition-colors flex items-center justify-between ${
                      selectedFabric === 'all' ? 'bg-[#C4A35A] text-white font-bold' : 'hover:bg-[#F5F0E5] text-[#212529]'
                    }`}
                  >
                    <span>All Fabrics</span>
                  </button>
                  {fabrics.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFabric(f)}
                      className={`w-full text-left p-2 rounded transition-colors flex items-center justify-between ${
                        selectedFabric === f ? 'bg-[#C4A35A] text-white font-bold' : 'hover:bg-[#F5F0E5] text-[#212529]'
                      }`}
                    >
                      <span>{f}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock Filter Toggle */}
              <div className="pt-2 border-t border-[#E8E0D0]">
                <label className="flex items-center space-x-2 text-xs font-bold text-[#212529] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#C4A35A] w-4 h-4"
                  />
                  <span>In Stock Items Only</span>
                </label>
              </div>

              {/* Tailoring Concierge Box */}
              <div className="p-4 bg-[#F5F0E5] border border-[#E8D5A3] space-y-2 text-xs rounded-sm">
                <div className="flex items-center space-x-1.5 text-[#A8893D] font-bold">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Custom Fit Questions?</span>
                </div>
                <p className="text-[#6B7280] text-[11px] leading-relaxed">
                  Our master tailors provide complimentary sizing advice and fabric swatch recommendations.
                </p>
                <Link
                  href="/contact"
                  className="inline-block pt-1 text-[#C4A35A] font-bold underline hover:text-[#A8893D]"
                >
                  Contact Concierge →
                </Link>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-[#FFF9EF] border border-[#E8E0D0] space-y-4 rounded-sm">
                <p className="text-base text-[#6B7280] font-serif">
                  No products found matching your active filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedFabric('all');
                    setInStockOnly(false);
                  }}
                  className="px-6 py-2.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-5 ${
                  gridCols === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : gridCols === 3
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }`}
              >
                {filteredProducts.map((product, idx) => (
                  <ScrollReveal key={product.id} direction="up" delay={0.04 * idx}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
