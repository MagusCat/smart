import React, { useState, useEffect } from 'react';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const intervalTime =10;
    const increment = 3;

    const loadingInterval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress < 100) {
          return prevProgress + increment;
        } else {
          clearInterval(loadingInterval);
          setTimeout(() => {
            setIsHidden(true);
          }, 300);
          return 100;
        }
      });
    }, intervalTime);

    return () => clearInterval(loadingInterval);
  }, []);

  return (
    <div
      id="loadingScreen"
      className={`fixed inset-0 flex items-center justify-center z-[9999] transition-opacity duration-500 ease-out 
                  ${isHidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100'}`}
      style={{ backgroundColor: 'rgba(52, 228, 175, 1)' }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center w-[90%] max-w-[400px] h-[200px]">
        <img
          src="/img/Group-86.png"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x50/000000/FFFFFF?text=SMARTDRIVE'; }}
          alt="SmartDrive Logo"
          className="max-w-[150px] h-auto mb-6"
        />
        <div className="w-[80%] h-2 bg-gray-200 rounded-md overflow-hidden">
          <div
            id="progressBar"
            className="h-full bg-[#34e4af] rounded-md transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;