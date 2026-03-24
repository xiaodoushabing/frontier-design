import React, { useState } from 'react';
import {
  Network, ChevronDown, Search, MessageSquare,
  Settings, HelpCircle, ShieldAlert,
  LayoutGrid, Sparkles, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENTS, ALL_CHATS } from '../data/mockData';

interface SidebarProps {
  isAdmin: boolean;
  activeWorkspaceId: string | null;
  setActiveWorkspaceId: (id: string | null) => void;
  favoriteIds: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isAdmin, activeWorkspaceId, setActiveWorkspaceId, favoriteIds, isOpen, setIsOpen }: SidebarProps) {
  const [globalSearch, setGlobalSearch] = useState('');
  const [localSearch, setLocalSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(true);

  const activeAgent = AGENTS.find(w => w.id === activeWorkspaceId);
  const favoriteAgents = AGENTS.filter(w => favoriteIds.includes(w.id) && (isAdmin || w.access !== 'Admin'));

  const globalResults = globalSearch.trim() 
    ? ALL_CHATS.filter(c => c.title.toLowerCase().includes(globalSearch.toLowerCase())) 
    : [];
    
  const localChats = activeWorkspaceId 
    ? ALL_CHATS.filter(c => c.projectId === activeWorkspaceId && c.title.toLowerCase().includes(localSearch.toLowerCase())) 
    : [];

  return (
    <div className={`${isOpen ? 'w-80' : 'w-20'} flex flex-col h-full bg-slate-950 border-r border-slate-800 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30 transition-all duration-300 overflow-hidden`}>
      {/* Header */}
      <div className={`h-20 flex items-center ${isOpen ? 'px-8 justify-between' : 'px-0 justify-center'} shrink-0`}>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20">
            <Network className="text-white w-6 h-6" />
          </div>
          {isOpen && <span className="ml-3 font-bold text-white tracking-tight text-xl whitespace-nowrap">"Frontier Agents Hub"</span>}
        </div>
      </div>

      {/* Global Navigation */}
      <div className={`px-4 py-6 space-y-4 shrink-0 ${!isOpen && 'flex flex-col items-center'}`}>
        <button
          onClick={() => setActiveWorkspaceId(null)}
          title={!isOpen ? "All Agents" : ""}
          className={`flex items-center rounded-2xl text-sm font-bold transition-all ${isOpen ? 'w-full px-4 py-3' : 'p-3'} ${!activeWorkspaceId ? 'bg-rose-500/10 text-rose-500 shadow-sm border border-rose-500/20' : 'text-slate-500 hover:bg-slate-800'}`}
        >
          <LayoutGrid className={`${isOpen ? 'w-5 h-5 mr-3' : 'w-6 h-6'}`} />
          {isOpen && "All Agents"}
        </button>

        {favoriteAgents.length > 0 && (
          <div className="w-full space-y-1">
            {isOpen ? (
              <>
                <button
                  onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
                >
                  Favorites
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isFavoritesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isFavoritesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-1"
                    >
                      {favoriteAgents.map(agent => (
                        <button
                          key={agent.id}
                          onClick={() => setActiveWorkspaceId(agent.id)}
                          className={`w-full flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeWorkspaceId === agent.id ? 'bg-rose-500/10 text-rose-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                        >
                          <agent.icon className={`w-4 h-4 mr-3 ${activeWorkspaceId === agent.id ? 'text-rose-500' : 'text-slate-500'}`} />
                          <span className="truncate">{agent.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                {favoriteAgents.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => setActiveWorkspaceId(agent.id)}
                    title={agent.name}
                    className={`p-3 rounded-xl transition-all ${activeWorkspaceId === agent.id ? 'bg-rose-500/10 text-rose-500' : 'text-slate-500 hover:bg-slate-800'}`}
                  >
                    <agent.icon className="w-6 h-6" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {isOpen && (
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search all chats..."
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500/30 transition-all placeholder:text-slate-500 font-medium"
            />
            <AnimatePresence>
              {globalSearch && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-full mt-3 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl z-50 max-h-96 overflow-y-auto py-3 ring-1 ring-black/5"
                >
                  <div className="px-5 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Global Results</div>
                  {globalResults.length > 0 ? globalResults.map(chat => {
                    const ws = AGENTS.find(w => w.id === chat.projectId);
                    return (
                      <button key={chat.id} onClick={() => { setActiveWorkspaceId(chat.projectId); setGlobalSearch(''); }} className="w-full text-left px-5 py-3 hover:bg-rose-500/10 flex flex-col border-l-4 border-transparent hover:border-rose-500 transition-all">
                        <span className="text-sm font-bold text-slate-200 truncate">{chat.title}</span>
                        <span className="text-[11px] text-slate-500 flex items-center mt-1 font-medium">
                          {ws && <ws.icon className="w-3 h-3 mr-2" />} {ws?.name} • {chat.time}
                        </span>
                      </button>
                    )
                  }) : (
                    <div className="px-5 py-6 text-sm text-slate-500 text-center italic">No matching chats found.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Contextual Area (Active Agent) */}
      <div className={`flex-1 overflow-y-auto pb-6 ${isOpen ? 'px-4' : 'px-2'}`}>
        {activeAgent ? (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              {isOpen && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 px-2">Active</p>}
              <div className="relative">
                <button
                  onClick={() => isOpen && setIsDropdownOpen(!isDropdownOpen)}
                  title={!isOpen ? activeAgent.name : ""}
                  className={`flex items-center bg-slate-900 border border-slate-800 rounded-2xl shadow-sm hover:border-rose-300 transition-all ${isOpen ? 'w-full justify-between px-4 py-3' : 'p-3'}`}
                >
                  <div className="flex items-center overflow-hidden">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm ${activeAgent.color}`}>
                      <activeAgent.icon className="w-4 h-4" />
                    </div>
                    {isOpen && <span className="ml-3 text-sm font-bold text-white truncate">{activeAgent.name}</span>}
                  </div>
                  {isOpen && <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                </button>

                <AnimatePresence>
                  {isOpen && isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-0 w-full mt-2 bg-slate-950 border border-slate-800 rounded-2xl shadow-xl z-20 py-2 max-h-64 overflow-y-auto ring-1 ring-black/5"
                    >
                      {AGENTS.filter(w => isAdmin || w.access !== 'Admin').map(ws => (
                        <button
                          key={ws.id}
                          onClick={() => { setActiveWorkspaceId(ws.id); setIsDropdownOpen(false); }}
                          className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${activeWorkspaceId === ws.id ? 'bg-rose-500/10 text-rose-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                        >
                          <ws.icon className={`w-4 h-4 mr-3 ${activeWorkspaceId === ws.id ? 'text-rose-500' : 'text-slate-500'}`} />
                          <span className="truncate">{ws.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {isOpen && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">History</p>
                  <button className="p-1 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter chats..."
                    value={localSearch}
                    onChange={e => setLocalSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  {localChats.length > 0 ? localChats.map(chat => (
                    <button key={chat.id} className="w-full text-left p-3 rounded-2xl hover:bg-slate-800 border border-transparent hover:border-slate-800 transition-all group">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center mr-3 shrink-0 group-hover:bg-rose-500/10 transition-colors">
                          <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-rose-500 transition-colors" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-bold text-slate-300 truncate group-hover:text-white">{chat.title}</span>
                          <span className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-widest">{chat.time}</span>
                        </div>
                      </div>
                    </button>
                  )) : (
                    <div className="text-xs text-slate-500 text-center py-10 bg-slate-900 rounded-2xl border-2 border-dashed border-slate-800">
                      No history for this agent.
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className={`flex flex-col items-center justify-center h-full ${isOpen ? 'p-10' : 'p-0'}`}>
            <div className={`${isOpen ? 'w-16 h-16 mb-6' : 'w-10 h-10'} bg-slate-900 rounded-3xl flex items-center justify-center opacity-50`}>
              <Sparkles className={`${isOpen ? 'w-8 h-8' : 'w-5 h-5'} text-slate-300`} />
            </div>
            {isOpen && (
              <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Select Agent <br /> to Begin
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer Utilities */}
      <div className={`border-t border-slate-800 shrink-0 bg-slate-950 ${isOpen ? 'p-6 space-y-2' : 'p-4 space-y-4 flex flex-col items-center'}`}>
        {isAdmin && (
          <button 
            title={!isOpen ? "Admin Workbench" : ""}
            className={`flex items-center font-bold text-amber-700 bg-amber-50 rounded-2xl hover:bg-amber-100 transition-all border border-amber-100 shadow-sm group ${isOpen ? 'w-full px-4 py-3 mb-4' : 'p-3'}`}
          >
            <ShieldAlert className={`${isOpen ? 'w-5 h-5 mr-3' : 'w-6 h-6'} group-hover:scale-110 transition-transform`} />
            {isOpen && "Admin Workbench"}
          </button>
        )}
        <button 
          title={!isOpen ? "Settings" : ""}
          className={`flex items-center font-bold text-slate-500 rounded-xl hover:bg-slate-800 hover:text-white transition-all ${isOpen ? 'w-full px-4 py-2.5' : 'p-3'}`}
        >
          <Settings className={`${isOpen ? 'w-5 h-5 mr-3' : 'w-6 h-6'} text-slate-300`} />
          {isOpen && "Settings"}
        </button>
        <button 
          title={!isOpen ? "Help Centre" : ""}
          className={`flex items-center font-bold text-slate-500 rounded-xl hover:bg-slate-800 hover:text-white transition-all ${isOpen ? 'w-full px-4 py-2.5' : 'p-3'}`}
        >
          <HelpCircle className={`${isOpen ? 'w-5 h-5 mr-3' : 'w-6 h-6'} text-slate-300`} />
          {isOpen && "Help Centre"}
        </button>
      </div>
    </div>
  );
}
