// Build-time Sanity access. Posts are fetched once when Netlify builds the site;
// publishing in the Studio fires a webhook → Netlify build hook to rebuild.
import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

// Until a Sanity project is connected, the site still builds — just with no posts.
export const client: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion: "2026-10-01", useCdn: false })
  : null;

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export type SanityImage = {
  asset: { _ref: string };
  alt?: string;
  caption?: string;
  hotspot?: unknown;
  crop?: unknown;
};

/** Returns a sized, auto-formatted CDN URL for a Sanity image, or "" if unavailable. */
export function imageUrl(image: SanityImage | undefined, width: number, height?: number) {
  if (!builder || !image?.asset) return "";
  let b = builder.image(image).width(width).auto("format").fit("crop");
  if (height) b = b.height(height);
  return b.url();
}

export type PostSummary = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImage;
  categories?: string[];
};

export type Post = PostSummary & {
  /** Portable Text blocks */
  body: any[];
  verse?: { text: string; reference: string };
};

export type Author = {
  name: string;
  image?: SanityImage;
  /** Portable Text blocks */
  bio?: any[];
};

const summaryFields = `
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage,
  "categories": categories[]->title
`;

// Only published (non-draft) posts dated now or earlier. Future-dated posts
// appear on the first rebuild after their date passes.
const publishedFilter = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

export async function getPosts(): Promise<PostSummary[]> {
  if (!client) return [];
  return client.fetch(`*[${publishedFilter}] | order(publishedAt desc) { ${summaryFields} }`);
}

export async function getPostsWithBody(): Promise<Post[]> {
  if (!client) return [];
  return client.fetch(
    `*[${publishedFilter}] | order(publishedAt desc) { ${summaryFields}, body, verse }`,
  );
}

export async function getAuthor(): Promise<Author | null> {
  if (!client) return null;
  return client.fetch(`*[_type == "author"][0]{ name, image, bio }`);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });
}
