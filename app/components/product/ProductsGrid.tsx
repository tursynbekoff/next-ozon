"use client";

import type { Product } from "../../types/index";
import { ProductCard } from "./ProductCard";

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}