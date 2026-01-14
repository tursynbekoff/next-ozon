"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Slide } from "../../types/index";


export function BannerCarousel({
  slides,
  autoPlayMs = 3500,
  height = 320,
}: {
  slides: Slide[];
  autoPlayMs?: number;
  height?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const count = slides.length;

  const safeIndex = useMemo(() => {
    if (count === 0) return 0;
    return Math.max(0, Math.min(index, count - 1));
  }, [index, count]);

  const goTo = (i: number) => {
    if (count === 0) return;
    setIndex((i + count) % count);
  };

  const next = () => goTo(safeIndex + 1);
  const prev = () => goTo(safeIndex - 1);

  useEffect(() => {
    if (count <= 1) return;

    if (paused) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }

    timerRef.current = window.setInterval(() => {
      setIndex((prevIdx) => (prevIdx + 1) % count);
    }, autoPlayMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [paused, autoPlayMs, count]);

  if (count === 0) return null;

  return (
    <section
      className="w-full rounded-4xl overflow-hidden mt-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative w-full overflow-hidden bg-gray-50"
        style={{ height }}
      >
        {/* Track */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
        >
          {slides.map((s) => (
            <div key={s.id} className="relative h-full w-full shrink-0">
              {/* Full-width banner image */}
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={safeIndex === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full  bg-transparent px-3 py-2 hover:bg-white/50"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full  bg-transparent px-3 py-2 hover:bg-white/50"
            >
              ›
            </button>
          </>
        )}

        {/* Dots */}
        {count > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full  px-3 py-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full  ${
                  i === safeIndex ? "bg-black/50" : "bg-black/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
