import React from 'react';
import { getPostData, getAllPostIds } from '../../../lib/posts';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
    const postIds = getAllPostIds();
    return postIds.map((post) => ({
        slug: post.params.slug,
    }));
}

export default async function Post({ params }: PageProps) {
    const { slug } = await params;

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
    } catch {
        notFound();
    }
}