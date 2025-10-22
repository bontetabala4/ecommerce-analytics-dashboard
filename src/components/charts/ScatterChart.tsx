import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import type { ChartProps } from '../../types';

export const PerformanceScatterChart: React.FC<ChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6 h-80 flex items-center justify-center">
        <div className="text-gray-500">Chargement des données...</div>
      </div>
    );
  }

  const scatterData = data.map(item => ({
    x: item.loadTime,
    y: item.bounceRate,
    pageViews: item.pageViews,
    timestamp: item.timestamp
  }));

  const getColor = (pageViews: number) => {
    if (pageViews > 400000) return '#ef4444';
    if (pageViews > 300000) return '#f59e0b';
    if (pageViews > 200000) return '#10b981';
    return '#3b82f6';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Performance: Temps de Chargement vs Taux de Rebond
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={scatterData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="x" 
              name="Temps de chargement"
              unit="s"
              stroke="#6b7280"
              label={{ value: 'Temps de chargement (s)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              dataKey="y" 
              name="Taux de rebond"
              unit="%"
              stroke="#6b7280"
              label={{ value: 'Taux de rebond (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                name === 'x' ? `${value.toFixed(2)}s` : `${value.toFixed(1)}%`,
                name === 'x' ? 'Temps de chargement' : 'Taux de rebond'
              ]}
              labelFormatter={(_, payload) => {
                if (!payload || !payload[0]) return '';
                const data = payload[0].payload;
                return `Pages vues: ${data.pageViews.toLocaleString('fr-FR')}`;
              }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px'
              }}
            />
            <Legend />
            <Scatter name="Performances" data={scatterData}>
              {scatterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.pageViews)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-6 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>Trafic faible (&lt; 200k)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Trafic moyen (200k-300k)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span>Trafic élevé (300k-400k)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Trafic très élevé (&gt; 400k)</span>
        </div>
      </div>
    </div>
  );
};