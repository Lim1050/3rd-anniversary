"use client";

import { anniversaryData } from "@/data/anniversary";
import Reveal from "@/components/ui/reveal";

export default function OpeningScreen({ onOpenPassword, isUnlocked }) {
  return (
    <section id="opening" className="section hero-section">
      <div className="overlay" />

      <Reveal className="container hero-content" y={36}>
        <p className="eyebrow">{anniversaryData.siteTitle}</p>

        <h1>
          {anniversaryData.introHeadline}, {anniversaryData.partnerName} 🤍
        </h1>

        <p className="lead">{anniversaryData.introSubheadline}</p>

        <button
          type="button"
          onClick={onOpenPassword}
          className="primary-button opening-trigger"
        >
          {isUnlocked ? "Lanjut ke Cerita Kita" : "Buka Cerita Kita"}
        </button>

        <p className="small-note">{anniversaryData.openingNote}</p>
      </Reveal>
    </section>
  );
}
