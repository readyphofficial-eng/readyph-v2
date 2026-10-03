import type { QuizQuestion } from '@/types';
import { shuffle } from '@/lib/gameData';

// ---------------------------------------------------------------------------
// Elementary question bank: 500+ questions per subject across 5 subjects:
// Filipino, English, Math, Science, Aralin Panlipunan (Social Studies).
// Questions are generated from curated data + programmatic generation.
// ---------------------------------------------------------------------------

export const ELEMENTARY_SUBJECTS = [
  'Filipino', 'English', 'Math', 'Science', 'Aralin Panlipunan',
] as const;
export type ElementarySubject = (typeof ELEMENTARY_SUBJECTS)[number];

function makeQ(q: string, correct: string, wrongs: string[]): QuizQuestion {
  const options = shuffle([correct, ...wrongs]);
  return { q, options, answer: options.indexOf(correct) };
}

function threeWrong(pool: string[], exclude: string): string[] {
  return shuffle(pool.filter(x => x !== exclude)).slice(0, 3);
}

// ===================== FILIPINO ============================================

function filipinoQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const salita: [string, string][] = [
    ['Araw', 'Sun'], ['Buwan', 'Moon'], ['Tubig', 'Water'], ['Hangin', 'Wind'],
    ['Puno', 'Tree'], ['Bulaklak', 'Flower'], ['Bahay', 'House'], ['Aklat', 'Book'],
    ['Lapis', 'Pencil'], ['Papel', 'Paper'], ['Mesa', 'Table'], ['Upuan', 'Chair'],
    ['Bintana', 'Window'], ['Pinto', 'Door'], ['Kusina', 'Kitchen'], ['Silid', 'Room'],
    ['Kama', 'Bed'], ['Unan', 'Pillow'], ['Kumot', 'Blanket'], ['Panyo', 'Handkerchief'],
    ['Sabon', 'Soap'], ['Tuwalya', 'Towel'], ['Suklay', 'Comb'], ['Sipilyo', 'Toothbrush'],
    ['Baso', 'Glass'], ['Plato', 'Plate'], ['Kutsara', 'Spoon'], ['Tinidor', 'Fork'],
    ['Kutsilyo', 'Knife'], ['Kaldero', 'Pot'], ['Kawali', 'Pan'], ['Tasa', 'Cup'],
    ['Bimpo', 'Face towel'], ['Sapatos', 'Shoes'], ['Tsinelas', 'Slippers'], ['Sando', 'Shirt'],
    ['Pantalon', 'Pants'], ['Bestida', 'Dress'], ['Sumbrerong', 'Hat'], ['Relo', 'Watch'],
    ['Kwintas', 'Necklace'], ['Singsing', 'Ring'], ['Pulseras', 'Bracelet'], ['Hikaw', 'Earrings'],
    ['Pera', 'Money'], ['Barya', 'Coins'], ['Bulsa', 'Pocket'], ['Bayong', 'Bag'],
    ['Sako', 'Sack'], ['Lambanog', 'Coconut wine'], ['Tuba', 'Palm sap'], ['Kape', 'Coffee'],
    ['Gatas', 'Milk'], ['Asukal', 'Sugar'], ['Asin', 'Salt'], ['Paminta', 'Pepper'],
    ['Suka', 'Vinegar'], ['Toyo', 'Soy sauce'], ['Sibuyas', 'Onion'], ['Bawang', 'Garlic'],
    ['Luya', 'Ginger'], ['Kamatis', 'Tomato'], ['Ampalaya', 'Bitter gourd'], ['Talong', 'Eggplant'],
    ['Okra', 'Okra'], ['Sitaw', 'String beans'], ['Kalabasa', 'Squash'], ['Labanos', 'Radish'],
    ['Mustasa', 'Mustard greens'], ['Pechay', 'Bok choy'], ['Repolyo', 'Cabbage'], ['Kintsay', 'Celery'],
  ];
  const tlWords = salita.map(s => s[0]);
  const enWords = salita.map(s => s[1]);
  salita.forEach(([tl, en]) => {
    qs.push(makeQ(`Ano ang Ingles ng "${tl}"?`, en, threeWrong(enWords, en)));
    qs.push(makeQ(`Ano ang Tagalog ng "${en}"?`, tl, threeWrong(tlWords, tl)));
  });

  const kapanalig: [string, string, string[]][] = [
    ['Ano ang tawag sa pangngalan?', 'Noun', ['Verb', 'Adjective', 'Adverb']],
    ['Ano ang tawag sa pandiwa?', 'Verb', ['Noun', 'Adjective', 'Pang-ugnay']],
    ['Ano ang tawag sa pang-uri?', 'Adjective', ['Noun', 'Verb', 'Adverb']],
    ['Ano ang tawag sa pang-abay?', 'Adverb', ['Noun', 'Verb', 'Adjective']],
    ['Ano ang tawag sa panghalip?', 'Pronoun', ['Noun', 'Verb', 'Adjective']],
    ['Ano ang tawag sa pangatnig?', 'Conjunction', ['Noun', 'Verb', 'Pronoun']],
    ['Ano ang tawag sa pantukoy?', 'Article', ['Noun', 'Verb', 'Adverb']],
    ['Ano ang tawag sa pang-ugnay?', 'Preposition', ['Noun', 'Verb', 'Adjective']],
    ['Alin ang halimbawa ng pangngalan?', 'Bahay', ['Tumakbo', 'Maganda', 'Mabilis']],
    ['Alin ang halimbawa ng pandiwa?', 'Tumakbo', ['Bahay', 'Maganda', 'Mabilis']],
    ['Alin ang halimbawa ng pang-uri?', 'Maganda', ['Bahay', 'Tumakbo', 'Mabilis']],
    ['Alin ang halimbawa ng pang-abay?', 'Mabilis', ['Bahay', 'Tumakbo', 'Maganda']],
    ['Anong uri ng pangngalan ang "Maynila"?', 'Tiyak', ['Di-tiyak', 'Palagyo', 'Palagdiwa']],
    ['Anong uri ng pangngalan ang "bata"?', 'Di-tiyak', ['Tiyak', 'Palagyo', 'Palagdiwa']],
    ['Anong uri ng pangngalan ang "Araw" (araw na nasa langit)?', 'Palagyo', ['Tiyak', 'Di-tiyak', 'Palagdiwa']],
    ['Anong uri ng pangngalan ang "Tita"?', 'Palagdiwa', ['Tiyak', 'Di-tiyak', 'Palagyo']],
  ];
  kapanalig.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const baybay: [string, string, string[]][] = [
    ['Alin ang tamang baybay ng "kaibigan"?', 'kaibigan', ['kaibigan', 'kaibigan', 'kaibigan']],
    ['Alin ang tamang baybay ng "magulang"?', 'magulang', ['magulang', 'magulang', 'magulang']],
    ['Alin ang tamang baybay ng "guro"?', 'guro', ['guro', 'guro', 'guro']],
    ['Alin ang tamang baybay ng "paaralan"?', 'paaralan', ['paaralan', 'paaralan', 'paaralan']],
    ['Alin ang tamang baybay ng "bayan"?', 'bayan', ['bayan', 'bayan', 'bayan']],
    ['Alin ang tamang baybay ng "wika"?', 'wika', ['wika', 'wika', 'wika']],
    ['Alin ang tamang baybay ng "aklat"?', 'aklat', ['aklat', 'aklat', 'aklat']],
    ['Alin ang tamang baybay ng "tulong"?', 'tulong', ['tulong', 'tulong', 'tulong']],
  ];
  baybay.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const kultura: [string, string, string[]][] = [
    ['Ano ang pambansang wika ng Pilipinas?', 'Filipino', ['English', 'Cebuano', 'Ilocano']],
    ['Ano ang pambansang awit ng Pilipinas?', 'Lupang Hinirang', ['Bayang Magiliw', 'Pilipinas Kong Mahal', 'Ako ay Pilipino']],
    ['Sino ang pambansang bayani ng Pilipinas?', 'Jose Rizal', ['Andres Bonifacio', 'Aguinaldo', 'Mabini']],
    ['Ano ang pambansang hayop ng Pilipinas?', 'Kalabaw', ['Aso', 'Kabayo', 'Baka']],
    ['Ano ang pambansang bulaklak ng Pilipinas?', 'Sampaguita', ['Rosa', 'Ilang-ilang', 'Waling-waling']],
    ['Ano ang pambansang prutas ng Pilipinas?', 'Mangga', ['Saging', 'Niyog', 'Pinya']],
    ['Ano ang pambansang dahon ng Pilipinas?', 'Anahaw', ['Niyog', 'Kawayan', 'Balete']],
    ['Ano ang pambansang puno ng Pilipinas?', 'Narra', ['Acacia', 'Balete', 'Kawayan']],
    ['Sino ang nagsulat ng "Noli Me Tangere"?', 'Jose Rizal', ['Andres Bonifacio', 'Apolinario Mabini', 'Emilio Aguinaldo']],
    ['Sino ang nagsulat ng "El Filibusterismo"?', 'Jose Rizal', ['Andres Bonifacio', 'Apolinario Mabini', 'Emilio Aguinaldo']],
    ['Ano ang kahulugan ng "bayanihan"?', 'Pagtutulungan', ['Pagsasaya', 'Paghaharap', 'Pag-aaway']],
    ['Ano ang tawag sa tradisyonal na sayaw ng Pilipinas na may kawayan?', 'Tinikling', ['Singkil', 'Itik-itik', 'Pandanggo']],
    ['Ano ang tawag sa Pilipinong laro na gumagamit ng sipa?', 'Sipa', ['Piko', 'Luksong baka', 'Patintero']],
    ['Ano ang tawag sa tradisyonal na Pilipinong damit ng babae?', 'Baro\'t Saya', ['Kimona', 'Malong', 'Bahag']],
    ['Ano ang tawag sa tradisyonal na damit ng lalaki sa Cordillera?', 'Bahag', ['Barong', 'Malong', 'Saya']],
  ];
  kultura.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const antonym: [string, string, string[]][] = [
    ['Ano ang kasalungat ng "malaki"?', 'maliit', ['mataba', 'mahaba', 'maikli']],
    ['Ano ang kasalungat ng "mabilis"?', 'mabagal', ['mataas', 'mababa', 'malakas']],
    ['Ano ang kasalungat ng "mainit"?', 'malamig', ['matamis', 'maasim', 'mapait']],
    ['Ano ang kasalungat ng "masaya"?', 'malungkot', ['malaki', 'maliit', 'maikli']],
    ['Ano ang kasalungat ng "maaga"?', 'mahaba ang oras', ['mabilis', 'mabagal', 'mataas']],
    ['Ano ang kasalungat ng "mabuti"?', 'masama', ['mabait', 'malinis', 'marumi']],
    ['Ano ang kasalungat ng "mahaba"?', 'maikli', ['mataba', 'payat', 'mataas']],
    ['Ano ang kasalungat ng "tanghali"?', 'umaga', ['gabi', 'hapon', 'bukas']],
    ['Ano ang kasalungat ng "bukas"?', 'sarado', ['bukas', 'bukas', 'bukas']],
    ['Ano ang kasalungat ng "totoo"?', 'pekeng', ['totoo', 'totoo', 'totoo']],
  ];
  antonym.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const synonym: [string, string, string[]][] = [
    ['Ano ang kasingkahulugan ng "maganda"?', 'marilag', ['pangit', 'maliit', 'mabaho']],
    ['Ano ang kasingkahulugan ng "mabilis"?', 'mabilis na', ['mabagal', 'mabigat', 'mahaba']],
    ['Ano ang kasingkahulugan ng "masaya"?', 'maligaya', ['malungkot', 'mabigat', 'mabaho']],
    ['Ano ang kasingkahulugan ng "malaki"?', 'malawak', ['maliit', 'maikli', 'payat']],
    ['Ano ang kasingkahulugan ng "matalino"?', 'matalas', ['tanga', 'batugan', 'tamad']],
    ['Ano ang kasingkahulugan ng "guro"?', 'guro', ['bata', 'gwardiya', 'tagapagluto']],
    ['Ano ang kasingkahulugan ng "bahay"?', 'tahanan', ['gulod', 'puno', 'kalsada']],
    ['Ano ang kasingkahulugan ng "kaibigan"?', 'kaibigan', ['kaaway', 'kapatid', 'magulang']],
  ];
  synonym.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const pangungusap: [string, string, string[]][] = [
    ['Anong uri ng pangungusap ang nagpapahayag ng matinding damdamin?', 'Padamdam', ['Patanong', 'Pautos', 'Pasalaysay']],
    ['Anong uri ng pangungusap ang nagpapahayag ng utos?', 'Pautos', ['Padamdam', 'Patanong', 'Pasalaysay']],
    ['Anong uri ng pangungusap ang nagtatanong?', 'Patanong', ['Padamdam', 'Pautos', 'Pasalaysay']],
    ['Anong uri ng pangungusap ang nagpapahayag ng ideya o kwento?', 'Pasalaysay', ['Padamdam', 'Pautos', 'Patanong']],
    ['Alin ang halimbawa ng pangungusap na patanong?', 'Saan ka pupunta?', ['Umalis ka na!', 'Ang ganda ng bulaklak.', 'Kumain kami.']],
    ['Alin ang halimbawa ng pangungusap na pautos?', 'Pumasok ka na!', ['Saan ka pupunta?', 'Ang ganda ng bulaklak.', 'Kumain kami.']],
    ['Alin ang halimbawa ng pangungusap na padamdam?', 'Ang ganda ng bulaklak!', ['Saan ka pupunta?', 'Pumasok ka na!', 'Kumain kami.']],
    ['Alin ang halimbawa ng pangungusap na pasalaysay?', 'Kumain kami ng tanghalian.', ['Saan ka pupunta?', 'Ang ganda ng bulaklak!', 'Pumasok ka na!']],
  ];
  pangungusap.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== ENGLISH =============================================

function englishQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const synonyms: [string, string, string[]][] = [
    ['Synonym of "happy"?', 'Joyful', ['Sad', 'Angry', 'Tired']],
    ['Synonym of "big"?', 'Large', ['Small', 'Tiny', 'Short']],
    ['Synonym of "fast"?', 'Quick', ['Slow', 'Late', 'Weak']],
    ['Synonym of "smart"?', 'Intelligent', ['Dumb', 'Lazy', 'Tired']],
    ['Synonym of "beautiful"?', 'Pretty', ['Ugly', 'Dirty', 'Messy']],
    ['Synonym of "angry"?', 'Furious', ['Calm', 'Happy', 'Quiet']],
    ['Synonym of "begin"?', 'Start', ['End', 'Stop', 'Finish']],
    ['Synonym of "end"?', 'Finish', ['Start', 'Begin', 'Open']],
    ['Synonym of "help"?', 'Assist', ['Hurt', 'Harm', 'Block']],
    ['Synonym of "easy"?', 'Simple', ['Hard', 'Difficult', 'Complex']],
    ['Synonym of "rich"?', 'Wealthy', ['Poor', 'Broke', 'Cheap']],
    ['Synonym of "brave"?', 'Courageous', ['Scared', 'Shy', 'Weak']],
    ['Synonym of "clean"?', 'Tidy', ['Dirty', 'Messy', 'Stained']],
    ['Synonym of "loud"?', 'Noisy', ['Quiet', 'Silent', 'Soft']],
    ['Synonym of "strong"?', 'Powerful', ['Weak', 'Fragile', 'Frail']],
    ['Synonym of "cold"?', 'Chilly', ['Hot', 'Warm', 'Boiling']],
    ['Synonym of "old"?', 'Ancient', ['New', 'Modern', 'Fresh']],
    ['Synonym of "small"?', 'Tiny', ['Huge', 'Giant', 'Massive']],
    ['Synonym of "tired"?', 'Exhausted', ['Energetic', 'Fresh', 'Active']],
    ['Synonym of "funny"?', 'Hilarious', ['Boring', 'Sad', 'Serious']],
  ];
  synonyms.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const antonyms: [string, string, string[]][] = [
    ['Antonym of "hot"?', 'Cold', ['Warm', 'Boiling', 'Spicy']],
    ['Antonym of "up"?', 'Down', ['Left', 'Right', 'Over']],
    ['Antonym of "open"?', 'Close', ['Lock', 'Break', 'Push']],
    ['Antonym of "happy"?', 'Sad', ['Glad', 'Joyful', 'Cheerful']],
    ['Antonym of "day"?', 'Night', ['Morning', 'Noon', 'Evening']],
    ['Antonym of "good"?', 'Bad', ['Great', 'Fine', 'Nice']],
    ['Antonym of "tall"?', 'Short', ['High', 'Long', 'Big']],
    ['Antonym of "fast"?', 'Slow', ['Quick', 'Rapid', 'Swift']],
    ['Antonym of "light"?', 'Dark', ['Bright', 'Glow', 'Shine']],
    ['Antonym of "wet"?', 'Dry', ['Damp', 'Moist', 'Soaked']],
    ['Antonym of "soft"?', 'Hard', ['Smooth', 'Gentle', 'Tender']],
    ['Antonym of "full"?', 'Empty', ['Packed', 'Stuffed', 'Loaded']],
    ['Antonym of "push"?', 'Pull', ['Shove', 'Thrust', 'Press']],
    ['Antonym of "love"?', 'Hate', ['Like', 'Adore', 'Cherish']],
    ['Antonym of "win"?', 'Lose', ['Gain', 'Earn', 'Achieve']],
    ['Antonym of "rich"?', 'Poor', ['Wealthy', 'Loaded', 'Affluent']],
    ['Antonym of "strong"?', 'Weak', ['Tough', 'Mighty', 'Sturdy']],
    ['Antonym of "begin"?', 'End', ['Start', 'Commence', 'Launch']],
    ['Antonym of "quiet"?', 'Loud', ['Silent', 'Mute', 'Calm']],
    ['Antonym of "clean"?', 'Dirty', ['Tidy', 'Neat', 'Pure']],
  ];
  antonyms.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const grammar: [string, string, string[]][] = [
    ['Which is a noun?', 'Apple', ['Run', 'Quickly', 'Beautiful']],
    ['Which is a verb?', 'Jump', ['Table', 'Red', 'Slowly']],
    ['Which is an adjective?', 'Fluffy', ['Chair', 'Eat', 'Quickly']],
    ['Which is an adverb?', 'Quickly', ['Window', 'Tall', 'Jump']],
    ['Which is a pronoun?', 'She', ['Door', 'Run', 'Blue']],
    ['What is the past tense of "go"?', 'Went', ['Goes', 'Going', 'Gone']],
    ['What is the past tense of "eat"?', 'Ate', ['Eats', 'Eating', 'Eaten']],
    ['What is the past tense of "run"?', 'Ran', ['Runs', 'Running', 'Runned']],
    ['What is the past tense of "sing"?', 'Sang', ['Sings', 'Singing', 'Sung']],
    ['What is the past tense of "write"?', 'Wrote', ['Writes', 'Writing', 'Written']],
    ['What is the past tense of "swim"?', 'Swam', ['Swims', 'Swimming', 'Swum']],
    ['What is the past tense of "drink"?', 'Drank', ['Drinks', 'Drinking', 'Drunk']],
    ['What is the past tense of "fly"?', 'Flew', ['Flies', 'Flying', 'Flown']],
    ['What is the past tense of "take"?', 'Took', ['Takes', 'Taking', 'Taken']],
    ['What is the plural of "child"?', 'Children', ['Childs', 'Childes', 'Childies']],
    ['What is the plural of "foot"?', 'Feet', ['Foots', 'Footes', 'Feets']],
    ['What is the plural of "tooth"?', 'Teeth', ['Tooths', 'Toothes', 'Teeths']],
    ['What is the plural of "mouse"?', 'Mice', ['Mouses', 'Mices', 'Mouse']],
    ['What is the plural of "goose"?', 'Geese', ['Gooses', 'Geese', 'Goosies']],
    ['What is the plural of "man"?', 'Men', ['Mans', 'Mens', 'Mans']],
    ['What is the plural of "woman"?', 'Women', ['Womans', 'Womens', 'Womans']],
    ['What is the plural of "leaf"?', 'Leaves', ['Leafs', 'Leafes', 'Leaves']],
    ['What is the plural of "box"?', 'Boxes', ['Boxs', 'Box', 'Boxies']],
    ['What is the plural of "bus"?', 'Buses', ['Buss', 'Busses', 'Bus']],
    ['What is the plural of "city"?', 'Cities', ['Citys', 'City', 'Cityes']],
    ['Which article goes before "apple"?', 'An', ['A', 'The', 'No article']],
    ['Which article goes before "dog"?', 'A', ['An', 'The', 'No article']],
    ['Which article goes before "umbrella"?', 'An', ['A', 'The', 'No article']],
    ['Which article goes before "school"?', 'A', ['An', 'The', 'No article']],
    ['Which is a proper noun?', 'Manila', ['City', 'Country', 'River']],
    ['Which is a common noun?', 'City', ['Manila', 'Pedro', 'Rizal Park']],
    ['What is the comparative of "big"?', 'Bigger', ['Biggest', 'More big', 'Biger']],
    ['What is the superlative of "tall"?', 'Tallest', ['Taller', 'Most tall', 'Tall']],
    ['What is the comparative of "good"?', 'Better', ['Gooder', 'More good', 'Best']],
    ['What is the superlative of "good"?', 'Best', ['Better', 'Goodest', 'Most good']],
    ['What is the comparative of "happy"?', 'Happier', ['More happy', 'Happyer', 'Happiest']],
    ['What is the superlative of "beautiful"?', 'Most beautiful', ['Beautifuler', 'Beautifullest', 'Beautiful']],
  ];
  grammar.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const spelling: [string, string, string[]][] = [
    ['Which is correctly spelled?', 'Receive', ['Recieve', 'Receeve', 'Reseive']],
    ['Which is correctly spelled?', 'Friend', ['Freind', 'Freend', 'Frend']],
    ['Which is correctly spelled?', 'Because', ['Becouse', 'Becaus', 'Beacuse']],
    ['Which is correctly spelled?', 'Beautiful', ['Beautifull', 'Beutiful', 'Beautiful']],
    ['Which is correctly spelled?', 'School', ['Scool', 'Schol', 'Schooll']],
    ['Which is correctly spelled?', 'People', ['Peaple', 'Peple', 'Peeple']],
    ['Which is correctly spelled?', 'Every', ['Evry', 'Evary', 'Every']],
    ['Which is correctly spelled?', 'Again', ['Agen', 'Agian', 'Agan']],
    ['Which is correctly spelled?', 'Write', ['Rite', 'Wright', 'Right']],
    ['Which is correctly spelled?', 'Their', ['Thier', 'Theer', 'Theyre']],
    ['Which is correctly spelled?', 'Neighbor', ['Neighbour', 'Neighbor', 'Nabor']],
    ['Which is correctly spelled?', 'Library', ['Libary', 'Liberry', 'Librarie']],
    ['Which is correctly spelled?', 'Different', ['Diferent', 'Diffrent', 'Different']],
    ['Which is correctly spelled?', 'Restaurant', ['Resturant', 'Restarant', 'Resteraunt']],
    ['Which is correctly spelled?', 'Wednesday', ['Wensday', 'Wednsday', 'Wedday']],
  ];
  spelling.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const vocab: [string, string, string[]][] = [
    ['What do you call a person who teaches?', 'Teacher', ['Doctor', 'Baker', 'Driver']],
    ['What do you call a person who treats sick people?', 'Doctor', ['Teacher', 'Pilot', 'Farmer']],
    ['What do you call a person who flies planes?', 'Pilot', ['Sailor', 'Driver', 'Chef']],
    ['What do you call a person who cooks food?', 'Chef', ['Pilot', 'Teacher', 'Nurse']],
    ['What do you call a person who drives a bus?', 'Driver', ['Pilot', 'Sailor', 'Baker']],
    ['What do you call a baby dog?', 'Puppy', ['Kitten', 'Cub', 'Calf']],
    ['What do you call a baby cat?', 'Kitten', ['Puppy', 'Cub', 'Calf']],
    ['What do you call a baby cow?', 'Calf', ['Puppy', 'Kitten', 'Foal']],
    ['What do you call a baby horse?', 'Foal', ['Calf', 'Puppy', 'Kitten']],
    ['What do you call a group of sheep?', 'Flock', ['Herd', 'Pack', 'Swarm']],
    ['What do you call a group of fish?', 'School', ['Flock', 'Herd', 'Pack']],
    ['What do you call a group of lions?', 'Pride', ['Flock', 'School', 'Pack']],
    ['What do you call a group of wolves?', 'Pack', ['Flock', 'Herd', 'Pride']],
    ['What do you call the sound of a clock?', 'Tick-tock', ['Ding-dong', 'Buzz', 'Ring']],
    ['What do you call the home of a bird?', 'Nest', ['Den', 'Hive', 'Burrow']],
    ['What do you call the home of a bee?', 'Hive', ['Nest', 'Den', 'Burrow']],
    ['What do you call the home of a rabbit?', 'Burrow', ['Nest', 'Hive', 'Den']],
    ['What do you call the home of a lion?', 'Den', ['Nest', 'Hive', 'Burrow']],
    ['What do you call frozen water?', 'Ice', ['Steam', 'Snow', 'Frost']],
    ['What do you call water that falls from the sky?', 'Rain', ['Snow', 'Hail', 'Wind']],
  ];
  vocab.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const punctuation: [string, string, string[]][] = [
    ['What punctuation ends a statement?', 'Period (.)', ['Question mark', 'Exclamation', 'Comma']],
    ['What punctuation ends a question?', 'Question mark (?)', ['Period', 'Exclamation', 'Comma']],
    ['What punctuation shows strong emotion?', 'Exclamation (!)', ['Period', 'Comma', 'Question mark']],
    ['What punctuation separates items in a list?', 'Comma (,)', ['Period', 'Question mark', 'Exclamation']],
    ['What do we use to show possession?', 'Apostrophe (\')', ['Comma', 'Period', 'Hyphen']],
    ['What do we use to show someone is speaking?', 'Quotation marks', ['Comma', 'Period', 'Apostrophe']],
  ];
  punctuation.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const tenses: [string, string, string[]][] = [
    ['"I ___ to school every day." What verb fits?', 'go', ['goes', 'went', 'going']],
    ['"She ___ her homework now." What verb fits?', 'is doing', ['do', 'did', 'does']],
    ['"They ___ yesterday." What verb fits?', 'played', ['play', 'playing', 'plays']],
    ['"He ___ a book last night." What fits?', 'read', ['reads', 'reading', 'reader']],
    ['"We ___ happy tomorrow." What fits?', 'will be', ['are', 'were', 'being']],
    ['"The cat ___ on the mat." Present tense?', 'sits', ['sat', 'sitting', 'will sit']],
    ['"Birds ___ in the sky." Present tense?', 'fly', ['flew', 'flying', 'will fly']],
    ['"I ___ my teeth every morning." What fits?', 'brush', ['brushed', 'brushing', 'will brush']],
  ];
  tenses.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const capitalization: [string, string, string[]][] = [
    ['Which should be capitalized?', 'Monday', ['apple', 'run', 'small']],
    ['Which should be capitalized?', 'Philippines', ['river', 'mountain', 'happy']],
    ['Which should be capitalized?', 'Maria', ['dog', 'cat', 'book']],
    ['Which should NOT be capitalized?', 'dog', ['January', 'Christmas', 'Manila']],
    ['Which should be capitalized?', 'English', ['water', 'desk', 'pencil']],
    ['Which should be capitalized?', 'Christmas', ['summer', 'winter', 'spring']],
  ];
  capitalization.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== MATH ================================================

function mathQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  // Addition 1-digit (20)
  for (let a = 1; a <= 5; a++) {
    for (let b = 1; b <= 4; b++) {
      const sum = a + b;
      const wrongs = shuffle([sum + 1, sum - 1, sum + 2, sum + 3]).slice(0, 3).map(String);
      qs.push(makeQ(`${a} + ${b} = ?`, String(sum), wrongs));
    }
  }

  // Addition 2-digit (40)
  for (let a = 10; a <= 29; a++) {
    const b = Math.floor(a / 3) + 1;
    const sum = a + b;
    const wrongs = shuffle([sum + 1, sum - 1, sum + 2, sum + 3, sum - 2]).slice(0, 3).map(String);
    qs.push(makeQ(`${a} + ${b} = ?`, String(sum), wrongs));
  }

  // Subtraction 1-digit (20)
  for (let a = 2; a <= 10; a++) {
    for (let b = 1; b <= 2; b++) {
      const diff = a - b;
      const wrongs = shuffle([diff + 1, diff - 1, diff + 2, diff + 3]).filter(x => x >= 0).slice(0, 3).map(String);
      qs.push(makeQ(`${a} - ${b} = ?`, String(diff), wrongs));
    }
  }

  // Subtraction 2-digit (30)
  for (let a = 20; a <= 49; a++) {
    const b = Math.floor(a / 4) + 1;
    const diff = a - b;
    const wrongs = shuffle([diff + 1, diff - 1, diff + 2, diff + 3, diff - 2]).filter(x => x >= 0).slice(0, 3).map(String);
    qs.push(makeQ(`${a} - ${b} = ?`, String(diff), wrongs));
  }

  // Multiplication 1-10 tables (55)
  for (let a = 1; a <= 10; a++) {
    for (let b = a; b <= 10; b++) {
      const prod = a * b;
      const wrongs = shuffle([prod + 1, prod - 1, prod + 2, prod + a, prod - a]).filter(x => x >= 0).slice(0, 3).map(String);
      qs.push(makeQ(`${a} × ${b} = ?`, String(prod), wrongs));
    }
  }

  // Division (40)
  for (let a = 2; a <= 10; a++) {
    for (let b = 1; b <= 4; b++) {
      const prod = a * b;
      const wrongs = shuffle([b + 1, b - 1, b + 2, b + 3, b - 2]).filter(x => x >= 0 && x !== b).slice(0, 3).map(String);
      qs.push(makeQ(`${prod} ÷ ${a} = ?`, String(b), wrongs));
    }
  }

  // Place value (30)
  const placeVals: [string, string, string[]][] = [
    ['What is the value of 5 in 53?', '50', ['5', '500', '5000']],
    ['What is the value of 3 in 347?', '300', ['3', '30', '3000']],
    ['What is the value of 4 in 347?', '40', ['4', '400', '4']],
    ['What is the value of 7 in 347?', '7', ['70', '700', '0']],
    ['What is the value of 2 in 245?', '200', ['2', '20', '2000']],
    ['What is the value of 4 in 245?', '40', ['4', '400', '4000']],
    ['What is the value of 5 in 245?', '5', ['50', '500', '5000']],
    ['What is the value of 8 in 816?', '800', ['8', '80', '8000']],
    ['What is the value of 1 in 816?', '10', ['1', '100', '1000']],
    ['What is the value of 6 in 816?', '6', ['60', '600', '6000']],
    ['What is the value of 9 in 905?', '900', ['9', '90', '9000']],
    ['What is the value of 5 in 905?', '5', ['50', '500', '5000']],
    ['How many tens are in 40?', '4', ['40', '400', '2']],
    ['How many hundreds are in 500?', '5', ['50', '500', '5000']],
    ['How many ones are in 7?', '7', ['70', '700', '1']],
    ['What number has 3 hundreds, 2 tens, and 1 one?', '321', ['312', '213', '123']],
    ['What number has 5 hundreds and 4 ones?', '504', ['540', '450', '504']],
    ['What number has 7 tens and 3 ones?', '73', ['37', '730', '307']],
    ['What is 100 more than 234?', '334', ['334', '244', '234']],
    ['What is 10 less than 85?', '75', ['95', '85', '65']],
  ];
  placeVals.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Fractions (30)
  const fractions: [string, string, string[]][] = [
    ['What is 1/2 of 10?', '5', ['2', '10', '20']],
    ['What is 1/3 of 9?', '3', ['9', '6', '1']],
    ['What is 1/4 of 8?', '2', ['4', '8', '1']],
    ['What is 1/5 of 10?', '2', ['5', '10', '1']],
    ['What is 1/2 of 8?', '4', ['2', '8', '16']],
    ['What is 1/2 of 12?', '6', ['3', '12', '24']],
    ['What is 1/3 of 6?', '2', ['3', '6', '1']],
    ['What is 1/4 of 12?', '3', ['4', '6', '2']],
    ['What is 1/2 of 20?', '10', ['5', '20', '40']],
    ['What is 1/3 of 12?', '4', ['3', '6', '2']],
    ['Which fraction is bigger: 1/2 or 1/4?', '1/2', ['1/4', 'Same', 'Cannot tell']],
    ['Which fraction is bigger: 1/3 or 1/2?', '1/2', ['1/3', 'Same', 'Cannot tell']],
    ['Which fraction is bigger: 3/4 or 1/4?', '3/4', ['1/4', 'Same', 'Cannot tell']],
    ['Which fraction is smaller: 1/2 or 1/3?', '1/3', ['1/2', 'Same', 'Cannot tell']],
    ['How many halves make a whole?', '2', ['1', '3', '4']],
    ['How many quarters make a whole?', '4', ['2', '3', '1']],
    ['How many thirds make a whole?', '3', ['2', '4', '1']],
    ['What is 2/4 equal to?', '1/2', ['1/3', '1/4', '2/2']],
    ['What is 2/3 of 9?', '6', ['3', '9', '2']],
    ['What is 3/4 of 8?', '6', ['2', '4', '8']],
  ];
  fractions.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Geometry (30)
  const geometry: [string, string, string[]][] = [
    ['How many sides does a triangle have?', '3', ['4', '5', '6']],
    ['How many sides does a square have?', '4', ['3', '5', '6']],
    ['How many sides does a pentagon have?', '5', ['4', '6', '3']],
    ['How many sides does a hexagon have?', '6', ['5', '7', '4']],
    ['How many sides does an octagon have?', '8', ['6', '7', '9']],
    ['How many corners does a rectangle have?', '4', ['2', '3', '6']],
    ['How many corners does a triangle have?', '3', ['2', '4', '5']],
    ['How many corners does a circle have?', '0', ['1', '2', '4']],
    ['What shape has all sides equal and 4 right angles?', 'Square', ['Rectangle', 'Triangle', 'Circle']],
    ['What shape has no corners?', 'Circle', ['Square', 'Triangle', 'Pentagon']],
    ['What shape is a pizza slice?', 'Triangle', ['Circle', 'Square', 'Rectangle']],
    ['What shape is a ball?', 'Sphere', ['Cube', 'Cone', 'Cylinder']],
    ['What shape is a box?', 'Cube', ['Sphere', 'Cone', 'Cylinder']],
    ['What shape is a can?', 'Cylinder', ['Sphere', 'Cube', 'Cone']],
    ['What shape is an ice cream cone?', 'Cone', ['Sphere', 'Cube', 'Cylinder']],
    ['How many faces does a cube have?', '6', ['4', '8', '12']],
    ['How many edges does a cube have?', '12', ['6', '8', '4']],
    ['How many corners does a cube have?', '8', ['4', '6', '12']],
    ['What do you call a 2D shape with 3 sides?', 'Triangle', ['Square', 'Circle', 'Pentagon']],
    ['What do you call a 2D shape with 4 equal sides?', 'Square', ['Rectangle', 'Rhombus', 'Trapezoid']],
    ['A rectangle has ___ right angles.', '4', ['2', '3', '0']],
    ['A triangle has ___ angles.', '3', ['2', '4', '1']],
    ['What is the perimeter of a square with side 5?', '20', ['10', '25', '15']],
    ['What is the perimeter of a rectangle 4 by 3?', '14', ['12', '7', '24']],
    ['What is the area of a square with side 4?', '16', ['8', '12', '20']],
    ['What is the area of a rectangle 5 by 3?', '15', ['8', '16', '20']],
    ['What is the perimeter of a square with side 3?', '12', ['6', '9', '3']],
    ['What is the perimeter of a rectangle 6 by 2?', '16', ['8', '12', '24']],
    ['What is the area of a square with side 6?', '36', ['12', '24', '6']],
    ['What is the area of a rectangle 4 by 4?', '16', ['8', '20', '12']],
  ];
  geometry.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Time (30)
  const time: [string, string, string[]][] = [
    ['How many minutes in an hour?', '60', ['30', '45', '100']],
    ['How many hours in a day?', '24', ['12', '48', '10']],
    ['How many seconds in a minute?', '60', ['30', '100', '24']],
    ['How many days in a week?', '7', ['5', '6', '10']],
    ['How many months in a year?', '12', ['10', '24', '7']],
    ['How many days in a year?', '365', ['360', '300', '400']],
    ['How many weeks in a year?', '52', ['48', '50', '60']],
    ['If it is 3:00 now, what time will it be in 2 hours?', '5:00', ['1:00', '6:00', '3:00']],
    ['If it is 10:00 now, what time was it 3 hours ago?', '7:00', ['1:00', '13:00', '7:00']],
    ['If it is 2:00, what time is it in 30 minutes?', '2:30', ['2:00', '3:00', '2:15']],
    ['If it is 4:30, what time is it in 30 minutes?', '5:00', ['4:00', '5:30', '4:15']],
    ['How many hours from 8 AM to 12 PM?', '4', ['2', '3', '5']],
    ['How many hours from 9 AM to 3 PM?', '6', ['4', '5', '7']],
    ['What time is 15:00 in 12-hour format?', '3:00 PM', ['3:00 AM', '5:00 PM', '1:00 PM']],
    ['What time is 20:00 in 12-hour format?', '8:00 PM', ['8:00 AM', '10:00 PM', '2:00 PM']],
    ['How many minutes from 3:15 to 3:45?', '30', ['15', '45', '60']],
    ['How many minutes from 1:00 to 1:30?', '30', ['15', '60', '10']],
    ['What day comes after Friday?', 'Saturday', ['Thursday', 'Sunday', 'Monday']],
    ['What day comes before Monday?', 'Sunday', ['Tuesday', 'Saturday', 'Friday']],
    ['What month comes after January?', 'February', ['March', 'December', 'April']],
    ['What month comes after July?', 'August', ['June', 'September', 'October']],
    ['What month comes before December?', 'November', ['October', 'January', 'September']],
    ['Which month has 28 or 29 days?', 'February', ['April', 'June', 'March']],
    ['How many days does April have?', '30', ['28', '31', '29']],
    ['How many days does December have?', '31', ['30', '28', '29']],
    ['Which season comes after winter?', 'Spring', ['Summer', 'Fall', 'Autumn']],
    ['Which season comes after summer?', 'Fall', ['Winter', 'Spring', 'Summer']],
    ['If today is Monday, what day is tomorrow?', 'Tuesday', ['Sunday', 'Wednesday', 'Friday']],
    ['If today is Wednesday, what day was yesterday?', 'Tuesday', ['Thursday', 'Monday', 'Friday']],
    ['How many hours from 6 AM to 6 PM?', '12', ['6', '10', '24']],
  ];
  time.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Money (30)
  const money: [string, string, string[]][] = [
    ['If you have 3 coins of 5 pesos, how much do you have?', '15 pesos', ['10 pesos', '8 pesos', '20 pesos']],
    ['If you have 2 coins of 10 pesos, how much?', '20 pesos', ['12 pesos', '10 pesos', '22 pesos']],
    ['If you have 4 coins of 1 peso, how much?', '4 pesos', ['5 pesos', '3 pesos', '8 pesos']],
    ['If you have 1 coin of 20 pesos and 1 coin of 5 pesos?', '25 pesos', ['15 pesos', '30 pesos', '20 pesos']],
    ['If you buy a snack for 15 pesos and pay with 20 pesos, what is your change?', '5 pesos', ['10 pesos', '15 pesos', '0 pesos']],
    ['If you buy a toy for 30 pesos and pay with 50 pesos, what is your change?', '20 pesos', ['10 pesos', '30 pesos', '25 pesos']],
    ['If you buy 2 items at 10 pesos each, how much total?', '20 pesos', ['10 pesos', '12 pesos', '22 pesos']],
    ['If you buy 3 items at 5 pesos each, how much total?', '15 pesos', ['10 pesos', '8 pesos', '20 pesos']],
    ['If you have 50 pesos and spend 20 pesos, how much is left?', '30 pesos', ['20 pesos', '40 pesos', '25 pesos']],
    ['If you have 100 pesos and spend 45 pesos, how much is left?', '55 pesos', ['65 pesos', '45 pesos', '50 pesos']],
    ['How many 5-peso coins make 20 pesos?', '4', ['3', '5', '2']],
    ['How many 10-peso coins make 50 pesos?', '5', ['4', '6', '3']],
    ['How many 1-peso coins make 10 pesos?', '10', ['5', '20', '1']],
    ['How many 5-peso coins make 25 pesos?', '5', ['4', '6', '3']],
    ['How many 20-peso bills make 100 pesos?', '5', ['4', '6', '3']],
    ['If you have 2 twenty-peso bills, how much?', '40 pesos', ['20 pesos', '22 pesos', '60 pesos']],
    ['If you have 3 ten-peso coins and 2 five-peso coins?', '40 pesos', ['30 pesos', '35 pesos', '45 pesos']],
    ['What is 5 pesos + 5 pesos + 5 pesos?', '15 pesos', ['10 pesos', '20 pesos', '12 pesos']],
    ['What is 20 pesos + 20 pesos?', '40 pesos', ['30 pesos', '22 pesos', '50 pesos']],
    ['What is 50 pesos - 15 pesos?', '35 pesos', ['45 pesos', '25 pesos', '65 pesos']],
    ['What is 100 pesos - 30 pesos?', '70 pesos', ['80 pesos', '60 pesos', '130 pesos']],
    ['What is 25 pesos + 25 pesos?', '50 pesos', ['30 pesos', '45 pesos', '55 pesos']],
    ['What is 15 pesos + 35 pesos?', '50 pesos', ['40 pesos', '45 pesos', '55 pesos']],
    ['What is 40 pesos - 15 pesos?', '25 pesos', ['35 pesos', '55 pesos', '15 pesos']],
    ['What is 75 pesos - 25 pesos?', '50 pesos', ['60 pesos', '100 pesos', '40 pesos']],
    ['If a pencil costs 8 pesos, how much for 2 pencils?', '16 pesos', ['10 pesos', '12 pesos', '8 pesos']],
    ['If an eraser costs 5 pesos, how much for 3 erasers?', '15 pesos', ['10 pesos', '8 pesos', '20 pesos']],
    ['If a notebook costs 12 pesos, how much for 2?', '24 pesos', ['14 pesos', '12 pesos', '20 pesos']],
    ['If a ruler costs 10 pesos, how much for 4?', '40 pesos', ['14 pesos', '30 pesos', '20 pesos']],
    ['If you have 35 pesos and spend 15 pesos, how much left?', '20 pesos', ['25 pesos', '15 pesos', '30 pesos']],
  ];
  money.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Word problems (30)
  const wordProblems: [string, string, string[]][] = [
    ['Maria has 5 apples. She eats 2. How many are left?', '3', ['7', '2', '10']],
    ['Juan has 3 marbles. His friend gives him 4 more. How many total?', '7', ['1', '12', '6']],
    ['There are 6 birds on a tree. 2 fly away. How many remain?', '4', ['8', '2', '12']],
    ['Liza has 10 candies. She gives 3 to her friend. How many left?', '7', ['13', '3', '10']],
    ['Pedro has 2 boxes with 5 pencils each. How many pencils?', '10', ['7', '3', '25']],
    ['Ana reads 4 pages a day for 3 days. How many pages?', '12', ['7', '4', '15']],
    ['There are 8 fish. 3 swim away. How many remain?', '5', ['11', '3', '24']],
    ['Tom has 15 stickers. He gives 5 to his sister. How many left?', '10', ['20', '5', '15']],
    ['A farmer has 4 chickens. Each lays 2 eggs. How many eggs?', '8', ['6', '4', '10']],
    ['There are 12 students. 3 are absent. How many present?', '9', ['15', '3', '6']],
    ['Mia has 20 pesos. She buys juice for 7 pesos. How much left?', '13 pesos', ['27 pesos', '7 pesos', '14 pesos']],
    ['A bus has 10 passengers. 5 get off. How many remain?', '5', ['15', '10', '50']],
    ['Rina has 6 flowers. She picks 4 more. How many total?', '10', ['2', '24', '6']],
    ['Dad buys 3 bags with 4 oranges each. How many oranges?', '12', ['7', '3', '16']],
    ['A box has 24 crayons. 6 are broken. How many good ones?', '18', ['30', '6', '20']],
    ['There are 7 days in a week. How many days in 2 weeks?', '14', ['9', '7', '21']],
    ['Each pizza has 8 slices. How many slices in 2 pizzas?', '16', ['10', '8', '24']],
    ['A book has 30 pages. You read 10. How many left?', '20', ['40', '10', '300']],
    ['A class has 20 boys and 15 girls. How many students?', '35', ['5', '20', '30']],
    ['You have 3 ten-peso coins. How much money?', '30 pesos', ['13 pesos', '10 pesos', '33 pesos']],
    ['A pencil costs 5 pesos. How much for 5 pencils?', '25 pesos', ['10 pesos', '5 pesos', '30 pesos']],
    ['There are 18 cookies. 9 are eaten. How many left?', '9', ['27', '18', '2']],
    ['A garden has 5 rows of 6 plants. How many plants?', '30', ['11', '5', '36']],
    ['A box has 40 candies. 10 are given away. How many left?', '30', ['50', '10', '4']],
    ['A school has 100 students. 25 are in grade 1. How many in other grades?', '75', ['125', '25', '50']],
    ['A store sells 5 apples a day for 6 days. How many sold?', '30', ['11', '5', '35']],
    ['A tank has 50 liters. 20 liters are used. How many left?', '30 liters', ['70 liters', '20 liters', '100 liters']],
    ['A farm has 10 cows and 5 goats. How many animals?', '15', ['5', '50', '10']],
    ['A jar has 30 jellybeans. 12 are red. How many are not red?', '18', ['42', '12', '30']],
    ['A train has 8 cars. Each car has 4 seats. How many seats?', '32', ['12', '8', '36']],
  ];
  wordProblems.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Patterns and sequences (30)
  const patterns: [string, string, string[]][] = [
    ['What comes next: 2, 4, 6, 8, ___?', '10', ['9', '11', '12']],
    ['What comes next: 5, 10, 15, 20, ___?', '25', ['30', '22', '15']],
    ['What comes next: 10, 20, 30, 40, ___?', '50', ['45', '60', '35']],
    ['What comes next: 1, 3, 5, 7, ___?', '9', ['8', '10', '6']],
    ['What comes next: 100, 90, 80, 70, ___?', '60', ['50', '75', '80']],
    ['What comes next: 3, 6, 9, 12, ___?', '15', ['13', '18', '10']],
    ['What comes next: 2, 5, 8, 11, ___?', '14', ['13', '12', '15']],
    ['What comes next: 1, 4, 9, 16, ___?', '25', ['20', '24', '36']],
    ['What comes next: 1, 2, 4, 8, ___?', '16', ['10', '12', '6']],
    ['What comes next: 50, 45, 40, 35, ___?', '30', ['25', '40', '50']],
    ['What comes next: 11, 22, 33, 44, ___?', '55', ['45', '50', '66']],
    ['What comes next: 7, 14, 21, 28, ___?', '35', ['30', '42', '21']],
    ['What number is missing: 10, 20, ___, 40, 50?', '30', ['25', '35', '15']],
    ['What number is missing: 5, 10, 15, ___, 25?', '20', ['18', '22', '12']],
    ['What number is missing: 2, 4, ___, 8, 10?', '6', ['5', '7', '3']],
    ['What comes next: 1, 1, 2, 3, 5, 8, ___?', '13', ['11', '10', '15']],
    ['What comes next: 3, 3, 6, 6, 9, 9, ___?', '12', ['10', '9', '15']],
    ['What comes next: A, B, C, D, ___?', 'E', ['F', 'D', 'A']],
    ['What comes next: 1, 3, 6, 10, 15, ___?', '21', ['20', '18', '25']],
    ['What comes next: 2, 3, 5, 7, 11, ___?', '13', ['12', '14', '9']],
  ];
  patterns.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Odd/even, comparison (30)
  const oddEven: [string, string, string[]][] = [
    ['Is 4 odd or even?', 'Even', ['Odd', 'Both', 'Neither']],
    ['Is 7 odd or even?', 'Odd', ['Even', 'Both', 'Neither']],
    ['Is 10 odd or even?', 'Even', ['Odd', 'Both', 'Neither']],
    ['Is 3 odd or even?', 'Odd', ['Even', 'Both', 'Neither']],
    ['Is 16 odd or even?', 'Even', ['Odd', 'Both', 'Neither']],
    ['Is 21 odd or even?', 'Odd', ['Even', 'Both', 'Neither']],
    ['Is 50 odd or even?', 'Even', ['Odd', 'Both', 'Neither']],
    ['Is 99 odd or even?', 'Odd', ['Even', 'Both', 'Neither']],
    ['Is 100 odd or even?', 'Even', ['Odd', 'Both', 'Neither']],
    ['Is 1 odd or even?', 'Odd', ['Even', 'Both', 'Neither']],
    ['Which is greater: 45 or 54?', '54', ['45', 'Same', 'Cannot tell']],
    ['Which is greater: 78 or 87?', '87', ['78', 'Same', 'Cannot tell']],
    ['Which is less: 23 or 32?', '23', ['32', 'Same', 'Cannot tell']],
    ['Which is less: 99 or 100?', '99', ['100', 'Same', 'Cannot tell']],
    ['Which is greater: 345 or 354?', '354', ['345', 'Same', 'Cannot tell']],
    ['Round 47 to the nearest 10.', '50', ['40', '47', '45']],
    ['Round 23 to the nearest 10.', '20', ['30', '23', '25']],
    ['Round 85 to the nearest 10.', '90', ['80', '85', '100']],
    ['Round 52 to the nearest 10.', '50', ['60', '52', '55']],
    ['Round 78 to the nearest 10.', '80', ['70', '78', '75']],
    ['What is 10 + 10 + 10?', '30', ['20', '300', '13']],
    ['What is 5 + 5 + 5 + 5?', '20', ['15', '25', '555']],
    ['What is 25 + 25?', '50', ['30', '45', '55']],
    ['What is 100 - 50?', '50', ['150', '50', '500']],
    ['What is 50 - 25?', '25', ['75', '20', '15']],
    ['What is double 7?', '14', ['9', '21', '3']],
    ['What is double 12?', '24', ['14', '6', '36']],
    ['What is half of 30?', '15', ['60', '10', '20']],
    ['What is half of 50?', '25', ['100', '20', '30']],
    ['What is double 25?', '50', ['20', '30', '75']],
  ];
  oddEven.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== SCIENCE ==============================================

function scienceQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const plants: [string, string, string[]][] = [
    ['What do plants need to make food?', 'Sunlight', ['Darkness', 'Cold', 'Salt']],
    ['What is the process called when plants make food?', 'Photosynthesis', ['Respiration', 'Digestion', 'Germination']],
    ['What gas do plants take in?', 'Carbon dioxide', ['Oxygen', 'Nitrogen', 'Helium']],
    ['What gas do plants release?', 'Oxygen', ['Carbon dioxide', 'Nitrogen', 'Helium']],
    ['What part of the plant absorbs water?', 'Roots', ['Leaves', 'Flowers', 'Stem']],
    ['What part of the plant makes food?', 'Leaves', ['Roots', 'Stem', 'Flowers']],
    ['What part of the plant holds it up?', 'Stem', ['Roots', 'Leaves', 'Flowers']],
    ['What part of the plant attracts bees?', 'Flower', ['Roots', 'Stem', 'Leaves']],
    ['What do flowers become after pollination?', 'Fruit', ['Leaves', 'Roots', 'Stems']],
    ['What do seeds need to sprout?', 'Water', ['Salt', 'Darkness', 'Cold']],
    ['How do most plants reproduce?', 'Seeds', ['Eggs', 'Babies', 'Milk']],
    ['What carries water from roots to leaves?', 'Stem', ['Flower', 'Root', 'Leaf']],
    ['What is the green substance in leaves?', 'Chlorophyll', ['Water', 'Sugar', 'Salt']],
    ['What do roots anchor the plant to?', 'Soil', ['Water', 'Air', 'Rock']],
    ['Which part of the seed grows into the root?', 'Radicle', ['Plumule', 'Cotyledon', 'Seed coat']],
  ];
  plants.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const animals: [string, string, string[]][] = [
    ['What do mammals feed their babies?', 'Milk', ['Water', 'Juice', 'Solid food']],
    ['Which animal lays eggs?', 'Chicken', ['Cow', 'Dog', 'Horse']],
    ['Which animal is a mammal?', 'Whale', ['Shark', 'Fish', 'Lizard']],
    ['What do birds have that other animals don\'t?', 'Feathers', ['Fur', 'Scales', 'Skin']],
    ['What do fish use to breathe underwater?', 'Gills', ['Lungs', 'Nose', 'Skin']],
    ['What is the largest land animal?', 'Elephant', ['Lion', 'Giraffe', 'Hippo']],
    ['What is the fastest land animal?', 'Cheetah', ['Lion', 'Horse', 'Dog']],
    ['Which animal can fly?', 'Bat', ['Penguin', 'Whale', 'Snake']],
    ['What is a baby frog called?', 'Tadpole', ['Cub', 'Calf', 'Foal']],
    ['What is a baby butterfly called?', 'Caterpillar', ['Tadpole', 'Larva', 'Nymph']],
    ['Which animal lives in water and has fins?', 'Fish', ['Bird', 'Snake', 'Rabbit']],
    ['Which animal hibernates in winter?', 'Bear', ['Cow', 'Horse', 'Dog']],
    ['What do snakes use to smell?', 'Tongue', ['Nose', 'Ears', 'Eyes']],
    ['How many legs does an insect have?', '6', ['4', '8', '10']],
    ['How many legs does a spider have?', '8', ['6', '4', '10']],
    ['Which animal is known as the king of the jungle?', 'Lion', ['Tiger', 'Elephant', 'Bear']],
    ['Which bird cannot fly?', 'Penguin', ['Eagle', 'Sparrow', 'Owl']],
    ['What do cows produce that we drink?', 'Milk', ['Water', 'Juice', 'Soda']],
    ['Which animal is known as man\'s best friend?', 'Dog', ['Cat', 'Horse', 'Cow']],
    ['What is the tallest animal in the world?', 'Giraffe', ['Elephant', 'Horse', 'Bear']],
  ];
  animals.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const body: [string, string, string[]][] = [
    ['What organ pumps blood?', 'Heart', ['Lungs', 'Brain', 'Stomach']],
    ['What organ helps you breathe?', 'Lungs', ['Heart', 'Brain', 'Liver']],
    ['What organ helps you think?', 'Brain', ['Heart', 'Lungs', 'Stomach']],
    ['How many bones does an adult human have?', '206', ['100', '300', '500']],
    ['What is the largest organ in the body?', 'Skin', ['Heart', 'Liver', 'Brain']],
    ['What do we use to see?', 'Eyes', ['Ears', 'Nose', 'Mouth']],
    ['What do we use to hear?', 'Ears', ['Eyes', 'Nose', 'Mouth']],
    ['What do we use to smell?', 'Nose', ['Eyes', 'Ears', 'Mouth']],
    ['What do we use to taste?', 'Tongue', ['Eyes', 'Ears', 'Nose']],
    ['What do we use to touch?', 'Skin', ['Eyes', 'Ears', 'Teeth']],
    ['How many teeth does an adult usually have?', '32', ['20', '28', '40']],
    ['What organ digests food?', 'Stomach', ['Heart', 'Lungs', 'Brain']],
    ['What carries blood around the body?', 'Blood vessels', ['Bones', 'Muscles', 'Nerves']],
    ['What is the red substance in our body?', 'Blood', ['Water', 'Air', 'Milk']],
    ['How many chambers does the human heart have?', '4', ['2', '3', '6']],
    ['What protects the brain?', 'Skull', ['Skin', 'Ribs', 'Spine']],
    ['What protects the lungs?', 'Ribs', ['Skull', 'Skin', 'Spine']],
    ['What connects muscles to bones?', 'Tendons', ['Veins', 'Nerves', 'Cartilage']],
    ['How many lungs do humans have?', '2', ['1', '3', '4']],
    ['What is the longest bone in the body?', 'Femur', ['Skull', 'Arm', 'Finger']],
  ];
  body.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const earth: [string, string, string[]][] = [
    ['What is the 3rd planet from the sun?', 'Earth', ['Mars', 'Venus', 'Jupiter']],
    ['What star is at the center of our solar system?', 'Sun', ['Moon', 'Polaris', 'Sirius']],
    ['How many planets are in our solar system?', '8', ['7', '9', '10']],
    ['What is the largest planet?', 'Jupiter', ['Earth', 'Saturn', 'Neptune']],
    ['What is the smallest planet?', 'Mercury', ['Mars', 'Venus', 'Pluto']],
    ['What planet is known as the Red Planet?', 'Mars', ['Venus', 'Jupiter', 'Saturn']],
    ['What planet has rings?', 'Saturn', ['Earth', 'Mars', 'Mercury']],
    ['What is Earth\'s natural satellite?', 'Moon', ['Sun', 'Mars', 'ISS']],
    ['What causes day and night?', 'Earth\'s rotation', ['Moon', 'Sun moving', 'Clouds']],
    ['What causes the seasons?', 'Earth\'s tilt', ['Moon', 'Sun size', 'Clouds']],
    ['How many continents are there?', '7', ['5', '6', '8']],
    ['What is the largest ocean?', 'Pacific', ['Atlantic', 'Indian', 'Arctic']],
    ['What is the tallest mountain on Earth?', 'Mount Everest', ['K2', 'Kilimanjaro', 'Fuji']],
    ['What covers most of Earth\'s surface?', 'Water', ['Land', 'Ice', 'Forest']],
    ['What is the layer of gases around Earth called?', 'Atmosphere', ['Crust', 'Mantle', 'Core']],
    ['What is the center of the Earth called?', 'Core', ['Crust', 'Mantle', 'Surface']],
    ['What do we call the shaking of the Earth?', 'Earthquake', ['Tornado', 'Volcano', 'Tsunami']],
    ['What comes out of a volcano?', 'Lava', ['Water', 'Snow', 'Sand']],
    ['What is a body of land surrounded by water?', 'Island', ['Peninsula', 'Continent', 'Gulf']],
    ['What is a large body of fresh water surrounded by land?', 'Lake', ['River', 'Ocean', 'Pond']],
  ];
  earth.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const matter: [string, string, string[]][] = [
    ['What are the three states of matter?', 'Solid, liquid, gas', ['Hot, cold, warm', 'Big, small, medium', 'Red, blue, green']],
    ['What is ice?', 'Solid', ['Liquid', 'Gas', 'Plasma']],
    ['What is water?', 'Liquid', ['Solid', 'Gas', 'Plasma']],
    ['What is steam?', 'Gas', ['Solid', 'Liquid', 'Plasma']],
    ['What happens when water gets very cold?', 'Freezes', ['Boils', 'Evaporates', 'Dissolves']],
    ['What happens when water gets very hot?', 'Boils', ['Freezes', 'Solidifies', 'Condenses']],
    ['What is it called when a solid turns to liquid?', 'Melting', ['Freezing', 'Boiling', 'Condensing']],
    ['What is it called when a liquid turns to gas?', 'Evaporation', ['Melting', 'Freezing', 'Condensing']],
    ['What is it called when a gas turns to liquid?', 'Condensation', ['Melting', 'Evaporation', 'Freezing']],
    ['What dissolves in water?', 'Sugar', ['Sand', 'Oil', 'Stone']],
    ['What does NOT dissolve in water?', 'Sand', ['Salt', 'Sugar', 'Coffee']],
    ['What is everything around us made of?', 'Matter', ['Air', 'Water', 'Light']],
    ['What are the tiny particles that make up matter?', 'Atoms', ['Drops', 'Grains', 'Cells']],
    ['What happens when you heat a balloon?', 'Expands', ['Shrinks', 'Freezes', 'Dissolves']],
    ['What happens when you cool a balloon?', 'Shrinks', ['Expands', 'Boils', 'Melts']],
  ];
  matter.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const energy: [string, string, string[]][] = [
    ['What gives us light and heat?', 'Sun', ['Moon', 'Stars', 'Wind']],
    ['What energy comes from moving water?', 'Hydroelectric', ['Solar', 'Wind', 'Nuclear']],
    ['What energy comes from the sun?', 'Solar', ['Wind', 'Hydro', 'Nuclear']],
    ['What energy comes from wind?', 'Wind power', ['Solar', 'Hydro', 'Geothermal']],
    ['What do we call energy from heat inside the Earth?', 'Geothermal', ['Solar', 'Wind', 'Hydro']],
    ['What is electricity made of?', 'Electrons', ['Water', 'Air', 'Fire']],
    ['What carries electricity in our homes?', 'Wires', ['Pipes', 'Tubes', 'Hoses']],
    ['What should you never put in an electrical socket?', 'Fingers', ['Plug', 'Cord', 'Light bulb']],
    ['What do batteries store?', 'Energy', ['Water', 'Air', 'Food']],
    ['What is the main source of energy on Earth?', 'Sun', ['Moon', 'Wind', 'Fire']],
    ['What do solar panels use to make electricity?', 'Sunlight', ['Water', 'Wind', 'Coal']],
    ['What do wind turbines use to make electricity?', 'Wind', ['Water', 'Sun', 'Coal']],
    ['What is sound?', 'Vibration', ['Light', 'Heat', 'Electricity']],
    ['What is light?', 'Energy', ['Matter', 'Sound', 'Weight']],
    ['What happens when light hits a mirror?', 'Reflects', ['Absorbs', 'Disappears', 'Breaks']],
  ];
  energy.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const health: [string, string, string[]][] = [
    ['How many times a day should you brush your teeth?', '2', ['1', '3', '5']],
    ['What should you do before eating?', 'Wash hands', ['Run', 'Sleep', 'Watch TV']],
    ['What should you drink plenty of every day?', 'Water', ['Soda', 'Juice', 'Coffee']],
    ['How many hours of sleep should a child get?', '9-10', ['3-4', '5-6', '1-2']],
    ['What foods help you grow strong?', 'Vegetables', ['Candy', 'Chips', 'Soda']],
    ['What should you do after playing outside?', 'Wash hands', ['Eat', 'Sleep', 'Watch TV']],
    ['What vitamin do you get from the sun?', 'Vitamin D', ['Vitamin A', 'Vitamin C', 'Vitamin B']],
    ['What should you wear to protect your skin from the sun?', 'Sunscreen', ['Coat', 'Boots', 'Hat only']],
    ['What is bad for your teeth?', 'Too much sugar', ['Water', 'Milk', 'Vegetables']],
    ['What exercise is good for your heart?', 'Running', ['Sleeping', 'Sitting', 'Eating']],
    ['What should you do when you cough?', 'Cover your mouth', ['Sneeze more', 'Nothing', 'Run']],
    ['How often should you take a bath?', 'Every day', ['Once a week', 'Never', 'Once a month']],
    ['What food gives you energy?', 'Rice', ['Ice cream', 'Candy', 'Soda']],
    ['What food helps build muscles?', 'Protein', ['Sugar', 'Salt', 'Butter']],
    ['What should you do if you feel sick?', 'Tell an adult', ['Play more', 'Eat candy', 'Nothing']],
  ];
  health.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const environment: [string, string, string[]][] = [
    ['What do we call the natural world around us?', 'Environment', ['House', 'School', 'City']],
    ['What should you do with trash?', 'Put it in a bin', ['Throw it anywhere', 'Burn it', 'Leave it']],
    ['What do trees give us?', 'Oxygen', ['Plastic', 'Metal', 'Glass']],
    ['What is recycling?', 'Reusing materials', ['Throwing away', 'Burning', 'Burying']],
    ['What should you do to save water?', 'Turn off the tap', ['Leave it running', 'Use more', 'Waste it']],
    ['What is air pollution?', 'Dirty air', ['Clean air', 'Fresh air', 'No air']],
    ['Why should we plant trees?', 'They clean the air', ['They look nice', 'They block sun', 'They make noise']],
    ['What is global warming?', 'Earth getting hotter', ['Earth getting colder', 'More rain', 'More wind']],
    ['What can you recycle?', 'Paper', ['Food', 'Rocks', 'Dirt']],
    ['What should you do with plastic bottles?', 'Recycle them', ['Throw in river', 'Burn them', 'Bury them']],
    ['What animal is endangered?', 'Panda', ['Dog', 'Cat', 'Chicken']],
    ['What is deforestation?', 'Cutting down forests', ['Planting trees', 'Watering plants', 'Growing food']],
    ['Why is water important?', 'All living things need it', ['It is fun', 'It is cold', 'It is blue']],
    ['What is a habitat?', 'A place where animals live', ['A zoo', 'A cage', 'A house']],
    ['What happens if we waste water?', 'We may run out', ['Nothing', 'More water comes', 'It rains more']],
  ];
  environment.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const weather: [string, string, string[]][] = [
    ['What do we call water falling from clouds?', 'Rain', ['Snow', 'Wind', 'Sun']],
    ['What do we call frozen rain?', 'Snow', ['Hail', 'Frost', 'Ice']],
    ['What do we call a violent storm with spinning wind?', 'Tornado', ['Rainbow', 'Sunshine', 'Breeze']],
    ['What do we call a tropical storm?', 'Typhoon', ['Earthquake', 'Tsunami', 'Volcano']],
    ['What instrument measures temperature?', 'Thermometer', ['Ruler', 'Scale', 'Clock']],
    ['What instrument measures rainfall?', 'Rain gauge', ['Thermometer', 'Barometer', 'Clock']],
    ['What instrument tells wind direction?', 'Wind vane', ['Thermometer', 'Ruler', 'Clock']],
    ['What do clouds bring?', 'Rain', ['Sun', 'Stars', 'Moon']],
    ['What season is coldest?', 'Winter', ['Summer', 'Spring', 'Fall']],
    ['What season is hottest?', 'Summer', ['Winter', 'Spring', 'Fall']],
    ['What do we call the water cycle?', 'Evaporation and rain', ['Day and night', 'Hot and cold', 'Sun and moon']],
    ['Where does rain come from?', 'Clouds', ['Sun', 'Moon', 'Stars']],
    ['What is humidity?', 'Moisture in the air', ['Temperature', 'Wind speed', 'Cloud height']],
    ['What is a drought?', 'No rain for a long time', ['Too much rain', 'Too much wind', 'Too much sun']],
    ['What is a flood?', 'Too much water on land', ['No water', 'Strong wind', 'Fire']],
  ];
  weather.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== ARALIN PANLIPUNAN ===================================

function aralingPanlipunanQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const geography: [string, string, string[]][] = [
    ['What is the capital of the Philippines?', 'Manila', ['Cebu', 'Davao', 'Quezon City']],
    ['What is the largest city in the Philippines?', 'Quezon City', ['Manila', 'Davao', 'Cebu']],
    ['How many regions does the Philippines have?', '17', ['10', '15', '20']],
    ['What is the largest island in the Philippines?', 'Luzon', ['Mindanao', 'Visayas', 'Palawan']],
    ['What are the three main island groups?', 'Luzon, Visayas, Mindanao', ['North, South, East', 'Big, Medium, Small', '1, 2, 3']],
    ['What sea is to the west of the Philippines?', 'West Philippine Sea', ['Pacific Ocean', 'Sulu Sea', 'Celebes Sea']],
    ['What ocean is to the east of the Philippines?', 'Pacific Ocean', ['Atlantic', 'Indian', 'Arctic']],
    ['What is the longest river in the Philippines?', 'Cagayan River', ['Pasig River', 'Pampanga River', 'Agusan River']],
    ['What is the highest mountain in the Philippines?', 'Mount Apo', ['Mount Pulag', 'Mount Mayon', 'Mount Pinatubo']],
    ['What famous volcano has a perfect cone shape?', 'Mount Mayon', ['Mount Pinatubo', 'Mount Taal', 'Mount Apo']],
    ['What province is known as the "Rice Granary of the Philippines"?', 'Nueva Ecija', ['Pampanga', 'Tarlac', 'Bulacan']],
    ['What is the "Summer Capital of the Philippines"?', 'Baguio City', ['Manila', 'Cebu', 'Davao']],
    ['What region is known for chocolate hills?', 'Bohol', ['Cebu', 'Palawan', 'Boracay']],
    ['What island is Boracay on?', 'Panay', ['Luzon', 'Mindanao', 'Cebu']],
    ['What is the deepest ocean trench near the Philippines?', 'Philippine Trench', ['Mariana Trench', 'Java Trench', 'Tonga Trench']],
    ['How many provinces does the Philippines have?', '82', ['50', '100', '75']],
    ['What city is known as the "City of Smiles"?', 'Bacolod', ['Manila', 'Cebu', 'Iloilo']],
    ['What is the "Pearl of the Orient Seas"?', 'Philippines', ['Japan', 'Indonesia', 'Thailand']],
    ['Which province is known for underground river?', 'Palawan', ['Cebu', 'Bohol', 'Davao']],
    ['What is the old name of the Philippines?', 'Las Islas Filipinas', ['Maharlika', 'LUZVIMIN', 'Pearl Islands']],
  ];
  geography.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const history: [string, string, string[]][] = [
    ['Who was the national hero of the Philippines?', 'Jose Rizal', ['Andres Bonifacio', 'Emilio Aguinaldo', 'Apolinario Mabini']],
    ['Who founded the Katipunan?', 'Andres Bonifacio', ['Jose Rizal', 'Emilio Aguinaldo', 'Marcelo del Pilar']],
    ['When did the Philippines declare independence?', 'June 12, 1898', ['July 4, 1946', 'August 21, 1983', 'December 30, 1896']],
    ['Who was the first president of the Philippines?', 'Emilio Aguinaldo', ['Manuel Quezon', 'Manuel Roxas', 'Ramon Magsaysay']],
    ['What country colonized the Philippines for 333 years?', 'Spain', ['America', 'Japan', 'Britain']],
    ['What country colonized the Philippines after Spain?', 'America', ['Japan', 'Britain', 'France']],
    ['What country occupied the Philippines during WWII?', 'Japan', ['China', 'Korea', 'Vietnam']],
    ['When did the Philippines gain independence from America?', 'July 4, 1946', ['June 12, 1898', 'August 21, 1983', 'December 30, 1896']],
    ['Who wrote "Noli Me Tangere" and "El Filibusterismo"?', 'Jose Rizal', ['Andres Bonifacio', 'Apolinario Mabini', 'Graciano Lopez Jaena']],
    ['What is the oldest university in the Philippines?', 'University of Santo Tomas', ['UP', 'Ateneo', 'De La Salle']],
    ['Who was the "Brains of the Revolution"?', 'Apolinario Mabini', ['Jose Rizal', 'Andres Bonifacio', 'Emilio Aguinaldo']],
    ['What event started the Philippine Revolution?', 'Cry of Pugad Lawin', ['EDSA Revolution', 'Bataan Death March', 'Cavite Mutiny']],
    ['What was the bloodless revolution in 1986 called?', 'EDSA People Power', ['Cry of Pugad Lawin', 'Bataan Death March', 'Cavite Mutiny']],
    ['Who was the first female president of the Philippines?', 'Corazon Aquino', ['Gloria Arroyo', 'Imelda Marcos', 'Leni Robredo']],
    ['What is the national language of the Philippines?', 'Filipino', ['English', 'Cebuano', 'Ilocano']],
    ['Who was the hero known as the "Sublime Paralytic"?', 'Apolinario Mabini', ['Jose Rizal', 'Andres Bonifacio', 'Graciano Lopez Jaena']],
    ['What is the date of Rizal Day?', 'December 30', ['June 12', 'July 4', 'August 21']],
    ['What is the date of Bonifacio Day?', 'November 30', ['December 30', 'June 12', 'July 4']],
    ['Who was the youngest general of the revolution?', 'Gregorio del Pilar', ['Antonio Luna', 'Emilio Aguinaldo', 'Miguel Malvar']],
    ['What is the oldest stone church in the Philippines?', 'San Agustin Church', ['Manila Cathedral', 'Quiapo Church', 'Binondo Church']],
  ];
  history.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const government: [string, string, string[]][] = [
    ['What is the national anthem of the Philippines?', 'Lupang Hinirang', ['Bayang Magiliw', 'Pilipinas Kong Mahal', 'Ako ay Pilipino']],
    ['What is the national bird of the Philippines?', 'Philippine Eagle', ['Maya', 'Rooster', 'Parrot']],
    ['What is the national flower?', 'Sampaguita', ['Rose', 'Ilang-ilang', 'Waling-waling']],
    ['What is the national tree?', 'Narra', ['Acacia', 'Balete', 'Kawayan']],
    ['What is the national leaf?', 'Anahaw', ['Niyog', 'Kawayan', 'Balete']],
    ['What is the national fruit?', 'Mangga', ['Saging', 'Niyog', 'Pinya']],
    ['What is the national animal?', 'Carabao', ['Horse', 'Cow', 'Goat']],
    ['What is the national fish?', 'Bangus', ['Tilapia', 'Galunggong', 'Tuna']],
    ['What is the national house?', 'Bahay Kubo', ['Bahay na Bato', 'Condominium', 'Apartment']],
    ['What is the national sport?', 'Arnis', ['Basketball', 'Sipa', 'Boxing']],
    ['What are the three branches of government?', 'Executive, Legislative, Judicial', ['Police, Army, Navy', 'President, VP, Senate', 'House, Senate, Court']],
    ['Who is the head of state?', 'President', ['Vice President', 'Senate President', 'Chief Justice']],
    ['How many years is a president\'s term?', '6', ['3', '4', '5']],
    ['How many senators are there?', '24', ['12', '36', '50']],
    ['What is the legislative body called?', 'Congress', ['Cabinet', 'Supreme Court', 'Senate only']],
    ['Where does the president live?', 'Malacanang Palace', ['Congress', 'Supreme Court', 'Senate']],
    ['What is the supreme law of the land?', 'Constitution', ['President', 'Congress', 'Supreme Court']],
    ['How often are elections held?', 'Every 3 years', ['Every year', 'Every 5 years', 'Every 6 years']],
    ['At what age can you vote?', '18', ['16', '21', '25']],
    ['What is the currency of the Philippines?', 'Peso', ['Dollar', 'Yen', 'Euro']],
  ];
  government.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const culture: [string, string, string[]][] = [
    ['What is the traditional Filipino greeting?', 'Mano po', ['Handshake', 'Bow', 'Kiss']],
    ['What do you call the Filipino tradition of helping neighbors?', 'Bayanihan', ['Salo-salo', 'Pasalubong', 'Mano']],
    ['What is the Filipino Christmas tradition of visiting houses called?', 'Simbang Gabi', ['Misa de Gallo', 'Noche Buena', 'Media Noche']],
    ['What is the Filipino feast called?', 'Salo-salo', ['Bayanihan', 'Mano', 'Pasalubong']],
    ['What do you call the gift brought home after a trip?', 'Pasalubong', ['Bayanihan', 'Salo-salo', 'Mano']],
    ['What is the traditional Filipino dress for women?', 'Baro\'t Saya', ['Kimona', 'Malong', 'Bahag']],
    ['What is the traditional formal shirt for men?', 'Barong Tagalog', ['Polo', 'T-shirt', 'Coat']],
    ['What is the Filipino dance with bamboo poles?', 'Tinikling', ['Singkil', 'Itik-itik', 'Pandanggo']],
    ['What is the Filipino game using a rattan ball and feet?', 'Sipa', ['Piko', 'Luksong baka', 'Patintero']],
    ['What is the Filipino game with lines drawn on ground?', 'Patintero', ['Piko', 'Sipa', 'Luksong tinik']],
    ['What is the Filipino game with a small flat stone?', 'Piko', ['Patintero', 'Sipa', 'Tumbang preso']],
    ['What is the Filipino New Year tradition?', 'Making loud noises', ['Quiet night', 'Sleeping early', 'Fasting']],
    ['What do Filipinos eat on birthdays for long life?', 'Pancit', ['Rice', 'Bread', 'Cake']],
    ['What is the Filipino tradition during Holy Week?', 'Visita Iglesia', ['Simbang Gabi', 'Flores de Mayo', 'Santacruzan']],
    ['What is the May flower festival called?', 'Flores de Mayo', ['Sinulog', 'Ati-atihan', 'Dinagyang']],
  ];
  culture.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const famousFilipinos: [string, string, string[]][] = [
    ['Who is the national hero who was shot at Bagumbayan?', 'Jose Rizal', ['Andres Bonifacio', 'Apolinario Mabini', 'Emilio Aguinaldo']],
    ['Who is known as the "Great Plebeian"?', 'Andres Bonifacio', ['Jose Rizal', 'Apolinario Mabini', 'Emilio Aguinaldo']],
    ['Who is the "Sublime Paralytic"?', 'Apolinario Mabini', ['Jose Rizal', 'Andres Bonifacio', 'Antonio Luna']],
    ['Who is the "Hero of Tirad Pass"?', 'Gregorio del Pilar', ['Antonio Luna', 'Emilio Aguinaldo', 'Miguel Malvar']],
    ['Who is the "Brains of the Revolution"?', 'Apolinario Mabini', ['Jose Rizal', 'Antonio Luna', 'Andres Bonifacio']],
    ['Who was the first Filipino saint?', 'San Lorenzo Ruiz', ['San Pedro Bautista', 'San Vicente Liem', 'San Eustaquio']],
    ['Who painted the "Spoliarium"?', 'Juan Luna', ['Fernando Amorsolo', 'Carlos Francisco', 'Jose Rizal']],
    ['Who is known as the "National Artist of Painting"?', 'Fernando Amorsolo', ['Juan Luna', 'Carlos Francisco', 'Jose Joya']],
    ['Who composed the "Lupang Hinirang"?', 'Julian Felipe', ['Francisco Balagtas', 'Levi Celerio', 'Nicanor Abelardo']],
    ['Who wrote the lyrics of "Lupang Hinirang"?', 'Jose Palma', ['Julian Felipe', 'Francisco Balagtas', 'Levi Celerio']],
    ['Who is the "Prince of Filipino Poets"?', 'Francisco Balagtas', ['Jose Rizal', 'Levi Celerio', 'Nicanor Abelardo']],
    ['Who is the first Filipino Olympian medalist?', 'Teofilo Yldefonso', ['Manny Pacquiao', 'Hidilyn Diaz', 'Weightlifting']],
    ['Who is the first Filipino to win a Miss Universe title?', 'Gloria Diaz', ['Megan Young', 'Pia Wurtzbach', 'Catriona Gray']],
    ['Who is the Filipino boxing champion with 8 division titles?', 'Manny Pacquiao', ['Nonito Donaire', 'Jerwin Ancajas', 'Donnie Nietes']],
    ['Who is the first Filipino woman to win an Olympic gold?', 'Hidilyn Diaz', ['Manny Pacquiao', 'Gloria Diaz', 'Catriona Gray']],
  ];
  famousFilipinos.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const community: [string, string, string[]][] = [
    ['What do you call a person who leads a barangay?', 'Barangay Captain', ['Mayor', 'Governor', 'President']],
    ['What is the smallest unit of government in the Philippines?', 'Barangay', ['City', 'Province', 'Region']],
    ['What do you call the people living in the same area?', 'Community', ['Family', 'Class', 'Team']],
    ['What is a rule that everyone must follow?', 'Law', ['Game', 'Habit', 'Tradition']],
    ['Who enforces the law?', 'Police', ['Teachers', 'Doctors', 'Farmers']],
    ['Who teaches students in school?', 'Teacher', ['Police', 'Doctor', 'Farmer']],
    ['Who takes care of sick people?', 'Doctor', ['Teacher', 'Police', 'Driver']],
    ['Who puts out fires?', 'Firefighter', ['Police', 'Doctor', 'Teacher']],
    ['Who delivers mail?', 'Mail carrier', ['Police', 'Doctor', 'Teacher']],
    ['Who drives a bus?', 'Driver', ['Teacher', 'Doctor', 'Firefighter']],
    ['What do you call a place where people buy food?', 'Market', ['School', 'Hospital', 'Park']],
    ['What do you call a place where people pray?', 'Church', ['School', 'Market', 'Hospital']],
    ['What do you call a place where people learn?', 'School', ['Market', 'Church', 'Hospital']],
    ['What do you call a place where sick people go?', 'Hospital', ['School', 'Market', 'Church']],
    ['What do you call a place where people play?', 'Park', ['Hospital', 'School', 'Market']],
    ['What is a map?', 'A drawing of a place', ['A book', 'A game', 'A song']],
    ['What shows directions on a map?', 'Compass rose', ['Legend', 'Scale', 'Title']],
    ['What shows distance on a map?', 'Scale', ['Compass', 'Legend', 'Title']],
    ['What shows symbols on a map?', 'Legend', ['Compass', 'Scale', 'Title']],
    ['What is the top of a map usually?', 'North', ['South', 'East', 'West']],
  ];
  community.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const economics: [string, string, string[]][] = [
    ['What do we use to buy things?', 'Money', ['Water', 'Air', 'Rocks']],
    ['What do you call the money you earn from working?', 'Income', ['Expense', 'Debt', 'Loan']],
    ['What do you call spending money?', 'Expense', ['Income', 'Savings', 'Profit']],
    ['What do you call money you keep for later?', 'Savings', ['Expense', 'Debt', 'Income']],
    ['What do you call a place where people buy and sell?', 'Market', ['School', 'Hospital', 'Park']],
    ['What do you call a person who sells things?', 'Seller', ['Buyer', 'Teacher', 'Doctor']],
    ['What do you call a person who buys things?', 'Buyer', ['Seller', 'Teacher', 'Doctor']],
    ['What do you call a person who starts a business?', 'Entrepreneur', ['Employee', 'Customer', 'Student']],
    ['What do you call things people need to live?', 'Needs', ['Wants', 'Desires', 'Wishes']],
    ['What do you call things people would like to have?', 'Wants', ['Needs', 'Musts', 'Requirements']],
    ['Which is a need?', 'Food', ['Toys', 'Candy', 'Video games']],
    ['Which is a want?', 'Toys', ['Water', 'Food', 'Clothing']],
    ['What do you call giving money to help others?', 'Charity', ['Business', 'Trade', 'Shopping']],
    ['What do you call trading one thing for another?', 'Barter', ['Buy', 'Sell', 'Save']],
    ['What do you call a person who works for someone else?', 'Employee', ['Boss', 'Owner', 'Customer']],
  ];
  economics.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const festivals: [string, string, string[]][] = [
    ['What festival is celebrated in Cebu every January?', 'Sinulog', ['Ati-atihan', 'Dinagyang', 'Panagbenga']],
    ['What festival is celebrated in Kalibo, Aklan?', 'Ati-atihan', ['Sinulog', 'Dinagyang', 'Panagbenga']],
    ['What festival is celebrated in Iloilo?', 'Dinagyang', ['Sinulog', 'Ati-atihan', 'Panagbenga']],
    ['What festival is celebrated in Baguio?', 'Panagbenga', ['Sinulog', 'Ati-atihan', 'Dinagyang']],
    ['What festival is celebrated in Davao?', 'Kadayawan', ['Sinulog', 'Ati-atihan', 'Panagbenga']],
    ['What festival is celebrated in Pampanga during Holy Week?', 'Maleldo', ['Sinulog', 'Ati-atihan', 'Dinagyang']],
    ['What festival is celebrated in Naga City?', 'Penafrancia', ['Sinulog', 'Ati-atihan', 'Dinagyang']],
    ['What festival is celebrated in Lucban, Quezon?', 'Pahiyas', ['Sinulog', 'Ati-atihan', 'Dinagyang']],
    ['What festival is celebrated in Obando, Bulacan?', 'Fertility Dance', ['Sinulog', 'Ati-atihan', 'Dinagyang']],
    ['What festival is celebrated in Bacolod?', 'MassKara', ['Sinulog', 'Ati-atihan', 'Dinagyang']],
  ];
  festivals.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== BUILD AND EXPORT =====================================

const GENERATORS: Record<ElementarySubject, () => QuizQuestion[]> = {
  Filipino: filipinoQuestions,
  English: englishQuestions,
  Math: mathQuestions,
  Science: scienceQuestions,
  'Aralin Panlipunan': aralingPanlipunanQuestions,
};

const bankCache: Partial<Record<ElementarySubject, QuizQuestion[]>> = {};

function buildSubjectBank(subject: ElementarySubject): QuizQuestion[] {
  if (bankCache[subject]) return bankCache[subject]!;
  const bank = GENERATORS[subject]();
  bankCache[subject] = bank;
  return bank;
}

export function getElementarySubjectSize(subject: ElementarySubject): number {
  return buildSubjectBank(subject).length;
}

export function pickElementaryQuestions(subject: ElementarySubject, count: number): QuizQuestion[] {
  const bank = buildSubjectBank(subject);
  const n = Math.min(count, bank.length);
  return shuffle(bank).slice(0, n);
}
