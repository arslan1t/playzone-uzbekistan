import {
  apexBrandImage,
  arenasImage,
  cafeImage,
  combatImage,
  floorPlanTwoImage,
  gymImage,
  lobbyImage,
  tennisImage,
} from './deckAssets';
import type {
  AllocationRow,
  CaptureBand,
  CompetitionRow,
  DemandRange,
  GrowthYear,
  ImageFrameData,
  Metric,
  OperatingNode,
  ProblemCard,
  ProductTile,
  RevenueStream,
  RoadmapPhase,
  ScheduleBand,
  SlideMeta,
  SlideNarrative,
  UnitEconomicsRowData,
  WeekendWindow,
  WhyBlock,
} from './deckSchema';

export const slideMeta: SlideMeta[] = [
  {
    id: 1,
    key: 'intro',
    eyebrow: 'ИНВЕСТИЦИОННАЯ ВОЗМОЖНОСТЬ',
    title: 'Спортивная экосистема для развитя спорта в стране',
    subtitle: 'Премиальный мультиспортивный актив с повторяемой операционной моделью',
    backdrop: 'arena',
    ctaLabel: 'Открыть обзор',
    deepDiveId: 'intro-overview',
    ctaHint: 'Короткий инвестиционный обзор с переходом к модели, layout и full financial pack.',
  },
  {
    id: 2,
    key: 'market-gap',
    eyebrow: 'РЫНОЧНЫЙ РАЗРЫВ',
    title: 'Спрос есть. Но рынок не собран в систему.',
    subtitle:
      'Нет ни одного спортивного объекта, который объединяет обучение, игру и события.',
    backdrop: 'charcoal',
    ctaLabel: 'Открыть анализ рынка',
    deepDiveId: 'market-gap-analysis',
    ctaHint: 'Подробно: где именно рынок распадается и почему этот разрыв важен для инвестора.',
  },
  {
    id: 3,
    key: 'demand',
    eyebrow: 'СПРОС И АУДИТОРИЯ',
    title: 'Платящая аудитория уже сформирована',
    subtitle:
      'Basketball, futsal, tennis, gym и combat формируют не один рынок, а портфель сегментов с разной частотой, чеком и ролью в структуре выручки.',
    backdrop: 'blueprint',
    ctaLabel: 'Глубже по рынку',
    deepDiveId: 'demand-segmentation',
    ctaHint: 'Сегментированный market-dive по основным вертикалям и их monetization role.',
  },
  {
    id: 4,
    key: 'operating-system',
    eyebrow: 'OPERATING MODEL',
    title: 'Единая операционная среда',
    subtitle:
      'Академия, турниры, тренажёрный зал и сервис работают как единая система.',
    backdrop: 'copper',
    ctaLabel: 'Операционная логика',
    deepDiveId: 'operating-system',
    ctaHint: 'Закреплённые продуктовые роли, недельный цикл и связка зон без пересечений.',
  },
  {
    id: 5,
    key: 'revenue-architecture',
    eyebrow: 'АРХИТЕКТУРА ВЫРУЧКИ',
    title: 'Каждая зона — отдельный источник дохода',
    subtitle:
      'Платформа зарабатывает системой, а не одним продуктом',
    backdrop: 'stone',
    ctaLabel: 'Смотреть layout',
    deepDiveId: 'layout-revenue',
    ctaHint: 'Floor plans, zoning logic и привязка площадей к доходным сценариям.',
  },
  {
    id: 6,
    key: 'monetization-model',
    eyebrow: 'МОНЕТИЗАЦИОННАЯ МОДЕЛЬ',
    title: 'Один объект собирает весь спортивный цикл',
    subtitle:
      'Объект объединяет обучение, игры, турниры, тренировки и дополнительные сервисы в единую систему, где каждый этап усиливает следующий и увеличивает доход.',
    backdrop: 'charcoal',
    ctaLabel: 'Структура выручки',
    deepDiveId: 'monetization-model',
    ctaHint: 'Как recurring, event-driven и service-driven продукты собираются в один operating stack.',
  },
  {
    id: 7,
    key: 'monthly-revenue',
    eyebrow: 'РАСПИСАНИЕ',
    title: 'Расписание — это операционный актив, а не просто план',
    subtitle:
      'Каждое временное окно имеет свою экономику',
    backdrop: 'copper',
    ctaLabel: 'Детальные расчёты',
    deepDiveId: 'monthly-revenue',
    ctaHint: 'Категории, time windows и итоговая revenue composition зрелого месяца.',
  },
  {
    id: 8,
    key: 'unit-economics',
    eyebrow: '3-ЛЕТНИЙ РОСТ',
    title: 'Три года — три фазы роста',
    subtitle: 'Рост достигается не расширением, а доведением модели до зрелости',
    backdrop: 'blueprint',
    ctaLabel: 'Открыть unit economics',
    deepDiveId: 'unit-economics',
    ctaHint: 'Price engine, load logic и годовой output по ключевым зонам комплекса.',
  },
  {
    id: 9,
    key: 'scheduling',
    eyebrow: 'CAPEX',
    title: 'Инвестиционный запрос: $5,15 млн',
    subtitle: 'Капитал распределён по логике запуска доходной модели, а не по статьям сметы',
    backdrop: 'stone',
    ctaLabel: 'Подробнее по расписанию',
    deepDiveId: 'scheduling-engine',
    ctaHint: 'Фиксированный недельный цикл, tournament windows и управляемые пики загрузки.',
  },
  {
    id: 10,
    key: 'growth',
    eyebrow: 'ВОЗВРАТ КАПИТАЛА',
    title: 'Возврат капитала: 24–30 мес от открытия',
    subtitle:
      'От даты инвестиции полный цикл составляет 36–48 месяцев с учётом строительства и запуска.',
    backdrop: 'blueprint',
    ctaLabel: 'Смотреть модель',
    deepDiveId: 'growth-case',
    ctaHint: 'Curated summary по growth logic из full financial model.',
  },
  {
    id: 11,
    key: 'returns',
    eyebrow: 'ПОЗИЦИОНИРОВАНИЕ',
    title: 'Новая категория — не ещё один зал',
    subtitle:
      'APEX ARENA собирает полный спортивный цикл внутри одного объекта, одного бренда и одного календаря',
    backdrop: 'copper',
    ctaLabel: 'Логика возврата',
    deepDiveId: 'return-logic',
    ctaHint: 'Материалы по логике возврата, сроку окупаемости и устойчивости модели.',
  },
  {
    id: 12,
    key: 'object-tour',
    eyebrow: 'ОБЪЕКТ',
    title: 'Объект',
    subtitle:
      '5 300 м² · Ташкент · Мультиспортивный премиум-комплекс',
    backdrop: 'arena',
    ctaLabel: 'Открыть планировку',
    deepDiveId: 'object-tour',
    ctaHint: 'Фасад, основной зал, ключевые зоны и доступ к планировкам объекта.',
  },
  {
    id: 13,
    key: 'drivers',
    eyebrow: 'ЛОГИКА СЕТИ',
    title: 'Флагман + сеть тренировочных баз',
    subtitle:
      'Масштабирование происходит внутри Ташкента за счёт упрощённых объектов',
    backdrop: 'charcoal',
    ctaLabel: 'Стратегический фрейм',
    deepDiveId: 'operating-drivers',
    ctaHint: 'Краткая логика устойчивости модели и распределения выручки между основными потоками.',
  },
  {
    id: 14,
    key: 'positioning',
    eyebrow: 'РИСКИ',
    title: 'Риски известны — и каждый закрыт',
    subtitle:
      'Модель проектировалась с учётом downside сценариев, а не только базового',
    backdrop: 'blueprint',
    ctaLabel: 'Открыть позиционирование',
    deepDiveId: 'positioning-brief',
    ctaHint: 'Сравнение с типовым рынком и краткое описание новой категории для инвесторского разговора.',
  },
  {
    id: 15,
    key: 'ask',
    eyebrow: 'ЗАКРЫТИЕ',
    title: 'APEX ARENA готова к запуску',
    subtitle:
      'Первый премиальный мультиспортивный комплекс Ташкента — с проверенной экономикой и структурированным инвестиционным запросом',
    backdrop: 'stone',
    ctaLabel: 'Структура капитала',
    deepDiveId: 'investment-ask',
    ctaHint: 'Структура капитала, категории вложений и логика запуска первого флагманского объекта.',
  },
];

