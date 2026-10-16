import { getXPosts } from '@/lib/xFeed';
import { TwitterFeed } from '@/components/home/TwitterFeed';

/** Fetches X posts on the server (cached) and hands them to the card; without posts the card uses the embed. */
export async function XUpdatesCard() {
  const posts = await getXPosts();
  return <TwitterFeed posts={posts} />;
}
