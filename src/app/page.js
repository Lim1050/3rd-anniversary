"use client";

import { useRef, useState } from "react";

import Navbar from "@/components/ui/navbar";
import MusicToggle from "@/components/ui/music-toggle";
import PasswordModal from "@/components/ui/password-modal";
import Reveal from "@/components/ui/reveal";

import OpeningScreen from "@/components/sections/opening-screen";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import LetterSection from "@/components/sections/letter-section";
import TimelineSection from "@/components/sections/timeline-section";
import GallerySection from "@/components/sections/gallery-section";
import ReasonsSection from "@/components/sections/reasons-section";
import FutureSection from "@/components/sections/future-section";
import HeartGameSection from "@/components/sections/heart-game-section";
import ClosingSection from "@/components/sections/closing-section";

export default function HomePage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const musicRef = useRef(null);

  const scrollToHero = () => {
    requestAnimationFrame(() => {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleOpenPassword = () => {
    if (isUnlocked) {
      scrollToHero();
      return;
    }

    setShowPasswordModal(true);
  };

  const handleUnlockSuccess = async () => {
    setIsUnlocked(true);
    setShowPasswordModal(false);

    requestAnimationFrame(async () => {
      await musicRef.current?.play();
      scrollToHero();
    });
  };

  return (
    <main>
      {isUnlocked ? (
        <>
          <Navbar />
          <MusicToggle ref={musicRef} />
        </>
      ) : null}

      <OpeningScreen
        onOpenPassword={handleOpenPassword}
        isUnlocked={isUnlocked}
      />

      {isUnlocked ? (
        <>
          <Reveal>
            <HeroSection />
          </Reveal>

          <Reveal>
            <AboutSection />
          </Reveal>

          <Reveal>
            <LetterSection />
          </Reveal>

          <Reveal>
            <TimelineSection />
          </Reveal>

          <Reveal>
            <GallerySection />
          </Reveal>

          <Reveal>
            <ReasonsSection />
          </Reveal>

          <Reveal>
            <FutureSection />
          </Reveal>

          <HeartGameSection />

          <Reveal>
            <ClosingSection />
          </Reveal>
        </>
      ) : null}

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handleUnlockSuccess}
      />
    </main>
  );
}
