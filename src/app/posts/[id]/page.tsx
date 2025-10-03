import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// 1. searchParams의 타입도 Promise로 감싸줍니다.
type PageProps = {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams() {
    return getAllPostIds('posts');
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const { id } = await params;
    const postData = await getPostData('posts', id);
    return {
        title: postData.title,
    };
};

export default async function Post({ params }: PageProps) {
    const { id } = await params;

    if (!id) {
        notFound();
        return;
    }
    const postData = await getPostData('posts', id);

    return (
        <article>
            <h1>{postData.title}</h1>
            <div className="meta">
                {postData.date}
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    );
}