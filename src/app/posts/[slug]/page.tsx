import React from 'react';
import { getPostData, getAllPostIds } from '@/lib/posts';
import { notFound } from 'next/navigation';

// 1. 이전과 동일하게 Promise 타입을 적용합니다.
// searchParams도 빌드 오류 방지를 위해 추가합니다.
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
    // 4. await를 사용하여 params에서 slug를 추출합니다.
    const { slug } = await params;

    try {
        // 5. getPostData 호출 시에도 'posts' 타입을 전달합니다.
        const postData = await getPostData('posts', slug);

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

export async function generateMetadata({ params }: PageProps) {
    // 4. await를 사용하여 params에서 slug를 추출합니다.
    const { slug } = await params;

    try {
        // 5. getPostData 호출 시에도 'posts' 타입을 전달합니다.
        const postData = await getPostData('posts', slug);

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