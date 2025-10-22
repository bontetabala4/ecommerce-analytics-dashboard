import { createContext } from 'react';
import type { Notification, NotificationsState } from '../types/notification';

export interface NotificationContextType extends NotificationsState {
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export { NotificationProvider } from './NotificationContext.tsx';
export { useNotifications } from '../hooks/useNotifications';
export * from '../types/notification';
