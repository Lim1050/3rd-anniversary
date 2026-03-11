"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GalleryLightbox({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const isOpen = activeIndex !== null;

  const openLightbox = (index) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const showPrev = () => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? items.length - 1 : prev - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return prev === items.length - 1 ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, items.length]);

  return (
    <>
      <div className="grid gallery-grid">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            className="gallery-card gallery-button"
            onClick={() => openLightbox(index)}
            aria-label={`Buka foto ${index + 1}`}
          >
            <div
              className="gallery-image-frame"
              style={{ position: "relative" }}
            >
              <Image
                src={item.image}
                alt={item.alt || `Kenangan ${index + 1}`}
                fill
                loading="lazy"
                className="gallery-photo"
                sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
              />
            </div>
            <p>{item.caption}</p>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Tutup lightbox"
            >
              ×
            </button>

            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={showPrev}
              aria-label="Foto sebelumnya"
            >
              ‹
            </button>

            <div className="lightbox-content">
              <div
                className="lightbox-image-frame"
                style={{ position: "relative" }}
              >
                <Image
                  src={items[activeIndex].image}
                  alt={items[activeIndex].alt || `Kenangan ${activeIndex + 1}`}
                  fill
                  loading="eager"
                  className="lightbox-image"
                  sizes="100vw"
                />
              </div>

              <div className="lightbox-caption-wrap">
                <p className="lightbox-counter">
                  {activeIndex + 1} / {items.length}
                </p>
                <p className="lightbox-caption">{items[activeIndex].caption}</p>
              </div>
            </div>

            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={showNext}
              aria-label="Foto berikutnya"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
