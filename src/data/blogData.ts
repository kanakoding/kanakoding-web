export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  featured: boolean;
  tags: string[];
  content: string;
}

const rawMarkdownFiles = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: normalized.trim() };
  }

  const frontmatterBlock = match[1];
  const content = match[2].trim();
  const data: Record<string, unknown> = {};

  for (const line of frontmatterBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if (val.startsWith('[') && val.endsWith(']')) {
      try {
        data[key] = JSON.parse(val);
      } catch {
        data[key] = val
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      }
    } else if (val === 'true' || val === 'false') {
      data[key] = val === 'true';
    } else {
      data[key] = val.replace(/^["']|["']$/g, '');
    }
  }

  return { data, content };
}

export const BLOG_POSTS: BlogPost[] = Object.entries(rawMarkdownFiles)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([, rawContent]) => {
    const { data, content } = parseFrontmatter(rawContent);
    return {
      title: String(data.title ?? 'Untitled'),
      slug: String(data.slug ?? ''),
      excerpt: String(data.excerpt ?? ''),
      category: String(data.category ?? 'Umum'),
      date: String(data.date ?? ''),
      readTime: String(data.readTime ?? '5 menit baca'),
      author: String(data.author ?? 'Tim KanaKoding'),
      authorRole: String(data.authorRole ?? 'Editor'),
      coverImage: String(data.coverImage ?? '/assets/img/bg_kanakoding.png'),
      featured: Boolean(data.featured),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      content,
    };
  });

export const BLOG_CATEGORIES = [
  'Semua',
  ...Array.from(new Set(BLOG_POSTS.map((post) => post.category))),
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
