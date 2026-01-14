"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "../../features/cart/cart.store";

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const hasHydrated = useCartStore((s) => s.hasHydrated);

  return (
    <header className="sticky top-0 z-50 ">
      <div className="mx-auto flex rounded-b-4xl bg-white  items-center gap-4 p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-logo-ozon-blue-png.webp" alt="Logo" width={140} height={32} />
        </Link>

        <div className="flex-1">
          <input
            className="w-full rounded-xl border-2 border-primary px-3 py-2"
            placeholder="Искать на Ozon"
          />
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/favorites">Favorite</Link>

          <Link href="/cart" className="relative">
            Cart
            {hasHydrated && totalItems > 0 && (
              <span className="absolute -right-3 -top-2 rounded-full border bg-white px-2 text-xs">
                {totalItems}
              </span>
            )}
          </Link>

          <Link href="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}