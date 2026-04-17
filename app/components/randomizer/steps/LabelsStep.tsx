"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface LabelsStepProps {
  count: number;
  onConfirm: (labels: string[]) => void;
  onBack: () => void;
}

export default function LabelsStep({ count, onConfirm, onBack }: LabelsStepProps) {
  const [labels, setLabels] = useState<string[]>(
    Array.from({ length: count }, (_, i) => `Вариант ${i + 1}`)
  );
  const [useCustom, setUseCustom] = useState(false);

  const updateLabel = (index: number, value: string) => {
    const next = [...labels];
    next[index] = value;
    setLabels(next);
  };

  const handleConfirm = () => {
    onConfirm(labels.map((l) => l.trim() || "?"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center gap-8 w-full max-w-md relative z-10"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-body font-bold tracking-wide text-[#faf8f3]">
          {count} вариантов
        </h2>
        <p className="text-[#475569] text-xs tracking-wider uppercase">
          Оставьте цифры или переименуйте
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setUseCustom(false)}
          className={`px-5 py-2.5 rounded-lg text-sm font-body font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
            !useCustom
              ? "gold-button text-[#0a1628] border-transparent"
              : "bg-gradient-to-br from-[#1a2d4a] to-[#111d32] text-[#475569] border-[#d4af37]/20 hover:border-[#d4af37]/40"
          }`}
        >
          Цифры
        </button>
        <button
          onClick={() => setUseCustom(true)}
          className={`px-5 py-2.5 rounded-lg text-sm font-body font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
            useCustom
              ? "bg-gradient-to-r from-[#c41e3a] to-[#991b1b] text-white border-transparent shadow-[0_4px_15px_rgba(196,30,58,0.3)]"
              : "bg-gradient-to-br from-[#1a2d4a] to-[#111d32] text-[#475569] border-[#c41e3a]/20 hover:border-[#c41e3a]/40"
          }`}
        >
          Свои
        </button>
      </div>

      {useCustom && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="w-full space-y-3 max-h-72 overflow-y-auto pr-1"
        >
          {labels.map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#b8860b]/10 border border-[#d4af37]/30 text-[#f0d878] text-sm font-body font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <input
                type="text"
                value={label}
                onChange={(e) => updateLabel(i, e.target.value)}
                className="flex-1 h-11 px-4 rounded-xl border border-[#1a2d4a] bg-gradient-to-br from-[#1a2d4a] to-[#111d32] text-[#faf8f3] text-sm font-body outline-none focus:border-[#d4af37]/40 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all"
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex gap-3 w-full">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="flex-1 h-12 rounded-xl border border-[#1a2d4a] bg-gradient-to-br from-[#1a2d4a] to-[#111d32] text-[#a0aec0] font-body font-semibold tracking-wider hover:border-[#d4af37]/30 hover:text-[#faf8f3] transition-all cursor-pointer uppercase"
        >
          Назад
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleConfirm}
          className="flex-[2] h-12 rounded-xl gold-button text-[#0a1628] font-body font-bold tracking-wider transition-all cursor-pointer uppercase"
        >
          Далее →
        </motion.button>
      </div>
    </motion.div>
  );
}
