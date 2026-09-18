'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRole } from '@/context/RoleContext';
import { useCart } from '@/context/CartContext';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Download,
  Award,
  Layers,
  Percent,
  Truck,
  LogIn,
  UserPlus,
  ShoppingBag,
  Clock,
  Sparkles,
  Calculator,
  Check,
  CreditCard,
  Phone,
  Mail
} from 'lucide-react';

const WHOLESALE_DEALS = [
  {
    id: 'ws-d1',
    name: 'Executive Giza Cotton Shirting Bundle',
    category: 'Formal Shirts',
    moq: '25 Pieces',
    regularPrice: 1899,
    wholesalePrice: 850,
    discountPercent: '55% OFF',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    description: '100% Egyptian Giza cotton shirts in assorted sizes (38-44) and executive color palette (White, Sky Blue, Navy).',
    badge: 'Best Seller Deal',
    inStock: true,
  },
  {
    id: 'ws-d2',
    name: 'Corporate Suiting Blazer Master Pack',
    category: 'Blazers & Suits',
    moq: '12 Pieces',
    regularPrice: 4999,
    wholesalePrice: 2450,
    discountPercent: '51% OFF',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
    description: 'Italian-cut structured wool-blend blazers with notch lapels, ideal for corporate management and executive staff.',
    badge: 'Enterprise Grade',
    inStock: true,
  },
  {
    id: 'ws-d3',
    name: 'European Pure Linen Fabric Bolt (50m)',
    category: 'Fabrics & Textiles',
    moq: '1 Roll (50 Meters)',
    regularPrice: 650,
    wholesalePrice: 320,
    discountPercent: '50% OFF',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
    description: '60 Lea natural Normandy flax pure linen roll, pre-softened for high-end boutique and bespoke tailoring.',
    badge: 'Mill Direct',
    inStock: true,
  },
  {
    id: 'ws-d4',
    name: 'Flex-Waist Formal Trousers Lot',
    category: 'Tailored Pants',
    moq: '20 Pieces',
    regularPrice: 1999,
    wholesalePrice: 920,
    discountPercent: '54% OFF',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
    description: 'Poly-viscose stretch flat-front formal trousers with expandable hidden waistband and stain-shield finish.',
    badge: 'High Durability',
    inStock: true,
  },
];

