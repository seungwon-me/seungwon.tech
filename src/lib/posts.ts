import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

export type PostType = 'posts' | 'retrospectives';

const getPostsDirectory = (type: PostType) => path.join(process.cwd(), type);

const stripMarkdown = (content: string): string => {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, ' ')
    .replace(/^\s{0,3}>\s?/gm, ' ')
    .replace(/[*_~>-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const createExcerpt = (content: string, maxLength = 180): string => {
  const plain = stripMarkdown(content);
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trimEnd()}…`;
};

export const getSortedPostsData = cache((type: PostType, limit?: number) => {
  const postsDirectory = getPostsDirectory(type);
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; date: string }),
    };
  });

  const sortedPosts = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });

  if (limit) {
    return sortedPosts.slice(0, limit);
  }

  return sortedPosts;
});

export const getSearchablePostsData = cache((type: PostType, limit?: number) => {
  const postsDirectory = getPostsDirectory(type);
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      type,
      ...(matterResult.data as { title: string; date: string }),
      excerpt: createExcerpt(matterResult.content),
    };
  });

  const sortedPosts = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });

  if (limit) {
    return sortedPosts.slice(0, limit);
  }

  return sortedPosts;
});

export const getAllPostIds = cache((type: PostType): { id: string }[] => {
  const postsDirectory = getPostsDirectory(type);
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
  }));
});

export const getPostData = cache(async (type: PostType, id: string) => {
  const postsDirectory = getPostsDirectory(type);
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    excerpt: createExcerpt(matterResult.content),
    ...(matterResult.data as { title: string; date: string }),
  };
});
