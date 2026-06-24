import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookBuddy",
  description: "A dark-mode AI reading companion for exploring books and PDFs.",
  icons: {
    icon: "/screen-favicon.png",
    shortcut: "/screen-favicon.png",
    apple: "/screen-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#0b0a09] text-zinc-100">{children}</body>
    </html>
  );
}
