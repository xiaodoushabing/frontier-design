import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ChatArea from './ChatArea';
import Dashboard from './Dashboard';

interface MainAppProps {
  isAdmin: boolean;
  onLogout: () => void;
  favoriteIds: string[];
  setFavoriteIds: (ids: string[]) => void;
}

export default function MainApp({ isAdmin, onLogout, favoriteIds, setFavoriteIds }: MainAppProps) {
  // Stay on dashboard initially
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleFavorite = (id: string) => {
    setFavoriteIds(favoriteIds.includes(id) 
      ? favoriteIds.filter(fId => fId !== id) 
      : [...favoriteIds, id]);
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Sidebar 
        isAdmin={isAdmin} 
        activeWorkspaceId={activeAgentId} 
        setActiveWorkspaceId={setActiveAgentId} 
        favoriteIds={favoriteIds}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0 border-l border-slate-200">
        <TopBar 
          activeWorkspaceId={activeAgentId} 
          onLogout={onLogout} 
          setActiveWorkspaceId={setActiveAgentId} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        {activeAgentId ? (
          <ChatArea activeAgentId={activeAgentId} />
        ) : (
          <Dashboard 
            isAdmin={isAdmin} 
            onSelectAgent={setActiveAgentId} 
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </div>
    </div>
  );
}
