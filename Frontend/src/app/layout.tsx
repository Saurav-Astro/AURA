import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/data-provider";

export const metadata: Metadata = {
  title: "Aura Analytics | Enterprise Dashboard",
  description: "Advanced enrollment analytics and forecasting suite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
