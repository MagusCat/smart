import React from 'react';

function LoadingScreen() {
  return (
    <div
      id="loadingScreen"
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-transparent"
    >
      <div className="p-8  flex flex-col items-center">
        <div className="flex space-x-2 mt-4">
          <span className="dot bg-[#34e4af] w-3 h-3 rounded-full inline-block animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="dot bg-[#34e4af] w-3 h-3 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.15s' }}></span>
          <span className="dot bg-[#34e4af] w-3 h-3 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.3s' }}></span>
        </div>
        <style>
          {`
            @keyframes bounce {
              0%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-12px); }
            }
            .animate-bounce {
              animation: bounce 1s infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default LoadingScreen;