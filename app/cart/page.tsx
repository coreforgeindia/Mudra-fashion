'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    tax,
    shipping,
    total,
    totalItemsCount,
  } = useCart();

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-4 mb-8 border-b border-[#E8E0D0]">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">Your Selection</span>
          <h1 className="font-serif text-3xl font-bold text-[#212529] mt-1">Shopping Bag ({totalItemsCount} Items)</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-[#FFF9EF] border border-[#E8E0D0] space-y-4">
            <ShoppingBag className="w-12 h-12 text-[#C4A35A] mx-auto" />
            <h3 className="font-serif font-bold text-xl text-neutral-800">Your shopping bag is empty</h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              Explore our formal collection, uniforms, and fabrics to add items to your cart.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider"
            >
              Explore Shop Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Table */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="p-4 border border-[#E8E0D0] bg-[#FBF8F1] flex flex-col sm:flex-row gap-4">
                  <div className="relative w-24 h-32 bg-neutral-100 flex-shrink-0 border border-[#E8E0D0]">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif font-bold text-base text-[#212529]">{item.product.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-neutral-400 hover:text-[#C4A35A]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#6B7280] mt-1">
                        Size: <strong className="text-neutral-800">{item.size}</strong> | Color: <strong className="text-neutral-800">{item.color}</strong>
                      </p>
                      {item.isWholesale && (
                        <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase mt-1">
                          B2B Bulk Rate
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-neutral-100 text-neutral-800 font-bold"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-neutral-100 text-neutral-800 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif font-bold text-lg text-[#212529]">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] h-fit space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#212529] pb-3 border-b border-[#E8E0D0]">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#212529]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>GST Tax (5%)</span>
                  <span className="font-bold text-[#212529]">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Freight Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700 uppercase">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-[#212529] pt-3 border-t border-[#E8E0D0]">
                  <span>Grand Total</span>
                  <span className="text-[#C4A35A]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-[#A8893D] transition-colors shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
