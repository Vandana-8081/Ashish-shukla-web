import { getInstagramPosts } from '@/lib/socialFeeds';
import { InstagramFeed } from '@/components/home/InstagramFeed';

/** Fetches Instagram posts on the server (token never reaches the browser) and hands them to the card. */
export async function InstagramUpdatesCard() {
  const result = await getInstagramPosts();
  return <InstagramFeed result={result} />;
}
