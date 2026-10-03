import type { QuizQuestion } from '@/types';
import { ANIMALS, COLORS, SHAPES, LETTERS, shuffle } from '@/lib/gameData';

// ---------------------------------------------------------------------------
// 500+ preschool question bank. Questions are generated from curated
// preschool data (letters, numbers, colors, shapes, animals, body parts,
// weather, days, fruits, transport, nature) — every question unique.
// ---------------------------------------------------------------------------

export const QUIZ_CATEGORIES = [
  'Letters', 'Numbers', 'Colors', 'Shapes', 'Animals',
  'Body', 'Weather', 'Days', 'Fruits', 'Transport', 'Nature',
] as const;
export type QuizCategory = (typeof QUIZ_CATEGORIES)[number];

const TL_COLORS = COLORS.slice(0, 14);

const BODY_PARTS = [
  { en: 'Head', tl: 'Ulo' }, { en: 'Eyes', tl: 'Mga Mata' }, { en: 'Nose', tl: 'Ilong' },
  { en: 'Mouth', tl: 'Bibig' }, { en: 'Ears', tl: 'Tainga' }, { en: 'Hands', tl: 'Kamay' },
  { en: 'Feet', tl: 'Paa' }, { en: 'Arms', tl: 'Braso' }, { en: 'Legs', tl: 'Binti' },
  { en: 'Teeth', tl: 'Ngipin' }, { en: 'Hair', tl: 'Buhok' }, { en: 'Tummy', tl: 'Tiyan' },
];

const WEATHER = [
  { en: 'Sunny', tl: 'Maaraw', emoji: '☀️' }, { en: 'Rainy', tl: 'Umuulan', emoji: '🌧️' },
  { en: 'Cloudy', tl: 'Maulap', emoji: '☁️' }, { en: 'Windy', tl: 'Mahangin', emoji: '🌬️' },
  { en: 'Stormy', tl: 'May Bagyo', emoji: '⛈️' }, { en: 'Snowy', tl: 'May Niyebe', emoji: '❄️' },
];

const DAYS = [
  { en: 'Monday', tl: 'Lunes' }, { en: 'Tuesday', tl: 'Martes' }, { en: 'Wednesday', tl: 'Miyerkules' },
  { en: 'Thursday', tl: 'Huwebes' }, { en: 'Friday', tl: 'Biyernes' }, { en: 'Saturday', tl: 'Sabado' },
  { en: 'Sunday', tl: 'Linggo' },
];

const FRUITS = [
  { en: 'Banana', tl: 'Saging', emoji: '🍌' }, { en: 'Apple', tl: 'Mansanas', emoji: '🍎' },
  { en: 'Mango', tl: 'Mangga', emoji: '🥭' }, { en: 'Orange', tl: 'Dalandan', emoji: '🍊' },
  { en: 'Grapes', tl: 'Ubas', emoji: '🍇' }, { en: 'Watermelon', tl: 'Pakwan', emoji: '🍉' },
  { en: 'Pineapple', tl: 'Pinya', emoji: '🍍' }, { en: 'Strawberry', tl: 'Strawberry', emoji: '🍓' },
  { en: 'Coconut', tl: 'Niyog', emoji: '🥥' }, { en: 'Papaya', tl: 'Papaya', emoji: '🧑‍🌾' },
];

const TRANSPORT = [
  { en: 'Car', tl: 'Kotse', emoji: '🚗' }, { en: 'Bus', tl: 'Bus', emoji: '🚌' },
  { en: 'Jeepney', tl: 'Jeepney', emoji: '🚙' }, { en: 'Bicycle', tl: 'Bisikleta', emoji: '🚲' },
  { en: 'Motorcycle', tl: 'Motorsiklo', emoji: '🏍️' }, { en: 'Train', tl: 'Tren', emoji: '🚆' },
  { en: 'Boat', tl: 'Bangka', emoji: '⛵' }, { en: 'Airplane', tl: 'Eroplano', emoji: '✈️' },
  { en: 'Helicopter', tl: 'Helicopter', emoji: '🚁' }, { en: 'Tricycle', tl: 'Tricycle', emoji: '🛺' },
];

