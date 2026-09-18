'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    tax,
    shipping,
    total,
    totalItemsCount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-screen max-w-md bg-[#FBF8F1] text-[#212529] shadow-2xl flex flex-col justify-between border-l border-[#E8E0D0]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E8E0D0] flex items-center justify-between bg-[#FFF9EF]">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#C4A35A]" />
                <h3 className="font-serif text-lg font-bold text-[#212529]">
                  Shopping Bag ({totalItemsCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#6B7280] hover:text-[#212529] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 bg-[#F5F0E5] text-[#C4A35A] rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-bold text-[#212529] text-lg">Your bag is empty</h4>
                  <p className="text-xs text-[#6B7280] max-w-xs mx-auto">
                    Explore our premium men&apos;s collection, uniforms, and fabrics to add items to your cart.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block px-6 py-2.5 bg-[#2C2A25] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3D3A33] transition-colors rounded-sm"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex space-x-4 p-3 border border-[#E8E0D0] bg-[#FFF9EF] relative group rounded-sm"
                  >
                    <div className="relative w-20 h-24 bg-[#F5F0E5] flex-shrink-0 border border-[#E8E0D0] rounded-sm">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-xs font-bold text-[#212529] line-clamp-1 pr-4">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#6B7280] hover:text-[#B45309] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-[11px] text-[#6B7280] mt-0.5 space-x-2">
                          <span>Size: <strong className="text-[#212529]">{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-[#212529]">{item.color}</strong></span>
                        </div>
                        {item.isWholesale && (
                          <span className="inline-block px-1.5 py-0.5 bg-[#E8D5A3]/40 text-[#A8893D] text-[9px] font-bold uppercase tracking-wider mt-1 rounded-sm">
                            B2B Bulk Price
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#E8E0D0] text-xs font-bold rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-[#F5F0E5] text-[#212529] hover:bg-[#E8E0D0]"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-[#F5F0E5] text-[#212529] hover:bg-[#E8E0D0]"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif font-bold text-sm text-[#212529]">
                          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#E8E0D0] bg-[#FFF9EF] space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#212529]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Estimated Tax (5% GST)</span>
                    <span className="font-semibold text-[#212529]">₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <strong className="text-[#7BA48E] uppercase">FREE</strong> : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold text-[#212529] pt-2 border-t border-[#E8E0D0]">
                    <span>Grand Total</span>
                    <span className="text-[#C4A35A]">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="py-3 px-3 bg-[#2C2A25] text-white text-xs font-bold uppercase tracking-wider text-center hover:bg-[#3D3A33] transition-colors rounded-sm"
                  >
                    View Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="py-3 px-3 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-1 hover:bg-[#A8893D] transition-colors rounded-sm"
                  >
                    <span>Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="flex items-center justify-center space-x-1 text-[10px] text-[#6B7280] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7BA48E]" />
                  <span>Secure 256-Bit SSL Encrypted Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
