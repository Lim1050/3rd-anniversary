"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { anniversaryData } from "@/data/anniversary";

export default function PasswordModal({ isOpen, onClose, onSuccess }) {
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.trim() === anniversaryData.access.password) {
      setPassword("");
      setError("");
      onSuccess();
      return;
    }

    setError("Password masih salah. Coba lagi ya 🤍");
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="password-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Password gate"
    >
      <div className="password-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="password-modal-close"
          onClick={onClose}
          aria-label="Tutup password modal"
        >
          ×
        </button>

        <p className="eyebrow">Private Access</p>
        <h3 className="password-modal-title">{anniversaryData.access.title}</h3>
        <p className="password-modal-text">{anniversaryData.access.subtitle}</p>

        <form onSubmit={handleSubmit} className="password-form">
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            className="password-input"
            placeholder="Masukkan password"
          />

          <button type="submit" className="primary-button password-submit">
            Lanjutkan
          </button>
        </form>

        {/* <p className="password-hint">{anniversaryData.access.hint}</p> */}

        {error ? <p className="password-error">{error}</p> : null}
      </div>
    </div>,
    document.body,
  );
}
