import { ColorSchemeScript, Container } from '@mantine/core';
import { Fira_Sans } from 'next/font/google';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import AppProviders from '@/providers/AppProviders';
import Header from '@/components/Header/Header';

const firaSans = Fira_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-fira-sans',
});

export const metadata = {
  title: {
    default: 'Ace Group',
  },
  description: 'Full-stack booking platform for ESS Group facility management',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'en'} suppressHydrationWarning className={firaSans.variable}>
      <head>
        <ColorSchemeScript defaultColorScheme={'dark'} />
      </head>
      <body className={firaSans.className}>
        <AppProviders>
          <Header />
          <Container size={'xl'} py={'xl'}>
            {children}
          </Container>
        </AppProviders>
      </body>
    </html>
  );
}