export default function WholesalePage() {
  const { role, setRole, user } = useRole();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'catalog' | 'login' | 'rfq'>('catalog');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginGstin, setLoginGstin] = useState('');
  const [addedDealId, setAddedDealId] = useState<string | null>(null);

  // RFQ State
  const [rfqItem, setRfqItem] = useState('Executive Shirts');
  const [rfqQty, setRfqQty] = useState(50);
  const [rfqCompany, setRfqCompany] = useState(user.companyName || '');
  const [rfqGenerated, setRfqGenerated] = useState(false);

  const isWholesaleApproved = role === 'wholesale_approved';

  const handleQuickWholesaleLogin = () => {
    setRole('wholesale_approved');
    setActiveTab('catalog');
  };

  const handleAddDealToCart = (deal: typeof WHOLESALE_DEALS[0]) => {
    addToCart(
      {
        id: deal.id,
        slug: deal.id,
        name: `[WHOLESALE PACK] ${deal.name}`,
        category: 'wholesale',
        subcategory: deal.category,
        price: deal.wholesalePrice,
        rating: 5.0,
        reviewsCount: 42,
        images: [deal.image],
        description: deal.description,
        features: ['B2B Wholesale Lot', 'Official GST Input Tax Invoice Included'],
        fabric: deal.category,
        material: 'Premium Commercial Blend',
        fit: 'Assorted Sizing Pack',
        pattern: 'Mixed Lot',
        careInstructions: ['Commercial wash safe'],
        colors: [{ name: 'Assorted', hex: '#C4A35A' }],
        sizes: [deal.moq],
        inStock: true,
        stockCount: 50,
        sizeChartType: 'shirt',
      },
      deal.moq,
      'Assorted Batch',
      1,
      deal.wholesalePrice * 10,
      true
    );
    setAddedDealId(deal.id);
    setTimeout(() => setAddedDealId(null), 2500);
  };

  return (
    <div className="bg-[#FBF8F1] text-[#212529] min-h-screen pb-20 pt-6">
      {/* 1. Hero Enterprise Header */}
      <section className="bg-[#FBF8F1] border-b border-[#E8E0D0] py-12 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <ScrollReveal direction="down">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#F5F0E5] text-[#C4A35A] border border-[#E8D5A3] text-xs font-bold uppercase tracking-[0.25em] rounded-full">
                  <Building2 className="w-3.5 h-3.5 text-[#C4A35A]" />
                  <span>B2B Wholesale &amp; Commercial Supply</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#212529] mt-2">
                  Direct Mill Sourcing <br />
                  <span className="text-[#C4A35A] font-normal">&amp; Bulk Wholesale Deals</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl font-light leading-relaxed">
                  Partner with Mudra Fashions for direct volume discounts up to 55% OFF, GST Input Tax Credit invoices, low MOQs, and express delivery nationwide.
                </p>
              </ScrollReveal>

              {/* Status Indicator */}
              <div className="pt-2">
                {isWholesaleApproved ? (
                  <div className="inline-flex items-center space-x-2 p-3 bg-[#EBF5EE] border border-[#7BA48E] text-[#1E3A2F] text-xs font-bold rounded-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#7BA48E]" />
                    <span>Logged In as Approved Wholesale Partner: {user.companyName || user.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('login')}
                      className="px-5 py-2.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#A8893D] transition-colors flex items-center space-x-2 shadow-xs"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Wholesale Partner Login</span>
                    </button>
                    <button
                      onClick={handleQuickWholesaleLogin}
                      className="px-5 py-2.5 bg-[#2C2A25] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#3D3A33] transition-colors flex items-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#C4A35A]" />
                      <span>1-Click Demo Partner Access</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="left">
                <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] shadow-sm rounded-sm space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#212529] pb-2 border-b border-[#E8E0D0]">
                    Wholesale Commercial Privileges
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start space-x-2.5">
                      <Percent className="w-4 h-4 text-[#C4A35A] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#212529]">Tiered Volume Discounts (35% to 55% Off)</strong>
                        <span className="text-[#6B7280]">Direct mill pricing applied automatically on bulk quantities.</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <FileText className="w-4 h-4 text-[#7BA48E] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#212529]">Official GST Input Tax Invoices</strong>
                        <span className="text-[#6B7280]">Automated B2B invoices generated with your company GSTIN.</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Truck className="w-4 h-4 text-[#8BB8D0] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#212529]">Pan-India Logistics &amp; Freight</strong>
                        <span className="text-[#6B7280]">Express air &amp; surface logistics to 19,000+ PIN codes.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex space-x-2 border-t border-[#E8E0D0] pt-6 mt-8">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                activeTab === 'catalog'
                  ? 'bg-[#C4A35A] text-white shadow-xs'
                  : 'bg-[#FFF9EF] border border-[#E8E0D0] text-[#212529] hover:bg-[#F5F0E5]'
              }`}
            >
              Wholesale Deals &amp; Bundles
            </button>
            <button
              onClick={() => setActiveTab('rfq')}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                activeTab === 'rfq'
                  ? 'bg-[#C4A35A] text-white shadow-xs'
                  : 'bg-[#FFF9EF] border border-[#E8E0D0] text-[#212529] hover:bg-[#F5F0E5]'
              }`}
            >
              Instant RFQ Quotation Generator
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                activeTab === 'login'
                  ? 'bg-[#C4A35A] text-white shadow-xs'
                  : 'bg-[#FFF9EF] border border-[#E8E0D0] text-[#212529] hover:bg-[#F5F0E5]'
              }`}
            >
              Partner Portal Login
            </button>
          </div>
        </div>
      </section>

      {/* 2. TAB: WHOLESALE DEALS CATALOG */}
      {activeTab === 'catalog' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-3 border-b border-[#E8E0D0] gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C4A35A]">
                Exclusive Mill Bundles
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#212529]">
                Featured Wholesale Bulk Deals
              </h2>
            </div>
            <span className="text-xs text-[#6B7280]">
              *Prices exclusive of 5% GST. Standard MOQ per lot applies.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHOLESALE_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="bg-[#FFF9EF] border border-[#E8E0D0] hover:border-[#C4A35A] transition-all p-5 rounded-sm flex flex-col justify-between shadow-xs"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative aspect-[4/3] sm:w-44 w-full rounded overflow-hidden flex-shrink-0 bg-[#E8E0D0]">
                    <Image
                      src={deal.image}
                      alt={deal.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#C4A35A] text-white text-[9px] font-bold uppercase tracking-wider rounded-sm">
                      {deal.discountPercent}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-[#7BA48E] tracking-wider">
                        {deal.category}
                      </span>
                      <span className="text-[10px] font-semibold text-[#6B7280]">
                        MOQ: {deal.moq}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#212529]">
                      {deal.name}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                      {deal.description}
                    </p>

                    <div className="pt-2 flex items-baseline space-x-2">
                      <span className="font-serif text-xl font-bold text-[#212529]">
                        ₹{deal.wholesalePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#6B7280]">/ unit</span>
                      <span className="text-xs text-[#9CA3AF] line-through">
                        ₹{deal.regularPrice.toLocaleString('en-IN')} retail
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8E0D0] flex items-center justify-between">
                  <span className="text-[11px] text-[#7BA48E] font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Stock — Dispatches within 24h</span>
                  </span>

                  <button
                    onClick={() => handleAddDealToCart(deal)}
                    className="px-4 py-2 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 rounded-sm hover:bg-[#A8893D] transition-colors"
                  >
                    {addedDealId === deal.id ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                    <span>{addedDealId === deal.id ? 'Added Lot!' : 'Order Batch'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Volume Pricing Matrix */}
          <div className="bg-[#FFF9EF] p-6 border border-[#E8E0D0] rounded-sm space-y-4 mt-10">
            <h3 className="font-serif font-bold text-lg text-[#212529]">
              Standard Volume Discount Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#E8E0D0] text-[#6B7280] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Order Volume</th>
                    <th className="py-2.5 px-3">Discount Off Retail</th>
                    <th className="py-2.5 px-3">Credit Terms</th>
                    <th className="py-2.5 px-3">Custom Branding</th>
                    <th className="py-2.5 px-3">Shipping</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E0D0]">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-[#212529]">Tier 1 (15 - 49 pcs / 25-50m)</td>
                    <td className="py-2.5 px-3 font-semibold text-[#C4A35A]">35% OFF</td>
                    <td className="py-2.5 px-3 text-[#6B7280]">Advance / UPI / Card</td>
                    <td className="py-2.5 px-3 text-[#6B7280]">Standard Labels</td>
                    <td className="py-2.5 px-3 text-[#6B7280]">Standard Ground</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-[#212529]">Tier 2 (50 - 199 pcs / 100-300m)</td>
                    <td className="py-2.5 px-3 font-semibold text-[#C4A35A]">45% OFF</td>
                    <td className="py-2.5 px-3 text-[#6B7280]">50% Advance + 50% on Dispatch</td>
                    <td className="py-2.5 px-3 text-[#6B7280]">Custom Neck Tag Included</td>
                    <td className="py-2.5 px-3 text-[#6B7280]">Express Air / Cargo</td>
                  </tr>
                  <tr className="bg-[#F5F0E5]">
                    <td className="py-2.5 px-3 font-bold text-[#212529]">Tier 3 (200+ pcs / 500m+ Bolt)</td>
                    <td className="py-2.5 px-3 font-bold text-[#7BA48E]">55% OFF (Direct Mill Rate)</td>
                    <td className="py-2.5 px-3 font-semibold text-[#212529]">Net 30 Days (On Credit Approval)</td>
                    <td className="py-2.5 px-3 font-semibold text-[#212529]">Full Custom Packaging &amp; Tags</td>
                    <td className="py-2.5 px-3 font-semibold text-[#7BA48E]">Free Dedicated Freight</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 3. TAB: INSTANT RFQ QUOTATION GENERATOR */}
      {activeTab === 'rfq' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#FFF9EF] p-8 border border-[#E8E0D0] rounded-sm space-y-6 shadow-sm">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">
                Instant B2B Calculator
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#212529] mt-1">
                Request for Quotation (RFQ) Generator
              </h2>
              <p className="text-xs text-[#6B7280]">
                Select your product specifications, enter your expected quantity, and download an instant estimation quotation with GST calculation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#212529] mb-1">
                  Product Line
                </label>
                <select
                  value={rfqItem}
                  onChange={(e) => setRfqItem(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] text-xs font-medium rounded-sm focus:outline-none focus:border-[#C4A35A]"
                >
                  <option value="Executive Shirts">Executive Giza Cotton Shirts (₹850/pc)</option>
                  <option value="Formal Blazers">Italian Wool Suiting Blazers (₹2,450/pc)</option>
                  <option value="Pure Linen Fabric">Normandy Pure Linen Fabric (₹320/m)</option>
                  <option value="Tailored Trousers">Flex-Waist Formal Trousers (₹920/pc)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#212529] mb-1">
                  Quantity Required (Units / Meters)
                </label>
                <input
                  type="number"
                  min="15"
                  step="5"
                  value={rfqQty}
                  onChange={(e) => setRfqQty(parseInt(e.target.value) || 15)}
                  className="w-full p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] text-xs font-medium rounded-sm focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#212529] mb-1">
                  Company / Business Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Corporate Garments Pvt Ltd"
                  value={rfqCompany}
                  onChange={(e) => setRfqCompany(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] text-xs font-medium rounded-sm focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#212529] mb-1">
                  Company GSTIN
                </label>
                <input
                  type="text"
                  placeholder="29ABCDE1234F1Z5"
                  defaultValue={user.gstNumber || '29ABCDE1234F1Z5'}
                  className="w-full p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] text-xs font-medium rounded-sm focus:outline-none focus:border-[#C4A35A]"
                />
              </div>
            </div>

            {/* Calculations Box */}
            <div className="p-4 bg-[#F5F0E5] border border-[#E8D5A3] rounded-sm space-y-2 text-xs">
              <div className="flex justify-between font-medium text-[#6B7280]">
                <span>Base Unit Rate:</span>
                <span>
                  ₹{rfqItem.includes('Blazer') ? '2,450' : rfqItem.includes('Linen') ? '320' : rfqItem.includes('Trouser') ? '920' : '850'} / unit
                </span>
              </div>
              <div className="flex justify-between font-medium text-[#6B7280]">
                <span>Estimated Subtotal ({rfqQty} units):</span>
                <span>
                  ₹{((rfqItem.includes('Blazer') ? 2450 : rfqItem.includes('Linen') ? 320 : rfqItem.includes('Trouser') ? 920 : 850) * rfqQty).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between font-medium text-[#6B7280]">
                <span>Estimated GST @ 5%:</span>
                <span>
                  ₹{(Math.round(((rfqItem.includes('Blazer') ? 2450 : rfqItem.includes('Linen') ? 320 : rfqItem.includes('Trouser') ? 920 : 850) * rfqQty) * 0.05)).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8D5A3] flex justify-between font-bold text-sm text-[#212529]">
                <span>Total Commercial Estimate:</span>
                <span className="font-serif text-base text-[#C4A35A]">
                  ₹{(Math.round(((rfqItem.includes('Blazer') ? 2450 : rfqItem.includes('Linen') ? 320 : rfqItem.includes('Trouser') ? 920 : 850) * rfqQty) * 1.05)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setRfqGenerated(true)}
                className="px-6 py-2.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 rounded-sm hover:bg-[#A8893D] transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>{rfqGenerated ? 'Quotation Generated ✓' : 'Generate Formal PDF Quotation'}</span>
              </button>
              {rfqGenerated && (
                <button
                  onClick={() => alert('Official Mudra Quotation PDF ready for download.')}
                  className="px-6 py-2.5 bg-[#2C2A25] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 rounded-sm hover:bg-[#3D3A33] transition-colors"
                >
                  <Download className="w-4 h-4 text-[#C4A35A]" />
                  <span>Download Quotation #MF-RFQ-{Date.now().toString().slice(-4)}</span>
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. TAB: WHOLESALE LOGIN & REGISTRATION */}
      {activeTab === 'login' && (
        <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#FFF9EF] p-8 border border-[#E8E0D0] rounded-sm space-y-6 shadow-sm">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-[#F5F0E5] text-[#C4A35A] rounded-full mx-auto flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#212529]">
                Wholesale Partner Login
              </h2>
              <p className="text-xs text-[#6B7280]">
                Access pre-negotiated tier rates, bulk orders, and GST invoices.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRole('wholesale_approved');
                setActiveTab('catalog');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#212529] mb-1">
                  Registered Business Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="procurement@yourcompany.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-sm focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#212529] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-sm focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#212529] mb-1">
                  Company GSTIN (Optional)
                </label>
                <input
                  type="text"
                  placeholder="29ABCDE1234F1Z5"
                  value={loginGstin}
                  onChange={(e) => setLoginGstin(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF8F1] border border-[#E8E0D0] rounded-sm focus:outline-none focus:border-[#C4A35A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#A8893D] transition-colors shadow-sm flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In to Wholesale Portal</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#E8E0D0] space-y-3">
              <div className="p-3 bg-[#F5F0E5] border border-[#E8D5A3] rounded-sm text-xs space-y-1">
                <span className="font-bold text-[#A8893D] block">1-Click Test Login:</span>
                <p className="text-[#6B7280] text-[11px]">
                  Click below to instantly authenticate as <strong>Apex Corporate Garments Ltd</strong> (Approved Tier 3 Partner).
                </p>
                <button
                  type="button"
                  onClick={handleQuickWholesaleLogin}
                  className="mt-1 w-full py-2 bg-[#2C2A25] text-white text-[11px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#3D3A33] transition-colors"
                >
                  Quick Sign In (Apex Corporate)
                </button>
              </div>

              <div className="text-center text-xs text-[#6B7280]">
                Don&apos;t have a wholesale account?{' '}
                <Link href="/wholesale/apply" className="font-bold text-[#C4A35A] hover:underline">
                  Apply for Wholesale Partner Account →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
