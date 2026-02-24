import React from 'react';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

// 1. PostProps 타입을 Promise를 사용하도록 수정합니다.
interface PostProps {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// generateStaticParams의 반환 타입 정의
interface StaticParams {
    slug: string;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
    const posts = getAllPostIds('retrospectives');
    return posts.map((post) => ({
        slug: post.id,
    }));
}

export default async function Post({ params }: PostProps) {
    const { slug } = await params;

    try {
        const postData = await getPostData('retrospectives', slug);

        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: postData.title,
            datePublished: postData.date,
            author: {
                '@type': 'Person',
                name: 'Seungwon',
            },
            description: postData.contentHtml.replace(/<[^>]*>?/gm, '').substring(0, 160),
            image: `https://seungwon.tech/og-image.png`,
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

export async function generateMetadata({ params }: PostProps) {
    const { slug } = await params;

    try {
        const postData = await getPostData('retrospectives', slug);
        const description = postData.contentHtml.replace(/<[^>]*>?/gm, '').substring(0, 160);

        return {
            title: postData.title,
            description: description,
            openGraph: {
                title: postData.title,
                description: description,
                type: 'article',
                publishedTime: postData.date,
                url: `https://seungwon.tech/retrospectives/${slug}`,
                images: [
                    {
                        url: `https://seungwon.tech/og-image.png`,
                        width: 1200,
                        height: 630,
                        alt: postData.title,
                    },
                ],
            },
        };
    } catch {
        return {
            title: 'Retrospective Not Found',
            description: 'This retrospective could not be found.',
        };
    }
}
