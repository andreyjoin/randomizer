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
      className="flex flex-col items-center gap-8 w-full max-w-md"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-[#1a1a2e]">
          {count} вариантов
        </h2>
        <p className="text-[#6b6b7b] text-sm">
          Оставьте цифры или переименуйте
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setUseCustom(false)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            !useCustom
              ? "bg-[#e85d4e] text-white shadow"
              : "bg-white text-[#6b6b7b] border border-[#e0e0e0] hover:border-[#e85d4e]/30"
          }`}
        >
          Цифры
        </button>
        <button
          onClick={() => setUseCustom(true)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            useCustom
              ? "bg-[#e85d4e] text-white shadow"
              : "bg-white text-[#6b6b7b] border border-[#e0e0e0] hover:border-[#e85d4e]/30"
          }`}
        >
          Свои названия
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
              <span className="w-8 h-8 rounded-full bg-[#e85d4e]/10 text-[#e85d4e] text-sm font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <input
                type="text"
                value={label}
                onChange={(e) => updateLabel(i, e.target.value)}
                className="flex-1 h-11 px-4 rounded-xl border-2 border-[#e0e0e0] bg-white text-[#1a1a2e] text-sm outline-none focus:border-[#e85d4e] transition-all"
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
          className="flex-1 h-12 rounded-xl border-2 border-[#e0e0e0] text-[#6b6b7b] font-medium hover:border-[#e85d4e]/30 transition-all cursor-pointer"
        >
          Назад
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleConfirm}
          className="flex-[2] h-12 rounded-xl bg-[#e85d4e] text-white font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer"
        >
          Далее →
        </motion.button>
      </div>
    </motion.div>
  );
}
