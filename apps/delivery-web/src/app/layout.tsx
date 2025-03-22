import React from 'react';
import './global.css';
import { MantineProvider } from '@mantine/core';
import { Providers } from './providers';

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
        <MantineProvider defaultColorScheme="light">
          <Providers>{children}</Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
