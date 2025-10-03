import React from 'react';
// lib/posts에서 retrospective 전용 함수들을 가져온다고 가정합니다.
import { getRetrospectiveData, getAllRetrospectiveIds } from '@/lib/posts';
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
    const retrospectiveIds = getAllRetrospectiveIds();

    // 2. getAllRetrospectiveIds가 { id: string }[]을 반환한다고 가정하고,
    //    올바른 데이터(retrospective.id)를 slug에 매핑합니다.
    return retrospectiveIds.map((retrospective) => ({
        slug: retrospective.id,
    }));
}

export default async function Post({ params }: PostProps) {
    // 3. await를 사용하여 params에서 slug 값을 추출합니다.
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

export async function generateMetadata({ params }: PostProps) {
    // 3. await를 사용하여 params에서 slug 값을 추출합니다.
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