"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { Nav, VIEWS, type ViewKey } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { B2Odometer } from "@/components/site/odometer";
import { HomeView } from "@/components/site/home-view";
import { RestaurantView } from "@/components/site/restaurant-view";
import { MenuView } from "@/components/site/menu-view";
import { GuesthouseView } from "@/components/site/guesthouse-view";
import { FacilitiesView } from "@/components/site/facilities-view";
import { GalleryView } from "@/components/site/gallery-view";
import { ContactView } from "@/components/site/contact-view";

const KEYS = VIEWS.map((v) => v.key);

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

function getSnapshot(): ViewKey {
  const h = window.location.hash.replace("#", "") as ViewKey;
  return KEYS.includes(h) ? h : "home";
}

function getServerSnapshot(): ViewKey {
  return "home";
}

export default function Page() {
  const view = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [view]);

  const go = useCallback((v: ViewKey) => {
    if (v === getSnapshot()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = v;
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav view={view} go={go} />
      <main key={view} className="pop-in flex-1">
        {view === "home" && <HomeView go={go} />}
        {view === "restaurant" && <RestaurantView go={go} />}
        {view === "menu" && <MenuView />}
        {view === "guesthouse" && <GuesthouseView go={go} />}
        {view === "facilities" && <FacilitiesView />}
        {view === "gallery" && <GalleryView />}
        {view === "contact" && <ContactView />}
      </main>
      <Footer go={go} />
      <B2Odometer />
    </div>
  );
}
