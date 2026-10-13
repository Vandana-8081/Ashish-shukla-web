import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F4ED] px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="font-editorial text-7xl sm:text-8xl font-bold text-[#F5660A]">
          404
        </div>
        <div className="space-y-2">
          <h1 className="font-editorial text-2xl font-bold text-[#151210]">
            Page not found
          </h1>
          <p className="text-sm text-[#6B625A] leading-relaxed">
            The page you're looking for doesn't exist or has been relocated.
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#151210] text-white hover:bg-[#F5660A] text-sm font-semibold transition-colors group"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
