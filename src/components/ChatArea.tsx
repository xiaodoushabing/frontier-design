import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Paperclip, MoreHorizontal, Maximize2, Minimize2, Info, TrendingUp, Trash2, Download, Settings, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENTS } from '../data/mockData';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: string[];
}

interface AgentForm {
  type: string;
  fields: FormField[];
}

const AGENT_FORMS: Record<string, AgentForm> = {
  'proj-1': {
    type: 'alpha-agent',
    fields: [
      { name: 'topic', label: 'Analysis Topic', type: 'text' },
      { name: 'depth', label: 'Analysis Depth', type: 'select', options: ['Brief', 'Detailed', 'Comprehensive'] }
    ]
  },
  'proj-2': {
    type: 'sentinel-guard',
    fields: [
      { name: 'transactionId', label: 'Transaction ID', type: 'text' },
      { name: 'timeframe', label: 'Timeframe', type: 'select', options: ['Last 24h', 'Last 7 days', 'Last 30 days'] }
    ]
  },
  'proj-3': {
    type: 'insight-engine',
    fields: [
      { name: 'source', label: 'Data Source', type: 'select', options: ['Surveys', 'Social Media', 'Support Tickets'] },
      { name: 'keywords', label: 'Target Keywords', type: 'text' }
    ]
  },
  'proj-4': {
    type: 'predictive-sales',
    fields: [
      { name: 'region', label: 'Sales Region', type: 'select', options: ['NA', 'EMEA', 'APAC', 'LATAM'] },
      { name: 'targetQuarter', label: 'Target Quarter', type: 'select', options: ['Q1', 'Q2', 'Q3', 'Q4'] }
    ]
  },
  'proj-5': {
    type: 'data-architect',
    fields: [
      { name: 'sourceDb', label: 'Source Database', type: 'text' },
      { name: 'targetDb', label: 'Target Database', type: 'text' }
    ]
  },
  'proj-6': {
    type: 'velocity-agent',
    fields: [
      { name: 'query', label: 'Quick Query', type: 'text' },
      { name: 'department', label: 'Department', type: 'select', options: ['HR', 'IT', 'Finance', 'Engineering'] }
    ]
  },
  'proj-7': {
    type: 'neural-core',
    fields: [
      { name: 'dataset', label: 'Dataset Name', type: 'text' },
      { name: 'epochs', label: 'Training Epochs', type: 'number' }
    ]
  },
  'proj-8': {
    type: 'global-connect',
    fields: [
      { name: 'sourceLang', label: 'Source Language', type: 'text' },
      { name: 'targetLang', label: 'Target Language', type: 'text' }
    ]
  }
};

interface ChatAreaProps {
  activeAgentId: string;
}

interface Message {
  id: number;
  sender: 'user' | 'agent';
  text: string;
  time: string;
  form?: AgentForm;
  formSubmitted?: boolean;
}

