import React, { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);
  const [webApp, setWebApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica Telegram SDK
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    script.onload = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        setWebApp(tg);
        
        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user);
        }
      }
      setLoading(false);
    };
    document.body.appendChild(script);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-600">
        <div className="text-white text-2xl">⏳ Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            🎉 Roma El Cartel
          </h1>
          <p className="text-center text-gray-600">Telegram Mini App</p>
        </div>

        {/* User Info */}
        {user && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              {user.photo_url && (
                <img
                  src={user.photo_url}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h2 className="font-bold text-lg">{user.first_name} {user.last_name || ''}</h2>
                <p className="text-gray-600 text-sm">@{user.username || 'no_username'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition">
            ✨ Azione 1
          </button>
          <button className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition">
            🎯 Azione 2
          </button>
          <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600 transition">
            🚀 Azione 3
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white text-sm">
          <p>Made with ❤️ for Telegram</p>
        </div>
      </div>
    </div>
  );
}
