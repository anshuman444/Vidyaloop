import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, DIMENSIONS } from '../data/questions';
import { ChevronLeft, Brain, Sparkles } from 'lucide-react';

const AssessmentEngine = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showDimensionIntro, setShowDimensionIntro] = useState(true);

  const currentQuestion = QUESTIONS[currentIndex];
  
  // Calculate progress
  const progress = ((currentIndex) / QUESTIONS.length) * 100;
  
  // Group questions by dimension for intros
  const isNewDimension = currentIndex === 0 || 
    (currentIndex > 0 && QUESTIONS[currentIndex].dimension !== QUESTIONS[currentIndex - 1].dimension);

  useEffect(() => {
    if (isNewDimension) {
      setShowDimensionIntro(true);
      const timer = setTimeout(() => setShowDimensionIntro(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isNewDimension]);

  const handleSelect = (value) => {
    const newResponses = [...responses, { questionId: currentQuestion.id, value }];
    setResponses(newResponses);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newResponses);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setResponses(responses.slice(0, -1));
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 text-white overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="p-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Dimension</span>
            <span className="text-sm font-medium text-primary-light">{currentQuestion.dimension}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Progress</span>
          <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary-light"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showDimensionIntro ? (
          <motion.div 
            key={`intro-${currentQuestion.dimension}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="bg-primary-light/10 p-6 rounded-3xl mb-8">
              <Brain className="w-16 h-16 text-primary-light" />
            </div>
            <h2 className="text-4xl font-bold mb-4">{currentQuestion.dimension}</h2>
            <p className="text-slate-400 max-w-md">Analyzing your behaviors and tendencies in this core intelligence dimension.</p>
          </motion.div>
        ) : (
          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto w-full"
          >
            <div className="mb-8 md:mb-16">
              <Sparkles className="w-8 h-8 text-primary-light/30 mb-4 mx-auto" />
              <h2 className="text-2xl md:text-5xl font-medium leading-tight text-center px-4">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleSelect(val)}
                  className="group relative h-24 md:h-32 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary-light transition-all duration-300 flex flex-col items-center justify-center gap-2 overflow-hidden"
                >
                  <span className="text-2xl font-bold text-slate-300 group-hover:text-primary-light">{val}</span>
                  <span className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold group-hover:text-slate-300">
                    {val === 1 && "Strongly Disagree"}
                    {val === 2 && "Disagree"}
                    {val === 3 && "Neutral"}
                    {val === 4 && "Agree"}
                    {val === 5 && "Strongly Agree"}
                  </span>
                  
                  {/* Selection Glow */}
                  <div className="absolute inset-0 bg-primary-light/0 group-hover:bg-primary-light/5 transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-12 text-center text-slate-600 text-xs uppercase tracking-[0.2em]">
        Question {currentIndex + 1} of {QUESTIONS.length}
      </div>
    </div>
  );
};

export default AssessmentEngine;
