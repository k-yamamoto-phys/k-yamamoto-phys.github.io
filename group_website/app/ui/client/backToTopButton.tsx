"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaArrowUp } from "react-icons/fa";

const SHOW_AFTER_PX = 320;

export default function BackToTopButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const isJapanese = pathname.startsWith("/ja");
  const label = isJapanese ? "ページ上部へ戻る" : "Back to top";

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > SHOW_AFTER_PX);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-base-100/95 text-primary shadow-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-6 sm:bottom-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
}
