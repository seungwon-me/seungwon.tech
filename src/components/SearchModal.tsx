"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
  const modalRef = useRef<HTMLDivElement>(null);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredPosts = searchTerm
    ? allPosts.filter(post =>
        post.title.toLowerCase().replace(/\s/g, '').includes(searchTerm.toLowerCase().replace(/\s/g, '')) ||
        post.date.includes(searchTerm)
      )
    : [];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
      <div ref={modalRef} style={modalStyle}>
        <h2>Search</h2>
        <input
          type="text"
          placeholder="Search articles and retrospectives..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
          autoFocus
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <ul style={resultsListStyle}>
          {filteredPosts.map(({ id, title, type }) => (
            <li key={id} style={{ marginBottom: '10px' }}>
              <Link href={`/${type}/${id}`} onClick={onClose} style={{ textDecoration: 'none', color: '#333' }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
