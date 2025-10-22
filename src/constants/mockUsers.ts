import type { User } from '../types/auth';

export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password',
    name: 'Administrator',
    role: 'admin',
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'password',
    name: 'Demo user',
    role: 'user',
  }
];