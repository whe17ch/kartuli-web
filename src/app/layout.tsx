import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kartuli — Learn Georgian",
  description: "Learn the Georgian alphabet and language with calm guidance and cultural context",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream min-h-screen font-body">
        {children}
      </body>
    </html>
  );
}
