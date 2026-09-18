'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Heart, Star, Eye, ShoppingBag, Check, Shirt, Droplets, Maximize2, Wind } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

/**
 * Minimal circular fabric/fit feature icons.
 */
const FabricFitIcons: React.FC<{ fabric?: string }> = ({ fabric }) => {
  const fabricLower = (fabric || '').toLowerCase();

  const icons: { icon: React.ReactNode; label: string }[] = [];

  if (fabricLower.includes('cotton') || fabricLower.includes('giza')) {
    icons.push({ icon: <Droplets className="w-3 h-3" />, label: '100% Cotton' });
  }
  if (fabricLower.includes('linen')) {
    icons.push({ icon: <Wind className="w-3 h-3" />, label: 'Pure Linen' });
  }
  if (fabricLower.includes('stretch') || fabricLower.includes('lycra') || fabricLower.includes('spandex')) {
    icons.push({ icon: <Maximize2 className="w-3 h-3" />, label: 'Stretch Fit' });
  }
  if (fabricLower.includes('wool') || fabricLower.includes('blend')) {
    icons.push({ icon: <Shirt className="w-3 h-3" />, label: 'Fine Wool Blend' });
  }

  if (icons.length === 0) {
    icons.push({ icon: <Shirt className="w-3 h-3" />, label: 'Luxury Fabric' });
  }

  return (
    <div className="flex items-center space-x-1.5 mt-1.5">
      {icons.map((item, i) => (
        <span
          key={i}
          title={item.label}
          className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#F5F0E5] text-[#7BA48E] border border-[#E8E0D0] hover:border-[#C4A35A] hover:text-[#C4A35A] transition-colors cursor-default"
        >
          {item.icon}
        </span>
      ))}
      <span className="text-[9px] text-[#6B7280] uppercase tracking-wider font-medium ml-0.5">
        {icons[0]?.label}
      </span>
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      product,
      product.sizes[0] || 'M',
      product.colors[0]?.name || 'Standard',
      1,
      product.price,
      false
    );
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <>
      <div className="group relative bg-[#FFF9EF] border border-[#E8E0D0] hover:border-[#C4A35A]/50 transition-all duration-300 flex flex-col h-full overflow-hidden rounded-sm">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
          {product.isNew && (
            <span className="px-2 py-0.5 bg-[#7BA48E] text-white text-[9px] font-bold uppercase tracking-widest rounded-sm">
              NEW
            </span>
          )}
          {product.isSale && (
            <span className="px-2 py-0.5 bg-[#C4A35A] text-white text-[9px] font-bold uppercase tracking-widest rounded-sm">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-2 bg-[#FFF9EF]/90 backdrop-blur-sm rounded-full text-[#6B7280] hover:text-[#C4A35A] shadow-sm hover:scale-110 transition-all"
          title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#C4A35A] text-[#C4A35A]' : ''}`} />
        </button>

        {/* Image Container */}
        <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] w-full overflow-hidden bg-[#F5F0E5]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
            />
          )}

          {/* Hover Overlay Action Buttons */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="flex-1 py-2 px-3 bg-[#FFF9EF] text-[#212529] text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1 hover:bg-[#F5F0E5] transition-colors rounded-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
            <button
              onClick={handleAddToCart}
              className="py-2 px-3 bg-[#C4A35A] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center hover:bg-[#A8893D] transition-colors rounded-sm"
              title="Add to Cart"
            >
              {addedSuccess ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </button>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] text-[#6B7280] uppercase tracking-wider mb-1">
              <span>{product.subcategory || product.category}</span>
              <div className="flex items-center space-x-1 text-amber-500">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="text-[#212529] font-semibold">{product.rating}</span>
              </div>
            </div>

            <Link href={`/product/${product.slug}`} className="block group-hover:text-[#C4A35A] transition-colors">
              <h3 className="font-serif font-semibold text-sm text-[#212529] line-clamp-1 mb-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-[#6B7280] line-clamp-1 mb-1">{product.fabric}</p>

            {/* Fabric & Fit Icons */}
            <FabricFitIcons fabric={product.fabric} />
          </div>

          <div className="pt-2 border-t border-[#E8E0D0] flex items-center justify-between mt-2">
            <div>
              <span className="font-serif text-base font-bold text-[#212529]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#6B7280] line-through ml-2">
                ₹{Math.round(product.price * 1.25).toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="text-xs font-bold text-[#C4A35A] hover:text-[#A8893D] uppercase tracking-wider underline underline-offset-4"
            >
              {addedSuccess ? 'Added!' : '+ Cart'}
            </button>
          </div>
        </div>
      </div>

      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={product}
      />
    </>
  );
};
