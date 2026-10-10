import { redirect } from 'next/navigation';

interface UpdatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function UpdateDetailPage({ params }: UpdatePageProps) {
  const { slug } = await params;
  redirect(`/hi/updates/${encodeURIComponent(slug)}`);
}
