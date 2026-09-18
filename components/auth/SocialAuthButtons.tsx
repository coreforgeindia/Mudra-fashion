'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRole, UserRole } from '@/context/RoleContext';
import { Phone, CheckCircle2, Loader2, Lock } from 'lucide-react';

interface SocialAuthButtonsProps {
  mode: 'login' | 'register';
  selectedRole?: UserRole;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ mode, selectedRole = 'retail' }) => {
  const router = useRouter();
  const { setRole } = useRole();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSocialAuth = (provider: string, email: string, name: string) => {
    setLoadingProvider(provider);
    setSuccessMessage(null);

    setTimeout(() => {
      // Set default details in localStorage before setting role
      const userObj = {
        name,
        email,
        phone: '+91 98765 43210',
        companyName: selectedRole.startsWith('wholesale') ? 'Mudra Partner Store' : undefined,
      };
      localStorage.setItem('mudra_user_details', JSON.stringify(userObj));
      setRole(selectedRole);

      setLoadingProvider(null);
      setSuccessMessage(`Successfully authenticated via ${provider}! Redirecting...`);

      setTimeout(() => {
        if (selectedRole === 'admin') router.push('/admin');
        else if (selectedRole.startsWith('wholesale')) router.push('/wholesale/dashboard');
        else router.push('/account');
      }, 1000);
    }, 1200);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== '1234' && otpCode.length < 4) return;
    setLoadingProvider('Phone OTP');
    setShowOtpModal(false);

    setTimeout(() => {
      const userObj = {
        name: `User ${mobileNumber.slice(-4)}`,
        email: `${mobileNumber.replace(/[^0-9]/g, '')}@mobileuser.mudra`,
        phone: mobileNumber,
      };
      localStorage.setItem('mudra_user_details', JSON.stringify(userObj));
      setRole(selectedRole);
      setLoadingProvider(null);
      setSuccessMessage('Mobile OTP verified! Redirecting...');

      setTimeout(() => {
        router.push('/account');
      }, 1000);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {successMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Social Provider Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Google */}
        <button
          type="button"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialAuth('Google', 'vikram.google@example.com', 'Vikram Sharma (Google)')}
          className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#FBF8F1] border border-neutral-300 hover:border-neutral-400 hover:bg-[#FFF9EF] text-neutral-800 text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
        >
          {loadingProvider === 'Google' ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#6B7280]" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}</span>
        </button>

        {/* Apple */}
        <button
          type="button"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialAuth('Apple ID', 'user.apple@icloud.com', 'Mudra Apple User')}
          className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-neutral-900 border border-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
        >
          {loadingProvider === 'Apple ID' ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.1c.64-.78 1.08-1.85.96-2.93-.93.04-2.07.62-2.74 1.4-.59.68-1.11 1.77-.97 2.83 1.05.08 2.11-.52 2.75-1.3" />
            </svg>
          )}
          <span>{mode === 'login' ? 'Sign in with Apple' : 'Sign up with Apple'}</span>
        </button>

        {/* Microsoft */}
        <button
          type="button"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialAuth('Microsoft', 'enterprise@outlook.com', 'Mudra Corporate User')}
          className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#FBF8F1] border border-neutral-300 hover:border-neutral-400 hover:bg-[#FFF9EF] text-neutral-800 text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
        >
          {loadingProvider === 'Microsoft' ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#6B7280]" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z" />
              <path fill="#81bc06" d="M12 1h10v10H12z" />
              <path fill="#05a6f0" d="M1 12h10v10H1z" />
              <path fill="#ffba08" d="M12 12h10v10H12z" />
            </svg>
          )}
          <span>Microsoft Account</span>
        </button>

        {/* Mobile OTP */}
        <button
          type="button"
          disabled={loadingProvider !== null}
          onClick={() => setShowOtpModal(true)}
          className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
        >
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>Mobile OTP Sign In</span>
        </button>
      </div>

      {/* Mobile OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF8F1] border border-[#E8E0D0] p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#E8E0D0] pb-3">
              <h4 className="font-serif font-bold text-[#212529] text-base flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C4A35A]" />
                <span>Mobile Number OTP Sign In</span>
              </h4>
              <button
                type="button"
                onClick={() => {
                  setShowOtpModal(false);
                  setOtpSent(false);
                }}
                className="text-neutral-400 hover:text-[#212529] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3 text-xs">
                <p className="text-[#6B7280]">Enter your 10-digit mobile number to receive a 4-digit verification code.</p>
                <div>
                  <label className="block font-bold text-[#212529] mb-1">Mobile Number</label>
                  <div className="flex space-x-2">
                    <span className="p-2.5 bg-neutral-100 border border-neutral-300 font-bold text-[#212529]">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="flex-1 p-2.5 border border-neutral-300 focus:outline-none focus:border-[#C4A35A] font-mono"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C4A35A] text-white font-bold uppercase tracking-wider hover:bg-[#A8893D] transition-colors"
                >
                  Send OTP Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3 text-xs">
                <div className="p-2.5 bg-[#F5F0E5] border border-[#E8D5A3] text-[#C4A35A] font-semibold text-[11px] rounded">
                  OTP code sent to +91 {mobileNumber}! (Use demo code: 1234)
                </div>
                <div>
                  <label className="block font-bold text-[#212529] mb-1">4-Digit Security Code</label>
                  <input
                    type="text"
                    maxLength={4}
                    required
                    placeholder="1 2 3 4"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full p-3 border border-neutral-300 text-center font-mono text-lg tracking-[0.5em] focus:outline-none focus:border-[#C4A35A]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C4A35A] text-white font-bold uppercase tracking-wider hover:bg-[#A8893D] transition-colors"
                >
                  Verify &amp; Continue
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
