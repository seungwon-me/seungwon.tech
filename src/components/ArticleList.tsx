"use client";

import Link from 'next/link';
import { useState } from 'react';

type Post = {
  id: string;
  title: string;
  date: string;
};

export default function ArticleList({ allPostsData, type }: { allPostsData: Post[], type: 'posts' | 'retrospectives' }) {
  const [mode, setMode] = useState<'sorted' | 'group'>('sorted');
  const [key, setKey] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as 'sorted' | 'group');
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKey(e.target.value as 'date' | 'title');
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedPosts = [...allPostsData].sort((a, b) => {
    const comparison = key === 'date'
      ? (a.date < b.date ? 1 : -1)
      : a.title.localeCompare(b.title);
    return sortOrder === 'asc' ? -comparison : comparison;
  });

  const groupedPosts: { [key: string]: Post[] } = {};
  if (mode === 'group') {
    if (key === 'date') {
      sortedPosts.forEach(post => {
        const year = new Date(post.date).getFullYear().toString();
        if (!groupedPosts[year]) {
          groupedPosts[year] = [];
        }
        groupedPosts[year].push(post);
      });
    } else {
      sortedPosts.forEach(post => {
        const firstLetter = post.title[0].toUpperCase();
        if (!groupedPosts[firstLetter]) {
          groupedPosts[firstLetter] = [];
        }
        groupedPosts[firstLetter].push(post);
      });
    }
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  const years = Object.keys(groupedPosts).sort((a, b) => sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a));

  const selectStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
    fontSize: 'inherit',
    fontFamily: 'inherit',
  };

  const getIndexLinkClass = (item: string) =>
    hoveredItem === item ? 'list-index-link is-active' : 'list-index-link';

  return (
    <div>
      <p className="lead list-controls">
        <span className="list-control">
          <span>{mode}</span>
          <select
            value={mode}
            onChange={handleModeChange}
            style={selectStyle}
            aria-label="list mode"
          >
            <option value="sorted">sorted</option>
            <option value="group">group</option>
          </select>
        </span>
        {' '}
        by{' '}
        <span className="list-control">
          <span>{key}</span>
          <select
            value={key}
            onChange={handleKeyChange}
            style={selectStyle}
            aria-label="group key"
          >
            <option value="date">date</option>
            <option value="title">title</option>
          </select>
        </span>
        <button
          type="button"
          onClick={toggleSortOrder}
          className="list-sort-toggle"
          aria-label={`toggle sort order, current ${sortOrder}`}
          aria-pressed={sortOrder === 'asc'}
        >
          {sortOrder}
        </button>
        .
      </p>

      {mode === 'group' && key === 'title' && (
        <div className="list-index-links">
          {alphabet.map(letter => (
            <a
              key={letter}
              href={`#${letter}`}
              className={getIndexLinkClass(letter)}
              aria-label={`jump to ${letter}`}
              onMouseEnter={() => setHoveredItem(letter)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {letter}
            </a>
          ))}
        </div>
      )}

      {mode === 'group' && key === 'date' && (
        <div className="list-index-links">
          {years.map(year => (
            <a
              key={year}
              href={`#${year}`}
              className={getIndexLinkClass(year)}
              aria-label={`jump to ${year}`}
              onMouseEnter={() => setHoveredItem(year)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {year}
            </a>
          ))}
        </div>
      )}

      {mode === 'sorted' ? (
        <ul className="content-list">
          {sortedPosts.map(({ id, date, title }) => (
            <li key={id} className="content-item">
              <Link href={`/${type}/${id}`} className="content-link">
                {title}
              </Link>
              <br />
              <small className="meta">
                <time dateTime={date}>{date}</time>
              </small>
            </li>
          ))}
        </ul>
      ) : (
        Object.entries(groupedPosts).sort((a, b) => {
          if (key === 'date') {
            return sortOrder === 'asc' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]);
          }
          return sortOrder === 'asc' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]);
        }).map(([group, posts]) => (
          <div key={group} id={group}>
            <h3>{group}</h3>
            <ul className="content-list">
              {posts.map(({ id, date, title }) => (
                <li key={id} className="content-item">
                  <Link href={`/${type}/${id}`} className="content-link">
                    {title}
                  </Link>
                  <br />
                  <small className="meta">
                    <time dateTime={date}>{date}</time>
                  </small>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
