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
    let comparison = 0;
    if (key === 'date') {
      comparison = a.date < b.date ? 1 : -1;
    } else {
      comparison = a.title.localeCompare(b.title);
    }
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

  const getLinkStyle = (item: string): React.CSSProperties => ({
    marginRight: '10px',
    textDecoration: 'none',
    color: hoveredItem === item ? '#000' : '#ccc',
    transition: 'color 0.2s',
  });

  return (
    <div>
      <p className="lead">
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span>{mode}</span>
          <select value={mode} onChange={handleModeChange} style={selectStyle}>
            <option value="sorted">sorted</option>
            <option value="group">group</option>
          </select>
        </span>
        {' '}
        by{' '}
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span>{key}</span>
          <select value={key} onChange={handleKeyChange} style={selectStyle}>
            <option value="date">date</option>
            <option value="title">title</option>
          </select>
        </span>
        <span onClick={toggleSortOrder} style={{ cursor: 'pointer', marginLeft: '10px' }}>
          {sortOrder}
        </span>
        .
      </p>

      {mode === 'group' && key === 'title' && (
        <div style={{ marginBottom: '20px' }}>
          {alphabet.map(letter => (
            <a
              key={letter}
              href={`#${letter}`}
              style={getLinkStyle(letter)}
              onMouseEnter={() => setHoveredItem(letter)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {letter}
            </a>
          ))}
        </div>
      )}

      {mode === 'group' && key === 'date' && (
        <div style={{ marginBottom: '20px' }}>
          {years.map(year => (
            <a
              key={year}
              href={`#${year}`}
              style={getLinkStyle(year)}
              onMouseEnter={() => setHoveredItem(year)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {year}
            </a>
          ))}
        </div>
      )}

      {mode === 'sorted' ? (
        <ul>
          {sortedPosts.map(({ id, date, title }) => (
            <li key={id} style={{ listStyleType: 'none', listStyle: 'none' }}>
              <Link href={`/${type}/${id}`} style={{ color: 'gray', textDecoration: 'none' }}>
                {title}
              </Link>
              <br />
              <small className="meta">{date}</small>
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
            <ul>
              {posts.map(({ id, date, title }) => (
                <li key={id} style={{ listStyleType: 'none', listStyle: 'none' }}>
                  <Link href={`/${type}/${id}`} style={{ color: 'gray', textDecoration: 'none' }}>
                    {title}
                  </Link>
                  <br />
                  <small className="meta">{date}</small>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}