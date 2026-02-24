import React from 'react';
import { getPostData, getAllPostIds } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// generateStaticParams의 반환 타입 정의
interface StaticParams {
    slug: string;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
    // 2. getAllPostIds 호출 시 'posts' 타입을 명시적으로 전달합니다.
    //    어떤 타입의 게시물 목록을 생성할지 알려주어야 합니다.
    const postIds = getAllPostIds('posts');

    // 3. 반환된 데이터 구조에 맞게 매핑 로직을 수정합니다.
    //    getAllPostIds는 { id: string }[]을 반환하므로, post.id를 slug에 매핑해야 합니다.
    return postIds.map((post) => ({
        slug: post.id,
    }));
}

export default async function Post({ params }: PageProps) {
    const { slug } = await params;

    try {
        const postData = await getPostData('posts', slug);

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
        console.error('Error loading post:', error);
        notFound();
    }
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;

    try {
        const postData = await getPostData('posts', slug);
        const description = postData.contentHtml.replace(/<[^>]*>?/gm, '').substring(0, 160);

        return {
            title: postData.title,
            description: description,
            openGraph: {
                title: postData.title,
                description: description,
                type: 'article',
                publishedTime: postData.date,
                url: `https://seungwon.tech/posts/${slug}`,
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
            title: 'Post Not Found',
            description: 'This post could not be found.',
        };
    }
}