export const slideNarratives: Record<string, SlideNarrative> = {
  intro: {
    leadLabel: 'Flagship thesis',
    leadTitle: 'Мы создаем не просто стены, а фундамент для спортивных достижений.',
    leadBody:
      'Наша платформа — это конвергенция глубокой экспертизы и бизнес-логики: атлеты получают бесшовный путь к прогрессу, а инвесторы — прозрачный и защищенный от рисков финансовый инструмент.',
    ctaHint:
      'Внутри overview: ключевой investment thesis, логика объекта и доступ к supporting package.',
  },
  'market-gap': {
    leadLabel: 'Market gap',
    leadTitle: 'Рынок сформирован, но не структурирован. Мы собираем разрозненный спрос в единый системный актив.',
    leadBody: '',
  },
  demand: {
    leadLabel: 'Логика захвата спроса',
    leadTitle: 'Рынок в Ташкенте уже сформирован и продолжает расти.',
    leadBody:
      'Массовые виды спорта дают объём, более дорогие сегменты — высокий чек, регулярные тренировки — частоту. Задача — собрать этот спрос в единую систему.',
    highlightTitle: 'Ключевой вывод',
    highlightBody:
      'Futsal и basketball дают объём, tennis и premium-format usage дают чек, gym расширяет ежедневную базу спроса.',
  },
  'operating-system': {
    leadLabel: 'System logic',
    leadTitle: 'Один клиентский путь превращается в layered revenue engine.',
    leadBody:
      'Academy, open play, leagues, tournaments, gym и hospitality живут не рядом, а внутри общего operating model с единым календарём и единым уровнем сервиса.',
  },
  'revenue-architecture': {
    leadLabel: 'Spatial monetization',
    leadTitle: 'Площадь работает только тогда, когда у каждой зоны есть чёткая экономическая роль.',
    leadBody:
      'Баскетбол забирает ключевое вечернее время, мини-футбол даёт объём, теннис формирует высокий чек, тренажёрный зал и боевые искусства обеспечивают стабильную базу, а зона кафе увеличивает средние траты на посетителя.',
  },
  'monetization-model': {
    leadLabel: 'Главный тезис',
    leadTitle: 'Единая модель дохода внутри одного объекта',
    leadBody:
      'Сильный объект не продаёт одну услугу. Он удерживает человека внутри системы: от первых тренировок до регулярных игр, турниров, зала и дополнительных трат внутри комплекса.',
  },
  'monthly-revenue': {
    leadLabel: 'Структура выручки',
    leadTitle: 'Зрелый месяц читается как диверсифицированная корзина, а не как ставка на один корт.',
    leadBody:
      'Basketball, futsal, tennis, combat и gym формируют ядро. Night products, tournaments и ancillary layer усиливают доходность без изменения базовой архитектуры.',
  },
  'unit-economics': {
    leadLabel: 'Investor reading',
    leadTitle: 'Доход формируется системой, а не отдельными зонами',
    leadBody: '',
  },
  scheduling: {
    leadLabel: 'Логика дохода',
    leadTitle: 'Время работает как отдельный источник доходности внутри объекта.',
    leadBody:
      'Каждое окно дня отвечает за свою экономическую функцию: базовую загрузку, основной поток клиентов, пик выручки и дополнительную маржу.',
  },
  growth: {
    leadLabel: 'Логика роста',
    leadTitle: 'Рост достигается не за счёт расширения, а за счёт доведения операционной модели до зрелого состояния',
    leadBody:
      'Сначала формируется стабильная база академии и тренажёрного зала, затем усиливается загрузка вечерних часов, после чего модель дополняется турнирами и премиальными слотами',
  },
  returns: {
    leadLabel: 'Логика возврата',
    leadTitle: 'Важно не то, насколько агрессивный прогноз заложен, а то, что модель остаётся управляемой при разных сценариях загрузки',
    leadBody:
      'Сначала формируется стабильная база (академия и тренажёрный зал), затем усиливается загрузка вечерних часов, после чего добавляется турнирная и событийная выручка',
  },
  drivers: {
    leadLabel: 'Стратегический фрейм',
    leadTitle: 'Модель удерживается не отдельным продуктом, а сочетанием стабильной базы, пиковых часов и событийной выручки',
    leadBody: '',
  },
  positioning: {
    leadLabel: 'Тезис категории',
    leadTitle:
      'Обычный рынок продаёт отдельные услуги. APEX ARENA собирает полный спортивный цикл внутри одного объекта, одного бренда и одного календаря',
    leadBody: '',
  },
  ask: {
    leadLabel: 'Структура капитала',
    leadTitle:
      'Запрос собран как единая структура запуска: строительство, оснащение, системы, стартовая коммерческая фаза и резерв выхода на рабочую загрузку',
    leadBody: '',
  },
  scalability: {
    leadLabel: 'Логика тиражирования',
    leadTitle: 'После запуска ценность создаёт не один объект, а способность тиражировать проверенную модель',
    leadBody:
      'Если первый флагман подтверждает экономику, стандарты сервиса и управляемую загрузку, следующие объекты можно запускать быстрее и с меньшим операционным риском',
  },
  closing: {
    leadLabel: 'Финальный тезис',
    leadTitle: '',
    leadBody: '',
  },
};

