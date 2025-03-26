import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import { CartProvider } from '../context/CartContext';
import './global.css';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smarty Delivery',
  description: 'Plataforma de pedidos de comida online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <MantineProvider>
          <CartProvider>{children}</CartProvider>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
