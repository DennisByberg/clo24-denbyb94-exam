/** User data from backend /api/auth/me endpoint */
export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

/** Authentication context state and methods */
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  login: () => void;
  logout: () => void;
}
