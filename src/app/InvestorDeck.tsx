import { Fragment, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChartColumnBig,
  Check,
  ChevronDown,
  CircleDollarSign,
  Compass,
  FileText,
  MoonStar,
  Sun,
  TriangleAlert,
  X,
} from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

import {
  apexBrandImage,
  arenasImage,
  careerStairsImage,
  cafeImage,
  combatImage,
  competitionImage,
  exteriorImage,
  floorPlanOneImage,
  floorPlanTwoImage,
  fullFinancialModelPdf,
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
  11: exteriorImage,
  12: cafeImage,
  13: vipViewImage,
  14: floorPlanTwoImage,
  15: apexBrandImage,
  16: exteriorImage,
};

const objectPlanOneImage = new URL('../../project-assets/plans/plan 1 .png', import.meta.url).href;
const objectPlanTwoImage = new URL('../../project-assets/plans/plan 2.png', import.meta.url).href;

type ObjectTourAsset = {
  id: string;
  src: string;
  alt: string;
  title: string;
  note: string;
  group: string;
  featured?: boolean;
};

const objectTourAssets: ObjectTourAsset[] = [
  {
    id: 'exterior',
    src: exteriorImage,
    alt: 'Фасад APEX ARENA',
    title: 'Фасад',
    note: 'Entrance & brand presence',
    group: 'CORE ARENA',
  },
  {
    id: 'arenas',
    src: arenasImage,
    alt: 'Основной зал APEX ARENA',
    title: 'Основной зал',
    note: 'Show court & events',
    group: 'CORE ARENA',
  },
  {
    id: 'tennis',
    src: tennisImage,
    alt: 'Tennis court at APEX ARENA',
    title: 'Tennis',
    note: 'Premium court',
    group: 'TRAINING & PERFORMANCE',
  },
  {
    id: 'gym',
    src: gymImage,
    alt: 'Gym at APEX ARENA',
    title: 'Gym',
    note: 'Daily recurring traffic',
    group: 'TRAINING & PERFORMANCE',
  },
  {
    id: 'combat',
    src: combatImage,
    alt: 'Combat zone at APEX ARENA',
    title: 'Combat zone',
    note: 'High-frequency training',
    group: 'TRAINING & PERFORMANCE',
  },
  {
    id: 'lobby',
    src: lobbyImage,
    alt: 'Lobby at APEX ARENA',
    title: 'Lobby',
    note: 'Arrival experience',
    group: 'EXPERIENCE & PREMIUM',
  },
  {
    id: 'cafe',
    src: cafeImage,
    alt: 'Cafe at APEX ARENA',
    title: 'Café',
    note: 'Second-check revenue',
    group: 'EXPERIENCE & PREMIUM',
  },
  {
    id: 'vip',
    src: vipViewImage,
    alt: 'VIP viewing area at APEX ARENA',
    title: 'VIP view',
    note: 'Premium viewing & events',
    group: 'EXPERIENCE & PREMIUM',
    featured: true,
  },
] as const;

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

const revenueArchitectureRows = [
  {
    zone: 'Court A / Basketball',
    role: 'Академия + лиги + прайм-тайм',
    value: '352,9 млн',
    color: '#3b82f6',
  },
  {
    zone: 'Court B / Futsal',
    role: 'Академия + вечерняя лига',
    value: '332,9 млн',
    color: '#f59e0b',
  },
  {
    zone: 'Court C / Tennis',
    role: 'Приват + ladder + premium',
    value: '295,0 млн',
    color: '#e5e7eb',
  },
  {
    zone: 'Gym',
    role: 'Абонементы + персональные',
    value: '277,6 млн',
    color: '#22c55e',
  },
  {
    zone: 'Combat Zone',
    role: 'Групповые программы',
    value: '243,0 млн',
    color: '#fb923c',
  },
  {
    zone: 'Café + Retail + Sponsor',
    role: 'Сопутствующий поток',
    value: '270,0 млн',
    color: '#d6ae83',
  },
] as const;

const revenueArchitectureMetrics = [
  {
    label: 'Выручка',
    value: '2 089 млн сум',
    note: 'Выручка зрелого месяца',
    tone: 'ivory' as Tone,
  },
  {
    label: 'Расходы',
    value: '1 075 млн сум',
    note: 'Операционные расходы',
    tone: 'amber' as Tone,
  },
  {
    label: 'Прибыль',
    value: '1 014 млн сум',
    note: 'Операционная прибыль ~48%',
    tone: 'steel' as Tone,
  },
] as const;

