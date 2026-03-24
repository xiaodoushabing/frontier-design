import React, { useState } from 'react';
import { Search, Star, ShieldAlert, SortAsc, MessageSquare, Clock, ArrowRight, Activity, TrendingUp, Users, Zap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENTS, ALL_CHATS } from '../data/mockData';

interface DashboardProps {
  isAdmin: boolean;
  onSelectAgent: (id: string) => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

type SortOption = 'name-asc' | 'name-desc' | 'date' | 'access';

export default function Dashboard({ isAdmin, onSelectAgent, favoriteIds, onToggleFavorite }: DashboardProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const filtered = AGENTS.filter(w =>
    (w.name.toLowerCase().includes(search.toLowerCase()) || w.description.toLowerCase().includes(search.toLowerCase())) &&
    (isAdmin || w.access !== 'Admin')
  );

  const sorted = [...filtered].sort((a, b) => {
    const aFav = favoriteIds.includes(a.id);
    const bFav = favoriteIds.includes(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;

    switch (sortBy) {
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'date': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'access': return a.access.localeCompare(b.access);
      default: return 0;
    }
  });

  const groupedChats = AGENTS.reduce((acc, ws) => {
    const wsChats = ALL_CHATS.filter(c => c.projectId === ws.id);
    if (wsChats.length > 0 && (isAdmin || ws.access !== 'Admin')) {
      acc.push({ agent: ws, chats: wsChats.slice(0, 2) });
    }
    return acc;
  }, [] as { agent: typeof AGENTS[0], chats: typeof ALL_CHATS }[]);

  return (
    <div className="flex-1 overflow-y-auto bg-\[#0B0F19\] p-8 lg:p-12 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-rose-500/5 blur-[120px]"></div>
         <div className="absolute top-[30%] -left-[5%] w-[30%] h-[30%] rounded-full bg-slate-900/5 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-between items-start"
        >
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-semibold text-sm mb-3 uppercase tracking-widest">
              <Activity className="w-4 h-4" />
              Agent Command Center
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-4">"Frontier Agents Hub"</h1>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
              Your centralized Agents platform. Monitor performance, manage datasets, and engage with specialized agents across your organization.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs font-bold tracking-widest uppercase border border-slate-700">v2.4.0</span>
            <div className="flex gap-4">
              <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-700 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 bg-rose-500/10 text-rose-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Agents</p>
                  <p className="text-sm font-bold text-white">{AGENTS.length}</p>
                </div>
              </div>
              <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-700 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 text-slate-400 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Interactions</p>
                  <p className="text-sm font-bold text-white">124.8k</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12"
        >
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search agents, models, or capabilities..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-700 bg-slate-950 shadow-sm focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-slate-200 text-lg"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 bg-slate-950 p-2 rounded-2xl border border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 px-3 text-slate-400">
              <SortAsc className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Sort</span>
            </div>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-900 border-none rounded-xl px-4 py-2 text-sm font-medium text-slate-300 focus:outline-none cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="date">Newest First</option>
              <option value="access">Access Level</option>
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {sorted.map((ws, index) => (
              <motion.div
                layout
                key={ws.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onSelectAgent(ws.id)}
                className="group bg-slate-950 rounded-3xl p-8 border border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${ws.color} group-hover:scale-110 transition-transform duration-500`}>
                    <ws.icon className="w-7 h-7" />
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(ws.id); }}
                    className="p-2 -mr-2 -mt-2 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    <Star className={`w-7 h-7 ${favoriteIds.includes(ws.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <div className="flex gap-2 mb-4">
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-700">
                    <Users className="w-2.5 h-2.5" />
                    {ws.activeUsers} Active
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-700">
                    <MessageSquare className="w-2.5 h-2.5" />
                    {ws.interactions}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-rose-500 transition-colors">{ws.name}</h3>
                    {ws.access === 'Admin' && (
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                    )}
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm line-clamp-2">
                    {ws.description}
                  </p>
                </div>

                {/* Value Metric Section */}
                <div className="mt-auto pt-6">
                  <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between border border-slate-800 group-hover:bg-rose-500/10 group-hover:border-rose-500/20 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Access</span>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
                        <span className="text-sm font-bold text-white group-hover:text-rose-400">Start conversation</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {sorted.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">No agents found</h3>
              <p className="text-slate-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* Global Chats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Recent Agents</h2>
              <p className="text-slate-400 text-sm mt-1">Pick up where you left off across your active agents.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groupedChats.map(({ agent, chats }) => {
              const [isExpanded, setIsExpanded] = useState(false);
              return (
              <div key={agent.id} className="bg-slate-950 rounded-3xl border border-slate-700 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white mr-4 shadow-sm ${agent.color}`}>
                      <agent.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{agent.name}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onSelectAgent(agent.id)}
                    className="text-lg font-bold text-rose-500 hover:text-rose-700 hover:underline transition-colors"
                  >
                    Enter Agent
                  </button>
                </div>
                <div className="space-y-4">
                  {(isExpanded ? chats : chats.slice(0, 0)).map(chat => (
                    <button 
                      key={chat.id} 
                      onClick={() => onSelectAgent(agent.id)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-950 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-500/5 transition-all group"
                    >
                      <div className="flex items-center overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center mr-4 shadow-sm group-hover:bg-rose-500/10 transition-colors">
                          <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-300 truncate group-hover:text-white">{chat.title}</span>
                      </div>
                      <div className="flex items-center text-xs text-slate-400 font-medium shrink-0 ml-4">
                        {chat.time}
                        <ArrowRight className="w-4 h-4 ml-3 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                      </div>
                    </button>
                  ))}
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-rose-500 bg-slate-900 hover:bg-rose-500/10 rounded-2xl transition-all border border-transparent hover:border-rose-500/20"
                  >
                    {isExpanded ? 'Hide History' : `Show History (${chats.length})`}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            )})}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
