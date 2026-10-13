import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Ledgerly — waitlist", description: "Bookkeeping that closes itself." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
