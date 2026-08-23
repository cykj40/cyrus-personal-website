import { useEffect } from 'react';

const SITE_URL = 'https://cyruskhiabani.com';

interface PageMetadata {
  description?: string;
  image?: string;
  path?: string;
}

const setMetaContent = (selector: string, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  element?.setAttribute('content', content);
};

export function useDocumentTitle(title: string, metadata: PageMetadata = {}) {
  const { description, image, path } = metadata;

  useEffect(() => {
    document.title = title;
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[name="twitter:title"]', title);

    if (description) {
      setMetaContent('meta[name="description"]', description);
      setMetaContent('meta[property="og:description"]', description);
      setMetaContent('meta[name="twitter:description"]', description);
    }

    if (image) {
      const imageUrl = new URL(image, SITE_URL).toString();
      setMetaContent('meta[property="og:image"]', imageUrl);
      setMetaContent('meta[property="og:image:alt"]', title);
      setMetaContent('meta[name="twitter:image"]', imageUrl);
      setMetaContent('meta[name="twitter:image:alt"]', title);
    }

    if (path) {
      const pageUrl = new URL(path, SITE_URL).toString();
      setMetaContent('meta[property="og:url"]', pageUrl);

      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = pageUrl;
    }
  }, [description, image, path, title]);
}
