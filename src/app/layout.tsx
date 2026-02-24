import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ras & Batter - Holi Special Menu",
  description: "Explore our exquisite, handcrafted bakes including festive gujiyas, cakes, chocolates, and combo offers.",
  openGraph: {
    title: "Ras & Batter - The Holi Collection",
    description: "Immerse yourself in Masterchef-level indulgence and vibrant festive flavors with our Holi Special Menu.",
    url: "https://rasbatter.vercel.app",
    siteName: "Ras & Batter",
    images: [
      {
        url: "https://rasbatter.vercel.app/images/hero-platter.png", // Must be absolute for WhatsApp/Socials to fetch
        width: 1920,
        height: 1080,
        alt: "Ras & Batter Holi Special Dessert Platter",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ras & Batter - The Holi Collection",
    description: "Immerse yourself in Masterchef-level indulgence and vibrant festive flavors.",
    images: ["https://rasbatter.vercel.app/images/hero-platter.png"],
  },
};

import { Providers } from "@/context/Providers";
import FloatingCart from "@/components/FloatingCart";
import FloatingMenu from "@/components/FloatingMenu";
import CartBottomSheet from "@/components/CartBottomSheet";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${playfair.variable} antialiased`}
      >
        <Providers>
          <ParallaxBackground />
          <div className="relative z-10">
            {children}
          </div>
          <FloatingCart />
          <FloatingMenu />
          <CartBottomSheet />
        </Providers>
      </body>
    </html>
  );
}
