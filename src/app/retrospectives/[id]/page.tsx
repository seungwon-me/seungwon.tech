import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const posts = getAllPostIds('retrospectives');
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const postData = await getPostData('retrospectives', params.id);
  return {
    title: postData.title,
  };
}

export default async function RetrospectivePost({ params }: PageProps) {
  if (!params.id) {
    notFound();
  }
  const postData = await getPostData('retrospectives', params.id);

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
