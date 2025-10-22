import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ChartProps } from '../../types';

export const LoadTimeChart: React.FC<ChartProps> = ({ data, isLoading }) => {
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
        Temps de Chargement vs Taux de Rebond
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
              stroke="#6b7280"
            />
            <YAxis 
              yAxisId="left"
              stroke="#3b82f6"
              label={{ value: 'Temps (s)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#ef4444"
              label={{ value: 'Taux (%)', angle: -90, position: 'insideRight' }}
            />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              formatter={(value: number, name: string) => [
                name === 'loadTime' ? `${value.toFixed(2)}s` : `${value.toFixed(1)}%`,
                name === 'loadTime' ? 'Temps de chargement' : 'Taux de rebond'
              ]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px'
              }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="loadTime" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#1d4ed8' }}
              name="Temps de chargement"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="bounceRate" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#dc2626' }}
              name="Taux de rebond"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};