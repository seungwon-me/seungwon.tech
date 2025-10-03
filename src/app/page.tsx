import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  const latestPosts = getSortedPostsData('posts', 5);

  return (
    <section>
      <h2>Seungwon.Blog</h2>
      <p className="lead">
        Hello! I'm Seungwon. <br/> a Web Application Developer with Spring Boot, Java, Kotlin.
      </p>

      <h3>Latest</h3>
      <ul>
        {latestPosts.map(({ id, date, title }) => (
          <li key={id} style= {{ listStyleType: 'none', listStyle: 'none' }}>
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

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/articles" style={{ color: 'gray', textDecoration: 'none', fontWeight: 'bold' }}>
          ... more
        </Link>
      </div>
    </section>
  );
}
