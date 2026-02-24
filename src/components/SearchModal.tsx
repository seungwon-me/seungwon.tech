'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

  const [isInputFocused, setIsInputFocused] = useState(false);
  const activeDescendantId = selectedIndex >= 0 ? `search-option-${selectedIndex}` : undefined;

  const filteredPosts = searchTerm
    ? allPosts.filter(post =>
        post.title.toLowerCase().replace(/\s/g, '').includes(searchTerm.toLowerCase().replace(/\s/g, '')) ||
        post.date.includes(searchTerm)
      )
    : [];
  const showNoResults = searchTerm.length > 0 && filteredPosts.length === 0;

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
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
        router.push(`/${selectedPost.type}/${selectedPost.id}`);
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
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleGlobalKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    background: '#FAFAF8',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  };

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: `1px solid ${isInputFocused ? '#df7500' : '#ccc'}`,
    borderRadius: '4px',
    marginBottom: '20px',
    outline: 'none',
  };

  const resultsListStyle: React.CSSProperties = {
    maxHeight: '400px',
    overflowY: 'auto',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  };

  return (
    <>
      <div style={backdropStyle} />
      <div
        ref={modalRef}
        style={modalStyle}
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
          style={inputStyle}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          aria-label="Search articles and retrospectives"
          role="combobox"
          aria-expanded={filteredPosts.length > 0}
          aria-controls="search-modal-results"
          aria-activedescendant={activeDescendantId}
        />
        <p className="meta" aria-live="polite" style={{ marginBottom: '10px' }}>
          {searchTerm.length === 0 ? 'Type to search' : `${filteredPosts.length} result${filteredPosts.length === 1 ? '' : 's'}`}
        </p>
        <ul ref={resultsRef} id="search-modal-results" role="listbox" aria-label="Search results" style={resultsListStyle}>
          {showNoResults && (
            <li className="meta" style={{ padding: '8px', listStyle: 'none' }}>
              No matching posts.
            </li>
          )}
          {filteredPosts.map(({ id, title, type }, index) => (
            <li
              key={id}
              id={`search-option-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              style={{
                marginBottom: '10px',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: index === selectedIndex ? '#f0f0f0' : 'transparent',
                transition: 'background-color 0.15s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <Link href={`/${type}/${id}`} onClick={onClose} style={{ textDecoration: 'none', color: '#333', display: 'block' }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
