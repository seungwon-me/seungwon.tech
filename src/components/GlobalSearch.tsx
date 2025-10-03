"use client";

import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';

type Post = {
  id: string;
  title: string;
  date: string;
  type: 'posts' | 'retrospectives';
};

export default function GlobalSearch({ allPosts }: { allPosts: Post[] }) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <SearchModal
      isOpen={isSearchModalOpen}
      onClose={() => setIsSearchModalOpen(false)}
      allPosts={allPosts}
    />
  );
}
