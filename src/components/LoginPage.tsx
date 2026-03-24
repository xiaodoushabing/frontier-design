import React, { useState } from 'react';
import { Network, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLogin: (isAdmin: boolean) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = userId.toLowerCase().includes('admin');
    onLogin(isAdmin);
  };

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-[#020617]">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-rose-600/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.15]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 py-12">
        
        {/* Left Side: Value Proposition */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:block space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            The Future of Enterprise AI
          </div>
          <h1 className="text-5xl font-bold text-white leading-[1.1] tracking-tight">
            A centralized platform <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">for your AI Agents.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Empowering line managers and data scientists alike with intuitive, actionable insights.
          </p>
          
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                <Zap className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">Instant Deployment</h4>
                <p className="text-slate-500 text-xs mt-1">Go from model to endpoint in seconds.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">Enterprise Grade</h4>
                <p className="text-slate-500 text-xs mt-1">Role-based access and full audit trails.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-slate-950/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50">
            <div className="flex flex-col items-center mb-10 lg:hidden">
              <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/20 mb-4">
                <Network className="text-white w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Frontier</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white">Sign In</h3>
              <p className="text-slate-400 text-sm mt-1">Enter your credentials to access the platform.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1" htmlFor="userId">User ID</label>
                <input
                  id="userId"
                  type="text"
                  className="w-full bg-slate-950/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                  placeholder="e.g. admin_user"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="w-full bg-slate-950/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center group shadow-lg shadow-rose-600/20"
              >
                Launch Platform
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-xs font-medium text-slate-500">
              <button className="hover:text-rose-400 transition-colors">Forgot password?</button>
              <button className="hover:text-rose-400 transition-colors">Contact support</button>
            </div>
          </div>
          
          <p className="text-center text-slate-600 text-xs mt-8">
            &copy; 2026 Frontier AI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
