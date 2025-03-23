import React from 'react';
import './global.css';
import { ThemeProvider } from './ThemeProvider';
import { Providers } from './providers';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Smarty Delivery',
  description: 'Order food from your favorite restaurants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          <Providers>{children}</Providers>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
