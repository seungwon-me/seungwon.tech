import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();
  const techPosts = allPostsData.filter(post => post.category === 'posts');
  const retrospectives = allPostsData.filter(post => post.category === 'retrospectives');

  return (
    <main>
      <h1>Seungwon&apos;s Blog</h1>
      <p>궁금한 점은 <a href="https://www.linkedin.com/in/ori0o0p/">linkedin</a> 또는 <a href="mailto:hello@seungwon.me">hello@seungwon.me</a>으로 연락 주세요.<br/>
          개인적(기술이 아닌 사람대사람)으로 궁금한 점이 아닌 이상, 여러분의 친구 gpt한테 찾아가시길.^^</p>
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
