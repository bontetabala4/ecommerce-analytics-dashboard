import React from 'react';
import type { MetricCardProps } from '../../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  trend, 
  change, 
  icon 
}) => {
  const getTrendConfig = () => {
    switch (trend) {
      case 'positive':
        return {
          color: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/30 dark:border-green-800',
          icon: <TrendingUp className="w-4 h-4" />
        };
      case 'negative':
        return {
          color: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/30 dark:border-red-800',
          icon: <TrendingDown className="w-4 h-4" />
        };
      default:
        return {
          color: 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800/30 dark:border-gray-700',
          icon: <Minus className="w-4 h-4" />
        };
    }
  };

  const trendConfig = getTrendConfig();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        {icon && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl transition-colors duration-200">
            {icon}
          </div>
        )}
      </div>
      
      {change && (
        <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${trendConfig.color} transition-colors duration-200`}>
          <span className="mr-1">{trendConfig.icon}</span>
          {change}
        </div>
      )}
    </div>
  );
};