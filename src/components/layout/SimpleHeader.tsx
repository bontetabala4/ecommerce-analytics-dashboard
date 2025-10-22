import React from 'react';
import { ThemeToggle } from '../ThemeToggle';

interface SimpleHeaderProps {
  timeframe: '7d' | '30d' | '90d';
  onTimeframeChange: (timeframe: '7d' | '30d' | '90d') => void;
  onExportData: () => void;
  onOpenFilters: () => void;
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
}

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({ 
  timeframe, 
  onTimeframeChange, 
  onOpenAuth 
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-8 p-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            E-commerce Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Tableau de bord des performances
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeframe}
            onChange={(e) => onTimeframeChange(e.target.value as '7d' | '30d' | '90d')}
            className="border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="7d" className="bg-white dark:bg-gray-700">7 derniers jours</option>
            <option value="30d" className="bg-white dark:bg-gray-700">30 derniers jours</option>
            <option value="90d" className="bg-white dark:bg-gray-700">90 derniers jours</option>
          </select>

          <ThemeToggle />

          <button
            onClick={onOpenAuth}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
          >
            Connexion
          </button>
        </div>
      </div>
    </header>
  );
};