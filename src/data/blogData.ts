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
  orderNumber: number;
  timestamp: number;
}

const INDO_MONTHS: Record<string, string> = {
  januari: '01', februari: '02', maret: '03', april: '04',
  mei: '05', juni: '06', juli: '07', agustus: '08',
  september: '09', oktober: '10', november: '11', desember: '12',
};

export function parseIndoDate(dateStr: string): number {
  if (!dateStr) return 0;
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = INDO_MONTHS[parts[1].toLowerCase()] || '01';
    const year = parts[2];
    const ts = Date.parse(`${year}-${month}-${day}T00:00:00Z`);
    if (!isNaN(ts)) return ts;
  }
  return 0;
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
  .map(([path, rawContent]) => {
    const { data, content } = parseFrontmatter(rawContent);
    const dateStr = String(data.date ?? '');
    const numMatch = path.match(/(\d+)-/);
    const orderNumber = numMatch ? parseInt(numMatch[1], 10) : 0;
    const timestamp = parseIndoDate(dateStr);

    return {
      title: String(data.title ?? 'Untitled'),
      slug: String(data.slug ?? ''),
      excerpt: String(data.excerpt ?? ''),
      category: String(data.category ?? 'Umum'),
      date: dateStr,
      readTime: String(data.readTime ?? '5 menit baca'),
      author: String(data.author ?? 'Tim KanaKoding'),
      authorRole: String(data.authorRole ?? 'Editor'),
      coverImage: String(data.coverImage ?? '/assets/img/bg_kanakoding.png'),
      featured: Boolean(data.featured),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      content,
      orderNumber,
      timestamp,
    };
  })
  .sort((a, b) => {
    // 1. Sort strictly descending by date (newest first)
    if (b.timestamp !== a.timestamp) {
      return b.timestamp - a.timestamp;
    }
    // 2. If dates are the same, sort by orderNumber descending (18 before 17)
    return b.orderNumber - a.orderNumber;
  });

export const BLOG_CATEGORIES = [
  'Semua',
  ...Array.from(new Set(BLOG_POSTS.map((post) => post.category))),
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
