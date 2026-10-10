import { Container } from '@/components/ui/Container';

export default function BlogLoading() {
  return <main className="min-h-[70vh] bg-[#FAF7F2] py-10" aria-busy="true"><Container size="wide"><div className="mb-8 h-24 max-w-3xl animate-pulse rounded bg-[#E8E2D8]" /><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]"><div className="space-y-7"><div className="h-16 animate-pulse rounded bg-[#E8E2D8]" />{[1, 2, 3].map((item) => <div key={item} className="h-36 animate-pulse border-b border-[#E5DDD3] bg-[#F2EDE6]" />)}</div><div className="h-72 animate-pulse bg-[#E8E2D8]" /></div></Container></main>;
}
