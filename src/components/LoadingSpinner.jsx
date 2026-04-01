import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'emerald', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    emerald: 'border-emerald-500',
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    red: 'border-red-500'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div 
        className={`animate-spin rounded-full border-2 border-gray-200 ${colorClasses[color]} ${sizeClasses[size]}`}
        style={{ borderTopColor: 'transparent' }}
      />
      {text && (
        <p className="text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;