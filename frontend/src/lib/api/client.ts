const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Custom error class for API errors with status code
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Get NextAuth session token from cookies
 * This works for both localhost (HTTP) and production (HTTPS) environments
 */
function getSessionToken(): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    // Check for both secure and non-secure cookie names
    if (name === '__Secure-next-auth.session-token' || name === 'next-auth.session-token') {
      return decodeURIComponent(value);
    }
  }
  return null;
}

// Centralized API client for all backend requests
export async function apiClient(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}${endpoint}`;

  // Get session token and add to Authorization header for cross-origin requests
  const sessionToken = getSessionToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Send cookies for NextAuth.js session
  });

  if (!response.ok) {
    // Try to get error message from response body
    let errorMessage = `API error: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.detail) {
        errorMessage = errorData.detail;
      }
    } catch {
      // If parsing fails, use statusText
    }
    throw new ApiError(response.status, errorMessage);
  }

  return response.json();
}
