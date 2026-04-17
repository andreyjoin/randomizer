"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CountStepProps {
  onSelect: (count: number) => void;
}

const PRESETS = [2, 3, 4, 5];

export default function CountStep({ onSelect }: CountStepProps) {
  const [custom, setCustom] = useState("");
  const [error, setError] = useState(false);

  const handleCustom = () => {
    const n = parseInt(custom, 10);
    if (n >= 2 && n <= 100) {
      onSelect(n);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-10 w-full max-w-lg relative z-10"
    >
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-body font-bold tracking-wide text-[#faf8f3]">
          Сколько вариантов?
        </h2>
        <p className="text-[#475569] text-sm tracking-wider uppercase">
          Выберите количество или введите своё
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {PRESETS.map((n) => (
          <motion.button
            key={n}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(n)}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a2d4a] to-[#111d32] gold-border text-[#f0d878] text-3xl font-body font-bold shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.25)] transition-all duration-300 cursor-pointer flex items-center justify-center"
          >
            {n}
          </motion.button>
        ))}
      </div>

      <div className="w-full max-w-xs space-y-4">
        <div className="relative">
          <input
            type="number"
            min={2}
            max={100}
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleCustom()}
            placeholder="Введите своё"
            className={`w-full h-14 px-5 rounded-xl bg-gradient-to-br from-[#1a2d4a] to-[#111d32] text-[#faf8f3] placeholder:text-[#475569] text-center text-lg font-body tracking-wider outline-none transition-all duration-300 border ${
              error
                ? "border-[#c41e3a] shadow-[0_0_20px_rgba(196,30,58,0.3)] animate-pulse"
                : "border-[#d4af37]/20 focus:border-[#d4af37]/60 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            }`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCustom}
          disabled={!custom}
          className="w-full h-13 py-3 rounded-xl gold-button text-[#0a1628] font-body font-bold text-base tracking-wider disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 cursor-pointer uppercase"
        >
          Подтвердить
        </motion.button>
      </div>
    </motion.div>
  );
}
