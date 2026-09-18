'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ArrowRight, Sparkles, Scissors, Award, ShieldCheck, Heart } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden bg-[#FBF8F1] text-[#212529]">
      {/* 1. FULL VIEWPORT EXPANSIVE HERO SECTION */}
      <section className="relative min-h-[90vh] sm:min-h-[100vh] flex items-center justify-center bg-[#FBF8F1] border-b border-[#E8E0D0] overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — Text & CTAs */}
            <div className="lg:col-span-7 space-y-7 sm:space-y-9 text-center lg:text-left">
              <ScrollReveal direction="down" delay={0.1}>
                <div className="inline-flex items-center space-x-2.5 px-4 py-2 bg-[#F5F0E5] border border-[#E8D5A3] text-[#C4A35A] text-xs font-bold uppercase tracking-[0.25em] rounded-full shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#C4A35A]" />
                  <span>New Season Luxury Collection</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#212529] leading-[1.15] sm:leading-[1.1]">
                  Handcrafted Men&apos;s Wear <br />
                  <span className="font-normal text-[#C4A35A]">&amp; Fine Textiles</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-sm sm:text-lg text-[#6B7280] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                  Discover impeccable tailored menswear, Egyptian Giza cotton shirts, and pure European linen fabrics crafted for effortless distinction.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    href="/shop"
                    className="w-full sm:w-auto px-10 py-5 bg-[#C4A35A] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#A8893D] transition-all hover:-translate-y-1 flex items-center justify-center space-x-2.5 rounded-sm"
                  >
                    <span>Shop Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/fabrics"
                    className="w-full sm:w-auto px-10 py-5 bg-[#FFF9EF] text-[#212529] border-2 border-[#212529] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#212529] hover:text-white transition-all flex items-center justify-center space-x-2 rounded-sm shadow-sm"
                  >
                    <span>Explore Fabrics</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Hero Image — Tall luxury presentation */}
            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <ScrollReveal direction="left" delay={0.3}>
                <div className="relative aspect-[3/4] min-h-[480px] sm:min-h-[580px] w-full max-w-md mx-auto overflow-hidden border-2 border-[#FFF9EF] shadow-2xl bg-[#F5F0E5] rounded-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800"
                    alt="Mudra Fashions Executive Menswear"
                    fill
                    priority
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-5 left-5 right-5 p-5 bg-[#FFF9EF]/95 backdrop-blur-md border border-[#E8E0D0] text-[#212529] space-y-1 rounded-sm shadow-md">
                    <span className="text-[10px] uppercase font-bold text-[#C4A35A] tracking-widest block">
                      Signature Collection
                    </span>
                    <h4 className="font-serif font-bold text-base">Royal Giza Cotton Shirting</h4>
                    <span className="text-sm font-bold text-[#212529]">₹1,899</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#7BA48E]">
              Refined Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#212529] mt-2">
              Explore Our Categories
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] max-w-lg mx-auto mt-2 font-light">
              Meticulous tailored menswear, pure linen fabrics, and bespoke formal wear.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, index) => {
            const accentColor = index % 2 === 0 ? '#7BA48E' : '#8BB8D0';
            return (
              <ScrollReveal key={cat.id} direction="up" delay={0.06 * index}>
                <Link
                  href={`/shop/${cat.slug}`}
                  className="group relative h-80 sm:h-96 block overflow-hidden border border-[#E8E0D0] bg-[#F5F0E5] shadow-md hover:shadow-2xl transition-all duration-500 rounded-sm"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest mb-1" style={{ color: accentColor }}>
                      {cat.itemCount}+ Designs
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#E8D5A3] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mt-1 mb-3 opacity-90 font-light">
                      {cat.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform" style={{ color: accentColor }}>
                      <span>Discover Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-5 border-b border-[#E8E0D0] gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Curated Showcase</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#212529] mt-1">Featured Apparel &amp; Fabrics</h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C4A35A] hover:text-[#A8893D] underline underline-offset-4"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
          {featuredProducts.map((product, idx) => (
            <ScrollReveal key={product.id} direction="up" delay={0.04 * idx}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. BESPOKE TAILORING & TEXTILE ATELIER BANNER */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative bg-[#FFF9EF] text-[#212529] overflow-hidden p-8 sm:p-16 border border-[#E8D5A3] shadow-lg rounded-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#C4A35A]/15 to-transparent rounded-bl-full" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
              <div className="md:col-span-8 space-y-5">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#FBF8F1] border border-[#E8D5A3] text-[#C4A35A] text-xs font-bold uppercase tracking-wider rounded-full">
                  <Scissors className="w-4 h-4 text-[#C4A35A]" />
                  <span>The Mudra Atelier</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#212529] leading-snug">
                  Bespoke Craftsmanship, <br />
                  <span className="text-[#C4A35A]">Finest Natural Fibers</span>
                </h2>

                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-xl font-light">
                  Every garment is meticulously stitched with German interlinings, genuine Mother of Pearl buttons, and precision tailoring. Experience luxury shirting and fabrics curated for timeless longevity.
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 text-[#212529] font-medium">
                    <Award className="w-5 h-5 text-[#C4A35A]" />
                    <span>100% Certified Egyptian Giza</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#212529] font-medium">
                    <ShieldCheck className="w-5 h-5 text-[#7BA48E]" />
                    <span>Pure European Flax Linen</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center space-x-2.5 px-8 py-4 bg-[#2C2A25] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.18em] hover:bg-[#C4A35A] transition-colors rounded-sm shadow-md"
                  >
                    <span>Our Brand Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="md:col-span-4 relative aspect-[4/3] min-h-[300px] rounded-sm overflow-hidden border border-[#E8E0D0] shadow-xl bg-[#F5F0E5]">
                <Image
                  src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=600"
                  alt="Mudra Fabric Atelier"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
