import { ColorSchemeScript } from '@mantine/core';
import { Geist, Geist_Mono } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';
import AppProviders from '@/providers/AppProviders';
import Header from '@/components/Header/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// TODO: Add Metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProviders>
          <Header />
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
