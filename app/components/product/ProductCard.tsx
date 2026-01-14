"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../types/index";
import { useCartStore } from "../../features/cart/cart.store";

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const imgSrc = product.images?.[0] ?? "/images/placeholder.jpg";

  return (
    <div className="rounded-2xl ">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative w-full overflow-hidden rounded-xl bg-gray-50">
          <Image
            src={imgSrc}
            alt={product.title}
            width={450}
            height={600}
            className="h-auto w-full"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        <div className="mt-3 p-3">
          <div className="truncate font-medium">{product.title}</div>
          <div className="text-sm opacity-70">
            {product.price} {product.currency}
          </div>
        </div>
      </Link>

      <button
        className="mt-3 w-full rounded-xl border px-3 py-2 "
        type="button"
        onClick={() => add(product, 1)}
      >
        Add to cart
      </button>
    </div>
  );
}