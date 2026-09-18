'use client';

import React, { useState } from 'react';
import { useRole, UserRole } from '@/context/RoleContext';
import { ShieldCheck, User, Building2, Crown, ChevronDown } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole, user } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { key: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { key: 'guest', label: 'Guest Visitor', icon: <User className="w-3.5 h-3.5" />, desc: 'Standard retail visitor' },
    { key: 'retail', label: 'Retail Customer', icon: <User className="w-3.5 h-3.5 text-blue-500" />, desc: 'Logged-in retail buyer' },
    { key: 'wholesale_pending', label: 'Wholesale (Pending)', icon: <Building2 className="w-3.5 h-3.5 text-amber-500" />, desc: 'Application under review' },
    { key: 'wholesale_approved', label: 'Wholesale (Approved)', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />, desc: 'B2B tier pricing unlocked' },
    { key: 'admin', label: 'Admin Panel', icon: <Crown className="w-3.5 h-3.5 text-[#C4A35A]" />, desc: 'Full store manager' },
  ];

  const activeRoleObj = roles.find((r) => r.key === role) || roles[0];

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden sm:block">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3.5 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-full shadow-2xl border border-neutral-700 hover:bg-neutral-800 transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#C4A35A] animate-pulse" />
          <div className="flex items-center space-x-1.5">
            {activeRoleObj.icon}
            <span className="tracking-wider uppercase text-[10px]">{activeRoleObj.label}</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-12 w-64 bg-[#FBF8F1] text-[#212529] border border-[#E8E0D0] shadow-2xl p-2 space-y-1 text-xs z-50">
            <div className="px-2 py-1.5 border-b border-neutral-100 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">
                Demo Role Simulator
              </span>
              <p className="text-[11px] font-semibold text-neutral-800 truncate">{user.name}</p>
            </div>

            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => {
                  setRole(r.key);
                  setIsOpen(false);
                }}
                className={`w-full text-left flex items-start space-x-2.5 p-2 transition-colors ${
                  role === r.key ? 'bg-[#F5F0E5] border-l-2 border-[#C4A35A]' : 'hover:bg-neutral-100'
                }`}
              >
                <div className="mt-0.5">{r.icon}</div>
                <div>
                  <span className="font-bold text-[#212529] block">{r.label}</span>
                  <span className="text-[10px] text-[#6B7280] block">{r.desc}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
