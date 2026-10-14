import type { Metadata } from "next";
import { FeedbackForm } from "@/components/site/feedback-form";
import { GUESTHOUSE, RESTAURANT } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Feedback: Compliments & Complaints | Big Brother, Usakos",
  description:
    "Praise, ideas and complaints go straight to the owner of Big Brother Guesthouse and Big Brothers Restaurant, Usakos, by WhatsApp or email.",
};

export default function FeedbackPage() {
  return (
    <>
      <section className="bg-cream" aria-label="Guest feedback">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">Guest voice</p>
          <h1 className="hero-rise mt-3 max-w-[20ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            Compliment us, contribute an idea, or complain.
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg leading-relaxed text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            Everything lands with the owner. Complaints get a personal reply, usually the same day. Restaurant
            feedback goes to the restaurant phone, the rest to the guesthouse. You can stay anonymous.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-20 md:px-6 md:pb-28" aria-label="Feedback form">
        <FeedbackForm />
        <p className="mt-6 text-sm text-mut">
          Rather talk? Guesthouse: {GUESTHOUSE.phoneStayDisplay}. Restaurant: {RESTAURANT.phoneEatDisplay}.
        </p>
      </section>
    </>
  );
}