export const coverMetrics: Metric[] = [
  {
    label: 'Локация',
    value: 'Ташкент',
    note: 'Первый flagship для валидации модели и brand standard.',
    tone: 'ivory',
  },
  {
    label: 'Формат',
    value: 'Multi-sport',
    note: 'Basketball, futsal, tennis, combat, gym, hospitality.',
    tone: 'steel',
  },
  {
    label: 'Выручка',
    value: '≈ 2,089 млрд',
    note: 'Плановая выручка зрелого месяца по полной financial model.',
    tone: 'amber',
  },
  {
    label: 'Payback',
    value: '30–36 мес.',
    note: 'Base-case логика возврата капитала для первого объекта.',
    tone: 'copper',
  },
];

export const problemCards: ProblemCard[] = [
  {
    index: '01',
    title: 'Нет среды для развития и регулярной игры. Недостаточно качественных площадок. Нет системных мест для регулярных игр. Отсутствует доступ к premium indoor формату',
    text: '',
    signal: '',
    tone: 'steel',
  },
  {
    index: '02',
    title: 'Нет структуры, где игрок может расти. Нет лиг и турниров. Нет игрового цикла (academy → league → finals). Нет отбора и progression системы',
    text: '',
    signal: '',
    tone: 'amber',
  },
  {
    index: '03',
    title: 'Игроки не представлены на рынке. Нет медийного покрытия региона. Не собирается статистика игроков. Нет digital-профилей и трекинга performance',
    text: '',
    signal: '',
    tone: 'copper',
  },
];

