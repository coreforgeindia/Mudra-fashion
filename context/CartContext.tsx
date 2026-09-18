'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  id: string; // unique item key
  product: Product;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  isWholesale?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity: number, customUnitPrice?: number, isWholesale?: boolean) => void;
  addBulkToCart: (product: Product, color: string, sizeQuantities: Record<string, number>, unitPrice: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mudra_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('mudra_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (product: Product, size: string, color: string, quantity: number, customUnitPrice?: number, isWholesale = false) => {
    const unitPrice = customUnitPrice || product.price;
    const itemKey = `${product.id}-${size}-${color}-${isWholesale ? 'ws' : 'rt'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          size,
          color,
          quantity,
          unitPrice,
          isWholesale,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const addBulkToCart = (product: Product, color: string, sizeQuantities: Record<string, number>, unitPrice: number) => {
    const newItems: CartItem[] = [];

    Object.entries(sizeQuantities).forEach(([size, qty]) => {
      if (qty > 0) {
        const itemKey = `${product.id}-${size}-${color}-ws`;
        newItems.push({
          id: itemKey,
          product,
          size,
          color,
          quantity: qty,
          unitPrice,
          isWholesale: true,
        });
      }
    });

    if (newItems.length > 0) {
      setCart((prev) => {
        let updated = [...prev];
        newItems.forEach((newItem) => {
          const index = updated.findIndex((i) => i.id === newItem.id);
          if (index > -1) {
            updated[index] = {
              ...updated[index],
              quantity: updated[index].quantity + newItem.quantity,
            };
          } else {
            updated.push(newItem);
          }
        });
        return updated;
      });
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 150;
  const total = subtotal + tax + shipping;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addBulkToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        tax,
        shipping,
        total,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
