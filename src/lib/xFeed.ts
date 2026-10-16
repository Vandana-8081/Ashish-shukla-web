export interface XPost {
  id: string;
  text: string;
  createdAt?: string;
  imageUrl?: string;
}

export const X_USERNAME = 'Ashish4Shuka';
const API = 'https://api.x.com/2';
const REVALIDATE_SECONDS = 3600;

type XTweet = {
  id?: unknown;
  text?: unknown;
  created_at?: unknown;
  attachments?: { media_keys?: unknown };
};
type XMedia = { media_key?: unknown; url?: unknown; preview_image_url?: unknown };

async function xFetch(path: string, token: string): Promise<unknown> {
  const response = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) throw new Error(`X API ${response.status}`);
  return response.json();
}

async function resolveUserId(token: string): Promise<string | null> {
  const configured = process.env.X_USER_ID?.trim();
  if (configured) return configured;

  const data = (await xFetch(`/users/by/username/${X_USERNAME}`, token)) as { data?: { id?: unknown } };
  const id = typeof data.data?.id === 'string' ? data.data.id : null;
  if (id) console.log(`[X feed] Resolved user id for @${X_USERNAME}: ${id} - save it as X_USER_ID to skip this lookup.`);
  return id;
}

/** Latest posts from the X API, or null when unconfigured or the request fails. */
export async function getXPosts(): Promise<XPost[] | null> {
  const token = process.env.X_BEARER_TOKEN?.trim();
  if (!token) return null;

  try {
    const userId = await resolveUserId(token);
    if (!userId) return null;

    const query = new URLSearchParams({
      max_results: '5',
      exclude: 'replies,retweets',
      'tweet.fields': 'created_at,public_metrics,attachments',
      expansions: 'attachments.media_keys',
      'media.fields': 'url,preview_image_url',
    });
    const json = (await xFetch(`/users/${userId}/tweets?${query}`, token)) as {
      data?: XTweet[];
      includes?: { media?: XMedia[] };
    };

    const media = new Map<string, string>();
    for (const item of json.includes?.media ?? []) {
      const url = typeof item.url === 'string' ? item.url : typeof item.preview_image_url === 'string' ? item.preview_image_url : null;
      if (typeof item.media_key === 'string' && url) media.set(item.media_key, url);
    }

    const posts: XPost[] = [];
    for (const tweet of json.data ?? []) {
      if (typeof tweet.id !== 'string' || typeof tweet.text !== 'string') continue;
      const keys = Array.isArray(tweet.attachments?.media_keys) ? (tweet.attachments.media_keys as unknown[]) : [];
      const imageKey = keys.find((key): key is string => typeof key === 'string' && media.has(key));
      posts.push({
        id: tweet.id,
        text: tweet.text,
        createdAt: typeof tweet.created_at === 'string' ? tweet.created_at : undefined,
        imageUrl: imageKey ? media.get(imageKey) : undefined,
      });
    }
    return posts.length > 0 ? posts : null;
  } catch {
    return null;
  }
}
