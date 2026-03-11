"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { anniversaryData } from "@/data/anniversary";
import ConfettiBurst from "@/components/ui/confetti-burst";
import Reveal from "@/components/ui/reveal";
import Image from "next/image";

function shuffleArray(array) {
  const cloned = [...array];

  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }

  return cloned;
}

export default function HeartGameSection() {
  const game = anniversaryData.miniGame;
  const rewardTimeoutRef = useRef(null);

  const hearts = useMemo(
    () => Array.from({ length: game.heartsCount }, (_, index) => index),
    [game.heartsCount],
  );

  const [selectedHearts, setSelectedHearts] = useState([]);
  const [wrongMessage, setWrongMessage] = useState("");
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [winningHeart, setWinningHeart] = useState(null);
  const [wrongMessageMap, setWrongMessageMap] = useState({});
  const [gameWon, setGameWon] = useState(false);

  const createNewRound = useCallback(() => {
    if (rewardTimeoutRef.current) {
      clearTimeout(rewardTimeoutRef.current);
      rewardTimeoutRef.current = null;
    }

    const newWinningHeart = Math.floor(Math.random() * game.heartsCount);
    const shuffledWrongMessages = shuffleArray(game.wrongMessages);

    const nextWrongMessageMap = {};
    let wrongMessageIndex = 0;

    for (let i = 0; i < game.heartsCount; i += 1) {
      if (i === newWinningHeart) continue;
      nextWrongMessageMap[i] =
        shuffledWrongMessages[wrongMessageIndex] ||
        "Belum yang ini, coba hati lainnya ya 🤍";
      wrongMessageIndex += 1;
    }

    setWinningHeart(newWinningHeart);
    setWrongMessageMap(nextWrongMessageMap);
    setSelectedHearts([]);
    setWrongMessage("");
    setIsRewardOpen(false);
    setGameWon(false);
  }, [game.heartsCount, game.wrongMessages]);

  useEffect(() => {
    createNewRound();

    return () => {
      if (rewardTimeoutRef.current) {
        clearTimeout(rewardTimeoutRef.current);
      }
    };
  }, [createNewRound]);

  const handlePick = (index) => {
    if (winningHeart === null) return;
    if (selectedHearts.includes(index)) return;
    if (gameWon || isRewardOpen) return;

    if (index === winningHeart) {
      setSelectedHearts((prev) => [...prev, index]);
      setWrongMessage("You found the lucky heart!");
      setGameWon(true);

      rewardTimeoutRef.current = setTimeout(() => {
        setIsRewardOpen(true);
      }, 900);

      return;
    }

    setSelectedHearts((prev) => [...prev, index]);
    setWrongMessage(wrongMessageMap[index] || "Coba hati yang lain ya 🤍");
  };

  const resetGame = () => {
    createNewRound();
  };

  return (
    <>
      <section id="mini-game" className="section soft-section">
        <div className="container narrow centered-text">
          <Reveal>
            <p className="eyebrow">Mini Game</p>
            <h2>{game.title}</h2>
            <p className="game-subtitle">{game.subtitle}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="heart-grid">
              {hearts.map((heartIndex) => {
                const isTried = selectedHearts.includes(heartIndex);
                const isWinner = gameWon && heartIndex === winningHeart;
                const isFaded = gameWon && heartIndex !== winningHeart;

                return (
                  <button
                    key={heartIndex}
                    type="button"
                    className={[
                      "heart-button",
                      isTried ? "tried" : "",
                      isWinner ? "winner" : "",
                      isFaded ? "faded" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handlePick(heartIndex)}
                    aria-label={`Pilih hati ${heartIndex + 1}`}
                    disabled={winningHeart === null || gameWon}
                  >
                    <span className="heart-shape">♥</span>
                    <span className="heart-number">{heartIndex + 1}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {wrongMessage && (
            <Reveal delay={0.05}>
              <p className={`game-feedback ${gameWon ? "success" : "error"}`}>
                {wrongMessage}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <button
              type="button"
              className="secondary-button"
              onClick={resetGame}
            >
              Reset Game
            </button>
          </Reveal>
        </div>
      </section>

      {isRewardOpen &&
        createPortal(
          <div
            className="reward-modal-overlay"
            onClick={() => setIsRewardOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Date invitation reward"
          >
            <div
              className="reward-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <ConfettiBurst />

              <button
                type="button"
                className="final-modal-close"
                onClick={() => setIsRewardOpen(false)}
                aria-label="Tutup reward"
              >
                ×
              </button>

              <p className="eyebrow">Reward Unlocked</p>
              <h3 className="reward-title">{game.invitation.title}</h3>
              <p className="reward-text">{game.invitation.intro}</p>
              <p className="reward-text">{game.invitation.message}</p>

              <div className="invitation-card premium-invitation-card">
                <div className="invitation-card-header">
                  <div className="invitation-top">
                    <div
                      className="invitation-photo-frame"
                      style={{ position: "relative" }}
                    >
                      <Image
                        src={game.invitation.photo.src}
                        alt={game.invitation.photo.alt}
                        fill
                        className="invitation-photo"
                        sizes="96px"
                      />
                    </div>

                    <div className="invitation-top-text">
                      <p className="invitation-badge">
                        {game.invitation.badge}
                      </p>
                      <h4 className="invitation-heading">
                        {game.invitation.heading}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="invitation-message-box">
                  <p>{game.invitation.message}</p>
                </div>

                <div className="invitation-details">
                  <div className="invitation-row">
                    <div className="invitation-label-wrap">
                      <span className="invitation-icon">📅</span>
                      <span>{game.invitation.dateLabel}</span>
                    </div>
                    <strong>{game.invitation.dateValue}</strong>
                  </div>

                  <div className="invitation-row">
                    <div className="invitation-label-wrap">
                      <span className="invitation-icon">🕓</span>
                      <span>{game.invitation.timeLabel}</span>
                    </div>
                    <strong>{game.invitation.timeValue}</strong>
                  </div>

                  <div className="invitation-row">
                    <div className="invitation-label-wrap">
                      <span className="invitation-icon">📍</span>
                      <span>{game.invitation.placeLabel}</span>
                    </div>
                    <strong>{game.invitation.placeValue}</strong>
                  </div>
                </div>

                <div className="invitation-hint-box">
                  <p className="invitation-hint-label">
                    {game.invitation.hintLabel}
                  </p>
                  <p className="invitation-hint-value">
                    {game.invitation.hintValue}
                  </p>
                </div>

                <div className="invitation-footer">
                  <span className="invitation-footer-line" />
                  <p>{game.invitation.footerNote}</p>
                  <span className="invitation-footer-line" />
                </div>
              </div>

              <p className="reward-text">{game.invitation.closing}</p>

              <div className="reward-actions">
                <button
                  type="button"
                  className="primary-button final-button"
                  onClick={() => setIsRewardOpen(false)}
                >
                  {game.invitation.buttonText}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
