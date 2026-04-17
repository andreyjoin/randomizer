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

export default function SpinStep({ labels, onResult }: SpinStepProps) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

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
        setTimeout(() => onResult(labels[winIdx]), 700);
      }
    };
    setTimeout(tick, 400);
  }, [isSpinning, labels, onResult]);

  useEffect(() => {
    const t = setTimeout(startSpin, 500);
    return () => clearTimeout(t);
  }, [startSpin]);

  const prevIndex = (currentIndex - 1 + labels.length) % labels.length;
  const nextIndex = (currentIndex + 1) % labels.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-10 w-full max-w-sm relative z-10"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-body font-bold tracking-wide text-[#e2e8f0]">
          УДАЧА РЕШАЕТ
        </h2>
        <p className="text-[#475569] text-xs tracking-wider uppercase">
          {isSpinning ? "Крутим..." : started ? "Готово!" : "Приготовьтесь"}
        </p>
      </div>

      {/* Slot machine window */}
      <div className="relative w-full">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#050508] to-transparent z-10 pointer-events-none rounded-t-2xl" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050508] to-transparent z-10 pointer-events-none rounded-b-2xl" />

        <div className="h-80 bg-[#0e0e16] rounded-2xl border border-[#ff2a6d]/20 shadow-[0_0_40px_rgba(255,42,109,0.08),inset_0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center justify-center relative">
          {/* Center highlight line */}
          <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 h-20 bg-[#ff2a6d]/5 rounded-xl border border-[#ff2a6d]/10 pointer-events-none" />

          {/* Scanlines inside slot */}
          <div className="absolute inset-0 pointer-events-none opacity-10 scanlines" />

          <div className="flex flex-col items-center gap-3 w-full px-6">
            {/* Prev */}
            <motion.div
              animate={{
                opacity: isSpinning ? 0.15 : 0.25,
                scale: isSpinning ? 0.8 : 0.85,
                y: isSpinning ? -6 : 0,
                filter: isSpinning ? "blur(3px)" : "blur(1px)",
              }}
              className="text-lg font-body font-medium text-[#475569] truncate w-full text-center"
            >
              {labels[prevIndex]}
            </motion.div>

            {/* Current */}
            <motion.div
              key={currentIndex + (isSpinning ? "-spin" : "-stop")}
              animate={{
                scale: isSpinning ? [1, 1.1, 1] : 1.2,
                y: isSpinning ? [0, -3, 0] : 0,
                filter: isSpinning ? "blur(0px)" : "blur(0px)",
              }}
              transition={
                isSpinning
                  ? { duration: 0.12 }
                  : { type: "spring", stiffness: 200, damping: 15 }
              }
              className={`text-3xl md:text-4xl font-mono font-bold truncate w-full text-center tracking-wide ${
                winnerIndex === currentIndex && !isSpinning
                  ? "text-[#ff2a6d] neon-text-pink"
                  : "text-[#e2e8f0]"
              }`}
            >
              {labels[currentIndex]}
            </motion.div>

            {/* Next */}
            <motion.div
              animate={{
                opacity: isSpinning ? 0.15 : 0.25,
                scale: isSpinning ? 0.8 : 0.85,
                y: isSpinning ? 6 : 0,
                filter: isSpinning ? "blur(3px)" : "blur(1px)",
              }}
              className="text-lg font-body font-medium text-[#475569] truncate w-full text-center"
            >
              {labels[nextIndex]}
            </motion.div>
          </div>
        </div>

        {/* Decorative side bolts */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1e1e2e] border border-[#ff2a6d]/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#ff2a6d]/40" />
        </div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1e1e2e] border border-[#ff2a6d]/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#ff2a6d]/40" />
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 flex-wrap justify-center max-w-xs">
        {labels.slice(0, Math.min(labels.length, 12)).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: currentIndex === i ? 1.5 : 1,
              backgroundColor: currentIndex === i ? "#ff2a6d" : "#1e1e2e",
              boxShadow:
                currentIndex === i
                  ? "0 0 10px rgba(255, 42, 109, 0.6)"
                  : "none",
            }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
