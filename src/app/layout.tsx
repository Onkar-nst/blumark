import type { Metadata } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FooterReveal from "@/components/layout/FooterReveal";
import WhatsAppFab from "@/components/layout/WhatsAppFab";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const condensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blumarkindustries.in"),
  title: {
    default: "Blumark Industries | Pallet Trucks, Stackers & Lifting Equipment",
    template: "%s | Blumark Industries",
  },
  description:
    "Pallet trucks, manual & electric stackers, order pickers and scissor work platforms. Based in Mumbai, supplying across India.",
  openGraph: {
    type: "website",
    siteName: "Blumark Industries",
    images: ["/images/site/hero-warehouse.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${condensed.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        {/* The page is a white sheet (z-10) lying over the footer; see FooterReveal */}
        <main className="relative z-10 flex-1 bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] lg:rounded-b-[2rem]">
          {children}
        </main>
        <FooterReveal>
          <Footer />
        </FooterReveal>
        <WhatsAppFab />
      </body>
    </html>
  );
}
