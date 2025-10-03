import React from 'react';
import { getPostData, getAllPostIds } from '@/lib/posts';
import { notFound } from 'next/navigation';

// Next.js App Router의 올바른 타입 정의
interface PageProps {
    params: {
        slug: string;
    };
}

// generateStaticParams의 반환 타입 정의
interface StaticParams {
    slug: string;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
    const postIds = getAllPostIds();
    return postIds.map((post) => ({
        slug: post.params.slug,
    }));
}

export default async function Post({ params }: PageProps) {
    const { slug } = params;

    try {
        const postData = await getPostData(slug);

        return (
            <article>
                <h1>{postData.title}</h1>
                <div>
                    {postData.date}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        );
    } catch (error) {
        console.error('Error loading post:', error);
        notFound();
    }
}

// 메타데이터 생성 함수 (선택사항)
export async function generateMetadata({ params }: PageProps) {
    const { slug } = params;

    try {
        const postData = await getPostData(slug);

        return {
            title: postData.title,
            description: `Read ${postData.title}`,
        };
    } catch {
        return {
            title: 'Post Not Found',
        };
    }
}
