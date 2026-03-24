import { useState } from 'react';
import LoginPage from './components/LoginPage';
import MainApp from './components/MainApp';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // Default favorite for demonstration purposes. 
  // Set to null to see the dashboard first.
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const handleLogin = (admin: boolean) => {
    setIsAdmin(admin);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans">
      {isLoggedIn ? (
        <MainApp 
          isAdmin={isAdmin} 
          onLogout={handleLogout} 
          favoriteIds={favoriteIds}
          setFavoriteIds={setFavoriteIds}
        />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}
