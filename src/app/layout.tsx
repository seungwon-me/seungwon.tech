import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seungwon's Blog",
  description: "madebyseungwonkim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
