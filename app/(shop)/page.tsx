import { products } from "../data/products";
import { ProductsGrid } from "../components/product/ProductsGrid";
import { Header } from "../components/layout/Header";

export default function HomePage() {
  return (
    <div className="max-w-[1416px] mx-auto">
      <Header />
      <main className=" mt-4">
        <section className="bg-white p-6 rounded-4xl">
          <h1 className="text-2xl font-semibold">Рекомендуем</h1>
          <div className="mt-6">
            <ProductsGrid products={products} />
          </div>
        </section>
      </main>
    </div>
  );
}