const playerJourneyStations = [
  {
    step: '01',
    title: 'АКАДЕМИЯ',
    primary: '1,19–2,44 млн сум / мес',
    secondary: 'Частота: 3–4 раза в неделю',
    circleClass: 'border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] text-[#f4e9dc]/82',
    panelClass:
      'border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]',
  },
  {
    step: '02',
    title: 'ЛИГА',
    primary: '1,2–2,0 млн сум / команда',
    secondary: 'Частота: еженедельно',
    circleClass: 'border-[#8f5949]/55 bg-[linear-gradient(180deg,rgba(143,89,73,0.46),rgba(143,89,73,0.18))] text-[#f3d7c8]',
    panelClass:
      'border-[#8f5949]/30 bg-[linear-gradient(180deg,rgba(143,89,73,0.18),rgba(143,89,73,0.06))]',
  },
  {
    step: '03',
    title: 'ТУРНИР',
    primary: 'до 252 млн сум / мес',
    secondary: 'Частота: 2–3 раза в месяц',
    circleClass: 'border-[#8f5b2b]/55 bg-[linear-gradient(180deg,rgba(198,123,55,0.52),rgba(198,123,55,0.2))] text-[#f7debf]',
    panelClass:
      'border-[#8f5b2b]/34 bg-[linear-gradient(180deg,rgba(198,123,55,0.2),rgba(198,123,55,0.07))]',
  },
  {
    step: '04',
    title: 'ДОПРОДАЖИ',
    primary: 'Gym + кафе + приват',
    secondary: '+30% к основному чеку',
    circleClass: 'border-[#d2a86d]/65 bg-[linear-gradient(180deg,rgba(226,193,157,0.72),rgba(184,138,88,0.28))] text-[#fff3df]',
    panelClass:
      'border-[#d2a86d]/40 bg-[linear-gradient(180deg,rgba(226,193,157,0.24),rgba(184,138,88,0.08))]',
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
  const isRevenueArchitectureSlide = currentSlide === 4;
  const isProductsSlide = currentSlide === 5;
  const isScheduleHeatmapSlide = currentSlide === 6;
  const isGrowthTowerSlide = currentSlide === 7;
  const isInvestmentRequestSlide = currentSlide === 8;
  const isPaybackCurveSlide = currentSlide === 9;
  const isReturnsSlide = currentSlide === 10;
  const isObjectTourSlide = currentSlide === 11;
  const isNetworkScaleSlide = currentSlide === 12;
  const isRiskShieldSlide = currentSlide === 13;
  const isDealCtaSlide = currentSlide === 14;
  const isClosingSlide = currentSlide === 16;
  const spotlight = useMemo(
    () => getSpotlightStats(currentSlide),
    [currentSlide],
  );
  const headerTitle = isProductsSlide
    ? 'Клиент проходит весь цикл внутри одного объекта'
    : isScheduleHeatmapSlide
      ? 'Расписание — это операционный актив, а не просто план'
      : isGrowthTowerSlide
        ? 'Три года — три фазы роста'
        : isInvestmentRequestSlide
          ? 'Инвестиционный запрос: $5,15 млн'
          : isPaybackCurveSlide
            ? 'Возврат капитала за 30–36 месяцев'
            : isReturnsSlide
              ? 'Новая категория — не ещё один зал'
              : isNetworkScaleSlide
                ? 'Флагман — это модель для сети'
                : isRiskShieldSlide
                  ? 'Риски известны — и каждый закрыт'
                  : isDealCtaSlide
                    ? 'APEX ARENA готова к запуску'
    : currentMeta.title;
  const headerSubtitle = isProductsSlide
    ? 'Каждый этап удерживает человека и увеличивает его чек'
    : isScheduleHeatmapSlide
      ? 'Каждое временное окно имеет свою экономику'
      : isGrowthTowerSlide
        ? 'Рост достигается не расширением, а доведением модели до зрелости'
        : isInvestmentRequestSlide
          ? 'Капитал распределён по логике запуска доходной модели, а не по статьям сметы'
          : isPaybackCurveSlide
            ? 'Срок возврата обеспечен базовым потоком — турниры и премиум слоты это апсайд'
            : isReturnsSlide
              ? 'APEX ARENA собирает полный спортивный цикл внутри одного объекта, одного бренда и одного календаря'
              : isNetworkScaleSlide
                ? 'После запуска ценность создаёт не один объект, а способность тиражировать проверенную модель'
                : isRiskShieldSlide
                  ? 'Модель проектировалась с учётом downside сценариев, а не только базового'
                  : isDealCtaSlide
                    ? 'Первый премиальный мультиспортивный комплекс Ташкента — с проверенной экономикой и структурированным инвестиционным запросом'
    : currentMeta.subtitle;

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
                  {headerTitle}
                </h1>
                {headerSubtitle ? (
                  isDemandSlide || isRevenueArchitectureSlide ? (
                    <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between xl:gap-6">
                      <p className="max-w-3xl text-[15px] leading-7 text-[#e2d4c4]/74 sm:text-[17px]">
                        {headerSubtitle}
                      </p>
                      {isDemandSlide ? (
                        <DemandResearchMenu
                          open={isResearchMenuOpen}
                          onToggle={() => setIsResearchMenuOpen((value) => !value)}
                          onClose={() => setIsResearchMenuOpen(false)}
                          containerRef={researchMenuRef}
                        />
                      ) : (
                        <FinancialModelButton href={fullFinancialModelPdf} />
                      )}
                    </div>
                  ) : (
                    <p className="mt-4 max-w-4xl text-[15px] leading-7 text-[#e2d4c4]/74 sm:text-[17px]">
                      {headerSubtitle}
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
                ) : isReturnsSlide || isObjectTourSlide || isNetworkScaleSlide || isRiskShieldSlide || isDealCtaSlide || isClosingSlide || isRevenueArchitectureSlide || isProductsSlide || isScheduleHeatmapSlide || isGrowthTowerSlide || isInvestmentRequestSlide || isPaybackCurveSlide ? null : (
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
      return <ObjectTourSlide />;
    case 12:
      return <WhyWorksSlide />;
    case 13:
      return <CompetitionSlide />;
    case 14:
      return <InvestmentSlide />;
    case 15:
      return <ExpansionSlide />;
    case 16:
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

function FinancialModelButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-4 py-3 text-left text-sm text-[#f5e9d9]/84 shadow-[0_16px_38px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-[1px] hover:border-white/16 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] hover:shadow-[0_22px_54px_rgba(0,0,0,0.24)] xl:min-w-[280px] xl:w-auto"
    >
      <span>Финансовая модель →</span>
    </a>
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
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.72fr] xl:items-start">
        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.018))] shadow-[0_14px_40px_rgba(0,0,0,0.14)]">
          <div className="hidden grid-cols-[8px_minmax(0,1.15fr)_minmax(0,0.95fr)_110px] gap-5 border-b border-white/8 px-6 py-4 text-[10px] uppercase tracking-[0.26em] text-[#c7b39b]/44 lg:grid">
            <div />
            <div>Зона</div>
            <div>Роль в модели</div>
            <div className="text-right">Выручка</div>
          </div>

          <div className="divide-y divide-white/8">
            {revenueArchitectureRows.map((row) => (
              <div
                key={row.zone}
                className="group px-5 py-4 transition duration-200 hover:bg-white/[0.028] sm:px-6"
              >
                <div className="hidden grid-cols-[8px_minmax(0,1.15fr)_minmax(0,0.95fr)_110px] items-center gap-5 lg:grid">
                  <span
                    aria-hidden="true"
                    className="h-11 w-[5px] rounded-full opacity-90 transition duration-200 group-hover:opacity-100"
                    style={{ backgroundColor: row.color }}
                  />
                  <div className="text-[15px] leading-6 text-[#f6ede1]/82">{row.zone}</div>
                  <div className="text-[14px] leading-6 text-[#cfbfac]/60">{row.role}</div>
                  <div className="text-right text-[15px] font-medium tabular-nums text-[#f4e3ca]/84">{row.value}</div>
                </div>

                <div className="flex items-start gap-3 lg:hidden">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full opacity-90"
                    style={{ backgroundColor: row.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-[15px] leading-6 text-[#f6ede1]/82">{row.zone}</div>
                      <div className="shrink-0 text-[15px] font-medium tabular-nums text-[#f4e3ca]/84">{row.value}</div>
                    </div>
                    <div className="mt-1.5 text-[14px] leading-6 text-[#cfbfac]/60">{row.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          {revenueArchitectureMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              note={metric.note}
              tone={metric.tone}
            />
          ))}
        </div>
      </div>

      <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.028)] px-5 py-4 text-center text-[14px] leading-6 text-[#d8c9b7]/64 sm:px-6">
        Ни одна зона не является критичной — при выпадении одного сегмента система сохраняет доходность
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
  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(198,123,55,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_56px_rgba(0,0,0,0.2)] sm:p-6 xl:px-7 xl:py-7">
        <div className="space-y-6">
          <div className="text-[11px] uppercase tracking-[0.34em] text-[#c7b39b]/54">Путь игрока</div>
          <div className="overflow-x-auto pb-2">
            <div className="relative min-w-[760px] px-1">
              <div className="pointer-events-none absolute left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] top-6">
                <div className="h-px rounded-full bg-white/10" />
                <div className="mt-[-1px] grid grid-cols-3 gap-4">
                  <div className="h-[2px] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.14),rgba(143,89,73,0.48))]" />
                  <div className="h-[3px] rounded-full bg-[linear-gradient(90deg,rgba(143,89,73,0.54),rgba(198,123,55,0.72))]" />
                  <div className="h-[4px] rounded-full bg-[linear-gradient(90deg,rgba(198,123,55,0.76),rgba(226,193,157,0.96))]" />
                </div>
              </div>

              <div className="relative grid grid-cols-4 gap-4 xl:gap-5">
                {playerJourneyStations.map((station) => (
                  <div key={station.step} className="flex flex-col items-center text-center">
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-[13px] tracking-[0.24em] shadow-[0_14px_38px_rgba(0,0,0,0.18)] ${station.circleClass}`}
                    >
                      {station.step}
                    </div>
                    <div
                      className={`mt-4 flex w-full min-h-[170px] flex-col justify-start rounded-[26px] border px-4 py-5 shadow-[0_14px_38px_rgba(0,0,0,0.14)] sm:px-5 ${station.panelClass}`}
                    >
                      <div className="text-[18px] leading-tight text-[#fbf2e5]/88 xl:text-[19px]">{station.title}</div>
                      <div className="mt-4 text-[14px] leading-6 text-[#e3d4c3]/72 xl:text-[15px]">{station.primary}</div>
                      <div className="mt-1.5 text-[13px] leading-6 text-[#d6c6b4]/58 xl:text-[14px]">{station.secondary}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className={`w-full max-w-[420px] rounded-[26px] border p-5 text-center ${toneStyles['amber'].ring} ${toneStyles['amber'].soft}`}>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/52">Эффект удержания</div>
              <div className={`mt-4 text-[34px] leading-none ${toneStyles['amber'].text}`}>2,3×</div>
              <div className="mt-4 text-[15px] leading-7 text-[#e2d4c3]/74">
                Клиент закрытый внутри экосистемы тратит <span className={toneStyles['amber'].text}>в 2,3× больше</span> чем разовый посетитель
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] px-5 py-4 text-center text-sm leading-6 text-[#d8c9b7]/66 sm:px-6">
        Удержание клиента внутри объекта = рост LTV без роста маркетинговых затрат
      </div>
    </div>
  );
}

function RevenueSlide() {
  const dayHeatmapBands = [
    {
      hours: '08:00–15:00',
      title: 'Академия / школы / персональные',
      badge: 'Базовая загрузка',
      panelClass:
        'border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))]',
      badgeClass: 'border-white/8 bg-white/[0.04] text-[#d8cab9]/58',
      heightClass: 'min-h-[88px]',
      titleClass: 'text-[#f6ede2]/80',
    },
    {
      hours: '15:00–20:00',
      title: 'Академия детей и подростков',
      badge: 'Основной поток',
      panelClass:
        'border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.022))]',
      badgeClass: 'border-white/10 bg-white/[0.05] text-[#eadbcc]/66',
      heightClass: 'min-h-[88px]',
      titleClass: 'text-[#fbf2e6]/84',
    },
    {
      hours: '20:00–23:00',
      title: 'Лиги / премиальные слоты',
      badge: 'Максимальная выручка',
      panelClass:
        'border-[#a66e34]/48 bg-[linear-gradient(90deg,rgba(198,123,55,0.24),rgba(226,193,157,0.11)),linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.03))] shadow-[0_18px_52px_rgba(198,123,55,0.16)]',
      badgeClass:
        'border-[#d0aa75]/34 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] text-[#fff0d8]',
      heightClass: 'min-h-[124px]',
      titleClass: 'text-[#fff4e7]',
      accent: true,
    },
    {
      hours: '23:00–01:00',
      title: 'Ночные сессии',
      badge: 'Контролируемая монетизация',
      panelClass:
        'border-[#8f5949]/18 bg-[linear-gradient(180deg,rgba(143,89,73,0.07),rgba(255,255,255,0.018))]',
      badgeClass: 'border-white/8 bg-white/[0.04] text-[#dcc8b6]/60',
      heightClass: 'min-h-[88px]',
      titleClass: 'text-[#f8eee2]/82',
    },
    {
      hours: '01:00–08:00',
      title: 'Ночной абонемент',
      badge: 'Дополнительная маржа',
      panelClass:
        'border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.026),rgba(255,255,255,0.01))]',
      badgeClass: 'border-white/8 bg-white/[0.04] text-[#d8cab9]/58',
      heightClass: 'min-h-[88px]',
      titleClass: 'text-[#f5ecdf]/78',
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.72fr] xl:items-start">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-5 sm:p-6">
          <div className="space-y-3">
            {dayHeatmapBands.map((band) => (
              <div
                key={band.hours}
                className={`relative overflow-hidden rounded-[24px] border px-4 py-4 sm:px-5 ${band.heightClass} ${band.panelClass}`}
              >
                {band.accent ? (
                  <div className="absolute bottom-3 left-0 top-3 w-[5px] rounded-r-full bg-[linear-gradient(180deg,#b87333,#f0c48f)]" />
                ) : null}

                <div className="flex h-full flex-col justify-center gap-3 sm:grid sm:grid-cols-[108px_minmax(0,1fr)_auto] sm:items-center sm:gap-5">
                  <div className="font-mono text-[11px] tracking-[0.18em] text-[#d8c9b7]/56">
                    {band.hours}
                  </div>
                  <div className={`text-[17px] leading-6 sm:text-[19px] ${band.titleClass}`}>
                    {band.title}
                  </div>
                  <div
                    className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${band.badgeClass}`}
                  >
                    {band.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 xl:self-center">
          <MetricCard
            label="ПИКОВЫЕ ЧАСЫ"
            value="~45%"
            note="месячной выручки дают часы 20:00–23:00 при одновременной работе 3 кортов"
            tone="amber"
          />

          <div className={`rounded-[26px] border p-5 ${toneStyles['ivory'].ring} ${toneStyles['ivory'].soft}`}>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/52">БУДНИ VS ВЫХОДНЫЕ</div>
            <div className="mt-4 text-[16px] leading-7 text-[#f3e7d6]/82">
              Будни формируют стабильный доход
            </div>
            <div className="mt-2 text-[16px] leading-7 text-[#decebc]/68">
              Выходные — турниры и пик выручки
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.028)] px-5 py-4 text-center text-[14px] leading-6 text-[#d8c9b7]/64 sm:px-6">
        Расписание управляется как финансовый инструмент — каждый час продаётся по своей цене и своей аудитории
      </div>
    </div>
  );
}

function UnitEconomicsSlide() {
  const maxRevenue = 35;
  const axisTicks = [35, 30, 20, 10, 0] as const;
  const growthTowers = [
    {
      year: 'ГОД 1',
      title: 'ЗАПУСК',
      revenue: '19,0 млрд',
      revenueValue: 19,
      profit: 'Операционная прибыль: 4,2 млрд',
      note: 'Академия и абонементы',
      panelClass:
        'border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.018))]',
      revenueClass: 'text-[#f4eadc]/84',
    },
    {
      year: 'ГОД 2',
      title: 'РАЗГОН',
      revenue: '25,1 млрд',
      revenueValue: 25.1,
      profit: 'Операционная прибыль: 8,0 млрд',
      note: 'Вечерняя загрузка + лиги',
      panelClass:
        'border-[#8f5b2b]/30 bg-[linear-gradient(180deg,rgba(198,123,55,0.22),rgba(198,123,55,0.08))]',
      revenueClass: 'text-[#f0bf8f]',
    },
    {
      year: 'ГОД 3',
      title: 'ЗРЕЛОСТЬ',
      revenue: '31,8 млрд',
      revenueValue: 31.8,
      profit: 'Операционная прибыль: 11,2 млрд',
      note: 'Турниры + premium slots',
      panelClass:
        'border-[#c98a45]/48 bg-[linear-gradient(180deg,rgba(226,193,157,0.28),rgba(198,123,55,0.18))] shadow-[0_18px_56px_rgba(198,123,55,0.16)]',
      revenueClass: 'text-[#fff1dd]',
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.18fr_0.52fr] xl:items-start">
        <div className="overflow-x-auto pb-1">
          <div className="min-w-[760px] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] p-5 sm:p-6">
            <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-4">
              <div className="relative h-[420px] sm:h-[470px]">
                <div className="absolute bottom-0 right-0 top-0 w-px bg-white/8" />
                {axisTicks.map((tick) => {
                  const bottom = `${(tick / maxRevenue) * 100}%`;
                  return (
                    <div
                      key={tick}
                      className={`absolute left-0 right-0 text-right ${tick === 0 ? 'translate-y-1/2' : '-translate-y-1/2'}`}
                      style={{ bottom }}
                    >
                      <div className="pr-3 text-[11px] uppercase tracking-[0.14em] text-[#c7b39b]/46">
                        {tick === 0 ? '0' : `${tick} млрд`}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <div className="relative h-[420px] sm:h-[470px]">
                  {axisTicks.map((tick) => {
                    const bottom = `${(tick / maxRevenue) * 100}%`;
                    return (
                      <div
                        key={tick}
                        className={`absolute left-0 right-0 ${tick === 0 ? 'translate-y-0' : '-translate-y-1/2'}`}
                        style={{ bottom }}
                      >
                        <div className="h-px w-full bg-white/[0.045]" />
                      </div>
                    );
                  })}

                  <div className="absolute inset-0 grid grid-cols-3 items-end gap-4 sm:gap-5">
                    {growthTowers.map((tower) => (
                      <div key={tower.year} className="flex h-full min-w-0 flex-col justify-end">
                        <div
                          className={`rounded-[28px] border px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5 ${tower.panelClass}`}
                          style={{ height: `${(tower.revenueValue / maxRevenue) * 100}%` }}
                        >
                          <div className="text-[10px] uppercase tracking-[0.28em] text-[#cbb49b]/50">{tower.year}</div>
                          <div className="mt-3 text-[24px] leading-tight text-[#fbf2e6]/88 sm:text-[28px]">
                            {tower.title}
                          </div>
                          <div className={`mt-5 text-[34px] leading-none sm:text-[42px] ${tower.revenueClass}`}>
                            {tower.revenue}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 sm:gap-5">
                  {growthTowers.map((tower) => (
                    <div key={tower.title} className="min-w-0 text-center">
                      <div className="text-[13px] leading-6 text-[#e2d4c4]/70">{tower.profit}</div>
                      <div className="mt-1 text-[13px] leading-6 text-[#cbbba8]/54">{tower.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <MetricCard
            label="3 ГОДА ИТОГО"
            value="75,9 млрд"
            note="Совокупная выручка за три года"
            tone="amber"
          />
          <MetricCard
            label="ПРИБЫЛЬ ИТОГО"
            value="23,4 млрд"
            note="Совокупная операционная прибыль за три года"
            tone="ivory"
          />
        </div>
      </div>

      <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.028)] px-5 py-4 text-center text-[14px] leading-6 text-[#d8c9b7]/64 sm:px-6">
        Рост обеспечивается управлением загрузкой и расписанием — без открытия новых объектов
      </div>
    </div>
  );
}

function ScheduleSlide() {
  const investmentBars = [
    {
      label: 'Земельный участок',
      value: '$2,50 млн · 49%',
      width: '49%',
      fillClass: 'bg-[linear-gradient(90deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))]',
    },
    {
      label: 'Строительство (shell + MEP)',
      value: '$1,19 млн · 23%',
      width: '23%',
      fillClass: 'bg-[linear-gradient(90deg,rgba(143,89,73,0.5),rgba(143,89,73,0.2))]',
    },
    {
      label: 'Спортивные покрытия и оснащение',
      value: '$0,67 млн · 13%',
      width: '13%',
      fillClass: 'bg-[linear-gradient(90deg,rgba(198,123,55,0.56),rgba(198,123,55,0.24))]',
    },
    {
      label: 'Fit-out + FF&E + системы',
      value: '$0,52 млн · 10%',
      width: '10%',
      fillClass: 'bg-[linear-gradient(90deg,rgba(214,174,131,0.78),rgba(198,123,55,0.38))]',
    },
    {
      label: 'Резерв (contingency)',
      value: '$0,24 млн · 5%',
      width: '5%',
      fillClass: 'bg-[linear-gradient(90deg,rgba(241,223,196,0.98),rgba(214,174,131,0.82))]',
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.72fr] xl:items-start">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6">
            <div className="text-[48px] leading-none text-[#f1dfc4] sm:text-[64px] xl:text-[72px]">$5,15 млн</div>
            <div className="pb-1 text-[12px] leading-5 text-[#c7b7a5]/54">
              базовый сценарий · без налогов и разрешений
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {investmentBars.map((bar) => (
              <div key={bar.label} className="space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div className="text-[15px] leading-6 text-[#f4eadc]/82 sm:text-[16px]">{bar.label}</div>
                  <div className="shrink-0 text-[14px] font-medium tabular-nums text-[#e5d4c0]/72">
                    {bar.value}
                  </div>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/[0.055]">
                  <div className={`h-full rounded-full ${bar.fillClass}`} style={{ width: bar.width }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-[12px] leading-6 text-[#bfae9b]/50">
            Земля зафиксирована по ТЗ · Операционный CAPEX без земли: $2,65 млн · Курс ЦБ на 25.04.2026:
            {' '}
            1 USD = 12 015,96 UZS
          </div>
        </div>

        <div className="space-y-4">
          <MetricCard
            label="ОБЩИЙ ЗАПРОС"
            value="$5,15 млн"
            note="Базовый сценарий включая земельный участок"
            tone="amber"
          />

          <MetricCard
            label="БЕЗ ЗЕМЛИ"
            value="$2,65 млн"
            note="Операционная часть — строительство, оснащение, запуск, резерв"
            tone="steel"
          />

          <MetricCard
            label="ВОЗВРАТ"
            value="30–36 мес"
            note="При достижении плановой загрузки базового сценария"
            tone="ivory"
          />
        </div>
      </div>

      <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.028)] px-5 py-4 text-center text-[14px] leading-6 text-[#d8c9b7]/64 sm:px-6">
        Земля составляет ~49% запроса — операционная часть комплекса собирается в $2,65 млн при сохранении premium качества покрытий и оснащения
      </div>
    </div>
  );
}

function GrowthSlide() {
  const chartWidth = 760;
  const chartHeight = 440;
  const margin = { top: 64, right: 34, bottom: 58, left: 72 };
  const plotWidth = chartWidth - margin.left - margin.right;
  const plotHeight = chartHeight - margin.top - margin.bottom;
  const yMax = 25;
  const yTicks = [0, 5, 10, 15, 20, 25] as const;
  const phaseRanges = [
    { label: 'ЗАПУСК', note: 'Год 1 · мес. 1–12', start: 0, end: 12 },
    { label: 'РАЗГОН', note: 'Год 2 · мес. 13–24', start: 12, end: 24 },
    { label: 'ЗРЕЛОСТЬ', note: 'Год 3 · мес. 25–36', start: 24, end: 36 },
  ] as const;

  const xForMonth = (month: number) => margin.left + (month / 36) * plotWidth;
  const yForValue = (value: number) => margin.top + plotHeight - (value / yMax) * plotHeight;

  type CurvePoint = { month: number; value: number };
  type CurveSegment = { p0: CurvePoint; c1: CurvePoint; c2: CurvePoint; p1: CurvePoint };

  const curveSegments: CurveSegment[] = [
    {
      p0: { month: 0, value: 0 },
      c1: { month: 4, value: 0.4 },
      c2: { month: 8, value: 2.8 },
      p1: { month: 12, value: 4.2 },
    },
    {
      p0: { month: 12, value: 4.2 },
      c1: { month: 16, value: 5.3 },
      c2: { month: 20, value: 9.4 },
      p1: { month: 24, value: 12.2 },
    },
    {
      p0: { month: 24, value: 12.2 },
      c1: { month: 28, value: 14.4 },
      c2: { month: 32, value: 19.6 },
      p1: { month: 36, value: 23.4 },
    },
  ];

  const cubicPoint = (segment: CurveSegment, t: number) => {
    const inv = 1 - t;
    const month =
      inv ** 3 * segment.p0.month +
      3 * inv ** 2 * t * segment.c1.month +
      3 * inv * t ** 2 * segment.c2.month +
      t ** 3 * segment.p1.month;
    const value =
      inv ** 3 * segment.p0.value +
      3 * inv ** 2 * t * segment.c1.value +
      3 * inv * t ** 2 * segment.c2.value +
      t ** 3 * segment.p1.value;
    return { month, value };
  };

  const sampleSegment = (segment: CurveSegment, steps: number, skipFirst = false) => {
    const result: CurvePoint[] = [];
    for (let index = skipFirst ? 1 : 0; index <= steps; index += 1) {
      result.push(cubicPoint(segment, index / steps));
    }
    return result;
  };

  const curvePoints = [
    ...sampleSegment(curveSegments[0], 18),
    ...sampleSegment(curveSegments[1], 18, true),
    ...sampleSegment(curveSegments[2], 18, true),
  ];

  const returnMonth = 33;
  const returnPoint = cubicPoint(curveSegments[2], (returnMonth - 24) / 12);
  const capexLineValue = returnPoint.value;
  const baseY = yForValue(0);

  const splitCurvePoints = curvePoints.reduce<CurvePoint[]>((accumulator, point) => {
    if (point.month < returnMonth) {
      accumulator.push(point);
      return accumulator;
    }
    if (!accumulator.some((item) => Math.abs(item.month - returnMonth) < 0.001)) {
      accumulator.push(returnPoint);
    }
    accumulator.push(point);
    return accumulator;
  }, []);

  const beforeReturn = splitCurvePoints.filter((point) => point.month <= returnMonth);
  const afterReturn = splitCurvePoints.filter((point) => point.month >= returnMonth);

  const toSvgPoint = (point: CurvePoint) => ({
    x: xForMonth(point.month),
    y: yForValue(point.value),
  });

  const curvePath = `M ${xForMonth(curveSegments[0].p0.month)} ${yForValue(curveSegments[0].p0.value)} ` +
    curveSegments
      .map(
        (segment) =>
          `C ${xForMonth(segment.c1.month)} ${yForValue(segment.c1.value)} ${xForMonth(segment.c2.month)} ${yForValue(segment.c2.value)} ${xForMonth(segment.p1.month)} ${yForValue(segment.p1.value)}`,
      )
      .join(' ');

  const areaPath = (points: CurvePoint[]) => {
    if (!points.length) return '';
    const svgPoints = points.map(toSvgPoint);
    return `M ${svgPoints[0].x} ${baseY} L ${svgPoints[0].x} ${svgPoints[0].y} ${svgPoints
      .map((point) => `L ${point.x} ${point.y}`)
      .join(' ')} L ${svgPoints[svgPoints.length - 1].x} ${baseY} Z`;
  };

  const returnCoords = toSvgPoint(returnPoint);
  const capexLabelWidth = 124;
  const capexLabelX = chartWidth - margin.right - capexLabelWidth;
  const capexLabelY = yForValue(capexLineValue) - 28;
  const returnCalloutWidth = 176;
  const returnCalloutX = Math.max(
    margin.left,
    Math.min(returnCoords.x - returnCalloutWidth + 18, chartWidth - margin.right - returnCalloutWidth),
  );
  const returnCalloutY = Math.max(margin.top + 10, returnCoords.y - 52);

  const curveMarkers = [
    { month: 12, value: 4.2, label: '4,2 млрд', dx: 12, dy: -14, anchor: 'start' as const },
    { month: 24, value: 12.2, label: '12,2 млрд', dx: 12, dy: -14, anchor: 'start' as const },
    { month: 36, value: 23.4, label: '23,4 млрд', dx: -18, dy: -20, anchor: 'end' as const },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.72fr] xl:items-start">
        <div className="overflow-x-auto pb-1">
          <div className="min-w-[760px] overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.045),transparent_28%),radial-gradient(circle_at_right,rgba(198,123,55,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-5 shadow-[0_18px_54px_rgba(0,0,0,0.18)] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#c7b39b]/50">Нарастающий итог прибыли</div>
              <div className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#d8c7b4]/54">
                36 месяцев
              </div>
            </div>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-auto w-full" role="img" aria-label="График накопленной прибыли и точки возврата капитала">
              <defs>
                <linearGradient id="payback-fill-before" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                </linearGradient>
                <linearGradient id="payback-fill-after" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(214,174,131,0.2)" />
                  <stop offset="100%" stopColor="rgba(198,123,55,0.03)" />
                </linearGradient>
                <linearGradient id="phase-three-glow" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(198,123,55,0.08)" />
                  <stop offset="100%" stopColor="rgba(198,123,55,0.02)" />
                </linearGradient>
              </defs>

              {phaseRanges.map((phase, index) => {
                const xStart = xForMonth(phase.start);
                const xEnd = xForMonth(phase.end);
                return (
                  <rect
                    key={`${phase.label}-bg`}
                    x={xStart}
                    y={margin.top}
                    width={xEnd - xStart}
                    height={plotHeight}
                    fill={index === 2 ? 'url(#phase-three-glow)' : 'rgba(255,255,255,0.012)'}
                  />
                );
              })}

              {yTicks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={margin.left}
                    x2={chartWidth - margin.right}
                    y1={yForValue(tick)}
                    y2={yForValue(tick)}
                    stroke="rgba(255,255,255,0.045)"
                    strokeWidth="1"
                  />
                  <text
                    x={margin.left - 14}
                    y={yForValue(tick) + 4}
                    textAnchor="end"
                    fill="rgba(199,179,155,0.5)"
                    fontSize="11"
                    letterSpacing="0.04em"
                  >
                    {tick === 0 ? '0' : `${tick} млрд`}
                  </text>
                </g>
              ))}

              {phaseRanges.map((phase, index) => {
                const xStart = xForMonth(phase.start);
                const xEnd = xForMonth(phase.end);
                const xCenter = (xStart + xEnd) / 2;
                return (
                  <g key={phase.label}>
                    {index > 0 ? (
                      <line
                        x1={xStart}
                        x2={xStart}
                        y1={margin.top}
                        y2={margin.top + plotHeight}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="4 7"
                        strokeWidth="1"
                      />
                    ) : null}
                    <text
                      x={xCenter}
                      y={28}
                      textAnchor="middle"
                      fill="rgba(203,180,155,0.58)"
                      fontSize="10"
                      letterSpacing="0.24em"
                    >
                      {phase.label}
                    </text>
                    <text
                      x={xCenter}
                      y={chartHeight - 14}
                      textAnchor="middle"
                      fill="rgba(199,183,165,0.5)"
                      fontSize="12"
                    >
                      {phase.note}
                    </text>
                  </g>
                );
              })}

              <line
                x1={xForMonth(0)}
                x2={xForMonth(36)}
                y1={yForValue(capexLineValue)}
                y2={yForValue(capexLineValue)}
                stroke="#d6ae83"
                strokeDasharray="6 6"
                strokeWidth="1.5"
              />
              <g>
                <rect
                  x={capexLabelX}
                  y={capexLabelY}
                  width={capexLabelWidth}
                  height={24}
                  rx={12}
                  fill="rgba(11,13,16,0.92)"
                  stroke="rgba(214,174,131,0.22)"
                />
                <text
                  x={capexLabelX + capexLabelWidth / 2}
                  y={capexLabelY + 16}
                  textAnchor="middle"
                  fill="rgba(240,191,143,0.88)"
                  fontSize="11"
                  letterSpacing="0.04em"
                >
                  CAPEX $2,65 млн
                </text>
              </g>

              <path d={areaPath(beforeReturn)} fill="url(#payback-fill-before)" />
              <path d={areaPath(afterReturn)} fill="url(#payback-fill-after)" />

              <path
                d={curvePath}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={10}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d={curvePath}
                fill="none"
                stroke="rgba(244,239,229,0.94)"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {curveMarkers.map((marker) => (
                <g key={marker.month}>
                  {marker.month === 36 ? (
                    <rect
                      x={xForMonth(marker.month) + marker.dx - 80}
                      y={yForValue(marker.value) + marker.dy - 15}
                      width={88}
                      height={24}
                      rx={12}
                      fill="rgba(11,13,16,0.92)"
                      stroke="rgba(255,255,255,0.08)"
                    />
                  ) : null}
                  <line
                    x1={xForMonth(marker.month)}
                    x2={xForMonth(marker.month)}
                    y1={yForValue(0)}
                    y2={yForValue(marker.value)}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="3 6"
                    strokeWidth="1"
                  />
                  <circle
                    cx={xForMonth(marker.month)}
                    cy={yForValue(marker.value)}
                    r="4.5"
                    fill="rgba(245,239,229,0.94)"
                  />
                  <text
                    x={xForMonth(marker.month) + marker.dx}
                    y={yForValue(marker.value) + marker.dy}
                    textAnchor={marker.anchor}
                    fill="rgba(244,234,220,0.86)"
                    fontSize="12"
                    fontWeight={marker.month === 36 ? '600' : '400'}
                  >
                    {marker.label}
                  </text>
                </g>
              ))}

              <g>
                <circle
                  cx={returnCoords.x}
                  cy={returnCoords.y}
                  r="11"
                  fill="rgba(214,174,131,0.16)"
                />
                <circle
                  cx={returnCoords.x}
                  cy={returnCoords.y}
                  r="6"
                  fill="#d6ae83"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <line
                  x1={returnCoords.x}
                  y1={returnCoords.y - 10}
                  x2={returnCoords.x}
                  y2={returnCalloutY + 30}
                  stroke="rgba(214,174,131,0.42)"
                  strokeWidth="1"
                />
                <rect
                  x={returnCalloutX}
                  y={returnCalloutY}
                  width={returnCalloutWidth}
                  height={28}
                  rx={14}
                  fill="rgba(11,13,16,0.92)"
                  stroke="rgba(214,174,131,0.24)"
                />
                <text
                  x={returnCalloutX + returnCalloutWidth / 2}
                  y={returnCalloutY + 18}
                  textAnchor="middle"
                  fill="rgba(255,241,221,0.92)"
                  fontSize="12"
                >
                  Точка возврата ~мес. 33
                </text>
              </g>
            </svg>
          </div>
        </div>

        <div className="space-y-4 xl:pt-4">
          <MetricCard
            label="БАЗОВЫЙ СЦЕНАРИЙ"
            value="30–36 мес"
            note="При достижении плановой загрузки по академии, лигам и gym"
            tone="amber"
          />
          <MetricCard
            label="DOWNSIDE 70% ЗАГРУЗКИ"
            value="~42 мес"
            note="Модель остаётся положительной даже при недозагрузке"
            tone="steel"
          />
          <MetricCard
            label="ПРИБЫЛЬ ЗА 3 ГОДА"
            value="23,4 млрд"
            note="Совокупная операционная прибыль нарастающим итогом"
            tone="ivory"
          />
        </div>
      </div>

      <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.028)] px-5 py-4 text-center text-[14px] leading-6 text-[#d8c9b7]/64 sm:px-6">
        Модель сохраняет устойчивость даже при снижении загрузки — доход распределён между академией, лигами, gym и турнирами
      </div>
    </div>
  );
}

function ReturnsSlide() {
  const comparisonRows = [
    {
      criterion: 'Формат',
      market: 'Разрозненные секции и аренда часов',
      apex: 'Единая спортивно-коммерческая платформа внутри одного объекта',
    },
    {
      criterion: 'Клиентский цикл',
      market: 'Клиент сам собирает маршрут между разными площадками',
      apex: 'Академия → лига → турнир → допродажи внутри одного адреса',
    },
    {
      criterion: 'Вечерняя загрузка',
      market: 'Случайная, разовые бронирования, слабое управление пиком',
      apex: 'Управляемая: лиги + премиальные слоты + взрослые группы',
    },
    {
      criterion: 'Масштабируемость',
      market: 'Каждый объект живёт как отдельная площадка без повторяемой модели',
      apex: 'Повторяемая модель с единой логикой загрузки и монетизации',
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto pb-1">
        <div className="relative min-w-[980px] overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.045),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] shadow-[0_22px_64px_rgba(0,0,0,0.22)]">
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[40%] bg-[linear-gradient(180deg,rgba(214,174,131,0.22),rgba(198,123,55,0.1))]" />
          <div className="pointer-events-none absolute right-[6%] top-8 text-[96px] leading-none text-black/[0.06]">AA</div>

          <div className="relative grid grid-cols-[0.2fr_0.4fr_0.4fr] border-b border-white/[0.06]">
            <div className="flex items-center px-5 py-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#c4ae97]/40">
                КРИТЕРИЙ
              </div>
            </div>
            <div className="border-l border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.026))] px-5 py-5">
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#f6eee2]/78">ТИПИЧНЫЙ РЫНОК</div>
            </div>
            <div className="border-l border-black/10 bg-[linear-gradient(180deg,rgba(214,174,131,0.96),rgba(198,123,55,0.88))] px-5 py-4 text-[#17120c] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl border border-black/12 bg-black/[0.06] text-[11px] tracking-[0.28em]">
                  AA
                </div>
                <div className="text-[11px] uppercase tracking-[0.3em]">APEX ARENA</div>
              </div>
            </div>
          </div>

          <div className="relative divide-y divide-white/[0.05]">
            {comparisonRows.map((row, index) => {
              const criterionRowClass = index % 2 === 0 ? 'bg-[rgba(255,255,255,0.012)]' : 'bg-[rgba(255,255,255,0.02)]';
              const marketRowClass = index % 2 === 0 ? 'bg-[rgba(255,255,255,0.022)]' : 'bg-[rgba(255,255,255,0.038)]';
              const apexRowClass =
                index % 2 === 0
                  ? 'bg-[linear-gradient(180deg,rgba(214,174,131,0.16),rgba(198,123,55,0.06))]'
                  : 'bg-[linear-gradient(180deg,rgba(214,174,131,0.22),rgba(198,123,55,0.09))]';

              return (
                <div key={row.criterion} className="grid grid-cols-[0.2fr_0.4fr_0.4fr]">
                  <div className={`flex items-center px-5 py-5 ${criterionRowClass}`}>
                    <div className="max-w-[150px] text-[14px] leading-6 text-[#dac8b4]/60">{row.criterion}</div>
                  </div>

                  <div className={`border-l border-white/[0.05] px-5 py-5 ${marketRowClass}`}>
                    <div className="max-w-[320px] text-[15px] leading-7 text-[#f1e7da]/72">{row.market}</div>
                  </div>

                  <div className={`relative border-l border-black/10 px-5 py-5 ${apexRowClass}`}>
                    <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-[linear-gradient(180deg,rgba(255,244,231,0.72),rgba(198,123,55,0.46))]" />
                    <div className="max-w-[336px] pl-1 text-[15px] leading-7 text-[#fff7ea]/92">{row.apex}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`relative overflow-hidden rounded-[30px] border p-5 shadow-[0_20px_60px_rgba(198,123,55,0.12)] sm:p-6 ${toneStyles['amber'].ring} ${toneStyles['amber'].soft}`}>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-[radial-gradient(circle_at_center,rgba(214,174,131,0.18),transparent_70%)]" />
        <div className="pointer-events-none absolute bottom-0 right-12 text-[92px] leading-none text-[#f1dfc4]/[0.06]">AA</div>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,0.28fr)] xl:items-end">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/52">ВЫВОД</div>
            <div className="mt-4 max-w-[720px] text-[30px] leading-tight text-[#fbf1e2]/90 sm:text-[34px]">
              Ближайший аналог в регионе отсутствует
            </div>
            <div className="mt-4 max-w-[760px] text-[15px] leading-7 text-[#e4d5c5]/72 sm:text-[16px]">
              Indoor мультиспорт + академия + лиги + турниры в одном объекте в Ташкенте не представлен
            </div>
          </div>

          <div className="flex items-end xl:justify-end">
            <div className="h-px w-full max-w-[180px] bg-[linear-gradient(90deg,rgba(214,174,131,0.9),rgba(255,255,255,0.08))]" />
          </div>
        </div>
      </div>

      <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.028)] px-5 py-4 text-center text-[14px] leading-6 text-[#d8c9b7]/64 sm:px-6">
        Обычный рынок продаёт отдельные услуги — APEX ARENA продаёт спортивную карьеру внутри одного адреса
      </div>
    </div>
  );
}

function ObjectTourSlide() {
  const coreArena = objectTourAssets.filter((asset) => asset.group === 'CORE ARENA');
  const trainingAssets = objectTourAssets.filter((asset) => asset.group === 'TRAINING & PERFORMANCE');
  const experienceAssets = objectTourAssets.filter((asset) => asset.group === 'EXPERIENCE & PREMIUM');
  const vipAsset = experienceAssets.find((asset) => asset.featured) ?? experienceAssets[0] ?? objectTourAssets[0];
  const secondaryExperienceAssets = experienceAssets.filter((asset) => asset.id !== vipAsset.id);
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);
  const activeAsset = activeAssetId
    ? objectTourAssets.find((asset) => asset.id === activeAssetId) ?? null
    : null;

  useEffect(() => {
    if (!activeAsset) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveAssetId(null);
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveAssetId((current) => {
          if (!current) return current;
          const currentIndex = objectTourAssets.findIndex((asset) => asset.id === current);
          if (currentIndex === -1) return current;
          const offset = event.key === 'ArrowLeft' ? -1 : 1;
          const nextIndex = (currentIndex + offset + objectTourAssets.length) % objectTourAssets.length;
          return objectTourAssets[nextIndex].id;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeAsset]);

  const openAsset = (assetId: string) => setActiveAssetId(assetId);
  const closeAsset = () => setActiveAssetId(null);
  const shiftActiveAsset = (direction: -1 | 1) => {
    setActiveAssetId((current) => {
      if (!current) return current;
      const currentIndex = objectTourAssets.findIndex((asset) => asset.id === current);
      if (currentIndex === -1) return current;
      const nextIndex = (currentIndex + direction + objectTourAssets.length) % objectTourAssets.length;
      return objectTourAssets[nextIndex].id;
    });
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(214,174,131,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(97,131,155,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-4">
        <div className="space-y-4">
          <section className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div className="text-[10px] uppercase tracking-[0.32em] text-[#c7b39b]/52">CORE ARENA</div>
              <div className="hidden text-[11px] text-[#cdbba8]/36 sm:block">Architecture / customer experience</div>
            </div>
            <div className="grid gap-3 xl:grid-cols-[1.2fr_0.8fr]">
              {coreArena.map((asset, index) => (
                <TourImagePanel
                  key={asset.id}
                  asset={asset}
                  onOpen={openAsset}
                  className={index === 0 ? 'min-h-[280px] sm:min-h-[340px] xl:min-h-[430px]' : 'min-h-[280px] sm:min-h-[340px] xl:min-h-[430px]'}
                />
              ))}
            </div>
          </section>

          <div className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
            <section className="rounded-[28px] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(97,131,155,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.024),rgba(255,255,255,0.012))] p-3 sm:p-4">
              <div className="mb-3 px-1 text-[10px] uppercase tracking-[0.32em] text-[#c7b39b]/52">
                TRAINING & PERFORMANCE
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {trainingAssets.map((asset) => (
                  <TourImagePanel
                    key={asset.id}
                    asset={asset}
                    onOpen={openAsset}
                    className="min-h-[180px] sm:min-h-[230px] xl:min-h-[250px]"
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[#8f5b2b]/20 bg-[radial-gradient(circle_at_top_right,rgba(214,174,131,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.026),rgba(255,255,255,0.012))] p-3 sm:p-4">
              <div className="mb-3 px-1 text-[10px] uppercase tracking-[0.32em] text-[#c7b39b]/52">
                EXPERIENCE & PREMIUM
              </div>
              <div className="grid gap-3 sm:grid-cols-[0.84fr_1.16fr]">
                <div className="grid gap-3">
                  {secondaryExperienceAssets.map((asset) => (
                    <TourImagePanel
                      key={asset.id}
                      asset={asset}
                      onOpen={openAsset}
                      className="min-h-[180px] sm:min-h-[196px] xl:min-h-[214px]"
                    />
                  ))}
                </div>
                <TourImagePanel
                  asset={vipAsset}
                  onOpen={openAsset}
                  className="min-h-[240px] sm:min-h-[405px] xl:min-h-[440px]"
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <SlideActionLink href={objectPlanOneImage}>1 этаж</SlideActionLink>
        <SlideActionLink href={objectPlanTwoImage}>2 этаж</SlideActionLink>
      </div>

      {activeAsset ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(5,7,10,0.92)] px-4 py-6 backdrop-blur-md sm:px-6"
          onClick={closeAsset}
        >
          <button
            type="button"
            onClick={closeAsset}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#f6ecde]/82 shadow-[0_16px_38px_rgba(0,0,0,0.22)] transition hover:border-white/16 hover:bg-white/[0.1] sm:right-6 sm:top-6"
            aria-label="Закрыть изображение"
          >
            <X className="h-4 w-4" />
          </button>

          <div
            className="relative flex w-full max-w-[1180px] items-center justify-center gap-3 sm:gap-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => shiftActiveAsset(-1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#f6ecde]/82 shadow-[0_16px_38px_rgba(0,0,0,0.2)] transition hover:border-white/16 hover:bg-white/[0.1]"
              aria-label="Предыдущее изображение"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="w-full overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,13,16,0.9),rgba(11,13,16,0.82))] shadow-[0_30px_90px_rgba(0,0,0,0.36)]">
              <div className="relative flex min-h-[320px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(214,174,131,0.1),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-4 py-4 sm:min-h-[520px] sm:px-6 sm:py-6">
                <img
                  src={activeAsset.src}
                  alt={activeAsset.alt}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(5,7,9,0),rgba(5,7,9,0.82)_68%,rgba(5,7,9,0.96))]" />
                <div className="absolute inset-x-0 bottom-0 px-5 py-5 sm:px-6 sm:py-6">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-[#c7b39b]/52">{activeAsset.group}</div>
                  <div className="mt-3 text-[26px] leading-none text-[#fbf2e6]/92 sm:text-[34px]">
                    {activeAsset.title}
                  </div>
                  <div className="mt-2 text-[14px] leading-6 text-[#d9cab8]/72 sm:text-[15px]">
                    {activeAsset.note}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => shiftActiveAsset(1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#f6ecde]/82 shadow-[0_16px_38px_rgba(0,0,0,0.2)] transition hover:border-white/16 hover:bg-white/[0.1]"
              aria-label="Следующее изображение"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

    </div>
  );
}

function WhyWorksSlide() {
  const networkStages = [
    {
      step: '01',
      label: 'ЭТАП 01',
      title: 'Запуск флагмана',
      body: 'Первый объект подтверждает планировку, архитектуру выручки и стандарты сервиса в Ташкенте',
      circleClass:
        'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] text-[#f5ecdf]/78',
      panelClass:
        'border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))]',
    },
    {
      step: '02',
      label: 'ЭТАП 02',
      title: 'Фиксация модели',
      body: 'Операционный календарь, правила ценообразования и стандарт сервиса оформляются в повторяемую систему',
      circleClass:
        'border-[#7c6658]/40 bg-[linear-gradient(180deg,rgba(124,102,88,0.28),rgba(124,102,88,0.09))] text-[#ead9c7]',
      panelClass:
        'border-[#7c6658]/24 bg-[linear-gradient(180deg,rgba(124,102,88,0.12),rgba(124,102,88,0.04))]',
    },
    {
      step: '03',
      label: 'ЭТАП 03',
      title: 'Тиражирование формата',
      body: 'Следующие объекты повторяют уже проверенную логику дохода, загрузки и клиентского пути',
      circleClass:
        'border-[#8f5b2b]/44 bg-[linear-gradient(180deg,rgba(198,123,55,0.36),rgba(198,123,55,0.12))] text-[#f5dec0]',
      panelClass:
        'border-[#8f5b2b]/26 bg-[linear-gradient(180deg,rgba(198,123,55,0.16),rgba(198,123,55,0.05))]',
    },
    {
      step: '04',
      label: 'ЭТАП 04',
      title: 'Ценность сети',
      body: 'Несколько объектов усиливают бренд, партнёрства, переговорную позицию и общую стоимость сети',
      circleClass:
        'border-[#d6ae83]/60 bg-[linear-gradient(180deg,rgba(214,174,131,0.72),rgba(198,123,55,0.24))] text-[#17120c]',
      panelClass:
        'border-[#d6ae83]/30 bg-[linear-gradient(180deg,rgba(214,174,131,0.22),rgba(198,123,55,0.08))]',
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.72fr] xl:items-start">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.014))] p-5 shadow-[0_18px_54px_rgba(0,0,0,0.18)] sm:p-6">
          <div className="relative">
            <div className="pointer-events-none absolute left-[23px] top-6 bottom-6 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(124,102,88,0.18),rgba(198,123,55,0.32),rgba(214,174,131,0.9))]" />

            <div className="space-y-4">
              {networkStages.map((stage, index) => (
                <div key={stage.step} className="grid grid-cols-[48px_minmax(0,1fr)] gap-4">
                  <div className="relative flex justify-center">
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-[13px] tracking-[0.24em] shadow-[0_12px_34px_rgba(0,0,0,0.18)] ${stage.circleClass}`}
                    >
                      {stage.step}
                    </div>
                  </div>

                  <div className={`rounded-[26px] border px-5 py-5 sm:px-6 ${stage.panelClass}`}>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-[#c7b39b]/48">{stage.label}</div>
                    <div className="mt-3 text-[24px] leading-tight text-[#fbf2e6]/88 sm:text-[28px]">
                      {stage.title}
                    </div>
                    <div className="mt-4 max-w-[560px] text-[15px] leading-7 text-[#e2d4c4]/72">
                      {stage.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <MetricCard
            label="ОБЪЕКТ 1"
            value="Ташкент · 2026"
            note="Флагман · $5,15 млн CAPEX · возврат 30–36 мес"
            tone="amber"
          />

          <MetricCard
            label="СЕТЬ 3+ ОБЪЕКТОВ"
            value="Самарканд · Фергана"
            note="Каждый следующий объект дешевле и быстрее за счёт готовой модели"
            tone="ivory"
          />
        </div>
      </div>

      <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.028)] px-5 py-4 text-center text-[14px] leading-6 text-[#d8c9b7]/64 sm:px-6">
        Инвестор входит в первый объект и получает долю в модели которая масштабируется
      </div>
    </div>
  );
}

function CompetitionSlide() {
  const riskShieldRows = [
    {
      riskId: '01',
      riskTitle: 'Спрос ниже прогноза',
      riskBody: 'Реальная загрузка не достигает планового уровня в первые месяцы',
      mitigate:
        'Академия и абонементы формируют базовый поток независимо от турниров — модель положительна даже при 70% загрузке',
    },
    {
      riskId: '02',
      riskTitle: 'Операционный сбой',
      riskBody: 'Одна из зон не выходит на плановую загрузку',
      mitigate:
        'Каждая зона имеет свой breakeven и не зависит от других — расписание управляется как финансовый инструмент',
    },
    {
      riskId: '03',
      riskTitle: 'Появление конкурента',
      riskBody: 'Аналогичный формат открывается в Ташкенте в период запуска',
      mitigate:
        'Барьер входа высокий — $5,15 млн CAPEX и операционная сложность. Аналог в регионе сейчас отсутствует',
    },
    {
      riskId: '04',
      riskTitle: 'Удорожание строительства',
      riskBody: 'Рост цен на материалы или задержка сроков',
      mitigate:
        'Contingency 10% заложен в CAPEX — резерв $0,24 млн покрывает удорожание материалов и корректировку сроков',
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] shadow-[0_18px_54px_rgba(0,0,0,0.18)]">
        <div className="grid grid-cols-1 border-b border-white/[0.06] md:grid-cols-2">
          <div className="px-5 py-4 text-[10px] uppercase tracking-[0.3em] text-[#c4ae97]/42 sm:px-6">
            РИСК
          </div>
          <div className="border-t border-white/[0.06] px-5 py-4 text-[10px] uppercase tracking-[0.3em] text-[#c4ae97]/42 sm:px-6 md:border-t-0 md:border-l">
            КАК ЗАКРЫТ
          </div>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {riskShieldRows.map((row, index) => {
            const riskClass =
              index % 2 === 0
                ? 'bg-[linear-gradient(180deg,rgba(198,123,55,0.08),rgba(255,255,255,0.012))]'
                : 'bg-[linear-gradient(180deg,rgba(198,123,55,0.12),rgba(255,255,255,0.018))]';
            const mitigateClass =
              index % 2 === 0
                ? 'bg-[linear-gradient(180deg,rgba(97,131,155,0.08),rgba(255,255,255,0.016))]'
                : 'bg-[linear-gradient(180deg,rgba(97,131,155,0.11),rgba(255,255,255,0.02))]';

            return (
              <div key={row.riskId} className="grid grid-cols-1 md:grid-cols-2">
                <div className={`px-5 py-5 sm:px-6 ${riskClass}`}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#8f5b2b]/30 bg-[rgba(198,123,55,0.08)] text-[#f0bf8f]">
                      <TriangleAlert className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-[#c7b39b]/48">
                        {`РИСК ${row.riskId}`}
                      </div>
                      <div className="mt-3 text-[24px] leading-tight text-[#fbf2e6]/88 sm:text-[28px]">
                        {row.riskTitle}
                      </div>
                      <div className="mt-4 max-w-[420px] text-[15px] leading-7 text-[#e2d4c4]/68">
                        {row.riskBody}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`border-t border-white/[0.05] px-5 py-5 sm:px-6 ${mitigateClass} md:border-l md:border-t-0`}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#4e8f67]/28 bg-[rgba(85,163,114,0.1)] text-[#b9efc6]">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-[#c7b39b]/48">
                        МИТИГАТОР
                      </div>
                      <div className="mt-4 max-w-[460px] text-[15px] leading-7 text-[#edf0f3]/72">
                        {row.mitigate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.028)] px-5 py-4 text-center text-[14px] leading-6 text-[#d8c9b7]/64 sm:px-6">
        Модель устойчива при снижении загрузки — доход распределён между пятью независимыми сегментами
      </div>
    </div>
  );
}

function InvestmentSlide() {
  const nowReasons = [
    {
      title: 'Спрос подтверждён',
      note: 'Платящая аудитория 10 000–14 000 человек в зоне доступа комплекса',
    },
    {
      title: 'Экономика просчитана',
      note: 'Возврат капитала 30–36 месяцев обеспечен базовым потоком без турниров',
    },
    {
      title: 'CAPEX структурирован',
      note: '$5,15 млн с contingency 10% и резервом оборотного капитала',
    },
    {
      title: 'Аналог в регионе отсутствует',
      note: 'Окно возможности открыто — барьер входа высокий',
    },
  ] as const;

  const sampleContacts = [
    { icon: '👤', value: 'Азам Каримов' },
    { icon: '✈', value: '@apexarena_uz' },
    { icon: '📞', value: '+998 90 123 45 67' },
    { icon: '✉', value: 'hello@apexarena.uz' },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.02fr_0.82fr] xl:items-stretch">
        <div className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(214,174,131,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] p-5 shadow-[0_18px_54px_rgba(0,0,0,0.18)] sm:p-6">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/44">ПОЧЕМУ СЕЙЧАС</div>
          <div className="mt-6 space-y-5">
            {nowReasons.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="mt-1 h-16 w-[3px] shrink-0 rounded-full bg-[linear-gradient(180deg,#d6ae83,#c67b37)]" />
                <div className="min-w-0">
                  <div className="text-[26px] leading-tight text-[#fbf1e2]/88 sm:text-[30px]">
                    {item.title}
                  </div>
                  <div className="mt-2 max-w-[520px] text-[15px] leading-7 text-[#dacbbb]/66">
                    {item.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-[#8f5b2b]/38 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.018))] p-5 shadow-[0_20px_62px_rgba(198,123,55,0.1)] sm:p-6 xl:flex xl:min-h-full xl:flex-col">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#c4ae97]/46">СЛЕДУЮЩИЙ ШАГ</div>
          <div className="mt-4 text-[34px] leading-[1.02] text-[#fbf1e2]/90 sm:text-[40px] xl:text-[44px]">
            Обсудим структуру сделки
          </div>
          <div className="mt-4 max-w-[360px] text-[15px] leading-7 text-[#dacbbb]/66">
            Готовы к встрече, звонку или отправке финансовой модели
          </div>

          <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,rgba(214,174,131,0.4),rgba(255,255,255,0.06))]" />

          <div className="mt-6 space-y-3">
            {sampleContacts.map((item) => (
              <div key={item.value} className="flex items-center gap-3 text-[15px] leading-7 text-[#f0e4d4]/78">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] text-[15px]">
                  {item.icon}
                </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          <a
            href="mailto:hello@apexarena.uz"
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-[20px] border border-[#d6ae83]/48 bg-[#d6ae83] px-4 py-3 text-sm text-[#17120c] shadow-[0_16px_38px_rgba(198,123,55,0.18)] transition duration-300 hover:-translate-y-[1px] hover:bg-[#deba92] hover:shadow-[0_22px_54px_rgba(198,123,55,0.24)] xl:mt-auto"
          >
            <span>Обсудить структуру сделки →</span>
          </a>

          <div className="mt-5 text-[12px] leading-5 text-[#bfae9b]/48">
            Ташкент · 2026
          </div>
        </div>
      </div>

      <div className="rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.028)] px-5 py-4 text-center text-[14px] leading-6 text-[#d8c9b7]/64 sm:px-6">
        Проект готов к обсуждению структуры сделки
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

function TourImagePanel({
  asset,
  onOpen,
  className = '',
}: {
  asset: ObjectTourAsset;
  onOpen: (assetId: string) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(asset.id)}
      className={`group relative h-full min-h-0 w-full overflow-hidden rounded-[24px] border text-left transition duration-300 hover:-translate-y-[1px] ${asset.featured ? 'border-[#d6ae83]/32 bg-[linear-gradient(180deg,rgba(214,174,131,0.08),rgba(255,255,255,0.02))] shadow-[0_24px_60px_rgba(198,123,55,0.14)] hover:border-[#d6ae83]/48 hover:shadow-[0_28px_70px_rgba(198,123,55,0.2)]' : 'border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] hover:border-white/14 hover:shadow-[0_20px_54px_rgba(0,0,0,0.22)]'} ${className}`}
      aria-label={`${asset.title} — ${asset.note}`}
    >
      <img
        src={asset.src}
        alt={asset.alt}
        className="h-full w-full cursor-pointer object-cover object-center transition duration-500 group-hover:scale-[1.045]"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,9,0.14),rgba(5,7,9,0.24)_38%,rgba(5,7,9,0.82)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(5,7,9,0.2),rgba(5,7,9,0.34)_38%,rgba(5,7,9,0.88)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_34%)] opacity-70 transition duration-300 group-hover:opacity-100" />
      {asset.featured ? (
        <div className="absolute left-4 top-4 rounded-full border border-[#d6ae83]/34 bg-[rgba(10,12,15,0.52)] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#f3d7b6]/84 backdrop-blur-md">
          Premium
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 px-4 py-4 sm:px-5 sm:py-5">
        <div className={`${asset.featured ? 'text-[19px] sm:text-[22px]' : 'text-[17px] sm:text-[19px]'} leading-tight text-[#fbf2e6]/92`}>
          {asset.title}
        </div>
        <div className="mt-1 text-[12px] leading-5 text-[#dccdbb]/76 sm:text-[13px]">
          {asset.note}
        </div>
      </div>
      <div className={`absolute inset-0 ring-1 ring-inset ${asset.featured ? 'ring-[#d6ae83]/18 group-hover:ring-[#d6ae83]/28' : 'ring-white/[0.05] group-hover:ring-white/[0.1]'} transition duration-300`} />
    </button>
  );
}

function SlideActionLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-4 py-3 text-left text-sm text-[#f5e9d9]/84 shadow-[0_16px_38px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-[1px] hover:border-white/16 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] hover:shadow-[0_22px_54px_rgba(0,0,0,0.24)]"
    >
      <span>{children}</span>
    </a>
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
  const chapterValue = slideMeta[index].eyebrow;

  switch (index) {
    case 0:
      return [
        { label: 'Выручка', value: '≈2.089 млрд', note: 'зрелый месяц', tone: 'amber' as Tone },
        { label: 'Окупаемость', value: '30–36 мес.', note: 'базовый сценарий', tone: 'copper' as Tone },
        { label: 'Формат', value: 'Мультиспорт', note: 'баскетбол + футзал + теннис + зал', tone: 'steel' as Tone },
        { label: 'Локация', value: 'Ташкент', note: 'флагманский город', tone: 'ivory' as Tone },
      ];
    case 16:
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
