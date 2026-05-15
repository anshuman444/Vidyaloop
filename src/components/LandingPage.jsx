import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Shield, Zap, Target } from 'lucide-react';

const LandingPage = ({ onStart, onSample }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden px-4 py-20">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-light/10 rounded-full blur-[120px] animate-pulse-slow delay-500" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center z-10 flex-1 flex flex-col items-center justify-center"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="flex flex-col items-center leading-none">
            <span className="text-6xl md:text-8xl font-black text-primary tracking-tighter">Vidya</span>
            <span className="text-6xl md:text-8xl font-black text-slate-400 tracking-tighter mt-[-10px]">Loop</span>
          </div>
          <p className="mt-4 text-slate-500 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
            Building <span className="text-primary">INDIA's</span> future, <br className="md:hidden" /> One student at a time.
          </p>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 mt-12">
          Understand Your <span className="text-primary">Intelligence.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          VidyaLoop uses advanced behavioral patterns to decode how you think, decide, and grow. Get a premium psychometric profile in minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <button 
            onClick={onStart}
            className="btn-primary text-lg flex items-center justify-center gap-2 group"
          >
            Begin Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onSample}
            className="btn-secondary text-lg"
          >
            View Sample Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Privacy First"
            desc="No data leaves your browser. Pure client-side intelligence."
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Instant Insights"
            desc="Layered analysis engine detects latent traits and archetypes."
          />
          <FeatureCard 
            icon={<Target className="w-6 h-6 text-primary" />}
            title="Actionable Growth"
            desc="Personalized roadmaps for academic and personal success."
          />
        </div>
      </motion.div>

      <footer className="mt-20 py-8 text-slate-400 text-sm text-center w-full border-t border-slate-100 no-print">
        © 2026 VidyaLoop Behavioral Intelligence Systems
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass p-6 rounded-2xl">
    <div className="mb-4">{icon}</div>
    <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
