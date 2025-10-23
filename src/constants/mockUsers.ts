import type { User } from '../types/auth';

export const MOCK_USERS: (User & { password: string })[] =  [
  {
    id: '1',
    name: 'Administrator',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    provider: 'email' as const
  },
  {
    id: '2', 
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password',
    role: 'user',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    provider: 'email' as const
  }
];