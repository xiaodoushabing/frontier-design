import React from 'react';
import { ChevronRight, Bell, UserCircle, LogOut, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { AGENTS } from '../data/mockData';

interface TopBarProps {
  activeWorkspaceId: string | null;
  onLogout: () => void;
  setActiveWorkspaceId: (id: string | null) => void;
  toggleSidebar: () => void;
}

export default function TopBar({ activeWorkspaceId, onLogout, setActiveWorkspaceId, toggleSidebar }: TopBarProps) {
  const activeAgent = AGENTS.find(w => w.id === activeWorkspaceId);

  return (
    <div className="h-20 border-b border-slate-100 flex items-center justify-between px-8 bg-white shrink-0 z-20">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <button 
          onClick={() => setActiveWorkspaceId(null)}
          className="text-slate-400 font-bold hover:text-rose-600 transition-all uppercase tracking-widest text-[11px]"
        >
          Frontier AI
        </button>
        <ChevronRight className="w-4 h-4 text-slate-300 mx-2" />
        <button 
          onClick={() => setActiveWorkspaceId(null)}
          className={`${activeAgent ? "text-slate-400 hover:text-rose-600" : "font-bold text-slate-900"} transition-all uppercase tracking-widest text-[11px]`}
        >
          Agents
        </button>
        {activeAgent && (
          <motion.div 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <ChevronRight className="w-4 h-4 text-slate-300 mx-2" />
            <span className="font-bold text-rose-600 uppercase tracking-widest text-[11px] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              {activeAgent.name}
            </span>
          </motion.div>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-3">
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-100"></div>

          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Lisa Tan</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Admin</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-all shadow-sm">
              <UserCircle className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
          </div>

          <button 
            onClick={onLogout} 
            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" 
            title="Secure Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
