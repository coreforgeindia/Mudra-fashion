'use client';

import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Store Setup</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Admin Settings</h1>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 p-6 space-y-6 text-xs">
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-base text-neutral-900 pb-2 border-b border-neutral-200">
            GST &amp; Taxation Setup
          </h3>
          <div>
            <label className="block font-bold text-neutral-700 mb-1">Store Legal Name</label>
            <input type="text" defaultValue="MUDRA FASHIONS TEXTILES PVT LTD" className="w-full p-2.5 border border-neutral-300 font-semibold" />
          </div>
          <div>
            <label className="block font-bold text-neutral-700 mb-1">Company GSTIN</label>
            <input type="text" defaultValue="29AAACM1234F1Z9" className="w-full p-2.5 border border-neutral-300 font-mono font-bold" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif font-bold text-base text-neutral-900 pb-2 border-b border-neutral-200">
            Shipping &amp; Freight Rates
          </h3>
          <div>
            <label className="block font-bold text-neutral-700 mb-1">Free Shipping Threshold (Retail)</label>
            <input type="number" defaultValue={1999} className="w-full p-2.5 border border-neutral-300 font-semibold" />
          </div>
          <div>
            <label className="block font-bold text-neutral-700 mb-1">Default Flat Freight Rate (₹)</label>
            <input type="number" defaultValue={150} className="w-full p-2.5 border border-neutral-300 font-semibold" />
          </div>
        </div>

        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="w-full py-3 bg-[#C4A35A] text-white font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-[#A8893D]"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Settings Saved!' : 'Save Configurations'}</span>
        </button>
      </div>
    </div>
  );
}
