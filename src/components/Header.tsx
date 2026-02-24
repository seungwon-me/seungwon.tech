'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const isPostPage = pathname.startsWith('/posts/') || pathname.startsWith('/retrospectives/');

  const getNavLinkClass = (target: 'about' | 'articles' | 'retrospectives') => {
    if (target === 'about') {
      return undefined;
    }

    if (target === 'articles' && pathname.startsWith('/articles')) {
      return styles.activeLink;
    }

    if (target === 'retrospectives' && pathname.startsWith('/retrospectives')) {
      return styles.activeLink;
    }

    return undefined;
  };

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
        <div className='links'>
          <Link href="https://seungwon.me" className={getNavLinkClass('about')}>About me</Link>
          <Link href="/articles" className={getNavLinkClass('articles')}>Articles</Link>
          <Link href="/retrospectives" className={getNavLinkClass('retrospectives')}>Retrospectives</Link>
        </div>
      </nav>
    </header>
  );
}
