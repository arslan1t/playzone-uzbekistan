import { Fragment, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChartColumnBig,
  ChevronDown,
  CircleDollarSign,
  Compass,
  FileText,
  MoonStar,
  Sun,
  X,
} from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

import {
  apexBrandImage,
  arenasImage,
  careerStairsImage,
  cafeImage,
  competitionImage,
  exteriorImage,
  floorPlanOneImage,
  floorPlanTwoImage,
  gymImage,
  lobbyImage,
  marketAudienceIndoorSportsPdf,
  marketBasketballPdf,
  marketCombatzonePdf,
  marketFutsalPdf,
  marketGymPdf,
  marketTennisPdf,
  revenueStructureFirstImage,
  revenueStructureSecondImage,
  statImage,
  tennisImage,
  uzbekistanFlagImage,
  vipViewImage,
} from './data/deckAssets';
import {
  allocationRows,
  captureBands,
  closingProofs,
  competitionRows,
  growthYears,
  monthlyCostSummary,
  monthlyProfitSummary,
  monthlyRevenueSummary,
  problemCards,
  revenueStreams,
  roadmapPhases,
  scheduleBands,
  slideMeta,
  slideNarratives,
  strategyVisuals,
  unitEconomicsRows,
  weekendWindows,
  whyBlocks,
  zoneRevenueRows,
} from './data/deckContent';
import type { AllocationRow, RevenueStream, Tone } from './data/deckSchema';

const deckHotkeys = ['ArrowRight', 'PageDown', ' '];
const leftHotkeys = ['ArrowLeft', 'PageUp'];
const brandName = 'APEX ARENA';

const toneStyles: Record<Tone, { ring: string; text: string; soft: string; bar: string; glow: string }> = {
  amber: {
    ring: 'border-[#8f5b2b]/55',
    text: 'text-[#f0bf8f]',
    soft: 'bg-[linear-gradient(180deg,rgba(198,123,55,0.18),rgba(198,123,55,0.04))]',
    bar: 'bg-[#c67b37]',
    glow: 'shadow-[0_0_0_1px_rgba(198,123,55,0.12),0_18px_50px_rgba(198,123,55,0.16)]',
  },
  copper: {
    ring: 'border-[#8f5949]/55',
    text: 'text-[#efb19c]',
    soft: 'bg-[linear-gradient(180deg,rgba(197,117,88,0.18),rgba(197,117,88,0.04))]',
    bar: 'bg-[#c57558]',
    glow: 'shadow-[0_0_0_1px_rgba(197,117,88,0.12),0_18px_50px_rgba(197,117,88,0.16)]',
  },
  steel: {
    ring: 'border-[#4f6b7f]/55',
    text: 'text-[#a9c3d8]',
    soft: 'bg-[linear-gradient(180deg,rgba(97,131,155,0.18),rgba(97,131,155,0.04))]',
    bar: 'bg-[#6f93ad]',
    glow: 'shadow-[0_0_0_1px_rgba(97,131,155,0.12),0_18px_50px_rgba(97,131,155,0.16)]',
  },
  ivory: {
    ring: 'border-white/14',
    text: 'text-[#fff2e1]',
    soft: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]',
    bar: 'bg-[#f1dfc4]',
    glow: 'shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_50px_rgba(255,255,255,0.08)]',
  },
};

const backdropBySlide: Record<number, string> = {
  0: exteriorImage,
  1: arenasImage,
  2: floorPlanOneImage,
  3: vipViewImage,
  4: floorPlanTwoImage,
  5: gymImage,
  6: apexBrandImage,
  7: tennisImage,
  8: arenasImage,
  9: lobbyImage,
  10: apexBrandImage,
  11: cafeImage,
  12: vipViewImage,
  13: floorPlanTwoImage,
  14: apexBrandImage,
  15: exteriorImage,
};

const demandMixData = [
  { name: 'Futsal', value: 6000, color: '#f59e0b' },
  { name: 'Basketball', value: 3200, color: '#3b82f6' },
  { name: 'Tennis', value: 2300, color: '#e5e7eb' },
  { name: 'Combat (TKD, MMA, BOX)', value: 1800, color: '#fb923c' },
  { name: 'Gym', value: 2500, color: '#22c55e' },
] as const;

const demandLegendItems = [
  { label: 'Basketball + Futsal', note: 'volume / leagues', color: '#f59e0b' },
  { label: 'Gym', note: 'daily recurring traffic', color: '#22c55e' },
  { label: 'Tennis', note: 'premium check', color: '#e5e7eb' },
  { label: 'Combat', note: 'frequency / retention', color: '#fb923c' },
  { label: 'Events', note: 'weekend spikes', color: '#d6ae83' },
] as const;

const demandResearchLinks = [
  { label: 'market analysis basketball', href: marketBasketballPdf, format: 'PDF' },
  { label: 'market analysis gym', href: marketGymPdf, format: 'PDF' },
  { label: 'market analysis tennis', href: marketTennisPdf, format: 'PDF' },
  { label: 'market analysis combatzone', href: marketCombatzonePdf, format: 'PDF' },
  { label: 'market analysis futsal', href: marketFutsalPdf, format: 'PDF' },
  {
    label: 'Платёжная аудитория indoor sports в Ташкенте',
    href: marketAudienceIndoorSportsPdf,
    format: 'PDF',
  },
] as const;

const operatingCycleCards = [
  {
    title: 'День',
    subtitle: 'Обучение и тренировки',
    description:
      'Игровые зоны заняты обучением и тренировками. Боевые искусства работают в дневных группах. Тренажёрный зал даёт стабильный поток.',
    icon: Sun,
    bars: [
      { label: 'Игровые зоны', value: 64, tone: 'steel' as Tone },
      { label: 'Боевые искусства', value: 58, tone: 'amber' as Tone },
      { label: 'Тренажёрный зал', value: 72, tone: 'ivory' as Tone },
    ],
  },
  {
    title: 'Вечер',
    subtitle: 'Лиги и пиковая загрузка',
    description:
      'Игровые зоны переходят в формат лиг и игровых сессий. Боевые искусства выходят на основные классы. Тренажёрный зал входит в пиковый режим.',
    icon: MoonStar,
    bars: [
      { label: 'Игровые зоны', value: 94, tone: 'steel' as Tone },
      { label: 'Боевые искусства', value: 84, tone: 'amber' as Tone },
      { label: 'Тренажёрный зал', value: 96, tone: 'ivory' as Tone },
    ],
  },
  {
    title: 'Выходные',
    subtitle: 'Турниры и события',
    description:
      'Игровые зоны работают как площадка для турниров и событий. Боевые искусства проводят сборы и соревнования. Комплекс получает дополнительный зрительский и семейный трафик.',
    icon: CalendarDays,
    bars: [
      { label: 'Игровые зоны', value: 92, tone: 'steel' as Tone },
      { label: 'Боевые искусства', value: 74, tone: 'amber' as Tone },
      { label: 'Тренажёрный зал', value: 68, tone: 'ivory' as Tone },
    ],
  },
] as const;

type LayoutCarouselSlide = {
  id: string;
  label: string;
  title: string;
  body: string;
  chips: string[];
  tone: Tone;
  alt: string;
  image: string;
  accent: string;
};

