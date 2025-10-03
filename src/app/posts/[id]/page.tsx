import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPostIds('posts');
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  const postData = await getPostData('posts', id);
  return {
    title: postData.title,
  };
}

export default async function Post({ params: { id } }: { params: { id: string } }) {
  if (!id) {
    notFound();
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
