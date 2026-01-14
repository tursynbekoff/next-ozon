export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: string; // "USD" | "KZT" etc
  images: string[]; // at least 1
  score: number; // average rating from 0 to 5
  reviewsCount: number; // total number of reviews
};

export type Slide = {
  id: string;
  src: string;
  alt: string;
  link: string;
}