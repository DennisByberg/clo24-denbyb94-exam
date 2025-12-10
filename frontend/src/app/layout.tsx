import { ColorSchemeScript, Container, Flex } from '@mantine/core';
import { Fira_Sans } from 'next/font/google';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import AppProviders from '@/providers/AppProviders';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const firaSans = Fira_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-fira-sans',
});

export const metadata = {
  title: {
    default: 'Ace Group',
  },
  description: 'Ace Group Booking Platform',
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
          <Flex display={'flex'} direction={'column'} mih={'100vh'}>
            <Header />
            <Container size={'md'} py={'xl'}>
              {children}
            </Container>
            <Footer />
          </Flex>
        </AppProviders>
      </body>
    </html>
  );
}
