import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kartuli — Learn Georgian",
  description: "Learn the Georgian alphabet and language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream min-h-screen">
        {children}
      </body>
    </html>
  );
}
