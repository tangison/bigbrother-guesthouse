"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

// Scroll reveal. Family prop picks the device: rise | wipe | slide | scale.
// scroll-craft rule: neighbouring sections never share a device family.
export function Reveal({
  children,
  family = "rise",
  index = 0,
  className = "",
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  family?: "rise" | "wipe" | "slide" | "scale";
  index?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure" | "h2" | "p";
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base =
    family === "wipe" ? "rv-wipe" : family === "slide" ? "rv-slide" : family === "scale" ? "rv-scale" : "rv";

  return (
    <Tag
      ref={ref as any}
      className={`${base} stagger ${className}`}
      style={{ "--i": index, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
