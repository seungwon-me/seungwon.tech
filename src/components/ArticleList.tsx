"use client";

import Link from 'next/link';
import { useState } from 'react';
import { getContentHref, type ContentType } from '@/lib/contentRoute';

type Post = {
  id: string;
  title: string;
  date: string;
};

export default function ArticleList({ allPostsData, type }: { allPostsData: Post[], type: ContentType }) {
  const [mode, setMode] = useState<'sorted' | 'group'>('sorted');
  const [key, setKey] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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

  const titleGroups = Object.keys(groupedPosts)
    .filter(group => /^[A-Z]$/.test(group))
    .sort((a, b) => sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
  const years = Object.keys(groupedPosts).sort((a, b) => sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a));

  const getIndexLinkClass = (item: string) =>
    hoveredItem === item ? 'list-index-link is-active' : 'list-index-link';

  return (
    <div>
      <div className="lead list-controls">
        <label className="list-label" htmlFor="mode-select">mode</label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'sorted' | 'group')}
          className="list-select"
          aria-label="list mode"
        >
          <option value="sorted">sorted</option>
          <option value="group">group</option>
        </select>

        <label className="list-label" htmlFor="key-select">by</label>
        <select
          id="key-select"
          value={key}
          onChange={(e) => setKey(e.target.value as 'date' | 'title')}
          className="list-select"
          aria-label="group key"
        >
          <option value="date">date</option>
          <option value="title">title</option>
        </select>

        <button
          type="button"
          onClick={toggleSortOrder}
          className="list-sort-toggle"
          aria-label={`toggle sort order, current ${sortOrder}`}
          aria-pressed={sortOrder === 'asc'}
        >
          {sortOrder}
        </button>
      </div>

      {mode === 'group' && key === 'title' && (
        <div className="list-index-links">
          {titleGroups.map(letter => (
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
              <Link href={getContentHref(type, id)} className="content-link">
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
                  <Link href={getContentHref(type, id)} className="content-link">
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
