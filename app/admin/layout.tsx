'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { MudraLogo } from '@/components/brand/MudraLogo';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  FileCheck,
  ShoppingCart,
  FileText,
  Tag,
  Boxes,
  Settings,
  ArrowLeft,
  Crown,
  Menu,
  X,
  Store,
  ChevronRight,
  ShieldAlert,
  LogIn,
  LogOut,
  Lock,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, setRole } = useRole();
  const [isAdminMobileOpen, setIsAdminMobileOpen] = useState(false);

  // Admin Login Form State
  const [adminEmail, setAdminEmail] = useState('admin@mudrafashions.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('admin');
  };

  const handleQuickAdminLogin = () => {
    setRole('admin');
  };

  const handleAdminLogout = () => {
    setRole('guest');
  };

  // If NOT logged in as admin, display the dedicated Admin Authentication Screen
  if (role !== 'admin') {
    return (
      <div className="bg-[#FBF8F1] min-h-screen flex items-center justify-center p-4 text-[#212529]">
        <div className="max-w-md w-full bg-[#FFF9EF] border border-[#E8E0D0] p-8 shadow-xl rounded-sm space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <MudraLogo size="lg" />
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#F5F0E5] border border-[#E8D5A3] text-[#C4A35A] text-[10px] font-bold uppercase tracking-widest rounded-full">
              <Lock className="w-3 h-3 text-[#C4A35A]" />
              <span>Restricted Access Console</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#212529]">
              Mudra Administrator Login
            </h1>
            <p className="text-xs text-[#6B7280]">
              Please authenticate to access the enterprise management dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[#212529] mb-1">
                Admin Username / Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-sm focus:outline-none focus:border-[#C4A35A]"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[#212529] mb-1">
                Security Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-sm focus:outline-none focus:border-[#C4A35A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#A8893D] transition-colors shadow-sm flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Log In to Admin Panel</span>
            </button>
          </form>

          {/* 1-Click Demo Login */}
          <div className="pt-4 border-t border-[#E8E0D0] space-y-3">
            <div className="p-3 bg-[#F5F0E5] border border-[#E8D5A3] rounded-sm text-xs space-y-1.5">
              <span className="font-bold text-[#A8893D] flex items-center space-x-1.5">
                <Crown className="w-3.5 h-3.5" />
                <span>One-Click Administrator Access:</span>
              </span>
              <p className="text-[#6B7280] text-[11px]">
                Click below to immediately log in as Super Administrator with full permissions.
              </p>
              <button
                type="button"
                onClick={handleQuickAdminLogin}
                className="w-full py-2 bg-[#2C2A25] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#3D3A33] transition-colors flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C4A35A]" />
                <span>Sign In as Super Admin</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="inline-flex items-center space-x-1.5 text-xs text-[#6B7280] hover:text-[#212529]"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C4A35A]" />
                <span>Return to Mudra Storefront</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Modules Navigation
  const adminLinks = [
    { name: 'Dashboard Overview', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Products Catalog', href: '/admin/products', icon: <Package className="w-4 h-4" /> },
    { name: 'Categories & Filters', href: '/admin/categories', icon: <FolderTree className="w-4 h-4" /> },
    { name: 'Customer Directory', href: '/admin/customers', icon: <Users className="w-4 h-4" /> },
    { name: 'Wholesale B2B Requests', href: '/admin/wholesale-applications', icon: <FileCheck className="w-4 h-4" /> },
    { name: 'Customer Orders', href: '/admin/orders', icon: <ShoppingCart className="w-4 h-4" /> },
    { name: 'B2B Quotations', href: '/admin/quotations', icon: <FileText className="w-4 h-4" /> },
    { name: 'Pricing Tiers', href: '/admin/pricing', icon: <Tag className="w-4 h-4" /> },
    { name: 'Inventory & Stock Alerts', href: '/admin/inventory', icon: <Boxes className="w-4 h-4" /> },
    { name: 'Admin Settings', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const currentPage = adminLinks.find((l) => l.href === pathname) || adminLinks[0];

  return (
    <div className="bg-[#F8FAFC] text-neutral-900 min-h-screen font-sans flex flex-col md:flex-row">
      {/* 1. Mobile Admin Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAdminMobileOpen(true)}
            className="p-2 text-neutral-700 hover:text-[#C4A35A] hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Open Admin Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C4A35A] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C4A35A]">Mudra Admin</span>
            </div>
            <h2 className="font-serif font-bold text-sm text-neutral-900 truncate max-w-[220px] sm:max-w-none">
              {currentPage.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleAdminLogout}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
          <Link
            href="/"
            className="flex items-center space-x-1 py-1.5 px-3 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-md hover:bg-neutral-200 transition-colors"
            title="Return to Customer Storefront"
          >
            <Store className="w-3.5 h-3.5 text-[#C4A35A]" />
            <span>Store</span>
          </Link>
        </div>
      </header>

      {/* 2. Mobile Admin Drawer */}
      <AnimatePresence>
        {isAdminMobileOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminMobileOpen(false)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-[85%] max-w-sm h-full bg-white text-neutral-900 shadow-2xl flex flex-col justify-between z-50"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-neutral-200 bg-[#FAF9F6] flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C4A35A] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-neutral-900">Mudra Admin Panel</h3>
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block">
                      Enterprise Management Console
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsAdminMobileOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation List */}
              <div className="flex-1 overflow-y-auto py-3 px-4 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-2 px-2 pt-1">
                  Admin Modules &amp; Reports
                </span>

                {adminLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsAdminMobileOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#C4A35A] text-white font-bold shadow-md'
                          : 'text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={isActive ? 'text-white' : 'text-[#C4A35A]'}>{link.icon}</span>
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-neutral-200 bg-[#FAF9F6] space-y-2">
                <button
                  onClick={() => {
                    handleAdminLogout();
                    setIsAdminMobileOpen(false);
                  }}
                  className="w-full py-2.5 px-4 bg-red-50 text-red-700 text-xs font-bold rounded-md hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out Admin</span>
                </button>

                <Link
                  href="/"
                  onClick={() => setIsAdminMobileOpen(false)}
                  className="w-full py-2.5 px-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-md text-center flex items-center justify-center space-x-2 hover:bg-neutral-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Exit Admin to Storefront</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-neutral-200 p-5 flex-shrink-0 space-y-6 flex-col justify-between shadow-sm min-h-screen">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C4A35A] text-white flex items-center justify-center font-bold text-base shadow-sm">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm text-neutral-900 block">Mudra Admin</span>
                <span className="text-[10px] text-[#7BA48E] font-semibold">● Authenticated</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-medium">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#C4A35A] text-white font-bold shadow-sm'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-neutral-500'}>{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to Website & Logout */}
        <div className="pt-4 border-t border-neutral-200 space-y-2">
          <button
            onClick={handleAdminLogout}
            className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Log Out Admin</span>
            </span>
          </button>

          <Link
            href="/"
            className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-100 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4 text-[#C4A35A]" />
              <span>Back to Storefront</span>
            </span>
          </Link>
        </div>
      </aside>

      {/* 4. Main View Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl overflow-x-hidden">{children}</main>
    </div>
  );
}