export const captureBands: CaptureBand[] = [
  {
    label: 'TAM',
    range: '25 000–35 000',
    note: 'Платёжеспособная reachable-аудитория indoor sports в Ташкенте: basketball, futsal, tennis, gym и combat с учётом пересечений между сегментами. ~$20–26M рынок indoor спорта Ташкента.',
    tone: 'ivory',
  },
  {
    label: 'SAM',
    range: '10 000–14 000',
    note: 'Аудитория в зоне доступа комплекса, готовая платить за качественный indoor-формат: академии, лиги, турниры, private training, gym и club service.~$9–12M платёжеспособный сегмент.',
    tone: 'amber',
  },
  {
    label: 'SOM',
    range: '1 800–2 500',
    note: 'Реалистичная месячная активная база первого объекта после выхода на рабочую загрузку: recurring clients + leagues + tournaments + visitors + premium bookings.~$1,3–1,8M выручка первого объекта.',
    tone: 'steel',
  },
];

export const marketDemand: DemandRange[] = [
  {
    label: 'Futsal / 5x5',
    min: 5600,
    max: 6500,
    note: 'Крупнейший массовый indoor participation market города.',
    tone: 'amber',
  },
  {
    label: 'Basketball',
    min: 3000,
    max: 3500,
    note: 'Сильная academy base, лиги и event audience.',
    tone: 'steel',
  },
  {
    label: 'Tennis',
    min: 2100,
    max: 2500,
    note: 'Меньше по объёму, но сильнее по premium-чеку и статусной ценности.',
    tone: 'ivory',
  },
  {
    label: 'Combat',
    min: 1500,
    max: 2500,
    note: 'Стабильный recurring сегмент и хорошая маржинальность групповых форматов.',
    tone: 'copper',
  },
];

