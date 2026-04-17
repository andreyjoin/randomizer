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
        <h2 className="text-2xl font-body font-bold tracking-wide text-[#e2e8f0]">
          {count} ВАРИАНТОВ
        </h2>
        <p className="text-[#475569] text-xs tracking-wider uppercase">
          Оставьте цифры или переименуйте
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setUseCustom(false)}
          className={`px-5 py-2 rounded-lg text-sm font-body font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
            !useCustom
              ? "bg-[#ff2a6d] text-[#050508] border-[#ff2a6d] shadow-[0_0_15px_rgba(255,42,109,0.3)]"
              : "bg-[#0e0e16] text-[#475569] border-[#1e1e2e] hover:border-[#ff2a6d]/30"
          }`}
        >
          Цифры
        </button>
        <button
          onClick={() => setUseCustom(true)}
          className={`px-5 py-2 rounded-lg text-sm font-body font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
            useCustom
              ? "bg-[#05d9e8] text-[#050508] border-[#05d9e8] shadow-[0_0_15px_rgba(5,217,232,0.3)]"
              : "bg-[#0e0e16] text-[#475569] border-[#1e1e2e] hover:border-[#05d9e8]/30"
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
              <span className="w-8 h-8 rounded-lg bg-[#ff2a6d]/10 border border-[#ff2a6d]/20 text-[#ff2a6d] text-sm font-mono font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <input
                type="text"
                value={label}
                onChange={(e) => updateLabel(i, e.target.value)}
                className="flex-1 h-11 px-4 rounded-xl border border-[#1e1e2e] bg-[#0e0e16] text-[#e2e8f0] text-sm font-body outline-none focus:border-[#05d9e8] focus:shadow-[0_0_15px_rgba(5,217,232,0.15)] transition-all"
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
          className="flex-1 h-12 rounded-xl border border-[#1e1e2e] text-[#475569] font-body font-semibold tracking-wider hover:border-[#ff2a6d]/30 hover:text-[#e2e8f0] transition-all cursor-pointer uppercase"
        >
          Назад
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleConfirm}
          className="flex-[2] h-12 rounded-xl bg-[#ff2a6d] text-[#050508] font-body font-bold tracking-wider shadow-[0_0_20px_rgba(255,42,109,0.3)] hover:shadow-[0_0_40px_rgba(255,42,109,0.5)] transition-all cursor-pointer uppercase"
        >
          Далее →
        </motion.button>
      </div>
    </motion.div>
  );
}
