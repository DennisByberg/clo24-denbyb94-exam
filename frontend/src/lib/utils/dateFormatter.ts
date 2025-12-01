/**
 * Formats a date string to Swedish time format (HH:MM)
 * @param dateString - ISO date string to format
 * @returns Formatted time string in 24-hour format (e.g., "19:30")
 */
export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formats a date string to Swedish long date format
 * @param dateString - ISO date string to format
 * @returns Formatted date string with full month name (e.g., "1 december 2025")
 */
export function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats a date string to Swedish date and time format
 * @param dateString - ISO date string to format
 * @returns Formatted date and time string (e.g., "1 december 2025 19:30")
 */
export function formatDateTime(dateString: string): string {
  return `${formatDate(dateString)} ${formatTime(dateString)}`;
}

/**
 * Formats a Date object to YYYY-MM-DD format for API requests
 * @param date - Date object to format
 * @returns Formatted date string (e.g., "2025-12-01")
 */
export function formatDateForAPI(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
