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
    <div className="min-h-screen bg-[#050508] grid-bg relative flex flex-col items-center justify-center px-4 py-10">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#ff2a6d]/5 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#05d9e8]/5 blur-[120px]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 text-center relative z-10"
      >
        <h1 style={{ fontFamily: 'var(--font-display-family), sans-serif' }} className="text-4xl md:text-6xl tracking-wider text-[#e2e8f0] neon-text-pink">
          РАНДОМАЙЗЕР
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-[#05d9e8] text-sm md:text-base font-body font-medium tracking-[0.3em] uppercase neon-text-cyan"
        >
          Пусть удача решит за вас
        </motion.p>
      </motion.div>

      {/* Progress bar — neon line */}
      <div className="flex items-center gap-1 mb-10 relative z-10">
        {steps.map((s, i) => {
          const isActive = i <= currentIdx;
          const isCurrent = s === step;
          return (
            <div key={s} className="flex items-center gap-1">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive ? "#ff2a6d" : "#1e1e2e",
                  boxShadow: isActive
                    ? "0 0 10px rgba(255, 42, 109, 0.5), 0 0 20px rgba(255, 42, 109, 0.2)"
                    : "none",
                  scale: isCurrent ? 1.3 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="w-2.5 h-2.5 rounded-full"
              />
              {i < 3 && (
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: i < currentIdx ? "#ff2a6d" : "#1e1e2e",
                    boxShadow:
                      i < currentIdx
                        ? "0 0 6px rgba(255, 42, 109, 0.4)"
                        : "none",
                  }}
                  className="w-10 h-[2px]"
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
