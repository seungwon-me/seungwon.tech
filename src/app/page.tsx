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
      <p className="lead intro-lead">
        Hello! I&apos;m Seungwon, a Web Application Developer with Spring Boot, Java, Kotlin.
      </p>

      <h3>Latest</h3>
      <ul className="content-list">
        {allContent.map(({ id, date, title, type }) => (
          <li key={id} className="content-item">
            <Link href={`/${type}/${id}`} className="content-link">
              {title}
            </Link>
            <br />
            <small className="meta">
              <time dateTime={date}>{date}</time>
              {type === 'retrospectives' && <span className="content-badge">Retrospective</span>}
            </small>
          </li>
        ))}
      </ul>

      <div className="more-link-wrap">
        <Link href="/articles" className="more-link">
          ... more
        </Link>
      </div>
    </section>
  );
}
