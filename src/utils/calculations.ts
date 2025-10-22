import type  { MetricData } from '../types';

export const calculateAggregates = (data: MetricData[]) => {
  if (!data.length) return null;

  const loadTime = data.reduce((sum, item) => sum + item.loadTime, 0) / data.length;
  const bounceRate = data.reduce((sum, item) => sum + item.bounceRate, 0) / data.length;
  const pageViews = data.reduce((sum, item) => sum + item.pageViews, 0);
  const pagesValue = data.reduce((sum, item) => sum + item.pagesValue, 0) / data.length;

  return {
    loadTime: loadTime.toFixed(2),
    bounceRate: bounceRate.toFixed(1),
    pageViews: (pageViews / 1000000).toFixed(1),
    pagesValue: pagesValue.toFixed(1),
  };
};

export const calculateTrend = (current: number, previous: number): { value: string; direction: 'up' | 'down' | 'stable' } => {
  const difference = current - previous;
  const percentage = previous === 0 ? 0 : (difference / previous) * 100;
  
  if (Math.abs(percentage) < 0.1) {
    return { value: '0.0%', direction: 'stable' };
  }
  
  return {
    value: `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`,
    direction: percentage > 0 ? 'up' : 'down'
  };
};