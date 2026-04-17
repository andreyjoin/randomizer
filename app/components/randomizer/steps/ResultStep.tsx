"use client";

import { motion } from "framer-motion";
import { RotateCcw, Play } from "lucide-react";

interface ResultStepProps {
  winner: string;
  onSpinAgain: () => void;
  onRestart: () => void;
}

export default function ResultStep({ winner, onSpinAgain, onRestart }: ResultStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex flex-col items-center gap-10 w-full max-w-sm relative z-10"
    >
      <div className="text-center space-y-2">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#d4af37] text-xs font-body font-semibold uppercase tracking-[0.4em]"
        >
          Победитель
        </motion.p>
      </div>

      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.1 }}
        className="relative"
      >
        {/* Outer glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d878] blur-3xl"
        />

        {/* Winner circle */}
        <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-[#1a2d4a] to-[#111d32] gold-border animate-winner-pulse flex items-center justify-center px-8">
          {/* Inner decorative ring */}
          <div className="absolute inset-4 rounded-full border border-[#d4af37]/20" />
          <div className="absolute inset-8 rounded-full border border-dashed border-[#d4af37]/10" />

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontFamily: "var(--font-display), serif" }}
            className="text-2xl md:text-3xl font-bold text-[#faf8f3] text-center leading-tight break-words gold-text"
          >
            {winner}
          </motion.h3>
        </div>

        {/* Floating particles - gold and red */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.cos((i * Math.PI * 2) / 10) * 130,
              y: Math.sin((i * Math.PI * 2) / 10) * 130 - 30,
            }}
            transition={{
              duration: 1.5,
              delay: 0.15 + i * 0.07,
              ease: "easeOut",
            }}
            className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full ${
              i % 3 === 0
                ? "bg-[#d4af37]"
                : i % 3 === 1
                ? "bg-[#f0d878]"
                : "bg-[#c41e3a]"
            }`}
          />
        ))}
      </motion.div>

      <div className="flex gap-3 w-full">
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSpinAgain}
          className="flex-1 h-14 rounded-xl gold-button text-[#0a1628] font-body font-bold text-base tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
        >
          <Play className="w-5 h-5" />
          Крутить
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="flex-1 h-14 rounded-xl border border-[#1a2d4a] bg-gradient-to-br from-[#1a2d4a] to-[#111d32] text-[#a0aec0] font-body font-semibold tracking-wider hover:border-[#d4af37]/30 hover:text-[#faf8f3] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
        >
          <RotateCcw className="w-5 h-5" />
          Заново
        </motion.button>
      </div>
    </motion.div>
  );
}
