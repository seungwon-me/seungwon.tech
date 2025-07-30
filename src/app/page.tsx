import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main>
      <h1>Seungwon&apos;s Blog</h1>
        <a href="https://seungwon.me">Portfolio</a>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              {title}
            </Link>
            <br />
            <small>
              {date}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
}
