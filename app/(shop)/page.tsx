import { products } from "../data/products";
import { slides } from "../data/banner";
import { ProductsGrid } from "../components/product/ProductsGrid";
import { Header } from "../components/layout/Header";
import { BannerCarousel } from "../components/banner/BannerCarousel";

export default function HomePage() {
  return (
    <div className="max-w-[1416px] mx-auto">
      <Header />
      <BannerCarousel slides={slides} />
      <main className=" mt-4">
        <section className="bg-white p-6 rounded-4xl">
          <h1 className="text-3xl font-bold">Рекомендуем</h1>
          <div className="mt-6">
            <ProductsGrid products={products} />
          </div>
        </section>
      </main>
    </div>
  );
}