import { getSortedPostsData } from '@/lib/posts';

const URL = 'https://seungwon.tech';

type Post = {
    id: string;
    date: string;
};

function generateSiteMap(posts: Post[], retrospectives: Post[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${URL}</loc>
     </url>
     <url>
       <loc>${URL}/articles</loc>
     </url>
     <url>
       <loc>${URL}/retrospectives</loc>
     </url>
     ${posts
       .map(({ id, date }) => {
         return `
       <url>
           <loc>${`${URL}/posts/${id}`}</loc>
           <lastmod>${date}</lastmod>
       </url>
     `;
       })
       .join('')}
      ${retrospectives
        .map(({ id, date }) => {
            return `
          <url>
              <loc>${`${URL}/retrospectives/${id}`}</loc>
              <lastmod>${date}</lastmod>
          </url>
        `;
        })
        .join('')}
   </urlset>
 `;
}

export function GET() {
  const posts = getSortedPostsData('posts');
  const retrospectives = getSortedPostsData('retrospectives');
  const body = generateSiteMap(posts, retrospectives);

  return new Response(body, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}
