import type { Metadata } from "next";
import "./globals.css";
import { Raleway } from 'next/font/google';

const font = Raleway({
  subsets: ['latin'], // Optionally, add more subsets like 'latin-ext', 'cyrillic', etc.
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'], // Use specific font weights
});

export const metadata: Metadata = {
  title: "Ayomide's Github User Profile Search",
  description: "GitHub User Profile Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        {children}
      </body>
    </html>
  );
}
