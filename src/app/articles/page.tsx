import { getSortedPostsData } from '@/lib/posts';
import ArticleList from '@/components/ArticleList';

export const metadata = {
  title: 'Articles',
};

export default function Articles() {
  const allPostsData = getSortedPostsData('posts');

  return (
    <section>
      <h2>Articles</h2>
      <ArticleList allPostsData={allPostsData} />
    </section>
  );
}