const layoutCarouselSlides: LayoutCarouselSlide[] = [
  {
    id: 'revenue-floor-1',
    label: 'Revenue Structure 01',
    title: 'Структура дохода первого этажа',
    body:
      'Корт A и корт B формируют основной вечерний поток, а тренажёрный зал и дополнительные зоны поддерживают регулярную посещаемость в течение дня.',
    chips: ['Court A / Basketball', 'Court B / Futsal', 'Gym'],
    tone: 'steel',
    alt: 'Структура дохода первого этажа',
    image: revenueStructureFirstImage,
    accent: 'Сценарий массового и регулярного потока',
  },
  {
    id: 'revenue-floor-2',
    label: 'Revenue Structure 02',
    title: 'Структура дохода второго этажа',
    body:
      'VIP-зона, кафе, теннис и боевые искусства формируют более высокий чек и дополнительные доходы, не мешая работе основных игровых площадок.',
    chips: ['Court C / Tennis', 'Combat hall', 'Cafe + lobby'],
    tone: 'amber',
    alt: 'Структура дохода второго этажа',
    image: revenueStructureSecondImage,
    accent: 'Высокий чек и дополнительные сервисы',
  },
  {
    id: 'plan-floor-1',
    label: 'Layout Plan 01',
    title: 'План первого этажа',
    body:
      'Первый этаж собран вокруг двух игровых площадок и тренажёрного зала. Такая конфигурация поддерживает высокий вечерний спрос и повторяемую дневную загрузку.',
    chips: ['Игровые зоны', 'Входная группа', 'Gym access'],
    tone: 'ivory',
    alt: 'План первого этажа Apex Arena',
    image: floorPlanOneImage,
    accent: 'Площадь организована под основной поток',
  },
  {
    id: 'plan-floor-2',
    label: 'Layout Plan 02',
    title: 'План второго этажа',
    body:
      'Верхний уровень отдан под теннис, боевые искусства, VIP и café-сценарии. Это усиливает монетизацию без перегрузки первого этажа.',
    chips: ['Tennis court', 'Combat zone', 'VIP + cafe'],
    tone: 'copper',
    alt: 'План второго этажа Apex Arena',
    image: floorPlanTwoImage,
    accent: 'Второй этаж добавляет премиальные форматы',
  },
];

const monetizationMoneyFlows = [
  { title: 'Академия', value: '1,19–2,44 млн сум / мес', tone: 'ivory' as Tone },
  { title: 'Лиги', value: '1,2–2,0 млн сум / команда', tone: 'steel' as Tone },
  { title: 'Турниры', value: 'до 252 млн сум / мес', tone: 'amber' as Tone },
  { title: 'Тренажёрный зал', value: '850 тыс + персональные тренировки', tone: 'copper' as Tone },
  { title: 'Частные форматы', value: '550 тыс – 1,3 млн сум / час', tone: 'steel' as Tone },
  { title: 'Кафе и retail', value: 'до 270 млн сум / мес', tone: 'amber' as Tone },
] as const;

const monetizationCarouselSlides = [
  {
    label: 'Вход в систему',
    title: 'Академия',
    body: 'Формирует поток игроков и создаёт регулярные платежи с понятной частотой посещения.',
    image: tennisImage,
    alt: 'Academy training zone at Apex Arena',
  },
  {
    label: 'Основная загрузка',
    title: 'Лиги',
    body: 'Заполняют наиболее ценные вечерние окна и создают основной объём регулярного дохода.',
    image: arenasImage,
    alt: 'League play at Apex Arena',
  },
  {
    label: 'Пик выручки',
    title: 'Турниры',
    body: 'Дают максимальную выручку за короткое время и привлекают новых участников в систему.',
    image: apexBrandImage,
    alt: 'Tournament atmosphere at Apex Arena',
  },
  {
    label: 'Стабилизация',
    title: 'Тренажёрный зал и боевые искусства',
    body: 'Создают ежедневный поток, вечернюю плотность и устойчивую повторяемую выручку.',
    image: gymImage,
    alt: 'Gym and training flow at Apex Arena',
  },
  {
    label: 'Дополнительный доход',
    title: 'Кафе, частные форматы и retail',
    body: 'Увеличивают средний чек и монетизируют поток людей, событий и статусных матчей.',
    image: cafeImage,
    alt: 'Cafe and hospitality zone at Apex Arena',
  },
] as const;

const unitEconomicsRoleByZone: Record<string, string> = {
  'Court A / Basketball': 'Драйвер вечернего прайм-тайма',
  'Court B / Futsal': 'Массовый объём и загрузка',
  'Court C / Tennis': 'Максимальный доход за час',
  Gym: 'Основа стабильной загрузки',
  'Combat Zone': 'Высокомаржинальные тренировки',
};

const unitEconomicsIconByZone: Record<string, string> = {
  'Court A / Basketball': '🏀',
  'Court B / Futsal': '⚽',
  'Court C / Tennis': '🎾',
  Gym: '🏋️',
  'Combat Zone': '🥊',
};

