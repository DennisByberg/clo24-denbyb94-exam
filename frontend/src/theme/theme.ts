import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'dark',
  colors: {
    dark: [
      'rgba(213, 215, 224, 1)', // 0
      'rgba(172, 174, 191, 1)', // 1
      'rgba(140, 143, 163, 1)', // 2
      'rgba(102, 105, 128, 1)', // 3
      'rgba(77, 79, 102, 1)', // 4
      'rgba(52, 53, 74, 1)', // 5
      'rgba(43, 44, 61, 1)', // 6
      'rgba(22, 22, 28, 1)', // 7 - (Page Background)
      'rgba(15, 15, 15, 1)', // 8
      '#000000ff', // 9
    ],
    yellow: [
      '#fff9db', // 0
      '#fff3bf', // 1
      '#ffec99', // 2 - (Text)
      '#ffe066', // 3
      '#ffd43b', // 4
      '#fcc419', // 5
      '#fab005', // 6
      '#f59f00', // 7
      '#f08c00', // 8 - (Default)
      '#e67700', // 9
    ],
  },
});
