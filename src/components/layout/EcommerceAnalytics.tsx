import React from 'react';

export const EcommerceAnalytics: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          📊 E-commerce Analytics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Dashboard de performance pour votre boutique en ligne
        </p>
        <div className="glass-effect rounded-2xl p-6 max-w-md mx-auto">
          <p className="text-gray-700 dark:text-gray-300">
            Connectez-vous pour accéder à vos métriques de performance
          </p>
        </div>
      </div>
    </div>
  );
};