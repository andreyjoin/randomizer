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
      className="flex flex-col items-center gap-10 w-full max-w-sm"
    >
      <div className="text-center space-y-2">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#6b6b7b] text-sm font-medium uppercase tracking-widest"
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
        {/* Glow ring */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#e85d4e] blur-2xl"
        />
        <div className="relative w-64 h-64 rounded-full bg-white border-4 border-[#e85d4e]/20 shadow-2xl flex items-center justify-center px-8">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-[#1a1a2e] text-center leading-tight break-words"
          >
            {winner}
          </motion.h3>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.cos((i * Math.PI) / 3) * 100,
              y: Math.sin((i * Math.PI) / 3) * 100 - 20,
            }}
            transition={{
              duration: 1.5,
              delay: 0.3 + i * 0.08,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-[#e85d4e]"
          />
        ))}
      </motion.div>

      <div className="flex gap-3 w-full">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSpinAgain}
          className="flex-1 h-14 rounded-xl bg-[#e85d4e] text-white font-semibold text-base shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-5 h-5" />
          Крутить ещё
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="flex-1 h-14 rounded-xl border-2 border-[#e0e0e0] text-[#6b6b7b] font-medium hover:border-[#e85d4e]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          Заново
        </motion.button>
      </div>
    </motion.div>
  );
}
