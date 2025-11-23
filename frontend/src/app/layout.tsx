import { ColorSchemeScript } from '@mantine/core';
import { Geist, Geist_Mono } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';
import Providers from '@/components/Providers/Providers';
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ColorSchemeScript defaultColorScheme="dark" />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
