"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface SpinStepProps {
  labels: string[];
  onResult: (winner: string) => void;
}

function generateSequence(labels: string[], winnerIndex: number): number[] {
  const len = labels.length;
  const totalSpins = 45 + Math.floor(Math.random() * 15);
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
  // ease-in-out curve: start slow, speed up, slow down
  if (progress < 0.15) {
    return 180 - progress * 600;
  } else if (progress < 0.7) {
    return 90 - (progress - 0.15) * 40;
  } else {
    const slowdown = (progress - 0.7) / 0.3;
    return 68 + slowdown * slowdown * 380;
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
        setTimeout(() => onResult(labels[winIdx]), 600);
      }
    };
    setTimeout(tick, 300);
  }, [isSpinning, labels, onResult]);

  useEffect(() => {
    const t = setTimeout(startSpin, 400);
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
      className="flex flex-col items-center gap-10 w-full max-w-sm"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#1a1a2e]">Удача решает</h2>
        <p className="text-[#6b6b7b] text-sm">
          {isSpinning ? "Крутим..." : started ? "Готово!" : "Приготовьтесь"}
        </p>
      </div>

      {/* Slot machine window */}
      <div className="relative w-full">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#faf8f3] to-transparent z-10 pointer-events-none rounded-t-3xl" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#faf8f3] to-transparent z-10 pointer-events-none rounded-b-3xl" />

        <div className="h-72 bg-white rounded-3xl border-2 border-[#e0e0e0] shadow-inner overflow-hidden flex flex-col items-center justify-center relative">
          {/* Center highlight line */}
          <div className="absolute top-1/2 left-2 right-2 -translate-y-1/2 h-16 bg-[#e85d4e]/5 rounded-xl border border-[#e85d4e]/10 pointer-events-none" />

          <div className="flex flex-col items-center gap-2 w-full px-6">
            {/* Prev */}
            <motion.div
              animate={{
                opacity: isSpinning ? 0.25 : 0.35,
                scale: isSpinning ? 0.85 : 0.9,
                y: isSpinning ? -4 : 0,
              }}
              className="text-xl font-medium text-[#a0a0b0] truncate w-full text-center"
            >
              {labels[prevIndex]}
            </motion.div>

            {/* Current */}
            <motion.div
              key={currentIndex + (isSpinning ? "-spin" : "-stop")}
              animate={{
                scale: isSpinning ? [1, 1.08, 1] : 1.15,
                y: isSpinning ? [0, -2, 0] : 0,
              }}
              transition={
                isSpinning
                  ? { duration: 0.15 }
                  : { type: "spring", stiffness: 200, damping: 15 }
              }
              className={`text-3xl font-bold truncate w-full text-center ${
                winnerIndex === currentIndex && !isSpinning
                  ? "text-[#e85d4e]"
                  : "text-[#1a1a2e]"
              }`}
            >
              {labels[currentIndex]}
            </motion.div>

            {/* Next */}
            <motion.div
              animate={{
                opacity: isSpinning ? 0.25 : 0.35,
                scale: isSpinning ? 0.85 : 0.9,
                y: isSpinning ? 4 : 0,
              }}
              className="text-xl font-medium text-[#a0a0b0] truncate w-full text-center"
            >
              {labels[nextIndex]}
            </motion.div>
          </div>
        </div>

        {/* Decorative side dots */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#e0e0e0] border-4 border-[#faf8f3]" />
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#e0e0e0] border-4 border-[#faf8f3]" />
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {labels.slice(0, Math.min(labels.length, 8)).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: currentIndex === i ? 1.4 : 1,
              backgroundColor:
                currentIndex === i ? "#e85d4e" : "#e0e0e0",
            }}
            className="w-2.5 h-2.5 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
