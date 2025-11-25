/**
 * Validates if a health status indicates a healthy/operational state
 * @param status - Health status string to validate
 * @returns true if status matches healthy patterns, false otherwise
 */
export function isHealthyStatus(status: string): boolean {
  const HEALTHY_STATUSES = new Set(['healthy', 'connected']);

  return (
    HEALTHY_STATUSES.has(status) || // Known healthy statuses
    /^\d+ users$/.test(status) || // User count (e.g., "5 users")
    /^\d+ms$/.test(status) || // Response time (e.g., "120ms")
    /^(mock|azure) mode$/.test(status) // Operation mode
  );
}