export const operatingNodes: OperatingNode[] = [
  {
    title: 'Academy и daily training',
    text: 'База загрузки, возрастные потоки и ежемесячный recurring cashflow.',
    tone: 'ivory',
  },
  {
    title: 'Open play, leagues и tournaments',
    text: 'Игровой цикл, удержание сообщества и высокая monetization density вечера и weekend.',
    tone: 'amber',
  },
  {
    title: 'Premium service layer',
    text: 'Сервис, hospitality и quality environment удерживают чек и усиливают бренд актива.',
    tone: 'steel',
  },
];

export const zoneRevenueRows = [
  {
    zone: 'Court A / Basketball',
    role: 'Prime-time, leagues, finals',
    value: '352,9 млн / мес.',
    note: 'Главная баскетбольная площадка формирует основной доход и служит ареной для ключевых событий.',
    tone: 'steel' as const,
  },
  {
    zone: 'Court B / Futsal',
    role: 'Mass volume + evening league',
    value: '332,94 млн / мес.',
    note: 'Мини-футбол обеспечивает высокий поток за счёт частых игр и вечерней загрузки.',
    tone: 'amber' as const,
  },
  {
    zone: 'Court C / Tennis',
    role: 'Private, ladder, premium booking',
    value: '295,0 млн / мес.',
    note: 'Теннис работает как премиальный сегмент с высоким доходом за час использования.',
    tone: 'ivory' as const,
  },
  {
    zone: 'Gym',
    role: 'Recurring subscription base',
    value: '277,6 млн / мес.',
    note: 'Тренажёрный зал создаёт ежедневный стабильный поток за счёт регулярных тренировок и персональных занятий.',
    tone: 'copper' as const,
  },
  {
    zone: 'Combat hall',
    role: 'High-margin group programming',
    value: '243,0 млн / мес.',
    note: 'Боевые искусства дают устойчивую загрузку через групповые тренировки и вечерние классы.',
    tone: 'steel' as const,
  },
  {
    zone: 'Cafe + lobby',
    role: 'Second spend + sponsor layer',
    value: '270,0 млн / мес.',
    note: 'Кафе и зоны отдыха увеличивают дополнительный доход за счёт потока посетителей и событий.',
    tone: 'amber' as const,
  },
];

export const productTiles: ProductTile[] = [
  {
    title: 'Academy',
    price: '1,19–2,435 млн сум / мес.',
    logic: 'Фундаментальная база по basketball, futsal, tennis и combat с понятной repeat frequency.',
    tone: 'ivory',
  },
  {
    title: 'Leagues',
    price: '1,2–2,0 млн сум / команда',
    logic: 'Повторяющийся вечерний продукт, который заполняет самые дорогие регулярные окна.',
    tone: 'steel',
  },
  {
    title: 'Tournaments',
    price: '232 млн сум / мес.',
    logic: 'Weekend event engine, который усиливает и выручку, и приток новых участников.',
    tone: 'amber',
  },
  {
    title: 'Gym + PT',
    price: '850 тыс. + 220 тыс.',
    logic: 'Подписочная база и персональные сессии, стабилизирующие ежедневный cashflow.',
    tone: 'copper',
  },
  {
    title: 'Private / premium slots',
    price: '550 тыс.–1,3 млн / час',
    logic: 'Наиболее важный high-check слой для tennis, corporate и advanced formats.',
    tone: 'steel',
  },
  {
    title: 'Cafe / sponsor / retail',
    price: '270 млн сум / мес.',
    logic: 'Second spend и ancillary monetization, которые превращают трафик в дополнительную маржу.',
    tone: 'amber',
  },
];

