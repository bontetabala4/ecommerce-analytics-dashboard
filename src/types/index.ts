export interface MetricData {
  timestamp: string;
  loadTime: number;
  bounceRate: number;
  pageViews: number;
  startRender: number;
  pagesValue: number;
}

export interface Timeframe {
  label: string;
  value: '7d' | '30d' | '90d';
}

export interface MetricCardProps {
  title: string;
  value: string;
  trend: 'positive' | 'negative' | 'neutral';
  change?: string;
  icon?: React.ReactNode;
}

export interface ChartProps {
  data: MetricData[];
  timeframe: '7d' | '30d' | '90d';
  isLoading?: boolean;
}

export * from './auth';
export * from './notification';