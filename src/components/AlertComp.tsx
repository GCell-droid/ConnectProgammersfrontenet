import React, { useState, useEffect } from 'react';

const AlertComp = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    visible && (
      <div 
        role="alert" 
        className="fixed top-5 left-1/2 transform w-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{message}</span>
      </div>
    )
  );
};

export default AlertComp;
