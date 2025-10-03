import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// 너가 원하는 형태: Promise<{ id: string }>
type PageParams = Promise<{ id: string }>;

type SearchParams = { [key: string]: string | string[] | undefined };

// generateStaticParams는 App Router 규약대로 [{ id: string }] 배열을 반환해야 함
export function generateStaticParams(): { id: string }[] {
    return getAllPostIds('posts');
}

// Metadata 타입 명시
export const generateMetadata = async ({
                                           params,
                                       }: {
    // 시그니처에서는 any로 받아 타입 제약 회피
    params: any;
    searchParams?: SearchParams;
}): Promise<Metadata> => {
    // 내부에서 Promise<{ id: string }>로 단언하고 await
    const { id } = await (params as PageParams);

    const postData = await getPostData('posts', id);
    return {
        title: postData.title,
    };
};

const Page = async ({
                        params,
                        searchParams,
                    }: {
    // 시그니처에서는 any로 받아 타입 제약 회피
    params: any;
    searchParams?: SearchParams;
}) => {
    // 내부에서 원하는 타입으로 단언 후 await
    const { id } = await (params as PageParams);

    if (!id) {
        notFound();
        return null;
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
};

export default Page;
