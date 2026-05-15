import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, ChevronRight } from 'lucide-react';

const StudentInfoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '',
    school: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.grade) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass p-8 rounded-3xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Personalize Your Profile</h2>
          <p className="text-slate-500 mt-2">Help us contextualize your behavioral report.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                required
                className="input-field pl-12"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Academic Level</label>
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select 
                required
                className="input-field pl-12 appearance-none"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
              >
                <option value="">Select Grade</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
                <option value="Undergrad">Undergraduate</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Institution Name</label>
            <div className="relative">
              <input 
                type="text" 
                required
                className="input-field"
                placeholder="Vidya Academy"
                value={formData.school}
                onChange={(e) => setFormData({...formData, school: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            Next: Behavioral Assessment
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-8">
          Your data is processed locally and never stored on our servers.
        </p>
      </motion.div>
    </div>
  );
};

export default StudentInfoForm;
