"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../../types/index";

type CartItem = {
  productId: string;
  title: string;
  price: number;
  currency: string;
  image: string; // thumbnail
  qty: number;
};

type CartState = {
  items: Record<string, CartItem>; // key = productId
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;

  totalItems: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      add: (product, qty = 1) => {
        set((state) => {
          const existing = state.items[product.id];
          const nextQty = (existing?.qty ?? 0) + qty;

          return {
            items: {
              ...state.items,
              [product.id]: {
                productId: product.id,
                title: product.title,
                price: product.price,
                currency: product.currency,
                image: product.images[0] ?? "/mock/placeholder.jpg",
                qty: nextQty,
              },
            },
          };
        });
      },

      remove: (productId) =>
        set((state) => {
          const copy = { ...state.items };
          delete copy[productId];
          return { items: copy };
        }),

      setQty: (productId, qty) =>
        set((state) => {
          const item = state.items[productId];
          if (!item) return state;

          if (qty <= 0) {
            const copy = { ...state.items };
            delete copy[productId];
            return { items: copy };
          }

          return {
            items: {
              ...state.items,
              [productId]: { ...item, qty },
            },
          };
        }),

      clear: () => set({ items: {} }),

      totalItems: () => Object.values(get().items).reduce((sum, i) => sum + i.qty, 0),
      subtotal: () => Object.values(get().items).reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: "mock-marketplace-cart-v1",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
    
  )
);