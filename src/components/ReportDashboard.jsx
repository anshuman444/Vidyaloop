import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import { 
  Award, Brain, Zap, Target, Shield, AlertTriangle, 
  MessageSquare, Lightbulb, TrendingUp, UserCheck, Star, Bookmark
} from 'lucide-react';
import { DIMENSIONS } from '../data/questions';

const ReportDashboard = ({ result, onReset }) => {
  if (!result) return null;

  const { studentInfo, scores, latentTraits, patterns, risks, archetype, report } = result;

  const radarData = Object.entries(scores).map(([name, data]) => ({
    subject: name.split(' ')[0],
    A: data.percentile,
    fullMark: 100,
  }));

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Brand Header */}
      <div className="mb-16 flex flex-col items-center md:items-start no-print">
        <div className="flex flex-col items-center md:items-start leading-none mb-4">
          <span className="text-4xl font-black text-primary tracking-tighter">Vidya</span>
          <span className="text-4xl font-black text-slate-400 tracking-tighter mt-[-6px]">Loop</span>
        </div>
        <div className="h-1.5 w-24 bg-primary/20 rounded-full" />
      </div>

      {/* Header Profile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-slate-200 pb-12"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
              Student Profile Analysis
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
              {result.reliability.level} Reliability
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none">{studentInfo.name}</h1>
          <p className="text-slate-500 font-medium text-lg mt-2">{studentInfo.school} • Grade {studentInfo.grade}</p>
        </div>
        <div className="flex flex-wrap gap-4 no-print w-full md:w-auto">
          <button 
            onClick={onReset}
            className="btn-secondary flex-1 md:flex-none flex items-center justify-center gap-2"
          >
            Retake Assessment
          </button>
          <button 
            onClick={() => window.print()}
            className="btn-primary flex-1 md:flex-none flex items-center justify-center gap-2"
          >
            <Bookmark className="w-4 h-4" />
            Download Full Report
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column - Core Archetype */}
        <div className="lg:col-span-4 space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-dark p-10 rounded-[2.5rem] text-white overflow-hidden relative min-h-[320px] flex flex-col justify-center"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Star className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <div className="bg-primary-light p-3 rounded-2xl inline-block mb-6 shadow-lg shadow-primary-light/30">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-primary-light font-bold text-sm uppercase tracking-widest mb-1">Your Archetype</p>
              <h2 className="text-3xl font-bold mb-2 tracking-tight">{archetype.name}</h2>
              <p className="text-slate-400 font-medium italic mb-6">"{archetype.tagline}"</p>
              <p className="text-slate-200 leading-relaxed text-sm">
                {archetype.description}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-10 rounded-[2.5rem]"
          >
            <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Latent Trait Detection
            </h3>
            <div className="space-y-8">
              {latentTraits.map((trait, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-slate-700">{trait.name}</span>
                    <span className="text-sm font-bold text-primary">{trait.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${trait.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{trait.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Center Column - Data Viz & Patterns */}
        <div className="lg:col-span-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Radar Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-10 rounded-[2.5rem] flex flex-col items-center overflow-visible"
            >
              <h3 className="font-bold text-slate-900 mb-2">Behavioral Radar</h3>
              <p className="text-xs text-slate-400 mb-8">Symmetry indicates balanced development</p>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData} margin={{ top: 20, right: 60, bottom: 20, left: 60 }}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#64748B', fontSize: 9, fontWeight: '700' }} 
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} axisLine={false} tick={false} />
                    <Radar
                      name="Student"
                      dataKey="A"
                      stroke="#1E88E5"
                      fill="#1E88E5"
                      fillOpacity={0.15}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pattern Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="glass p-8 rounded-[2rem] h-full flex flex-col">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Primary Pattern
                </h3>
                {patterns.length > 0 ? (
                  <div className="flex-1">
                    <div className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-full border border-primary/10 inline-block mb-3">
                      Detected Interaction
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-3">{patterns[0].title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {patterns[0].description}
                    </p>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-auto">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Explainability Engine Result:</p>
                      <p className="text-xs text-slate-600 leading-tight">
                        {report.corePattern}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 italic">No extreme patterns detected. You show high psychological flexibility.</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Dimension Details Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass p-8 rounded-[2rem]"
          >
            <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Dimension Performance Percentiles
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(scores).map(([name, data], i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-200" />
                      <motion.circle 
                        cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={176} 
                        initial={{ strokeDashoffset: 176 }}
                        animate={{ strokeDashoffset: 176 - (176 * data.percentile) / 100 }}
                        transition={{ duration: 1.5, delay: 1 + i * 0.1 }}
                        className="text-primary" 
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-slate-700">{data.percentile}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-tight mb-1">{name.split('&')[0].trim()}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    data.band === 'Exemplary' ? 'bg-purple-100 text-purple-700' :
                    data.band === 'Strong' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {data.band}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Narrative Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass p-8 rounded-[2rem]"
            >
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Social & Emotional Style
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {report.socialStyle}
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-orange-900 uppercase tracking-wider mb-1">Behavioral Risk Factors</p>
                    <ul className="text-xs text-orange-800 space-y-1 list-disc ml-4">
                      {risks.length > 0 ? risks.map((r, i) => <li key={i}>{r}</li>) : <li>No high-priority risks detected.</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass p-8 rounded-[2rem] border-primary/10 border-2"
            >
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Growth Roadmap
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">Next Growth Phase</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{report.growthFocus}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">Skill Acquisition</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">Focus on {scores[DIMENSIONS.SELF_AWARENESS].percentile < 60 ? 'Metacognitive reflection' : 'Adaptive decision making'} workshops.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">Environmental Optimization</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">Seek out {archetype.name === 'The Deep Thinker' ? 'low-distraction environments' : 'collaborative group projects'} to maximize your output.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 text-center text-slate-400 text-xs border-t border-slate-200 pt-10 no-print"
      >
        <p className="mb-4 font-bold uppercase tracking-widest text-slate-300">
          Building <span className="text-primary/50">INDIA's</span> future, One student at a time.
        </p>
        <p className="mb-2">Powered by VidyaLoop Logic Engine v1.0.4 • Confidential Psychometric Asset</p>
        <p>This report is for developmental purposes only and should not be used as a clinical diagnostic tool.</p>
      </motion.footer>
    </div>
  );
};

export default ReportDashboard;
