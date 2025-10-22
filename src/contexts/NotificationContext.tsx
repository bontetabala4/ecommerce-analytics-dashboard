import React, { useState, useCallback } from 'react';
import type { 
  Notification, 
  NotificationsState, 
  NotificationContextType 
} from '../types/notification';
import { NotificationContext } from './NotificationContext'; 

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<NotificationsState>({
    notifications: [],
    unreadCount: 0,
  });

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setState((prev: NotificationsState) => ({
      notifications: [newNotification, ...prev.notifications],
      unreadCount: prev.unreadCount + 1,
    }));

    if (notification.type !== 'error') {
      setTimeout(() => {
        setState((prev: NotificationsState) => ({
          ...prev,
          notifications: prev.notifications.filter((n: Notification) => n.id !== newNotification.id),
        }));
      }, 5000);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setState((prev: NotificationsState) => {
      const notification = prev.notifications.find((n: Notification) => n.id === id);
      return {
        notifications: prev.notifications.filter((n: Notification) => n.id !== id),
        unreadCount: notification?.read ? prev.unreadCount : prev.unreadCount - 1,
      };
    });
  }, []);

  const markAsRead = useCallback((id: string) => {
    setState((prev: NotificationsState) => ({
      ...prev,
      notifications: prev.notifications.map((n: Notification) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: prev.unreadCount - 1,
    }));
  }, []);

  const markAllAsRead = useCallback(() => {
    setState((prev: NotificationsState) => ({
      notifications: prev.notifications.map((n: Notification) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  }, []);

  const clearAll = useCallback(() => {
    setState({
      notifications: [],
      unreadCount: 0,
    });
  }, []);

  const value: NotificationContextType = {
    ...state,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};