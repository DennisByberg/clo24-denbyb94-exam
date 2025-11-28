import { ColorSchemeScript, Container } from '@mantine/core';
import '@mantine/core/styles.css';
import AppProviders from '@/providers/AppProviders';
import Header from '@/components/Header/Header';

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
    <html lang={'en'} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme={'dark'} />
      </head>
      <body>
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
