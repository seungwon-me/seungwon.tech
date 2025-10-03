import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export const metadata = {
  title: 'Articles',
};

export default function Articles() {
  const allPostsData = getSortedPostsData('posts');

  return (
    <section>
      <h2>Articles</h2>
      <p className="lead">sorted by date.</p>

      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} style={{ listStyleType: 'none', listStyle: 'none' }}>
            <Link href={`/posts/${id}`} style={{ color: 'gray', textDecoration: 'none' }}>
              {title}
            </Link>
            <br />
            <small className="meta">
              {date}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
