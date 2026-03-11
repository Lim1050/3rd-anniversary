"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { anniversaryData } from "@/data/anniversary";
import ConfettiBurst from "@/components/ui/confetti-burst";

export default function FinalSurpriseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const modalContent =
    isOpen && mounted
      ? createPortal(
          <div
            className="final-modal-overlay"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Final surprise message"
          >
            <div
              className="final-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <ConfettiBurst />

              <button
                type="button"
                className="final-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup surprise"
              >
                ×
              </button>

              <p className="eyebrow">A Little Surprise</p>

              <h3 className="final-modal-title">
                For {anniversaryData.partnerName}, with all my love 🤍
              </h3>

              <p className="final-modal-text">{anniversaryData.finalMessage}</p>

              <p className="final-modal-text">
                Terima kasih untuk semua tawa, cerita, dan perjalanan yang sudah
                kita lewati sampai hari ini. Semoga setelah ini, masih ada lebih
                banyak hari indah yang bisa kita rayakan bersama.
              </p>

              <p className="final-modal-sign">
                Love,
                <br />
                {anniversaryData.yourName}
              </p>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        className="primary-button final-button"
        onClick={() => setIsOpen(true)}
      >
        One Last Message
      </button>

      {modalContent}
    </>
  );
}
