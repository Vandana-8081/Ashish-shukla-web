import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, BriefcaseMedical, Coins, Flame, GraduationCap, HeartHandshake, Landmark, Milestone, Plane, Route,
  TrainFront, TrendingUp, Zap, type LucideIcon,
} from 'lucide-react';
import type { IdeaArticle } from '@/data/ideas';
import type { JourneyStat } from '@/data/journey-stats';
import type { Locale } from '@/types';

/**
 * Shows the whole photo (no cropping) inside a fixed frame. A blurred copy fills
 * the leftover space so photos of any shape still look finished.
 */
export function CoverImage({ src, sizes, priority = false }: { src: string; sizes: string; priority?: boolean }) {
  return (
    <>
      <Image src={src} alt="" fill sizes="100px" aria-hidden="true" className="scale-110 object-cover opacity-70 blur-xl" />
      <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-contain" />
    </>
  );
}

export function IdeaCard({ article, locale }: { article: IdeaArticle; locale: Locale }) {
  const hi = locale === 'hi';
  const href = `/${locale}/development/ideas/${article.slug}`;
  return (
    <Link
      href={href}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#EBE2D8] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#F47216]/50 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F47216]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0F3A48]">
        <CoverImage src={article.image} sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 400px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-[#B84F08] shadow-sm">{article.category[locale]}</span>
        {article.figure && (
          <div className="absolute inset-x-4 bottom-3 text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">
            <p className="font-editorial text-[2rem] font-bold leading-none text-[#F2A51A]">{article.figure[locale]}</p>
            {article.figureCaption && <p className="mt-1 text-sm text-white/90">{article.figureCaption[locale]}</p>}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm text-[#6E625A]">{article.readMinutes} {hi ? 'मिनट पढ़ें' : 'min read'}</p>
        <h3 className="mt-1.5 font-editorial text-xl font-bold leading-snug text-[#1C1410]">{article.title[locale]}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-[#4A3F37]">{article.summary[locale]}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#B84F08]">
          {hi ? 'पूरा पढ़ें' : 'Read about'}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

const statIcons: Record<string, LucideIcon> = {
  highways: Route,
  airports: Plane,
  metro: TrainFront,
  'medical-colleges': BriefcaseMedical,
  'mbbs-seats': GraduationCap,
  'railway-electrification': Zap,
  'jan-dhan': Landmark,
  ujjwala: Flame,
  poverty: HeartHandshake,
  'up-gsdp': TrendingUp,
  'up-expressways': Milestone,
  'up-investment': Coins,
};

export function JourneyStatCard({ stat, locale }: { stat: JourneyStat; locale: Locale }) {
  const hi = locale === 'hi';
  const Icon = statIcons[stat.id] ?? TrendingUp;
  const compare = stat.then && stat.thenLabel && stat.ratio !== undefined;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#EBE2D8] bg-white shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0F3A48]">
        <Image src={stat.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 400px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#0F3A48] shadow-sm">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        {stat.multiplier && (
          <span className="absolute right-4 top-4 rounded-full bg-[#B84F08] px-3 py-1 text-sm font-semibold text-white shadow-sm">{stat.multiplier[locale]}</span>
        )}
        <h3 className="absolute inset-x-4 bottom-3 font-editorial text-xl font-bold leading-snug text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">{stat.title[locale]}</h3>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm text-[#6E625A]">{stat.nowLabel[locale]}</p>
        <p className="mt-1 font-editorial text-[2.1rem] font-bold leading-none tabular-nums text-[#B84F08]">{stat.now[locale]}</p>

        {compare && stat.then && stat.thenLabel && (
          <div className="mt-5">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 text-sm">
              <span className="font-semibold text-[#1C1410]">{hi ? 'अब' : 'Now'}</span>
              <div className="h-2 overflow-hidden rounded-full bg-[#F1E9DF]/70"><div className="h-full w-full rounded-full bg-[#B84F08]" /></div>
              <span className="text-[#6E625A]">{hi ? 'तब' : 'Then'}</span>
              <div className="h-2 overflow-hidden rounded-full bg-[#F1E9DF]/70"><div className="h-full rounded-full bg-[#B9A896]" style={{ width: `${Math.round((stat.ratio ?? 0) * 1000) / 10}%` }} /></div>
            </div>
            <p className="mt-2.5 text-sm text-[#4A3F37]">{stat.thenLabel[locale]}: <span className="font-semibold tabular-nums text-[#1C1410]">{stat.then[locale]}</span></p>
          </div>
        )}

        {stat.note && <p className="mt-4 text-sm leading-relaxed text-[#4A3F37]">{stat.note[locale]}</p>}
      </div>
    </article>
  );
}
