import React from 'react';

interface Filters {
  loadTime: { min: number; max: number };
  bounceRate: { min: number; max: number };
  pageViews: { min: number; max: number };
  dateRange: { start: string; end: string };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
  currentFilters: Filters;
}

export const AdvancedFilters: React.FC<Props> = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
        <h3 className="text-lg font-medium mb-4">Filtres avancés</h3>
        <p className="text-sm text-gray-500 mb-4">Composant placeholder — implémentez les contrôles réels selon besoin.</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">Annuler</button>
          <button onClick={() => { onApplyFilters(currentFilters); onClose(); }} className="px-4 py-2 rounded bg-blue-600 text-white">Appliquer</button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
