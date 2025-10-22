import { useState, useEffect } from 'react';
import type { MetricData } from '../types';
import { generateMockData } from '../data/mockData';

export const useMetrics = (timeframe: '7d' | '30d' | '90d') => {
  const [data, setData] = useState<MetricData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const timer = setTimeout(() => {
          const mockData = generateMockData(timeframe);
          setData(mockData);
          setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des données';
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

  return { data, isLoading, error };
};