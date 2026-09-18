'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRole, UserRole } from '@/context/RoleContext';
import { MudraLogo } from '@/components/brand/MudraLogo';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff, Building2, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { setRole } = useRole();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<'retail' | 'wholesale'>('retail');
  const [companyName, setCompanyName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);

  const handleManualRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;

    const userObj = {
      name: name || 'New Customer',
      email: email,
      phone: phone,
      companyName: accountType === 'wholesale' ? companyName || 'My Wholesale Business' : undefined,
    };
    localStorage.setItem('mudra_user_details', JSON.stringify(userObj));

    if (accountType === 'wholesale') {
      setRole('wholesale_pending');
      router.push('/wholesale/apply');
    } else {
      setRole('retail');
      router.push('/account');
    }
  };

  return (
    <div className="bg-[#FFF9EF] min-h-screen py-12 sm:py-16 flex items-center justify-center px-4">
      <div className="bg-[#FBF8F1] border border-[#E8E0D0] p-6 sm:p-10 shadow-2xl max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <MudraLogo size="sm" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#212529] pt-2">Create Account</h1>
          <p className="text-xs text-[#6B7280]">Register manually or connect with Google &amp; Social accounts</p>
        </div>

        {/* 1. Express Social Sign Up */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block text-center">
            Express Social Sign Up
          </span>
          <SocialAuthButtons mode="register" selectedRole={accountType === 'wholesale' ? 'wholesale_pending' : 'retail'} />
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#E8E0D0] w-full" />
          <span className="bg-[#FBF8F1] px-3 text-[11px] font-bold text-neutral-400 uppercase tracking-widest absolute">
            Or Register Manually
          </span>
        </div>

        {/* 2. Account Type Selector */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAccountType('retail')}
            className={`p-3 border text-center transition-all ${
              accountType === 'retail'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-[#FFF9EF] text-[#6B7280] border-[#E8E0D0] hover:bg-neutral-100'
            }`}
          >
            Retail Customer
          </button>
          <button
            type="button"
            onClick={() => setAccountType('wholesale')}
            className={`p-3 border text-center transition-all flex items-center justify-center space-x-1.5 ${
              accountType === 'wholesale'
                ? 'bg-[#C4A35A] text-white border-[#C4A35A] shadow-sm'
                : 'bg-[#FFF9EF] text-[#6B7280] border-[#E8E0D0] hover:bg-neutral-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>B2B Wholesale</span>
          </button>
        </div>

        {/* 3. Manual Registration Form */}
        <form onSubmit={handleManualRegister} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#212529] mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="Vikramaditya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#212529] mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="vikram@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#212529] mb-1">Phone Number *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
              />
            </div>
          </div>

          {accountType === 'wholesale' && (
            <div>
              <label className="block font-bold text-[#212529] mb-1">Business / Company Name *</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Corporate Textiles"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-[#212529] mb-1">Create Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-neutral-400 hover:text-[#6B7280]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <label className="flex items-start space-x-2 cursor-pointer text-[#6B7280] pt-1">
            <input
              type="checkbox"
              required
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 accent-[#C4A35A]"
            />
            <span className="text-[11px] leading-tight">
              I agree to the <Link href="/terms" className="underline font-bold text-neutral-800">Terms of Service</Link> and{' '}
              <Link href="/privacy" className="underline font-bold text-neutral-800">Privacy Policy</Link>.
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#A8893D] transition-colors flex items-center justify-center space-x-2 shadow-md"
          >
            <span>{accountType === 'wholesale' ? 'Proceed to Wholesale Application' : 'Create Customer Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E8E0D0] text-center text-xs text-[#6B7280] space-y-2">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#C4A35A] hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
