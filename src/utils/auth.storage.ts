// utils/storage/auth.storage.ts
import { User } from '@/types';

const STORAGE_KEYS = {
  USER: 'auth_user',
  TOKEN: 'auth_token',
  AUTH_STATUS: 'auth_status',
} as const;

export const AuthStorage = {
  // User management
  getUser(): User | null {
    try {
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  setUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  // Token management
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  },

  // Auth status
  getAuthStatus(): boolean {
    return localStorage.getItem(STORAGE_KEYS.AUTH_STATUS) === 'true';
  },

  setAuthStatus(status: boolean): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_STATUS, status.toString());
  },

  // Clear all auth data
  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_STATUS);
  },

  // Check if auth data exists
  hasAuthData(): boolean {
    return !!this.getUser() || !!this.getToken();
  },
};