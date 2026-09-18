'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Award, ShieldCheck, Scissors, Sparkles, ArrowRight, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-6">
      {/* Hero Header */}
      <div className="bg-[#FBF8F1] text-[#212529] py-12 px-4 mb-12 relative overflow-hidden border-b border-[#E8E0D0]">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
          <ScrollReveal direction="down">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-[#C4A35A]">
              Heritage &amp; Artistry
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-[#212529]">
              The Story of Mudra Fashions
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mx-auto font-light leading-relaxed">
              Crafting refined menswear, bespoke tailoring, and high-thread natural textiles with timeless elegance.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Brand Mission & Story */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal direction="right">
            <div className="relative aspect-[4/3] w-full bg-neutral-100 border border-[#E8E0D0] overflow-hidden shadow-lg rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800"
                alt="Executive Menswear Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-[0.3em] text-[#C4A35A]">
                Crafting Distinction
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#212529] leading-tight">
                Designed with Precision. Woven for Distinction.
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-light">
                Founded with a singular passion: to deliver heirloom-quality menswear and luxury fabrics directly to the modern gentleman. Mudra Fashions brings together certified Egyptian Giza cotton, pure European flax linen, and master bespoke craftsmanship.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-bold text-[#212529]">
                <div className="p-3 bg-[#FFF9EF] border border-[#E8E0D0] rounded-sm">
                  <span className="font-serif text-xl text-[#C4A35A] block">100%</span>
                  <span>Pure Organic Fibers</span>
                </div>
                <div className="p-3 bg-[#FFF9EF] border border-[#E8E0D0] rounded-sm">
                  <span className="font-serif text-xl text-[#C4A35A] block">25,000+</span>
                  <span>Discerning Gentlemen</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Pillars of Excellence */}
        <section>
          <ScrollReveal direction="up">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase font-bold tracking-[0.3em] text-[#C4A35A]">
                Pillars of Excellence
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#212529] mt-1">Our Craftsmanship Principles</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] space-y-3 rounded-sm">
                <div className="w-10 h-10 bg-[#F5F0E5] text-[#C4A35A] rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#212529]">1. Superfine Natural Yarns</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  We source only long-staple Egyptian Giza 88 cotton and Normandy flax linen for remarkable breathability and softness.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] space-y-3 rounded-sm">
                <div className="w-10 h-10 bg-[#F5F0E5] text-[#C4A35A] rounded-full flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#212529]">2. Savile Row Inspired Tailoring</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Engineered with German interlinings, genuine Mother of Pearl buttons, and split-yoke ergonomic cuts.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] space-y-3 rounded-sm">
                <div className="w-10 h-10 bg-[#F5F0E5] text-[#C4A35A] rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#212529]">3. Curated Textile Swatches</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Uncut lengths of luxury shirting and suiting fabrics delivered directly to your door for custom bespoke creation.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA to Shop */}
        <section className="text-center py-10 border-t border-[#E8E0D0]">
          <h2 className="font-serif text-2xl font-bold text-[#212529] mb-2">Experience Mudra Quality</h2>
          <p className="text-xs text-[#6B7280] max-w-md mx-auto mb-5">
            Explore our curated collections of executive shirts, tailored trousers, and fine fabrics.
          </p>
          <div className="flex items-center justify-center space-x-3">
            <Link
              href="/shop"
              className="px-5 py-2.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#A8893D] transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              href="/fabrics"
              className="px-5 py-2.5 bg-[#FFF9EF] text-[#212529] border border-[#212529] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#212529] hover:text-white transition-colors"
            >
              Explore Fabrics
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
