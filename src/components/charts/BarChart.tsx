import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ChartProps } from '../../types';

export const PageViewsChart: React.FC<ChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6 h-80 flex items-center justify-center">
        <div className="text-gray-500">Chargement des données...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Pages Vues vs Temps de Chargement
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
              stroke="#6b7280"
            />
            <YAxis 
              yAxisId="left"
              stroke="#10b981"
              label={{ value: 'Pages Vues', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#3b82f6"
              label={{ value: 'Temps (s)', angle: -90, position: 'insideRight' }}
            />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              formatter={(value: number, name: string) => [
                name === 'pageViews' ? value.toLocaleString('fr-FR') : `${value.toFixed(2)}s`,
                name === 'pageViews' ? 'Pages vues' : 'Temps de chargement'
              ]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px'
              }}
            />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="pageViews" 
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              name="Pages vues"
            />
            <Bar 
              yAxisId="right"
              dataKey="loadTime" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Temps de chargement"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};