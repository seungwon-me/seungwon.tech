import { getSortedPostsData } from '@/lib/posts';
import ArticleList from '@/components/ArticleList';

export const metadata = {
  title: 'Retrospectives',
};

export default function Retrospectives() {
  const allPostsData = getSortedPostsData('retrospectives');

  return (
    <section>
      <h2>Retrospectives</h2>
      <ArticleList allPostsData={allPostsData} type="retrospectives" />
    </section>
  );
}
