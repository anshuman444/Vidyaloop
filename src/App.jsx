import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import StudentInfoForm from './components/StudentInfoForm';
import AssessmentEngine from './components/AssessmentEngine';
import ProcessingScreen from './components/ProcessingScreen';
import ReportDashboard from './components/ReportDashboard';
import { processAssessment } from './logic/engine';
import { QUESTIONS } from './data/questions';

const App = () => {
  const [view, setView] = useState('landing'); // landing, info, assessment, processing, report
  const [studentInfo, setStudentInfo] = useState(null);
  const [responses, setResponses] = useState([]);
  const [assessmentResult, setAssessmentResult] = useState(null);

  const startAssessment = () => setView('info');
  
  const resetAssessment = () => {
    setResponses([]);
    setAssessmentResult(null);
    setStudentInfo(null);
    setView('landing');
  };
  
  const handleInfoSubmit = (info) => {
    setStudentInfo(info);
    setView('assessment');
  };

  const handleAssessmentComplete = (allResponses) => {
    setResponses(allResponses);
    setView('processing');
    
    // Simulate processing time (min 4s)
    const result = processAssessment(allResponses, studentInfo || { name: 'Sample Student', grade: '12', school: 'Vidya Academy' });
    setAssessmentResult(result);

    setTimeout(() => {
      setView('report');
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <LandingPage 
            onStart={startAssessment} 
            onSample={() => handleAssessmentComplete(QUESTIONS.map(q => ({ questionId: q.id, value: 4 })))} 
            key="landing" 
          />
        )}
        {view === 'info' && (
          <StudentInfoForm onSubmit={handleInfoSubmit} key="info" />
        )}
        {view === 'assessment' && (
          <AssessmentEngine onComplete={handleAssessmentComplete} key="assessment" />
        )}
        {view === 'processing' && (
          <ProcessingScreen key="processing" />
        )}
        {view === 'report' && (
          <ReportDashboard result={assessmentResult} onReset={resetAssessment} key="report" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
