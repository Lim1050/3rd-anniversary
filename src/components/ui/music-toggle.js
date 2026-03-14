"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { anniversaryData } from "@/data/anniversary";

const MusicToggle = forwardRef(function MusicToggle(_, ref) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => setIsReady(true);
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    };

    audio.volume = 0.35;
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    async play() {
      const audio = audioRef.current;
      if (!audio) return false;

      try {
        await audio.play();
        setIsPlaying(true);
        return true;
      } catch (error) {
        console.error("Gagal memutar audio:", error);
        setIsPlaying(false);
        return false;
      }
    },
    pause() {
      const audio = audioRef.current;
      if (!audio) return;

      audio.pause();
      setIsPlaying(false);
    },
  }));

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Gagal memutar audio:", error);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src={anniversaryData.music.src} type="audio/mpeg" />
        Browser kamu tidak mendukung audio.
      </audio>

      <button
        type="button"
        onClick={toggleMusic}
        className="music-toggle"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={
          isPlaying
            ? `Pause: ${anniversaryData.music.title}`
            : `Play: ${anniversaryData.music.title}`
        }
      >
        <span className="music-toggle-icon">{isPlaying ? "❚❚" : "▶"}</span>
        <span className="music-toggle-text">
          {isPlaying ? "Pause Music" : "Play Music"}
        </span>
      </button>

      {!isReady && <div className="music-status">Loading audio...</div>}
    </>
  );
});

export default MusicToggle;
