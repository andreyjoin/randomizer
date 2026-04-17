"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CountStep from "./components/randomizer/steps/CountStep";
import LabelsStep from "./components/randomizer/steps/LabelsStep";
import SpinStep from "./components/randomizer/steps/SpinStep";
import ResultStep from "./components/randomizer/steps/ResultStep";

type Step = "count" | "labels" | "spin" | "result";

export default function Home() {
  const [step, setStep] = useState<Step>("count");
  const [count, setCount] = useState(2);
  const [labels, setLabels] = useState<string[]>([]);
  const [winner, setWinner] = useState("");
  const [spinKey, setSpinKey] = useState(0);

  const handleCountSelect = (n: number) => {
    setCount(n);
    setLabels(Array.from({ length: n }, (_, i) => `Вариант ${i + 1}`));
    setStep("labels");
  };

  const handleLabelsConfirm = (newLabels: string[]) => {
    setLabels(newLabels);
    setStep("spin");
  };

  const handleSpinResult = (w: string) => {
    setWinner(w);
    setStep("result");
  };

  const handleSpinAgain = () => {
    setSpinKey((k) => k + 1);
    setStep("spin");
  };

  const handleRestart = () => {
    setCount(2);
    setLabels([]);
    setWinner("");
    setSpinKey(0);
    setStep("count");
  };

  const steps = ["count", "labels", "spin", "result"] as Step[];
  const currentIdx = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-[#0a1628] relative flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#1e3a5f]/20 blur-[100px]" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#d4af37]/5 blur-[120px]" />

      {/* Floating confetti particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed"
          style={{
            left: `${10 + (i * 7) % 80}%`,
            top: `${10 + (i * 13) % 70}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <div
            className={`w-2 h-2 rounded-sm ${
              i % 3 === 0
                ? "bg-[#d4af37]"
                : i % 3 === 1
                ? "bg-[#c41e3a]"
                : "bg-[#f0d878]"
            }`}
          />
        </motion.div>
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center relative z-10"
      >
        <h1
          style={{ fontFamily: "var(--font-display), serif" }}
          className="text-4xl md:text-6xl tracking-wide gold-text"
        >
          Рандомайзер
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-[#a0aec0] text-base font-body font-medium tracking-[0.2em] uppercase"
        >
          Пусть удача решит за вас
        </motion.p>
      </motion.div>

      {/* Progress dots with gold line */}
      <div className="flex items-center gap-1 mb-10 relative z-10">
        {steps.map((s, i) => {
          const isActive = i <= currentIdx;
          const isCurrent = s === step;
          return (
            <div key={s} className="flex items-center gap-1">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.3 : 1,
                }}
                className={`w-3 h-3 rounded-full ${
                  isActive
                    ? "bg-gradient-to-br from-[#f0d878] to-[#b8860b] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    : "bg-[#1a2d4a]"
                }`}
              />
              {i < 3 && (
                <div
                  className={`w-10 h-[2px] ${
                    i < currentIdx
                      ? "bg-gradient-to-r from-[#d4af37] to-[#b8860b]"
                      : "bg-[#1a2d4a]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === "count" && (
          <CountStep key="count" onSelect={handleCountSelect} />
        )}
        {step === "labels" && (
          <LabelsStep
            key="labels"
            count={count}
            onConfirm={handleLabelsConfirm}
            onBack={() => setStep("count")}
          />
        )}
        {step === "spin" && (
          <SpinStep
            key={`spin-${spinKey}`}
            labels={labels}
            onResult={handleSpinResult}
          />
        )}
        {step === "result" && (
          <ResultStep
            key="result"
            winner={winner}
            onSpinAgain={handleSpinAgain}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
