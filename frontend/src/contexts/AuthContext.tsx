'use client';

import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

/** User data from backend /api/auth/me endpoint */
interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

/** Authentication context state and methods */
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Fetch current user from backend authentication endpoint
 */
async function fetchCurrentUser(): Promise<User | null> {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://app-ace-group-backend.azurewebsites.net';
    const response = await fetch(`${backendUrl}/api/auth/me`, {
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
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://app-ace-group-backend.azurewebsites.net';

    // Lokalt: Ingen Azure Easy Auth, gör ingenting (mock user används)
    if (backendUrl.includes('localhost')) {
      alert('Login is disabled in local development mode (MOCK_AUTH=true)');
      return;
    }

    // Production frontend URL (Azure Static Web Apps)
    const frontendUrl = 'https://happy-flower-054f3af03.3.azurestaticapps.net';
    const redirectUri = `${frontendUrl}/auth/callback`;
    window.location.href = `${backendUrl}/.auth/login/google?post_login_redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  const logout = () => {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://app-ace-group-backend.azurewebsites.net';

    // Lokalt: MOCK_AUTH är aktivt, logout är inte möjligt
    if (backendUrl.includes('localhost')) {
      alert(
        'Logout is disabled in local development mode (MOCK_AUTH is enabled).\nYou are always logged in as the mock user during local development.'
      );
      return;
    }

    // Production frontend URL (Azure Static Web Apps)
    const frontendUrl = 'https://happy-flower-054f3af03.3.azurestaticapps.net';
    const redirectUri = `${frontendUrl}/auth/logout`;
    window.location.href = `${backendUrl}/.auth/logout?post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`;
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