export const productVisualCards: ImageFrameData[] = [
  {
    src: gymImage,
    alt: 'Premium gym at Apex Arena',
    title: 'Gym',
    note: 'Recurring memberships и PT создают устойчивый ежедневный поток.',
  },
  {
    src: tennisImage,
    alt: 'Premium tennis zone at Apex Arena',
    title: 'Tennis',
    note: 'Private sessions, ladder и premium booking усиливают чек на час.',
  },
  {
    src: combatImage,
    alt: 'Combat zone at Apex Arena',
    title: 'Combat',
    note: 'Группы, sparring nights и conditioning дают стабильную маржу.',
  },
  {
    src: cafeImage,
    alt: 'Cafe and hospitality zone at Apex Arena',
    title: 'Cafe / hospitality',
    note: 'Second spend и sponsor layer превращают event traffic в дополнительную прибыль.',
  },
];

export const revenueStreams: RevenueStream[] = [
  {
    label: 'Basketball',
    value: 352.9,
    display: '352,9 млн',
    note: 'Academy, city league и corporate league на show court.',
    tone: 'steel',
  },
  {
    label: 'Futsal',
    value: 332.94,
    display: '332,94 млн',
    note: 'Academy и evening league format с высокой частотой использования.',
    tone: 'amber',
  },
  {
    label: 'Tennis',
    value: 295,
    display: '295,0 млн',
    note: 'Academy, ladder, private и premium booking.',
    tone: 'ivory',
  },
  {
    label: 'Combat',
    value: 243,
    display: '243,0 млн',
    note: 'Kids, teens, adults и advanced evening blocks.',
    tone: 'copper',
  },
  {
    label: 'Gym',
    value: 277.6,
    display: '277,6 млн',
    note: 'Memberships и PT как ежедневная подписочная база.',
    tone: 'steel',
  },
  {
    label: 'Night session',
    value: 40,
    display: '40,0 млн',
    note: 'Structured night product, который добавляет маржу без опоры всей модели на ночь.',
    tone: 'amber',
  },
  {
    label: 'Night pass',
    value: 41.3,
    display: '41,3 млн',
    note: '01:00–08:00 access format для ограниченного, но повторяющегося спроса.',
    tone: 'ivory',
  },
  {
    label: 'Weekend tournaments',
    value: 232,
    display: '232,0 млн',
    note: 'Восемь событий в месяц и один ключевой finals weekend.',
    tone: 'copper',
  },
  {
    label: 'Cafe + retail + sponsor',
    value: 270,
    display: '270,0 млн',
    note: 'Ancillary доход, который усиливает economics на потоке людей.',
    tone: 'amber',
  },
];

export const monthlyRevenueSummary = 2089;
export const monthlyCostSummary = 1075;
export const monthlyProfitSummary = 1014;

export const unitEconomicsRows: UnitEconomicsRowData[] = [
  {
    zone: 'Court A / Basketball',
    price: '1,39–1,69 млн academy, 450 тыс.–1,3 млн / час',
    load: 'Academy 16:00–19:00, city / corporate leagues 19:00–23:00, finals по выходным',
    output: '4,23 млрд / год',
    note: 'Драйвер вечернего прайм-тайма',
    tone: 'steel',
  },
  {
    zone: 'Court B / Futsal',
    price: '1,49 млн academy, 450 тыс.–1,1 млн / час',
    load: 'Массовые возрастные группы днём и сильный evening league вечером',
    output: '3,99 млрд / год',
    note: 'Массовый объём и загрузка',
    tone: 'amber',
  },
  {
    zone: 'Court C / Tennis',
    price: '2,435 млн academy, 550 тыс.–1,0 млн / час',
    load: 'Private и premium booking днём, ladder / premium windows вечером',
    output: '3,54 млрд / год',
    note: 'Максимальный доход за час',
    tone: 'ivory',
  },
  {
    zone: 'Gym',
    price: '850 тыс. membership, 220 тыс. PT',
    load: 'Ежедневная подписочная база',
    output: '4,00 млрд / год',
    note: 'Основа стабильной загрузки',
    tone: 'copper',
  },
  {
    zone: 'Combat Zone',
    price: '1,19–1,29 млн combat academy',
    load: 'Вечерние групповые форматы',
    output: '2,25 млрд / год',
    note: 'Высокомаржинальные тренировки',
    tone: 'amber',
  },
];

