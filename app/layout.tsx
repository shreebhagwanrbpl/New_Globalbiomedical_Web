import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StoreProvider } from '@/context/StoreContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ScrollToTop } from '@/components/common/ScrollToTop';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const displayFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AAXOL Spices | Pure Artisanal Indian Spices & Masalas by Organium',
  description:
    'Discover AAXOL by Organium: authentic, single-origin, hand-pounded Indian spices, artisanal masalas, and pure seasonings delivered fresh to your doorstep across India and worldwide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${displayFont.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-spice-ivory text-spice-espresso antialiased selection:bg-spice-peach selection:text-spice-terracotta">
        <StoreProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ScrollToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
