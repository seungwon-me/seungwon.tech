import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

type PostType = 'posts' | 'retrospectives';

const getPostsDirectory = (type: PostType) => path.join(process.cwd(), type);

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
    } else {
      return -1;
    }
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
    ...(matterResult.data as { title: string; date: string }),
  };
});