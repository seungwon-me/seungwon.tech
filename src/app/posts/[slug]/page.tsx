import React from 'react';
import { getPostData, getAllPostIds } from '../../../lib/posts';
import { notFound } from 'next/navigation';

interface PostProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const postIds = getAllPostIds();

    // Transform the data to match the expected format
    return postIds.map((post) => ({
        slug: post.params.slug, // or just post.slug if getAllPostIds returns simple objects
    }));
}

export default async function Post({ params }: PostProps) {
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
    } catch {
        notFound();
    }
}