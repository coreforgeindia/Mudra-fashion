'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Building2, ShieldCheck, CheckCircle2, FileText, Send, X } from 'lucide-react';

export default function UniformsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const uniformProducts = PRODUCTS.filter((p) => p.category === 'uniforms');

  const uniformCategories = [
    { id: 'all', label: 'All Uniforms' },
    { id: 'corporate', label: 'Corporate & Office' },
    { id: 'hospitality', label: 'Hospitality & Hotels' },
    { id: 'healthcare', label: 'Healthcare & Lab Coats' },
    { id: 'security', label: 'Security & Duty' },
    { id: 'industrial', label: 'Industrial & Workwear' },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 3000);
  };

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      {/* Hero Banner */}
      <div className="relative bg-neutral-950 text-white py-20 px-4 mb-12 overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=1920"
            alt="Mudra Fashions Uniform Manufacturing"
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <ScrollReveal direction="down">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider rounded-full">
              <Building2 className="w-3.5 h-3.5" />
              <span>Commercial &amp; Enterprise Uniform Solutions</span>
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold mt-2">
              Professional Workwear &amp; Institutional Uniforms
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
              Engineered for endurance, comfort, and professional corporate branding. Designed and manufactured in India for commercial teams nationwide.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-8 py-3.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#A8893D] transition-colors shadow-xl"
              >
                Request Business Requirement Quote
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto space-x-2 pb-2 border-b border-[#E8E0D0]">
          {uniformCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 text-[#6B7280] hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniformProducts.map((product, idx) => (
            <ScrollReveal key={product.id} direction="up" delay={0.05 * idx}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        {/* Why Choose Mudra Uniforms */}
        <div className="p-8 bg-[#FFF9EF] border border-[#E8E0D0] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#C4A35A]" />
            <h4 className="font-serif font-bold text-base text-[#212529]">Custom Logo Embroidery</h4>
            <p className="text-xs text-[#6B7280]">Precision computer embroidery and screen printing for enterprise brand identity.</p>
          </div>
          <div className="space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#C4A35A]" />
            <h4 className="font-serif font-bold text-base text-[#212529]">High-Wash Fastness</h4>
            <p className="text-xs text-[#6B7280]">Tested to withstand 100+ commercial wash cycles up to 60°C without fading.</p>
          </div>
          <div className="space-y-2">
            <FileText className="w-8 h-8 text-[#C4A35A]" />
            <h4 className="font-serif font-bold text-base text-[#212529]">Pan-India Freight Logistics</h4>
            <p className="text-xs text-[#6B7280]">Direct factory-to-office dispatch with GST tax credit invoices.</p>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF8F1] text-[#212529] max-w-lg w-full p-6 border border-[#E8E0D0] shadow-2xl relative">
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-[#212529]"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif font-bold text-xl text-[#212529]">Enquiry Submitted!</h3>
                <p className="text-xs text-[#6B7280]">
                  Our B2B corporate uniform specialist will contact your organization within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C4A35A]">B2B Requirement</span>
                  <h3 className="font-serif font-bold text-xl text-[#212529]">Request Uniform Quote</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Company / Institution Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apollo Hospitals / Leela Palace"
                      className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-[#212529] mb-1">Contact Person *</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#212529] mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Estimated Order Quantity (Pieces)</label>
                    <select className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]">
                      <option>50 - 200 Pieces</option>
                      <option>200 - 500 Pieces</option>
                      <option>500 - 1,000 Pieces</option>
                      <option>1,000+ Bulk Pieces</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Specific Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Specify sizes, colors, embroidery requirements..."
                      className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-[#A8893D]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Requirement Quote</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