export const scheduleBands: ScheduleBand[] = [
  {
    hours: '09:00–15:00',
    title: 'Развитие / персональные тренировки / школы',
    role: 'базовая загрузка',
    intensity: 56,
    tone: 'steel',
  },
  {
    hours: '16:00–20:00',
    title: 'Академия (дети и подростки)',
    role: 'основной поток клиентов',
    intensity: 82,
    tone: 'ivory',
  },
  {
    hours: '20:00–23:00',
    title: 'Лиги / премиальные слоты',
    role: 'максимальная выручка',
    intensity: 100,
    tone: 'amber',
  },
  {
    hours: '23:00–01:00',
    title: 'Ночные сессии',
    role: 'контролируемая монетизация',
    intensity: 62,
    tone: 'copper',
  },
  {
    hours: '01:00–08:00',
    title: 'Ночной абонемент',
    role: 'дополнительная маржа',
    intensity: 42,
    tone: 'copper',
  },
];

export const weekendWindows: WeekendWindow[] = [
  { label: 'Групповой этап', logic: 'объём', tone: 'ivory' },
  { label: 'Плей-офф', logic: 'вовлечённость', tone: 'steel' },
  { label: 'Полуфинал', logic: 'высокий спрос', tone: 'amber' },
  { label: 'Финал', logic: 'пик выручки', tone: 'amber' },
  { label: 'Шоу-матч', logic: 'премиум-событие', tone: 'copper' },
];

export const growthYears: GrowthYear[] = [
  {
    year: 'Год 1',
    description: 'Базовый уровень загрузки',
    revenue: 19,
    profit: 4.2,
    revenueLabel: '19,0 млрд',
    profitLabel: '4,2 млрд',
    tone: 'ivory',
  },
  {
    year: 'Год 2',
    description: 'Рост вечерней загрузки и дисциплины расписания',
    revenue: 25.1,
    profit: 8,
    revenueLabel: '25,1 млрд',
    profitLabel: '8,0 млрд',
    tone: 'amber',
  },
  {
    year: 'Год 3',
    description: 'Высокая плотность календаря и усиление турнирной модели',
    revenue: 31.8,
    profit: 11.2,
    revenueLabel: '31,8 млрд',
    profitLabel: '11,2 млрд',
    tone: 'steel',
  },
];

export const whyBlocks: WhyBlock[] = [
  {
    index: '01',
    title: 'Базовый поток клиентов',
    text: 'Академия и абонементы формируют ежедневную загрузку и предсказуемую выручку.',
    tone: 'steel',
    kind: 'stack',
  },
  {
    index: '02',
    title: 'Пиковая монетизация',
    text: 'Вечерние часы (лиги и премиальные слоты) дают основную выручку.',
    tone: 'amber',
    kind: 'events',
  },
  {
    index: '03',
    title: 'Усиление выручки',
    text: 'Турниры и события увеличивают доход без роста постоянных затрат.',
    tone: 'copper',
    kind: 'experience',
  },
  {
    index: '04',
    title: 'Дополнительная монетизация',
    text: 'Кафе, дополнительные продажи, ночные сессии и персональные тренировки увеличивают доход с каждого клиента.',
    tone: 'ivory',
    kind: 'repeatable',
  },
];

