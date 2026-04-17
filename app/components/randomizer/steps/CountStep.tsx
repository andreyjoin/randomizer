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
      className="flex flex-col items-center gap-10 w-full max-w-lg"
    >
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-tight text-[#1a1a2e]">
          Сколько вариантов?
        </h2>
        <p className="text-[#6b6b7b] text-base">
          Выберите количество или введите своё
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {PRESETS.map((n) => (
          <motion.button
            key={n}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onSelect(n)}
            className="w-20 h-20 rounded-full bg-white border-2 border-[#e85d4e]/20 text-[#e85d4e] text-2xl font-bold shadow-sm hover:shadow-lg hover:border-[#e85d4e] transition-all duration-300 cursor-pointer flex items-center justify-center"
          >
            {n}
          </motion.button>
        ))}
      </div>

      <div className="w-full max-w-xs space-y-3">
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
            placeholder="Введите своё количество"
            className={`w-full h-14 px-5 rounded-2xl border-2 bg-white text-[#1a1a2e] placeholder:text-[#a0a0b0] text-center text-lg outline-none transition-all duration-300 ${
              error
                ? "border-red-400 animate-pulse"
                : "border-[#e85d4e]/20 focus:border-[#e85d4e] focus:shadow-md"
            }`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCustom}
          disabled={!custom}
          className="w-full h-12 rounded-xl bg-[#e85d4e] text-white font-semibold text-base shadow-md hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
        >
          Подтвердить
        </motion.button>
      </div>
    </motion.div>
  );
}
