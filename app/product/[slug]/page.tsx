'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { SizeChartModal } from '@/components/size-guide/SizeChartModal';
import { WholesaleBulkMatrix } from '@/components/wholesale/WholesaleBulkMatrix';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRole } from '@/context/RoleContext';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Star, Heart, ShoppingBag, Ruler, CheckCircle2, ShieldCheck, Truck, RotateCcw, ArrowRight, Check } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { role } = useRole();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'reviews'>('specs');
  const [added, setAdded] = useState(false);

  const isWholesaleUser = role === 'wholesale_approved';
  const unitPrice = isWholesaleUser && product.wholesalePrice ? product.wholesalePrice : product.price;
  const isFav = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity, unitPrice, isWholesaleUser);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity, unitPrice, isWholesaleUser);
    router.push('/checkout');
  };

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center space-x-2 text-xs text-[#6B7280] uppercase tracking-wider">
          <Link href="/" className="hover:text-[#212529]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#212529]">Shop</Link>
          <span>/</span>
          <Link href={`/shop/${product.category}`} className="hover:text-[#212529]">{product.category}</Link>
          <span>/</span>
          <span className="text-[#212529] font-bold truncate">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full bg-neutral-100 border border-[#E8E0D0] overflow-hidden group">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-10 p-3 bg-[#FBF8F1]/90 backdrop-blur-sm rounded-full text-[#6B7280] hover:text-[#C4A35A] shadow-md transition-all"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-[#C4A35A] text-[#C4A35A]' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 flex-shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#C4A35A] shadow-md' : 'border-[#E8E0D0] hover:border-neutral-400'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Controls */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A] block mb-1">
                {product.subcategory}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#212529] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center text-amber-500 space-x-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-sm font-bold text-[#212529]">{product.rating}</span>
                </div>
                <span className="text-xs text-neutral-400">|</span>
                <span className="text-xs text-[#6B7280] font-medium">{product.reviewsCount} Customer Reviews</span>
                <span className="text-xs text-neutral-400">|</span>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">In Stock ({product.stockCount} units)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-[#FFF9EF] border border-[#E8E0D0] flex items-center justify-between">
              <div>
                <span className="font-serif text-3xl font-bold text-[#212529]">
                  ₹{unitPrice.toLocaleString('en-IN')}
                </span>
                {isWholesaleUser ? (
                  <span className="block text-xs font-bold text-emerald-700 mt-1">
                    B2B Wholesale Price (MOQ: {product.moq || 20} pcs)
                  </span>
                ) : (
                  <span className="text-sm text-neutral-400 line-through ml-3">
                    ₹{Math.round(unitPrice * 1.25).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                Fabric: {product.fabric}
              </span>
            </div>

            <p className="text-xs text-[#6B7280] leading-relaxed">
              {product.description}
            </p>

            {/* B2B Matrix Mode vs Retail Selector */}
            {isWholesaleUser ? (
              <WholesaleBulkMatrix product={product} />
            ) : (
              <div className="space-y-6">
                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    Color: <span className="text-[#212529] font-bold">{selectedColor}</span>
                  </label>
                  <div className="flex space-x-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium border transition-all ${
                          selectedColor === c.name ? 'border-neutral-900 bg-[#FBF8F1] ring-2 ring-neutral-900 font-bold' : 'border-[#E8E0D0] bg-[#FFF9EF] text-[#6B7280]'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector & Guide */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                      Select Size:
                    </label>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="flex items-center space-x-1 text-xs font-bold text-[#C4A35A] hover:underline"
                    >
                      <Ruler className="w-4 h-4" />
                      <span>View Size Chart</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2.5 text-xs font-bold border transition-all ${
                          selectedSize === sz
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                            : 'border-[#E8E0D0] text-[#212529] hover:border-neutral-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="flex space-x-4">
                    <div className="flex items-center border border-neutral-300">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-11 bg-neutral-100 text-neutral-800 font-bold hover:bg-neutral-200"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-xs font-bold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-11 bg-neutral-100 text-neutral-800 font-bold hover:bg-neutral-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-3 px-6 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-[#A8893D] transition-colors shadow-md"
                    >
                      {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      <span>{added ? 'Added to Cart' : 'Add to Cart'}</span>
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Instant Express Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Assurance Badges */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-[#E8E0D0] text-center text-[11px] text-[#6B7280]">
              <div className="p-2 bg-[#FFF9EF] border border-[#E8E0D0]">
                <Truck className="w-4 h-4 text-[#C4A35A] mx-auto mb-1" />
                <span>Express Shipping</span>
              </div>
              <div className="p-2 bg-[#FFF9EF] border border-[#E8E0D0]">
                <ShieldCheck className="w-4 h-4 text-[#C4A35A] mx-auto mb-1" />
                <span>GST Tax Invoice</span>
              </div>
              <div className="p-2 bg-[#FFF9EF] border border-[#E8E0D0]">
                <RotateCcw className="w-4 h-4 text-[#C4A35A] mx-auto mb-1" />
                <span>15-Day Replacements</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Details Tabs */}
        <div className="mb-16 border border-[#E8E0D0] bg-[#FBF8F1]">
          <div className="flex border-b border-[#E8E0D0] bg-[#FFF9EF]">
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-6 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'specs' ? 'bg-[#FBF8F1] border-t-2 border-[#C4A35A] text-[#212529]' : 'text-[#6B7280] hover:text-[#212529]'
              }`}
            >
              Product Specifications
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`py-4 px-6 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'care' ? 'bg-[#FBF8F1] border-t-2 border-[#C4A35A] text-[#212529]' : 'text-[#6B7280] hover:text-[#212529]'
              }`}
            >
              Care Instructions
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-6 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'reviews' ? 'bg-[#FBF8F1] border-t-2 border-[#C4A35A] text-[#212529]' : 'text-[#6B7280] hover:text-[#212529]'
              }`}
            >
              Customer Reviews ({product.reviewsCount})
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-[#6B7280]">Fabric Type</span>
                    <span className="font-bold text-[#212529]">{product.fabric}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-[#6B7280]">Material Composition</span>
                    <span className="font-bold text-[#212529]">{product.material}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-[#6B7280]">Fit Cut</span>
                    <span className="font-bold text-[#212529]">{product.fit}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-[#6B7280]">Pattern</span>
                    <span className="font-bold text-[#212529]">{product.pattern}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {product.sleeveType && (
                    <div className="flex justify-between py-2 border-b border-neutral-100">
                      <span className="text-[#6B7280]">Sleeve Type</span>
                      <span className="font-bold text-[#212529]">{product.sleeveType}</span>
                    </div>
                  )}
                  {product.collarType && (
                    <div className="flex justify-between py-2 border-b border-neutral-100">
                      <span className="text-[#6B7280]">Collar Type</span>
                      <span className="font-bold text-[#212529]">{product.collarType}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-neutral-100">
                    <span className="text-[#6B7280]">Product Category</span>
                    <span className="font-bold text-[#212529]">{product.category}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <ul className="space-y-2 text-xs text-[#212529]">
                {product.careInstructions.map((ins, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A35A]" />
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-4 bg-[#FFF9EF] border border-[#E8E0D0] flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-serif font-bold text-[#212529]">{product.rating} / 5.0</span>
                    <span className="block text-xs text-[#6B7280]">Based on {product.reviewsCount} verified purchases</span>
                  </div>
                  <button className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider">
                    Write a Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="font-serif font-bold text-2xl text-[#212529] mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      <SizeChartModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        chartType={product.sizeChartType}
      />
    </div>
  );
}
