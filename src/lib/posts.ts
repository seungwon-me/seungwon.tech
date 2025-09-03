import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
const retrospectivesDirectory = path.join(process.cwd(), 'retrospectives');

// Generic function to get post data from a directory
const getPostsFromDirectory = (directory: string, category: string) => {
    if (!fs.existsSync(directory)) {
        return [];
    }
    const fileNames = fs.readdirSync(directory);
    return fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(directory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            category,
            ...(matterResult.data as { date: string; title: string }),
        };
    });
};

// Function to get all sorted posts for the main page
export function getSortedPostsData() {
    const allPostsData = getPostsFromDirectory(postsDirectory, 'posts');
    const allRetrospectivesData = getPostsFromDirectory(retrospectivesDirectory, 'retrospectives');

    const allData = [...allPostsData, ...allRetrospectivesData];

    return allData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

// --- Tech Posts Specific Functions ---

export function getAllPostIds() {
    if (!fs.existsSync(postsDirectory)) return [];
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => ({
        params: {
            slug: fileName.replace(/\.md$/, ''),
        },
    }));
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found for id: ${id}`);
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...(matterResult.data as { date: string; title: string }),
    };
}


// --- Retrospectives Specific Functions ---

export function getAllRetrospectiveIds() {
    if (!fs.existsSync(retrospectivesDirectory)) return [];
    const fileNames = fs.readdirSync(retrospectivesDirectory);
    return fileNames.map((fileName) => ({
        params: {
            slug: fileName.replace(/\.md$/, ''),
        },
    }));
}

export async function getRetrospectiveData(id: string) {
    const fullPath = path.join(retrospectivesDirectory, `${id}.md`);
     if (!fs.existsSync(fullPath)) {
        throw new Error(`Retrospective not found for id: ${id}`);
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...(matterResult.data as { date: string; title: string }),
    };
}