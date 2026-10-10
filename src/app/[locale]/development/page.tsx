import { redirect } from 'next/navigation';

export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/public-life#development`);
}
