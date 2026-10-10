import { getFacebookFeed } from '@/lib/socialFeeds';

export const runtime = 'nodejs';

export async function GET() {
  const result = await getFacebookFeed();
  const status = result.status === 'ok' ? 200 : result.status === 'unconfigured' ? 503 : 502;
  return Response.json(result, {
    status,
    headers: {
      'Cache-Control': result.status === 'ok'
        ? 'public, s-maxage=900, stale-while-revalidate=1800'
        : 'no-store',
    },
  });
}
