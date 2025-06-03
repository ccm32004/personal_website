import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import CyberpunkFooter from './components/CyberpunkFooter';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: "Cece's Portfolio",
  description: 'Software Developer Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-cyber-black text-white antialiased">
        <div className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
          {children}
          <CyberpunkFooter />
        </div>
      </body>
    </html>
  );
}
