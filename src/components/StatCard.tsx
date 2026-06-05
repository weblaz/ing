import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, description, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm ${className}`}>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-blue-900">{value}</p>
      {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
    </div>
  );
};

export default StatCard;