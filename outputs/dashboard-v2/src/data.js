window.ADMISSIONS_360_DATA = {
  updatedAt: "12.07.2026, 23:59",
  demoLabel: "Агрегированный пример по выгрузке 130301.xlsx · без персональных данных",
  sourceHealth: [
    {
      label: "АБИТ / Excel",
      value: "82 записи",
      note: "Подтверждено · срез 12.07.2026",
      status: "confirmed"
    },
    {
      label: "Контроль данных",
      value: "65 из 82",
      note: "17 записей требуют проверки",
      status: "warning"
    },
    {
      label: "Bitrix24",
      value: "100 000 контактов",
      note: "Частично подтверждено · требуется карта полей",
      status: "partial"
    },
    {
      label: "Контур обработки",
      value: "Локальный сервер",
      note: "В интерфейсе показаны только агрегаты",
      status: "secure"
    }
  ],
  metrics: [
    { id: "submitted", icon: "▤", label: "Подали заявления", value: 82, delta: "Срез направления 13.03.01" },
    { id: "budget", icon: "◐", label: "На бюджет", value: 65, delta: "25 бюджетных мест" },
    { id: "paid", icon: "₽", label: "На платное", value: 17, delta: "55 платных мест" },
    { id: "agreements", icon: "✓", label: "Согласия на зачисление", value: 4, delta: "4,9% от заявлений", progress: 4.9 },
    { id: "medianScore", icon: "∑", label: "Медианный балл", value: 211, delta: "Средний балл: 182,4" },
    { id: "highScore", icon: "☆", label: "Абитуриенты 240+", value: 8, delta: "7 пока без согласия" },
    { id: "quality", icon: "◇", label: "Контроль пройден", value: "79,3%", delta: "65 / 82 записей", progress: 79.3 }
  ],
  programs: [
    {
      id: "130301",
      faculty: "Факультет урбанистики и городского хозяйства",
      icon: "13",
      program: "13.03.01 Теплоэнергетика и теплотехника",
      plan: 25,
      potential: 134,
      submitted: 82,
      contest: 2.6,
      risk: "Высокий",
      progress: 16,
      action: "Связаться с 7 абитуриентами 240+",
      form: "Очная",
      source: "АБИТ / Excel",
      status: "Подал заявление",
      detail: {
        subtitle: "Интеллектуальные тепловые энергосистемы · очная форма",
        provenance: "Фактические агрегаты из 130301.xlsx; потенциальный интерес и сценарий оборота — демонстрационные.",
        funnel: [
          { label: "Потенциальный интерес", value: 134, kind: "model" },
          { label: "Заявления", value: 82, kind: "fact" },
          { label: "На федеральный бюджет", value: 65, kind: "fact" },
          { label: "Согласия", value: 4, kind: "fact" }
        ],
        facts: [
          { label: "Бюджетных мест", value: "25" },
          { label: "Платных мест", value: "55" },
          { label: "Стоимость, очная", value: "427 000 ₽/год" },
          { label: "Нуждаются в общежитии", value: "37" }
        ],
        actions: [
          "Связаться с 7 абитуриентами с баллом 240+ без согласия",
          "Проверить 17 записей, не прошедших контроль",
          "Уточнить потребность в общежитии у 37 абитуриентов"
        ]
      }
    },
    {
      id: "090301",
      faculty: "Факультет информационных технологий",
      icon: "IT",
      program: "09.03.01 Интеграция и программирование в САПР",
      plan: 120,
      potential: 196,
      submitted: 104,
      contest: 2.1,
      risk: "Низкий",
      progress: 87,
      action: "Персональная рассылка",
      form: "Очная",
      source: "НТО",
      status: "Теплый лид"
    },
    {
      id: "090303",
      faculty: "Факультет информационных технологий",
      icon: "IT",
      program: "09.03.03 Прикладная информатика (Большие и открытые данные)",
      plan: 90,
      potential: 156,
      submitted: 83,
      contest: 1.8,
      risk: "Средний",
      progress: 92,
      action: "Позвонить высокобалльникам",
      form: "Очная",
      source: "Наука для жизни",
      status: "Готов к подаче"
    },
    {
      id: "transport",
      faculty: "Транспортный факультет",
      icon: "▣",
      program: "Компьютерный инжиниринг в автомобилестроении",
      plan: 150,
      potential: 214,
      submitted: 132,
      contest: 1.5,
      risk: "Низкий",
      progress: 88,
      action: "Продолжить сопровождение",
      form: "Очная",
      source: "Инженеры будущего",
      status: "Подал заявление"
    },
    {
      id: "150301",
      faculty: "Факультет машиностроения",
      icon: "⚙",
      program: "15.03.01 Машиностроение",
      plan: 170,
      potential: 201,
      submitted: 121,
      contest: 1.2,
      risk: "Высокий",
      progress: 71,
      action: "Усилить рекламу и обзвон",
      form: "Очная",
      source: "День открытых дверей",
      status: "Нужно действие"
    },
    {
      id: "270304",
      faculty: "Факультет машиностроения",
      icon: "⚙",
      program: "27.03.04 Управление в технических системах",
      plan: 90,
      potential: 122,
      submitted: 61,
      contest: 1.4,
      risk: "Средний",
      progress: 68,
      action: "Пригласить на консультацию",
      form: "Очно-заочная",
      source: "CRM",
      status: "Теплый лид"
    },
    {
      id: "080301",
      faculty: "Факультет урбанистики и городского хозяйства",
      icon: "⌂",
      program: "08.03.01 Промышленное и гражданское строительство",
      plan: 140,
      potential: 181,
      submitted: 94,
      contest: 1.3,
      risk: "Средний",
      progress: 67,
      action: "Рассылка по базе",
      form: "Очная",
      source: "Школы-партнеры",
      status: "Нужно действие"
    },
    {
      id: "180301",
      faculty: "Факультет химической технологии и биотехнологии",
      icon: "△",
      program: "18.03.01 Химическая технология",
      plan: 80,
      potential: 117,
      submitted: 63,
      contest: 1.5,
      risk: "Низкий",
      progress: 79,
      action: "Поддерживающая коммуникация",
      form: "Очная",
      source: "Наука для жизни",
      status: "Подал заявление"
    },
    {
      id: "190301",
      faculty: "Факультет химической технологии и биотехнологии",
      icon: "△",
      program: "19.03.01 Биотехнология",
      plan: 70,
      potential: 108,
      submitted: 52,
      contest: 1.6,
      risk: "Средний",
      progress: 74,
      action: "Пригласить на День открытых дверей",
      form: "Очная",
      source: "НТО",
      status: "Готов к подаче"
    },
    {
      id: "380301",
      faculty: "Факультет экономики и управления",
      icon: "▥",
      program: "38.03.01 Экономика",
      plan: 120,
      potential: 174,
      submitted: 118,
      contest: 1.6,
      risk: "Низкий",
      progress: 98,
      action: "Персональное предложение",
      form: "Очно-заочная",
      source: "CRM",
      status: "Подал заявление"
    },
    {
      id: "420301",
      faculty: "Факультет экономики и управления",
      icon: "▥",
      program: "42.03.01 Реклама и связи с общественностью",
      plan: 110,
      potential: 165,
      submitted: 91,
      contest: 1.5,
      risk: "Средний",
      progress: 83,
      action: "Усилить CRM-кампанию",
      form: "Очная",
      source: "Соцсети",
      status: "Теплый лид"
    },
    {
      id: "420302",
      faculty: "Факультет издательского дела и журналистики",
      icon: "▤",
      program: "42.03.02 Журналистика",
      plan: 75,
      potential: 109,
      submitted: 57,
      contest: 1.5,
      risk: "Средний",
      progress: 76,
      action: "Пригласить на консультацию",
      form: "Очная",
      source: "День открытых дверей",
      status: "Нужно действие"
    },
    {
      id: "540301",
      faculty: "Институт графики и искусства книги им. В. А. Фаворского",
      icon: "✎",
      program: "54.03.01 Дизайн",
      plan: 95,
      potential: 163,
      submitted: 108,
      contest: 1.7,
      risk: "Низкий",
      progress: 91,
      action: "Поддерживать контакт",
      form: "Очная",
      source: "Портфолио-конкурс",
      status: "Подал заявление"
    },
    {
      id: "290303",
      faculty: "Полиграфический факультет",
      icon: "⌗",
      program: "29.03.03 Технология полиграфического и упаковочного производства",
      plan: 70,
      potential: 101,
      submitted: 49,
      contest: 1.4,
      risk: "Высокий",
      progress: 61,
      action: "Срочная кампания",
      form: "Заочная",
      source: "CRM",
      status: "Нужно действие"
    }
  ],
  executiveSummary: {
    actions: [
      { priority: 1, tone: "blue", action: "Связаться с абитуриентами 240+ без согласия на зачисление", count: 7, unit: "чел." },
      { priority: 2, tone: "orange", action: "Проверить записи, которые не прошли контроль данных", count: 17, unit: "зап." },
      { priority: 3, tone: "green", action: "Уточнить условия общежития у заинтересованных абитуриентов", count: 37, unit: "чел." }
    ],
    risks: [
      { priority: 1, tone: "red", action: "Только 4 согласия при 25 бюджетных местах", count: "16%", unit: "плана" },
      { priority: 2, tone: "orange", action: "17 записей пока не прошли контроль", count: 17, unit: "зап." },
      { priority: 3, tone: "violet", action: "Семь сильных кандидатов 240+ остаются без согласия", count: 7, unit: "чел." }
    ],
    numbers: [
      { priority: 1, tone: "blue", action: "Всего заявлений по направлению", count: 82, unit: "заяв." },
      { priority: 2, tone: "green", action: "Медианный конкурсный балл", count: 211, unit: "балл" },
      { priority: 3, tone: "orange", action: "На бюджет / на платное", count: "65 / 17", unit: "" }
    ]
  },
  forms: [
    { label: "Бюджетная основа", value: 59, percent: 72 },
    { label: "Целевой прием", value: 6, percent: 7 },
    { label: "Полное возмещение", value: 17, percent: 21 }
  ],
  applicationSeries: {
    labels: ["26.06", "30.06", "04.07", "08.07", "11.07", "12.07"],
    current: [1, 10, 31, 51, 80, 82],
    previous: [2, 12, 29, 49, 70, 85]
  },
  paymentSeries: {
    labels: ["26.06", "30.06", "04.07", "08.07", "11.07", "12.07"],
    agreements: [0, 1, 3, 5, 8, 11],
    paid: [0, 0, 2, 4, 6, 8],
    turnover: [0, 0, 0.85, 1.71, 2.56, 3.42],
    turnoverPlan: [0, 0.43, 1.28, 2.14, 3.42, 4.7]
  }
};
