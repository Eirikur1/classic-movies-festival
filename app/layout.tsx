import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

// Metadata for SEO and browser tab title.
export const metadata: Metadata = {
  title: "Reykjavík Classics — a festival of restored cinema",
  description:
    "A weekend of the greatest classic films, screened on 35mm in the heart of Reykjavík.",
};

// The root layout wraps every page. Applying `bg-cinema-bg` and `text-white`
// here means individual pages don't have to repeat those defaults.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cinema-bg text-white antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
