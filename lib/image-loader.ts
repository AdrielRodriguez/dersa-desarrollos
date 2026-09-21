type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Loader para next/image.
 * - Unsplash (imgix): pide el ancho exacto y formato moderno al CDN.
 * - Cualquier otra URL/archivo local: se devuelve tal cual.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  }
  return src;
}
