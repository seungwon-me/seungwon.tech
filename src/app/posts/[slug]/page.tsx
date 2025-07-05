import React from 'react';
import { getPostData, getAllPostIds } from '../../../lib/posts';
import { notFound } from 'next/navigation';

interface PostProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({ slug: path.slug }));
}

export default async function Post({ params }: PostProps) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    notFound();
  }

  return (
    <article>
      <h1>{postData.title}</h1>
      <div>
        {postData.date}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
