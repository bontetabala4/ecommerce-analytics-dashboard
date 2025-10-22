import type { MetricData } from '../types';

export const generateMockData = (timeframe: '7d' | '30d' | '90d'): MetricData[] => {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  const data: MetricData[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      timestamp: date.toISOString().split('T')[0],
      loadTime: 1.5 + Math.random() * 1.5,
      bounceRate: 5 + Math.random() * 10,
      pageViews: Math.floor(100000 + Math.random() * 400000),
      startRender: 0.8 + Math.random() * 1,
      pagesValue: 0.3 + Math.random() * 0.7,
    });
  }

  return data.reverse();
};

export const timeframes = [
  { label: '7 derniers jours', value: '7d' as const },
  { label: '30 derniers jours', value: '30d' as const },
  { label: '90 derniers jours', value: '90d' as const },
];