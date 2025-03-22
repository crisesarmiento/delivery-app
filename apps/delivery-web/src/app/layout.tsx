import './global.css';

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
    <html lang="en">
      <body>
        {/*
          Mantine providers will be added here when dependencies are installed.
          The structure will look like:
          <MantineProvider>
            <ColorSchemeProvider>
              {children}
            </ColorSchemeProvider>
          </MantineProvider>
        */}
        {children}
      </body>
    </html>
  );
}
