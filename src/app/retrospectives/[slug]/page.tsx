import React from 'react';
import { getRetrospectiveData, getAllRetrospectiveIds } from '../../../lib/posts';
import { notFound } from 'next/navigation';

// Next.js App Router의 올바른 타입 정의
interface PostProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// generateStaticParams의 반환 타입 정의
interface StaticParams {
    slug: string;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
    const retrospectiveIds = getAllRetrospectiveIds();

    // Transform the data to match the expected format
    return retrospectiveIds.map((retrospective) => ({
        slug: retrospective.params.slug, // Adjust based on your actual data structure
    }));
}

export default async function Post({ params }: PostProps) {
    // params는 Promise이므로 await 필요
    const { slug } = await params;

    try {
        const postData = await getRetrospectiveData(slug);

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
        console.error('Error loading retrospective:', error);
        notFound();
    }
}

// 메타데이터 생성 함수 (선택사항)
export async function generateMetadata({ params }: PostProps) {
    const { slug } = await params;

    try {
        const postData = await getRetrospectiveData(slug);

        return {
            title: postData.title,
            description: `Read retrospective: ${postData.title}`,
        };
    } catch {
        return {
            title: 'Retrospective Not Found',
        };
    }
}