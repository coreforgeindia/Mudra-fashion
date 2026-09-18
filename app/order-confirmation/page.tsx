'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CheckCircle2, ShoppingBag, FileText, ArrowRight, Truck } from 'lucide-react';

export default function OrderConfirmationPage() {
  const [orderNum, setOrderNum] = useState<string>('MF-2026-8891');

  useEffect(() => {
    setOrderNum(`MF-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    try {
      // Gold/beige themed confetti celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C4A35A', '#E8D5A3', '#A8893D', '#7BA48E', '#FBF8F1', '#8BB8D0'],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <ScrollReveal direction="up">
          <div className="p-8 md:p-12 bg-[#FFF9EF] border border-[#E8E0D0] shadow-2xl space-y-6 rounded-sm">
            {/* Gold success circle with animated ring */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-[#C4A35A]/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
              <div className="relative w-20 h-20 bg-[#F5F0E5] text-[#C4A35A] rounded-full flex items-center justify-center border-2 border-[#E8D5A3]">
                <CheckCircle2 className="w-12 h-12" />
              </div>
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Order Placed Successfully</span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#212529] mt-2">
                Thank You for Choosing Mudra Fashions
              </h1>
              <p className="text-xs text-[#6B7280] mt-1">
                Your order confirmation and official GST tax invoice details have been generated.
              </p>
            </div>

            <div className="p-4 bg-[#FBF8F1] border border-[#E8E0D0] text-xs space-y-2 text-left rounded-sm">
              <div className="flex justify-between border-b border-[#E8E0D0] pb-2">
                <span className="text-[#6B7280]">Order Reference ID:</span>
                <span className="font-bold text-[#212529]">{orderNum}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E0D0] pb-2">
                <span className="text-[#6B7280]">Payment Status:</span>
                <span className="font-bold text-[#7BA48E] uppercase">Paid / Confirmed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Estimated Dispatch:</span>
                <span className="font-bold text-[#212529]">Within 24 Hours</span>
              </div>
            </div>

            {/* Tracking Timeline — Gold/Beige accent */}
            <div className="py-4 space-y-2 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#212529] block">Fulfillment Timeline:</span>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                <div className="p-2 bg-[#7BA48E]/15 text-[#7BA48E] border border-[#7BA48E]/30 rounded-sm">Order Confirmed</div>
                <div className="p-2 bg-[#C4A35A]/15 text-[#C4A35A] border border-[#C4A35A]/30 rounded-sm">Tailoring / Packing</div>
                <div className="p-2 bg-[#F5F0E5] text-[#6B7280] rounded-sm">Freight Shipped</div>
                <div className="p-2 bg-[#F5F0E5] text-[#6B7280] rounded-sm">Delivered</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/account"
                className="px-6 py-3 bg-[#2C2A25] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3D3A33] transition-colors flex items-center justify-center space-x-2 rounded-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Track Order in Account</span>
              </Link>
              <Link
                href="/shop"
                className="px-6 py-3 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#A8893D] transition-colors flex items-center justify-center space-x-2 rounded-sm"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
