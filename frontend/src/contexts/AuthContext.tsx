'use client';

import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { AuthContextType, User } from '@/types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Fetch current user from backend authentication endpoint
 */
async function fetchCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include',
    });

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      console.warn('User not authenticated or backend unavailable');
      return null;
    }

    return response.json();
  } catch (error) {
    console.warn('Error fetching current user:', error);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    data: user = null,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const login = () => {
    window.location.href = '/.auth/login/google';
  };

  const logout = () => {
    window.location.href = '/.auth/logout';
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isError,
    refetch,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
