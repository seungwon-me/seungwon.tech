'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const isPostPage = pathname.startsWith('/posts/') || pathname.startsWith('/retrospectives/');

  return (
    <header>
      <nav className={styles.nav}>
        <div>
          {isPostPage ? (
            <Link href="/">prev.</Link>
          ) : (
            <Link href="/">Seungwon.tech</Link>
          )}
        </div>
        <div style={{ fontSize: '1rem' }}>
          <Link href="https://seungwon.me">About me</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/retrospectives">Retrospectives</Link>
        </div>
      </nav>
    </header>
  );
}
