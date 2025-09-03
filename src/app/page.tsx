import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();
  const techPosts = allPostsData.filter(post => post.category === 'posts');
  const retrospectives = allPostsData.filter(post => post.category === 'retrospectives');

  return (
    <main>
      <h1>Seungwon&apos;s Blog</h1>
      <a href="https://seungwon.me">Portfolio</a>

      <div className="container">
        <div className="column">
          <h2>기술</h2>
          <ul>
            {techPosts.map(({ id, date, title }) => (
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
        </div>

        <div className="column">
          <h2>회고</h2>
          <ul>
            {retrospectives.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`/retrospectives/${id}`}>
                  {title}
                </Link>
                <br />
                <small>
                  {date}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
