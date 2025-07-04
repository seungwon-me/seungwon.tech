import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} className="mb-4">
            <Link href={`/posts/${id}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {title}
            </Link>
            <br />
            <small className="text-gray-500">
              {date}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
}
