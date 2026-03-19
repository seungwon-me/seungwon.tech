import type { Metadata } from "next";
import { Inter, Noto_Serif_KR } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalSearch from "@/components/GlobalSearch";
import { getSearchablePostsData } from "@/lib/posts";
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

const siteName = "Seungwon.tech";
const siteDescription = "Java, Kotlin, Spring, DDD를 기록하는 개인 기술 블로그";
const siteUrl = "https://seungwon.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allPosts = getSearchablePostsData('posts');
  const allRetrospectives = getSearchablePostsData('retrospectives');
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
