// Responsive image helpers. Works with Unsplash URLs (rewrites w/h/fit/auto/q query params).
// For non-Unsplash URLs, falls back to returning the original src without srcSet.

const UNSPLASH_RE = /(?:images\.unsplash\.com|plus\.unsplash\.com)/;

const buildUnsplashUrl = (src: string, width: number, aspect: number) => {
  try {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("h", String(Math.round(width / aspect)));
    url.searchParams.set("fit", "crop");
    url.searchParams.set("auto", "format");
    url.searchParams.set("q", "70");
    return url.toString();
  } catch {
    return src;
  }
};

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
  sizes?: string;
}

export const getResponsiveImage = (
  src: string,
  opts: { widths?: number[]; sizes?: string; aspect?: number } = {}
): ResponsiveImage => {
  const widths = opts.widths ?? [320, 480, 640, 800, 1200];
  const sizes = opts.sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  const aspect = opts.aspect ?? 4 / 3;

  if (!UNSPLASH_RE.test(src)) {
    return { src };
  }

  const srcSet = widths
    .map((w) => `${buildUnsplashUrl(src, w, aspect)} ${w}w`)
    .join(", ");
  const fallback = buildUnsplashUrl(src, widths[Math.floor(widths.length / 2)], aspect);

  return { src: fallback, srcSet, sizes };
};
