import type { QuizQuestion } from '@/types';
import { shuffle } from '@/lib/gameData';

export const JUNIOR_HIGH_SUBJECTS = [
  'Filipino', 'English', 'Math', 'Science', 'Aralin Panlipunan', 'TLE', 'MAPEH',
] as const;
export type JuniorHighSubject = (typeof JUNIOR_HIGH_SUBJECTS)[number];

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

  const panitikan: [string, string, string[]][] = [
    ['Sino ang sumulat ng "Florante at Laura"?', 'Francisco Balagtas', ['Jose Rizal', 'Andres Bonifacio', 'Apolinario Mabini']],
    ['Sino ang Pambansang Alagad ng Panitikan sa Panitikan ng Pilipinas?', 'Jose Rizal', ['Francisco Balagtas', 'Nick Joaquin', 'Carlos Palanca']],
    ['Anong uri ng panitikan ang "Florante at Laura"?', 'Awit', ['Korido', 'Dula', 'Sanaysay']],
    ['Anong uri ng panitikan ang "Ibong Adarna"?', 'Korido', ['Awit', 'Nobela', 'Maikling Kwento']],
    ['Sino ang bayani sa "Florante at Laura"?', 'Florante', ['Laura', 'Adolfo', 'Aladin']],
    ['Sino ang kaibigan ni Florante sa kagubatan?', 'Aladin', ['Adolfo', 'Rosalinda', 'Antonio']],
    ['Ano ang tema ng "Florante at Laura"?', 'Pag-ibig at katarungan', ['Digmaan', 'Kahirapan', 'Pag-aaral']],
    ['Sino ang sumulat ng "Noli Me Tangere"?', 'Jose Rizal', ['Francisco Balagtas', 'Antonio Luna', 'Marcelo del Pilar']],
    ['Sino ang bida sa "Noli Me Tangere"?', 'Crisostomo Ibarra', ['Simoun', 'Elias', 'Basilio']],
    ['Sino ang kontrabida sa "Noli Me Tangere"?', 'Padre Damaso', ['Padre Salvi', 'Kapitan Tiago', 'Elias']],
    ['Anong ibig sabihin ng "Noli Me Tangere"?', 'Huwag akong salingin', ['Pukawin mo ako', 'Yakapin mo ako', 'Halikan mo ako']],
    ['Sino ang sumulat ng "El Filibusterismo"?', 'Jose Rizal', ['Antonio Luna', 'Graciano Lopez Jaena', 'Marcelo del Pilar']],
    ['Sino ang bida sa "El Filibusterismo"?', 'Simoun', ['Crisostomo Ibarra', 'Basilio', 'Elias']],
    ['Anong ibig sabihin ng "El Filibusterismo"?', 'Ang Subersibo', ['Ang Bayani', 'Ang Kaibigan', 'Ang Kalaban']],
    ['Sino ang sumulat ng "Kartilya ng Katipunan"?', 'Emilio Jacinto', ['Andres Bonifacio', 'Apolinario Mabini', 'Emilio Aguinaldo']],
    ['Ano ang tawag sa mga sulat na nagpapaliwanag ng prinsipyo ng Katipunan?', 'Kartilya', ['Kodigo', 'Kartilya', 'Konstitusyon']],
    ['Sino ang "Utak ng Rebolusyon"?', 'Apolinario Mabini', ['Jose Rizal', 'Andres Bonifacio', 'Antonio Luna']],
    ['Ano ang tawag sa tula na may 12 pantig bila linya?', 'Dodecasyllabic', ['Octosyllabic', 'Hexasyllabic', 'Decasyllabic']],
    ['Ano ang tawag sa tula na may 8 pantig bawat linya?', 'Octosyllabic', ['Dodecasyllabic', 'Hexasyllabic', 'Decasyllabic']],
    ['Ano ang sukatan ng taludtod ng isang tula?', 'Pantig', ['Pangungusap', 'Sukat', 'Tugma']],
  ];
  panitikan.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const wika: [string, string, string[]][] = [
    ['Ano ang pag-aaral ng wika?', 'Linggwistiks', ['Filolohiya', 'Semantiks', 'Pragmatiks']],
    ['Ano ang tawag sa pinagmulan ng salita?', 'Etimolohiya', ['Sintaks', 'Morpholohiya', 'Fonolohiya']],
    ['Ano ang pag-aaral ng mga tunog ng wika?', 'Fonolohiya', ['Sintaks', 'Semantiks', 'Etimolohiya']],
    ['Ano ang pag-aaral ng kayarian ng salita?', 'Morpholohiya', ['Sintaks', 'Fonolohiya', 'Semantiks']],
    ['Ano ang pag-aaral ng kahulugan ng wika?', 'Semantiks', ['Sintaks', 'Morpholohiya', 'Fonolohiya']],
    ['Ano ang pag-aaral ng kayarian ng pangungusap?', 'Sintaks', ['Morpholohiya', 'Semantiks', 'Fonolohiya']],
    ['Ano ang tawag sa pagbabago ng anyo ng salita?', 'Imbentaryo', ['Inflection', 'Deribasyon', 'Komposisyon']],
    ['Ano ang wika ng Pilipinas ayon sa Konstitusyon?', 'Filipino at English', ['Filipino lamang', 'English lamang', 'Cebuano']],
    ['Ilang pangunahing wika ang may sa Pilipinas?', '8', ['5', '12', '20']],
    ['Ano ang pambansang wika ng Pilipinas?', 'Filipino', ['Tagalog', 'Cebuano', 'Ilocano']],
  ];
  wika.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const bahagiPananalita: [string, string, string[]][] = [
    ['Ano ang tawag sa pangngalang tumutukoy sa tiyak na tao o bagay?', 'Tiyak na pangngalan', ['Di-tiyak na pangngalan', 'Palagyo', 'Palagdiwa']],
    ['Ano ang tawag sa pangngalang tumutukoy sa hindi tiyak na tao o bagay?', 'Di-tiyak na pangngalan', ['Tiyak na pangngalan', 'Palagyo', 'Palagdiwa']],
    ['Ano ang pangngalang tumutukoy sa kalikasan?', 'Palagyo', ['Tiyak', 'Di-tiyak', 'Palagdiwa']],
    ['Ano ang pangngalang tumutukoy sa konsepto o gawi?', 'Palagdiwa', ['Tiyak', 'Di-tiyak', 'Palagyo']],
    ['Ano ang pandiwang nagpapahayag ng kilos o ginawa?', 'Pandiwa', ['Pangngalan', 'Pang-uri', 'Pang-abay']],
    ['Ano ang pang-uri na naglalarawan ng pangngalan?', 'Pang-uri', ['Pandiwa', 'Pangngalan', 'Pang-abay']],
    ['Ano ang pang-abay na naglalarawan ng pandiwa?', 'Pang-abay', ['Pang-uri', 'Pangngalan', 'Pandiwa']],
    ['Ano ang panghalip na pumapalit sa pangngalan?', 'Panghalip', ['Pang-ugnay', 'Pangatnig', 'Pantukoy']],
    ['Ano ang pantukoy na nagsisilbing pananda sa pangngalan?', 'Pantukoy', ['Panghalip', 'Pangatnig', 'Pang-ugnay']],
    ['Ano ang pangatnig na nag-uugnay ng dalawang salita o pangungusap?', 'Pangatnig', ['Pang-ugnay', 'Panghalip', 'Pantukoy']],
  ];
  bahagiPananalita.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const uriPangungusap: [string, string, string[]][] = [
    ['Anong uri ng pangungusap ang nagpapahayag ng ideya o kwento?', 'Pasalaysay', ['Patanong', 'Pautos', 'Padamdam']],
    ['Anong uri ng pangungusap ang nagtatanong?', 'Patanong', ['Pasalaysay', 'Pautos', 'Padamdam']],
    ['Anong uri ng pangungusap ang nagpapahayag ng utos?', 'Pautos', ['Pasalaysay', 'Patanong', 'Padamdam']],
    ['Anong uri ng pangungusap ang nagpapahayag ng matinding damdamin?', 'Padamdam', ['Pasalaysay', 'Patanong', 'Pautos']],
    ['Anong uri ng pangungusap na may dalawang kalayaan?', 'Paksang pahayag', ['Paksang di-pahayag', 'Walang paksa', 'Pabalang']],
    ['Anong uri ng pangungusap na walang paksa?', 'Walang paksa', ['Paksang pahayag', 'Paksang di-pahayag', 'Pabalang']],
    ['Alin ang halimbawa ng pangungusap na pasalaysay?', 'Naglaro ang mga bata sa parke.', ['Saan naglaro ang mga bata?', 'Maglaro kayo!', 'Ang ganda ng parke!']],
    ['Alin ang halimbawa ng pangungusap na patanong?', 'Saan pupunta ang mga bata?', ['Naglaro ang mga bata.', 'Maglaro kayo!', 'Ang ganda ng parke!']],
    ['Alin ang halimbawa ng pangungusap na pautos?', 'Maglaro kayo nang maayos!', ['Naglaro ang mga bata.', 'Saan pupunta ang mga bata?', 'Ang ganda ng parke!']],
    ['Alin ang halimbawa ng pangungusap na padamdam?', 'Ang ganda ng parke!', ['Naglaro ang mga bata.', 'Saan pupunta ang mga bata?', 'Maglaro kayo!']],
  ];
  uriPangungusap.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const sanhiBunga: [string, string, string[]][] = [
    ['Ano ang tawag sa dahilan ng pangyayari?', 'Sanhi', ['Bunga', 'Kinalabasan', 'Resulta']],
    ['Ano ang tawag sa resulta ng pangyayari?', 'Bunga', ['Sanhi', 'Dahilan', 'Pinagmulan']],
    ['Alin ang sanhi sa "Nabasa ang papel dahil umulan"?', 'Umulan', ['Nabasa ang papel', 'Papel', 'Dahil']],
    ['Alin ang bunga sa "Nabasa ang papel dahil umulan"?', 'Nabasa ang papel', ['Umulan', 'Dahil', 'Papel']],
    ['Anong pangatnig ang nagsasaad ng sanhi?', 'Dahil', ['Kaya', 'Ngunit', 'Subalit']],
    ['Anong pangatnig ang nagsasaad ng bunga?', 'Kaya', ['Dahil', 'Ngunit', 'Subalit']],
    ['Alin ang sanhi sa "Sinipag ang bata kaya siya pumasa"?', 'Sinipag ang bata', ['Pumasa siya', 'Kaya', 'Bata']],
    ['Alin ang bunga sa "Sinipag ang bata kaya siya pumasa"?', 'Pumasa siya', ['Sinipag ang bata', 'Kaya', 'Bata']],
    ['Ano ang ibig sabihin ng "dahil"?', 'Sanhi', ['Bunga', 'Pagkatapos', 'Samantala']],
    ['Ano ang ibig sabihin ng "kaya"?', 'Bunga', ['Sanhi', 'Pagkatapos', 'Samantala']],
  ];
  sanhiBunga.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const tula: [string, string, string[]][] = [
    ['Ano ang tawag sa mga sukat ng tula?', 'Sukat', ['Tugma', 'Sukat', 'Pantig']],
    ['Ano ang tawag sa pagtutugma ng mga salita sa dulo ng linya?', 'Tugma', ['Sukat', 'Pantig', 'Sukat']],
    ['Ilang pantig ang mayroon sa isang linya ng "Awit"?', '12', ['8', '10', '16']],
    ['Ilang pantig ang mayroon sa isang linya ng "Korido"?', '8', ['12', '10', '16']],
    ['Ano ang tawag sa paulit-ulit na tunog sa dulo ng linya?', 'Tugma', ['Sukat', 'Pantig', 'Sukat']],
    ['Ano ang tawag sa tula na walang tugma at sukat?', 'Malaya', ['Awit', 'Korido', 'Sonnet']],
    ['Ano ang tawag sa tula na may 14 linya?', 'Sonnet', ['Awit', 'Korido', 'Haiku']],
    ['Ilang linya ang mayroon sa isang Haiku?', '3', ['5', '7', '14']],
    ['Saan nagmula ang Haiku?', 'Hapon', ['Tsina', 'Korea', 'Pilipinas']],
    ['Ano ang tawag sa maikling tulang Pilipino na may 3 linya at 17 pantig?', 'Haiku', ['Sonnet', 'Awit', 'Korido']],
  ];
  tula.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const maiklingKwento: [string, string, string[]][] = [
    ['Ano ang tawag sa maikling kwento?', 'Maikling Kwento', ['Nobela', 'Dula', 'Sanaysay']],
    ['Sino ang sumulat ng "Dead Stars"?', 'Paz Marquez Benitez', ['Nick Joaquin', 'Carlos Bulosan', 'Manuel Arguilla']],
    ['Sino ang sumulat ng "How My Brother Leon Brought Home a Wife"?', 'Manuel Arguilla', ['Paz Marquez Benitez', 'Nick Joaquin', 'Carlos Bulosan']],
    ['Sino ang sumulat ng "The Woman Who Had Two Navels"?', 'Nick Joaquin', ['Paz Marquez Benitez', 'Manuel Arguilla', 'Carlos Bulosan']],
    ['Sino ang sumulat ng "America Is in the Heart"?', 'Carlos Bulosan', ['Nick Joaquin', 'Manuel Arguilla', 'Paz Marquez Benitez']],
    ['Ano ang pananaw ng kwento kung ang nagsasalita ay tauhan?', 'Unang panauhan', ['Ikalawang panauhan', 'Ikatlong panauhan', 'Walang panauhan']],
    ['Ano ang pananaw kung ang nagsasalita ay tagapagsalita?', 'Ikalawang panauhan', ['Unang panauhan', 'Ikatlong panauhan', 'Walang panauhan']],
    ['Ano ang pananaw kung hindi tauhan ang nagsasalita?', 'Ikatlong panauhan', ['Unang panauhan', 'Ikalawang panauhan', 'Walang panauhan']],
    ['Ano ang tawag sa pangunahing tauhan ng kwento?', 'Protagonista', ['Antagonista', 'Kontrabida', 'Tauhan']],
    ['Ano ang tawag sa kalaban ng pangunahing tauhan?', 'Antagonista', ['Protagonista', 'Tauhan', 'Tagapagsalita']],
  ];
  maiklingKwento.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const idyoma: [string, string, string[]][] = [
    ['Ano ang ibig sabihin ng "mababaw ang luha"?', 'Madaling umiyak', ['Malakas ang loob', 'Mabait', 'Matapang']],
    ['Ano ang ibig sabihin ng "maitim ang budhi"?', 'Masama ang loob', ['Mabait', 'Matalino', 'Malakas']],
    ['Ano ang ibig sabihin ng "maagap ang kamay"?', 'Mandurukot', ['Mabait', 'Matapang', 'Matalino']],
    ['Ano ang ibig sabihin ng "balat sibuyas"?', 'Madaling magalit', ['Mabait', 'Matapang', 'Malakas']],
    ['Ano ang ibig sabihin ng "isang kahig isang tuka"?', 'Pang-araw-araw na pamumuhay', ['Mayaman', 'Malakas', 'Matalino']],
    ['Ano ang ibig sabihin ng "nagbibilang ng poste"?', 'Walang ginagawa', ['Mabait', 'Masipag', 'Matalino']],
    ['Ano ang ibig sabihin ng "siga sa kanilang lugar"?', 'Malakas sa sariling lugar', ['Mahina', 'Takot', 'Mabait']],
    ['Ano ang ibig sabihin ng "nasa gabi ang mga liwanag"?', 'May pag-asa pa', ['Wala nang pag-asa', 'Tapos na', 'Malayo pa']],
    ['Ano ang ibig sabihin ng "kapit sa patalim"?', 'Walang choice kundi gawin', ['Mayaman', 'Mabait', 'Matapang']],
    ['Ano ang ibig sabihin ng "buti na lang"?', 'Swerte', ['Maswerte', 'Malas', 'Paborito']],
  ];
  idyoma.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const salitaTranslation: [string, string][] = [
    ['Guro', 'Teacher'], ['Paaralan', 'School'], ['Aklat', 'Book'], ['Lapis', 'Pencil'],
    ['Papel', 'Paper'], ['Mesa', 'Table'], ['Upuan', 'Chair'], ['Bintana', 'Window'],
    ['Pinto', 'Door'], ['Kusina', 'Kitchen'], ['Silid', 'Room'], ['Kama', 'Bed'],
    ['Unan', 'Pillow'], ['Sabon', 'Soap'], ['Tuwalya', 'Towel'], ['Suklay', 'Comb'],
    ['Sipilyo', 'Toothbrush'], ['Baso', 'Glass'], ['Plato', 'Plate'], ['Kutsara', 'Spoon'],
    ['Tinidor', 'Fork'], ['Kutsilyo', 'Knife'], ['Kaldero', 'Pot'], ['Kawali', 'Pan'],
    ['Tasa', 'Cup'], ['Sapatos', 'Shoes'], ['Tsinelas', 'Slippers'], ['Pantalon', 'Pants'],
    ['Bestida', 'Dress'], ['Relo', 'Watch'], ['Kwintas', 'Necklace'], ['Singsing', 'Ring'],
    ['Pulseras', 'Bracelet'], ['Hikaw', 'Earrings'], ['Pera', 'Money'], ['Barya', 'Coins'],
    ['Bulsa', 'Pocket'], ['Bayong', 'Bag'], ['Sako', 'Sack'], ['Kape', 'Coffee'],
    ['Gatas', 'Milk'], ['Asukal', 'Sugar'], ['Asin', 'Salt'], ['Paminta', 'Pepper'],
    ['Suka', 'Vinegar'], ['Toyo', 'Soy sauce'], ['Sibuyas', 'Onion'], ['Bawang', 'Garlic'],
    ['Luya', 'Ginger'], ['Kamatis', 'Tomato'], ['Ampalaya', 'Bitter gourd'], ['Talong', 'Eggplant'],
  ];
  const tlWords = salitaTranslation.map(s => s[0]);
  const enWords = salitaTranslation.map(s => s[1]);
  salitaTranslation.forEach(([tl, en]) => {
    qs.push(makeQ(`Ano ang Ingles ng "${tl}"?`, en, threeWrong(enWords, en)));
    qs.push(makeQ(`Ano ang Tagalog ng "${en}"?`, tl, threeWrong(tlWords, tl)));
  });

  const kasalungat: [string, string, string[]][] = [
    ['Ano ang kasalungat ng "mabuti"?', 'masama', ['mabait', 'maganda', 'matalino']],
    ['Ano ang kasalungat ng "malaki"?', 'maliit', ['mataba', 'mahaba', 'maikli']],
    ['Ano ang kasalungat ng "mabilis"?', 'mabagal', ['mataas', 'mababa', 'malakas']],
    ['Ano ang kasalungat ng "mainit"?', 'malamig', ['matamis', 'maasim', 'mapait']],
    ['Ano ang kasalungat ng "masaya"?', 'malungkot', ['malaki', 'maliit', 'maikli']],
    ['Ano ang kasalungat ng "maaga"?', 'mahaba ang oras', ['mabilis', 'mabagal', 'mataas']],
    ['Ano ang kasalungat ng "mahaba"?', 'maikli', ['mataba', 'payat', 'mataas']],
    ['Ano ang kasalungat ng "tanghali"?', 'umaga', ['gabi', 'hapon', 'bukas']],
    ['Ano ang kasalungat ng "bukas"?', 'sarado', ['bukas', 'bukas', 'bukas']],
    ['Ano ang kasalungat ng "totoo"?', 'pekeng', ['totoo', 'totoo', 'totoo']],
    ['Ano ang kasalungat ng "mahirap"?', 'mayaman', ['mabait', 'matalino', 'masipag']],
    ['Ano ang kasalungat ng "matapang"?', 'duwag', ['mabait', 'matalino', 'masipag']],
    ['Ano ang kasalungat ng "malakas"?', 'mahina', ['mabait', 'matalino', 'masipag']],
    ['Ano ang kasalungat ng "mababa"?', 'mataas', ['mabait', 'matalino', 'masipag']],
    ['Ano ang kasalungat ng "malinis"?', 'marumi', ['mabait', 'matalino', 'masipag']],
  ];
  kasalungat.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const kasingkahulugan: [string, string, string[]][] = [
    ['Ano ang kasingkahulugan ng "maganda"?', 'marilag', ['pangit', 'maliit', 'mabaho']],
    ['Ano ang kasingkahulugan ng "mabilis"?', 'mabilis na', ['mabagal', 'mabigat', 'mahaba']],
    ['Ano ang kasingkahulugan ng "masaya"?', 'maligaya', ['malungkot', 'mabigat', 'mabaho']],
    ['Ano ang kasingkahulugan ng "malaki"?', 'malawak', ['maliit', 'maikli', 'payat']],
    ['Ano ang kasingkahulugan ng "matalino"?', 'matalas', ['tanga', 'batugan', 'tamad']],
    ['Ano ang kasingkahulugan ng "bahay"?', 'tahanan', ['gulod', 'puno', 'kalsada']],
    ['Ano ang kasingkahulugan ng "kaibigan"?', 'kaibigan', ['kaaway', 'kapatid', 'magulang']],
    ['Ano ang kasingkahulugan ng "guro"?', 'tagapagturo', ['bata', 'gwardiya', 'tagapagluto']],
    ['Ano ang kasingkahulugan ng "mahirap"?', 'dukha', ['mayaman', 'mabait', 'matalino']],
    ['Ano ang kasingkahulugan ng "masipag"?', 'masikhay', ['tamad', 'batugan', 'mabagal']],
  ];
  kasingkahulugan.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const pangnilalaman: [string, string, string[]][] = [
    ['Ano ang tema ng "Noli Me Tangere"?', 'Pag-asa at pagbabago', ['Digmaan', 'Kahirapan', 'Pag-ibig']],
    ['Ano ang tema ng "El Filibusterismo"?', 'Rebolusyon at paghihiganti', ['Pag-ibig', 'Kahirapan', 'Pag-aaral']],
    ['Ano ang tema ng "Florante at Laura"?', 'Pag-ibig at katarungan', ['Digmaan', 'Kahirapan', 'Pag-aaral']],
    ['Ano ang tema ng "Ibong Adarna"?', 'Pag-ibig at kapangyarihan', ['Digmaan', 'Kahirapan', 'Pag-aaral']],
    ['Ano ang tema ng "Kartilya ng Katipunan"?', 'Katapatan at kalayaan', ['Pag-ibig', 'Kahirapan', 'Pag-aaral']],
    ['Ano ang simbolo ng "Ibong Adarna"?', 'Kagandahan at kapangyarihan', ['Digmaan', 'Kahirapan', 'Pag-aaral']],
    ['Ano ang simbolo ng "Florante" sa kwento?', 'Katarungan', ['Kahirapan', 'Digmaan', 'Pag-aaral']],
    ['Ano ang simbolo ng "Laura" sa kwento?', 'Kagandahan at kabanalan', ['Digmaan', 'Kahirapan', 'Pag-aaral']],
    ['Ano ang simbolo ng "Adolfo" sa kwento?', 'Kasamaan at kahalayan', ['Katarungan', 'Kagandahan', 'Kabanalan']],
    ['Ano ang simbolo ng "Aladin" sa kwento?', 'Pag-ibig at katapatan', ['Kasamaan', 'Kahalayan', 'Digmaan']],
  ];
  pangnilalaman.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== ENGLISH =============================================

function englishQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const literature: [string, string, string[]][] = [
    ['Who wrote "Romeo and Juliet"?', 'William Shakespeare', ['Charles Dickens', 'Jane Austen', 'Mark Twain']],
    ['Who wrote "To Kill a Mockingbird"?', 'Harper Lee', ['J.K. Rowling', 'Stephen King', 'John Steinbeck']],
    ['Who wrote "The Great Gatsby"?', 'F. Scott Fitzgerald', ['Ernest Hemingway', 'John Steinbeck', 'William Faulkner']],
    ['Who wrote "1984"?', 'George Orwell', ['Aldous Huxley', 'Ray Bradbury', 'Isaac Asimov']],
    ['Who wrote "Lord of the Flies"?', 'William Golding', ['J.R.R. Tolkien', 'C.S. Lewis', 'George Orwell']],
    ['Who wrote "The Old Man and the Sea"?', 'Ernest Hemingway', ['John Steinbeck', 'F. Scott Fitzgerald', 'William Faulkner']],
    ['Who wrote "Pride and Prejudice"?', 'Jane Austen', ['Charlotte Bronte', 'Emily Bronte', 'Mary Shelley']],
    ['Who wrote "A Tale of Two Cities"?', 'Charles Dickens', ['Jane Austen', 'Mark Twain', 'Oscar Wilde']],
    ['Who wrote "The Adventures of Tom Sawyer"?', 'Mark Twain', ['Charles Dickens', 'Ernest Hemingway', 'John Steinbeck']],
    ['Who wrote "Moby Dick"?', 'Herman Melville', ['Nathaniel Hawthorne', 'Edgar Allan Poe', 'Walt Whitman']],
    ['Who wrote "The Raven"?', 'Edgar Allan Poe', ['Herman Melville', 'Nathaniel Hawthorne', 'Walt Whitman']],
    ['Who wrote "Leaves of Grass"?', 'Walt Whitman', ['Emily Dickinson', 'Robert Frost', 'Edgar Allan Poe']],
    ['Who wrote "The Scarlet Letter"?', 'Nathaniel Hawthorne', ['Herman Melville', 'Edgar Allan Poe', 'Walt Whitman']],
    ['Who wrote "Frankenstein"?', 'Mary Shelley', ['Jane Austen', 'Charlotte Bronte', 'Emily Bronte']],
    ['Who wrote "Wuthering Heights"?', 'Emily Bronte', ['Charlotte Bronte', 'Jane Austen', 'Mary Shelley']],
    ['What is the setting of "Romeo and Juliet"?', 'Verona, Italy', ['London, England', 'Paris, France', 'Rome, Italy']],
    ['What is the setting of "The Great Gatsby"?', 'New York', ['Chicago', 'Los Angeles', 'Boston']],
    ['What is the setting of "To Kill a Mockingbird"?', 'Alabama', ['Mississippi', 'Georgia', 'Texas']],
    ['What is the setting of "Lord of the Flies"?', 'Desert island', ['City', 'Mountain', 'Forest']],
    ['What is the main theme of "1984"?', 'Totalitarianism', ['Love', 'War', 'Nature']],
  ];
  literature.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const grammar: [string, string, string[]][] = [
    ['What is the past tense of "go"?', 'Went', ['Goes', 'Going', 'Gone']],
    ['What is the past tense of "eat"?', 'Ate', ['Eats', 'Eating', 'Eaten']],
    ['What is the past tense of "run"?', 'Ran', ['Runs', 'Running', 'Runned']],
    ['What is the past tense of "sing"?', 'Sang', ['Sings', 'Singing', 'Sung']],
    ['What is the past tense of "write"?', 'Wrote', ['Writes', 'Writing', 'Written']],
    ['What is the past tense of "swim"?', 'Swam', ['Swims', 'Swimming', 'Swum']],
    ['What is the past tense of "drink"?', 'Drank', ['Drinks', 'Drinking', 'Drunk']],
    ['What is the past tense of "fly"?', 'Flew', ['Flies', 'Flying', 'Flown']],
    ['What is the past tense of "take"?', 'Took', ['Takes', 'Taking', 'Taken']],
    ['What is the past tense of "begin"?', 'Began', ['Begins', 'Beginning', 'Begun']],
    ['What is the past participle of "go"?', 'Gone', ['Went', 'Goes', 'Going']],
    ['What is the past participle of "eat"?', 'Eaten', ['Ate', 'Eats', 'Eating']],
    ['What is the past participle of "write"?', 'Written', ['Wrote', 'Writes', 'Writing']],
    ['What is the past participle of "sing"?', 'Sung', ['Sang', 'Sings', 'Singing']],
    ['What is the past participle of "drink"?', 'Drunk', ['Drank', 'Drinks', 'Drinking']],
    ['What is the plural of "child"?', 'Children', ['Childs', 'Childes', 'Childies']],
    ['What is the plural of "foot"?', 'Feet', ['Foots', 'Footes', 'Feets']],
    ['What is the plural of "tooth"?', 'Teeth', ['Tooths', 'Toothes', 'Teeths']],
    ['What is the plural of "mouse"?', 'Mice', ['Mouses', 'Mices', 'Mouse']],
    ['What is the plural of "goose"?', 'Geese', ['Gooses', 'Geese', 'Goosies']],
    ['What is the plural of "man"?', 'Men', ['Mans', 'Mens', 'Mans']],
    ['What is the plural of "woman"?', 'Women', ['Womans', 'Womens', 'Womans']],
    ['What is the plural of "ox"?', 'Oxen', ['Oxs', 'Oxes', 'Oxen']],
    ['What is the plural of "datum"?', 'Data', ['Datums', 'Data', 'Datae']],
    ['What is the plural of "criterion"?', 'Criteria', ['Criterions', 'Criteria', 'Criterion']],
    ['What is the comparative of "good"?', 'Better', ['Gooder', 'More good', 'Best']],
    ['What is the superlative of "good"?', 'Best', ['Better', 'Goodest', 'Most good']],
    ['What is the comparative of "bad"?', 'Worse', ['Badder', 'More bad', 'Worst']],
    ['What is the superlative of "bad"?', 'Worst', ['Worse', 'Baddest', 'Most bad']],
    ['What is the comparative of "far"?', 'Farther', ['Farer', 'More far', 'Farthest']],
    ['What is the superlative of "far"?', 'Farthest', ['Farther', 'Farest', 'Most far']],
  ];
  grammar.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const synonyms: [string, string, string[]][] = [
    ['Synonym of "abundant"?', 'Plentiful', ['Scarce', 'Rare', 'Empty']],
    ['Synonym of "courage"?', 'Bravery', ['Fear', 'Cowardice', 'Weakness']],
    ['Synonym of "diligent"?', 'Hardworking', ['Lazy', 'Tired', 'Slow']],
    ['Synonym of "eloquent"?', 'Fluent', ['Silent', 'Quiet', 'Shy']],
    ['Synonym of "frugal"?', 'Thrifty', ['Wasteful', 'Generous', 'Lavish']],
    ['Synonym of "genuine"?', 'Authentic', ['Fake', 'False', 'Artificial']],
    ['Synonym of "humble"?', 'Modest', ['Arrogant', 'Proud', 'Boastful']],
    ['Synonym of "intelligent"?', 'Smart', ['Dumb', 'Foolish', 'Stupid']],
    ['Synonym of "jeopardy"?', 'Danger', ['Safety', 'Security', 'Protection']],
    ['Synonym of "meticulous"?', 'Careful', ['Careless', 'Sloppy', 'Messy']],
    ['Synonym of "nostalgia"?', 'Homesickness', ['Excitement', 'Joy', 'Happiness']],
    ['Synonym of "obstinate"?', 'Stubborn', ['Flexible', 'Obedient', 'Compliant']],
    ['Synonym of "prudent"?', 'Wise', ['Foolish', 'Reckless', 'Careless']],
    ['Synonym of "quintessential"?', 'Perfect', ['Flawed', 'Broken', 'Incomplete']],
    ['Synonym of "resilient"?', 'Tough', ['Weak', 'Fragile', 'Delicate']],
    ['Synonym of "scrutinize"?', 'Examine', ['Ignore', 'Neglect', 'Overlook']],
    ['Synonym of "tedious"?', 'Boring', ['Exciting', 'Fun', 'Interesting']],
    ['Synonym of "vivid"?', 'Bright', ['Dull', 'Faint', 'Pale']],
    ['Synonym of "wary"?', 'Cautious', ['Reckless', 'Bold', 'Fearless']],
    ['Synonym of "zealous"?', 'Passionate', ['Apathetic', 'Lazy', 'Indifferent']],
  ];
  synonyms.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const antonyms: [string, string, string[]][] = [
    ['Antonym of "abundant"?', 'Scarce', ['Plentiful', 'Many', 'Full']],
    ['Antonym of "courage"?', 'Cowardice', ['Bravery', 'Boldness', 'Fearlessness']],
    ['Antonym of "diligent"?', 'Lazy', ['Hardworking', 'Active', 'Busy']],
    ['Antonym of "eloquent"?', 'Inarticulate', ['Fluent', 'Smooth', 'Expressive']],
    ['Antonym of "frugal"?', 'Wasteful', ['Thrifty', 'Saving', 'Careful']],
    ['Antonym of "genuine"?', 'Fake', ['Authentic', 'Real', 'True']],
    ['Antonym of "humble"?', 'Arrogant', ['Modest', 'Shy', 'Quiet']],
    ['Antonym of "intelligent"?', 'Stupid', ['Smart', 'Bright', 'Clever']],
    ['Antonym of "jeopardy"?', 'Safety', ['Danger', 'Risk', 'Peril']],
    ['Antonym of "meticulous"?', 'Careless', ['Careful', 'Precise', 'Exact']],
    ['Antonym of "obstinate"?', 'Flexible', ['Stubborn', 'Rigid', 'Firm']],
    ['Antonym of "prudent"?', 'Reckless', ['Wise', 'Careful', 'Sensible']],
    ['Antonym of "resilient"?', 'Fragile', ['Tough', 'Strong', 'Durable']],
    ['Antonym of "scrutinize"?', 'Ignore', ['Examine', 'Inspect', 'Analyze']],
    ['Antonym of "tedious"?', 'Exciting', ['Boring', 'Dull', 'Tiring']],
    ['Antonym of "vivid"?', 'Dull', ['Bright', 'Clear', 'Sharp']],
    ['Antonym of "wary"?', 'Reckless', ['Cautious', 'Careful', 'Alert']],
    ['Antonym of "zealous"?', 'Apathetic', ['Passionate', 'Eager', 'Enthusiastic']],
    ['Antonym of "generous"?', 'Stingy', ['Kind', 'Giving', 'Charitable']],
    ['Antonym of "victory"?', 'Defeat', ['Win', 'Success', 'Triumph']],
  ];
  antonyms.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const figuresOfSpeech: [string, string, string[]][] = [
    ['"The wind whispered through the trees" is an example of?', 'Personification', ['Simile', 'Metaphor', 'Hyperbole']],
    ['"Life is a journey" is an example of?', 'Metaphor', ['Simile', 'Personification', 'Hyperbole']],
    ['"She is as pretty as a flower" is an example of?', 'Simile', ['Metaphor', 'Personification', 'Hyperbole']],
    ['"I have told you a million times" is an example of?', 'Hyperbole', ['Simile', 'Metaphor', 'Personification']],
    ['"Buzz, hiss, cuckoo" are examples of?', 'Onomatopoeia', ['Alliteration', 'Assonance', 'Rhyme']],
    ['"Peter Piper picked a peck of pickled peppers" is an example of?', 'Alliteration', ['Onomatopoeia', 'Assonance', 'Rhyme']],
    ['"The fire crackled and popped" is an example of?', 'Onomatopoeia', ['Simile', 'Metaphor', 'Alliteration']],
    ['"Her smile was sunshine" is an example of?', 'Metaphor', ['Simile', 'Personification', 'Hyperbole']],
    ['"The leaves danced in the wind" is an example of?', 'Personification', ['Simile', 'Metaphor', 'Hyperbole']],
    ['"I am so hungry I could eat a horse" is an example of?', 'Hyperbole', ['Simile', 'Metaphor', 'Personification']],
  ];
  figuresOfSpeech.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const sentenceTypes: [string, string, string[]][] = [
    ['A sentence with one independent clause is called?', 'Simple sentence', ['Complex', 'Compound', 'Compound-complex']],
    ['A sentence with two independent clauses joined by a conjunction is?', 'Compound sentence', ['Simple', 'Complex', 'Compound-complex']],
    ['A sentence with one independent and one dependent clause is?', 'Complex sentence', ['Simple', 'Compound', 'Compound-complex']],
    ['A sentence with two independent and one dependent clause is?', 'Compound-complex sentence', ['Simple', 'Compound', 'Complex']],
    ['Which is a simple sentence?', 'The cat slept.', ['The cat slept, and the dog barked.', 'When the cat slept, the dog barked.', 'The cat slept, and the dog barked when the bird sang.']],
    ['Which is a compound sentence?', 'The cat slept, and the dog barked.', ['The cat slept.', 'When the cat slept, the dog barked.', 'The cat slept, and the dog barked when the bird sang.']],
    ['Which is a complex sentence?', 'When the cat slept, the dog barked.', ['The cat slept.', 'The cat slept, and the dog barked.', 'The cat slept, and the dog barked when the bird sang.']],
    ['What is the subject in "The boy kicked the ball"?', 'The boy', ['Kicked', 'The ball', 'Kicked the ball']],
    ['What is the predicate in "The boy kicked the ball"?', 'Kicked the ball', ['The boy', 'Kicked', 'The ball']],
    ['What is the direct object in "She wrote a letter"?', 'A letter', ['She', 'Wrote', 'She wrote']],
  ];
  sentenceTypes.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const vocab: [string, string, string[]][] = [
    ['What does "benevolent" mean?', 'Kind', ['Cruel', 'Selfish', 'Mean']],
    ['What does "malevolent" mean?', 'Evil', ['Kind', 'Good', 'Generous']],
    ['What does "ambiguous" mean?', 'Unclear', ['Clear', 'Specific', 'Definite']],
    ['What does "concise" mean?', 'Brief', ['Long', 'Wordy', 'Detailed']],
    ['What does "diligent" mean?', 'Hardworking', ['Lazy', 'Tired', 'Slow']],
    ['What does "ephemeral" mean?', 'Short-lived', ['Permanent', 'Eternal', 'Lasting']],
    ['What does "frugal" mean?', 'Thrifty', ['Wasteful', 'Generous', 'Lavish']],
    ['What does "gregarious" mean?', 'Sociable', ['Shy', 'Quiet', 'Introverted']],
    ['What does "haughty" mean?', 'Arrogant', ['Humble', 'Modest', 'Shy']],
    ['What does "impetuous" mean?', 'Impulsive', ['Careful', 'Cautious', 'Thoughtful']],
    ['What does "jovial" mean?', 'Merry', ['Sad', 'Serious', 'Gloomy']],
    ['What does "lethargic" mean?', 'Sluggish', ['Energetic', 'Active', 'Lively']],
    ['What does "meticulous" mean?', 'Careful', ['Careless', 'Sloppy', 'Messy']],
    ['What does "novice" mean?', 'Beginner', ['Expert', 'Master', 'Professional']],
    ['What does "obstinate" mean?', 'Stubborn', ['Flexible', 'Obedient', 'Compliant']],
    ['What does "prudent" mean?', 'Wise', ['Foolish', 'Reckless', 'Careless']],
    ['What does "quintessential" mean?', 'Perfect', ['Flawed', 'Broken', 'Incomplete']],
    ['What does "resilient" mean?', 'Tough', ['Weak', 'Fragile', 'Delicate']],
    ['What does "scrutinize" mean?', 'Examine', ['Ignore', 'Neglect', 'Overlook']],
    ['What does "tedious" mean?', 'Boring', ['Exciting', 'Fun', 'Interesting']],
  ];
  vocab.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const activePassive: [string, string, string[]][] = [
    ['What is the passive of "The boy kicked the ball"?', 'The ball was kicked by the boy', ['The boy kicks the ball', 'The ball kicks the boy', 'The boy was kicked by the ball']],
    ['What is the passive of "She wrote a letter"?', 'A letter was written by her', ['She writes a letter', 'A letter writes her', 'She was written by a letter']],
    ['What is the active of "The cake was eaten by John"?', 'John ate the cake', ['The cake eats John', 'John was eaten by the cake', 'The cake is eaten by John']],
    ['What is the active of "The book was read by Mary"?', 'Mary read the book', ['The book reads Mary', 'Mary was read by the book', 'The book is read by Mary']],
    ['In passive voice, the subject ___ the action.', 'Receives', ['Performs', 'Does', 'Makes']],
    ['In active voice, the subject ___ the action.', 'Performs', ['Receives', 'Gets', 'Takes']],
  ];
  activePassive.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const comprehension: [string, string, string[]][] = [
    ['What is the main idea of a story?', 'The central point', ['A minor detail', 'The setting', 'The title']],
    ['What is the setting of a story?', 'Time and place', ['The characters', 'The plot', 'The theme']],
    ['What is the climax of a story?', 'The turning point', ['The beginning', 'The end', 'The introduction']],
    ['What is the resolution of a story?', 'The ending', ['The beginning', 'The climax', 'The conflict']],
    ['What is foreshadowing?', 'Hints about future events', ['Past events', 'Current events', 'Unrelated events']],
    ['What is irony?', 'Opposite of what is expected', ['Exactly what is expected', 'Unrelated events', 'Random events']],
    ['What is symbolism?', 'Using objects to represent ideas', ['Using colors only', 'Using numbers only', 'Using words only']],
    ['What is a protagonist?', 'The main character', ['The villain', 'The setting', 'The theme']],
    ['What is an antagonist?', 'The opposing character', ['The main character', 'The setting', 'The theme']],
    ['What is a theme?', 'The central message', ['The setting', 'The characters', 'The plot']],
  ];
  comprehension.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const spelling: [string, string, string[]][] = [
    ['Which is correctly spelled?', 'Receive', ['Recieve', 'Receeve', 'Reseive']],
    ['Which is correctly spelled?', 'Friend', ['Freind', 'Freend', 'Frend']],
    ['Which is correctly spelled?', 'Because', ['Becouse', 'Becaus', 'Beacuse']],
    ['Which is correctly spelled?', 'Definitely', ['Definately', 'Definitly', 'Definatly']],
    ['Which is correctly spelled?', 'Separate', ['Seperate', 'Seperete', 'Separite']],
    ['Which is correctly spelled?', 'Restaurant', ['Resturant', 'Restarant', 'Resteraunt']],
    ['Which is correctly spelled?', 'Wednesday', ['Wensday', 'Wednsday', 'Wedday']],
    ['Which is correctly spelled?', 'February', ['Febuary', 'Febrary', 'Febuary']],
    ['Which is correctly spelled?', 'Library', ['Libary', 'Liberry', 'Librarie']],
    ['Which is correctly spelled?', 'Environment', ['Enviroment', 'Enviorment', 'Enviornment']],
  ];
  spelling.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const capitalization: [string, string, string[]][] = [
    ['Which should be capitalized?', 'Monday', ['apple', 'run', 'small']],
    ['Which should be capitalized?', 'Philippines', ['river', 'mountain', 'happy']],
    ['Which should be capitalized?', 'Maria', ['dog', 'cat', 'book']],
    ['Which should NOT be capitalized?', 'dog', ['January', 'Christmas', 'Manila']],
    ['Which should be capitalized?', 'English', ['water', 'desk', 'pencil']],
    ['Which should be capitalized?', 'Christmas', ['summer', 'winter', 'spring']],
    ['Which should be capitalized?', 'Pacific Ocean', ['river', 'lake', 'pond']],
    ['Which should NOT be capitalized?', 'summer', ['December', 'Friday', 'Japan']],
    ['Which should be capitalized?', 'Dr. Smith', ['doctor', 'teacher', 'farmer']],
    ['Which should be capitalized?', 'I', ['you', 'he', 'she']],
  ];
  capitalization.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const punctuation: [string, string, string[]][] = [
    ['What punctuation ends a statement?', 'Period (.)', ['Question mark', 'Exclamation', 'Comma']],
    ['What punctuation ends a question?', 'Question mark (?)', ['Period', 'Exclamation', 'Comma']],
    ['What punctuation shows strong emotion?', 'Exclamation (!)', ['Period', 'Comma', 'Question mark']],
    ['What punctuation separates items in a list?', 'Comma (,)', ['Period', 'Question mark', 'Exclamation']],
    ['What do we use to show possession?', 'Apostrophe (\')', ['Comma', 'Period', 'Hyphen']],
    ['What do we use to show someone is speaking?', 'Quotation marks', ['Comma', 'Period', 'Apostrophe']],
    ['What punctuation joins two independent clauses?', 'Semicolon (;)', ['Comma', 'Period', 'Colon']],
    ['What punctuation introduces a list?', 'Colon (:)', ['Semicolon', 'Comma', 'Period']],
    ['What punctuation shows a pause shorter than a period?', 'Comma (,)', ['Semicolon', 'Colon', 'Hyphen']],
    ['What punctuation is used in contractions?', 'Apostrophe (\')', ['Comma', 'Period', 'Hyphen']],
  ];
  punctuation.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== MATH ================================================

function mathQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  // Addition 2-digit (40)
  for (let a = 10; a <= 29; a++) {
    const b = Math.floor(a / 3) + 5;
    const sum = a + b;
    const wrongs = shuffle([sum + 1, sum - 1, sum + 2, sum + 3, sum - 2]).slice(0, 3).map(String);
    qs.push(makeQ(`${a} + ${b} = ?`, String(sum), wrongs));
  }

  // Addition 3-digit (40)
  for (let a = 100; a <= 139; a++) {
    const b = Math.floor(a / 5) + 10;
    const sum = a + b;
    const wrongs = shuffle([sum + 1, sum - 1, sum + 2, sum + 3, sum - 2]).slice(0, 3).map(String);
    qs.push(makeQ(`${a} + ${b} = ?`, String(sum), wrongs));
  }

  // Subtraction 2-digit (40)
  for (let a = 20; a <= 59; a++) {
    const b = Math.floor(a / 4) + 3;
    const diff = a - b;
    const wrongs = shuffle([diff + 1, diff - 1, diff + 2, diff + 3, diff - 2]).filter(x => x >= 0).slice(0, 3).map(String);
    qs.push(makeQ(`${a} - ${b} = ?`, String(diff), wrongs));
  }

  // Subtraction 3-digit (40)
  for (let a = 200; a <= 239; a++) {
    const b = Math.floor(a / 5) + 10;
    const diff = a - b;
    const wrongs = shuffle([diff + 1, diff - 1, diff + 2, diff + 3, diff - 2]).filter(x => x >= 0).slice(0, 3).map(String);
    qs.push(makeQ(`${a} - ${b} = ?`, String(diff), wrongs));
  }

  // Multiplication 1-12 tables (78)
  for (let a = 2; a <= 12; a++) {
    for (let b = a; b <= 12; b++) {
      const prod = a * b;
      const wrongs = shuffle([prod + 1, prod - 1, prod + 2, prod + a, prod - a]).filter(x => x >= 0).slice(0, 3).map(String);
      qs.push(makeQ(`${a} × ${b} = ?`, String(prod), wrongs));
    }
  }

  // Division (60)
  for (let a = 2; a <= 12; a++) {
    for (let b = 2; b <= 6; b++) {
      const prod = a * b;
      const wrongs = shuffle([b + 1, b - 1, b + 2, b + 3, b - 2]).filter(x => x >= 0 && x !== b).slice(0, 3).map(String);
      qs.push(makeQ(`${prod} ÷ ${a} = ?`, String(b), wrongs));
    }
  }

  // Fractions (40)
  const fractions: [string, string, string[]][] = [
    ['What is 1/2 + 1/4?', '3/4', ['1/6', '2/6', '1/8']],
    ['What is 1/3 + 1/6?', '1/2', ['1/9', '2/9', '1/18']],
    ['What is 2/3 + 1/3?', '1', ['5/6', '2/9', '3/6']],
    ['What is 3/4 - 1/4?', '1/2', ['1/6', '2/6', '1/8']],
    ['What is 1/2 - 1/4?', '1/4', ['1/6', '2/6', '1/8']],
    ['What is 2/3 × 3/4?', '1/2', ['6/12', '6/7', '5/12']],
    ['What is 1/2 × 1/3?', '1/6', ['1/5', '2/5', '1/4']],
    ['What is 3/4 × 4/5?', '3/5', ['7/9', '12/20', '7/20']],
    ['What is 1/2 ÷ 1/4?', '2', ['1/8', '1/6', '2/6']],
    ['What is 3/4 ÷ 1/2?', '3/2', ['3/8', '6/8', '4/6']],
    ['What is 2/3 ÷ 4/5?', '5/6', ['8/15', '10/12', '6/8']],
    ['What is 1/3 ÷ 1/6?', '2', ['1/18', '1/9', '2/9']],
    ['Simplify: 6/8', '3/4', ['2/3', '3/5', '4/5']],
    ['Simplify: 4/12', '1/3', ['1/4', '2/6', '3/4']],
    ['Simplify: 9/12', '3/4', ['1/2', '2/3', '3/5']],
    ['Simplify: 6/9', '2/3', ['1/3', '3/4', '1/2']],
    ['Simplify: 10/15', '2/3', ['1/3', '5/8', '3/5']],
    ['Simplify: 8/12', '2/3', ['1/3', '4/6', '3/4']],
    ['Simplify: 12/16', '3/4', ['1/2', '6/8', '2/3']],
    ['Simplify: 15/20', '3/4', ['1/2', '5/8', '3/5']],
    ['Which is bigger: 2/3 or 3/5?', '2/3', ['3/5', 'Same', 'Cannot tell']],
    ['Which is bigger: 3/4 or 2/3?', '3/4', ['2/3', 'Same', 'Cannot tell']],
    ['Which is bigger: 1/2 or 3/8?', '1/2', ['3/8', 'Same', 'Cannot tell']],
    ['Which is smaller: 2/5 or 1/3?', '1/3', ['2/5', 'Same', 'Cannot tell']],
    ['Convert 1/2 to decimal:', '0.5', ['0.25', '0.75', '0.1']],
    ['Convert 1/4 to decimal:', '0.25', ['0.5', '0.75', '0.1']],
    ['Convert 3/4 to decimal:', '0.75', ['0.5', '0.25', '0.1']],
    ['Convert 1/5 to decimal:', '0.2', ['0.5', '0.25', '0.1']],
    ['Convert 2/5 to decimal:', '0.4', ['0.5', '0.25', '0.2']],
    ['Convert 1/10 to decimal:', '0.1', ['0.5', '0.25', '0.01']],
    ['Convert 0.5 to fraction:', '1/2', ['1/4', '2/3', '5/10']],
    ['Convert 0.25 to fraction:', '1/4', ['1/2', '1/3', '25/100']],
    ['Convert 0.75 to fraction:', '3/4', ['1/2', '7/10', '75/100']],
    ['Convert 0.2 to fraction:', '1/5', ['1/2', '2/10', '1/4']],
    ['Convert 0.4 to fraction:', '2/5', ['1/2', '4/10', '1/4']],
    ['What is 25% of 80?', '20', ['15', '25', '40']],
    ['What is 10% of 50?', '5', ['10', '15', '20']],
    ['What is 50% of 60?', '30', ['20', '25', '35']],
    ['What is 20% of 100?', '20', ['10', '15', '25']],
    ['What is 75% of 40?', '30', ['20', '25', '35']],
  ];
  fractions.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Algebra (50)
  const algebra: [string, string, string[]][] = [
    ['If x + 5 = 12, what is x?', '7', ['5', '6', '8']],
    ['If x - 3 = 8, what is x?', '11', ['5', '10', '12']],
    ['If 2x = 10, what is x?', '5', ['3', '4', '6']],
    ['If x/2 = 6, what is x?', '12', ['8', '10', '14']],
    ['If 3x + 2 = 11, what is x?', '3', ['2', '4', '5']],
    ['If 2x - 5 = 9, what is x?', '7', ['5', '6', '8']],
    ['If x + 7 = 15, what is x?', '8', ['6', '7', '9']],
    ['If 4x = 24, what is x?', '6', ['4', '5', '8']],
    ['If x/3 = 5, what is x?', '15', ['10', '12', '18']],
    ['If 2x + 3 = 13, what is x?', '5', ['3', '4', '6']],
    ['If x - 8 = 2, what is x?', '10', ['8', '9', '12']],
    ['If 5x = 35, what is x?', '7', ['5', '6', '8']],
    ['If x/4 = 3, what is x?', '12', ['8', '10', '16']],
    ['If 3x - 4 = 11, what is x?', '5', ['3', '4', '6']],
    ['If 2(x + 1) = 10, what is x?', '4', ['3', '5', '6']],
    ['If x + x = 16, what is x?', '8', ['4', '6', '12']],
    ['If 3x + 3 = 18, what is x?', '5', ['3', '4', '6']],
    ['If x/5 = 2, what is x?', '10', ['5', '7', '15']],
    ['If 6x = 42, what is x?', '7', ['5', '6', '8']],
    ['If x - 10 = 0, what is x?', '10', ['0', '5', '20']],
    ['Simplify: 3(x + 2)', '3x + 6', ['3x + 2', 'x + 6', '3x + 5']],
    ['Simplify: 2(x - 3)', '2x - 6', ['2x - 3', 'x - 6', '2x - 5']],
    ['Simplify: 4(x + 1)', '4x + 4', ['4x + 1', 'x + 4', '4x + 5']],
    ['Simplify: 5(x - 2)', '5x - 10', ['5x - 2', 'x - 10', '5x - 5']],
    ['Simplify: 2(2x + 3)', '4x + 6', ['4x + 3', '2x + 6', '4x + 5']],
    ['Simplify: 3(3x - 1)', '9x - 3', ['9x - 1', '3x - 3', '9x - 2']],
    ['Simplify: x + x + x', '3x', ['3', 'x3', 'x + 3']],
    ['Simplify: 2x + 3x', '5x', ['6x', 'x5', 'x + 5']],
    ['Simplify: 7x - 2x', '5x', ['9x', '14x', 'x - 5']],
    ['Simplify: 4x + 2x - x', '5x', ['6x', '7x', '3x']],
    ['Simplify: 3(x + 2) - x', '2x + 6', ['3x + 6', '2x + 2', '4x + 6']],
    ['Simplify: 2(x - 1) + 3', '2x + 1', ['2x - 1', '2x + 3', '2x - 3']],
    ['Simplify: 4(x + 1) - 2', '4x + 2', ['4x - 1', '4x + 4', '4x + 3']],
    ['Simplify: 3(2x - 1) + 4', '6x + 1', ['6x - 1', '6x + 4', '6x + 3']],
    ['Simplify: 2(x + 3) - 2(x - 1)', '8', ['2x + 4', '4', '2x']],
    ['What is the slope of y = 2x + 3?', '2', ['3', '5', '1']],
    ['What is the y-intercept of y = 2x + 3?', '3', ['2', '5', '1']],
    ['What is the slope of y = -3x + 5?', '-3', ['5', '3', '-5']],
    ['What is the y-intercept of y = -3x + 5?', '5', ['3', '-3', '1']],
    ['What is the slope of y = x?', '1', ['0', '2', '-1']],
    ['What is the y-intercept of y = x?', '0', ['1', '2', '-1']],
    ['What is the slope of a horizontal line?', '0', ['1', 'Undefined', 'Infinity']],
    ['What is the slope of a vertical line?', 'Undefined', ['0', '1', 'Infinity']],
    ['If y = 2x + 1, what is y when x = 3?', '7', ['5', '6', '9']],
    ['If y = 3x - 2, what is y when x = 4?', '10', ['8', '12', '14']],
    ['If y = -x + 5, what is y when x = 2?', '3', ['5', '7', '1']],
    ['If y = x + 4, what is x when y = 10?', '6', ['4', '5', '14']],
    ['If y = 2x, what is y when x = 5?', '10', ['5', '15', '20']],
    ['If y = -2x + 8, what is y when x = 3?', '2', ['6', '14', '-2']],
    ['If y = 5x - 3, what is y when x = 0?', '-3', ['0', '5', '3']],
  ];
  algebra.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Geometry (40)
  const geometry: [string, string, string[]][] = [
    ['What is the sum of angles in a triangle?', '180°', ['90°', '360°', '270°']],
    ['What is the sum of angles in a quadrilateral?', '360°', ['180°', '270°', '540°']],
    ['What is the sum of angles in a pentagon?', '540°', ['360°', '720°', '180°']],
    ['What is the sum of angles in a hexagon?', '720°', ['540°', '900°', '360°']],
    ['What is the measure of each angle in an equilateral triangle?', '60°', ['90°', '45°', '30°']],
    ['What is the measure of each angle in a square?', '90°', ['60°', '45°', '120°']],
    ['What is the area of a triangle with base 6 and height 4?', '12', ['24', '10', '20']],
    ['What is the area of a triangle with base 10 and height 5?', '25', ['50', '15', '30']],
    ['What is the area of a rectangle with length 8 and width 5?', '40', ['13', '26', '30']],
    ['What is the area of a rectangle with length 12 and width 7?', '84', ['19', '38', '72']],
    ['What is the area of a square with side 9?', '81', ['18', '36', '90']],
    ['What is the area of a square with side 11?', '121', ['22', '44', '110']],
    ['What is the perimeter of a rectangle 10 by 4?', '28', ['14', '40', '20']],
    ['What is the perimeter of a rectangle 15 by 6?', '42', ['21', '90', '30']],
    ['What is the perimeter of a square with side 7?', '28', ['14', '49', '35']],
    ['What is the perimeter of a square with side 12?', '48', ['24', '144', '36']],
    ['What is the circumference of a circle with radius 5? (π=3.14)', '31.4', ['15.7', '25', '78.5']],
    ['What is the circumference of a circle with diameter 10? (π=3.14)', '31.4', ['15.7', '25', '78.5']],
    ['What is the area of a circle with radius 3? (π=3.14)', '28.26', ['9.42', '18.84', '12.56']],
    ['What is the area of a circle with radius 5? (π=3.14)', '78.5', ['31.4', '15.7', '25']],
    ['What is the volume of a cube with side 3?', '27', ['9', '12', '81']],
    ['What is the volume of a cube with side 4?', '64', ['16', '12', '256']],
    ['What is the volume of a rectangular prism 4×3×2?', '24', ['9', '12', '48']],
    ['What is the volume of a rectangular prism 5×4×3?', '60', ['12', '20', '120']],
    ['What is the Pythagorean theorem?', 'a² + b² = c²', ['a + b = c', 'a² - b² = c²', 'a × b = c²']],
    ['If a=3 and b=4, what is c in a right triangle?', '5', ['7', '12', '25']],
    ['If a=6 and b=8, what is c in a right triangle?', '10', ['14', '48', '100']],
    ['If a=5 and b=12, what is c in a right triangle?', '13', ['17', '60', '169']],
    ['If a=8 and b=15, what is c in a right triangle?', '17', ['23', '120', '289']],
    ['If a=9 and b=12, what is c in a right triangle?', '15', ['21', '108', '225']],
    ['What is the measure of a right angle?', '90°', ['45°', '60°', '180°']],
    ['What is the measure of a straight angle?', '180°', ['90°', '360°', '270°']],
    ['What is the measure of a full rotation?', '360°', ['180°', '270°', '90°']],
    ['What do you call a triangle with two equal sides?', 'Isosceles', ['Equilateral', 'Scalene', 'Right']],
    ['What do you call a triangle with all sides equal?', 'Equilateral', ['Isosceles', 'Scalene', 'Right']],
    ['What do you call a triangle with no equal sides?', 'Scalene', ['Equilateral', 'Isosceles', 'Right']],
    ['What do you call a triangle with a 90° angle?', 'Right triangle', ['Acute', 'Obtuse', 'Equilateral']],
    ['What do you call a triangle with all angles less than 90°?', 'Acute triangle', ['Right', 'Obtuse', 'Equilateral']],
    ['What do you call a triangle with one angle greater than 90°?', 'Obtuse triangle', ['Right', 'Acute', 'Equilateral']],
    ['What is π approximately equal to?', '3.14', ['2.71', '1.41', '1.73']],
  ];
  geometry.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Integers and operations (40)
  const integers: [string, string, string[]][] = [
    ['What is -5 + 3?', '-2', ['2', '-8', '8']],
    ['What is -7 + (-3)?', '-10', ['4', '-4', '10']],
    ['What is -8 - 3?', '-11', ['5', '-5', '11']],
    ['What is -8 - (-3)?', '-5', ['11', '-11', '5']],
    ['What is -4 × 3?', '-12', ['12', '-7', '7']],
    ['What is -5 × (-2)?', '10', ['-10', '7', '-7']],
    ['What is -12 ÷ 3?', '-4', ['4', '-36', '36']],
    ['What is -15 ÷ (-5)?', '3', ['-3', '-20', '20']],
    ['What is |-7|?', '7', ['-7', '0', '14']],
    ['What is |-12|?', '12', ['-12', '0', '24']],
    ['What is |5|?', '5', ['-5', '0', '10']],
    ['What is |0|?', '0', ['1', '-1', 'undefined']],
    ['Which is greater: -3 or -7?', '-3', ['-7', 'Same', 'Cannot tell']],
    ['Which is greater: -1 or 0?', '0', ['-1', 'Same', 'Cannot tell']],
    ['Which is less: -5 or -2?', '-5', ['-2', 'Same', 'Cannot tell']],
    ['What is -2 + 2?', '0', ['4', '-4', '2']],
    ['What is -10 + 10?', '0', ['20', '-20', '100']],
    ['What is -6 × 0?', '0', ['-6', '6', 'undefined']],
    ['What is -3 × (-3)?', '9', ['-9', '6', '-6']],
    ['What is -20 ÷ (-4)?', '5', ['-5', '16', '-16']],
    ['What is 5 + (-8)?', '-3', ['3', '13', '-13']],
    ['What is 10 + (-15)?', '-5', ['5', '25', '-25']],
    ['What is -3 - (-7)?', '4', ['-10', '10', '-4']],
    ['What is 8 - (-2)?', '10', ['6', '-10', '-6']],
    ['What is -(-5)?', '5', ['-5', '0', '10']],
    ['What is -(-(-3))?', '-3', ['3', '0', '-9']],
    ['What is (-2)²?', '4', ['-4', '2', '-2']],
    ['What is (-3)²?', '9', ['-9', '3', '-3']],
    ['What is (-2)³?', '-8', ['8', '-6', '6']],
    ['What is (-1)¹⁰⁰?', '1', ['-1', '0', '100']],
    ['What is (-1)⁹⁹?', '-1', ['1', '0', '99']],
    ['What is -2²?', '-4', ['4', '-2', '2']],
    ['What is -(3²)?', '-9', ['9', '-3', '3']],
    ['What is (-3)²?', '9', ['-9', '3', '-3']],
    ['What is -5 + 8?', '3', ['13', '-13', '-3']],
    ['What is -9 + 4?', '-5', ['5', '13', '-13']],
    ['What is -7 × (-6)?', '42', ['-42', '13', '-13']],
    ['What is -48 ÷ 6?', '-8', ['8', '-42', '42']],
    ['What is -100 ÷ (-10)?', '10', ['-10', '100', '-100']],
  ];
  integers.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Ratios and proportions (30)
  const ratios: [string, string, string[]][] = [
    ['What is the ratio of 3 to 6 in simplest form?', '1:2', ['3:6', '2:3', '1:3']],
    ['What is the ratio of 4 to 8 in simplest form?', '1:2', ['4:8', '2:3', '1:4']],
    ['What is the ratio of 10 to 15 in simplest form?', '2:3', ['10:15', '3:2', '1:2']],
    ['What is the ratio of 12 to 18 in simplest form?', '2:3', ['12:18', '3:2', '1:2']],
    ['If 2/3 = x/9, what is x?', '6', ['3', '4', '8']],
    ['If 3/4 = x/16, what is x?', '12', ['4', '8', '10']],
    ['If 5/6 = x/12, what is x?', '10', ['6', '8', '11']],
    ['If 1/2 = 5/x, what is x?', '10', ['5', '2', '20']],
    ['If 3/5 = 9/x, what is x?', '15', ['5', '10', '20']],
    ['If 4/7 = x/21, what is x?', '12', ['7', '10', '14']],
    ['Solve: 2:3 = x:12', '8', ['6', '10', '4']],
    ['Solve: 5:8 = x:24', '15', ['10', '12', '20']],
    ['Solve: 3:7 = x:21', '9', ['7', '10', '12']],
    ['Solve: 4:5 = x:20', '16', ['10', '15', '12']],
    ['Solve: 7:3 = x:9', '21', ['7', '14', '18']],
    ['A recipe uses 2 cups of flour for 3 cups of sugar. How much flour for 9 cups of sugar?', '6 cups', ['3 cups', '4 cups', '12 cups']],
    ['A map has a scale of 1:100. If the map distance is 5 cm, what is the real distance?', '500 cm', ['50 cm', '100 cm', '1000 cm']],
    ['A map has a scale of 1:1000. If the real distance is 5000 cm, what is the map distance?', '5 cm', ['50 cm', '500 cm', '10 cm']],
    ['If 3 apples cost 15 pesos, how much do 5 apples cost?', '25 pesos', ['10 pesos', '20 pesos', '30 pesos']],
    ['If 4 pens cost 20 pesos, how much does 1 pen cost?', '5 pesos', ['4 pesos', '6 pesos', '10 pesos']],
    ['If 2 kg of rice costs 50 pesos, how much does 5 kg cost?', '125 pesos', ['100 pesos', '150 pesos', '250 pesos']],
    ['If 3 workers finish a job in 6 hours, how long would 6 workers take?', '3 hours', ['12 hours', '2 hours', '9 hours']],
    ['If 5 books cost 100 pesos, how much do 3 books cost?', '60 pesos', ['50 pesos', '70 pesos', '30 pesos']],
    ['If a car travels 60 km in 1 hour, how far in 3 hours?', '180 km', ['60 km', '120 km', '240 km']],
    ['If a car travels 120 km in 2 hours, what is its speed?', '60 km/h', ['30 km/h', '120 km/h', '240 km/h']],
    ['If 8 oranges cost 40 pesos, how much do 6 oranges cost?', '30 pesos', ['20 pesos', '35 pesos', '48 pesos']],
    ['If 2/3 of a class are boys and there are 12 boys, how many students total?', '18', ['8', '16', '24']],
    ['If 3/5 of a group are girls and there are 15 girls, how many total?', '25', ['9', '20', '30']],
    ['If 25% of a number is 10, what is the number?', '40', ['25', '35', '100']],
    ['If 10% of a number is 5, what is the number?', '50', ['15', '25', '100']],
  ];
  ratios.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Statistics (30)
  const stats: [string, string, string[]][] = [
    ['What is the mean of 2, 4, 6, 8, 10?', '6', ['5', '7', '8']],
    ['What is the mean of 5, 10, 15, 20?', '12.5', ['10', '15', '12']],
    ['What is the mean of 1, 3, 5, 7, 9?', '5', ['3', '7', '4']],
    ['What is the median of 2, 4, 6, 8, 10?', '6', ['4', '8', '5']],
    ['What is the median of 1, 3, 5, 7?', '4', ['3', '5', '6']],
    ['What is the median of 5, 10, 15, 20, 25?', '15', ['10', '20', '12.5']],
    ['What is the mode of 2, 2, 3, 4, 5?', '2', ['3', '4', '5']],
    ['What is the mode of 1, 1, 2, 2, 2, 3?', '2', ['1', '3', '1 and 2']],
    ['What is the mode of 5, 5, 5, 6, 6, 7?', '5', ['6', '7', '5 and 6']],
    ['What is the range of 3, 7, 2, 9, 5?', '7', ['5', '9', '2']],
    ['What is the range of 10, 20, 30, 40?', '30', ['10', '20', '40']],
    ['What is the range of 1, 5, 10, 15, 20?', '19', ['5', '10', '20']],
    ['What is the mean of 10, 20, 30?', '20', ['10', '30', '15']],
    ['What is the median of 10, 20, 30?', '20', ['10', '30', '15']],
    ['What is the mean of 4, 8, 12, 16, 20?', '12', ['8', '10', '16']],
    ['What is the median of 4, 8, 12, 16, 20?', '12', ['8', '10', '16']],
    ['What is the mode of 3, 4, 4, 5, 6?', '4', ['3', '5', '6']],
    ['What is the range of 100, 200, 300?', '200', ['100', '300', '150']],
    ['What is the mean of 50, 60, 70, 80?', '65', ['60', '70', '62.5']],
    ['What is the median of 50, 60, 70, 80?', '65', ['60', '70', '62.5']],
    ['What is the mean of 1, 2, 3, 4, 5, 6?', '3.5', ['3', '4', '3.5']],
    ['What is the median of 1, 2, 3, 4, 5, 6?', '3.5', ['3', '4', '3.5']],
    ['What is the mode of 7, 7, 8, 8, 9?', '7 and 8', ['7', '8', '9']],
    ['What is the range of 7, 7, 8, 8, 9?', '2', ['1', '9', '7']],
    ['What is the mean of 2, 4, 6?', '4', ['2', '6', '3']],
    ['What is the median of 2, 4, 6?', '4', ['2', '6', '3']],
    ['What is the mean of 100, 200, 300, 400, 500?', '300', ['200', '250', '350']],
    ['What is the median of 100, 200, 300, 400, 500?', '300', ['200', '250', '350']],
    ['What is the range of 100, 200, 300, 400, 500?', '400', ['100', '300', '500']],
    ['What is the mode of 1, 2, 3, 4, 5?', 'No mode', ['1', '3', '5']],
  ];
  stats.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== SCIENCE ==============================================

function scienceQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const biology: [string, string, string[]][] = [
    ['What is the basic unit of life?', 'Cell', ['Atom', 'Molecule', 'Tissue']],
    ['What organelle is the powerhouse of the cell?', 'Mitochondria', ['Nucleus', 'Ribosome', 'Golgi body']],
    ['What organelle controls the cell?', 'Nucleus', ['Mitochondria', 'Ribosome', 'Golgi body']],
    ['What process do plants use to make food?', 'Photosynthesis', ['Respiration', 'Digestion', 'Transpiration']],
    ['What gas do plants take in for photosynthesis?', 'Carbon dioxide', ['Oxygen', 'Nitrogen', 'Hydrogen']],
    ['What gas do plants release during photosynthesis?', 'Oxygen', ['Carbon dioxide', 'Nitrogen', 'Hydrogen']],
    ['What is the process of cell division?', 'Mitosis', ['Meiosis', 'Fusion', 'Fission']],
    ['How many chromosomes do humans have?', '46', ['23', '44', '48']],
    ['What is DNA?', 'Deoxyribonucleic acid', ['Ribonucleic acid', 'Protein', 'Carbohydrate']],
    ['What is RNA?', 'Ribonucleic acid', ['Deoxyribonucleic acid', 'Protein', 'Lipid']],
    ['What is the process of making RNA from DNA?', 'Transcription', ['Translation', 'Replication', 'Mutation']],
    ['What is the process of making protein from RNA?', 'Translation', ['Transcription', 'Replication', 'Mutation']],
    ['What are the building blocks of proteins?', 'Amino acids', ['Nucleotides', 'Sugars', 'Fatty acids']],
    ['What are the building blocks of DNA?', 'Nucleotides', ['Amino acids', 'Sugars', 'Fatty acids']],
    ['What kingdom do humans belong to?', 'Animalia', ['Plantae', 'Fungi', 'Protista']],
    ['What kingdom do plants belong to?', 'Plantae', ['Animalia', 'Fungi', 'Protista']],
    ['What kingdom do mushrooms belong to?', 'Fungi', ['Animalia', 'Plantae', 'Protista']],
    ['What is the largest organ in the human body?', 'Skin', ['Liver', 'Brain', 'Heart']],
    ['What organ pumps blood?', 'Heart', ['Lungs', 'Brain', 'Liver']],
    ['What organ helps you breathe?', 'Lungs', ['Heart', 'Brain', 'Stomach']],
    ['What organ helps you think?', 'Brain', ['Heart', 'Lungs', 'Stomach']],
    ['What organ digests food?', 'Stomach', ['Heart', 'Lungs', 'Brain']],
    ['What organ filters blood?', 'Kidneys', ['Heart', 'Lungs', 'Brain']],
    ['What organ stores bile?', 'Gallbladder', ['Liver', 'Pancreas', 'Spleen']],
    ['What organ produces insulin?', 'Pancreas', ['Liver', 'Kidney', 'Spleen']],
    ['What is the largest gland in the body?', 'Liver', ['Pancreas', 'Thyroid', 'Pituitary']],
    ['How many bones does an adult human have?', '206', ['100', '300', '500']],
    ['How many teeth does an adult human have?', '32', ['20', '28', '40']],
    ['What is the longest bone in the body?', 'Femur', ['Skull', 'Arm', 'Finger']],
    ['What is the smallest bone in the body?', 'Stapes', ['Femur', 'Rib', 'Finger']],
    ['What type of blood cells fight infection?', 'White blood cells', ['Red blood cells', 'Platelets', 'Plasma']],
    ['What type of blood cells carry oxygen?', 'Red blood cells', ['White blood cells', 'Platelets', 'Plasma']],
    ['What type of blood cells help clotting?', 'Platelets', ['Red blood cells', 'White blood cells', 'Plasma']],
    ['What is the liquid part of blood called?', 'Plasma', ['Serum', 'Water', 'Lymph']],
    ['What is the main function of the respiratory system?', 'Breathing', ['Digestion', 'Circulation', 'Movement']],
    ['What is the main function of the digestive system?', 'Digestion', ['Breathing', 'Circulation', 'Movement']],
    ['What is the main function of the circulatory system?', 'Circulation', ['Breathing', 'Digestion', 'Movement']],
    ['What is the main function of the nervous system?', 'Control', ['Breathing', 'Digestion', 'Circulation']],
    ['What is the main function of the skeletal system?', 'Support', ['Breathing', 'Digestion', 'Circulation']],
    ['What is the main function of the muscular system?', 'Movement', ['Breathing', 'Digestion', 'Circulation']],
  ];
  biology.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const chemistry: [string, string, string[]][] = [
    ['What is the smallest unit of matter?', 'Atom', ['Molecule', 'Cell', 'Particle']],
    ['What is the center of an atom called?', 'Nucleus', ['Electron', 'Proton', 'Neutron']],
    ['What particles orbit the nucleus?', 'Electrons', ['Protons', 'Neutrons', 'Molecules']],
    ['What particle has a positive charge?', 'Proton', ['Electron', 'Neutron', 'Molecule']],
    ['What particle has a negative charge?', 'Electron', ['Proton', 'Neutron', 'Molecule']],
    ['What particle has no charge?', 'Neutron', ['Proton', 'Electron', 'Molecule']],
    ['What is the atomic number of hydrogen?', '1', ['2', '6', '8']],
    ['What is the atomic number of carbon?', '6', ['1', '8', '12']],
    ['What is the atomic number of oxygen?', '8', ['1', '6', '16']],
    ['What is the chemical symbol for water?', 'H2O', ['CO2', 'O2', 'NaCl']],
    ['What is the chemical symbol for carbon dioxide?', 'CO2', ['H2O', 'O2', 'NaCl']],
    ['What is the chemical symbol for oxygen?', 'O2', ['H2O', 'CO2', 'NaCl']],
    ['What is the chemical symbol for sodium chloride?', 'NaCl', ['H2O', 'CO2', 'O2']],
    ['What is the chemical symbol for gold?', 'Au', ['Ag', 'Gd', 'Go']],
    ['What is the chemical symbol for silver?', 'Ag', ['Au', 'Si', 'Sv']],
    ['What is the chemical symbol for iron?', 'Fe', ['Ir', 'I', 'Fr']],
    ['What is the chemical symbol for copper?', 'Cu', ['Co', 'Cp', 'Cu']],
    ['What is the chemical symbol for helium?', 'He', ['H', 'Ho', 'He']],
    ['What is the pH of pure water?', '7', ['0', '14', '1']],
    ['What is the pH of an acid?', 'Less than 7', ['7', 'More than 7', '14']],
    ['What is the pH of a base?', 'More than 7', ['7', 'Less than 7', '0']],
    ['What is the most abundant gas in the atmosphere?', 'Nitrogen', ['Oxygen', 'Carbon dioxide', 'Hydrogen']],
    ['What is the second most abundant gas in the atmosphere?', 'Oxygen', ['Nitrogen', 'Carbon dioxide', 'Hydrogen']],
    ['What gas do we breathe in?', 'Oxygen', ['Carbon dioxide', 'Nitrogen', 'Hydrogen']],
    ['What gas do we breathe out?', 'Carbon dioxide', ['Oxygen', 'Nitrogen', 'Hydrogen']],
    ['What is the most abundant element in the universe?', 'Hydrogen', ['Oxygen', 'Carbon', 'Helium']],
    ['What is the second most abundant element in the universe?', 'Helium', ['Hydrogen', 'Oxygen', 'Carbon']],
    ['What is the most abundant element in Earth\'s crust?', 'Oxygen', ['Silicon', 'Aluminum', 'Iron']],
    ['What is the second most abundant element in Earth\'s crust?', 'Silicon', ['Oxygen', 'Aluminum', 'Iron']],
    ['What do you call a substance that cannot be broken down?', 'Element', ['Compound', 'Mixture', 'Solution']],
    ['What do you call two or more elements chemically combined?', 'Compound', ['Mixture', 'Element', 'Solution']],
    ['What do you call two or more substances physically combined?', 'Mixture', ['Compound', 'Element', 'Solution']],
    ['What is the process of a solid turning into a liquid?', 'Melting', ['Freezing', 'Boiling', 'Condensing']],
    ['What is the process of a liquid turning into a gas?', 'Evaporation', ['Melting', 'Freezing', 'Condensing']],
    ['What is the process of a gas turning into a liquid?', 'Condensation', ['Melting', 'Evaporation', 'Freezing']],
    ['What is the process of a liquid turning into a solid?', 'Freezing', ['Melting', 'Evaporation', 'Condensing']],
    ['What is the universal solvent?', 'Water', ['Alcohol', 'Oil', 'Vinegar']],
    ['What is the chemical formula for table salt?', 'NaCl', ['H2O', 'CO2', 'KCl']],
    ['What is the chemical formula for baking soda?', 'NaHCO3', ['NaCl', 'H2O', 'CO2']],
    ['What is the chemical formula for vinegar?', 'CH3COOH', ['NaCl', 'H2O', 'CO2']],
    ['What is rust?', 'Iron oxide', ['Iron sulfide', 'Iron chloride', 'Iron nitrate']],
  ];
  chemistry.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const physics: [string, string, string[]][] = [
    ['What is the unit of force?', 'Newton', ['Joule', 'Watt', 'Pascal']],
    ['What is the unit of energy?', 'Joule', ['Newton', 'Watt', 'Pascal']],
    ['What is the unit of power?', 'Watt', ['Newton', 'Joule', 'Pascal']],
    ['What is the unit of pressure?', 'Pascal', ['Newton', 'Joule', 'Watt']],
    ['What is the unit of electric current?', 'Ampere', ['Volt', 'Ohm', 'Watt']],
    ['What is the unit of voltage?', 'Volt', ['Ampere', 'Ohm', 'Watt']],
    ['What is the unit of resistance?', 'Ohm', ['Ampere', 'Volt', 'Watt']],
    ['What is the speed of light?', '300,000 km/s', ['150,000 km/s', '30,000 km/s', '3,000 km/s']],
    ['What is the acceleration due to gravity on Earth?', '9.8 m/s²', ['8.9 m/s²', '10.8 m/s²', '9.8 m/s']],
    ['What is Newton\'s first law?', 'Law of inertia', ['Law of acceleration', 'Law of action-reaction', 'Law of gravity']],
    ['What is Newton\'s second law?', 'F = ma', ['F = mv', 'F = m/a', 'F = a/m']],
    ['What is Newton\'s third law?', 'Action-reaction', ['Inertia', 'Acceleration', 'Gravity']],
    ['What is the law of conservation of energy?', 'Energy cannot be created or destroyed', ['Energy can be created', 'Energy can be destroyed', 'Energy is always lost']],
    ['What is the law of conservation of mass?', 'Mass cannot be created or destroyed', ['Mass can be created', 'Mass can be destroyed', 'Mass is always lost']],
    ['What type of energy is stored in a battery?', 'Chemical energy', ['Kinetic', 'Potential', 'Thermal']],
    ['What type of energy is in a moving object?', 'Kinetic energy', ['Potential', 'Chemical', 'Thermal']],
    ['What type of energy is in a stretched spring?', 'Potential energy', ['Kinetic', 'Chemical', 'Thermal']],
    ['What type of energy is heat?', 'Thermal energy', ['Kinetic', 'Potential', 'Chemical']],
    ['What is the formula for speed?', 'Distance ÷ time', ['Time ÷ distance', 'Distance × time', 'Distance + time']],
    ['What is the formula for acceleration?', 'Change in velocity ÷ time', ['Velocity × time', 'Velocity + time', 'Time ÷ velocity']],
    ['What is the formula for force?', 'Mass × acceleration', ['Mass ÷ acceleration', 'Mass + acceleration', 'Acceleration ÷ mass']],
    ['What is the formula for work?', 'Force × distance', ['Force ÷ distance', 'Force + distance', 'Distance ÷ force']],
    ['What is the formula for power?', 'Work ÷ time', ['Work × time', 'Work + time', 'Time ÷ work']],
    ['What is the formula for pressure?', 'Force ÷ area', ['Force × area', 'Force + area', 'Area ÷ force']],
    ['What is the formula for density?', 'Mass ÷ volume', ['Mass × volume', 'Mass + volume', 'Volume ÷ mass']],
    ['What is the density of water?', '1 g/cm³', ['0.5 g/cm³', '2 g/cm³', '10 g/cm³']],
    ['What happens to an object in a vacuum?', 'No air resistance', ['More air resistance', 'Falls slower', 'Floats']],
    ['What is the SI unit of length?', 'Meter', ['Foot', 'Inch', 'Yard']],
    ['What is the SI unit of mass?', 'Kilogram', ['Pound', 'Ounce', 'Ton']],
    ['What is the SI unit of time?', 'Second', ['Minute', 'Hour', 'Day']],
    ['What is the SI unit of temperature?', 'Kelvin', ['Celsius', 'Fahrenheit', 'Rankine']],
    ['What is 0°C in Kelvin?', '273.15 K', ['0 K', '32 K', '100 K']],
    ['What is 100°C in Kelvin?', '373.15 K', ['100 K', '273 K', '212 K']],
    ['What is the freezing point of water in Celsius?', '0°C', ['32°C', '100°C', '273°C']],
    ['What is the boiling point of water in Celsius?', '100°C', ['0°C', '32°C', '212°C']],
    ['What is the freezing point of water in Fahrenheit?', '32°F', ['0°F', '100°F', '212°F']],
    ['What is the boiling point of water in Fahrenheit?', '212°F', ['32°F', '100°F', '0°F']],
    ['What type of circuit has one path for current?', 'Series circuit', ['Parallel', 'Mixed', 'Open']],
    ['What type of circuit has multiple paths for current?', 'Parallel circuit', ['Series', 'Mixed', 'Open']],
    ['What happens to current in a series circuit?', 'Same everywhere', ['Different', 'Increases', 'Decreases']],
    ['What happens to voltage in a parallel circuit?', 'Same everywhere', ['Different', 'Increases', 'Decreases']],
  ];
  physics.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const earthScience: [string, string, string[]][] = [
    ['What is the 3rd planet from the sun?', 'Earth', ['Mars', 'Venus', 'Jupiter']],
    ['What is the largest planet?', 'Jupiter', ['Earth', 'Saturn', 'Neptune']],
    ['What is the smallest planet?', 'Mercury', ['Mars', 'Venus', 'Pluto']],
    ['What planet is known as the Red Planet?', 'Mars', ['Venus', 'Jupiter', 'Saturn']],
    ['What planet has rings?', 'Saturn', ['Earth', 'Mars', 'Mercury']],
    ['How many planets are in our solar system?', '8', ['7', '9', '10']],
    ['What is Earth\'s natural satellite?', 'Moon', ['Sun', 'Mars', 'ISS']],
    ['What is the closest star to Earth?', 'Sun', ['Moon', 'Polaris', 'Sirius']],
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
    ['What is the water cycle?', 'Evaporation and rain', ['Day and night', 'Hot and cold', 'Sun and moon']],
    ['What are the three main types of rocks?', 'Igneous, sedimentary, metamorphic', ['Hard, soft, medium', 'Big, small, tiny', 'Red, blue, green']],
    ['What type of rock forms from cooled lava?', 'Igneous', ['Sedimentary', 'Metamorphic', 'Sandstone']],
    ['What type of rock forms from compressed sediments?', 'Sedimentary', ['Igneous', 'Metamorphic', 'Granite']],
    ['What type of rock forms from heat and pressure?', 'Metamorphic', ['Igneous', 'Sedimentary', 'Limestone']],
    ['What is the outermost layer of the Earth?', 'Crust', ['Mantle', 'Core', 'Surface']],
    ['What is the thickest layer of the Earth?', 'Mantle', ['Crust', 'Core', 'Surface']],
    ['What are the pieces of the Earth\'s crust called?', 'Tectonic plates', ['Rocks', 'Continents', 'Mountains']],
    ['What happens when tectonic plates collide?', 'Earthquakes and mountains', ['Nothing', 'Ocean forms', 'Volcanoes erupt']],
    ['What is a tsunami?', 'Large ocean wave', ['Small wave', 'Wind storm', 'Earthquake']],
    ['What is the Richter scale used for?', 'Measuring earthquakes', ['Measuring temperature', 'Measuring wind', 'Measuring rain']],
    ['What is the Mohs scale used for?', 'Measuring mineral hardness', ['Measuring temperature', 'Measuring wind', 'Measuring rain']],
    ['What is the hardest mineral?', 'Diamond', ['Quartz', 'Gold', 'Iron']],
    ['What is the softest mineral?', 'Talc', ['Quartz', 'Gold', 'Diamond']],
    ['What is the most abundant mineral in Earth\'s crust?', 'Quartz', ['Gold', 'Diamond', 'Talc']],
    ['What is the largest desert in the world?', 'Antarctica', ['Sahara', 'Gobi', 'Kalahari']],
    ['What is the largest country in the world?', 'Russia', ['China', 'USA', 'Canada']],
    ['What is the smallest country in the world?', 'Vatican City', ['Monaco', 'Maldives', 'Malta']],
    ['What is the longest river in the world?', 'Nile', ['Amazon', 'Mississippi', 'Yangtze']],
    ['What is the largest rainforest?', 'Amazon', ['Congo', 'Southeast Asia', 'Madagascar']],
    ['What is the deepest ocean trench?', 'Mariana Trench', ['Philippine Trench', 'Java Trench', 'Tonga Trench']],
  ];
  earthScience.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== ARALIN PANLIPUNAN ===================================

function aralingPanlipunanQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const asianHistory: [string, string, string[]][] = [
    ['What is the oldest civilization in the world?', 'Mesopotamia', ['Egypt', 'China', 'India']],
    ['What river was crucial to Egyptian civilization?', 'Nile', ['Tigris', 'Euphrates', 'Indus']],
    ['What river was crucial to Mesopotamian civilization?', 'Tigris and Euphrates', ['Nile', 'Indus', 'Yangtze']],
    ['What river was crucial to Chinese civilization?', 'Yangtze', ['Nile', 'Tigris', 'Indus']],
    ['What river was crucial to Indian civilization?', 'Indus', ['Nile', 'Tigris', 'Yangtze']],
    ['Who was the first emperor of China?', 'Qin Shi Huang', ['Mao Zedong', 'Kublai Khan', 'Genghis Khan']],
    ['Who built the Great Wall of China?', 'Qin Shi Huang', ['Mao Zedong', 'Kublai Khan', 'Genghis Khan']],
    ['Who was the Mongol leader who conquered much of Asia?', 'Genghis Khan', ['Qin Shi Huang', 'Kublai Khan', 'Mao Zedong']],
    ['Who founded the Mauryan Empire in India?', 'Chandragupta Maurya', ['Ashoka', 'Buddha', 'Gandhi']],
    ['Who spread Buddhism across Asia?', 'Ashoka', ['Chandragupta', 'Buddha', 'Gandhi']],
    ['Who was the founder of Buddhism?', 'Siddhartha Gautama', ['Ashoka', 'Confucius', 'Lao Tzu']],
    ['Who was the founder of Confucianism?', 'Confucius', ['Buddha', 'Lao Tzu', 'Mencius']],
    ['Who was the founder of Taoism?', 'Lao Tzu', ['Buddha', 'Confucius', 'Mencius']],
    ['What was the Silk Road?', 'Trade route', ['River', 'Mountain', 'Wall']],
    ['What dynasty built the Great Wall?', 'Qin Dynasty', ['Han Dynasty', 'Ming Dynasty', 'Tang Dynasty']],
    ['What was the largest empire in history?', 'Mongol Empire', ['Roman Empire', 'British Empire', 'Ottoman Empire']],
    ['Who was the last emperor of China?', 'Puyi', ['Qin Shi Huang', 'Mao Zedong', 'Kublai Khan']],
    ['What country was never colonized in Asia?', 'Thailand', ['Philippines', 'India', 'Vietnam']],
    ['What was the capital of the Mongol Empire?', 'Karakorum', ['Beijing', 'Samarkand', 'Ulaanbaatar']],
    ['Who founded the Mughal Empire in India?', 'Babur', ['Akbar', 'Shah Jahan', 'Aurangzeb']],
  ];
  asianHistory.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const philippineHistory: [string, string, string[]][] = [
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
    ['Who was the hero known as the "Sublime Paralytic"?', 'Apolinario Mabini', ['Jose Rizal', 'Andres Bonifacio', 'Antonio Luna']],
    ['What is the date of Rizal Day?', 'December 30', ['June 12', 'July 4', 'August 21']],
    ['What is the date of Bonifacio Day?', 'November 30', ['December 30', 'June 12', 'July 4']],
    ['Who was the youngest general of the revolution?', 'Gregorio del Pilar', ['Antonio Luna', 'Emilio Aguinaldo', 'Miguel Malvar']],
    ['What is the oldest stone church in the Philippines?', 'San Agustin Church', ['Manila Cathedral', 'Quiapo Church', 'Binondo Church']],
    ['Who was the "Great Plebeian"?', 'Andres Bonifacio', ['Jose Rizal', 'Apolinario Mabini', 'Emilio Aguinaldo']],
    ['Who was the "Hero of Tirad Pass"?', 'Gregorio del Pilar', ['Antonio Luna', 'Emilio Aguinaldo', 'Miguel Malvar']],
    ['Who painted the "Spoliarium"?', 'Juan Luna', ['Fernando Amorsolo', 'Carlos Francisco', 'Jose Rizal']],
    ['Who composed the "Lupang Hinirang"?', 'Julian Felipe', ['Francisco Balagtas', 'Levi Celerio', 'Nicanor Abelardo']],
    ['Who wrote the lyrics of "Lupang Hinirang"?', 'Jose Palma', ['Julian Felipe', 'Francisco Balagtas', 'Levi Celerio']],
    ['What is the oldest city in the Philippines?', 'Cebu', ['Manila', 'Davao', 'Iloilo']],
    ['Who was the first Filipino saint?', 'San Lorenzo Ruiz', ['San Pedro Bautista', 'San Vicente Liem', 'San Eustaquio']],
    ['What was the name of Rizal\'s first novel?', 'Noli Me Tangere', ['El Filibusterismo', 'El Filibusterismo', 'Mi Ultimo Adios']],
    ['What was the name of Rizal\'s second novel?', 'El Filibusterismo', ['Noli Me Tangere', 'Mi Ultimo Adios', 'Noli Me Tangere']],
    ['What is the last poem Rizal wrote?', 'Mi Ultimo Adios', ['Noli Me Tangere', 'El Filibusterismo', 'Kartilya']],
  ];
  philippineHistory.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const geography: [string, string, string[]][] = [
    ['What is the capital of the Philippines?', 'Manila', ['Cebu', 'Davao', 'Quezon City']],
    ['What is the largest city in the Philippines?', 'Quezon City', ['Manila', 'Davao', 'Cebu']],
    ['What are the three main island groups?', 'Luzon, Visayas, Mindanao', ['North, South, East', 'Big, Medium, Small', '1, 2, 3']],
    ['What is the largest island in the Philippines?', 'Luzon', ['Mindanao', 'Visayas', 'Palawan']],
    ['What sea is to the west of the Philippines?', 'West Philippine Sea', ['Pacific Ocean', 'Sulu Sea', 'Celebes Sea']],
    ['What ocean is to the east of the Philippines?', 'Pacific Ocean', ['Atlantic', 'Indian', 'Arctic']],
    ['What is the longest river in the Philippines?', 'Cagayan River', ['Pasig River', 'Pampanga River', 'Agusan River']],
    ['What is the highest mountain in the Philippines?', 'Mount Apo', ['Mount Pulag', 'Mount Mayon', 'Mount Pinatubo']],
    ['What famous volcano has a perfect cone shape?', 'Mount Mayon', ['Mount Pinatubo', 'Mount Taal', 'Mount Apo']],
    ['What province is known as the "Rice Granary of the Philippines"?', 'Nueva Ecija', ['Pampanga', 'Tarlac', 'Bulacan']],
    ['What is the "Summer Capital of the Philippines"?', 'Baguio City', ['Manila', 'Cebu', 'Davao']],
    ['What region is known for chocolate hills?', 'Bohol', ['Cebu', 'Palawan', 'Boracay']],
    ['What island is Boracay on?', 'Panay', ['Luzon', 'Mindanao', 'Cebu']],
    ['How many provinces does the Philippines have?', '82', ['50', '100', '75']],
    ['What is the "Pearl of the Orient Seas"?', 'Philippines', ['Japan', 'Indonesia', 'Thailand']],
    ['Which province is known for underground river?', 'Palawan', ['Cebu', 'Bohol', 'Davao']],
    ['What is the capital of Japan?', 'Tokyo', ['Osaka', 'Kyoto', 'Nagoya']],
    ['What is the capital of China?', 'Beijing', ['Shanghai', 'Guangzhou', 'Shenzhen']],
    ['What is the capital of South Korea?', 'Seoul', ['Busan', 'Incheon', 'Daegu']],
    ['What is the capital of Thailand?', 'Bangkok', ['Chiang Mai', 'Phuket', 'Pattaya']],
  ];
  geography.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const economics: [string, string, string[]][] = [
    ['What is the study of how people use resources?', 'Economics', ['Geography', 'History', 'Politics']],
    ['What do we call the money you earn from working?', 'Income', ['Expense', 'Debt', 'Loan']],
    ['What do we call spending money?', 'Expense', ['Income', 'Savings', 'Profit']],
    ['What do we call money you keep for later?', 'Savings', ['Expense', 'Debt', 'Income']],
    ['What do we call a person who starts a business?', 'Entrepreneur', ['Employee', 'Customer', 'Student']],
    ['What do we call things people need to live?', 'Needs', ['Wants', 'Desires', 'Wishes']],
    ['What do we call things people would like to have?', 'Wants', ['Needs', 'Musts', 'Requirements']],
    ['What do we call giving money to help others?', 'Charity', ['Business', 'Trade', 'Shopping']],
    ['What do we call trading one thing for another?', 'Barter', ['Buy', 'Sell', 'Save']],
    ['What do we call a person who works for someone else?', 'Employee', ['Boss', 'Owner', 'Customer']],
    ['What is the currency of the Philippines?', 'Peso', ['Dollar', 'Yen', 'Euro']],
    ['What is the currency of Japan?', 'Yen', ['Dollar', 'Peso', 'Euro']],
    ['What is the currency of the USA?', 'Dollar', ['Peso', 'Yen', 'Euro']],
    ['What is the currency of Europe?', 'Euro', ['Dollar', 'Peso', 'Yen']],
    ['What do we call a place where people buy and sell?', 'Market', ['School', 'Hospital', 'Park']],
    ['What is the main source of income for the Philippines?', 'Services', ['Agriculture', 'Manufacturing', 'Mining']],
    ['What is the main agricultural product of the Philippines?', 'Rice', ['Wheat', 'Corn', 'Barley']],
    ['What is the main export of the Philippines?', 'Electronics', ['Rice', 'Fish', 'Wood']],
    ['What do you call the total value of goods and services produced in a country?', 'GDP', ['GNI', 'GNP', 'NDP']],
    ['What do you call the percentage of people without jobs?', 'Unemployment rate', ['Inflation', 'GDP', 'Tax rate']],
  ];
  economics.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const government: [string, string, string[]][] = [
    ['What is the national anthem of the Philippines?', 'Lupang Hinirang', ['Bayang Magiliw', 'Pilipinas Kong Mahal', 'Ako ay Pilipino']],
    ['What is the national bird of the Philippines?', 'Philippine Eagle', ['Maya', 'Rooster', 'Parrot']],
    ['What is the national flower?', 'Sampaguita', ['Rose', 'Ilang-ilang', 'Waling-waling']],
    ['What is the national tree?', 'Narra', ['Acacia', 'Balete', 'Kawayan']],
    ['What is the national animal?', 'Carabao', ['Horse', 'Cow', 'Goat']],
    ['What is the national fruit?', 'Mangga', ['Saging', 'Niyog', 'Pinya']],
    ['What is the national sport?', 'Arnis', ['Basketball', 'Sipa', 'Boxing']],
    ['What are the three branches of government?', 'Executive, Legislative, Judicial', ['Police, Army, Navy', 'President, VP, Senate', 'House, Senate, Court']],
    ['Who is the head of state?', 'President', ['Vice President', 'Senate President', 'Chief Justice']],
    ['How many years is a president\'s term?', '6', ['3', '4', '5']],
    ['How many senators are there?', '24', ['12', '36', '50']],
    ['What is the legislative body called?', 'Congress', ['Cabinet', 'Supreme Court', 'Senate only']],
    ['Where does the president live?', 'Malacanang Palace', ['Congress', 'Supreme Court', 'Senate']],
    ['What is the supreme law of the land?', 'Constitution', ['President', 'Congress', 'Supreme Court']],
    ['At what age can you vote?', '18', ['16', '21', '25']],
    ['What is the smallest unit of government in the Philippines?', 'Barangay', ['City', 'Province', 'Region']],
    ['What do you call the person who leads a barangay?', 'Barangay Captain', ['Mayor', 'Governor', 'President']],
    ['How many regions does the Philippines have?', '17', ['10', '15', '20']],
    ['What is the "Pearl of the Orient Seas"?', 'Philippines', ['Japan', 'Indonesia', 'Thailand']],
    ['What is the old name of the Philippines?', 'Las Islas Filipinas', ['Maharlika', 'LUZVIMIN', 'Pearl Islands']],
  ];
  government.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== TLE ================================================

function tleQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const cooking: [string, string, string[]][] = [
    ['What do you call the process of cooking food in hot oil?', 'Frying', ['Boiling', 'Baking', 'Steaming']],
    ['What do you call the process of cooking food in water?', 'Boiling', ['Frying', 'Baking', 'Steaming']],
    ['What do you call the process of cooking food in an oven?', 'Baking', ['Frying', 'Boiling', 'Steaming']],
    ['What do you call the process of cooking food with steam?', 'Steaming', ['Frying', 'Boiling', 'Baking']],
    ['What do you call the process of cooking food over an open flame?', 'Grilling', ['Frying', 'Boiling', 'Baking']],
    ['What do you call the process of cooking food slowly in liquid?', 'Stewing', ['Frying', 'Baking', 'Grilling']],
    ['What do you call the process of cooking food in a covered pot with little liquid?', 'Braising', ['Frying', 'Boiling', 'Baking']],
    ['What do you call the process of cooking food on a flat surface?', 'Pan-frying', ['Boiling', 'Baking', 'Steaming']],
    ['What do you call the process of cooking food in a microwave?', 'Microwaving', ['Frying', 'Boiling', 'Baking']],
    ['What do you call the process of preserving food with salt?', 'Curing', ['Boiling', 'Baking', 'Steaming']],
    ['What is the main ingredient in bread?', 'Flour', ['Sugar', 'Salt', 'Water']],
    ['What is the main ingredient in cake?', 'Flour', ['Sugar', 'Eggs', 'Butter']],
    ['What is the main ingredient in soup?', 'Liquid', ['Salt', 'Pepper', 'Flour']],
    ['What is the main ingredient in salad?', 'Vegetables', ['Meat', 'Fish', 'Rice']],
    ['What is the main ingredient in rice?', 'Rice grains', ['Water', 'Salt', 'Oil']],
    ['What temperature should a refrigerator be set at?', '4°C or below', ['10°C', '20°C', '0°C']],
    ['What temperature should a freezer be set at?', '-18°C or below', ['0°C', '4°C', '10°C']],
    ['What is the danger zone for food temperature?', '4°C to 60°C', ['0°C to 4°C', '60°C to 100°C', '10°C to 20°C']],
    ['How long can food be left at room temperature?', '2 hours max', ['1 hour', '4 hours', '8 hours']],
    ['What is the first step in washing dishes?', 'Scrape off food', ['Rinse', 'Soap', 'Dry']],
  ];
  cooking.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const sewing: [string, string, string[]][] = [
    ['What do you call the craft of attaching objects using stitches?', 'Sewing', ['Knitting', 'Crocheting', 'Weaving']],
    ['What tool is used to cut fabric?', 'Scissors', ['Needle', 'Thread', 'Pin']],
    ['What tool is used to push thread through fabric?', 'Needle', ['Scissors', 'Pin', 'Ruler']],
    ['What is the long, thin strand used for sewing?', 'Thread', ['Needle', 'Pin', 'Fabric']],
    ['What do you call the pattern of stitches?', 'Stitch', ['Knot', 'Loop', 'Weave']],
    ['What do you call the edge of fabric that prevents unraveling?', 'Hem', ['Seam', 'Stitch', 'Knot']],
    ['What do you call the line where two pieces of fabric are joined?', 'Seam', ['Hem', 'Stitch', 'Knot']],
    ['What do you call a temporary stitch used to hold fabric in place?', 'Basting stitch', ['Running stitch', 'Back stitch', 'Cross stitch']],
    ['What do you call a permanent stitch used for seams?', 'Running stitch', ['Basting stitch', 'Back stitch', 'Cross stitch']],
    ['What do you call a strong stitch used for durability?', 'Back stitch', ['Basting stitch', 'Running stitch', 'Cross stitch']],
    ['What tool is used to measure fabric?', 'Tape measure', ['Scissors', 'Needle', 'Thread']],
    ['What tool is used to mark fabric?', 'Tailor\'s chalk', ['Scissors', 'Needle', 'Thread']],
    ['What tool is used to hold fabric in place while sewing?', 'Pins', ['Scissors', 'Needle', 'Thread']],
    ['What tool is used to remove stitches?', 'Seam ripper', ['Scissors', 'Needle', 'Pins']],
    ['What do you call a piece of fabric used to cover a button?', 'Buttonhole', ['Hem', 'Seam', 'Stitch']],
  ];
  sewing.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const agriculture: [string, string, string[]][] = [
    ['What do you call the science of farming?', 'Agriculture', ['Biology', 'Botany', 'Geology']],
    ['What is the main crop grown in the Philippines?', 'Rice', ['Wheat', 'Corn', 'Barley']],
    ['What is the process of preparing soil for planting?', 'Tilling', ['Harvesting', 'Watering', 'Fertilizing']],
    ['What is the process of gathering crops?', 'Harvesting', ['Tilling', 'Planting', 'Watering']],
    ['What is the process of adding nutrients to soil?', 'Fertilizing', ['Tilling', 'Harvesting', 'Planting']],
    ['What is the process of supplying water to crops?', 'Irrigation', ['Tilling', 'Harvesting', 'Fertilizing']],
    ['What is the process of removing weeds?', 'Weeding', ['Tilling', 'Harvesting', 'Planting']],
    ['What is the process of planting seeds?', 'Sowing', ['Tilling', 'Harvesting', 'Watering']],
    ['What is the process of growing plants from seeds?', 'Germination', ['Tilling', 'Harvesting', 'Fertilizing']],
    ['What is the process of growing plants without soil?', 'Hydroponics', ['Tilling', 'Harvesting', 'Fertilizing']],
    ['What do you call a young plant?', 'Seedling', ['Seed', 'Tree', 'Branch']],
    ['What do you call the main root of a plant?', 'Taproot', ['Fibrous root', 'Adventitious root', 'Aerial root']],
    ['What do you call the process of cross-breeding plants?', 'Hybridization', ['Tilling', 'Harvesting', 'Planting']],
    ['What do you call a plant that lives for one year?', 'Annual', ['Biennial', 'Perennial', 'Ephemeral']],
    ['What do you call a plant that lives for two years?', 'Biennial', ['Annual', 'Perennial', 'Ephemeral']],
  ];
  agriculture.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const ict: [string, string, string[]][] = [
    ['What does ICT stand for?', 'Information and Communication Technology', ['Internet and Computer Technology', 'International Communication Tech', 'Integrated Computer Technology']],
    ['What does CPU stand for?', 'Central Processing Unit', ['Computer Personal Unit', 'Central Process Unit', 'Computer Processing Unit']],
    ['What does RAM stand for?', 'Random Access Memory', ['Read Access Memory', 'Random Access Module', 'Read Access Module']],
    ['What does ROM stand for?', 'Read Only Memory', ['Random Only Memory', 'Read Output Memory', 'Random Output Memory']],
    ['What does URL stand for?', 'Uniform Resource Locator', ['Universal Resource Locator', 'Uniform Reference Locator', 'Universal Reference Locator']],
    ['What does HTTP stand for?', 'HyperText Transfer Protocol', ['HyperText Transmission Protocol', 'High Transfer Text Protocol', 'Hyper Transfer Text Protocol']],
    ['What does WWW stand for?', 'World Wide Web', ['World Web Wide', 'Web World Wide', 'Wide World Web']],
    ['What is the brain of a computer?', 'CPU', ['RAM', 'ROM', 'Hard drive']],
    ['What stores data permanently?', 'Hard drive', ['RAM', 'CPU', 'Cache']],
    ['What stores data temporarily?', 'RAM', ['Hard drive', 'CPU', 'ROM']],
    ['What is the software that manages a computer?', 'Operating system', ['Application', 'Driver', 'Utility']],
    ['What is the most common operating system?', 'Windows', ['Linux', 'macOS', 'Android']],
    ['What is open-source software?', 'Software with freely available source code', ['Paid software', 'Closed software', 'Proprietary software']],
    ['What is a computer virus?', 'Malicious software', ['Helpful software', 'Hardware', 'Operating system']],
    ['What is an IP address?', 'Internet Protocol address', ['Internet Provider address', 'Internal Protocol address', 'Internet Protocol adapter']],
  ];
  ict.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const entrepreneurship: [string, string, string[]][] = [
    ['What is entrepreneurship?', 'Starting and running a business', ['Working for someone', 'Buying products', 'Selling products']],
    ['What is a business plan?', 'A document outlining business goals', ['A marketing strategy', 'A financial report', 'A product list']],
    ['What is profit?', 'Revenue minus expenses', ['Revenue plus expenses', 'Expenses minus revenue', 'Revenue only']],
    ['What is revenue?', 'Money earned from sales', ['Money spent', 'Money saved', 'Money borrowed']],
    ['What is a target market?', 'The group of customers for a product', ['The competitors', 'The suppliers', 'The employees']],
    ['What is marketing?', 'Promoting and selling products', ['Making products', 'Buying products', 'Using products']],
    ['What is a brand?', 'A name or symbol identifying a product', ['A product', 'A price', 'A store']],
    ['What is a monopoly?', 'One company controls the market', ['Many companies compete', 'Government controls market', 'No market exists']],
    ['What is a partnership?', 'A business owned by two or more people', ['A business owned by one person', 'A business owned by government', 'A business owned by shareholders']],
    ['What is a corporation?', 'A business owned by shareholders', ['A business owned by one person', 'A business owned by two people', 'A business owned by government']],
    ['What is a sole proprietorship?', 'A business owned by one person', ['A business owned by two people', 'A business owned by shareholders', 'A business owned by government']],
    ['What is an investment?', 'Putting money into something to earn a return', ['Spending money', 'Saving money', 'Borrowing money']],
    ['What is a loan?', 'Borrowed money that must be repaid', ['Gift money', 'Earned money', 'Saved money']],
    ['What is interest?', 'The cost of borrowing money', ['The cost of saving money', 'The cost of spending money', 'The cost of investing money']],
    ['What is a budget?', 'A plan for spending and saving', ['A list of products', 'A marketing plan', 'A business plan']],
  ];
  entrepreneurship.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== MAPEH ===============================================

function mapehQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const music: [string, string, string[]][] = [
    ['What do you call the highness or lowness of a sound?', 'Pitch', ['Volume', 'Tone', 'Rhythm']],
    ['What do you call the loudness or softness of a sound?', 'Dynamics', ['Pitch', 'Tone', 'Rhythm']],
    ['What do you call the pattern of beats in music?', 'Rhythm', ['Pitch', 'Dynamics', 'Melody']],
    ['What do you call a sequence of single notes in music?', 'Melody', ['Rhythm', 'Harmony', 'Dynamics']],
    ['What do you call two or more notes played together?', 'Chord', ['Melody', 'Rhythm', 'Pitch']],
    ['What do you call the combination of notes played together?', 'Harmony', ['Melody', 'Rhythm', 'Pitch']],
    ['How many beats does a whole note get?', '4', ['1', '2', '3']],
    ['How many beats does a half note get?', '2', ['1', '3', '4']],
    ['How many beats does a quarter note get?', '1', ['2', '3', '4']],
    ['How many beats does an eighth note get?', '0.5', ['1', '2', '0.25']],
    ['How many lines are on a musical staff?', '5', ['4', '6', '7']],
    ['How many spaces are on a musical staff?', '4', ['3', '5', '6']],
    ['What clef is used for high-pitched instruments?', 'Treble clef', ['Bass clef', 'Alto clef', 'Tenor clef']],
    ['What clef is used for low-pitched instruments?', 'Bass clef', ['Treble clef', 'Alto clef', 'Tenor clef']],
    ['What do you call the speed of music?', 'Tempo', ['Pitch', 'Dynamics', 'Rhythm']],
    ['What do you call a symbol that raises a note by a half step?', 'Sharp', ['Flat', 'Natural', 'Rest']],
    ['What do you call a symbol that lowers a note by a half step?', 'Flat', ['Sharp', 'Natural', 'Rest']],
    ['What do you call a symbol that cancels a sharp or flat?', 'Natural', ['Sharp', 'Flat', 'Rest']],
    ['What do you call a silence in music?', 'Rest', ['Sharp', 'Flat', 'Natural']],
    ['What is the Italian term for "slow"?', 'Lento', ['Presto', 'Allegro', 'Moderato']],
  ];
  music.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const arts: [string, string, string[]][] = [
    ['What do you call the art of drawing or painting?', 'Visual arts', ['Music', 'Dance', 'Theater']],
    ['What do you call the art of making objects from clay?', 'Pottery', ['Painting', 'Sculpture', 'Weaving']],
    ['What do you call the art of carving stone or wood?', 'Sculpture', ['Painting', 'Pottery', 'Weaving']],
    ['What do you call the art of making fabric from thread?', 'Weaving', ['Painting', 'Pottery', 'Sculpture']],
    ['What do you call the art of taking photographs?', 'Photography', ['Painting', 'Pottery', 'Sculpture']],
    ['What do you call the primary colors?', 'Red, blue, yellow', ['Green, orange, purple', 'Black, white, gray', 'Red, green, blue']],
    ['What do you get when you mix red and blue?', 'Purple', ['Green', 'Orange', 'Brown']],
    ['What do you get when you mix red and yellow?', 'Orange', ['Green', 'Purple', 'Brown']],
    ['What do you get when you mix blue and yellow?', 'Green', ['Orange', 'Purple', 'Brown']],
    ['What do you get when you mix all primary colors?', 'Brown', ['White', 'Black', 'Gray']],
    ['What do you call colors opposite each other on the color wheel?', 'Complementary colors', ['Primary colors', 'Secondary colors', 'Tertiary colors']],
    ['What do you call colors next to each other on the color wheel?', 'Analogous colors', ['Complementary colors', 'Primary colors', 'Secondary colors']],
    ['What do you call the lightness or darkness of a color?', 'Value', ['Hue', 'Intensity', 'Saturation']],
    ['What do you call the pure color?', 'Hue', ['Value', 'Intensity', 'Saturation']],
    ['What do you call the brightness of a color?', 'Intensity', ['Hue', 'Value', 'Tone']],
  ];
  arts.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const pe: [string, string, string[]][] = [
    ['What does PE stand for?', 'Physical Education', ['Physical Exercise', 'Personal Education', 'Physical Endurance']],
    ['How many players are on a basketball team?', '5', ['6', '7', '11']],
    ['How many players are on a volleyball team?', '6', ['5', '7', '11']],
    ['How many players are on a soccer team?', '11', ['5', '6', '7']],
    ['How many players are on a baseball team?', '9', ['5', '6', '11']],
    ['What sport uses a racket and a shuttlecock?', 'Badminton', ['Tennis', 'Table tennis', 'Squash']],
    ['What sport uses a racket and a small ball?', 'Tennis', ['Badminton', 'Table tennis', 'Squash']],
    ['What sport is played in a pool?', 'Swimming', ['Diving', 'Water polo', 'Rowing']],
    ['What sport is known as "the beautiful game"?', 'Soccer', ['Basketball', 'Volleyball', 'Tennis']],
    ['What sport is the national sport of the Philippines?', 'Arnis', ['Basketball', 'Boxing', 'Sipa']],
    ['What is the benefit of regular exercise?', 'Improved health', ['Weight gain', 'Less energy', 'Poor sleep']],
    ['How many minutes of exercise should children get daily?', '60', ['30', '45', '90']],
    ['What should you do before exercising?', 'Warm up', ['Cool down', 'Stretch after', 'Eat a big meal']],
    ['What should you do after exercising?', 'Cool down', ['Warm up', 'Eat a big meal', 'Sleep']],
    ['What should you drink during exercise?', 'Water', ['Soda', 'Coffee', 'Juice']],
  ];
  pe.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const health: [string, string, string[]][] = [
    ['How many times a day should you brush your teeth?', '2', ['1', '3', '5']],
    ['What should you do before eating?', 'Wash hands', ['Run', 'Sleep', 'Watch TV']],
    ['What should you drink plenty of every day?', 'Water', ['Soda', 'Juice', 'Coffee']],
    ['How many hours of sleep should a teenager get?', '8-10', ['3-4', '5-6', '12-14']],
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
    ['What is the leading cause of death worldwide?', 'Heart disease', ['Cancer', 'Diabetes', 'Accidents']],
    ['What is a balanced diet?', 'Eating from all food groups', ['Eating only meat', 'Eating only vegetables', 'Eating only fruits']],
    ['What is stress?', 'Mental or emotional strain', ['Physical injury', 'Bacterial infection', 'Viral infection']],
    ['What is the best way to prevent disease?', 'Wash hands', ['Eat candy', 'Watch TV', 'Sleep all day']],
    ['What is mental health?', 'Emotional well-being', ['Physical fitness', 'Dental health', 'Eye health']],
  ];
  health.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== BUILD AND EXPORT =====================================

const GENERATORS: Record<JuniorHighSubject, () => QuizQuestion[]> = {
  Filipino: filipinoQuestions,
  English: englishQuestions,
  Math: mathQuestions,
  Science: scienceQuestions,
  'Aralin Panlipunan': aralingPanlipunanQuestions,
  TLE: tleQuestions,
  MAPEH: mapehQuestions,
};

const bankCache: Partial<Record<JuniorHighSubject, QuizQuestion[]>> = {};

function buildSubjectBank(subject: JuniorHighSubject): QuizQuestion[] {
  if (bankCache[subject]) return bankCache[subject]!;
  const bank = GENERATORS[subject]();
  bankCache[subject] = bank;
  return bank;
}

export function getJuniorHighSubjectSize(subject: JuniorHighSubject): number {
  return buildSubjectBank(subject).length;
}

export function pickJuniorHighQuestions(subject: JuniorHighSubject, count: number): QuizQuestion[] {
  const bank = buildSubjectBank(subject);
  const n = Math.min(count, bank.length);
  return shuffle(bank).slice(0, n);
}
