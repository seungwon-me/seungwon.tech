import React from 'react';
import { getRetrospectiveData, getAllRetrospectiveIds } from '../../../lib/posts';
import { notFound } from 'next/navigation';

interface PostProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const retrospectiveIds = getAllRetrospectiveIds();

    // Transform the data to match the expected format
    return retrospectiveIds.map((retrospective) => ({
        slug: retrospective.params.slug, // Adjust based on your actual data structure
    }));
}

export default async function Post({ params }: PostProps) {
    const { slug } = params;

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
    } catch {
        notFound();
    }
}