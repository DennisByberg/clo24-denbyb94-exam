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
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('sv-SE', {
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
