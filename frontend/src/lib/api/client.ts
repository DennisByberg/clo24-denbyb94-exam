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

// Centralized API client for all backend requests
export async function apiClient(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

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