const NATURE = [
  { en: 'Sun', tl: 'Araw', emoji: '☀️' }, { en: 'Moon', tl: 'Buwan', emoji: '🌙' },
  { en: 'Star', tl: 'Bituin', emoji: '⭐' }, { en: 'Cloud', tl: 'Ulap', emoji: '☁️' },
  { en: 'Rain', tl: 'Ulan', emoji: '🌧️' }, { en: 'Tree', tl: 'Puno', emoji: '🌳' },
  { en: 'Flower', tl: 'Bulaklak', emoji: '🌸' }, { en: 'Mountain', tl: 'Bundok', emoji: '⛰️' },
  { en: 'River', tl: 'Ilog', emoji: '🏞️' }, { en: 'Sea', tl: 'Dagat', emoji: '🌊' },
];

const TL_ANIMALS = ANIMALS;
const TL_SHAPES = SHAPES;

function makeQ(q: string, correct: string, wrongs: string[]): QuizQuestion {
  const options = shuffle([correct, ...wrongs]);
  return { q, options, answer: options.indexOf(correct) };
}

function fourWrong(pool: string[], exclude: string): string[] {
  return shuffle(pool.filter(x => x !== exclude)).slice(0, 3);
}

// --- Letters ----------------------------------------------------------------

const LETTER_WORDS: Record<string, string> = {
  A: 'Aso', B: 'Bola', C: 'Cadena', D: 'Daga', E: 'Eroplano', F: 'Fideo',
  G: 'Gatas', H: 'Halo-halo', I: 'Isda', J: 'Jeep', K: 'Kabayo', L: 'Laruan',
  M: 'Mansanas', N: 'Niyog', O: 'Opsyon', P: 'Pusa', R: 'Reyna', S: 'Saging',
  T: 'Truck', U: 'Ubas', V: 'Van', W: 'Watawat', Y: 'Yoyo', Z: 'Zoo',
};

function letterQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  LETTERS.forEach(L => {
    const i = LETTERS.indexOf(L);
    if (i < 25) {
      const nextL = LETTERS[i + 1];
      qs.push(makeQ(`Anong letra ang kasunod ng ${L}?`, nextL, fourWrong(LETTERS, nextL)));
    }
    if (i > 0) {
      const prevL = LETTERS[i - 1];
      qs.push(makeQ(`Anong letra ang nasa likod ng ${L}?`, prevL, fourWrong(LETTERS, prevL)));
    }
    const word = LETTER_WORDS[L];
    if (word) {
      const others = Object.values(LETTER_WORDS).filter(w => w[0] !== L);
      qs.push(makeQ(`Aling salita ang nagsisimula sa letrang ${L}?`, word, shuffle(others).slice(0, 3)));
      qs.push(makeQ(`Anong letra ang nagsisimula ng "${word}"?`, L, fourWrong(LETTERS, L)));
    }
  });
  const vowels: Record<string, string> = { A: 'Ah', E: 'Eh', I: 'Ih', O: 'Oh', U: 'Uh' };
  Object.entries(vowels).forEach(([L, sound]) => {
    qs.push(makeQ(`Anong tunog ng letrang ${L}?`, sound, shuffle(['Bah', 'Kah', 'Mah'])));
  });
  qs.push(makeQ('Anong letra ang una sa alphabet?', 'A', ['B', 'C', 'D']));
  qs.push(makeQ('Anong letra ang huli sa alphabet?', 'Z', ['X', 'Y', 'W']));
  qs.push(makeQ('Ilang letra sa "ASO"?', '3', ['2', '4', '5']));
  qs.push(makeQ('Ilang letra sa "PUSA"?', '4', ['3', '5', '6']));
  qs.push(makeQ('Ilang letra sa "BOLA"?', '4', ['3', '5', '6']));
  qs.push(makeQ('Ilang letra sa "KABAYO"?', '6', ['4', '5', '7']));
  return qs;
}

// --- Numbers ----------------------------------------------------------------

function numberQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  for (let n = 1; n <= 10; n++) {
    if (n < 10) {
      const next = String(n + 1);
      const wrongs = shuffle([n - 1, n + 2, n + 3, n + 5].filter(x => x >= 1 && x !== n + 1)).slice(0, 3).map(String);
      qs.push(makeQ(`Ano ang kasunod ng ${n}?`, next, wrongs));
    }
    const prev = String(n - 1);
    if (n > 1) {
      const wrongs2 = shuffle([n, n + 1, n + 2]).slice(0, 3).map(String);
      qs.push(makeQ(`Ano ang nasa likod ng ${n}?`, prev, wrongs2));
    }
  }
  for (let a = 1; a <= 5; a++) {
    for (let b = 1; a + b <= 10; b += 2) {
      const sum = String(a + b);
      const wrongs = shuffle([a + b - 1, a + b + 1, a + b + 2]).filter(x => x >= 1).slice(0, 3).map(String);
      qs.push(makeQ(`Magbilang: ${a} + ${b} = ?`, sum, wrongs));
    }
  }
  const facts: [string, string, string[]][] = [
    ['Ilang araw sa isang linggo?', '7', ['5', '6', '10']],
    ['Ilang mata ang mayroon ang tao?', '2', ['1', '3', '4']],
    ['Ilang paa ang mayroon ang ibon?', '2', ['0', '4', '6']],
    ['Ilang daliri sa isang kamay?', '5', ['3', '4', '10']],
    ['Ilang paa ng spider?', '8', ['4', '6', '10']],
    ['Ilang paa ang mayroon ang isda?', '0', ['2', '4', '8']],
    ['Ilang tainga ang mayroon ang tao?', '2', ['1', '3', '4']],
    ['Ilang buwan sa isang taon?', '12', ['10', '14', '20']],
    ['Ilang oras kadalas ang tulog ng bata sa gabi?', '10', ['1', '3', '20']],
    ['Ilang paa ang mayroon ang kalabaw?', '4', ['2', '6', '8']],
    ['Ilang pakpak ang mayroon ang ibon?', '2', ['4', '6', '0']],
    ['Ilang gulong ang mayroon ang bisikleta?', '2', ['3', '4', '6']],
    ['Ilang gulong ang mayroon ang tricycle?', '3', ['2', '4', '6']],
  ];
  facts.forEach(([q, a, wrong]) => qs.push(makeQ(q, a, wrong)));
  // subtraction within 5
  for (let a = 2; a <= 5; a++) {
    for (let b = 1; b < a; b++) {
      const diff = String(a - b);
      const wrongs = shuffle([a - b + 1, a - b + 2, a - b - 1].filter(x => x >= 0)).slice(0, 3).map(String);
      qs.push(makeQ(`Magbilang: ${a} - ${b} = ?`, diff, wrongs));
    }
  }
  qs.push(makeQ('Alin ang mas malaki: 3 o 7?', '7', ['3', '5', '2']));
  qs.push(makeQ('Alin ang mas maliit: 2 o 5?', '2', ['5', '4', '3']));
  qs.push(makeQ('Bilangin: 1, 2, 3, ___?', '4', ['5', '6', '2']));
  return qs;
}

// --- Colors -----------------------------------------------------------------

function colorQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const colorTlNames = TL_COLORS.map(c => c.tl);
  const colorEnNames = TL_COLORS.map(c => c.name);
  TL_COLORS.forEach(c => {
    qs.push(makeQ(`Ano ang Tagalog ng "${c.name}"?`, c.tl, fourWrong(colorTlNames, c.tl)));
    qs.push(makeQ(`Ano ang Ingles ng "${c.tl}"?`, c.name, fourWrong(colorEnNames, c.name)));
  });
  const associations: [string, string, string[]][] = [
    ['Ano ang kulay ng kalangitan?', 'Asul', ['Pula', 'Berde', 'Dilaw']],
    ['Ano ang kulay ng damo?', 'Berde', ['Pula', 'Asul', 'Itim']],
    ['Ano ang kulay ng araw?', 'Dilaw', ['Asul', 'Berde', 'Itim']],
    ['Ano ang kulay ng gabi?', 'Itim', ['Pula', 'Puti', 'Dilaw']],
    ['Ano ang kulay ng niyebe?', 'Puti', ['Itim', 'Pula', 'Asul']],
    ['Ano ang kulay ng dugo?', 'Pula', ['Berde', 'Puti', 'Dilaw']],
    ['Ano ang kulay ng saging?', 'Dilaw', ['Pula', 'Berde', 'Itim']],
    ['Ano ang kulay ng puno ng kahoy?', 'Kayumanggi', ['Asul', 'Dilaw', 'Puti']],
    ['Ano ang kulay ng ubas?', 'Lila', ['Pula', 'Asul', 'Berde']],
    ['Ano ang kulay ng dahon ng puno?', 'Berde', ['Pula', 'Dilaw', 'Itim']],
    ['Ano ang kulay ng nilagang itlog (yolk)?', 'Dilaw', ['Pula', 'Berde', 'Asul']],
    ['Ano ang kulay ng bulaklak na rosas?', 'Rosas', ['Pula', 'Dilaw', 'Itim']],
    ['Ilang kulay ang bahaghari?', '7', ['3', '5', '10']],
    ['Ano ang kulay ng kape?', 'Kayumanggi', ['Asul', 'Berde', 'Puti']],
    ['Ano ang kulay ng gatas?', 'Puti', ['Itim', 'Pula', 'Asul']],
    ['Ano ang kulay ng ulap?', 'Puti', ['Itim', 'Pula', 'Asul']],
    ['Ano ang kulay ng langit pag-gabi?', 'Itim', ['Puti', 'Dilaw', 'Rosas']],
    ['Ano ang kulay ng apoy?', 'Pula', ['Asul', 'Berde', 'Puti']],
    ['Ano ang kulay ng dahon ng saging?', 'Berde', ['Pula', 'Dilaw', 'Itim']],
  ];
  associations.forEach(([q, a, wrong]) => qs.push(makeQ(q, a, wrong)));
  return qs;
}

// --- Shapes -----------------------------------------------------------------

function shapeQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const shapeTlNames = TL_SHAPES.map(s => s.tl);
  TL_SHAPES.forEach(s => {
    qs.push(makeQ(`Ano ang tawag sa hugis na ${s.emoji}?`, s.tl, fourWrong(shapeTlNames, s.tl)));
  });
  const shapeFacts: [string, string, string[]][] = [
    ['Ilang gilid ang square?', '4', ['3', '5', '6']],
    ['Ilang gilid ang triangle?', '3', ['4', '5', '6']],
    ['Ilang gilid ang pentagon?', '5', ['3', '4', '6']],
    ['Ilang gilid ang hexagon?', '6', ['4', '5', '8']],
    ['Anong hugis ang perang barya?', 'Bilog', ['Square', 'Triangle', 'Rectangle']],
    ['Anong hugis ang bola?', 'Bilog', ['Square', 'Triangle', 'Star']],
    ['Anong hugis ang piraso ng pizza?', 'Triangle', ['Bilog', 'Square', 'Star']],
    ['Anong hugis ang puso?', 'Puso', ['Bilog', 'Square', 'Star']],
    ['Anong hugis ang may 3 gilid?', 'Triangle', ['Square', 'Bilog', 'Star']],
    ['Anong hugis ang may 4 pantayong gilid?', 'Square', ['Triangle', 'Bilog', 'Star']],
    ['Anong hugis ang bandila ng samahan?', 'Square', ['Bilog', 'Triangle', 'Star']],
    ['Anong hugis ang itlog ng ibon?', 'Itlog', ['Square', 'Star', 'Triangle']],
    ['Anong hugis ang buwan sa gabi?', 'Buwan', ['Square', 'Star', 'Triangle']],
  ];
  shapeFacts.forEach(([q, a, wrong]) => qs.push(makeQ(q, a, wrong)));
  return qs;
}

// --- Animals ----------------------------------------------------------------

function animalQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const animalTlNames = TL_ANIMALS.map(a => a.tl);
  TL_ANIMALS.forEach(a => {
    qs.push(makeQ(`Anong hayop ang ${a.emoji}?`, a.tl, fourWrong(animalTlNames, a.tl)));
    qs.push(makeQ(`Ano ang Ingles ng "${a.tl}"?`, a.name, fourWrong(TL_ANIMALS.map(x => x.name), a.name)));
  });
  const sounds: [string, string, string[]][] = [
    ['Anong tunog ng aso?', 'Aw-aw', ['Meow', 'Moo', 'Oink']],
    ['Anong tunog ng pusa?', 'Meow', ['Aw-aw', 'Moo', 'Oink']],
    ['Anong tunog ng baka?', 'Moo', ['Meow', 'Aw-aw', 'Oink']],
    ['Anong tunog ng baboy?', 'Oink', ['Moo', 'Meow', 'Aw-aw']],
    ['Anong tunog ng manok?', 'Tilaok', ['Meow', 'Moo', 'Oink']],
    ['Anong tunog ng bibe?', 'Quack', ['Meow', 'Moo', 'Aw-aw']],
    ['Anong tunog ng kabayo?', 'Neigh', ['Quack', 'Meow', 'Moo']],
    ['Anong tunog ng tupa?', 'Baa', ['Neigh', 'Moo', 'Oink']],
    ['Anong tunog ng kuliglig?', 'Cri-cri', ['Moo', 'Meow', 'Quack']],
  ];
  sounds.forEach(([q, a, wrong]) => qs.push(makeQ(q, a, wrong)));
  const traits: [string, string, string[]][] = [
    ['Sino ang hari ng gubat?', 'Leon', ['Pusa', 'Kuting', 'Daga']],
    ['Anong hayop ang may mahabang leeg?', 'Giraffe', ['Aso', 'Pusa', 'Baka']],
    ['Anong hayop ang lumilipad?', 'Ibon', ['Isda', 'Baka', 'Aso']],
    ['Anong hayop ang lumalangoy sa tubig?', 'Isda', ['Aso', 'Pusa', 'Manok']],
    ['Anong hayop ang itim at puti at kumakain ng kawayan?', 'Panda', ['Zebra', 'Kabayo', 'Baka']],
    ['Anong hayop ang may puti at itim na guhit?', 'Zebra', ['Panda', 'Aso', 'Pusa']],
    ['Anong hayop ang malaki at may trumpet na ngipin?', 'Elepante', ['Pusa', 'Aso', 'Ibon']],
    ['Anong hayop ang mabagal at may bahay sa likod?', 'Pagong', ['Kabayo', 'Pusa', 'Aso']],
    ['Anong hayop ang mabilis tumakbo sa gubat?', 'Tigre', ['Pagong', 'Baka', 'Baboy']],
    ['Anong hayop ang kumakain ng karot?', 'Koneho', ['Aso', 'Pusa', 'Baka']],
    ['Anong hayop ang natutulog nang nakabitin sa puno?', 'Paniki', ['Aso', 'Pusa', 'Baka']],
    ['Anong hayop ang nagbibigay ng gatas?', 'Baka', ['Pusa', 'Ibon', 'Daga']],
    ['Anong hayop ang nagbibigay ng gatas at karne sa bahay?', 'Baka', ['Pusa', 'Ibon', 'Daga']],
    ['Anong hayop ang bantay sa bahay?', 'Aso', ['Pusa', 'Pagong', 'Ibon']],
  ];
  traits.forEach(([q, a, wrong]) => qs.push(makeQ(q, a, wrong)));
  return qs;
}

// --- Body / Weather / Days / Fruits / Transport / Nature --------------------

function bodyQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const tlNames = BODY_PARTS.map(b => b.tl);
  const bodyEnNames = BODY_PARTS.map(b => b.en);
  BODY_PARTS.forEach(b => {
    qs.push(makeQ(`Ano ang Tagalog ng "${b.en}"?`, b.tl, fourWrong(tlNames, b.tl)));
    qs.push(makeQ(`Ano ang Ingles ng "${b.tl}"?`, b.en, fourWrong(bodyEnNames, b.en)));
  });
  qs.push(makeQ('Ano ang gamit ng mata?', 'Makakita', ['Makarinig', 'Makaamoy', 'Kumain']));
  qs.push(makeQ('Ano ang gamit ng tainga?', 'Makarinig', ['Makakita', 'Makaamoy', 'Kumain']));
  qs.push(makeQ('Ano ang gamit ng ilong?', 'Makaamoy', ['Makarinig', 'Makakita', 'Kumain']));
  qs.push(makeQ('Ano ang gamit ng bibig?', 'Kumain', ['Makarinig', 'Makakita', 'Makaamoy']));
  qs.push(makeQ('Ano ang gamit ng kamay?', 'Hawakan', ['Makarinig', 'Makaamoy', 'Makakita']));
  return qs;
}

function weatherQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const tlNames = WEATHER.map(w => w.tl);
  WEATHER.forEach(w => {
    qs.push(makeQ(`Anong panahon ang ${w.emoji}?`, w.tl, fourWrong(tlNames, w.tl)));
  });
  qs.push(makeQ('Anong gamit kapag umuulan?', 'Payong', ['Sipilyo', 'Suklay', 'Unan']));
  qs.push(makeQ('Anong panahon kapag maliwanag ang araw?', 'Maaraw', ['Umuulan', 'Maulap', 'Mahangin']));
  qs.push(makeQ('Anong gamit sa paa kapag Umuulan?', 'Bota', ['Tsinelas', 'Sapatos na may takong', 'Nakapaa']));
  qs.push(makeQ('Anong damit ang ginagamit sa tag-ulan?', 'Raincoat', ['Sando', 'Shorts', 'Salopet']));
  qs.push(makeQ('Anong panahon ang mainit sa Pilipinas tuwing tag-init?', 'Maaraw', ['Umuulan', 'May Bagyo', 'Maulap']));
  qs.push(makeQ('Sa anong panahon naglalaro ng snow?', 'May Niyebe', ['Maaraw', 'Mahangin', 'Maaraw']));
  qs.push(makeQ('Anong bagay ang lumilitaw sa langit pag-umulan na?', 'Ulap', ['Araw', 'Buwan', 'Bituin']));
  return qs;
}

function daysQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const tlNames = DAYS.map(d => d.tl);
  DAYS.forEach((d, i) => {
    if (i < 6) {
      const nextD = DAYS[i + 1];
      qs.push(makeQ(`Anong araw ang kasunod ng ${d.tl}?`, nextD.tl, fourWrong(tlNames, nextD.tl)));
    }
    qs.push(makeQ(`Ano ang Tagalog ng "${d.en}"?`, d.tl, fourWrong(tlNames, d.tl)));
  });
  qs.push(makeQ('Ano ang unang araw ng pasukan (school)?', 'Lunes', ['Linggo', 'Sabado', 'Martes']));
  qs.push(makeQ('Anong araw ang sumusunod sa Sabado?', 'Linggo', ['Lunes', 'Martes', 'Biyernes']));
  qs.push(makeQ('Sa anong araw pahinga ang maraming pamilya?', 'Linggo', ['Lunes', 'Martes', 'Miyerkules']));
  return qs;
}

function fruitsQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const tlNames = FRUITS.map(f => f.tl);
  const enNames = FRUITS.map(f => f.en);
  FRUITS.forEach(f => {
    qs.push(makeQ(`Anong prutas ang ${f.emoji}?`, f.tl, fourWrong(tlNames, f.tl)));
    qs.push(makeQ(`Ano ang Ingles ng "${f.tl}"?`, f.en, fourWrong(enNames, f.en)));
  });
  qs.push(makeQ('Anong prutas ang paborito ng Pilipino sa tag-init?', 'Pakwan', ['Saging', 'Pinya', 'Ubas']));
  qs.push(makeQ('Anong prutas ang may matinik na balat?', 'Pinya', ['Saging', 'Mansanas', 'Ubas']));
  qs.push(makeQ('Anong prutas ang berde sa labas at pula sa loob?', 'Pakwan', ['Saging', 'Mansanas', 'Ubas']));
  qs.push(makeQ('Anong prutas ang mahaba at dilaw?', 'Saging', ['Mansanas', 'Ubas', 'Pakwan']));
  qs.push(makeQ('Anong prutas ang maliit at bilog na lila?', 'Ubas', ['Saging', 'Pakwan', 'Pinya']));
  return qs;
}

function transportQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const tlNames = TRANSPORT.map(v => v.tl);
  const enNames = TRANSPORT.map(v => v.en);
  TRANSPORT.forEach(v => {
    qs.push(makeQ(`Anong sasakyan ang ${v.emoji}?`, v.tl, fourWrong(tlNames, v.tl)));
    qs.push(makeQ(`Ano ang Ingles ng "${v.tl}"?`, v.en, fourWrong(enNames, v.en)));
  });
  qs.push(makeQ('Anong sasakyan ang lumilipad sa langit?', 'Eroplano', ['Bus', 'Bangka', 'Tricycle']));
  qs.push(makeQ('Anong sasakyan ang gumagamit ng riles (rail)?', 'Tren', ['Kotse', 'Jeepney', 'Bangka']));
  qs.push(makeQ('Anong sasakyan ang karaniwang sakayan sa Pilipinas na may 2 gulong sa harap?', 'Tricycle', ['Bus', 'Eroplano', 'Tren']));
  return qs;
}

function natureQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const tlNames = NATURE.map(n => n.tl);
  const enNames = NATURE.map(n => n.en);
  NATURE.forEach(n => {
    qs.push(makeQ(`Ano ang tawag sa ${n.emoji}?`, n.tl, fourWrong(tlNames, n.tl)));
    qs.push(makeQ(`Ano ang Ingles ng "${n.tl}"?`, n.en, fourWrong(enNames, n.en)));
  });
  qs.push(makeQ('Saan lumilitaw ang araw?', 'Silangan', ['Kanluran', 'Hilaga', 'Timog']));
  qs.push(makeQ('Saan lumulubog ang araw?', 'Kanluran', ['Silangan', 'Hilaga', 'Timog']));
  qs.push(makeQ('Ano ang pinagmumulan ng liwanag sa araw?', 'Araw', ['Buwan', 'Bituin', 'Ulap']));
  qs.push(makeQ('Saan nakatira ang mga isda?', 'Tubig', ['Kahon', 'Langit', 'Bulaklak']));
  qs.push(makeQ('Ano ang kailangan ng puno para lumaki?', 'Tubig', ['Kape', 'Gatas', 'Asin']));
  qs.push(makeQ('Saan tumutubo ang bulaklak?', 'Hardin', ['Bubong', 'Ilalim ng dagat', 'Sasakyan']));
  qs.push(makeQ('Ano ang tumutubo sa hardin at may amoy?', 'Bulaklak', ['Bato', 'Sasakyan', 'Bahay']));
  return qs;
}

const GENERATORS: Record<QuizCategory, () => QuizQuestion[]> = {
  Letters: letterQuestions,
  Numbers: numberQuestions,
  Colors: colorQuestions,
  Shapes: shapeQuestions,
  Animals: animalQuestions,
  Body: bodyQuestions,
  Weather: weatherQuestions,
  Days: daysQuestions,
  Fruits: fruitsQuestions,
  Transport: transportQuestions,
  Nature: natureQuestions,
};

let bankCache: QuizQuestion[] | null = null;

function buildBank(): QuizQuestion[] {
  if (bankCache) return bankCache;
  const bank: QuizQuestion[] = [];
  (Object.keys(GENERATORS) as QuizCategory[]).forEach(cat => {
    bank.push(...GENERATORS[cat]());
  });
  bankCache = bank;
  return bank;
}

export function getQuestionBankSize(): number {
  return buildBank().length;
}

/** Randomly pick `count` unique questions, shuffled. */
export function pickQuizQuestions(count: number): QuizQuestion[] {
  const bank = buildBank();
  const n = Math.min(count, bank.length);
  return shuffle(bank).slice(0, n);
}

/** Category-specific quiz for the Kinder video modal (10 questions). */
export function generateQuiz(video: { title: string; category: string }): QuizQuestion[] {
  const cat = video.category as QuizCategory;
  const gen = QUIZ_CATEGORIES.includes(cat) ? GENERATORS[cat] : null;
  if (gen) return shuffle(gen()).slice(0, 10);
  return pickQuizQuestions(10);
}
