import React from 'react';

const Progress = ({ value, max = 100 }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100); // Clamp between 0 and 100

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Progress;
