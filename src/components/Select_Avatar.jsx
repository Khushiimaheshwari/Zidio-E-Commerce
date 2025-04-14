import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectAvatar() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  // Generate avatar array programmatically
  const superheroAvatars = useMemo(() => 
    Array.from({ length: 19 }, (_, i) => `avatar${i + 1}.png`),
    []
  );
  
  const handleAvatarSelect = useCallback((avatar) => {
    setSelectedAvatar(avatar);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 p-2">Choose Your Avatar</h2>
        
        <div className="grid md:grid-cols-5 sm:grid-cols-4 gap-4">
          {superheroAvatars.map((avatar) => (
            <div key={avatar} className="flex justify-center">
              <div 
                className={`relative cursor-pointer transition-all duration-200 transform hover:scale-110 ${
                  selectedAvatar === avatar 
                    ? "ring-4 ring-blue-500 scale-105" 
                    : "hover:ring-2 hover:ring-blue-300"
                }`}
              >
                <img
                  src={`/avatars/${avatar}`}
                  alt={`Avatar option ${avatar.replace('.png', '')}`}
                  onClick={() => handleAvatarSelect(avatar)}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full"
                  loading="lazy"
                />
                {selectedAvatar === avatar && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {selectedAvatar && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue with Selected Avatar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectAvatar;
