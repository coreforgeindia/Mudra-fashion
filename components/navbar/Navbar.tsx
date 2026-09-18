'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MudraLogo } from '@/components/brand/MudraLogo';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSearch } from '@/context/SearchContext';
import { useRole } from '@/context/RoleContext';
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown, Sparkles, LogOut, Headphones } from 'lucide-react';
import { MobileNav } from './MobileNav';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { setIsCartOpen, totalItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openSearch } = useSearch();
  const { role, user, setRole } = useRole();

  // Exactly requested order: HOME, ABOUT, SHOP, FABRICS
  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SHOP', href: '/shop' },
    { name: 'FABRICS', href: '/fabrics' },
  ];

  const linkTextColor = (href: string) => {
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    if (isActive) {
      return 'text-[#C4A35A] font-bold border-b-2 border-[#C4A35A] pb-1';
    }
    return 'text-[#212529] hover:text-[#C4A35A] font-semibold pb-1 transition-colors';
  };

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Announcement Ticker Bar */}
      <div className="bg-[#2C2A25] text-[#F5F0E5] text-[10px] font-medium py-1.5 px-4 border-b border-[#3D3A33] overflow-hidden relative">
        <div className="flex items-center space-x-10 animate-marquee whitespace-nowrap">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7BA48E] animate-pulse" />
              <span className="font-semibold text-[#F5F0E5] uppercase tracking-wider">Handcrafted Luxury Menswear &amp; Textiles</span>
            </span>
            <span className="text-[#6B7280]">•</span>
            <span className="flex items-center space-x-1 text-[#D4C9B0]">
              <Sparkles className="w-3 h-3 text-[#C4A35A]" />
              <span>Complimentary Nationwide Express Shipping Above ₹1,499</span>
            </span>
            <span className="text-[#6B7280]">•</span>
            <span className="font-semibold text-[#C4A35A]">100% Pure Giza Cotton &amp; Fine Linens</span>
            <span className="text-[#6B6760]">•</span>
            <span>Hassle-Free 7-Day Exchange &amp; Returns</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7BA48E] animate-pulse" />
              <span className="font-semibold text-[#F5F0E5] uppercase tracking-wider">Handcrafted Luxury Menswear &amp; Textiles</span>
            </span>
            <span className="text-[#6B6760]">•</span>
            <span className="flex items-center space-x-1 text-[#D4C9B0]">
              <Sparkles className="w-3 h-3 text-[#C4A35A]" />
              <span>Complimentary Nationwide Express Shipping Above ₹1,499</span>
            </span>
            <span className="text-[#6B6760]">•</span>
            <span className="font-semibold text-[#C4A35A]">100% Pure Giza Cotton &amp; Fine Linens</span>
            <span className="text-[#6B6760]">•</span>
            <span>Hassle-Free 7-Day Exchange &amp; Returns</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FBF8F1]/95 backdrop-blur-md text-[#212529] border-b border-[#E8E0D0] shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Left Zone: Single Mudra Brand Logo */}
          <div className="flex items-center flex-shrink-0">
            <MudraLogo size="md" />
          </div>

          {/* Center Zone: HOME • ABOUT • SHOP • FABRICS (Desktop only) */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 xl:space-x-11 text-[11px] font-semibold uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={linkTextColor(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Zone: Search | Wishlist | Cart | [Account on desktop] | [Hamburger at right on mobile] */}
          <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
            
            {/* Desktop Only: SUPPORT Link & Divider */}
            <div className="hidden md:flex items-center space-x-2 mr-1 pr-2 border-r border-[#E8E0D0]">
              <Link
                href="/contact"
                className="flex items-center space-x-1.5 text-[10px] xl:text-[11px] uppercase tracking-wider font-semibold text-[#212529] hover:text-[#C4A35A] transition-colors"
                title="Customer Support"
              >
                <Headphones className="w-3.5 h-3.5 text-[#C4A35A]" />
                <span>SUPPORT</span>
              </Link>
            </div>

            {/* Search Icon */}
            <button
              onClick={openSearch}
              className="p-2 text-[#212529] hover:text-[#C4A35A] transition-colors rounded-full hover:bg-[#F5F0E5]"
              aria-label="Search products"
              title="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#212529] hover:text-[#C4A35A] transition-colors rounded-full hover:bg-[#F5F0E5]"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute 0.5 top-0.5 right-0.5 w-3.5 h-3.5 bg-[#C4A35A] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#212529] hover:text-[#C4A35A] transition-colors rounded-full hover:bg-[#F5F0E5]"
              aria-label="Cart"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalItemsCount > 0 && (
                <span className="absolute 0.5 top-0.5 right-0.5 w-3.5 h-3.5 bg-[#C4A35A] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Desktop Only: User Account Pill Button */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1.5 py-1.5 px-3 bg-[#F5F0E5] hover:bg-[#EAE2D2] text-[#212529] border border-[#E8E0D0] rounded-full text-xs font-medium transition-all"
                aria-label="Account Menu"
              >
                <User className="w-3.5 h-3.5 text-[#C4A35A]" />
                <span className="truncate max-w-[80px]">
                  {role === 'guest' ? 'Sign In' : user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
              </button>

              {isUserMenuOpen && (
                <div
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                  className="absolute right-0 top-11 w-64 bg-[#FFF9EF] border border-[#E8E0D0] shadow-2xl p-3 space-y-2 text-[11px] z-50 rounded-lg"
                >
                  <div className="p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-md">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#C4A35A] block">
                      {role === 'guest' ? 'Welcome to Mudra' : 'Active Account'}
                    </span>
                    <span className="font-bold text-[#212529] text-xs block truncate mt-0.5">
                      {role === 'guest' ? 'Sign in or Create Account' : user.name}
                    </span>
                    {role === 'guest' && (
                      <div className="grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-[#E8E0D0]">
                        <Link
                          href="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="py-1.5 px-2 bg-[#C4A35A] text-white text-[10px] font-bold text-center rounded hover:bg-[#A8893D] transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="py-1.5 px-2 bg-[#2C2A25] text-white text-[10px] font-bold text-center rounded hover:bg-[#3D3A33] transition-colors"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <Link href="/account" onClick={() => setIsUserMenuOpen(false)} className="flex items-center justify-between p-2 hover:bg-[#F5F0E5] font-medium text-[#212529] rounded transition-colors">
                      <div className="flex items-center space-x-2"><User className="w-3.5 h-3.5 text-[#6B7280]" /><span>My Account &amp; Orders</span></div>
                      <ChevronDown className="w-3 h-3 text-[#6B7280] -rotate-90" />
                    </Link>
                    <Link href="/wishlist" onClick={() => setIsUserMenuOpen(false)} className="flex items-center justify-between p-2 hover:bg-[#F5F0E5] font-medium text-[#212529] rounded transition-colors">
                      <div className="flex items-center space-x-2"><Heart className="w-3.5 h-3.5 text-[#C4A35A]" /><span>Saved Wishlist</span></div>
                      <ChevronDown className="w-3 h-3 text-[#6B7280] -rotate-90" />
                    </Link>
                    {role !== 'guest' && (
                      <button
                        onClick={() => { setRole('guest'); setIsUserMenuOpen(false); }}
                        className="w-full text-left flex items-center space-x-2 p-2 text-[#B45309] hover:bg-amber-50 font-bold rounded transition-colors border-t border-[#E8E0D0] mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5 text-[#B45309]" /><span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button placed at the far RIGHT */}
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 text-[#212529] hover:text-[#C4A35A] transition-colors rounded-full hover:bg-[#F5F0E5] ml-1"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};
