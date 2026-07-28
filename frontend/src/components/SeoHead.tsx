import { useEffect } from 'react';
import type { SeoMeta } from '../types';
import type { Locale } from '../i18n/types';

interface SeoHeadProps {
  meta: SeoMeta;
  locale?: Locale;
}

function setMetaTag(name: string, content: string, property = false): void {
  const attr = property ? 'property' : 'name';
  let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;

  if (element === null) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setLinkTag(rel: string, href: string): void {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (element === null) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

export function SeoHead({ meta, locale = 'en' }: SeoHeadProps) {
  useEffect(() => {
    document.title = meta.title;
    document.documentElement.lang = locale;

    setMetaTag('description', meta.description);
    setMetaTag('keywords', meta.keywords);
    setMetaTag('author', meta.author);

    setMetaTag('og:type', meta.og.type, true);
    setMetaTag('og:title', meta.og.title, true);
    setMetaTag('og:description', meta.og.description, true);
    setMetaTag('og:url', meta.og.url, true);
    setMetaTag('og:site_name', meta.og.site_name, true);

    if (meta.og.image !== undefined && meta.og.image !== '') {
      setMetaTag('og:image', meta.og.image, true);
      setMetaTag('twitter:image', meta.og.image);
    }

    setMetaTag('twitter:card', meta.twitter.card);
    setMetaTag('twitter:title', meta.twitter.title);
    setMetaTag('twitter:description', meta.twitter.description);

    setLinkTag('canonical', meta.canonical);

    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (Object.keys(meta.jsonLd).length > 0) {
      if (script === null) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(meta.jsonLd);
    } else if (script !== null) {
      script.remove();
    }
  }, [meta, locale]);

  return null;
}
