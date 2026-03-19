import React from 'react';
import type { Metadata } from 'next';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface PostProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface StaticParams {
  slug: string;
}

const siteUrl = 'https://seungwon.tech';

const toPlainText = (html: string) =>
  html
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const toDescription = (html: string, max = 155) => {
  const plain = toPlainText(html);
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).trimEnd()}…`;
};

export async function generateStaticParams(): Promise<StaticParams[]> {
  const posts = getAllPostIds('retrospectives');
  return posts.map((post) => ({ slug: post.id }));
}

export default async function Post({ params }: PostProps) {
  const { slug } = await params;

  try {
    const postData = await getPostData('retrospectives', slug);
    const description = toDescription(postData.contentHtml);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: postData.title,
      datePublished: postData.date,
      dateModified: postData.date,
      author: {
        '@type': 'Person',
        name: 'Seungwon',
      },
      description,
      image: `${siteUrl}/og-image.png`,
      mainEntityOfPage: `${siteUrl}/retrospectives/${slug}`,
    };

    return (
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <header className="article-header">
          <h1>{postData.title}</h1>
          <time className="article-meta" dateTime={postData.date}>{postData.date}</time>
        </header>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    );
  } catch (error) {
    console.error('Error loading retrospective:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const postData = await getPostData('retrospectives', slug);
    const description = toDescription(postData.contentHtml);
    const canonicalUrl = `${siteUrl}/retrospectives/${slug}`;

    return {
      title: postData.title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: postData.title,
        description,
        type: 'article',
        publishedTime: postData.date,
        url: canonicalUrl,
        images: [
          {
            url: `${siteUrl}/og-image.png`,
            width: 1200,
            height: 630,
            alt: postData.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: postData.title,
        description,
        images: [`${siteUrl}/og-image.png`],
      },
    };
  } catch {
    return {
      title: 'Retrospective Not Found',
      description: 'This retrospective could not be found.',
    };
  }
}
