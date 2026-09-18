import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { RoleProvider } from '@/context/RoleContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { SearchProvider } from '@/context/SearchContext';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchOverlay } from '@/components/search/SearchOverlay';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "MUDRA FASHIONS — Men's Wear • Uniforms • Fabrics",
  description: "Official premium website for MUDRA FASHIONS. Executive menswear, luxury shirting, bespoke tailoring, and fine textile fabrics.",
  generator: 'Mudra Fashions',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#C4A35A',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable} bg-[#FBF8F1] text-[#212529] antialiased selection:bg-[#C4A35A] selection:text-white`}>
      <body className="min-h-screen flex flex-col font-sans">
        <RoleProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <SearchOverlay />
              </SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
