import { createTheme } from '@mantine/core';

// Brand Colors
const BRAND_RED = 'rgba(209, 28, 31, 1)';
const BRAND_WHITE = 'rgba(245, 245, 240, 1)';
const BRAND_BLACK = 'rgba(6, 5, 6, 1)';

export const theme = createTheme({
  primaryColor: 'brand',
  fontFamily:
    'var(--font-fira-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  colors: {
    // Primary brand color (red)
    brand: [
      '#fde8e9', // 0 - Lightest
      '#f9c9cb', // 1
      '#f5a9ad', // 2
      '#f18a8f', // 3
      '#ed6b71', // 4
      '#e94c53', // 5
      '#e52d35', // 6
      BRAND_RED, // 7 - Base brand red
      '#b51619', // 8
      '#9f1316', // 9 - Darkest
    ],
    // Light theme colors (based on brand white)
    light: [
      BRAND_WHITE, // 0 - Base light color
      '#f5f0e8', // 1
      '#ebe3d6', // 2
      '#e1d6c4', // 3
      '#d7c9b2', // 4
      '#cdbca0', // 5
      '#c3af8e', // 6
      '#b9a27c', // 7
      '#af956a', // 8
      '#a58858', // 9
    ],
    // Dark theme colors (based on brand black)
    dark: [
      BRAND_WHITE, // 0 - Lightest (245, 245, 240)
      'rgba(115, 115, 115, 1)', // 1
      'rgba(95, 95, 95, 1)', // 2
      'rgba(75, 75, 75, 1)', // 3
      'rgba(55, 55, 55, 1)', // 4
      'rgba(35, 35, 35, 1)', // 5
      'rgba(15, 15, 15, 1)', // 6
      BRAND_BLACK, // 7 - Base brand black (6, 5, 6)
      'rgba(5, 4, 5, 1)', // 8
      'rgba(0, 0, 0, 1)', // 9 - Darkest
    ],
  },
});
