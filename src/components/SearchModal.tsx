'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getContentHref } from '@/lib/contentRoute';
import styles from './SearchModal.module.css';

type Post = {
  id: string;
  title: string;
  date: string;
  type: 'posts' | 'retrospectives';
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPosts: Post[];
}

export default function SearchModal({ isOpen, onClose, allPosts }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const activeDescendantId = selectedIndex >= 0 ? `search-option-${selectedIndex}` : undefined;

  const filteredPosts = searchTerm
    ? allPosts.filter(post =>
      post.title.toLowerCase().replace(/\s/g, '').includes(searchTerm.toLowerCase().replace(/\s/g, '')) ||
      post.date.includes(searchTerm)
    )
    : [];
  const showNoResults = searchTerm.length > 0 && filteredPosts.length === 0;

  useEffect(() => {
    if (!isOpen) return;

    setSearchTerm('');
    setSelectedIndex(-1);
    const timer = setTimeout(() => inputRef.current?.focus(), 50);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex(prevIndex =>
        prevIndex < filteredPosts.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : filteredPosts.length - 1
      );
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      event.preventDefault();
      const selectedPost = filteredPosts[selectedIndex];
      if (selectedPost) {
        router.push(getContentHref(selectedPost.type, selectedPost.id));
        onClose();
      }
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedItem = resultsRef.current.children[selectedIndex] as HTMLLIElement;
      selectedItem?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement;

        if (event.shiftKey) {
          if (active === first || !modalRef.current.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} />
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        <h2 id="search-modal-title">Search</h2>
        <input
          ref={inputRef}
          id="search-modal-input"
          type="text"
          placeholder="Search articles and retrospectives..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
          aria-label="Search articles and retrospectives"
          role="combobox"
          aria-expanded={filteredPosts.length > 0}
          aria-controls="search-modal-results"
          aria-activedescendant={activeDescendantId}
        />
        <p className={`meta ${styles.hint}`} aria-live="polite">
          {searchTerm.length === 0 ? 'Type to search' : `${filteredPosts.length} result${filteredPosts.length === 1 ? '' : 's'}`}
        </p>
        <p className={`meta ${styles.helper}`}>
          Use ↑ ↓ to move, Enter to open, Esc to close.
        </p>
        <ul ref={resultsRef} id="search-modal-results" role="listbox" aria-label="Search results" className={styles.results}>
          {showNoResults && (
            <li className={`meta ${styles.empty}`}>
              No matching posts.
            </li>
          )}
          {filteredPosts.map(({ id, title, type, date }, index) => (
            <li
              key={id}
              id={`search-option-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={`${styles.resultItem} ${index === selectedIndex ? styles.resultItemActive : ''}`.trim()}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <Link href={getContentHref(type, id)} onClick={onClose} className={styles.resultLink}>
                {title}
              </Link>
              <small className="meta" style={{ display: 'block', marginTop: '4px' }}>
                <time dateTime={date}>{date}</time>
                <span className="content-badge">{type === 'retrospectives' ? 'Retrospective' : 'Post'}</span>
              </small>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
