"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../features/cart/cart.store";

export default function CartPage() {
  const itemsMap = useCartStore((s) => s.items);
  const items = useMemo(() => Object.values(itemsMap), [itemsMap]);

  const remove = useCartStore((s) => s.remove);
  const setQty = useCartStore((s) => s.setQty);
  const subtotal = useCartStore((s) => s.subtotal());
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <div className="text-sm opacity-70">{totalItems} items</div>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border p-6">
          <div className="font-medium">Your cart is empty</div>
          <Link href="/" className="mt-2 inline-block underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.productId} className="flex gap-4 rounded-2xl border p-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-gray-50">
                  <Image src={i.image} alt={i.title} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <div className="font-medium">{i.title}</div>
                  <div className="text-sm opacity-70">
                    {i.price} {i.currency}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      className="rounded-lg border px-3 py-1"
                      onClick={() => setQty(i.productId, i.qty - 1)}
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{i.qty}</span>
                    <button
                      className="rounded-lg border px-3 py-1"
                      onClick={() => setQty(i.productId, i.qty + 1)}
                    >
                      +
                    </button>

                    <button
                      className="ml-4 text-sm underline"
                      onClick={() => remove(i.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right font-medium">
                  {(i.price * i.qty).toFixed(2)} {i.currency}
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <span className="opacity-70">Subtotal</span>
              <span className="font-medium">{subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-4 block rounded-xl border px-4 py-2 text-center hover:bg-gray-50"
            >
              Go to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
