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

  return (
    <div className="min-h-screen bg-[#faf8f3] flex flex-col items-center justify-center px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1a2e]">
          Рандомайзер
        </h1>
        <p className="mt-2 text-[#8a8a9a] text-sm font-medium">
          Пусть удача решит за вас
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-10">
        {(["count", "labels", "spin", "result"] as Step[]).map((s, i) => {
          const steps = ["count", "labels", "spin", "result"];
          const currentIdx = steps.indexOf(step);
          const isActive = i <= currentIdx;
          const isCurrent = s === step;
          return (
            <div key={s} className="flex items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: isActive ? "#e85d4e" : "#e0e0e0",
                  scale: isCurrent ? 1.2 : 1,
                }}
                className="w-3 h-3 rounded-full"
              />
              {i < 3 && (
                <div
                  className={`w-8 h-0.5 rounded-full transition-colors duration-500 ${
                    i < currentIdx ? "bg-[#e85d4e]" : "bg-[#e0e0e0]"
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
