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
  description: "Explore our festive gujiyas, cakes, chocolates, brownies, cupcakes, and combo offers.",
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
