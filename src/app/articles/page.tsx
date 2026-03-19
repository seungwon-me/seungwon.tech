import { getSortedPostsData } from '@/lib/posts';
import ArticleList from '@/components/ArticleList';

export const metadata = {
  title: 'Articles',
  description: 'Java, Kotlin, Spring, DDD 중심의 아티클 모음',
  alternates: {
    canonical: '/articles',
  },
};

export default function Articles() {
  const allPostsData = getSortedPostsData('posts');

  return (
    <section>
      <h2>Articles</h2>
      <ArticleList allPostsData={allPostsData} type="posts" />
    </section>
  );
}
