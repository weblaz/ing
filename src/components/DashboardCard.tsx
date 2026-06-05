import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  subtitle?: string;
}

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-900 text-white', text: 'text-blue-900' },
  green: { bg: 'bg-green-50', icon: 'bg-green-600 text-white', text: 'text-green-700' },
  orange: { bg: 'bg-orange-50', icon: 'bg-orange-500 text-white', text: 'text-orange-700' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-600 text-white', text: 'text-purple-700' },
  red: { bg: 'bg-red-50', icon: 'bg-red-600 text-white', text: 'text-red-700' },
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title, value, icon: Icon, trend = 'neutral', trendValue, color = 'blue', subtitle
}) => {
  const colors = colorMap[color];

  return (
    <div className={`${colors.bg} rounded-xl p-6 border border-white shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${colors.text}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trendValue && (
        <div className="flex items-center mt-3 space-x-1">
          {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
          {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
          {trend === 'neutral' && <Minus className="w-4 h-4 text-gray-400" />}
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;