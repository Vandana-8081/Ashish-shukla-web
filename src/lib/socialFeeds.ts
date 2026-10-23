export type SocialFeedPlatform = 'facebook' | 'instagram';
export type SocialFeedStatus = 'ok' | 'unconfigured' | 'error';

export interface SocialFeedItem {
  id: string;
  platform: SocialFeedPlatform;
  caption?: string;
  mediaType?: 'image' | 'video' | 'carousel';
  thumbnailUrl?: string;
  permalink: string;
  publishedAt?: string;
}

export interface SocialFeedResult {
  status: SocialFeedStatus;
  items: SocialFeedItem[];
  updatedAt?: string;
}

type GraphImage = { src?: unknown };
type GraphAttachment = {
  media_type?: unknown;
  media?: { image?: GraphImage };
  subattachments?: { data?: GraphAttachment[] };
};
type FacebookPost = {
  id?: unknown;
  message?: unknown;
  permalink_url?: unknown;
  created_time?: unknown;
  full_picture?: unknown;
  attachments?: { data?: GraphAttachment[] };
};
type InstagramMedia = {
  id?: unknown;
  caption?: unknown;
  media_type?: unknown;
  media_url?: unknown;
  thumbnail_url?: unknown;
  permalink?: unknown;
  timestamp?: unknown;
  children?: { data?: InstagramMedia[] };
};
type GraphResponse<T> = { data?: T[]; paging?: { next?: unknown } };

const graphVersion = () => process.env.META_GRAPH_API_VERSION?.trim();

function validGraphVersion(version: string | undefined): version is string {
  return !!version && /^v\d+\.\d+$/.test(version);
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function validHttpsUrl(value: unknown): string | undefined {
  const valueString = asString(value);
  if (!valueString) return undefined;
  try {
    const url = new URL(valueString);
    return url.protocol === 'https:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function validDate(value: unknown): string | undefined {
  const date = asString(value);
  if (!date || Number.isNaN(Date.parse(date))) return undefined;
  return new Date(date).toISOString();
}

function validPermalink(value: unknown, platform: SocialFeedPlatform): string | undefined {
  const urlString = validHttpsUrl(value);
  if (!urlString) return undefined;
  const hostname = new URL(urlString).hostname.toLowerCase();
  const allowed = platform === 'facebook'
    ? hostname === 'facebook.com' || hostname.endsWith('.facebook.com') || hostname === 'fb.watch'
    : hostname === 'instagram.com' || hostname.endsWith('.instagram.com');
  return allowed ? urlString : undefined;
}

function facebookThumbnail(post: FacebookPost): string | undefined {
  const attachment = post.attachments?.data?.[0];
  const direct = validHttpsUrl(attachment?.media?.image?.src) ?? validHttpsUrl(post.full_picture);
  if (direct) return direct;
  for (const child of attachment?.subattachments?.data ?? []) {
    const childImage = validHttpsUrl(child.media?.image?.src);
    if (childImage) return childImage;
  }
  return undefined;
}

function normalizeFacebookPosts(posts: FacebookPost[]): SocialFeedItem[] {
  const seen = new Set<string>();
  return posts.flatMap((post) => {
    const id = asString(post.id);
    const permalink = validPermalink(post.permalink_url, 'facebook');
    if (!id || !permalink || seen.has(id)) return [];
    seen.add(id);

    const rawType = asString(post.attachments?.data?.[0]?.media_type)?.toLowerCase();
    const mediaType: SocialFeedItem['mediaType'] = rawType === 'video'
      ? 'video'
      : rawType === 'album'
        ? 'carousel'
        : facebookThumbnail(post)
          ? 'image'
          : undefined;

    return [{
      id,
      platform: 'facebook' as const,
      caption: asString(post.message),
      mediaType,
      thumbnailUrl: facebookThumbnail(post),
      permalink,
      publishedAt: validDate(post.created_time),
    }];
  }).sort((a, b) => Date.parse(b.publishedAt ?? '') - Date.parse(a.publishedAt ?? '')).slice(0, 8);
}

function isVideoCarousel(media: InstagramMedia): boolean {
  return (media.children?.data ?? []).some(
    (child) => asString(child.media_type)?.toUpperCase() === 'VIDEO',
  );
}

function normalizeInstagramVideos(mediaItems: InstagramMedia[]): SocialFeedItem[] {
  const seen = new Set<string>();
  return mediaItems.flatMap((media) => {
    const id = asString(media.id);
    const permalink = validPermalink(media.permalink, 'instagram');
    const type = asString(media.media_type)?.toUpperCase();
    if (!id || !permalink || seen.has(id) || (type !== 'VIDEO' && !(type === 'CAROUSEL_ALBUM' && isVideoCarousel(media)))) {
      return [];
    }
    seen.add(id);

    const carouselThumbnail = (media.children?.data ?? []).find(
      (child) => asString(child.media_type)?.toUpperCase() === 'VIDEO',
    )?.thumbnail_url;

    return [{
      id,
      platform: 'instagram' as const,
      caption: asString(media.caption),
      mediaType: 'video' as const,
      thumbnailUrl: validHttpsUrl(media.thumbnail_url) ?? validHttpsUrl(carouselThumbnail),
      permalink,
      publishedAt: validDate(media.timestamp),
    }];
  }).sort((a, b) => Date.parse(b.publishedAt ?? '') - Date.parse(a.publishedAt ?? '')).slice(0, 8);
}

/** All recent public posts (photos, videos, reels, carousels), newest first. */
function normalizeInstagramPosts(mediaItems: InstagramMedia[]): SocialFeedItem[] {
  const seen = new Set<string>();
  return mediaItems.flatMap((media) => {
    const id = asString(media.id);
    const permalink = validPermalink(media.permalink, 'instagram');
    if (!id || !permalink || seen.has(id)) return [];
    seen.add(id);

    const type = asString(media.media_type)?.toUpperCase();
    const mediaType: SocialFeedItem['mediaType'] = type === 'VIDEO'
      ? 'video'
      : type === 'CAROUSEL_ALBUM'
        ? 'carousel'
        : type === 'IMAGE'
          ? 'image'
          : undefined;
    const firstChild = media.children?.data?.[0];
    // Video posts expose a still in thumbnail_url; photos expose it in media_url.
    const thumbnailUrl = type === 'VIDEO'
      ? validHttpsUrl(media.thumbnail_url)
      : validHttpsUrl(media.media_url) ?? validHttpsUrl(firstChild?.thumbnail_url) ?? validHttpsUrl(firstChild?.media_url);

    return [{
      id,
      platform: 'instagram' as const,
      caption: asString(media.caption),
      mediaType,
      thumbnailUrl,
      permalink,
      publishedAt: validDate(media.timestamp),
    }];
  }).sort((a, b) => Date.parse(b.publishedAt ?? '') - Date.parse(a.publishedAt ?? '')).slice(0, 24);
}

async function fetchGraphPage<T>(url: URL, accessToken: string): Promise<{ data: T[]; next?: URL } | null> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'force-cache',
    next: { revalidate: 900 },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return null;
  const payload = await response.json() as GraphResponse<T> | null;
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.data)) return null;
  let next: URL | undefined;
  const nextValue = validHttpsUrl(payload.paging?.next);
  if (nextValue) {
    const candidate = new URL(nextValue);
    if (candidate.hostname === 'graph.facebook.com') {
      candidate.searchParams.delete('access_token');
      next = candidate;
    }
  }
  const data = payload.data.filter(
    (item): item is T => !!item && typeof item === 'object' && !Array.isArray(item),
  );
  return { data, next };
}

