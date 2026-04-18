"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface SpinStepProps {
  labels: string[];
  onResult: (winner: string) => void;
}

function generateSequence(labels: string[], winnerIndex: number): number[] {
  const len = labels.length;
  const totalSpins = 50 + Math.floor(Math.random() * 15);
  const seq: number[] = [];
  for (let i = 0; i < totalSpins; i++) {
    if (i === totalSpins - 1) {
      seq.push(winnerIndex);
    } else {
      let next = Math.floor(Math.random() * len);
      while (seq.length > 0 && next === seq[seq.length - 1]) {
        next = Math.floor(Math.random() * len);
      }
      seq.push(next);
    }
  }
  return seq;
}

function delayForIndex(index: number, total: number): number {
  const progress = index / total;
  if (progress < 0.12) {
    return 200 - progress * 800;
  } else if (progress < 0.65) {
    return 80 - (progress - 0.12) * 30;
  } else {
    const slowdown = (progress - 0.65) / 0.35;
    return 65 + slowdown * slowdown * 420;
  }
}

// 3D reel: each item positioned on a virtual cylinder
const REEL_ITEMS = [
  { offset: -3, rotX: 40, y: -118, scale: 0.6, opacity: 0.4, z: -100 },
  { offset: -2, rotX: 26, y: -80, scale: 0.78, opacity: 0.65, z: -55 },
  { offset: -1, rotX: 12, y: -40, scale: 0.95, opacity: 0.9, z: -20 },
  { offset: 0, rotX: 0, y: 0, scale: 1.25, opacity: 1, z: 20 },
  { offset: 1, rotX: -12, y: 40, scale: 0.95, opacity: 0.9, z: -20 },
  { offset: 2, rotX: -26, y: 80, scale: 0.78, opacity: 0.65, z: -55 },
  { offset: 3, rotX: -40, y: 118, scale: 0.6, opacity: 0.4, z: -100 },
];

function wrapIndex(idx: number, total: number) {
  return ((idx % total) + total) % total;
}

export default function SpinStep({ labels, onResult }: SpinStepProps) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);

  const startSpin = useCallback(() => {
    if (isSpinning) return;
    const winIdx = Math.floor(Math.random() * labels.length);
    const seq = generateSequence(labels, winIdx);
    setStarted(true);
    setIsSpinning(true);
    setWinnerIndex(null);

    let i = 0;
    const tick = () => {
      setCurrentIndex(seq[i]);
      i++;
      if (i < seq.length) {
        setTimeout(tick, delayForIndex(i, seq.length));
      } else {
        setIsSpinning(false);
        setWinnerIndex(winIdx);
        setFlash(true);
        setTimeout(() => setFlash(false), 400);
        setTimeout(() => onResult(labels[winIdx]), 900);
      }
    };
    setTimeout(tick, 500);
  }, [isSpinning, labels, onResult]);

  useEffect(() => {
    const t = setTimeout(startSpin, 600);
    return () => clearTimeout(t);
  }, [startSpin]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-10 w-full max-w-md relative z-10"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-body font-bold tracking-wide text-[#faf8f3]">
          Удача решает
        </h2>
        <p className="text-[#475569] text-xs tracking-wider uppercase">
          {isSpinning ? "Крутим..." : started ? "Готово!" : "Приготовьтесь"}
        </p>
      </div>

      {/* Slot machine */}
      <div className="relative w-full" style={{ perspective: "550px" }}>
        {/* Soft top/bottom fades */}
        <div className="absolute -top-1 left-0 right-0 h-12 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/40 to-transparent z-30 pointer-events-none" />
        <div className="absolute -bottom-1 left-0 right-0 h-12 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent z-30 pointer-events-none" />

        {/* Frame */}
        <div
          className="h-[420px] rounded-2xl slot-frame relative overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Metallic shine */}
          <div className="absolute inset-0 metallic pointer-events-none z-20" />

          {/* Center highlight */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[72px] bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent border-y border-[#d4af37]/25 pointer-events-none z-10" />

          {/* Flash on win */}
          {flash && (
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#d4af37]/20 z-40 pointer-events-none"
            />
          )}

          {/* Reel */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {REEL_ITEMS.map((item, idx) => {
              const labelIdx = wrapIndex(currentIndex + item.offset, labels.length);
              const isCenter = item.offset === 0;
              const isWinner = winnerIndex === labelIdx && !isSpinning && isCenter;

              return (
                <motion.div
                  key={`${idx}-${labelIdx}-${isSpinning ? "spin" : "stop"}`}
                  initial={false}
                  animate={{
                    y: item.y,
                    scale: item.scale,
                    rotateX: item.rotX,
                    opacity: item.opacity,
                    z: item.z,
                  }}
                  transition={
                    isCenter && !isSpinning
                      ? { type: "spring", stiffness: 280, damping: 22 }
                      : { duration: 0.08 }
                  }
                  className="absolute w-full px-6 text-center flex items-center justify-center"
                  style={{
                    transformStyle: "preserve-3d",
                    filter: `blur(${isSpinning && isCenter ? 0 : Math.max(0, Math.abs(item.offset) * 0.8 - 0.3)}px)`,
                  }}
                >
                  <span
                    className={`block truncate font-body font-bold tracking-wide ${
                      isCenter
                        ? isWinner
                          ? "gold-text text-[2.75rem] md:text-[3.25rem]"
                          : "text-[#faf8f3] text-[2.25rem] md:text-[2.75rem]"
                        : Math.abs(item.offset) === 1
                        ? "text-[#94a3b8] text-xl md:text-2xl"
                        : "text-[#475569] text-sm md:text-lg"
                    }`}
                    style={{
                      textShadow: isCenter
                        ? "0 4px 30px rgba(0,0,0,0.6)"
                        : undefined,
                    }}
                  >
                    {labels[labelIdx]}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Inner depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/30 via-transparent to-[#0a1628]/30 pointer-events-none z-10" />

          {/* Side shadows */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0a1628]/40 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0a1628]/40 to-transparent z-20 pointer-events-none" />
        </div>

        {/* Corner gems */}
        {[
          "-top-2 -left-2",
          "-top-2 -right-2",
          "-bottom-2 -left-2",
          "-bottom-2 -right-2",
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5`}>
            <div className="w-full h-full bg-gradient-to-br from-[#f0d878] to-[#b8860b] rounded-sm rotate-45 shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 flex-wrap justify-center max-w-xs">
        {labels.slice(0, Math.min(labels.length, 12)).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: currentIndex === i ? 1.5 : 1,
              backgroundColor: currentIndex === i ? "#d4af37" : "#1a2d4a",
              boxShadow:
                currentIndex === i
                  ? "0 0 12px rgba(212, 175, 55, 0.6)"
                  : "none",
            }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
