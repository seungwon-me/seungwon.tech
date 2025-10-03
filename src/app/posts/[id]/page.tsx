import {getAllPostIds, getPostData} from '@/lib/posts';
import {notFound} from 'next/navigation';
import type { Metadata } from 'next';

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export function generateStaticParams() {
    return getAllPostIds('posts');
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const postData = await getPostData('posts', params.id);
    return {
        title: postData.title,
    };
};

export default async function Post({ params }: PageProps) {
    if (!params.id) {
        notFound();
        return; // 제어 흐름 명확화
    }
  const postData = await getPostData('posts', params.id);

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
