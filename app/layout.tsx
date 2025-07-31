import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Listing App',
  description: 'A job listing application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}