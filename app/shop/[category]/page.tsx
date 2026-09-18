'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const currentCategory = CATEGORIES.find((c) => c.slug === categorySlug);
  const categoryProducts = PRODUCTS.filter((p) => p.category === categorySlug);

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      <div className="bg-[#FBF8F1] text-[#212529] py-12 px-4 mb-8 border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal direction="down">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-1 text-xs text-[#C4A35A] hover:text-[#A8893D] uppercase font-bold tracking-wider mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Collections</span>
            </Link>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#212529]">
              {currentCategory ? currentCategory.name : categorySlug.replace('-', ' ').toUpperCase()}
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl mx-auto mt-2 font-light">
              {currentCategory?.description || 'Browse our specialized tailored apparel and fabric items.'}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categoryProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#FFF9EF] border border-[#E8E0D0]">
            <h3 className="font-serif font-bold text-xl text-neutral-800 mb-2">
              No products found in this category
            </h3>
            <p className="text-xs text-[#6B7280] mb-4">
              Check back soon for new arrivals or explore our other collections.
            </p>
            <Link
              href="/shop"
              className="px-6 py-2.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#A8893D] transition-colors shadow-sm"
            >
              View Full Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product, idx) => (
              <ScrollReveal key={product.id} direction="up" delay={0.05 * idx}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
