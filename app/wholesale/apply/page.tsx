'use client';

import React, { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Building2, CheckCircle2, ShieldCheck, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function WholesaleApplyPage() {
  const { role, user, wholesaleApplications, submitWholesaleApplication } = useRole();
  const [submitted, setSubmitted] = useState(false);

  // Check if current user already has an application in the system
  const existingApp = wholesaleApplications.find(
    (a) => a.email === user.email || (user.companyName && a.businessName === user.companyName)
  );

  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    gstNumber: '',
    businessType: 'Retail Garment Store',
    address: '',
    city: '',
    state: '',
    pincode: '',
    expectedOrderQty: '200 - 500 pieces / month',
    categories: [] as string[],
  });

  const categoryOptions = [
    "Men's Shirts",
    "Men's Pants",
    'Formal Wear & Blazers',
    'Corporate Uniforms',
    'Hospital & Lab Coats',
    'Textile Fabrics',
  ];

  const handleCategoryToggle = (cat: string) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(cat);
      if (exists) {
        return { ...prev, categories: prev.categories.filter((c) => c !== cat) };
      }
      return { ...prev, categories: [...prev.categories, cat] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitWholesaleApplication(formData);
    setSubmitted(true);
  };

  const isApproved = role === 'wholesale_approved' || (existingApp && existingApp.status === 'approved');
  const isPending = role === 'wholesale_pending' || (existingApp && existingApp.status === 'pending');

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="down">
          <div className="text-center mb-10">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Commercial Registration</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#212529]">
              Apply for Wholesale Account
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-lg mx-auto mt-2">
              Fill in your business and GST credentials to request access to Mudra Fashions B2B tier pricing.
            </p>
          </div>
        </ScrollReveal>

        {/* 1. Client status view if APPROVED */}
        {isApproved ? (
          <ScrollReveal direction="up">
            <div className="bg-emerald-50 border-2 border-emerald-500 p-8 md:p-12 text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-widest rounded-full">
                  Account Approved &amp; Active
                </span>
                <h2 className="font-serif font-bold text-3xl text-[#212529] mt-3 mb-2">
                  Welcome to Mudra B2B Wholesale Tier
                </h2>
                <p className="text-sm text-[#212529] max-w-md mx-auto">
                  Your business account for <strong>{user.companyName || 'Your Business'}</strong> is verified! You now have full access to wholesale tier pricing, bulk matrix ordering, and GST invoices.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link
                  href="/wholesale/dashboard"
                  className="px-8 py-3.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#A8893D] transition-colors shadow-lg flex items-center space-x-2"
                >
                  <span>Open Wholesale Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/wholesale/products"
                  className="px-8 py-3.5 bg-[#FBF8F1] text-[#212529] border-2 border-neutral-900 text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  Browse Wholesale Products
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ) : isPending || submitted ? (
          /* 2. Client status view if PENDING REVIEW */
          <ScrollReveal direction="up">
            <div className="bg-amber-50 border-2 border-amber-400 p-8 md:p-12 text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Clock className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 bg-amber-200 text-amber-900 text-xs font-bold uppercase tracking-widest rounded-full">
                  Under Admin Review
                </span>
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#212529] mt-3 mb-2">
                  Your wholesale application has been submitted.
                </h2>
                <p className="text-sm text-[#212529] max-w-md mx-auto">
                  Application for <strong>{user.companyName || formData.businessName || 'Your Company'}</strong> is currently under review in the Admin Panel. Once approved by Admin, wholesale tier pricing will unlock automatically across the website!
                </p>
              </div>

              <div className="p-4 bg-[#FBF8F1] border border-amber-300 text-xs text-amber-900 max-w-md mx-auto text-left space-y-1">
                <span className="font-bold block text-[#212529]">Application Summary:</span>
                <p>• Applied Date: {existingApp?.appliedDate || 'Today'}</p>
                <p>• GSTIN: {existingApp?.gstNumber || formData.gstNumber || 'Provided'}</p>
                <p>• Email: {existingApp?.email || formData.email}</p>
              </div>

              <div className="flex justify-center space-x-4 pt-2">
                <Link
                  href="/wholesale/dashboard"
                  className="px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center space-x-2"
                >
                  <span>Go to Wholesale Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          /* 3. Initial Application Form */
          <ScrollReveal direction="up">
            <form onSubmit={handleSubmit} className="bg-[#FBF8F1] border border-[#E8E0D0] p-6 sm:p-10 shadow-xl space-y-8">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#212529] pb-2 border-b border-[#E8E0D0] flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-[#C4A35A]" />
                  <span>1. Business Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Registered Business Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vanguard Hospitality Uniforms"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-1">GST Identification Number (GSTIN) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 07AAAAA0000A1Z5"
                      value={formData.gstNumber}
                      onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                      className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A] uppercase"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Rohan Mehra"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Business Type *</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    >
                      <option>Retail Garment Store / Boutique</option>
                      <option>Chain Store / Retailer</option>
                      <option>Corporate Enterprise Buyer</option>
                      <option>Hotel &amp; Hospitality Supplier</option>
                      <option>Hospital &amp; Healthcare Procurement</option>
                      <option>Uniform Distributor / Agent</option>
                      <option>Tailor / Garment Manufacturer</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#212529] pb-2 border-b border-[#E8E0D0]">
                  2. Contact &amp; Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rohan@vanguardhospitality.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98112 33445"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-[#212529] mb-1">Registered Office Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Building No 14, Commercial Complex"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="New Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-1">State &amp; Pincode *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Delhi"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                      />
                      <input
                        type="text"
                        required
                        placeholder="110001"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirement Profile */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#212529] pb-2 border-b border-[#E8E0D0]">
                  3. Expected Purchase Volume &amp; Categories
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Expected Monthly Order Volume</label>
                    <select
                      value={formData.expectedOrderQty}
                      onChange={(e) => setFormData({ ...formData, expectedOrderQty: e.target.value })}
                      className="w-full p-3 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                    >
                      <option>50 - 100 pieces / month</option>
                      <option>100 - 500 pieces / month</option>
                      <option>500 - 1,000 pieces / month</option>
                      <option>1,000+ pieces / month</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-2">Product Categories Interested In:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {categoryOptions.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategoryToggle(cat)}
                          className={`flex items-center space-x-2 p-2.5 border text-left transition-colors ${
                            formData.categories.includes(cat)
                              ? 'bg-[#F5F0E5] border-[#C4A35A] text-[#C4A35A] font-bold'
                              : 'bg-[#FFF9EF] border-[#E8E0D0] text-[#212529]'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-sm border flex items-center justify-center ${formData.categories.includes(cat) ? 'bg-[#C4A35A] text-white border-[#C4A35A]' : 'border-neutral-400'}`}>
                            {formData.categories.includes(cat) && <CheckCircle2 className="w-3 h-3" />}
                          </span>
                          <span>{cat}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[#A8893D] transition-colors"
                >
                  Submit Wholesale Application
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#6B7280]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Strict confidentiality guaranteed. We do not share trade information.</span>
                </div>
              </div>
            </form>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
