import { redirect } from 'next/navigation';

export default async function BlogRedirect({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    for (const entry of Array.isArray(value) ? value : value ? [value] : []) query.append(key, entry);
  }
  const suffix = query.toString();
  redirect(`/hi/blog${suffix ? `?${suffix}` : ''}`);
}
