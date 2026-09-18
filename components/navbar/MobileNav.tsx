'use client';

import React from 'react';
import Link from 'next/link';
import { MudraLogo } from '@/components/brand/MudraLogo';
import { useRole } from '@/context/RoleContext';
import { X, User, Crown, ChevronRight, LogIn, UserPlus, Heart, ShoppingBag, Phone, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  navLinks,
}) => {
  const { role, user } = useRole();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-hidden bg-black/50 backdrop-blur-md lg:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Sliding Panel */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-[85%] max-w-sm h-full bg-[#FBF8F1] text-[#212529] shadow-2xl flex flex-col justify-between z-[101]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8E0D0] flex items-center justify-between bg-[#FBF8F1]">
            <MudraLogo size="md" />
            <button
              onClick={onClose}
              className="p-2 text-[#6B7280] hover:text-[#212529] rounded-full hover:bg-[#F5F0E5] transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Account Quick Banner */}
          <div className="p-4 bg-[#FFF9EF] border-b border-[#E8E0D0] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6B7280] font-medium">Account:</span>
              <span className="font-bold text-[#212529] flex items-center space-x-1.5 truncate max-w-[150px]">
                {role === 'admin' && <Crown className="w-3.5 h-3.5 text-[#C4A35A]" />}
                <span className="truncate">{user.name}</span>
              </span>
            </div>

            {role === 'guest' ? (
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="py-2.5 px-3 bg-[#C4A35A] text-white rounded-md text-center flex items-center justify-center space-x-1.5 hover:bg-[#A8893D] transition-all shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">Sign In</span>
                </Link>
                <Link
                  href="/register"
                  onClick={onClose}
                  className="py-2.5 px-3 bg-[#2C2A25] text-white rounded-md text-center flex items-center justify-center space-x-1.5 hover:bg-[#3D3A33] transition-all shadow-sm"
                >
                  <UserPlus className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">Register</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/account"
                onClick={onClose}
                className="py-2 px-3 bg-[#F5F0E5] text-[#212529] rounded-md text-xs font-bold flex items-center justify-center space-x-2 hover:bg-[#E8E0D0] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#C4A35A]" />
                <span>View My Profile &amp; Orders</span>
              </Link>
            )}
          </div>

          {/* Main Navigation Links */}
          <div className="flex-1 overflow-y-auto py-3 px-5 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C4A35A] block mb-2 pt-1">
              Menu Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-3 border-b border-[#E8E0D0] text-sm font-semibold tracking-wider text-[#212529] hover:text-[#C4A35A] transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-[#C4A35A]/50" />
              </Link>
            ))}

            {/* Quick Portals & Options */}
            <div className="pt-5 pb-4 space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C4A35A] block mb-2">
                Your Bag &amp; Saved Items
              </span>

              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-md hover:bg-[#F5F0E5] text-xs font-semibold text-[#212529] transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="w-4 h-4 text-[#C4A35A]" />
                  <span>Shopping Cart</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#C4A35A]/50" />
              </Link>

              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-md hover:bg-[#F5F0E5] text-xs font-semibold text-[#212529] transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Heart className="w-4 h-4 text-[#C4A35A]" />
                  <span>Saved Wishlist</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#C4A35A]/50" />
              </Link>

              {role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-md bg-[#F5F0E5] text-xs font-bold text-[#C4A35A] hover:bg-[#E8D5A3]/40 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Crown className="w-4 h-4 text-[#C4A35A]" />
                    <span>Admin Panel</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C4A35A]" />
                </Link>
              )}
            </div>

            {/* Mobile Customer Support */}
            <div className="pt-3 pb-2 border-t border-[#E8E0D0] space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7BA48E] block mb-2">
                Customer Support
              </span>
              <a
                href="tel:+918045678900"
                className="flex items-center space-x-2.5 p-2.5 rounded-md hover:bg-[#F5F0E5] text-xs font-semibold text-[#212529] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#7BA48E]" />
                <span>+91 (080) 4567-8900</span>
              </a>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center space-x-2.5 p-2.5 rounded-md hover:bg-[#F5F0E5] text-xs font-semibold text-[#212529] transition-colors"
              >
                <Headphones className="w-4 h-4 text-[#8BB8D0]" />
                <span>Help &amp; Support Center</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
