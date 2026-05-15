import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, ShieldCheck, PieChart, BrainCircuit } from 'lucide-react';

const MESSAGES = [
  { icon: <Loader2 className="animate-spin" />, text: "Normalizing response vectors..." },
  { icon: <ShieldCheck />, text: "Verifying response consistency..." },
  { icon: <BrainCircuit />, text: "Mapping behavioral patterns..." },
  { icon: <PieChart />, text: "Synthesizing personality archetype..." },
  { icon: <CheckCircle2 />, text: "Finalizing developmental roadmap..." }
];

const ProcessingScreen = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev < MESSAGES.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-white overflow-hidden">
      <div className="relative mb-12">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 border-4 border-primary-light/10 rounded-full border-t-primary-light"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-primary-light/20 p-4 rounded-full"
          >
            <div className="bg-primary-light p-3 rounded-full shadow-lg shadow-primary-light/50">
              <BrainCircuit className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-xs w-full text-center h-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="text-primary-light w-6 h-6">
              {MESSAGES[index].icon}
            </div>
            <p className="text-slate-300 font-medium tracking-wide">
              {MESSAGES[index].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary-light"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
        />
      </div>
      <p className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest">
        Local Intelligence Engine Processing
      </p>
    </div>
  );
};

export default ProcessingScreen;
