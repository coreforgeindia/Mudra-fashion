'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useRole } from '@/context/RoleContext';
import { Check, ShieldCheck, ArrowRight, CreditCard, Smartphone, Building, Truck, Lock, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, tax, shipping, total, clearCart } = useCart();
  const { user } = useRole();

  const [step, setStep] = useState<'address' | 'delivery' | 'payment' | 'review'>('address');
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    name: user.name || 'Vikramaditya Sharma',
    email: user.email || 'vikram@example.com',
    phone: '+91 98765 43210',
    street: '#42, Indiranagar 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      router.push('/order-confirmation');
    }, 1200);
  };

  const steps = [
    { key: 'address', label: '1. Shipping Address' },
    { key: 'delivery', label: '2. Delivery Mode' },
    { key: 'payment', label: '3. Payment Option' },
    { key: 'review', label: '4. Review & Confirm' },
  ];

  return (
    <div className="bg-[#FBF8F1] text-[#212529] min-h-screen pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-4 mb-8 border-b border-[#E8E0D0]">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A] flex items-center space-x-1">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Express Checkout</span>
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#212529] mt-1">Complete Your Order</h1>
        </div>

        {/* Step Indicator Header — Gold active state */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {steps.map((st) => (
            <div
              key={st.key}
              className={`p-3 text-xs font-bold uppercase tracking-wider text-center border transition-colors rounded-sm ${
                step === st.key
                  ? 'bg-[#C4A35A] text-white border-[#C4A35A] shadow-sm'
                  : 'bg-[#FFF9EF] text-[#6B7280] border-[#E8E0D0]'
              }`}
            >
              {st.label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Wizard Step Container */}
          <div className="lg:col-span-2 space-y-6">
            {step === 'address' && (
              <div className="bg-[#FFF9EF] border border-[#E8E0D0] p-6 space-y-4 text-xs shadow-sm rounded-sm">
                <h3 className="font-serif font-bold text-lg text-[#212529] pb-2 border-b border-[#E8E0D0]">
                  Shipping &amp; Delivery Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      className="w-full p-2.5 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full p-2.5 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-[#212529] mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="w-full p-2.5 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">City *</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full p-2.5 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">State &amp; Pincode *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full p-2.5 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                      />
                      <input
                        type="text"
                        value={shippingAddress.pincode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                        className="w-full p-2.5 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('delivery')}
                  className="w-full py-3.5 bg-[#C4A35A] text-white font-bold uppercase tracking-wider hover:bg-[#A8893D] transition-colors shadow-md rounded-sm"
                >
                  Continue to Delivery Mode →
                </button>
              </div>
            )}

            {step === 'delivery' && (
              <div className="bg-[#FFF9EF] border border-[#E8E0D0] p-6 space-y-4 text-xs shadow-sm rounded-sm">
                <h3 className="font-serif font-bold text-lg text-[#212529] pb-2 border-b border-[#E8E0D0]">
                  Select Delivery Mode
                </h3>
                <div className="space-y-3">
                  <div className="p-4 border-2 border-[#C4A35A] bg-[#F5F0E5] flex justify-between items-center rounded-sm">
                    <div>
                      <span className="font-bold text-[#212529] block text-sm">Express Freight Dispatch</span>
                      <span className="text-[#6B7280]">2 - 4 Business Days Insured Delivery across India</span>
                    </div>
                    <span className="font-bold text-[#7BA48E] uppercase text-xs">FREE / INCLUDED</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep('address')}
                    className="w-1/3 py-3 border border-[#E8E0D0] text-[#212529] font-bold uppercase hover:bg-[#F5F0E5] rounded-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('payment')}
                    className="w-2/3 py-3.5 bg-[#C4A35A] text-white font-bold uppercase tracking-wider hover:bg-[#A8893D] shadow-md rounded-sm"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-[#FFF9EF] border border-[#E8E0D0] p-6 space-y-5 text-xs shadow-sm rounded-sm">
                <h3 className="font-serif font-bold text-lg text-[#212529] pb-2 border-b border-[#E8E0D0]">
                  Select Payment Option
                </h3>

                <div className="space-y-2.5">
                  {[
                    { key: 'upi', label: 'UPI / QR Code (GPay, PhonePe, Paytm, BHIM)', icon: <Smartphone className="w-4 h-4 text-[#C4A35A]" /> },
                    { key: 'card', label: 'Credit / Debit Card (Visa, Mastercard, RuPay)', icon: <CreditCard className="w-4 h-4 text-[#8BB8D0]" /> },
                    { key: 'netbanking', label: 'Net Banking (HDFC, SBI, ICICI, Axis)', icon: <Building className="w-4 h-4 text-[#7BA48E]" /> },
                    { key: 'cod', label: 'Cash on Delivery (COD)', icon: <Truck className="w-4 h-4 text-[#6B7280]" /> },
                  ].map((pm) => (
                    <button
                      key={pm.key}
                      onClick={() => setPaymentMethod(pm.key as any)}
                      className={`w-full text-left flex items-center justify-between p-3.5 border transition-colors rounded-sm ${
                        paymentMethod === pm.key
                          ? 'border-[#C4A35A] bg-[#F5F0E5] font-bold text-[#212529] shadow-sm'
                          : 'border-[#E8E0D0] bg-[#FFF9EF] text-[#6B7280] hover:border-[#E8D5A3]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {pm.icon}
                        <span>{pm.label}</span>
                      </div>
                      {paymentMethod === pm.key && <Check className="w-4 h-4 text-[#C4A35A]" />}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep('delivery')}
                    className="w-1/3 py-3 border border-[#E8E0D0] text-[#212529] font-bold uppercase hover:bg-[#F5F0E5] rounded-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('review')}
                    className="w-2/3 py-3.5 bg-[#C4A35A] text-white font-bold uppercase tracking-wider hover:bg-[#A8893D] shadow-md rounded-sm"
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="bg-[#FFF9EF] border border-[#E8E0D0] p-6 space-y-5 text-xs shadow-sm rounded-sm">
                <h3 className="font-serif font-bold text-lg text-[#212529] pb-2 border-b border-[#E8E0D0]">
                  Review &amp; Place Order
                </h3>
                <div className="p-4 bg-[#FBF8F1] border border-[#E8E0D0] space-y-2 rounded-sm">
                  <p><strong>Deliver To:</strong> {shippingAddress.name}, {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                  <p><strong>Contact Phone:</strong> {shippingAddress.phone}</p>
                  <p><strong>Payment Option:</strong> <span className="uppercase font-bold text-[#C4A35A]">{paymentMethod}</span></p>
                </div>

                <button
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-[#C4A35A] text-white font-bold uppercase tracking-[0.2em] hover:bg-[#A8893D] shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 rounded-sm"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order (₹{total.toLocaleString('en-IN')})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Order Summary Column */}
          <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] h-fit space-y-4 text-xs shadow-sm rounded-sm">
            <h3 className="font-serif font-bold text-base text-[#212529] pb-2 border-b border-[#E8E0D0]">
              Bag Items ({cart.length})
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between border-b border-[#E8E0D0] pb-2">
                  <div>
                    <span className="font-bold text-[#212529] block truncate max-w-[180px]">{item.product.name}</span>
                    <span className="text-[10px] text-[#6B7280]">{item.size} / {item.color} x {item.quantity}</span>
                  </div>
                  <span className="font-bold text-[#212529]">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E8E0D0] space-y-1.5">
              <div className="flex justify-between text-[#6B7280]">
                <span>Subtotal</span>
                <span className="font-bold text-[#212529]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>GST Tax (5%)</span>
                <span className="font-bold text-[#212529]">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-serif font-bold text-base text-[#212529] pt-2 border-t border-[#E8E0D0]">
                <span>Grand Total</span>
                <span className="text-[#C4A35A]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