function DynamicForm({ form, onSubmit, disabled }: { form: AgentForm, onSubmit: (data: any) => void, disabled?: boolean }) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left w-full">
      {form.fields.map((field, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{field.label}</label>
          {field.type === 'select' ? (
            <select 
              disabled={disabled}
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all disabled:opacity-50"
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              {field.options?.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input 
              disabled={disabled}
              required
              type={field.type}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all disabled:opacity-50"
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}...`}
            />
          )}
        </div>
      ))}
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={disabled}
          className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {disabled ? 'Submitted' : 'Submit Data'}
        </button>
      </div>
    </form>
  );
}

export default function ChatArea({ activeAgentId }: ChatAreaProps) {
  const agent = AGENTS.find(w => w.id === activeAgentId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (agent) {
      setMessages([
        { 
          id: 1, 
          sender: 'agent', 
          text: `Welcome to the ${agent.name} interface. I'm your specialized "Frontier Agents Hub" agent, optimized for ${agent.yieldLabel.toLowerCase()}. How can I assist your workflow today?`, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }
  }, [agent?.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!agent) return null;

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock agent response
    setTimeout(() => {
      setIsTyping(false);
      
      const userMessageCount = messages.filter(m => m.sender === 'user').length;
      
      if (userMessageCount === 0 && AGENT_FORMS[agent.id]) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'agent',
          text: `I can help with that. Please provide the following details to proceed:`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          form: AGENT_FORMS[agent.id]
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'agent',
          text: `Analysis complete for ${agent.name}. I've processed your request using the latest ${agent.yieldLabel} optimized parameters (${agent.yieldValue}). The results are ready for your review.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    }, 1500);
  };

  const handleFormSubmit = (messageId: number, formData: any) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, formSubmitted: true } : msg
    ));

    const jsonText = JSON.stringify(formData, null, 2);
    const newMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: `Submitted Data:\n${jsonText}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'agent',
        text: `Thank you. I've received the data and initiated the workflow. The results will be available shortly.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  const deleteMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const clearChat = () => {
    setMessages([]);
    setShowSettings(false);
  };

  const activeFormMessage = messages.find(msg => msg.form && !msg.formSubmitted);

  return (
    <div className={`flex bg-slate-950 overflow-hidden ${isFullScreen ? 'fixed inset-0 z-[9999] w-screen h-screen' : 'flex-1 relative'}`}>
      <div className="flex flex-col flex-1 relative min-w-0">
        {/* Chat Header Context */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-8 py-4 flex items-center justify-between z-10 shadow-sm"
      >
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 text-white shadow-lg ${agent.color}`}>
            <agent.icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{agent.name}</h2>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="relative" onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
            <button className="p-2 text-slate-400 hover:text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
              <Info className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {showInfo && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-slate-950 border border-slate-700 shadow-xl rounded-xl p-4 z-50"
                >
                  <h4 className="font-bold text-slate-200 text-sm mb-1">{agent.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{agent.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 text-slate-400 hover:text-slate-400 hover:bg-slate-800 rounded-xl transition-all"
            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
          >
            {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-slate-400 hover:text-slate-400 hover:bg-slate-800 rounded-xl transition-all"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {showSettings && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)}></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-slate-950 border border-slate-700 shadow-xl rounded-xl py-2 z-50"
                  >
                    <button 
                      onClick={clearChat}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear Chat
                    </button>
                    <button 
                      onClick={() => setShowSettings(false)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-900 flex items-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export Chat
                    </button>
                    <button 
                      onClick={() => setShowSettings(false)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-900 flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pt-28 pb-8 px-6 sm:px-12 lg:px-32 scroll-smooth bg-\[#0B0F19\]">
        <div className="max-w-4xl mx-auto space-y-10">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-center`}>
                  
                  {/* Avatar */}
                  <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${msg.sender === 'user' ? 'bg-slate-950 border border-slate-700 ml-4' : `${agent.color} mr-4`}`}>
                    {msg.sender === 'user' ? <User className="w-5 h-5 text-slate-400" /> : <Bot className="w-5 h-5 text-white" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="flex flex-col relative w-full">
                    <div className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-rose-600 text-white rounded-tr-sm' 
                        : 'bg-slate-950 border border-slate-700 text-slate-200 rounded-tl-sm'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      {msg.form && msg.formSubmitted && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          Form Submitted
                        </div>
                      )}
                      {msg.form && !msg.formSubmitted && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs font-bold text-rose-500">
                          <FileText className="w-4 h-4" />
                          Please fill out the form in the side panel
                        </div>
                      )}
                    </div>
                    <span className={`text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest ${msg.sender === 'user' ? 'text-right mr-1' : 'text-left ml-1'}`}>
                      {msg.sender === 'user' ? 'You' : `${agent.name}`} • {msg.time}
                    </span>
                  </div>

                  {/* Delete Button (Hover) */}
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className={`opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all ${msg.sender === 'user' ? 'mr-2' : 'ml-2'}`}
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${agent.color}`}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-slate-950 border border-slate-700 px-6 py-4 rounded-3xl rounded-tl-sm flex gap-1.5 items-center shadow-sm">
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          {/* Default Prompts */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {agent.prompts.slice(0, 3).map((prompt, idx) => (
              <motion.button
                key={idx}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSend(prompt)}
                className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-slate-400 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-500/10 transition-all shadow-sm flex items-center gap-2 group"
              >
                <Sparkles className="w-3 h-3 text-amber-400 group-hover:text-amber-500" />
                {prompt}
              </motion.button>
            ))}
          </div>

          <div className="relative">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} 
              className="relative flex items-end gap-3 bg-slate-900 border border-slate-700 rounded-3xl p-3 focus-within:ring-4 focus-within:ring-rose-500/10 focus-within:border-rose-500/50 transition-all shadow-sm"
            >
              <button type="button" className="p-3 text-slate-400 hover:text-rose-500 transition-colors shrink-0 rounded-2xl hover:bg-slate-950 shadow-none hover:shadow-sm">
                <Paperclip className="w-6 h-6" />
              </button>
              <textarea 
                rows={1}
                className="w-full bg-transparent border-none focus:ring-0 resize-none py-3.5 text-[16px] text-slate-200 placeholder:text-slate-400 max-h-48 overflow-y-auto"
                placeholder={`Ask ${agent.name} anything...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputValue);
                  }
                }}
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                className="p-4 bg-rose-600 text-white rounded-2xl hover:bg-rose-500 disabled:opacity-30 disabled:hover:bg-rose-600 transition-all shrink-0 shadow-lg shadow-rose-600/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </motion.form>
            <div className="text-center mt-4">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                "Frontier Agents Hub"
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Side Pane for Form */}
      <AnimatePresence>
        {activeFormMessage && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-l border-slate-700 bg-slate-900 flex flex-col shrink-0 z-20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="p-6 border-b border-slate-700 bg-slate-950 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-500">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">Required Information</h3>
                <p className="text-xs text-slate-400">Please complete the form</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <DynamicForm 
                form={activeFormMessage.form!} 
                onSubmit={(data) => handleFormSubmit(activeFormMessage.id, data)} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
