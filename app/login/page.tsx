'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRole, UserRole } from '@/context/RoleContext';
import { MudraLogo } from '@/components/brand/MudraLogo';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useRole();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('retail');
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModal, setForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const userObj = {
        name: email.split('@')[0].replace('.', ' '),
        email: email,
      };
      localStorage.setItem('mudra_user_details', JSON.stringify(userObj));
    }
    setRole(selectedRole);
    if (selectedRole === 'admin') router.push('/admin');
    else if (selectedRole.startsWith('wholesale')) router.push('/wholesale/dashboard');
    else router.push('/account');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  return (
    <div className="bg-[#FFF9EF] min-h-screen py-12 sm:py-16 flex items-center justify-center px-4">
      <div className="bg-[#FBF8F1] border border-[#E8E0D0] p-6 sm:p-10 shadow-2xl max-w-lg w-full space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <MudraLogo size="sm" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#212529] pt-2">Sign In to Mudra Fashions</h1>
          <p className="text-xs text-[#6B7280]">Sign in manually or through Google and other social accounts</p>
        </div>

        {/* 1. Social Single Sign-On Options */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block text-center">
            Express Social Sign In
          </span>
          <SocialAuthButtons mode="login" selectedRole={selectedRole} />
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#E8E0D0] w-full" />
          <span className="bg-[#FBF8F1] px-3 text-[11px] font-bold text-neutral-400 uppercase tracking-widest absolute">
            Or Sign In Manually
          </span>
        </div>

        {/* 2. Manual Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#212529] mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-[#212529]">Password *</label>
              <button
                type="button"
                onClick={() => setForgotModal(true)}
                className="text-[11px] font-semibold text-[#C4A35A] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
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

          <div>
            <label className="block font-bold text-[#212529] mb-1">Select Account Type / Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full p-2.5 border border-neutral-300 font-semibold focus:outline-none focus:border-[#C4A35A] bg-[#FFF9EF]"
            >
              <option value="retail">Retail Customer Account</option>
              <option value="wholesale_approved">Approved Wholesale B2B Account</option>
              <option value="wholesale_pending">Pending Wholesale Account</option>
              <option value="admin">Administrator Panel</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 cursor-pointer text-[#6B7280]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#C4A35A]"
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#A8893D] transition-colors flex items-center justify-center space-x-2 shadow-md"
          >
            <span>Sign In Manually</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Links */}
        <div className="pt-4 border-t border-[#E8E0D0] text-center text-xs text-[#6B7280] space-y-2">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-[#C4A35A] hover:underline">
              Create Account
            </Link>
          </p>
          <p>
            Applying for corporate bulk buy?{' '}
            <Link href="/wholesale/apply" className="font-bold text-[#212529] hover:underline">
              Apply for Wholesale B2B
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF8F1] border border-[#E8E0D0] p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#E8E0D0] pb-3">
              <h4 className="font-serif font-bold text-[#212529] text-base">Reset Password</h4>
              <button
                type="button"
                onClick={() => {
                  setForgotModal(false);
                  setResetSent(false);
                }}
                className="text-neutral-400 hover:text-[#212529] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {!resetSent ? (
              <form onSubmit={handleResetSubmit} className="space-y-3 text-xs">
                <p className="text-[#6B7280]">Enter your registered email address and we will send you a password reset link.</p>
                <div>
                  <label className="block font-bold text-[#212529] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C4A35A] text-white font-bold uppercase tracking-wider hover:bg-[#A8893D] transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-xs text-center py-2">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-[#212529]">Reset Email Sent!</h5>
                <p className="text-[#6B7280]">Check <strong>{resetEmail}</strong> for instructions to reset your password.</p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotModal(false);
                    setResetSent(false);
                  }}
                  className="w-full py-2 bg-neutral-900 text-white font-bold uppercase"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
