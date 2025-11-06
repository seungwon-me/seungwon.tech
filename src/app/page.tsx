import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  const latestPosts = getSortedPostsData('posts').map(p => ({ ...p, type: 'posts' }));
  const latestRetrospectives = getSortedPostsData('retrospectives').map(r => ({ ...r, type: 'retrospectives' }));

  const allContent = [...latestPosts, ...latestRetrospectives]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section>
      <h2>Seungwon.Blog</h2>
      <p className="lead">
        Hello! I&apos;m Seungwon. <br/> a Web Application Developer with Spring Boot, Java, Kotlin.
      </p>

      <h3>Latest</h3>
      <ul>
        {allContent.map(({ id, date, title, type }) => (
          <li key={id} style={{ listStyleType: 'none', listStyle: 'none', marginBottom: '0.5rem' }}>
            <Link href={`/${type}/${id}`} style={{ color: 'gray', textDecoration: 'none' }}>
              {title}
            </Link>
            <br />
            <small className="meta">
              {date}
              {type === 'retrospectives' && <span style={{ marginLeft: '0.5rem', padding: '0.2rem 0.4rem', backgroundColor: '#eee', borderRadius: '3px', fontSize: '0.7rem' }}>Retrospective</span>}
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
