import { getPostData, getAllPostIds } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  if (!postData) {
    notFound();
  }

  return (
    <article className="prose prose-invert mx-auto py-8">
      <h1 className="text-4xl font-bold">{postData.title}</h1>
      <div className="text-gray-500 mb-8">
        {postData.date}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
