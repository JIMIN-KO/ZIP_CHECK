
import React from 'react';

interface RatingButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: 'blue' | 'gray';
}

export const RatingButton: React.FC<RatingButtonProps> = ({ label, selected, onClick, variant = 'blue' }) => {
  const activeClass = variant === 'blue' 
    ? 'bg-blue-600 text-white shadow-lg' 
    : 'bg-gray-800 text-white shadow-lg';
    
  const inactiveClass = 'bg-gray-100 text-gray-600 hover:bg-gray-200';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selected ? activeClass : inactiveClass}`}
    >
      {label}
    </button>
  );
};
