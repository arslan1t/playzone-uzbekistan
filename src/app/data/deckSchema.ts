export type BackdropVariant = 'arena' | 'charcoal' | 'blueprint' | 'copper' | 'stone';

export type Tone = 'amber' | 'copper' | 'steel' | 'ivory';

export type SlideMeta = {
  id: number;
  key: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  backdrop: BackdropVariant;
  ctaLabel: string;
  deepDiveId: string;
  ctaHint: string;
};

export type SlideNarrative = {
  leadLabel: string;
  leadTitle: string;
  leadBody: string;
  ctaHint?: string;
  highlightTitle?: string;
  highlightBody?: string;
  note?: string;
};

export type Metric = {
  label: string;
  value: string;
  note?: string;
  tone?: Tone;
};

export type ProblemCard = {
  index: string;
  title: string;
  text: string;
  signal: string;
  tone: Tone;
};

export type DemandRange = {
  label: string;
  min: number;
  max: number;
  note: string;
  tone: Tone;
};

export type CaptureBand = {
  label: string;
  range: string;
  note: string;
  tone: Tone;
};

export type ProductTile = {
  title: string;
  price: string;
  logic: string;
  tone: Tone;
};

export type RevenueStream = {
  label: string;
  value: number;
  display: string;
  note: string;
  tone: Tone;
};

export type UnitEconomicsRowData = {
  zone: string;
  price: string;
  load: string;
  output: string;
  note: string;
  tone: Tone;
};

export type ScheduleBand = {
  hours: string;
  title: string;
  role: string;
  intensity: number;
  tone: Tone;
};

export type WeekendWindow = {
  label: string;
  logic: string;
  tone: Tone;
};

export type GrowthYear = {
  year: string;
  description: string;
  revenue: number;
  profit: number;
  revenueLabel: string;
  profitLabel: string;
  tone: Tone;
};

export type WhyBlock = {
  index: string;
  title: string;
  text: string;
  tone: Tone;
  kind: 'stack' | 'events' | 'experience' | 'repeatable';
};

export type CompetitionRow = {
  criterion: string;
  market: string;
  apex: string;
};

export type AllocationRow = {
  item: string;
  share: string;
  width: number;
  note: string;
  tone: Tone;
};

export type RoadmapPhase = {
  stage: string;
  title: string;
  text: string;
};

export type OperatingNode = {
  title: string;
  text: string;
  tone: Tone;
};

export type ImageFrameData = {
  src: string;
  alt: string;
  title: string;
  note: string;
};

export type DeepDiveHighlight = {
  label: string;
  value: string;
  tone?: Tone;
};

export type DeepDiveSection = {
  id: string;
  title: string;
  summary?: string;
  content: string[];
};

export type DeepDiveSource = {
  label: string;
  note: string;
  href: string;
  type: 'docx' | 'pdf' | 'image';
};

export type DeepDivePreview =
  | {
      kind: 'image';
      src: string;
      alt: string;
      eyebrow: string;
      title: string;
      summary: string;
    }
  | {
      kind: 'pdf';
      eyebrow: string;
      title: string;
      summary: string;
    };

export type DeepDiveLayout = 'default' | 'minimal' | 'compact';

export type DeepDiveEntry = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  layout?: DeepDiveLayout;
  highlights?: DeepDiveHighlight[];
  bulletPoints?: string[];
  sections: DeepDiveSection[];
  sources: DeepDiveSource[];
  preview?: DeepDivePreview;
};
