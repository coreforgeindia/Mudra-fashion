'use client';

import React from 'react';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';

export default function WholesaleCompanyProfilePage() {
  const { user } = useRole();

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D0]">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">B2B Credentials</span>
            <h1 className="font-serif text-3xl font-bold text-[#212529] mt-1">Company Profile &amp; GST Details</h1>
          </div>
          <Link href="/wholesale/dashboard" className="text-xs font-bold text-[#6B7280] hover:text-[#212529] underline">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-[#FFF9EF] border border-[#E8E0D0] p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#6B7280] block">Registered Company Name</span>
              <span className="font-bold text-[#212529] text-sm">{user.companyName || 'Apex Corporate Garments Ltd'}</span>
            </div>
            <div>
              <span className="text-[#6B7280] block">GSTIN Registration</span>
              <span className="font-bold text-[#C4A35A] text-sm">{user.gstNumber || '29ABCDE1234F1Z5'}</span>
            </div>
            <div>
              <span className="text-[#6B7280] block">Primary Contact Email</span>
              <span className="font-bold text-[#212529]">{user.email || 'procurement@apexcorp.com'}</span>
            </div>
            <div>
              <span className="text-[#6B7280] block">Account Status</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">
                Verified B2B Tier
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
