import { createTheme } from '@mantine/core';

// Brand Colors
const BRAND_RED = 'rgb(209, 28, 31)';
const BRAND_WHITE = 'rgb(245, 245, 240)';
const BRAND_BLACK = 'rgb(13,13,13)';

export const theme = createTheme({
  primaryColor: 'red',
  fontFamily:
    'var(--font-fira-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  colors: {
    // Primary brand color (red)
    red: [
      BRAND_WHITE, // 0
      'rgb(240, 140, 143)', // 1
      'rgb(235, 120, 123)', // 2
      'rgb(230, 100, 103)', // 3
      BRAND_RED, // 4 - Default
      'rgb(220, 60, 63)', // 5
      'rgb(215, 44, 47)', // 6
      'rgb(200, 40, 43)', // 7
      'rgb(180, 24, 26)', // 8
      'rgb(150, 20, 22)', // 9
    ],
    // Dark theme colors (based on brand black)
    dark: [
      BRAND_WHITE, // 0 - Text Color
      'rgb(120, 120, 120)', // 1
      'rgb(100, 100, 100)', // 2
      'rgb(80, 80, 80)', // 3
      'rgb(60, 60, 60)', // 4
      'rgb(40, 40, 40)', // 5
      'rgb(18, 18, 18)', // 6
      BRAND_BLACK, // 7 - Base brand black
      'rgb(5, 5, 5)', // 8
      'rgb(0, 0, 0)', // 9
    ],
  },
});
