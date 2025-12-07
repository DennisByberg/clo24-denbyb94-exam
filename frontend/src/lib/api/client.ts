// Use empty string in production to use Next.js rewrites (same-origin)
// Use localhost:8000 in development for direct backend calls
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API client with automatic cookie handling for NextAuth session
export async function apiClient(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Sends session cookies to backend
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.detail) {
        errorMessage = errorData.detail;
      }
    } catch {
      // Use statusText if JSON parsing fails
    }
    throw new ApiError(response.status, errorMessage);
  }

  return response.json();
}
