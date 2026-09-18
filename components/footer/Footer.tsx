'use client';

import React from 'react';
import Link from 'next/link';
import { MudraLogo } from '@/components/brand/MudraLogo';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, CreditCard, Award, Truck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#FFF9EF] text-[#212529] pt-14 pb-8 border-t border-[#E8E0D0]">
      {/* Brand Value Pillars — B2C Retail */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 mb-10 border-b border-[#E8E0D0] grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        <div className="flex items-center space-x-3 text-[#212529]">
          <Award className="w-7 h-7 text-[#C4A35A] flex-shrink-0" />
          <div>
            <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-[#212529]">Artisanal Quality</h5>
            <p className="text-[11px] text-[#6B7280]">100% Giza cotton &amp; European linen</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-[#212529]">
          <Truck className="w-7 h-7 text-[#7BA48E] flex-shrink-0" />
          <div>
            <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-[#212529]">Complimentary Shipping</h5>
            <p className="text-[11px] text-[#6B7280]">Express delivery on orders ₹1,499+</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-[#212529]">
          <RefreshCw className="w-7 h-7 text-[#8BB8D0] flex-shrink-0" />
          <div>
            <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-[#212529]">7-Day Easy Returns</h5>
            <p className="text-[11px] text-[#6B7280]">Hassle-free size exchange guarantee</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-[#212529]">
          <CreditCard className="w-7 h-7 text-[#C4A35A] flex-shrink-0" />
          <div>
            <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-[#212529]">Secure Checkout</h5>
            <p className="text-[11px] text-[#6B7280]">UPI, NetBanking, Cards &amp; COD</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-3">
          <MudraLogo size="md" />
          <p className="text-xs text-[#6B7280] leading-relaxed max-w-sm">
            MUDRA FASHIONS is your premier destination for handcrafted luxury menswear, executive tailored shirts, and artisanal textile fabrics.
          </p>
          <div className="space-y-1.5 text-xs text-[#212529] pt-1">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#C4A35A]" />
              <span>Mudra Boutique, Bengaluru, KA 560038</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#7BA48E]" />
              <span>+91 (080) 4567-8900</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#8BB8D0]" />
              <span>care@mudrafashions.com</span>
            </div>
          </div>
        </div>

        {/* Col 2: Shop Collections */}
        <div>
          <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#212529] mb-3 border-b border-[#C4A35A] pb-1 inline-block">
            Collections
          </h4>
          <ul className="space-y-1.5 text-xs text-[#6B7280]">
            <li><Link href="/shop/shirts" className="hover:text-[#C4A35A] transition-colors">Men&apos;s Shirts</Link></li>
            <li><Link href="/shop/pants" className="hover:text-[#C4A35A] transition-colors">Trousers &amp; Chinos</Link></li>
            <li><Link href="/shop/formal-wear" className="hover:text-[#C4A35A] transition-colors">Blazers &amp; Suits</Link></li>
            <li><Link href="/fabrics" className="hover:text-[#C4A35A] transition-colors">Giza Cotton Fabrics</Link></li>
            <li><Link href="/fabrics" className="hover:text-[#C4A35A] transition-colors">Pure Linen Fabrics</Link></li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div>
          <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#212529] mb-3 border-b border-[#7BA48E] pb-1 inline-block">
            Customer Care
          </h4>
          <ul className="space-y-1.5 text-xs text-[#6B7280]">
            <li><Link href="/about" className="hover:text-[#C4A35A] transition-colors">About Mudra</Link></li>
            <li><Link href="/contact" className="hover:text-[#C4A35A] transition-colors">Contact Support</Link></li>
            <li><Link href="/account" className="hover:text-[#C4A35A] transition-colors">Track Orders</Link></li>
            <li><Link href="/wishlist" className="hover:text-[#C4A35A] transition-colors">Saved Wishlist</Link></li>
            <li><Link href="/login" className="hover:text-[#C4A35A] transition-colors">My Account</Link></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div>
          <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#212529] mb-3 border-b border-[#8BB8D0] pb-1 inline-block">
            Newsletter
          </h4>
          <p className="text-xs text-[#6B7280] mb-2.5">
            Subscribe for exclusive collection drops, styling guides, and seasonal privileges.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-1.5">
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address..."
                className="w-full bg-[#FBF8F1] border border-[#E8E0D0] px-3 py-2 text-xs text-[#212529] placeholder-[#6B7280] focus:outline-none focus:border-[#C4A35A] rounded-sm"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#C4A35A] text-white flex items-center justify-center hover:bg-[#A8893D] transition-colors rounded-sm"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#E8E0D0] flex flex-col md:flex-row items-center justify-between text-xs text-[#6B7280] gap-3">
        <div>
          © {new Date().getFullYear()} MUDRA FASHIONS. All Rights Reserved. Handcrafted Men&apos;s Wear &amp; Fine Textiles.
        </div>
        <div className="flex space-x-5">
          <Link href="/about" className="hover:text-[#212529]">Privacy Policy</Link>
          <Link href="/about" className="hover:text-[#212529]">Terms &amp; Conditions</Link>
          <Link href="/contact" className="hover:text-[#212529]">Support</Link>
        </div>
      </div>
    </footer>
  );
};