export const competitionRows: CompetitionRow[] = [
  {
    criterion: 'Формат',
    market: 'Разрозненные секции, аренда часов, отдельные турниры',
    apex: 'Единая спортивно-коммерческая платформа внутри одного объекта',
  },
  {
    criterion: 'Клиентский цикл',
    market: 'Клиент сам собирает маршрут между разными площадками и сервисами',
    apex: 'Академия, лиги, турниры, тренажёрный зал, персональные тренировки, ночные форматы, кафе и дополнительные продажи внутри одной среды и одного бренда',
  },
  {
    criterion: 'Основа выручки',
    market: 'Один основной продукт без полноценной системы допродаж',
    apex: 'Несколько взаимодополняющих потоков дохода вместо одного источника',
  },
  {
    criterion: 'Вечерние часы',
    market: 'Случайная загрузка, разовые бронирования, слабое управление пиковыми слотами',
    apex: 'Управляемая вечерняя загрузка: лиги, премиальные слоты, взрослые группы',
  },
  {
    criterion: 'Выходные и события',
    market: 'Нерегулярные активности без устойчивого календаря',
    apex: 'Постоянный турнирный календарь и финальные выходные как усилитель выручки',
  },
  {
    criterion: 'Дополнительный доход',
    market: 'Слабая или отсутствующая монетизация потока вне основной услуги',
    apex: 'Кафе, дополнительные продажи, поддержка событий, персональные и ночные форматы увеличивают доход с потока',
  },
  {
    criterion: 'Масштабируемость',
    market: 'Каждый объект живёт как отдельная площадка, а не как повторяемая модель',
    apex: 'Повторяемая модель с понятной логикой загрузки, монетизации и клиентского пути',
  },
];

export const allocationRows: AllocationRow[] = [
  {
    item: 'Строительство и внутренняя отделка',
    share: '45–50%',
    width: 50,
    note: 'Основной строительный объём, архитектурная отделка и подготовка среды под рабочую эксплуатацию.',
    tone: 'amber',
  },
  {
    item: 'Спортивное и функциональное оснащение',
    share: '20–25%',
    width: 24,
    note: 'Корты, тренажёрный зал, зона единоборств, оборудование для тренировок, соревнований и ежедневной загрузки.',
    tone: 'steel',
  },
  {
    item: 'Инженерные и цифровые системы',
    share: '10–12%',
    width: 12,
    note: 'Доступ, свет, звук, безопасность, система управления клиентской базой, операционные системы и цифровой контур объекта.',
    tone: 'ivory',
  },
  {
    item: 'Запуск бренда и коммерческой модели',
    share: '8–10%',
    width: 10,
    note: 'Предзапусковый спрос, партнёрства, стартовая коммуникация и формирование первой клиентской базы.',
    tone: 'copper',
  },
  {
    item: 'Резерв оборотного капитала',
    share: '10–12%',
    width: 12,
    note: 'Буфер на выход к плановой загрузке и устойчивый переход в рабочий режим.',
    tone: 'steel',
  },
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    stage: '01',
    title: 'Запуск флагмана',
    text: 'Первый объект подтверждает планировку, архитектуру выручки и стандарты сервиса в Ташкенте.',
  },
  {
    stage: '02',
    title: 'Фиксация модели',
    text: 'Операционный календарь, правила ценообразования, модель команды и стандарт сервиса оформляются в повторяемую систему.',
  },
  {
    stage: '03',
    title: 'Тиражирование формата',
    text: 'Следующие объекты повторяют уже проверенную логику дохода, загрузки и клиентского пути.',
  },
  {
    stage: '04',
    title: 'Создание ценности сети',
    text: 'Несколько объектов усиливают бренд, партнёрства, переговорную позицию и общую стоимость сети.',
  },
];

export const closingProofs = [
  'Спрос уже подтверждён',
  'Доход диверсифицирован',
  'Возврат капитала просчитан',
  'Модель масштабируется',
];

export const strategyVisuals: ImageFrameData[] = [
  {
    src: lobbyImage,
    alt: 'Apex Arena lobby and control point',
    title: 'Hospitality layer',
    note: 'Lobby и сервисная среда переводят объект из “спортивной аренды” в premium destination.',
  },
  {
    src: apexBrandImage,
    alt: 'Apex Arena league and brand system',
    title: 'Brand system',
    note: 'League identity и фирменный package помогают объекту жить как платформа, а не как просто площадка.',
  },
  {
    src: floorPlanTwoImage,
    alt: 'Планировка повторяемой модели',
    title: 'Повторяемая планировка',
    note: 'Планировка собирается не только по площади, а по логике доходных зон и управляемого клиентского потока.',
  },
  {
    src: arenasImage,
    alt: 'Архитектурный образ первого объекта',
    title: 'Стандарт первого объекта',
    note: 'Флагман задаёт архитектурный, сервисный и коммерческий стандарт для следующих локаций.',
  },
];