async function fetchGraph<T>(url: URL, accessToken: string): Promise<T[] | null> {
  const page = await fetchGraphPage<T>(url, accessToken);
  return page?.data ?? null;
}

async function fetchGraphPages<T>(url: URL, accessToken: string, maxPages: number, shouldStop: (items: T[]) => boolean): Promise<T[] | null> {
  const items: T[] = [];
  let next: URL | undefined = url;
  for (let pageNumber = 0; next && pageNumber < maxPages; pageNumber += 1) {
    const page = await fetchGraphPage<T>(next, accessToken);
    if (!page) return pageNumber === 0 ? null : items;
    items.push(...page.data);
    if (shouldStop(items)) break;
    next = page.next;
  }
  return items;
}

export async function getFacebookFeed(): Promise<SocialFeedResult> {
  const pageId = process.env.FACEBOOK_PAGE_ID?.trim();
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim();
  const version = graphVersion();
  if (!pageId || !accessToken || !validGraphVersion(version)) {
    return { status: 'unconfigured', items: [] };
  }

  const url = new URL(`https://graph.facebook.com/${version}/${encodeURIComponent(pageId)}/posts`);
  url.searchParams.set('fields', 'id,message,permalink_url,created_time,full_picture,attachments{media_type,media,subattachments}');
  url.searchParams.set('limit', '12');

  try {
    const posts = await fetchGraph<FacebookPost>(url, accessToken);
    return posts
      ? { status: 'ok', items: normalizeFacebookPosts(posts), updatedAt: new Date().toISOString() }
      : { status: 'error', items: [] };
  } catch {
    return { status: 'error', items: [] };
  }
}

export async function getInstagramPosts(): Promise<SocialFeedResult> {
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID?.trim();
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const version = graphVersion();
  if (!accountId || !accessToken || !validGraphVersion(version)) {
    return { status: 'unconfigured', items: [] };
  }

  const url = new URL(`https://graph.facebook.com/${version}/${encodeURIComponent(accountId)}/media`);
  url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}');
  url.searchParams.set('limit', '30');

  try {
    const media = await fetchGraph<InstagramMedia>(url, accessToken);
    return media
      ? { status: 'ok', items: normalizeInstagramPosts(media), updatedAt: new Date().toISOString() }
      : { status: 'error', items: [] };
  } catch {
    return { status: 'error', items: [] };
  }
}

export async function getInstagramFeed(): Promise<SocialFeedResult> {
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID?.trim();
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const version = graphVersion();
  if (!accountId || !accessToken || !validGraphVersion(version)) {
    return { status: 'unconfigured', items: [] };
  }

  const url = new URL(`https://graph.facebook.com/${version}/${encodeURIComponent(accountId)}/media`);
  url.searchParams.set('fields', 'id,caption,media_type,thumbnail_url,permalink,timestamp,children{media_type,thumbnail_url}');
  url.searchParams.set('limit', '50');

  try {
    const media = await fetchGraphPages<InstagramMedia>(
      url,
      accessToken,
      4,
      (items) => normalizeInstagramVideos(items).length >= 8,
    );
    return media
      ? { status: 'ok', items: normalizeInstagramVideos(media), updatedAt: new Date().toISOString() }
      : { status: 'error', items: [] };
  } catch {
    return { status: 'error', items: [] };
  }
}
