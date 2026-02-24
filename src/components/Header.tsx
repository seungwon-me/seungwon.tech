'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const isPostPage = pathname.startsWith('/posts/') || pathname.startsWith('/retrospectives/');
  const isArticlesPage = pathname.startsWith('/articles') || pathname.startsWith('/posts/');
  const isRetrospectivesPage = pathname.startsWith('/retrospectives');

  const getNavLinkClass = (target: 'about' | 'articles' | 'retrospectives') => {
    if (target === 'about') {
      return undefined;
    }

    if (target === 'articles' && isArticlesPage) {
      return styles.activeLink;
    }

    if (target === 'retrospectives' && isRetrospectivesPage) {
      return styles.activeLink;
    }

    return undefined;
  };

  return (
    <header>
      <nav className={styles.nav}>
        <div>
          {isPostPage ? (
            <Link href="/" aria-label="Back to home">prev.</Link>
          ) : (
            <Link href="/">Seungwon.tech</Link>
          )}
        </div>
        <div className='links'>
          <Link href="https://seungwon.me" className={getNavLinkClass('about')}>About me</Link>
          <Link href="/articles" className={getNavLinkClass('articles')} aria-current={isArticlesPage ? 'page' : undefined}>Articles</Link>
          <Link href="/retrospectives" className={getNavLinkClass('retrospectives')} aria-current={isRetrospectivesPage ? 'page' : undefined}>Retrospectives</Link>
        </div>
      </nav>
    </header>
  );
}
