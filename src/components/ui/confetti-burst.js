"use client";

const pieces = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 0.5}s`,
  duration: `${2.4 + Math.random() * 1.4}s`,
  x: `${-80 + Math.random() * 160}px`,
  rotation: `${180 + Math.random() * 540}deg`,
}));

export default function ConfettiBurst() {
  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            "--confetti-x": piece.x,
            "--confetti-rotate": piece.rotation,
          }}
        />
      ))}
    </div>
  );
}
