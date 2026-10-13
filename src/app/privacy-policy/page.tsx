import type { Metadata } from "next";
import { BIZ } from "@/lib/site-data";

const title = "Privacy Policy | Big Brother Guesthouse, Usakos";
const description =
  "How Big Brother Holdings in Usakos, Namibia handles the personal details you share when you call, WhatsApp, email or visit us.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">Privacy policy</h1>
          <p className="mt-4 text-sm text-mut">Applies to bigbrotherguesthouse.com. Last updated: October 2026.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 text-[15px] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-semibold">Who we are</h2>
            <p className="mt-3">
              Big Brother Holdings runs Big Brother Guesthouse, Big Brother Bed &amp; Breakfast and Big Brothers
              Restaurant at {BIZ.address.street}, {BIZ.address.town}, {BIZ.address.region}, {BIZ.address.country}.
              You can reach us on {BIZ.guesthouse.phone1Display}, on{" "}
              <a className="underline decoration-ember/60 underline-offset-4" href={`mailto:${BIZ.guesthouse.email}`}>
                {BIZ.guesthouse.email}
              </a>
              , or by post at {BIZ.guesthouse.postal}. We are the controller of the personal details described below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">What we collect and why</h2>
            <p className="mt-3">
              This website is a brochure site. It does not have a booking engine, a contact form, or user accounts,
              so we do not collect any details through the site itself. When you contact us the way most guests do,
              by phone, WhatsApp, or email, we receive your name, your contact details, and the information you
              choose to share, such as dates, group size, or dietary needs. We use that information for one purpose:
              to answer you, to manage your booking or order, and to prepare for your visit or function.
            </p>
            <p className="mt-3">
              We keep booking conversations for as long as needed to serve you and to meet Namibian record-keeping
              expectations for hospitality and food businesses, after which old correspondence is deleted. We do not
              sell, rent, or trade your details, and we do not send marketing messages unless you ask us to.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Third parties on this site</h2>
            <p className="mt-3">
              The contact page embeds a Google Maps frame so you can find our gate. When that map loads, Google
              receives your IP address and browser details under its own privacy policy, which you can read on
              google.com/policies. The WhatsApp buttons open a chat with our numbers through WhatsApp, governed by
              WhatsApp&#39;s own terms. We chose these embeds because they are what travellers already use; no other
              trackers, analytics scripts, or advertising pixels run on this site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Photographs</h2>
            <p className="mt-3">
              The gallery shows our rooms, our food, and our functions. We only publish photos taken at our own
              premises. If a photo clearly shows you and you would like it removed, send us the details on
              WhatsApp or email and we will take it down.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Your choices</h2>
            <p className="mt-3">
              You can ask us at any time what details we hold about you, ask us to correct them, or ask us to delete
              old correspondence that we no longer need. A message to{" "}
              <a className="underline decoration-ember/60 underline-offset-4" href={`mailto:${BIZ.guesthouse.email}`}>
                {BIZ.guesthouse.email}
              </a>{" "}
              or a WhatsApp to {BIZ.guesthouse.phone1Display} is enough, and we respond within a reasonable period.
              If you are ever unhappy with how we handled your details, tell us first so we can fix it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Changes to this policy</h2>
            <p className="mt-3">
              If we add online bookings, payments, or newsletters in future, we will update this page before that
              happens and note the date of the change at the top. The version you are reading reflects how the site
              works today: a simple brochure with phone, WhatsApp, and email contact.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
