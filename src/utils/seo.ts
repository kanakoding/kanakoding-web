interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  image?: string;
  jsonLd?: Record<string, unknown>;
}

export function updatePageSeo({
  title,
  description,
  canonicalPath = '/',
  ogType = 'website',
  image = '/assets/img/blog-bridgeplay.jpg',
  jsonLd,
}: SeoProps): void {
  document.title = title;

  const setMeta = (
    selector: string,
    attr: 'name' | 'property',
    key: string,
    content: string
  ) => {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const canonicalUrl = `https://kanakoding.com${canonicalPath}`;
  const absoluteImageUrl = image.startsWith('http')
    ? image
    : `https://kanakoding.com${image}`;
  const imageType = absoluteImageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg';

  setMeta('meta[name="description"]', 'name', 'description', description);
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'KanaKoding');
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMeta('meta[property="og:image"]', 'property', 'og:image', absoluteImageUrl);
  setMeta('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', absoluteImageUrl);
  setMeta('meta[property="og:image:type"]', 'property', 'og:image:type', imageType);
  setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
  setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '675');
  setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', title);

  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMeta('meta[name="twitter:site"]', 'name', 'twitter:site', '@kanakoding');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteImageUrl);

  let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  const existingJsonLd = document.getElementById('kanakoding-jsonld');
  if (existingJsonLd) {
    existingJsonLd.remove();
  }

  if (jsonLd) {
    const script = document.createElement('script');
    script.id = 'kanakoding-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}
