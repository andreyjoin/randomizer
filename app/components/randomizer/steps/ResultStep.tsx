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
          className="text-[#05d9e8] text-xs font-body font-semibold uppercase tracking-[0.4em] neon-text-cyan"
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
        {/* Outer glow ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#ff2a6d] blur-3xl"
        />
        {/* Secondary cyan glow */}
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#05d9e8] blur-3xl"
        />

        <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full bg-[#0e0e16] border-2 border-[#ff2a6d]/30 shadow-[0_0_60px_rgba(255,42,109,0.15),inset_0_0_60px_rgba(0,0,0,0.5)] flex items-center justify-center px-8">
          {/* Inner ring */}
          <div className="absolute inset-3 rounded-full border border-[#ff2a6d]/10" />

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-mono font-bold text-[#e2e8f0] text-center leading-tight break-words neon-text-pink"
          >
            {winner}
          </motion.h3>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              x: Math.cos((i * Math.PI) / 4) * 110,
              y: Math.sin((i * Math.PI) / 4) * 110 - 25,
            }}
            transition={{
              duration: 1.2,
              delay: 0.2 + i * 0.06,
              ease: "easeOut",
            }}
            className={`absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full ${
              i % 2 === 0 ? "bg-[#ff2a6d]" : "bg-[#05d9e8]"
            }`}
          />
        ))}
      </motion.div>

      <div className="flex gap-3 w-full">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSpinAgain}
          className="flex-1 h-14 rounded-xl bg-[#ff2a6d] text-[#050508] font-body font-bold text-base tracking-wider shadow-[0_0_25px_rgba(255,42,109,0.3)] hover:shadow-[0_0_50px_rgba(255,42,109,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
        >
          <Play className="w-5 h-5" />
          Крутить
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="flex-1 h-14 rounded-xl border border-[#1e1e2e] text-[#475569] font-body font-semibold tracking-wider hover:border-[#05d9e8]/30 hover:text-[#05d9e8] hover:shadow-[0_0_20px_rgba(5,217,232,0.1)] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
        >
          <RotateCcw className="w-5 h-5" />
          Заново
        </motion.button>
      </div>
    </motion.div>
  );
}
