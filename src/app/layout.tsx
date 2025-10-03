import type { Metadata } from "next";
import { Inter, Noto_Serif_KR } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalSearch from "@/components/GlobalSearch";
import { getSortedPostsData } from "@/lib/posts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Seungwon.tech",
  description: "A minimal, typography-focused blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allPosts = getSortedPostsData('posts').map(p => ({ ...p, type: 'posts' as const }));
  const allRetrospectives = getSortedPostsData('retrospectives').map(p => ({ ...p, type: 'retrospectives' as const }));
  const allSearchablePosts = [...allPosts, ...allRetrospectives];

  return (
    <html lang="ko">
      <body className={`${inter.variable} ${notoSerifKr.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <GlobalSearch allPosts={allSearchablePosts} />
      </body>
    </html>
  );
}
