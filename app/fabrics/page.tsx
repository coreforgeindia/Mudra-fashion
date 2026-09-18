'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useCart } from '@/context/CartContext';
import { Layers, ShieldCheck, CheckCircle2, ShoppingBag, ArrowRight, Sparkles, Award, Calculator, Info, Check } from 'lucide-react';

export default function FabricsPage() {
  const fabricProducts = PRODUCTS.filter(
    (p) => p.category === 'fabrics'
  );

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMeters, setSelectedMeters] = useState<number>(2.5);
  const [activeFabric, setActiveFabric] = useState<Product>(fabricProducts[0] || PRODUCTS[0]);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const { addToCart } = useCart();

  const fabricCategories = [
    { id: 'all', name: 'All Luxury Fabrics' },
    { id: 'cotton', name: 'Egyptian Giza Cotton' },
    { id: 'linen', name: 'European Pure Linen' },
  ];

  const filteredFabrics = fabricProducts.filter((p) => {
    if (selectedType === 'all') return true;
    if (selectedType === 'cotton') return p.fabric.toLowerCase().includes('cotton') || p.name.toLowerCase().includes('cotton');
    if (selectedType === 'linen') return p.fabric.toLowerCase().includes('linen') || p.name.toLowerCase().includes('linen');
    return true;
  });

  const pricePerMeter = activeFabric ? activeFabric.price : 550;
  const calculatedTotal = Math.round(pricePerMeter * selectedMeters);

  const handleAddToCart = () => {
    if (!activeFabric) return;
    addToCart(
      activeFabric,
      `${selectedMeters} Meters Cut`,
      activeFabric.colors[0]?.name || 'Standard',
      1,
      calculatedTotal,
      false
    );
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="bg-[#FBF8F1] text-[#212529] min-h-screen pb-20 pt-6">
      {/* 1. Header Showcase Banner */}
      <section className="bg-[#FBF8F1] border-b border-[#E8E0D0] py-12 mb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <ScrollReveal direction="down">
                <span className="inline-flex items-center space-x-2 px-3 py-1 bg-[#F5F0E5] border border-[#E8D5A3] text-[#C4A35A] text-xs font-bold uppercase tracking-[0.25em] rounded-full">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Artisanal Textiles</span>
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#212529] mt-2">
                  Fine Fabrics &amp; Unstitched Cloth
                </h1>
                <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl font-light leading-relaxed">
                  High-count 80s 2-ply Mercerized Giza Cottons and 60 Lea European Flax Linen cut to your exact tailor specifications for custom shirts, trousers, and suits.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal direction="left">
                <div className="p-5 bg-[#FFF9EF] border border-[#E8E0D0] shadow-sm rounded-sm space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#C4A35A] uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Mudra Textile Guarantee</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-sm">
                      <span className="font-bold block text-[#212529]">Color Fastness</span>
                      <span className="text-[11px] text-[#6B7280]">Grade 4.5+ Tested</span>
                    </div>
                    <div className="p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-sm">
                      <span className="font-bold block text-[#212529]">Pre-Shrunk</span>
                      <span className="text-[11px] text-[#6B7280]">Zero Shrinkage Finish</span>
                    </div>
                    <div className="p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-sm">
                      <span className="font-bold block text-[#212529]">Standard Width</span>
                      <span className="text-[11px] text-[#6B7280]">58&quot; (147 cm) Width</span>
                    </div>
                    <div className="p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-sm">
                      <span className="font-bold block text-[#212529]">Custom Lengths</span>
                      <span className="text-[11px] text-[#6B7280]">From 1.6 Meters Up</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 2. Interactive Meter Cut Calculator */}
        <ScrollReveal direction="up">
          <div className="bg-[#FFF9EF] text-[#212529] p-6 sm:p-8 border border-[#E8E0D0] shadow-sm rounded-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A] flex items-center space-x-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Custom Cut Calculator</span>
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#212529]">
                  Select Your Fabric &amp; Tailoring Cut Length
                </h2>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Choose your desired natural textile and specify the required cut. We pack and ship running uncut fabric directly to your address with complimentary shipping on orders over ₹1,499.
                </p>

                {/* Length Preset Buttons */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block">
                    Recommended Tailoring Lengths:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { len: 1.6, label: '1.6m (Half Sleeve Shirt)' },
                      { len: 2.5, label: '2.5m (Full Sleeve Shirt)' },
                      { len: 3.5, label: '3.5m (Shirt + Trouser)' },
                      { len: 5.0, label: '5.0m (Full 2-Piece Suit)' },
                    ].map((preset) => (
                      <button
                        key={preset.len}
                        onClick={() => setSelectedMeters(preset.len)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all ${
                          selectedMeters === preset.len
                            ? 'bg-[#C4A35A] text-white shadow-xs'
                            : 'bg-[#FBF8F1] border border-[#E8E0D0] text-[#212529] hover:bg-[#F5F0E5]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Selection Summary Card */}
              <div className="lg:col-span-5 bg-[#FBF8F1] p-5 border border-[#E8D5A3] space-y-4 rounded-sm">
                <div className="flex items-center space-x-3">
                  <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-[#E8E0D0]">
                    <Image
                      src={activeFabric.images[0]}
                      alt={activeFabric.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C4A35A] tracking-wider block">
                      Selected Textile
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#212529] line-clamp-1">
                      {activeFabric.name}
                    </h4>
                    <span className="text-xs text-[#6B7280]">
                      ₹{pricePerMeter} / meter
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E0D0] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Cut Length:</span>
                    <span className="font-bold text-[#212529]">{selectedMeters} Meters</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Total Price:</span>
                    <span className="font-serif text-lg font-bold text-[#212529]">₹{calculatedTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-2.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 rounded-sm hover:bg-[#A8893D] transition-colors shadow-sm"
                >
                  {addedSuccess ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{addedSuccess ? 'Added to Cart!' : 'Add Cut to Cart'}</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3. Fabric Catalog Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8E0D0] gap-3">
            <h3 className="font-serif text-xl font-bold text-[#212529]">
              Available Textile Weaves
            </h3>
            <div className="flex space-x-2">
              {fabricCategories.map((fc) => (
                <button
                  key={fc.id}
                  onClick={() => setSelectedType(fc.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all ${
                    selectedType === fc.id
                      ? 'bg-[#212529] text-white'
                      : 'bg-[#FFF9EF] border border-[#E8E0D0] text-[#212529] hover:bg-[#F5F0E5]'
                  }`}
                >
                  {fc.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredFabrics.map((fabric) => (
              <div
                key={fabric.id}
                onClick={() => setActiveFabric(fabric)}
                className={`cursor-pointer p-4 bg-[#FFF9EF] border rounded-sm transition-all ${
                  activeFabric.id === fabric.id
                    ? 'border-[#C4A35A] ring-1 ring-[#C4A35A] shadow-md'
                    : 'border-[#E8E0D0] hover:border-neutral-400'
                }`}
              >
                <div className="relative aspect-[4/3] w-full rounded overflow-hidden mb-3 bg-[#E8E0D0]">
                  <Image
                    src={fabric.images[0]}
                    alt={fabric.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#FFF9EF]/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider text-[#C4A35A] rounded-sm">
                    {fabric.subcategory}
                  </div>
                </div>

                <h4 className="font-serif font-bold text-sm text-[#212529] line-clamp-1 mb-1">
                  {fabric.name}
                </h4>
                <p className="text-xs text-[#6B7280] line-clamp-2 mb-2">
                  {fabric.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#E8E0D0] text-xs">
                  <span className="font-serif font-bold text-sm text-[#212529]">
                    ₹{fabric.price} / meter
                  </span>
                  <span className="text-[11px] font-semibold text-[#C4A35A] uppercase">
                    Select &amp; Calculate →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