export default function InvestorDeck() {
  const totalSlides = slideMeta.length;
  const [currentSlide, setCurrentSlide] = useState(() => readSlideFromLocation(totalSlides));
  const [isResearchMenuOpen, setIsResearchMenuOpen] = useState(false);
  const researchMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (deckHotkeys.includes(event.key)) {
        event.preventDefault();
        setCurrentSlide((value) => Math.min(value + 1, totalSlides - 1));
      }
      if (leftHotkeys.includes(event.key)) {
        event.preventDefault();
        setCurrentSlide((value) => Math.max(value - 1, 0));
      }
      if (event.key === 'Home') setCurrentSlide(0);
      if (event.key === 'End') setCurrentSlide(totalSlides - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [totalSlides]);

  useEffect(() => {
    const syncFromLocation = () => setCurrentSlide(readSlideFromLocation(totalSlides));
    window.addEventListener('hashchange', syncFromLocation);
    return () => window.removeEventListener('hashchange', syncFromLocation);
  }, [totalSlides]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.hash = `slide-${String(currentSlide + 1).padStart(2, '0')}`;
    window.history.replaceState(null, '', url.toString());
  }, [currentSlide]);

  useEffect(() => {
    setIsResearchMenuOpen(false);
  }, [currentSlide]);

  const currentMeta = slideMeta[currentSlide];
  const narrative = slideNarratives[currentMeta.key];
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  const isIntroSlide = currentSlide === 0;
  const isDemandSlide = currentSlide === 2;
  const isOperatingSlide = currentSlide === 3;
  const isReturnsSlide = currentSlide === 10;
  const isClosingSlide = currentSlide === 15;
  const spotlight = useMemo(
    () => getSpotlightStats(currentSlide),
    [currentSlide],
  );

  useEffect(() => {
    if (!isResearchMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!researchMenuRef.current?.contains(event.target as Node)) {
        setIsResearchMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsResearchMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isResearchMenuOpen]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060708] text-[#f6efe5]">
      <BackgroundImage src={backdropBySlide[currentSlide]} emphasize={isIntroSlide} />

      <div className="relative z-10 grid min-h-screen grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-white/8 bg-[rgba(7,9,12,0.82)] backdrop-blur-xl xl:border-r xl:border-b-0">
          <div className="flex h-full flex-col px-5 py-5 xl:px-6 xl:py-7">
            <div>
              <div className="text-[11px] uppercase tracking-[0.42em] text-[#bea890]/58">Инвестиционная презентация</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-sm tracking-[0.28em] text-[#f7e8d5]">
                  AA
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.32em] text-[#f4e8d8]/84">{brandName}</div>
                  <div className="mt-1 text-xs text-[#d5c4b0]/56">Флагманская спортивная платформа, Ташкент</div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#bea890]/55">Инвестиционный тезис</div>
              <div className="mt-3 text-[15px] leading-7 text-[#f5ecdf]/84">
                Масштабируемый премиум-бренд, объединяющий все грани спорта: от детских академий до профессиональных лиг и клубного сервиса.
              </div>
            </div>

            <nav className="mt-6 min-h-0 flex-1 overflow-auto pr-1">
              <div className="space-y-2">
                {slideMeta.map((slide, index) => {
                  const active = index === currentSlide;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-full rounded-[22px] border px-4 py-3 text-left transition ${
                        active
                          ? 'border-white/16 bg-white/[0.09] shadow-[0_14px_40px_rgba(0,0,0,0.22)]'
                          : 'border-white/6 bg-white/[0.03] hover:border-white/12 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.28em] text-[#bea890]/48">
                            {String(slide.id).padStart(2, '0')}
                          </div>
                          <div className="mt-2 text-sm leading-6 text-[#f6efe5]/84">{slide.title}</div>
                        </div>
                        <div className={`mt-1 h-2.5 w-2.5 rounded-full ${active ? 'bg-[#d6ae83]' : 'bg-white/18'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[#bea890]/52">
                <span>Прогресс</span>
                <span>{String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8e5e2f] via-[#e3c29e] to-[#7e97aa]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 bg-[linear-gradient(180deg,rgba(5,6,8,0.6),rgba(5,6,8,0.86)_22%,rgba(5,6,8,0.94))]">
          <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
            <header
              className={`relative ${isDemandSlide ? 'z-40' : 'z-10'} grid gap-4 rounded-[30px] border border-white/10 bg-black/20 backdrop-blur-xl ${
                isClosingSlide
                  ? 'px-6 py-6 sm:px-8 xl:grid-cols-[minmax(0,1fr)_348px] xl:items-start xl:gap-7'
                  : 'px-5 py-5 sm:px-7 xl:grid-cols-[minmax(0,1fr)_392px] xl:items-start xl:gap-6'
              }`}
            >
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.36em] text-[#cbb49b]/56">{currentMeta.eyebrow}</div>
                <h1
                  className={`mt-3 text-[28px] leading-[1.05] text-[#fbf3e6] sm:text-[40px] ${
                    isClosingSlide ? 'max-w-[980px] xl:text-[52px]' : 'max-w-4xl xl:text-[54px]'
                  }`}
                >
                  {currentMeta.title}
                </h1>
                {currentMeta.subtitle ? (
                  isDemandSlide ? (
                    <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between xl:gap-6">
                      <p className="max-w-3xl text-[15px] leading-7 text-[#e2d4c4]/74 sm:text-[17px]">
                        {currentMeta.subtitle}
                      </p>
                      <DemandResearchMenu
                        open={isResearchMenuOpen}
                        onToggle={() => setIsResearchMenuOpen((value) => !value)}
                        onClose={() => setIsResearchMenuOpen(false)}
                        containerRef={researchMenuRef}
                      />
                    </div>
                  ) : (
                    <p className="mt-4 max-w-4xl text-[15px] leading-7 text-[#e2d4c4]/74 sm:text-[17px]">
                      {currentMeta.subtitle}
                    </p>
                  )
                ) : null}
              </div>

              <div className={`grid min-w-[280px] grid-cols-2 ${isClosingSlide ? 'gap-2 sm:min-w-[320px]' : 'gap-3 sm:min-w-[360px]'} xl:min-w-0 xl:self-start`}>
                {spotlight.map((metric) => (
                  <MetricPill key={metric.label} compact={isClosingSlide} {...metric} />
                ))}
              </div>
            </header>

            <div className="mt-5 grid flex-1 grid-cols-1 gap-5">
              <section
                className={`min-w-0 rounded-[34px] border shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl ${
                  isClosingSlide
                    ? 'relative overflow-hidden border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(198,154,103,0.08),transparent_24%),radial-gradient(circle_at_right,rgba(99,125,151,0.09),transparent_28%),linear-gradient(180deg,rgba(11,13,16,0.8),rgba(8,10,13,0.94))] p-4 sm:p-7 xl:px-9 xl:py-8'
                    : 'border-white/10 bg-[rgba(11,13,16,0.72)] p-4 sm:p-6 xl:p-7'
                }`}
              >
                {isOperatingSlide ? (
                  <OperatingDailyCycleBlock />
                ) : isReturnsSlide || isClosingSlide ? null : (
                  <NarrativeCard label={narrative.leadLabel} title={narrative.leadTitle} body={narrative.leadBody} />
                )}
                {isDemandSlide ? (
                  <div className="mt-4">
                    <NarrativeCard
                      label="Рост населения"
                      title="Спрос на спорт усиливается за счёт роста населения."
                      body="Население Узбекистана стабильно увеличивается на 800-900 тысяч человек в год, формируя новую базу потенциальной аудитории и усиливая спрос на спортивную инфраструктуру."
                    />
                  </div>
                ) : null}
                <div className={isClosingSlide ? 'mt-8 sm:mt-10' : 'mt-6'}>{renderSlide(currentSlide)}</div>
              </section>
            </div>

            <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[26px] border border-white/10 bg-[rgba(10,11,13,0.72)] px-4 py-4 backdrop-blur-xl sm:px-5">
              <button
                onClick={() => setCurrentSlide((value) => Math.max(value - 1, 0))}
                disabled={currentSlide === 0}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#f3e8d8]/78 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" /> Назад
              </button>
              <div className="text-center text-sm text-[#d9c9b6]/62">{brandName} · инвестиционная презентация</div>
              <button
                onClick={() => setCurrentSlide((value) => Math.min(value + 1, totalSlides - 1))}
                disabled={currentSlide === totalSlides - 1}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#f3e8d8]/78 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-35"
              >
                Далее <ArrowRight className="h-4 w-4" />
              </button>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function renderSlide(index: number) {
  switch (index) {
    case 0:
      return <CoverSlide />;
    case 1:
      return <ProblemSlide />;
    case 2:
      return <DemandSlide />;
    case 3:
      return <OperatingSlide />;
    case 4:
      return <LayoutSlide />;
    case 5:
      return <ProductsSlide />;
    case 6:
      return <RevenueSlide />;
    case 7:
      return <UnitEconomicsSlide />;
    case 8:
      return <ScheduleSlide />;
    case 9:
      return <GrowthSlide />;
    case 10:
      return <ReturnsSlide />;
    case 11:
      return <WhyWorksSlide />;
    case 12:
      return <CompetitionSlide />;
    case 13:
      return <InvestmentSlide />;
    case 14:
      return <ExpansionSlide />;
    case 15:
      return <ClosingSlide />;
    default:
      return null;
  }
}

function CoverSlide() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <HighlightCard icon={ChartColumnBig} label="Модель" title="Диверсифицированная модель доходов" body="Мы объединяем академию, аренду кортов, турниры, фитнес и ритейл в единую экосистему. Такое сочетание операционных потоков и спонсорских контрактов создает устойчивый и высокодоходный актив." />
        <HighlightCard icon={CircleDollarSign} label="Капитал" title="Прозрачная модель окупаемости" body="В расчетах заложена консервативная модель загрузки, а не идеализированный сценарий. Это делает финансовый результат прогнозируемым и устойчивым к рыночным колебаниям." />
      </div>

      <div className="mt-6 flex justify-center">
        <div className="relative w-full max-w-[980px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <img
            src={exteriorImage}
            alt="Apex Arena exterior"
            className="w-full aspect-video object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </div>
  );
}

function ProblemSlide() {
  const problemImages = [
    { src: competitionImage, alt: 'Competition overview visual' },
    { src: careerStairsImage, alt: 'Career stairs visual' },
    { src: statImage, alt: 'Player statistics visual' },
  ];

  return (
    <div className="grid gap-4">
      {problemCards.map((card, index) => (
        <div
          key={card.index}
          className={`rounded-[28px] border p-5 ${toneStyles[card.tone].ring} ${toneStyles[card.tone].soft} ${toneStyles[card.tone].glow}`}
        >
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.34em] text-[#ccb8a0]/56">Problem {card.index}</div>
              <div className={`mt-3 text-[19px] leading-8 ${toneStyles[card.tone].text}`}>{card.title}</div>
            </div>
            <div className="min-w-0">
              <ZoomableImage
                src={problemImages[index]?.src}
                alt={problemImages[index]?.alt ?? `Problem ${card.index} visual`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DemandSlide() {
  const totalDemand = demandMixData.reduce((sum, item) => sum + item.value, 0);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const activeDemand = activeIndex === undefined ? null : demandMixData[activeIndex];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-5">
        <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Структура спроса</div>
        <div className="relative mt-5 h-[500px] sm:h-[540px]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[382px] w-[382px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),rgba(255,255,255,0.015)_48%,transparent_72%)] blur-[2px] sm:h-[412px] sm:w-[412px]" />
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {demandMixData.map((entry, index) => (
                  <linearGradient
                    key={entry.name}
                    id={`demand-standard-gradient-${index}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={entry.color} stopOpacity="1" />
                    <stop offset="100%" stopColor={entry.color} stopOpacity="0.82" />
                  </linearGradient>
                ))}
                <filter id="demand-standard-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <Pie
                data={[{ value: 100 }]}
                dataKey="value"
                cx="43%"
                cy="50%"
                innerRadius={88}
                outerRadius={188}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth={1}
                isAnimationActive={false}
              />

              <Pie
                data={demandMixData}
                dataKey="value"
                nameKey="name"
                cx="43%"
                cy="50%"
                innerRadius={96}
                outerRadius={182}
                paddingAngle={1}
                stroke="rgba(10,12,16,0.82)"
                strokeWidth={3}
                activeIndex={activeIndex}
                activeShape={DemandMixActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                {demandMixData.map((entry, index) => (
                  <Cell key={entry.name} fill={`url(#demand-standard-gradient-${index})`} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div
            className="pointer-events-none absolute"
            style={{ left: '43%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <img
              src={uzbekistanFlagImage}
              alt="Uzbekistan flag"
              className="h-[132px] w-[132px] rounded-full object-cover shadow-[0_10px_24px_rgba(0,0,0,0.22)] sm:h-[138px] sm:w-[138px]"
            />
          </div>

          <DemandMixInfoCard item={activeDemand} total={totalDemand} />
        </div>

        <div className="mt-5 border-t border-white/8 pt-4">
          <div className="text-[10px] uppercase tracking-[0.28em] text-[#c7b39b]/44">Ролевая легенда</div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {demandLegendItems.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] px-3 py-2 text-[12px] leading-5 text-[#efe1d0]/76"
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.14)]"
                  style={{ backgroundColor: item.color }}
                />
                <span>
                  {item.label}
                  <span className="text-white/38"> — </span>
                  <span className="text-[#d8cab8]/60">{item.note}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
          {captureBands.map((band) => (
            <MetricCard key={band.label} label={band.label} value={band.range} note={band.note} tone={band.tone} />
          ))}
        </div>
        <TextBlock
          title="Сегментация спроса"
          body="Спрос формируется не одним рынком, а портфелем сегментов. Basketball и futsal дают массовую частоту и вечернюю загрузку. Tennis добавляет premium-чек и private training. Gym создаёт ежедневный recurring traffic. Combat усиливает retention, youth/adult fitness и стабильную групповую загрузку."
        />
      </div>
    </div>
  );
}

function DemandResearchMenu({
  open,
  onToggle,
  onClose,
  containerRef,
}: {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={containerRef} className="relative z-30 w-full xl:w-auto xl:max-w-[400px]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="demand-research-menu"
        className="inline-flex w-full items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-4 py-3 text-left text-sm text-[#f5e9d9]/84 shadow-[0_16px_38px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-[1px] hover:border-white/16 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] hover:shadow-[0_22px_54px_rgba(0,0,0,0.24)] xl:min-w-[280px]"
      >
        <span>Открыть исследования</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition duration-300 ${open ? 'rotate-180 text-[#f0cda7]' : 'text-white/56'}`} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 xl:hidden ${
          open ? 'mt-3 max-h-[440px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,16,21,0.88),rgba(8,10,14,0.78))] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-[24px]">
          <DemandResearchMenuContent onClose={onClose} />
        </div>
      </div>

      <div
        id="demand-research-menu"
        role="menu"
        aria-hidden={!open}
        className={`hidden overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,16,21,0.88),rgba(8,10,14,0.78))] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-[24px] transition-all duration-200 xl:absolute xl:left-auto xl:right-0 xl:top-[calc(100%+12px)] xl:block xl:w-[390px] ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <DemandResearchMenuContent onClose={onClose} />
      </div>
    </div>
  );
}

function DemandResearchMenuContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="px-3 pb-2 pt-1">
        <div className="text-[10px] uppercase tracking-[0.28em] text-[#c7b39b]/50">Исследования рынка</div>
        <div className="mt-2 text-xs leading-5 text-[#d9cab8]/56">
          6 файлов по сегментам спроса и платёжной аудитории.
        </div>
      </div>

      <div className="max-h-[340px] space-y-2 overflow-y-auto pr-1 xl:max-h-[420px]">
        {demandResearchLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={onClose}
            className="group flex items-center gap-3 rounded-[18px] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.018))] px-3 py-3 transition duration-300 hover:-translate-y-[1px] hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.028))] hover:shadow-[0_18px_48px_rgba(0,0,0,0.2)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f0e0cb]/78 transition group-hover:border-white/16 group-hover:bg-white/[0.07]">
              <FileText className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm leading-6 text-[#f4eadb]/84">{item.label}</div>
              <div className="text-xs text-[#d2c2b1]/48">Открыть в новой вкладке</div>
            </div>
            <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-[#d9be9d]/68">
              {item.format}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

function DemandMixInfoCard({
  item,
  total,
}: {
  item: { color: string; name: string; value: number } | null;
  total: number;
}) {
  if (!item) {
    return (
      <div className="pointer-events-none absolute right-4 top-1/2 z-10 w-[220px] -translate-y-1/2 translate-x-4 rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,15,20,0.62),rgba(8,10,14,0.42))] px-4 py-4 opacity-0 backdrop-blur-xl transition-all duration-300" />
    );
  }

  const percent = ((item.value / total) * 100).toFixed(1);

  return (
    <div className="pointer-events-none absolute right-4 top-1/2 z-10 w-[220px] -translate-y-1/2 translate-x-0 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,24,0.82),rgba(9,11,15,0.66))] px-4 py-4 opacity-100 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300">
      <div className="text-[10px] uppercase tracking-[0.28em] text-white/42">Фокус сегмента</div>
      <div className="mt-3 flex items-center gap-3 text-white/88">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
        <span className="leading-6">{item.name}</span>
      </div>
      <div className="mt-4 text-[28px] leading-none text-white/92">{item.value.toLocaleString('ru-RU')}</div>
      <div className="mt-2 text-sm text-white/60">{percent}% в общей структуре спроса</div>
    </div>
  );
}

function DemandMixActiveShape(props: {
  cx?: number;
  cy?: number;
  fill?: string;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
}) {
  const {
    cx = 0,
    cy = 0,
    fill = '#ffffff',
    innerRadius = 96,
    outerRadius = 182,
    startAngle = 0,
    endAngle = 0,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter="url(#demand-standard-glow)"
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 2}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="rgba(255,255,255,0.2)"
      />
    </g>
  );
}

function OperatingSlide() {
  return (
    <div className="grid gap-5">
      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(67,99,129,0.14),rgba(255,255,255,0.035)_38%,rgba(191,120,58,0.12)_100%)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-6">
        <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Разные зоны формируют разные источники дохода</div>
        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 text-sm leading-6 text-[#e6d7c7]/74">
            Игровые зоны дают основной поток за счёт лиг и турниров.
          </div>
          <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 text-sm leading-6 text-[#e6d7c7]/74">
            Боевые искусства обеспечивают стабильную загрузку через групповые занятия.
          </div>
          <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 text-sm leading-6 text-[#e6d7c7]/74">
            Тренажёрный зал формирует ежедневный повторяющийся поток клиентов.
          </div>
        </div>
      </div>
    </div>
  );
}

function LayoutSlide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const activeSlide = layoutCarouselSlides[activeIndex];
  const showPrevSlide = () => setActiveIndex((value) => (value - 1 + layoutCarouselSlides.length) % layoutCarouselSlides.length);
  const showNextSlide = () => setActiveIndex((value) => (value + 1) % layoutCarouselSlides.length);
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const deltaX = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 48) return;
    if (deltaX > 0) {
      showPrevSlide();
      return;
    }
    showNextSlide();
  };
  const handleTouchCancel = () => {
    touchStartX.current = null;
  };

  return (
    <div className="grid gap-5">
      <div className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Swipe to compare, click to enlarge</div>
            <div className="mt-3 text-[22px] font-semibold text-[#fbf2e5] sm:text-[26px]">Карусель планов и структуры доходов</div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={showPrevSlide}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition hover:bg-white/[0.12] hover:text-white"
              aria-label="Предыдущий слайд"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNextSlide}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition hover:bg-white/[0.12] hover:text-white"
              aria-label="Следующий слайд"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={handleTouchCancel}>
          <LayoutCarousel slide={activeSlide} />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {layoutCarouselSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.24em] transition ${
                index === activeIndex
                  ? `${toneStyles[slide.tone].ring} bg-white/[0.08] text-[#fbf2e5]`
                  : 'border-white/10 bg-white/[0.03] text-[#d6c7b5]/62 hover:bg-white/[0.08] hover:text-[#fbf2e5]'
              }`}
              aria-label={`Перейти к слайду ${slide.title}`}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {zoneRevenueRows.map((row) => (
          <div key={row.zone} className={`rounded-[24px] border p-4 ${toneStyles[row.tone].ring} bg-white/[0.03]`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[16px] text-[#fbf1e3]/82">{row.zone}</div>
                <div className="mt-1 text-sm text-[#cfbaa2]/62">{row.role}</div>
              </div>
              <div className={`text-sm ${toneStyles[row.tone].text}`}>{row.value}</div>
            </div>
            <div className="mt-3 text-sm leading-6 text-[#e1d1bf]/68">{row.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayoutCarousel({ slide }: { slide: LayoutCarouselSlide }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [slide.id]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] xl:items-stretch">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`group relative overflow-hidden rounded-[30px] border bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] text-left transition ${toneStyles[slide.tone].ring}`}
          aria-label={`${slide.alt}. Открыть увеличенное изображение`}
        >
          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#fbf2e5]/72">
            Click to enlarge
          </div>
          <div className="flex min-h-[320px] items-center justify-center p-4 sm:min-h-[420px] sm:p-5 xl:min-h-[540px] xl:p-7">
            <img
              src={slide.image}
              alt={slide.alt}
              className="max-h-[540px] w-full rounded-[20px] object-contain transition duration-300 group-hover:scale-[1.01]"
              draggable={false}
            />
          </div>
        </button>

        <div className={`rounded-[30px] border p-5 sm:p-6 ${toneStyles[slide.tone].ring} ${toneStyles[slide.tone].soft}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">{slide.label}</div>
              <div className="mt-3 text-[24px] leading-tight text-[#fbf2e5] sm:text-[30px]">{slide.title}</div>
            </div>
            <div className={`w-fit rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.28em] ${toneStyles[slide.tone].ring} ${toneStyles[slide.tone].text}`}>
              {slide.accent}
            </div>
          </div>

          <div className="mt-5 text-[15px] leading-7 text-[#e4d6c5]/74">{slide.body}</div>

          <div className="mt-5 flex flex-wrap gap-2">
            {slide.chips.map((chip) => (
              <div
                key={chip}
                className={`rounded-full border px-3 py-2 text-sm ${toneStyles[slide.tone].ring} bg-white/[0.05] ${toneStyles[slide.tone].text}`}
              >
                {chip}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <div className="text-sm text-[#dbcbb8]/62">Нажмите на изображение, чтобы открыть его в полном размере.</div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-[#fbf2e5]/82 transition hover:bg-white/[0.12]"
            >
              Open full size
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(4,6,9,0.88)] px-4 py-8 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/78 transition hover:bg-black/45 hover:text-white"
            aria-label="Закрыть увеличенное изображение"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="w-full max-w-[1400px] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,12,15,0.98),rgba(8,10,13,0.98))] p-4 shadow-[0_32px_120px_rgba(0,0,0,0.45)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="max-h-[84vh] w-full rounded-[20px] object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function ProductsSlide() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => setActiveIndex((value) => (value - 1 + monetizationCarouselSlides.length) % monetizationCarouselSlides.length);
  const goNext = () => setActiveIndex((value) => (value + 1) % monetizationCarouselSlides.length);

  return (
    <div className="space-y-5">
      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-6">
        <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Ключевые денежные потоки</div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {monetizationMoneyFlows.map((item) => (
            <div key={item.title} className={`rounded-[24px] border p-4 sm:p-5 ${toneStyles[item.tone].ring} ${toneStyles[item.tone].soft}`}>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[#c7b39b]/48">Поток</div>
              <div className="mt-3 text-[18px] leading-tight text-[#fbf2e5]/88">{item.title}</div>
              <div className={`mt-4 text-[22px] leading-tight sm:text-[26px] ${toneStyles[item.tone].text}`}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 shadow-[0_22px_60px_rgba(0,0,0,0.22)] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Главный модуль слайда</div>
            <div className="mt-2 text-[22px] leading-tight text-[#fbf2e5] sm:text-[26px]">Как работает спортивный цикл внутри объекта</div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Предыдущий слайд карусели"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[#f3e8d8]/78 transition hover:border-white/16 hover:bg-white/[0.08]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Следующий слайд карусели"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[#f3e8d8]/78 transition hover:border-white/16 hover:bg-white/[0.08]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.58fr)_minmax(320px,0.42fr)] lg:items-stretch">
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0c1015] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {monetizationCarouselSlides.map((slide) => (
                <div key={slide.title} className="min-w-full">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0c1015]">
                    <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.12)_38%,rgba(0,0,0,0.56))]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-[340px] flex-col rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-5 sm:p-6">
            <div className="overflow-hidden flex-1">
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {monetizationCarouselSlides.map((slide) => (
                  <div key={slide.title} className="flex min-w-full flex-col justify-between">
                    <div>
                      <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#d7c1a8]/62">
                        {slide.label}
                      </div>
                      <div className="mt-4 text-[28px] leading-tight text-[#fbf2e5] sm:text-[34px]">{slide.title}</div>
                      <div className="mt-5 max-w-xl text-[15px] leading-7 text-[#e3d4c3]/74 sm:text-[16px]">{slide.body}</div>
                    </div>

                    <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-[11px] uppercase tracking-[0.3em] text-[#c7b39b]/48">Этап внутри цикла</div>
                      <div className="mt-2 text-sm leading-6 text-[#ece0d0]/74">
                        Каждый следующий слой усиливает уже созданный поток и переводит его в более устойчивую выручку.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {monetizationCarouselSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Перейти к слайду ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex ? 'w-8 bg-[#e2c19d]' : 'w-2.5 bg-white/18 hover:bg-white/28'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Предыдущий слайд карусели"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[#f3e8d8]/78 transition hover:border-white/16 hover:bg-white/[0.08]"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Следующий слайд карусели"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[#f3e8d8]/78 transition hover:border-white/16 hover:bg-white/[0.08]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueSlide() {
  const maxValue = Math.max(...revenueStreams.map((item) => item.value));
  return (
    <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
      <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-5">
        <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Monthly revenue mix</div>
        <div className="mt-5 space-y-4">
          {revenueStreams.map((stream) => (
            <RevenueBar key={stream.label} item={stream} maxValue={maxValue} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          <MetricCard label="Revenue" value={`${formatBillion(monthlyRevenueSummary)} млрд`} note="Зрелый месяц по полной модели." tone="amber" />
          <MetricCard label="Costs" value={`${formatBillion(monthlyCostSummary)} млрд`} note="Операционные расходы зрелого месяца." tone="steel" />
          <MetricCard label="Operating profit" value={`${formatBillion(monthlyProfitSummary)} млрд`} note="Доход после monthly operating costs." tone="copper" />
        </div>
        <TextBlock title="Почему модель дохода устойчива" body="Модель не завязана на одном источнике дохода.
Игровые площадки дают основной объём и вечернюю загрузку.
Тренажёрный зал и боевые искусства обеспечивают стабильный ежедневный поток.
Турниры и дополнительные сервисы усиливают доход в выходные и во время событий." />
      </div>
    </div>
  );
}

function UnitEconomicsSlide() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6 xl:gap-6">
        {unitEconomicsRows.map((row, index) => {
          const isPrimary = row.zone === 'Gym';
          const isPrimeTime = row.zone === 'Court A / Basketball';
          const isWideBottomCard = unitEconomicsRows.length === 5 && index >= 3;

          return (
            <div
              key={row.zone}
              className={`flex min-h-[220px] flex-col justify-between rounded-[30px] border p-6 sm:p-7 ${toneStyles[row.tone].ring} ${toneStyles[row.tone].soft} ${
                isWideBottomCard ? 'xl:col-span-3' : 'xl:col-span-2'
              } ${
                isPrimary ? 'shadow-[0_0_0_1px_rgba(197,117,88,0.14),0_28px_80px_rgba(197,117,88,0.22)]' : ''
              } ${isPrimeTime ? 'shadow-[0_0_0_1px_rgba(97,131,155,0.14),0_24px_70px_rgba(97,131,155,0.18)]' : ''}`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-[18px] opacity-70 grayscale">
                    {unitEconomicsIconByZone[row.zone]}
                  </span>
                  <div className="text-[24px] leading-tight text-[#faf0e2]/88 sm:text-[28px]">{row.zone}</div>
                </div>
                <div className="mt-5 text-[16px] leading-7 text-[#e2d3c2]/72">
                  {unitEconomicsRoleByZone[row.zone] ?? row.note}
                </div>
              </div>

              <div className={`mt-8 leading-none ${toneStyles[row.tone].text} ${isPrimary ? 'text-[32px] sm:text-[38px]' : 'text-[28px] sm:text-[34px]'}`}>
                {row.output}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScheduleSlide() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Структура дня</div>
          <div className="mt-5 space-y-3">
            {scheduleBands.map((band) => (
              <div key={band.hours} className={`rounded-[22px] border px-4 py-4 sm:px-5 ${toneStyles[band.tone].ring} ${toneStyles[band.tone].soft}`}>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.28em] text-[#d6c1a6]/52">{band.hours}</div>
                      <div className="mt-2 text-[16px] leading-6 text-[#faf0e2]/86 sm:text-[17px]">{band.title}</div>
                    </div>
                    <div className="text-sm text-[#decfbe]/68">→ {band.role}</div>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/8">
                    <div className={`h-full rounded-full ${toneStyles[band.tone].bar}`} style={{ width: `${band.intensity}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.05] p-5 sm:p-6">
          <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Турнирная модель выходных</div>
          <div className="mt-5 space-y-3">
            {weekendWindows.map((window) => (
              <div key={window.label} className="flex items-center justify-between gap-5 rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${toneStyles[window.tone].bar}`} />
                  <div className="text-[15px] text-[#faf0e1]/84 sm:text-[16px]">{window.label}</div>
                </div>
                <div className={`shrink-0 text-sm sm:text-[15px] ${toneStyles[window.tone].text}`}>{window.logic}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-sm leading-6 text-[#d8c9b7]/66">
        Будни формируют стабильный доход, выходные — усиливают выручку
      </div>
    </div>
  );
}

function GrowthSlide() {
  const maxRevenue = Math.max(...growthYears.map((year) => year.revenue));
  return (
    <div className="grid gap-5 xl:grid-cols-[0.98fr_1.02fr]">
      <div className="space-y-4">
        {growthYears.map((year) => (
          <div key={year.year} className={`rounded-[26px] border p-5 ${toneStyles[year.tone].ring} ${toneStyles[year.tone].soft}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg text-[#faf0e2]/84">{year.year}</div>
                <div className="mt-2 text-sm leading-6 text-[#d7c8b7]/62">{year.description}</div>
              </div>
              <div className={`text-sm ${toneStyles[year.tone].text}`}>{year.revenueLabel}</div>
            </div>
            <div className="mt-4 h-3 rounded-full bg-white/8">
              <div className={`h-full rounded-full ${toneStyles[year.tone].bar}`} style={{ width: `${(year.revenue / maxRevenue) * 100}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-[#d7c8b7]/62">Операционная прибыль</span>
              <span className={toneStyles[year.tone].text}>{year.profitLabel}</span>
            </div>
          </div>
        ))}
      </div>
      <ImageCard
        src={lobbyImage}
        alt="Лобби"
        title="Рост обеспечивается не только спросом, но и эффективным управлением расписанием"
        note="Год 1 — запуск и формирование базы. Год 2 — увеличение загрузки вечерних часов. Год 3 — высокая плотность турниров, дорогих слотов и дополнительной монетизации."
        tall
      />
    </div>
  );
}

function ReturnsSlide() {
  const flowSteps = [
    {
      title: 'Базовый поток дохода',
      body: 'Академия и абонементы создают постоянный поток клиентов',
      panelClass:
        'border-[#4f6b7f]/60 bg-[linear-gradient(180deg,rgba(97,131,155,0.22),rgba(97,131,155,0.05))] text-[#a9c3d8]',
    },
    {
      title: 'Основная выручка',
      body: 'Лиги и премиальные слоты формируют основную выручку',
      panelClass:
        'border-[#8f5b2b]/60 bg-[linear-gradient(180deg,rgba(198,123,55,0.22),rgba(198,123,55,0.05))] text-[#f0bf8f]',
    },
    {
      title: 'Дополнительная выручка',
      body: 'Турниры и мероприятия увеличивают доход без роста постоянных затрат',
      panelClass:
        'border-[#75508d]/60 bg-[linear-gradient(180deg,rgba(137,88,177,0.22),rgba(137,88,177,0.05))] text-[#d7b2f3]',
    },
    {
      title: 'Возврат капитала',
      value: '30–36 месяцев',
      body: 'При достижении плановой загрузки',
      panelClass:
        'border-[#4e8f67]/75 bg-[linear-gradient(180deg,rgba(85,163,114,0.28),rgba(85,163,114,0.07))] text-[#b9efc6] shadow-[0_0_0_1px_rgba(85,163,114,0.2),0_42px_108px_rgba(85,163,114,0.32)]',
      final: true,
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto pb-1">
        <div className="relative min-w-[1120px] rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-6 py-8 sm:px-7">
          <div className="pointer-events-none absolute left-[72px] right-[72px] top-1/2 hidden h-[2px] -translate-y-1/2 bg-[linear-gradient(90deg,rgba(111,147,173,0.62),rgba(198,123,55,0.62),rgba(137,88,177,0.62),rgba(85,163,114,0.62))] xl:block" />
          <div className="relative grid items-center gap-4 xl:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)_72px_minmax(0,1fr)_72px_minmax(0,1.24fr)]">
            {flowSteps.map((step, index) => (
              <Fragment key={step.title}>
                <div
                  className={`rounded-[28px] border px-5 py-5 ${step.panelClass} ${step.final ? 'min-h-[290px] px-6 py-7 xl:min-h-[336px]' : 'min-h-[220px]'} flex ${step.final ? 'flex-col items-center justify-center text-center' : 'flex-col justify-between'}`}
                >
                  {step.final ? (
                    <>
                      <div className="text-[27px] leading-tight sm:text-[32px]">{step.title}</div>
                      <div className="mt-8 text-[42px] leading-none sm:text-[60px]">{step.value}</div>
                      <div className="mt-3 text-[12px] uppercase tracking-[0.22em] text-[#e7f7e8]/52">(базовый сценарий)</div>
                      <div className="mt-6 max-w-[240px] text-[15px] leading-7 text-[#f2e7d9]/82">{step.body}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-[21px] leading-tight sm:text-[24px]">{step.title}</div>
                      <div className="mt-6 text-sm leading-7 text-[#f2e7d9]/78">{step.body}</div>
                    </>
                  )}
                </div>
                {index < flowSteps.length - 1 ? (
                  <div className="relative z-10 flex h-full items-center justify-center self-stretch">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-[#12161b] text-[#f5e8d8]/82 shadow-[0_14px_34px_rgba(0,0,0,0.24)]">
                      <ArrowRight className="h-6 w-6" strokeWidth={2.4} />
                    </div>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-6 py-4 text-center text-[15px] leading-6 text-[#e7d8c7]/78">
        Модель сохраняет устойчивость даже при снижении загрузки,
        <br className="hidden sm:block" />так как доход распределён между несколькими источниками
      </div>
    </div>
  );
}

function WhyWorksSlide() {
  const strategicFrameStyles = [
    'border-[#4f6b7f]/60 bg-[linear-gradient(180deg,rgba(97,131,155,0.22),rgba(97,131,155,0.05))] text-[#a9c3d8]',
    'border-[#8f5b2b]/60 bg-[linear-gradient(180deg,rgba(198,123,55,0.22),rgba(198,123,55,0.05))] text-[#f0bf8f]',
    'border-[#75508d]/60 bg-[linear-gradient(180deg,rgba(137,88,177,0.22),rgba(137,88,177,0.05))] text-[#d7b2f3]',
    'border-[#4e8f67]/60 bg-[linear-gradient(180deg,rgba(85,163,114,0.22),rgba(85,163,114,0.05))] text-[#b9efc6]',
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        {whyBlocks.map((block, index) => (
          <div key={block.index} className={`rounded-[28px] border p-5 sm:p-6 ${strategicFrameStyles[index]}`}>
            <div className="text-[22px] leading-tight sm:text-[24px]">{block.title}</div>
            <div className="mt-4 text-sm leading-7 text-[#efe3d4]/76">{block.text}</div>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-6 py-5 text-center text-[15px] leading-7 text-[#e7d8c7]/78">
        Модель не зависит от одного источника дохода
        <br className="hidden sm:block" />и сохраняет устойчивость при снижении загрузки отдельных сегментов
      </div>
    </div>
  );
}

function CompetitionSlide() {
  const emphasizedCriteria = new Set(['Основа выручки', 'Выходные и события', 'Дополнительный доход']);

  return (
    <div className="overflow-x-auto rounded-[30px] border border-white/10 bg-white/[0.035]">
      <div className="min-w-[980px]">
        <div className="grid grid-cols-[220px_1fr_1.08fr] border-b border-white/10 bg-white/[0.045] px-6 py-4 text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/52">
          <div>Критерий</div>
          <div>Типичный рынок</div>
          <div className="rounded-[14px] bg-[rgba(214,174,131,0.08)] px-4 py-2 text-[#f2dfc4]/78">APEX ARENA</div>
        </div>
        {competitionRows.map((row) => (
          <div
            key={row.criterion}
            className={`grid grid-cols-[220px_1fr_1.08fr] items-stretch border-b px-6 py-5 last:border-b-0 ${
              emphasizedCriteria.has(row.criterion)
                ? 'border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.03),rgba(214,174,131,0.05))]'
                : 'border-white/6'
            }`}
          >
            <div className="pr-6 text-[15px] leading-6 text-[#fff2e1]/84">{row.criterion}</div>
            <div className="pr-6 text-[15px] leading-7 text-[#cfbaa2]/64">{row.market}</div>
            <div
              className={`rounded-[18px] border px-5 py-4 text-[15px] leading-7 ${
                emphasizedCriteria.has(row.criterion)
                  ? 'border-[#8f5b2b]/30 bg-[linear-gradient(180deg,rgba(198,123,55,0.11),rgba(198,123,55,0.03))] text-[#f4e3ca]/88'
                  : 'border-white/8 bg-white/[0.03] text-[#f1dfc4]/82'
              }`}
            >
              {row.apex}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestmentSlide() {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.98fr_1.02fr]">
      <div className="space-y-4">
        {allocationRows.map((row) => (
          <AllocationCard key={row.item} row={row} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <TextBlock
          title="Логика распределения"
          body="Средства распределяются не по принципу «ремонт + оборудование», а по логике запуска полноценной доходной модели."
        />

        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03]">
          <div className="px-5 pt-5 text-[11px] uppercase tracking-[0.3em] text-[#c7b39b]/52">
            Планировка подчинена не только площади, но и логике монетизации зон
          </div>
          <div className="mt-4 px-5">
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0d10] px-3 py-3">
              <img src={floorPlanTwoImage} alt="Планировка второго этажа" className="h-[260px] w-full object-contain" />
            </div>
          </div>
          <div className="p-5">
            <div className="text-lg text-[#fbf1e2]/84">Капитал работает на архитектуру выручки</div>
            <div className="mt-3 text-sm leading-6 text-[#ddcebc]/68">
              Инвестиции направлены в среду, которая поддерживает академию, вечерние лиги, турнирный календарь, тренажёрный зал, дополнительные продажи и клиентский поток внутри одного объекта.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpansionSlide() {
  const phaseStyles = [
    'border-[#4f6b7f]/40 bg-[linear-gradient(180deg,rgba(97,131,155,0.12),rgba(97,131,155,0.03))]',
    'border-[#8f5b2b]/40 bg-[linear-gradient(180deg,rgba(198,123,55,0.12),rgba(198,123,55,0.03))]',
    'border-[#75508d]/40 bg-[linear-gradient(180deg,rgba(137,88,177,0.12),rgba(137,88,177,0.03))]',
    'border-[#4e8f67]/40 bg-[linear-gradient(180deg,rgba(85,163,114,0.12),rgba(85,163,114,0.03))]',
  ] as const;

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
      <div className="space-y-4">
        {roadmapPhases.map((phase, index) => (
          <div key={phase.stage} className={`relative rounded-[26px] border p-5 ${phaseStyles[index]}`}>
            {index < roadmapPhases.length - 1 ? <div className="absolute left-9 top-full h-4 w-px bg-white/10" /> : null}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[11px] tracking-[0.18em] text-[#f4e5d4]/72">
                {phase.stage}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/52">Этап</div>
                <div className="mt-2 text-lg text-[#fbf1e2]/86">{phase.title}</div>
                <div className="mt-3 text-sm leading-6 text-[#ded0bf]/68">{phase.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        {strategyVisuals.slice(2).map((card) => (
          <ImageCard key={card.title} src={card.src} alt={card.alt} title={card.title} note={card.note} />
        ))}
      </div>
    </div>
  );
}

function ClosingSlide() {
  const investorPoints = ['Запуск первого объекта', 'Долю в масштабируемой модели', 'Прогнозируемый возврат', 'Потенциал сети'];

  return (
    <div className="relative space-y-7">
      <div className="pointer-events-none absolute -left-20 top-10 h-[220px] w-[220px] rounded-full bg-[#bf8a58]/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-[16%] top-0 h-[260px] w-[260px] rounded-full bg-[#66809b]/10 blur-[120px]" />

      <div className="grid gap-9 xl:min-h-[660px] xl:grid-cols-[240px_minmax(0,0.9fr)_minmax(520px,1.18fr)] xl:items-center">
        <div className="xl:flex xl:self-center">
          <div className="relative max-w-[268px] pl-6">
            <div className="absolute left-0 top-0 h-[126px] w-px bg-gradient-to-b from-[#d4ad84]/84 via-white/18 to-transparent" />
            <div className="absolute left-[-4px] top-0 h-[8px] w-[8px] rounded-full bg-[#d8b48b]" />
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Основания для запуска</div>
            <div className="mt-7 space-y-[18px]">
              {closingProofs.map((proof) => (
                <div key={proof} className="flex items-start gap-3 text-[15px] leading-7 text-[#efe3d4]/72 sm:text-[16px]">
                  <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8b48b]/90 shadow-[0_0_12px_rgba(216,180,139,0.38)]" />
                  <span>{proof}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-h-[260px] items-center xl:min-h-[660px] xl:self-center">
          <div className="max-w-[620px] xl:max-w-[560px]">
            <div className="text-[32px] leading-[1.03] text-[#fbf2e6] sm:text-[43px] xl:text-[58px]">
              APEX ARENA — это спортивно-коммерческая платформа,
              <br className="hidden sm:block" />
              где доход строится на системе загрузки,
              <br className="hidden sm:block" />
              а не на одном продукте
            </div>
            <div className="mt-8 h-px w-24 bg-gradient-to-r from-[#d8b48b]/84 via-[#f7e7d0]/38 to-transparent" />
          </div>
        </div>

        <div className="relative min-h-[480px] xl:min-h-[720px] xl:-mr-12 xl:-mt-8">
          <div className="pointer-events-none absolute left-[-7%] top-[22%] hidden h-[220px] w-[220px] rounded-full bg-[#d3a16b]/14 blur-[120px] xl:block" />
          <div className="absolute inset-0 overflow-hidden rounded-[46px] shadow-[0_50px_150px_rgba(0,0,0,0.42)]">
            <img
              src={exteriorImage}
              alt="Вечерний внешний вид комплекса APEX ARENA"
              className="absolute inset-0 h-full w-full object-cover object-center xl:scale-[1.16] xl:-translate-y-5"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,12,0.88)_0%,rgba(7,9,12,0.52)_12%,rgba(7,9,12,0.18)_24%,rgba(7,9,12,0.02)_36%),linear-gradient(180deg,rgba(3,5,7,0.03),rgba(3,5,7,0.08)_18%,rgba(3,5,7,0.4)_56%,rgba(3,5,7,0.74)_100%),radial-gradient(circle_at_top_left,rgba(214,174,131,0.18),transparent_34%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[56%] bg-[linear-gradient(180deg,rgba(7,9,12,0),rgba(7,9,12,0.18)_18%,rgba(7,9,12,0.72)_55%,rgba(7,9,12,0.94))]" />
            <div className="absolute inset-0 rounded-[46px] ring-1 ring-inset ring-white/10" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:w-[320px] xl:bottom-9 xl:right-9 xl:w-[352px] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,12,15,0.34),rgba(10,12,15,0.5))] px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-[20px]">
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Что получает инвестор</div>
            <div className="mt-4 space-y-3.5">
              {investorPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-[15px] leading-7 text-[#efe3d4]/78">
                  <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8b48b]/90 shadow-[0_0_12px_rgba(216,180,139,0.34)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[18px] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0.008))] px-7 py-3 text-center text-[14px] leading-7 tracking-[0.01em] text-[#f2e6d6]/58 sm:text-[15px]">
        Проект готов к обсуждению структуры сделки
      </div>
    </div>
  );
}

function RevenueBar({ item, maxValue }: { item: RevenueStream; maxValue: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="text-[#f7edde]/82">{item.label}</span>
        <span className={toneStyles[item.tone].text}>{item.display}</span>
      </div>
      <div className="h-3 rounded-full bg-white/8">
        <div className={`h-full rounded-full ${toneStyles[item.tone].bar}`} style={{ width: `${(item.value / maxValue) * 100}%` }} />
      </div>
      <div className="mt-2 text-sm leading-6 text-[#d9c8b4]/64">{item.note}</div>
    </div>
  );
}

function NarrativeCard({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">{label}</div>
      <div className="mt-3 text-[23px] leading-tight text-[#fbf2e5] sm:text-[28px]">{title}</div>
      {body ? <div className="mt-4 max-w-4xl text-[15px] leading-7 text-[#e4d6c5]/74">{body}</div> : null}
    </div>
  );
}

function OperatingDailyCycleBlock() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Суточный цикл загрузки</div>
      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {operatingCycleCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.028))] hover:shadow-[0_20px_60px_rgba(0,0,0,0.24)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#c8b39a]/54">{card.title}</div>
                  <div className="mt-3 text-[20px] leading-tight text-[#fbf2e5]/88">{card.subtitle}</div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f2e7d7]/78">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5 border-t border-white/8 pt-4">
                <div className="space-y-3">
                  {card.bars.map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-xs text-[#ded1c0]/62">
                        <span>{bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div className={`h-full rounded-full ${toneStyles[bar.tone].bar}`} style={{ width: `${bar.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm leading-6 text-[#e5d7c7]/72">{card.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetricCard({ label, value, note, tone }: { label: string; value: string; note?: string; tone: Tone }) {
  return (
    <div className={`rounded-[26px] border p-5 ${toneStyles[tone].ring} ${toneStyles[tone].soft}`}>
      <div className="text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/52">{label}</div>
      <div className={`mt-3 text-[30px] leading-none ${toneStyles[tone].text}`}>{value}</div>
      {note ? <div className="mt-3 text-sm leading-6 text-[#decebc]/68">{note}</div> : null}
    </div>
  );
}

function MetricPill({ label, value, note, tone, compact = false }: { label: string; value: string; note?: string; tone: Tone; compact?: boolean }) {
  return (
    <div className={`rounded-[22px] border ${compact ? 'px-3 py-3' : 'p-4'} ${toneStyles[tone].ring} bg-white/[0.04]`}>
      <div className={`${compact ? 'text-[9px] tracking-[0.24em]' : 'text-[10px] tracking-[0.28em]'} uppercase text-[#c3ad96]/48`}>{label}</div>
      <div className={`${compact ? 'mt-1.5 text-[15px] leading-6' : 'mt-2 text-lg'} ${toneStyles[tone].text}`}>{value}</div>
      {note ? <div className="mt-1 text-xs leading-5 text-[#d7c6b3]/56">{note}</div> : null}
    </div>
  );
}

function HighlightCard({ icon: Icon, label, title, body }: { icon: typeof Compass; label: string; title: string; body: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-[#f6ebdc]">
          <Icon className="h-4 w-4" />
        </div>
        <div className="text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/54">{label}</div>
      </div>
      <div className="mt-4 text-[22px] leading-tight text-[#fbf1e4]">{title}</div>
      <div className="mt-3 text-sm leading-7 text-[#e4d4c3]/72">{body}</div>
    </div>
  );
}

function TextBlock({ title, body, className = '' }: { title: string; body: string; className?: string }) {
  return (
    <div className={`rounded-[28px] border border-white/10 bg-white/[0.04] p-5 ${className}`}>
      <div className="text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/54">{title}</div>
      <div className="mt-3 text-sm leading-7 text-[#e6d7c7]/72">{body}</div>
    </div>
  );
}

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full text-left"
        aria-label={`${alt}. Открыть увеличенное изображение`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full aspect-video object-cover rounded-xl border border-white/10 cursor-zoom-in transition duration-300 group-hover:scale-[1.01] group-hover:border-white/16"
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(4,6,9,0.86)] px-4 py-8 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/78 transition hover:bg-black/45 hover:text-white"
            aria-label="Закрыть увеличенное изображение"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={src}
              alt={alt}
              className="max-h-[84vh] w-full rounded-[24px] border border-white/10 bg-[#090b0e] object-contain shadow-[0_32px_120px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function ImageCard({ src, alt, title, note, className = '', tall = false }: { src: string; alt: string; title: string; note: string; className?: string; tall?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] ${className}`}>
      <div className={`relative ${tall ? 'h-[280px] sm:h-[360px]' : 'h-[220px]'} overflow-hidden`}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.1)_38%,rgba(0,0,0,0.58))]" />
      </div>
      <div className="p-5">
        <div className="text-lg text-[#fbf1e2]/84">{title}</div>
        <div className="mt-3 text-sm leading-6 text-[#ddcebc]/68">{note}</div>
      </div>
    </div>
  );
}

function AllocationCard({ row }: { row: AllocationRow }) {
  return (
    <div className={`rounded-[26px] border p-5 ${toneStyles[row.tone].ring} bg-white/[0.03]`}>
      <div className="flex items-center justify-between gap-4">
        <div className="text-[16px] text-[#fbf1e2]/84">{row.item}</div>
        <div className={`text-sm ${toneStyles[row.tone].text}`}>{row.share}</div>
      </div>
      <div className="mt-3 h-3 rounded-full bg-white/8">
        <div className={`h-full rounded-full ${toneStyles[row.tone].bar}`} style={{ width: `${row.width}%` }} />
      </div>
      <div className="mt-3 text-sm leading-6 text-[#dfcfbe]/68">{row.note}</div>
    </div>
  );
}

function BackgroundImage({ src, emphasize = false }: { src: string; emphasize?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <img src={src} alt="" className={`h-full w-full object-cover ${emphasize ? 'opacity-[0.26]' : 'opacity-[0.18]'}`} />
      <div
        className={`absolute inset-0 ${
          emphasize
            ? 'bg-[radial-gradient(circle_at_top,rgba(188,135,82,0.14),transparent_34%),radial-gradient(circle_at_right,rgba(100,132,158,0.12),transparent_24%),linear-gradient(180deg,rgba(7,8,10,0.54),rgba(7,8,10,0.9)_42%,#060708)]'
            : 'bg-[radial-gradient(circle_at_top,rgba(188,135,82,0.18),transparent_34%),radial-gradient(circle_at_right,rgba(100,132,158,0.16),transparent_24%),linear-gradient(180deg,rgba(7,8,10,0.62),rgba(7,8,10,0.94)_42%,#060708)]'
        }`}
      />
    </div>
  );
}

function getSpotlightStats(index: number) {
  const chapterValue = index === 7 ? 'АРХИТЕКТУРА ВЫРУЧКИ' : slideMeta[index].eyebrow;

  switch (index) {
    case 0:
      return [
        { label: 'Выручка', value: '≈2.089 млрд', note: 'зрелый месяц', tone: 'amber' as Tone },
        { label: 'Окупаемость', value: '30–36 мес.', note: 'базовый сценарий', tone: 'copper' as Tone },
        { label: 'Формат', value: 'Мультиспорт', note: 'баскетбол + футзал + теннис + зал', tone: 'steel' as Tone },
        { label: 'Локация', value: 'Ташкент', note: 'флагманский город', tone: 'ivory' as Tone },
      ];
    case 15:
      return [
        { label: 'Статус', value: 'Готов к запуску', tone: 'amber' as Tone },
        { label: 'Возврат', value: '30–36 мес.', tone: 'copper' as Tone },
        { label: 'Формат', value: 'Первый объект', tone: 'steel' as Tone },
        { label: 'Потенциал', value: 'Развитие сети', tone: 'ivory' as Tone },
      ];
    default:
      return [
        { label: 'Слайд', value: String(index + 1).padStart(2, '0'), tone: 'ivory' as Tone },
        { label: 'Раздел', value: chapterValue, tone: 'steel' as Tone },
        { label: 'Тезис', value: 'Для инвестора', tone: 'amber' as Tone },
        { label: 'Формат', value: 'Интерактивная презентация', tone: 'copper' as Tone },
      ];
  }
}

function readSlideFromLocation(totalSlides: number) {
  if (typeof window === 'undefined') return 0;
  const match = window.location.hash.match(/slide-(\d+)/i);
  if (!match) return 0;
  const parsed = Number.parseInt(match[1], 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed - 1, 0), totalSlides - 1);
}

function formatBillion(value: number) {
  return (value / 1000).toFixed(3);
}
