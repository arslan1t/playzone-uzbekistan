import {
  apexBrandImage,
  capexDoc,
  floorPlanOneImage,
  floorPlanTwoImage,
  fullFinancialModelPdf,
  investorAskDoc,
  irrRoiDoc,
  layoutDoc,
  marketBasketballPdf,
  marketCombatPdf,
  marketFutsalDoc,
  marketGymPdf,
  marketTennisPdf,
  operatingModelDoc,
  revenueBreakdownDoc,
  schedulingDoc,
  sensitivityDoc,
  teamDoc,
  tournamentModelDoc,
  unitEconomicsDoc,
  vipViewImage,
} from './deckAssets';
import type { DeepDiveEntry } from './deckSchema';

export const deepDiveEntries: DeepDiveEntry[] = [
  {
    id: 'intro-overview',
    eyebrow: 'PROJECT OVERVIEW',
    title: 'Инвестиционный обзор APEX ARENA',
    summary:
      'Объект объединяет несколько revenue потоков в одной системе.',
    layout: 'minimal',
    highlights: [
      { label: 'Выручка', value: '2.08B / мес', tone: 'ivory' },
      { label: 'Прибыль', value: '1.01B', tone: 'amber' },
      { label: 'Payback', value: '30–36 мес', tone: 'copper' },
    ],
    bulletPoints: [
      'Academy создаёт базовую загрузку',
      'Лиги и события монетизируют прайм-тайм',
      'Gym и combat увеличивают LTV',
    ],
    sections: [],
    sources: [
      {
        label: 'Full financial model',
        note: 'Финансовая модель по загрузке, выручке, расходам и прибыли.',
        href: fullFinancialModelPdf,
        type: 'pdf',
      },
      {
        label: 'Operating model',
        note: 'Недельный цикл, роли зон и операционная логика объекта.',
        href: operatingModelDoc,
        type: 'docx',
      },
      {
        label: 'Layout & architecture',
        note: 'Зонирование, потоки и структура первого flagship.',
        href: layoutDoc,
        type: 'docx',
      },
    ],
  },
  {
    id: 'market-gap-analysis',
    eyebrow: 'MARKET GAP',
    title: 'Где рынок теряет value',
    summary:
      'Спрос уже существует, но нет одного indoor-актива, который собирает обучение, игру и события.',
    layout: 'compact',
    sections: [
      {
        id: 'fragmentation',
        title: 'Рынок распадается на отдельные услуги',
        summary: 'Academy, court и event не связаны.',
        content: [],
      },
      {
        id: 'missing-loop',
        title: 'Нет полного product loop',
        summary: 'Обучение не переходит в игру.',
        content: [],
      },
      {
        id: 'premium-window',
        title: 'Premium gap остаётся открытым',
        summary: 'Нет flagship объекта.',
        content: [],
      },
    ],
    sources: [
      {
        label: 'Basketball market',
        note: 'Investor-style sizing по basketball demand.',
        href: marketBasketballPdf,
        type: 'pdf',
      },
      {
        label: 'Futsal market',
        note: 'Participation base и league-driven demand.',
        href: marketFutsalDoc,
        type: 'docx',
      },
      {
        label: 'Tennis market',
        note: 'Premium infrastructure и quality-format demand.',
        href: marketTennisPdf,
        type: 'pdf',
      },
      {
        label: 'Gym market',
        note: 'Maturity backdrop для wellness demand.',
        href: marketGymPdf,
        type: 'pdf',
      },
    ],
  },
  {
    id: 'demand-segmentation',
    eyebrow: 'DEMAND MAP',
    title: 'Как спрос раскладывается по вертикалям и почему это важно для revenue mix',
    summary:
      'Рынок нужно читать не как одну цифру, а как набор сегментов с разной логикой monetization: объём, премиальность, frequency и ancillary pull.',
    highlights: [
      { label: 'Basketball', value: '3 000–3 500 active users', tone: 'steel' },
      { label: 'Futsal / 5x5', value: '5 600–6 500 active users', tone: 'amber' },
      { label: 'Tennis', value: '2 100–2 500 active users', tone: 'ivory' },
      { label: 'Gym / fitness', value: '30 000–36 000 market backdrop', tone: 'copper' },
    ],
    sections: [
      {
        id: 'mass-verticals',
        title: 'Mass-participation вертикали',
        summary: 'Basketball и futsal дают объём и частоту.',
        content: [
          'Basketball в Ташкенте опирается на академии, school / university layer и живой event market. Для investor model осторожная рабочая цифра: 3 000–3 500 активной городской аудитории.',
          'Futsal / 5x5 — самый широкий командный participation market. Его сила не только в youth academies, но и в university, league и community layer.',
        ],
      },
      {
        id: 'premium-verticals',
        title: 'Premium и high-check вертикали',
        summary: 'Tennis и private usage усиливают чек на один слот.',
        content: [
          'Теннис меньше по total participation, но сильнее по premium-инфраструктуре, персональным тренировкам и статусной ценности на участника.',
          'Именно этот слой даёт объекту premium booking, private training и более высокую доходность одного часа корта.',
        ],
      },
      {
        id: 'wellness-backdrop',
        title: 'Wellness backdrop и ежедневная база',
        summary: 'Gym расширяет частоту посещения и сглаживает сезонность кортов.',
        content: [
          'Fitness-рынок Ташкента уже коммерчески зрелый, а рабочая investor-style цифра живой gym-экосистемы оценивается примерно в 30 000–36 000 человек.',
          'Для комплекса это значит, что gym не только продаёт абонемент, но и расширяет ежедневный поток и поводы для визита.',
        ],
      },
    ],
    sources: [
      {
        label: 'Basketball market study',
        note: 'Академический рынок, organised amateurs и event attendance logic.',
        href: marketBasketballPdf,
        type: 'pdf',
      },
      {
        label: 'Futsal market study',
        note: 'Youth, university, amateur leagues и event market.',
        href: marketFutsalDoc,
        type: 'docx',
      },
      {
        label: 'Tennis market study',
        note: 'Club ecosystem, infrastructure and premium monetization potential.',
        href: marketTennisPdf,
        type: 'pdf',
      },
      {
        label: 'Gym market study',
        note: 'Размер и зрелость fitness demand в городе.',
        href: marketGymPdf,
        type: 'pdf',
      },
      {
        label: 'Combat source file',
        note: 'Исходный market file доступен как supporting material для combat vertical.',
        href: marketCombatPdf,
        type: 'docx',
      },
    ],
  },
  {
    id: 'operating-system',
    eyebrow: 'OPERATING MODEL',
    title: 'Как единый operating model превращает объект в управляемую систему',
    summary:
      'Вся логика комплекса построена на закреплении типов активности за конкретными временными слотами и зонами без пересечений.',
    highlights: [
      { label: 'Day window', value: '09:00–15:00', tone: 'steel' },
      { label: 'Academy peak', value: '16:00–20:00', tone: 'ivory' },
      { label: 'League window', value: '20:00–23:00', tone: 'amber' },
      { label: 'Night layer', value: '23:00–08:00', tone: 'copper' },
    ],
    sections: [
      {
        id: 'fixed-cycle',
        title: 'Фиксированный недельный цикл',
        summary: 'Каждый слот уже знает свой продукт и свою аудиторию.',
        content: [
          'День работает на development, private, adult skills и partner blocks; после школы включается academy; вечер забирают league / premium windows; weekend — турниры и события.',
          'Это снижает хаос в расписании и делает использование площадей предсказуемым.',
        ],
      },
      {
        id: 'three-level-system',
        title: 'Три уровня системы',
        summary: 'База, регулярная загрузка и пиковые форматы работают вместе.',
        content: [
          'База: academy и gym. Регулярная загрузка: тренировки, leagues, premium slots. Пиковые форматы: tournaments, finals, events.',
          'Каждый слой выполняет свою функцию в economics и усиливает другой.',
        ],
      },
      {
        id: 'zone-roles',
        title: 'Независимая роль каждой зоны',
        summary: 'Система держится на чётком распределении ролей по пространству.',
        content: [
          'Court A — flagship court, Court B — volume futsal, Court C — premium tennis, Combat Hall — high-margin groups, Gym — recurring base, Cafe / Lobby — ancillary layer.',
          'В результате весь объект работает как coordinated stack, а не как набор случайных арендаторов.',
        ],
      },
    ],
    sources: [
      {
        label: 'Operating model',
        note: 'Основной документ по структуре системы, недельному циклу и ролям зон.',
        href: operatingModelDoc,
        type: 'docx',
      },
      {
        label: 'Scheduling concept',
        note: 'Короткая операционная записка по распределению продуктов по времени суток.',
        href: schedulingDoc,
        type: 'docx',
      },
    ],
  },
  {
    id: 'layout-revenue',
    eyebrow: 'LAYOUT & REVENUE',
    title: 'Почему layout нужно читать как revenue architecture',
    summary:
      'Планировка объекта ценна не сама по себе, а как система зон, каждая из которых отвечает за отдельное денежное окно и отдельную пользовательскую роль.',
    highlights: [
      { label: 'Court A', value: '352,9 млн / мес.', tone: 'steel' },
      { label: 'Court B', value: '332,94 млн / мес.', tone: 'amber' },
      { label: 'Court C', value: '295,0 млн / мес.', tone: 'ivory' },
      { label: 'Gym + Cafe', value: '547,6 млн / мес.', tone: 'copper' },
    ],
    preview: {
      kind: 'image',
      src: floorPlanOneImage,
      alt: 'First floor plan',
      eyebrow: 'Plan preview',
      title: 'Первый уровень собирает ядро операционной загрузки',
      summary:
        'На первом уровне сосредоточены main arena, futsal, gym, support block и lobby logic — то есть основная повторяющаяся monetization инфраструктура.',
    },
    sections: [
      {
        id: 'zoning-principles',
        title: 'Принципы зонирования',
        summary: 'Функции разделены, потоки минимально пересекаются.',
        content: [
          'Игроки проходят путь вход → locker → court / gym, зрители — вход → fan / vip → выход, а staff и service blocks работают отдельно.',
          'Такая логика важна не только для UX, но и для управления операционными пиками.',
        ],
      },
      {
        id: 'economic-roles',
        title: 'Экономические роли зон',
        summary: 'Каждая зона отвечает за свою часть revenue mix.',
        content: [
          'Main arena и futsal court забирают mass demand и competition formats; tennis даёт premium-check; gym и combat создают подписочную / групповаю базу; cafe усиливает second spend.',
          'Именно поэтому оценивать объект нужно по monetization windows, а не просто по метрам.',
        ],
      },
      {
        id: 'second-floor-value',
        title: 'Ценность второго уровня',
        summary: 'VIP, cafe, tennis и combat расширяют economics без разрушения базовой схемы.',
        content: [
          'Второй этаж добавляет статусную инфраструктуру, медиа / vip layer и premium consumption поверх основного спортивного ядра.',
          'Это повышает event value и делает формат ближе к premium sports destination.',
        ],
      },
    ],
    sources: [
      {
        label: 'Layout document',
        note: 'Архитектурная модель, зонирование и принципы пользовательских потоков.',
        href: layoutDoc,
        type: 'docx',
      },
      {
        label: '1st floor plan',
        note: 'Визуальный источник для ядра операционного уровня.',
        href: floorPlanOneImage,
        type: 'image',
      },
      {
        label: '2nd floor plan',
        note: 'Верхний уровень: vip, combat, cafe и tennis blocks.',
        href: floorPlanTwoImage,
        type: 'image',
      },
    ],
  },
  {
    id: 'monetization-model',
    eyebrow: 'MONETIZATION STACK',
    title: 'Как объект собирает recurring, event и ancillary выручку в один stack',
    summary:
      'Модель APEX ARENA работает слоями: база спроса, дорогие prime-time окна, peak-event layer и service monetization, которая повышает spend на визит.',
    highlights: [
      { label: 'Academy', value: 'основа базы' },
      { label: 'Leagues', value: 'ключевой evening engine', tone: 'amber' },
      { label: 'Tournaments', value: 'weekend peaks', tone: 'steel' },
      { label: 'Ancillary layer', value: 'cafe / sponsor / retail', tone: 'copper' },
    ],
    sections: [
      {
        id: 'base-layer',
        title: 'Базовый слой модели',
        summary: 'Academy, gym и repeat-frequency продукты стабилизируют месяц.',
        content: [
          'Academy формирует повторяющийся поток по возрастным группам, а gym делает объект ежедневным, а не только вечерним.',
          'Это критично для снижения зависимости от одних только league windows.',
        ],
      },
      {
        id: 'prime-time-layer',
        title: 'Prime-time layer',
        summary: 'Evening windows должны быть максимально дорогими и управляемыми.',
        content: [
          'Leagues, premium slots, adult groups и лучшие регулярные продукты забирают вечер, когда готовность платить максимальна.',
          'Сильный объект всегда понимает, что делать с 20:00–23:00 лучше, чем рынок разовой аренды.',
        ],
      },
      {
        id: 'peak-and-ancillary',
        title: 'Peak-event и ancillary layer',
        summary: 'Weekend events и second spend дают дополнительную рентабельность.',
        content: [
          'Tournaments и finals работают не только как игровые форматы, но и как маркетинговый и community engine.',
          'Cafe, sponsor support, retail и hospitality переводят трафик и зрителей в дополнительную прибыль.',
        ],
      },
    ],
    sources: [
      {
        label: 'Revenue breakdown',
        note: 'Категории выручки, revenue by type и распределение по времени.',
        href: revenueBreakdownDoc,
        type: 'docx',
      },
      {
        label: 'Tournament model',
        note: 'Связка лиг, турниров и Monthly Finals внутри общей экосистемы.',
        href: tournamentModelDoc,
        type: 'docx',
      },
      {
        label: 'Full financial model',
        note: 'Подробная месячная механика по ценам, клиентам и revenue drivers.',
        href: fullFinancialModelPdf,
        type: 'pdf',
      },
    ],
  },
  {
    id: 'monthly-revenue',
    eyebrow: 'MONTHLY P&L',
    title: 'Как читать выручку зрелого месяца по категориям и временным окнам',
    summary:
      'Ключевой тезис — модель зарабатывает на нескольких продуктах и нескольких временных окнах одновременно, поэтому один провал по направлению не ломает всю economics.',
    highlights: [
      { label: 'Выручка', value: '≈ 2,089 млрд' },
      { label: 'Расходы', value: '≈ 1,075 млрд', tone: 'steel' },
      { label: 'Опер. прибыль', value: '≈ 1,014 млрд', tone: 'amber' },
      { label: 'Маржа', value: '≈ 48,5%', tone: 'copper' },
    ],
    sections: [
      {
        id: 'category-view',
        title: 'Вид по категориям',
        summary: 'Core sports, gym, night products, events и ancillary layer собирают корзину дохода.',
        content: [
          'Игровые виды спорта (баскетбол, футзал) обеспечивают трафик и плотность комьюнити. Теннис и премиальный сегмент работают на увеличение среднего чека. Тренажерный зал и единоборства повышают частоту визитов и гарантируют стабильный ежедневный денежный поток.',
          'За счёт этого выручка распределяется по типам: регулярная, периодическая, событийная и сервисная.',
        ],
      },
      {
        id: 'time-window-view',
        title: 'Вид по времени',
        summary: 'День, вечер, выходные и ночь решают разные задачи.',
        content: [
          'День забирают academy development, private, gym и school / partner blocks. Вечер — leagues и premium slots. Выходные — tournaments и finals. Ночь — only additional margin.',
          'Такой time split позволяет управлять загрузкой без конфликта между продуктами.',
        ],
      },
      {
        id: 'investor-reading',
        title: 'Что важно инвестору',
        summary: 'Модель не зависит от одного кортового сценария.',
        content: [
          'Даже если часть weekend load слабее плана, объект сохраняет базу за счёт academy, gym и регулярных evening products.',
          'Именно диверсификация, а не “идеальная заполняемость”, делает economics похожей на инвестиционный продукт.',
        ],
      },
    ],
    sources: [
      {
        label: 'Revenue breakdown',
        note: 'Основной supporting file по выручке зрелого месяца.',
        href: revenueBreakdownDoc,
        type: 'docx',
      },
      {
        label: 'Full financial model',
        note: 'Детальные помесячные расчёты и breakdown по направлениям.',
        href: fullFinancialModelPdf,
        type: 'pdf',
      },
    ],
  },
  {
    id: 'unit-economics',
    eyebrow: 'UNIT ECONOMICS',
    title: 'Как unit economics раскладывает доход по зонам, часам и продуктам',
    summary:
      'Источник дохода здесь — не площадь сама по себе, а управляемая комбинация цены, load logic и роли зоны в общей системе.',
    highlights: [
      { label: 'ARPU', value: '≈ 1,6–1,9 млн / мес.' },
      { label: 'Active pool', value: '1 100–1 300 клиентов', tone: 'steel' },
      { label: 'Base margin', value: '≈ 48,5%', tone: 'amber' },
    ],
    sections: [
      {
        id: 'common-standard',
        title: 'Единый стандарт оценки',
        summary: 'Все зоны читаются по одной и той же рамке.',
        content: [
          'Доход за час / единицу, пик monetization, драйвер загрузки и экономическая роль — четыре обязательных вопроса к каждой зоне.',
          'Это помогает видеть, где объект делает объём, а где — premium margin.',
        ],
      },
      {
        id: 'zone-roles',
        title: 'Роли зон в системе',
        summary: 'Basketball — revenue driver, futsal — volume, tennis — premium margin, gym — база, combat — стабильная загрузка.',
        content: [
          'Именно распределение ролей по зонам делает общую выручку менее зависимой от одного сценария спроса.',
          'Для инвестора важно, что модель не требует одинаковой экономики от всех блоков одновременно.',
        ],
      },
      {
        id: 'key-insight',
        title: 'Ключевой инсайт',
        summary: 'Доход управляется временем и продуктами, а не только площадью.',
        content: [
          'Если правильно распределить day, academy peak, prime-time и weekend event windows, объект может давать сильную economics даже при физически ограниченном числе кортов.',
          'Это и есть главный аргумент против модели “обычной аренды по часам”.',
        ],
      },
    ],
    sources: [
      {
        label: 'Unit economics',
        note: 'Основной документ по структуре модели, ARPU и ролям зон.',
        href: unitEconomicsDoc,
        type: 'docx',
      },
      {
        label: 'Full financial model',
        note: 'Подробная подкладка по ценам, слотам и месячной экономике.',
        href: fullFinancialModelPdf,
        type: 'pdf',
      },
    ],
  },
  {
    id: 'scheduling-engine',
    eyebrow: 'SCHEDULING ENGINE',
    title: 'Почему расписание является самостоятельным monetization engine',
    summary:
      'Побеждает не тот объект, у кого больше часов, а тот, кто точнее знает, какой продукт должен стоять в каждом окне недели.',
    highlights: [
      { label: 'Day', value: 'база и development', tone: 'steel' },
      { label: 'Evening', value: 'league / premium peak', tone: 'amber' },
      { label: 'Weekend', value: 'tournaments / finals', tone: 'ivory' },
      { label: 'Night', value: 'дополнительная маржа', tone: 'copper' },
    ],
    sections: [
      {
        id: 'day-logic',
        title: 'Будний день',
        summary: 'Утро и день собирают базовую загрузку без конкуренции с вечерним прайсингом.',
        content: [
          'Adult skills, private, partner blocks, conditioning и tennis premium hours используют окна, которые рынок разовой аренды часто теряет.',
          'За счёт этого вечер остаётся свободным для самых дорогих регулярных продуктов.',
        ],
      },
      {
        id: 'evening-logic',
        title: 'Вечерний peak',
        summary: 'Evening должен быть жёстко закреплён за league, premium и academy peak.',
        content: [
          'Именно эти окна создают основную повторяемую monetization density и формируют ощущение живого flagship.',
          'Потеря evening discipline — главный риск для economics подобного объекта.',
        ],
      },
      {
        id: 'weekend-logic',
        title: 'Weekend как event engine',
        summary: 'Турниры и finals превращают выходные в отдельный доходный слой.',
        content: [
          'Система турниров тянет команды из academy, leagues и внешнего рынка, а Monthly Finals повышает статус экосистемы.',
          'Это одновременно усиливает revenue, community retention и brand visibility.',
        ],
      },
    ],
    sources: [
      {
        label: 'Scheduling concept',
        note: 'Короткий supporting file по day / evening / weekend / night logic.',
        href: schedulingDoc,
        type: 'docx',
      },
      {
        label: 'Tournament model',
        note: 'Связка лиг, турниров и Monthly Finals как часть календарной системы.',
        href: tournamentModelDoc,
        type: 'docx',
      },
      {
        label: 'Full financial model',
        note: 'Почасовая недельная сетка и доходные окна по зонам.',
        href: fullFinancialModelPdf,
        type: 'pdf',
      },
    ],
  },
  {
    id: 'growth-case',
    eyebrow: '3-YEAR CASE',
    title: 'Как full financial model объясняет рост первого объекта на 3 года',
    summary:
      'Рост проекта опирается на зрелость operating model: сначала формируется база клиентов, затем усиливается календарь, а потом добавляется плотность event и ancillary monetization.',
    highlights: [
      { label: 'Год 1', value: '19,0 млрд выручки' },
      { label: 'Год 2', value: '25,1 млрд выручки', tone: 'amber' },
      { label: 'Год 3', value: '31,8 млрд выручки', tone: 'steel' },
      { label: 'Profit', value: '4,2 → 11,2 млрд', tone: 'copper' },
    ],
    preview: {
      kind: 'pdf',
      eyebrow: 'PDF model',
      title: 'Full financial model остаётся основным источником роста',
      summary:
        'Встроенный drawer показывает curated summary, а полный PDF остаётся доступен отдельным действием, без грубого raw embed в deck.',
    },
    sections: [
      {
        id: 'year-one',
        title: 'Год 1 — формирование базы',
        summary: 'Первый год собирает academy, gym и узнаваемость бренда.',
        content: [
          'Главная задача старта — создать повторяемый спрос, закрепить расписание и доказать, что объект живёт как система, а не как разовые брони.',
          'На этом этапе важнее дисциплина модели, чем максимизация каждого отдельного дня.',
        ],
      },
      {
        id: 'year-two',
        title: 'Год 2 — закрепление operating mode',
        summary: 'Объект начинает сильнее монетизировать evening и weekend windows.',
        content: [
          'Leagues, regular tournaments и более плотный event calendar увеличивают выручку быстрее расходов, потому что fixed base уже создана.',
          'Это и даёт основной скачок качества прибыли на второй год.',
        ],
      },
      {
        id: 'year-three',
        title: 'Год 3 — зрелость calendar density',
        summary: 'Капитализация объекта растёт через качество загрузки, а не через фантазийный occupancy.',
        content: [
          'На зрелой стадии сильнее работают premium slots, finals, sponsor layer, hospitality spend и более управляемый loyalty loop.',
          'Именно поэтому выручка и прибыль растут одновременно, а не только оборот.',
        ],
      },
    ],
    sources: [
      {
        label: 'Full financial model',
        note: 'Ключевой PDF с месячной моделью и логикой 3-летнего роста.',
        href: fullFinancialModelPdf,
        type: 'pdf',
      },
      {
        label: 'Sensitivity analysis',
        note: 'Supporting view по стресс-, conservative-, base- и upside-сценариям.',
        href: sensitivityDoc,
        type: 'docx',
      },
    ],
  },
  {
    id: 'return-logic',
    eyebrow: 'PAYBACK & RETURN',
    title: 'Payback, annual return и scenario resilience без лишнего оптимизма',
    summary:
      'Return case читается через ramp-up и устойчивость operating model. Даже в conservative логике проект остаётся прибыльным на операционном уровне.',
    highlights: [
      { label: 'Payback', value: '30–36 мес.' },
      { label: 'Annual return', value: '30–40%', tone: 'amber' },
      { label: 'Stress case', value: 'прибыль сохраняется', tone: 'steel' },
    ],
    sections: [
      {
        id: 'capital-return',
        title: 'Логика возврата капитала',
        summary: 'Возврат строится по стадиям развития объекта.',
        content: [
          'Сначала запускается academy и регулярный recurring layer, затем закрепляется evening utilization, после чего модель усиливают tournaments и ancillary spend.',
          'Такой подход даёт более дисциплинированную, а не спекулятивную return story.',
        ],
      },
      {
        id: 'scenario-view',
        title: 'Scenario resilience',
        summary: 'Sensitivity analysis показывает устойчивость даже при снижении загрузки.',
        content: [
          'Base case даёт около 2,089 млрд выручки и около 1,014 млрд операционной прибыли в месяц. В stress-case прибыль уменьшается, но модель остаётся положительной.',
          'Это особенно важно для инвестора, который смотрит не только на upside, но и на защиту downside.',
        ],
      },
      {
        id: 'what-matters',
        title: 'Что действительно влияет на return',
        summary: 'Главные драйверы не скрыты и не экзотичны.',
        content: [
          'Evening utilization, weekend tournament load и academy / gym base — три критических параметра, которые реально управляют динамикой объекта.',
          'Если эти элементы в порядке, модель не требует искусственно завышенной загрузки по всем блокам одновременно.',
        ],
      },
    ],
    sources: [
      {
        label: 'IRR / ROI note',
        note: 'Curated supporting note по требуемым return metrics.',
        href: irrRoiDoc,
        type: 'docx',
      },
      {
        label: 'Sensitivity analysis',
        note: 'Stress, conservative, base and upside operating scenarios.',
        href: sensitivityDoc,
        type: 'docx',
      },
      {
        label: 'Full financial model',
        note: 'Основной источник месячной economics, из которой растёт payback logic.',
        href: fullFinancialModelPdf,
        type: 'pdf',
      },
    ],
  },
  {
    id: 'operating-drivers',
    eyebrow: 'STRATEGIC DRIVERS',
    title: 'Четыре драйвера, которые делают модель устойчивой и repeatable',
    summary:
      'Стратегический фрейм проекта держится на сочетании revenue mix, event calendar, premium experience и repeatable playbook. Только вместе эти элементы создают platform value.',
    highlights: [
      { label: 'Revenue mix', value: 'несколько независимых слоёв' },
      { label: 'Events', value: 'calendar density', tone: 'amber' },
      { label: 'Experience', value: 'premium service layer', tone: 'ivory' },
      { label: 'Playbook', value: 'repeatable format', tone: 'copper' },
    ],
    sections: [
      {
        id: 'mixed-revenue',
        title: 'Mixed revenue как защита модели',
        summary: 'Один источник никогда не должен объяснять весь P&L.',
        content: [
          'Academy, subscriptions, leagues, tournaments, private и ancillary layer распределяют доход по типам клиентов и времени суток.',
          'Это снижает зависимость от одного вида спорта или одного peak window.',
        ],
      },
      {
        id: 'event-calendar',
        title: 'Event calendar как growth driver',
        summary: 'Турнирный слой делает объект видимым и повышает плотность потребления.',
        content: [
          'Monthly Finals, weekend tournaments и showcase matches создают не только кассу, но и reason-to-return для всего сообщества.',
          'Флагман без событийности быстро превращается в обычную аренду.',
        ],
      },
      {
        id: 'repeatable-standard',
        title: 'Repeatable standard',
        summary: 'Успех проекта должен переноситься на следующий адрес.',
        content: [
          'Layout priorities, scheduling discipline, staffing logic и service standards можно упаковать в playbook и переносить в новые локации.',
          'Именно этот слой делает проект интересным как платформа, а не как единственный объект.',
        ],
      },
    ],
    sources: [
      {
        label: 'Operating model',
        note: 'Operational backbone для стандартизации формата.',
        href: operatingModelDoc,
        type: 'docx',
      },
      {
        label: 'Sensitivity analysis',
        note: 'Документ по устойчивости economics при изменении ключевых драйверов.',
        href: sensitivityDoc,
        type: 'docx',
      },
      {
        label: 'Team note',
        note: 'Поддерживающий файл для управленческой и execution-части истории.',
        href: teamDoc,
        type: 'docx',
      },
    ],
  },
  {
    id: 'positioning-brief',
    eyebrow: 'POSITIONING BRIEF',
    title: 'Почему APEX ARENA — это новая категория, а не улучшенный старый формат',
    summary:
      'Проект стоит между арендой, academy cluster и premium wellness, но на самом деле формирует отдельную категорию: integrated premium sports platform.',
    highlights: [
      { label: 'One address', value: 'academy + play + events' },
      { label: 'Premium layer', value: 'service + hospitality', tone: 'ivory' },
      { label: 'Community loop', value: 'league → finals → return', tone: 'amber' },
    ],
    preview: {
      kind: 'image',
      src: apexBrandImage,
      alt: 'Apex Arena brand system',
      eyebrow: 'Brand platform',
      title: 'У объекта уже есть потенциал жить как система, а не просто как объект',
      summary:
        'Фирменная лига, брендированный court language и статусный package усиливают отличие от обычного арендуемого зала.',
    },
    sections: [
      {
        id: 'old-market',
        title: 'Как сегодня выглядит типовой рынок',
        summary: 'Разрозненные предложения и точечные сценарии потребления.',
        content: [
          'Обычный рынок продаёт отдельные секции, отдельные часы, отдельные турниры и не объединяет это в единый клиентский путь.',
          'Из-за этого он хуже удерживает spend, schedule discipline и community identity.',
        ],
      },
      {
        id: 'new-category',
        title: 'Что создаёт новая категория',
        summary: 'Полный спортивный цикл внутри одного premium environment.',
        content: [
          'Academy, open play, leagues, tournaments, gym, vip view, cafe и sponsor-ready event layer превращают объект в destination.',
          'Именно целостность продукта делает формат более инвестиционно интересным.',
        ],
      },
      {
        id: 'why-investors-care',
        title: 'Почему это важно инвестору',
        summary: 'Новая категория означает иной профиль монетизации и масштаба.',
        content: [
          'Когда объект живёт как платформа, его ценность определяется не только арендой кортов, но и повторяемостью playbook, brand value и способностью расти в сеть.',
          'Это отличает capital story APEX ARENA от обычного sports hall project.',
        ],
      },
    ],
    sources: [
      {
        label: 'Basketball market',
        note: 'Поддержка по participation и event layer в одной из ключевых вертикалей.',
        href: marketBasketballPdf,
        type: 'pdf',
      },
      {
        label: 'Futsal market',
        note: 'Комьюнити-driven спрос и мощный league / university layer.',
        href: marketFutsalDoc,
        type: 'docx',
      },
      {
        label: 'Layout document',
        note: 'Поддержка тезиса о physical format как части differentiated product.',
        href: layoutDoc,
        type: 'docx',
      },
    ],
  },
  {
    id: 'investment-ask',
    eyebrow: 'CAPITAL PLAN',
    title: 'Как сформирован investment ask и на что именно идёт капитал',
    summary:
      'Ask должен читаться как дисциплинированный capital plan под запуск flagship: construction, equipment, engineering stack, go-to-market и working capital reserve.',
    highlights: [
      { label: 'Ask', value: '20–25 млрд сум' },
      { label: 'Construction + fit-out', value: '45–50%', tone: 'amber' },
      { label: 'Equipment', value: '20–25%', tone: 'steel' },
      { label: 'Reserve', value: '10–12%', tone: 'copper' },
    ],
    sections: [
      {
        id: 'ask-logic',
        title: 'Логика ask',
        summary: 'Размер запроса должен закрывать запуск полноценного flagship, а не минимально жизнеспособного объекта.',
        content: [
          'Основной объём капитала уходит в строительство, fit-out и оборудование — то есть в то, что напрямую определяет product quality и monetization capacity.',
          'Недофинансированный объект рискует потерять premium positioning ещё до запуска.',
        ],
      },
      {
        id: 'allocation',
        title: 'Allocation frame',
        summary: 'Инвестор должен видеть, какая часть капитала идёт в long-term infrastructure, а какая — в controlled ramp-up.',
        content: [
          'Engineering, IT и access systems обеспечивают управляемость комплекса. Launch / marketing помогают быстро собрать demand. Working capital даёт нормальный выход на зрелый режим.',
          'Эта структура выглядит как institutional capital plan, а не как список разрозненных расходов.',
        ],
      },
      {
        id: 'investor-signal',
        title: 'Investor signal',
        summary: 'Важно не только “сколько нужно”, но и насколько ясно объяснено, зачем нужен каждый блок капитала.',
        content: [
          'Собранный ask позволяет говорить об объекте как о готовом продукте с capital discipline и понятной логикой использования средств.',
          'Это снижает execution ambiguity на старте разговора с инвестором.',
        ],
      },
    ],
    sources: [
      {
        label: 'CAPEX note',
        note: 'Исходный supporting file по capital expenditure.',
        href: capexDoc,
        type: 'docx',
      },
      {
        label: 'Investor ask',
        note: 'Supporting file по структуре запроса и позиции инвестора.',
        href: investorAskDoc,
        type: 'docx',
      },
      {
        label: 'Full financial model',
        note: 'Economic backbone для capital discussion.',
        href: fullFinancialModelPdf,
        type: 'pdf',
      },
    ],
  },
  {
    id: 'scalability-playbook',
    eyebrow: 'SCALABILITY PLAYBOOK',
    title: 'Что именно делает формат повторяемым после запуска flagship',
    summary:
      'Масштабируется не картинка и не бренд сами по себе, а набор стандартизируемых решений: layout, pricing, schedule, staffing, service layer и event logic.',
    highlights: [
      { label: 'Flagship', value: 'доказывает формат' },
      { label: 'Playbook', value: 'фиксирует standard', tone: 'amber' },
      { label: 'Second site', value: 'снижает execution risk', tone: 'steel' },
    ],
    preview: {
      kind: 'image',
      src: floorPlanTwoImage,
      alt: 'Second floor plan',
      eyebrow: 'Repeatable format',
      title: 'Вторая планировочная логика показывает, что объект мыслится как система',
      summary:
        'VIP, cafe, tennis и combat не случайно добавлены сверху: это часть repeatable product architecture, а не разовая декоративная надстройка.',
    },
    sections: [
      {
        id: 'what-gets-replicated',
        title: 'Что переносится в следующую локацию',
        summary: 'Физическая и операционная логика должны быть воспроизводимы.',
        content: [
          'Zoning priorities, court roles, staffing ratios, calendar blocks, pricing discipline и event framework можно упаковать в рабочий playbook.',
          'Это сокращает время на запуск следующего объекта и делает expansion story убедительнее.',
        ],
      },
      {
        id: 'why-flagship-first',
        title: 'Зачем нужен именно flagship',
        summary: 'Первый объект задаёт лучший стандарт для всей платформы.',
        content: [
          'Флагман нужен, чтобы доказать качество продукта, собрать community anchor и создать event / media point притяжения.',
          'Без сильного первого объекта сеть рискует масштабировать среднее качество, а не premium standard.',
        ],
      },
      {
        id: 'platform-value',
        title: 'От объекта к platform value',
        summary: 'Несколько площадок дают больше, чем просто сумму их кортов.',
        content: [
          'Brand, data, partnerships, league ecosystem и единый service standard увеличивают общую ценность сети по сравнению с одиночными независимыми объектами.',
          'Именно эта логика позволяет говорить про APEX ARENA как про platform business.',
        ],
      },
    ],
    sources: [
      {
        label: 'Layout & architecture',
        note: 'Основа повторяемой физической логики объекта.',
        href: layoutDoc,
        type: 'docx',
      },
      {
        label: 'Operating model',
        note: 'Шаблон для стандартизации расписания и ролей зон.',
        href: operatingModelDoc,
        type: 'docx',
      },
      {
        label: '2nd floor plan',
        note: 'Supporting visual по верхнему уровню и premium / ancillary stack.',
        href: floorPlanTwoImage,
        type: 'image',
      },
    ],
  },
  {
    id: 'closing-package',
    eyebrow: 'INVESTOR PACKAGE',
    title: 'Консолидированный пакет для следующего инвесторского разговора',
    summary:
      'После deck у инвестора должен быть быстрый путь в model pack, operating logic, layout materials и capital case — без поиска файлов по репозиторию.',
    highlights: [
      { label: 'Market', value: 'segmented demand files' },
      { label: 'Model', value: 'full financial pack', tone: 'amber' },
      { label: 'Operations', value: 'layout + scheduling + ops', tone: 'steel' },
      { label: 'Capital', value: 'ask + CAPEX + return', tone: 'copper' },
    ],
    preview: {
      kind: 'image',
      src: vipViewImage,
      alt: 'Apex Arena VIP view',
      eyebrow: 'Closing asset',
      title: 'Финальный образ должен поддерживать platform thesis',
      summary:
        'VIP view и show-court environment подчёркивают, что речь идёт о premium destination, а не о рядовой спортивной коробке.',
    },
    sections: [
      {
        id: 'what-to-send',
        title: 'Что должно уходить после презентации',
        summary: 'Упакованный пакет должен продолжать разговор, а не терять его.',
        content: [
          'Инвестору нужны: market logic, operating model, layout, full financial model, capital ask и return logic — в ясной иерархии.',
          'Deck остаётся executive summary, а supporting package переводит разговор на уровень due diligence.',
        ],
      },
      {
        id: 'decision-flow',
        title: 'Как пакет помогает принимать решение',
        summary: 'Материалы должны отвечать на четыре вопроса: рынок, формат, economics, масштаб.',
        content: [
          'Если пакет собран правильно, инвестор быстро понимает, почему рынок существует, как объект работает, где генерируется прибыль и что именно масштабируется.',
          'Именно поэтому integrated drawer и структурированные source actions важны для investor-grade presentation website.',
        ],
      },
      {
        id: 'next-conversation',
        title: 'О чём должен быть следующий разговор',
        summary: 'Не о красоте deck, а о качестве economics и execution path.',
        content: [
          'Следующий шаг — обсуждение capital structure, launch plan, site selection specifics и управленческой команды, а не базовой идеи проекта.',
          'Хороший deck должен вывести разговор именно на этот уровень.',
        ],
      },
    ],
    sources: [
      {
        label: 'Full financial model',
        note: 'Главный документ по продуктам, ценам, выручке и расходам.',
        href: fullFinancialModelPdf,
        type: 'pdf',
      },
      {
        label: 'Operating model',
        note: 'Операционная система и weekly cycle.',
        href: operatingModelDoc,
        type: 'docx',
      },
      {
        label: 'Layout & architecture',
        note: 'Планировочная логика и зонирование.',
        href: layoutDoc,
        type: 'docx',
      },
      {
        label: 'Investment ask',
        note: 'Ask, capital allocation и return materials.',
        href: investorAskDoc,
        type: 'docx',
      },
      {
        label: 'Team note',
        note: 'Supporting management / execution file.',
        href: teamDoc,
        type: 'docx',
      },
    ],
  },
];

export const deepDiveById = deepDiveEntries.reduce<Record<string, DeepDiveEntry>>((acc, entry) => {
  acc[entry.id] = entry;
  return acc;
}, {});
