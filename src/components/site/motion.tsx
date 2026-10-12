"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

/* Motion devices for the redesign. Rules:
 * - One orchestrated entrance per page (hero, CSS .hero-rise).
 * - At most one scroll device per section.
 * - Everything collapses to opacity-only under prefers-reduced-motion.
 * - Animate transform and opacity only. */

/* Scroll-scrubbed word reveal: words start dim and ink in as the band
 * crosses the viewport. The taste-skill "scrubbing text reveal". */
export function ScrubText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrubWord
          key={`${w}-${i}`}
          word={w}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          reduced={reduced ?? false}
        />
      ))}
    </p>
  );
}

function ScrubWord({
  word,
  progress,
  range,
  reduced,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, reduced ? [1, 1] : [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/* Parallax photograph: the image drifts slower than the page inside a
 * clipped frame. transform-only, reduced-motion collapses it. */
export function ParallaxPhoto({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  quality = 60,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <div ref={ref} className={`photo-frame relative ${className}`}>
      <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={src}
          alt={alt}
          sizes={sizes}
          {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}

/* Stacking card: each card pins under the previous one and the card in
 * hand scales down a touch as the next covers it. Facilities page device. */
export function StackCard({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 1 - Math.min(0.06, 0.02 * (total - index))]
  );

  return (
    <div ref={ref} className="relative md:sticky" style={{ top: `${88 + index * 14}px` }}>
      <motion.div style={{ scale, transformOrigin: "top center" }}>{children}</motion.div>
    </div>
  );
}

/* Quiet fade for below-fold media: opacity only, once, no transform.
 * Used sparingly (gallery plates) so the page still settles. */
export function QuietFade({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: reduced ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: reduced ? 0.15 : 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
