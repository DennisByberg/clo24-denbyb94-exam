import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

/**
 * Hook to access authentication context
 * @throws Error if used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
