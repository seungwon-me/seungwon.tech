import { getSortedPostsData } from '@/lib/posts';
import ArticleList from '@/components/ArticleList';

export const metadata = {
  title: 'Retrospectives',
  description: '실전 개발 회고와 학습 기록',
  alternates: {
    canonical: '/retrospectives',
  },
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
