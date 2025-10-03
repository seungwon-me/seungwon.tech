import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

// 1. PageProps 타입을 Promise를 사용하도록 수정합니다.
type PageProps = {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
    const posts = getAllPostIds('retrospectives');
    return posts.map((post) => ({
        id: post.id,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    // 2. await로 params 값을 추출합니다.
    const { id } = await params;
    const postData = await getPostData('retrospectives', id);
    return {
        title: postData.title,
    };
}

export default async function RetrospectivePost({ params }: PageProps) {
    // 3. await로 params 값을 추출합니다.
    const { id } = await params;

    if (!id) {
        notFound();
        // return 문을 추가하여 제어 흐름을 명확하게 합니다.
        return;
    }
    const postData = await getPostData('retrospectives', id);

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