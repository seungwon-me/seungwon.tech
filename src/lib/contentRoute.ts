export type ContentType = 'posts' | 'retrospectives';

export function getContentHref(type: ContentType, id: string): string {
  return `/${type}/${id}`;
}
