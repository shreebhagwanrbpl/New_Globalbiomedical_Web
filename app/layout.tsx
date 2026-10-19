import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StoreProvider } from '@/context/StoreContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ScrollToTop } from '@/components/common/ScrollToTop';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Human Biomedical LLP | Clinical Diagnostic & Laboratory Equipment Supplier India',
  description:
    'Human Biomedical LLP: Authorized distributor of 3-Part & 5-Part Hematology Analyzers, Clinical Biochemistry Systems, Medical Microscopes, Centrifuges & Diagnostic Reagents across Rajasthan and All India Districts. Head Office: F-4, Tagore Nagar, 200 Feet Bypass Road, Jaipur, Rajasthan 302021.',
  keywords: [
    'Human Biomedical LLP',
    'Hematology in Nagaur',
    'Biomedical equipment Rajasthan',
    'Diagnostic equipment supplier India',
    'CBC analyzer Jaipur',
    'Clinical laboratory reagents',
    'Biochemistry analyzer India',
    'Pathology lab setup',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-slate-900 antialiased selection:bg-red-100 selection:text-red-700">
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
