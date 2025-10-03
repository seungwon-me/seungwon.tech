import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export const metadata = {
  title: 'Retrospectives',
};

export default function Retrospectives() {
  const allPostsData = getSortedPostsData('retrospectives');

  return (
    <section>
      <h2>Retrospectives</h2>
      <p className="lead">sorted by date.</p>

      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} style={{ listStyleType: 'none', listStyle: 'none' }}>
            <Link href={`/retrospectives/${id}`} style={{ color: 'gray', textDecoration: 'none' }}>
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
