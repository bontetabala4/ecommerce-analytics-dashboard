import React, { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import { Header } from './layout/Header';
import { MetricCard } from './metrics/MetricCard';
import { LoadTimeChart } from './charts/LineChart';
import { PageViewsChart } from './charts/BarChart';
import { PerformanceScatterChart } from './charts/ScatterChart';
import { PerformanceTable } from './tables/PerformanceTable';
import AdvancedFilters from './filters/AdvancedFilters';
import { AuthModal } from './auth/AuthModal';
import { NotificationPanel } from './notifications/NotificationPanel';
import { NotificationToast } from './notifications/NotificationToast';
import  { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../contexts/NotificationContext';
import { useMetrics } from '../hooks/useMetrics';
import { calculateAggregates } from '../utils/calculations';
import type { MetricData } from '../types';
import { Clock, TrendingUp, Users, DollarSign } from 'lucide-react';


const exportToCSV = (data: MetricData[], filename = 'export') => {
  try {
    if (!Array.isArray(data)) data = [data];
    const keys = Object.keys(data[0] || {}) as Array<keyof MetricData>;
    const rows = data.map(row =>
      keys.map(k => {
        const cell = row[k] ?? '';
        return `"${String(cell).replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csv = [keys.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('exportToCSV error', e);
  }
};

export const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('7d');
  const [filters, setFilters] = useState({
    loadTime: { min: 0, max: 10 },
    bounceRate: { min: 0, max: 100 },
    pageViews: { min: 0, max: 1000000 },
    dateRange: { start: '', end: '' }
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const { data, isLoading, error } = useMetrics(timeframe);
  const { user } = useAuth();
  const { notifications, removeNotification, addNotification } = useNotifications();

  useEffect(() => {
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: `Bienvenue, ${user?.name} !`,
        message: 'Vous êtes maintenant connecté à votre tableau de bord.',
      });
    }, 1000);
  }, [user, addNotification]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const itemDate = new Date(item.timestamp);
      const meetsLoadTime = item.loadTime >= filters.loadTime.min && item.loadTime <= filters.loadTime.max;
      const meetsBounceRate = item.bounceRate >= filters.bounceRate.min && item.bounceRate <= filters.bounceRate.max;
      const meetsPageViews = item.pageViews >= filters.pageViews.min && item.pageViews <= filters.pageViews.max;
      
      let meetsDateRange = true;
      if (filters.dateRange.start) {
        meetsDateRange = meetsDateRange && itemDate >= new Date(filters.dateRange.start);
      }
      if (filters.dateRange.end) {
        meetsDateRange = meetsDateRange && itemDate <= new Date(filters.dateRange.end);
      }
      
      return meetsLoadTime && meetsBounceRate && meetsPageViews && meetsDateRange;
    });
  }, [data, filters]);

  const metrics = calculateAggregates(filteredData);

  const handleExportData = () => {
    exportToCSV(filteredData, 'ecommerce-analytics');
    addNotification({
      type: 'success',
      title: 'Export réussi',
      message: 'Les données ont été exportées en CSV.',
    });
  };

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    addNotification({
      type: 'success',
      title: 'Filtres appliqués',
      message: 'Les filtres ont été mis à jour avec succès.',
    });
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-600 dark:text-red-400 text-center py-8 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl mx-4">
          Erreur: {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Header 
        timeframe={timeframe} 
        onTimeframeChange={setTimeframe}
        onExportData={handleExportData}
        onOpenFilters={() => setIsFiltersOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Load Time Median"
          value={metrics ? `${metrics.loadTime}s` : '--'}
          trend="positive"
          change="-0.12s"
          icon={<Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
        />
        <MetricCard
          title="Bounce Rate"
          value={metrics ? `${metrics.bounceRate}%` : '--'}
          trend="negative"
          change="+1.2%"
          icon={<TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />}
        />
        <MetricCard
          title="Page Views"
          value={metrics ? `${metrics.pageViews}M` : '--'}
          trend="positive"
          change="+12.4%"
          icon={<Users className="w-6 h-6 text-green-600 dark:text-green-400" />}
        />
        <MetricCard
          title="Pages Value"
          value={metrics ? `${metrics.pagesValue}%` : '--'}
          trend="positive"
          change="+0.2%"
          icon={<DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LoadTimeChart 
          data={filteredData} 
          timeframe={timeframe} 
          isLoading={isLoading}
        />
        <PageViewsChart 
          data={filteredData} 
          timeframe={timeframe} 
          isLoading={isLoading}
        />
        <PerformanceScatterChart 
          data={filteredData} 
          timeframe={timeframe} 
          isLoading={isLoading}
        />
      </div>

      <div className="mb-8">
        <PerformanceTable data={filteredData} isLoading={isLoading} />
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
      />
      
      <AdvancedFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        currentFilters={filters}
        onApplyFilters={handleApplyFilters}
      />
      
      <NotificationPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {notifications.length > 0 && (
        <NotificationToast 
          notification={notifications[0]} 
          onClose={() => removeNotification(notifications[0].id)} 
        />
      )}
    </DashboardLayout>
  );
};