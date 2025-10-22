import { createContext } from 'react';
import type { AuthContextType } from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthProvider } from './AuthContext.tsx';
export { useAuth } from '../hooks/useAuth';
export * from '../types/auth';