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
        <h2 className="text-2xl md:text-3xl font-body font-bold tracking-wide text-[#e2e8f0]">
          СКОЛЬКО ВАРИАНТОВ?
        </h2>
        <p className="text-[#475569] text-sm tracking-wider uppercase">
          Выберите количество или введите своё
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {PRESETS.map((n) => (
          <motion.button
            key={n}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(n)}
            className="w-20 h-20 rounded-full bg-[#0e0e16] border border-[#ff2a6d]/30 text-[#ff2a6d] text-3xl font-mono font-bold neon-box-pink hover:border-[#ff2a6d] hover:shadow-[0_0_30px_rgba(255,42,109,0.3)] transition-all duration-300 cursor-pointer flex items-center justify-center"
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
            placeholder="ВВЕДИТЕ СВОЁ"
            className={`w-full h-14 px-5 rounded-xl border bg-[#0e0e16] text-[#e2e8f0] placeholder:text-[#475569] text-center text-lg font-body tracking-wider outline-none transition-all duration-300 ${
              error
                ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse"
                : "border-[#05d9e8]/20 focus:border-[#05d9e8] focus:shadow-[0_0_20px_rgba(5,217,232,0.2)]"
            }`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCustom}
          disabled={!custom}
          className="w-full h-12 rounded-xl bg-[#ff2a6d] text-[#050508] font-body font-bold text-base tracking-wider shadow-[0_0_20px_rgba(255,42,109,0.3)] hover:shadow-[0_0_40px_rgba(255,42,109,0.5)] disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 cursor-pointer uppercase"
        >
          Подтвердить
        </motion.button>
      </div>
    </motion.div>
  );
}
