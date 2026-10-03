import type { QuizQuestion } from '@/types';
import { shuffle } from '@/lib/gameData';

export const SENIOR_HIGH_SUBJECTS = [
  'Oral Communication', 'Komunikasyon at Pananaliksik', 'General Mathematics', 'Statistics and Probability',
  'Earth and Life Science', 'Physical Science', '21st Century Literature', 'Contemporary Philippine Arts',
] as const;
export type SeniorHighSubject = (typeof SENIOR_HIGH_SUBJECTS)[number];

function makeQ(q: string, correct: string, wrongs: string[]): QuizQuestion {
  const options = shuffle([correct, ...wrongs]);
  return { q, options, answer: options.indexOf(correct) };
}

function threeWrong(pool: string[], exclude: string): string[] {
  return shuffle(pool.filter(x => x !== exclude)).slice(0, 3);
}

// ===================== ORAL COMMUNICATION ==================================

function oralCommunicationQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const commModels: [string, string, string[]][] = [
    ['Who created the Shannon-Weaver model of communication?', 'Claude Shannon', ['Aristotle', 'David Berlo', 'Wilbur Schramm']],
    ['What is the sender in the Shannon-Weaver model?', 'Information source', ['Channel', 'Receiver', 'Noise']],
    ['What is the channel in the Shannon-Weaver model?', 'Medium of transmission', ['Sender', 'Receiver', 'Noise']],
    ['What is noise in the Shannon-Weaver model?', 'Interference', ['Sender', 'Receiver', 'Channel']],
    ['Who created the SMCR model of communication?', 'David Berlo', ['Claude Shannon', 'Aristotle', 'Wilbur Schramm']],
    ['What does S stand for in the SMCR model?', 'Source', ['Sender', 'Signal', 'Speaker']],
    ['What does M stand for in the SMCR model?', 'Message', ['Medium', 'Meaning', 'Method']],
    ['What does C stand for in the SMCR model?', 'Channel', ['Code', 'Content', 'Context']],
    ['What does R stand for in the SMCR model?', 'Receiver', ['Response', 'Result', 'Reading']],
    ['Who created the transactional model of communication?', 'Wilbur Schramm', ['Claude Shannon', 'David Berlo', 'Aristotle']],
    ['What is feedback in communication?', 'Response to a message', ['Noise', 'Channel', 'Sender']],
    ['What is encoding in communication?', 'Converting ideas into messages', ['Receiving messages', 'Sending noise', 'Ignoring messages']],
    ['What is decoding in communication?', 'Interpreting messages', ['Sending messages', 'Creating noise', 'Ignoring messages']],
    ['What is the Aristotle model of communication?', 'Speaker-Speech-Audience', ['Sender-Receiver', 'Source-Message', 'Encoder-Decoder']],
    ['What is the Lasswell model of communication?', 'Who says what in which channel to whom with what effect', ['Sender-Receiver', 'Source-Message-Channel', 'Speaker-Speech-Audience']],
    ['What is intrapersonal communication?', 'Communication with oneself', ['Communication with one person', 'Communication in groups', 'Communication with machines']],
    ['What is interpersonal communication?', 'Communication between two people', ['Communication with oneself', 'Communication in large groups', 'Communication with machines']],
    ['What is small group communication?', 'Communication among 3-15 people', ['Communication between two people', 'Communication with oneself', 'Communication to a large audience']],
    ['What is public communication?', 'One person speaks to a large audience', ['Communication between two people', 'Communication with oneself', 'Communication in small groups']],
    ['What is mass communication?', 'Communication to a very large audience through media', ['Communication between two people', 'Communication with oneself', 'Communication in small groups']],
  ];
  commModels.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const speechTypes: [string, string, string[]][] = [
    ['What type of speech is delivered with little or no preparation?', 'Impromptu speech', ['Manuscript speech', 'Memorized speech', 'Extemporaneous speech']],
    ['What type of speech is read word for word?', 'Manuscript speech', ['Impromptu speech', 'Memorized speech', 'Extemporaneous speech']],
    ['What type of speech is delivered from memory?', 'Memorized speech', ['Impromptu speech', 'Manuscript speech', 'Extemporaneous speech']],
    ['What type of speech is prepared but delivered with notes?', 'Extemporaneous speech', ['Impromptu speech', 'Manuscript speech', 'Memorized speech']],
    ['What is the purpose of an informative speech?', 'To give information', ['To persuade', 'To entertain', 'To commemorate']],
    ['What is the purpose of a persuasive speech?', 'To convince the audience', ['To inform', 'To entertain', 'To commemorate']],
    ['What is the purpose of an entertainment speech?', 'To amuse the audience', ['To inform', 'To persuade', 'To commemorate']],
    ['What is the purpose of a commemorative speech?', 'To honor someone', ['To inform', 'To persuade', 'To entertain']],
    ['What is the introduction of a speech?', 'The opening', ['The body', 'The conclusion', 'The transition']],
    ['What is the body of a speech?', 'The main content', ['The opening', 'The conclusion', 'The transition']],
    ['What is the conclusion of a speech?', 'The closing', ['The opening', 'The body', 'The transition']],
    ['What is a thesis statement?', 'The main idea of the speech', ['A supporting detail', 'The introduction', 'The conclusion']],
    ['What is a transition in a speech?', 'A bridge between ideas', ['The opening', 'The conclusion', 'The main point']],
    ['What is eye contact in speech delivery?', 'Looking at the audience', ['Looking at notes', 'Looking at the ceiling', 'Looking at the floor']],
    ['What is vocal variety in speech delivery?', 'Changing pitch, rate, and volume', ['Speaking monotone', 'Speaking softly', 'Speaking loudly']],
    ['What is body language in speech delivery?', 'Gestures and posture', ['Eye contact', 'Vocal variety', 'Word choice']],
    ['What is articulation in speech?', 'Clear pronunciation', ['Speaking fast', 'Speaking softly', 'Speaking loudly']],
    ['What is fluency in speech?', 'Smooth delivery without hesitation', ['Pausing often', 'Stuttering', 'Speaking fast']],
    ['What is the rate of speech?', 'Speed of speaking', ['Volume of speaking', 'Pitch of speaking', 'Quality of speaking']],
    ['What is pitch in speech?', 'Highness or lowness of voice', ['Speed of speaking', 'Volume of speaking', 'Quality of speaking']],
  ];
  speechTypes.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const listening: [string, string, string[]][] = [
    ['What is active listening?', 'Fully focusing on the speaker', ['Hearing without attention', 'Pretending to listen', 'Listening while distracted']],
    ['What is empathic listening?', 'Understanding the speaker\'s feelings', ['Judging the speaker', 'Ignoring the speaker', 'Interrupting the speaker']],
    ['What is critical listening?', 'Evaluating the message', ['Accepting everything', 'Ignoring the message', 'Interrupting the speaker']],
    ['What is appreciative listening?', 'Listening for pleasure', ['Listening for information', 'Listening to critique', 'Listening to respond']],
    ['What is discriminative listening?', 'Distinguishing sounds', ['Listening for pleasure', 'Listening for information', 'Listening to critique']],
    ['What is comprehensive listening?', 'Understanding the message', ['Listening for pleasure', 'Distinguishing sounds', 'Evaluating the message']],
    ['What is the difference between hearing and listening?', 'Listening is active, hearing is passive', ['They are the same', 'Hearing is active', 'Listening is passive']],
    ['What is a barrier to listening?', 'Noise', ['Silence', 'Attention', 'Focus']],
    ['What is paraphrasing?', 'Restating in your own words', ['Repeating exactly', 'Ignoring the speaker', 'Changing the subject']],
    ['What is clarifying in listening?', 'Asking questions to understand', ['Pretending to understand', 'Changing the subject', 'Ignoring the speaker']],
  ];
  listening.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const commBarriers: [string, string, string[]][] = [
    ['What is a physical barrier in communication?', 'Noise or distance', ['Language difference', 'Emotional state', 'Cultural difference']],
    ['What is a psychological barrier in communication?', 'Emotions or attitudes', ['Noise', 'Distance', 'Language difference']],
    ['What is a semantic barrier in communication?', 'Language or meaning issues', ['Noise', 'Distance', 'Emotions']],
    ['What is a cultural barrier in communication?', 'Different cultural norms', ['Noise', 'Distance', 'Language']],
    ['What is feedback in communication?', 'Response to a message', ['Noise', 'Channel', 'Sender']],
    ['What is nonverbal communication?', 'Communication without words', ['Written communication', 'Verbal communication', 'Telephone communication']],
    ['What is kinesics?', 'Body movement communication', ['Voice communication', 'Space communication', 'Time communication']],
    ['What is proxemics?', 'Use of space in communication', ['Body movement', 'Voice quality', 'Touch']],
    ['What is haptics?', 'Touch in communication', ['Body movement', 'Space', 'Voice']],
    ['What is chronemics?', 'Use of time in communication', ['Body movement', 'Space', 'Touch']],
  ];
  commBarriers.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Generate more questions through variations
  const speechDelivery: [string, string, string[]][] = [
    ['What should you do before delivering a speech?', 'Practice', ['Eat a big meal', 'Stay up late', 'Skip preparation']],
    ['What should you wear when delivering a speech?', 'Appropriate attire', ['Pajamas', 'Swimwear', 'Anything']],
    ['How should you handle nervousness before a speech?', 'Take deep breaths', ['Drink coffee', 'Skip the speech', 'Eat a lot']],
    ['What is the best way to start a speech?', 'With a hook', ['With an apology', 'With a joke always', 'With a long story']],
    ['What is the best way to end a speech?', 'With a memorable conclusion', ['With a new topic', 'With "that\'s all"', 'By walking away']],
    ['What is a hook in a speech?', 'An attention-grabbing opening', ['The conclusion', 'The body', 'A transition']],
    ['What is a clincher in a speech?', 'A memorable closing statement', ['The opening', 'The body', 'A transition']],
    ['What is signposting in a speech?', 'Indicating the structure', ['The conclusion', 'The opening only', 'A type of gesture']],
    ['What is a visual aid?', 'A tool to help the audience see information', ['A sound effect', 'A handout only', 'A speech note']],
    ['What is the rule of three in speeches?', 'Presenting ideas in groups of three', ['Speaking for three minutes', 'Using three words', 'Having three speakers']],
  ];
  speechDelivery.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const commContext: [string, string, string[]][] = [
    ['What is intrapersonal communication?', 'Self-talk', ['Talking to one person', 'Talking to a group', 'Talking to a crowd']],
    ['What is dyadic communication?', 'Two-person communication', ['Self-talk', 'Group communication', 'Public communication']],
    ['What is formal communication?', 'Following official channels', ['Casual conversation', 'Gossip', 'Rumors']],
    ['What is informal communication?', 'Casual conversation', ['Official meetings', 'Formal reports', 'Press releases']],
    ['What is upward communication?', 'From subordinate to superior', ['From boss to employee', 'Between equals', 'To the public']],
    ['What is downward communication?', 'From superior to subordinate', ['From employee to boss', 'Between equals', 'To the public']],
    ['What is horizontal communication?', 'Between people of equal status', ['From boss to employee', 'From employee to boss', 'To the public']],
    ['What is diagonal communication?', 'Across different levels and departments', ['Between equals only', 'From boss to employee only', 'From employee to boss only']],
    ['What is grapevine communication?', 'Informal, unofficial communication', ['Official communication', 'Formal reports', 'Press releases']],
    ['What is the role of a communicator?', 'To share information effectively', ['To hide information', 'To confuse people', 'To entertain only']],
  ];
  commContext.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Programmatic generation for more questions
  const commPrinciples: [string, string, string[]][] = [
    ['Clarity', 'Being clear and understandable', ['Being vague', 'Being complex', 'Being confusing']],
    ['Conciseness', 'Being brief and to the point', ['Being wordy', 'Being long', 'Being detailed']],
    ['Correctness', 'Being accurate and error-free', ['Being wrong', 'Being sloppy', 'Being careless']],
    ['Coherence', 'Being logical and consistent', ['Being random', 'Being inconsistent', 'Being illogical']],
    ['Completeness', 'Including all necessary information', ['Leaving out details', 'Being partial', 'Being incomplete']],
    ['Concreteness', 'Being specific and definite', ['Being vague', 'Being abstract', 'Being general']],
    ['Courtesy', 'Being polite and respectful', ['Being rude', 'Being harsh', 'Being disrespectful']],
    ['Consideration', 'Understanding the receiver\'s viewpoint', ['Ignoring the receiver', 'Being selfish', 'Being one-sided']],
  ];
  commPrinciples.forEach(([term, def, wrong]) => {
    qs.push(makeQ(`What is ${term} in communication?`, def, wrong));
    qs.push(makeQ(`Which communication principle means "${def}"?`, term, ['Noise', 'Channel', 'Feedback']));
  });

  // More speech-related questions
  const speechParts: [string, string, string[]][] = [
    ['What comes first in a speech outline?', 'Introduction', ['Body', 'Conclusion', 'Transition']],
    ['What comes last in a speech outline?', 'Conclusion', ['Introduction', 'Body', 'Transition']],
    ['How many main points should a speech typically have?', '2-5', ['1', '10', '20']],
    ['What is a supporting material in a speech?', 'Evidence for main points', ['The introduction', 'The conclusion', 'The title']],
    ['What is a testimony in a speech?', 'Statement from an expert', ['A personal story', 'A statistic', 'A definition']],
    ['What is a statistic in a speech?', 'Numerical data', ['A story', 'An expert quote', 'A definition']],
    ['What is an analogy in a speech?', 'Comparison between two things', ['A number', 'A quote', 'A definition']],
    ['What is an anecdote in a speech?', 'A short personal story', ['A number', 'A quote', 'A definition']],
    ['What is a definition in a speech?', 'Explaining a term', ['A story', 'A number', 'A quote']],
    ['What is a visual aid used for?', 'To enhance understanding', ['To replace speaking', 'To distract the audience', 'To fill time']],
  ];
  speechParts.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== KOMUNIKASYON AT PANANALIKSIK ========================

function komunikasyonQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const wika: [string, string, string[]][] = [
    ['Ano ang pag-aaral ng wika?', 'Linggwistiks', ['Filolohiya', 'Semantiks', 'Pragmatiks']],
    ['Ano ang tawag sa pinagmulan ng salita?', 'Etimolohiya', ['Sintaks', 'Morpholohiya', 'Fonolohiya']],
    ['Ano ang pag-aaral ng mga tunog ng wika?', 'Fonolohiya', ['Sintaks', 'Semantiks', 'Etimolohiya']],
    ['Ano ang pag-aaral ng kayarian ng salita?', 'Morpholohiya', ['Sintaks', 'Fonolohiya', 'Semantiks']],
    ['Ano ang pag-aaral ng kahulugan ng wika?', 'Semantiks', ['Sintaks', 'Morpholohiya', 'Fonolohiya']],
    ['Ano ang pag-aaral ng kayarian ng pangungusap?', 'Sintaks', ['Morpholohiya', 'Semantiks', 'Fonolohiya']],
    ['Ano ang pambansang wika ng Pilipinas?', 'Filipino', ['Tagalog', 'Cebuano', 'Ilocano']],
    ['Ano ang opisyal na wika ng Pilipinas bukod sa Filipino?', 'English', ['Spanish', 'Chinese', 'Japanese']],
    ['Sino ang nagtatag ng Surian ng Wikang Pambansa?', 'Manuel L. Quezon', ['Jose Rizal', 'Andres Bonifacio', 'Manuel Roxas']],
    ['Kailan ipinatupad ang batas na nagtatakda ng Filipino bilang pambansang wika?', '1987', ['1935', '1973', '2000']],
  ];
  wika.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const pananaliksik: [string, string, string[]][] = [
    ['Ano ang pananaliksik?', 'Sistematikong pag-aaral', ['Random na pag-aaral', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang unang hakbang sa pananaliksik?', 'Pagtukoy ng problema', ['Pagsulat ng konklusyon', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang kalalabasan ng pananaliksik?', 'Konklusyon', ['Problema', 'Pera', 'Laro']],
    ['Ano ang quantitative na pananaliksik?', 'Paggamit ng numero at datos', ['Paggamit ng salita', 'Paggamit ng larawan', 'Paggamit ng tunog']],
    ['Ano ang qualitative na pananaliksik?', 'Paggamit ng salita at deskripsyon', ['Paggamit ng numero', 'Paggamit ng larawan', 'Paggamit ng tunog']],
    ['Ano ang survey?', 'Pagkokolekta ng datos sa pamamagitan ng tanong', ['Paggawa ng kwento', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang interview?', 'Pakikipag-usap para sa datos', ['Pagsulat ng kwento', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang observation?', 'Pagmamasid ng pangyayari', ['Pagsulat ng kwento', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang questionnaire?', 'Listahan ng tanong', ['Listahan ng pera', 'Listahan ng larawan', 'Listahan ng kwento']],
    ['Ano ang hypothesis?', 'Sinuring sagot sa problema', ['Random na sagot', 'Pera', 'Laro']],
  ];
  pananaliksik.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const pananaliksikHakbang: [string, string, string[]][] = [
    ['Ano ang unang hakbang sa pananaliksik?', 'Pagtukoy ng problema', ['Pagsulat ng konklusyon', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang pangalawang hakbang?', 'Pagsusuri ng literatura', ['Pagsulat ng konklusyon', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang pangatlong hakbang?', 'Pagbuo ng hypothesis', ['Pagsulat ng konklusyon', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang pangapat na hakbang?', 'Pagkokolekta ng datos', ['Pagsulat ng konklusyon', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang panglimang hakbang?', 'Pagsusuri ng datos', ['Pagsulat ng konklusyon', 'Paghahanap ng pera', 'Paglalaro']],
    ['Ano ang panghuling hakbang?', 'Pagbuo ng konklusyon', ['Paghahanap ng pera', 'Paglalaro', 'Pagsulat ng problema']],
    ['Ano ang variable sa pananaliksik?', 'Bagay na nagbabago', ['Bagay na hindi nagbabago', 'Pera', 'Laro']],
    ['Ano ang independent variable?', 'Sanhi', ['Bunga', 'Resulta', 'Wala']],
    ['Ano ang dependent variable?', 'Bunga', ['Sanhi', 'Dahilan', 'Wala']],
    ['Ano ang sample sa pananaliksik?', 'Bahagi ng populasyon', ['Lahat ng tao', 'Pera', 'Laro']],
  ];
  pananaliksikHakbang.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const uriPananaliksik: [string, string, string[]][] = [
    ['Anong uri ng pananaliksik ang gumagamit ng numero?', 'Quantitative', ['Qualitative', 'Mixed', 'Descriptive']],
    ['Anong uri ng pananaliksik ang gumagamit ng salita?', 'Qualitative', ['Quantitative', 'Mixed', 'Numerical']],
    ['Anong uri ng pananaliksik ang naglalarawan ng pangyayari?', 'Descriptive', ['Experimental', 'Correlational', 'Historical']],
    ['Anong uri ng pananaliksik ang nagsusuri ng sanhi at bunga?', 'Experimental', ['Descriptive', 'Correlational', 'Historical']],
    ['Anong uri ng pananaliksik ang nag-aaral ng nakaraan?', 'Historical', ['Descriptive', 'Experimental', 'Correlational']],
    ['Anong uri ng pananaliksik ang nagsusuri ng ugnayan?', 'Correlational', ['Descriptive', 'Experimental', 'Historical']],
    ['Anong uri ng pananaliksik ang gumagamit ng survey?', 'Survey research', ['Experimental', 'Historical', 'Correlational']],
    ['Anong uri ng pananaliksik ang sumusuri ng kaso?', 'Case study', ['Survey', 'Experimental', 'Historical']],
    ['Anong uri ng pananaliksik ang nag-oobserba sa pangyayari?', 'Observational', ['Experimental', 'Historical', 'Correlational']],
    ['Anong uri ng pananaliksik ang nag-aaral ng kultura?', 'Ethnographic', ['Experimental', 'Historical', 'Correlational']],
  ];
  uriPananaliksik.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const wikaKomunikasyon: [string, string, string[]][] = [
    ['Ano ang kahalagahan ng wika?', 'Para sa komunikasyon', ['Para sa pera', 'Para sa laro', 'Para sa pagkain']],
    ['Ano ang gamit ng wika?', 'Para magkaintindihan', ['Para mag-away', 'Para magtago', 'Para maglaro']],
    ['Ano ang katangian ng mabuting komunikasyon?', 'Malinaw', ['Magulo', 'Mahaba', 'Mabilis']],
    ['Ano ang dapat gawin sa pakikinig?', 'Makinig nang mabuti', ['Magsalita', 'Matulog', 'Maglaro']],
    ['Ano ang dapat gawin sa pagsasalita?', 'Maging malinaw', ['Maging mahaba', 'Maging mabilis', 'Maging magulo']],
    ['Ano ang dapat gawin sa pagsusulat?', 'Maging organisado', ['Maging magulo', 'Maging mahaba', 'Maging mabilis']],
    ['Ano ang dapat gawin sa pagbabasa?', 'Makinig nang mabuti', ['Magsalita', 'Matulog', 'Maglaro']],
    ['Ano ang komunikasyon?', 'Pagpapalitan ng ideya', ['Paghahanap ng pera', 'Paglalaro', 'Pagkain']],
    ['Ano ang elemento ng komunikasyon?', 'Sender, message, receiver', ['Pera, laro, pagkain', 'Araw, gabi, umaga', 'Tubig, hangin, apoy']],
    ['Ano ang tawag sa taong nagpapadala ng mensahe?', 'Sender', ['Receiver', 'Channel', 'Noise']],
  ];
  wikaKomunikasyon.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Generate more questions programmatically
  const pananaliksikTerms: [string, string, string[]][] = [
    ['Populasyon', 'Lahat ng subject ng pananaliksik', ['Bahagi', 'Sample', 'Variable']],
    ['Sample', 'Bahagi ng populasyon', ['Lahat', 'Populasyon', 'Variable']],
    ['Variable', 'Katangiang nagbabago', ['Konstante', 'Fixed', 'Static']],
    ['Hypothesis', 'Sinuring sagot', ['Random', 'Pera', 'Laro']],
    ['Data', 'Nakolektang impormasyon', ['Pera', 'Laro', 'Pagkain']],
    ['Instrument', 'Kasangkapan sa pananaliksik', ['Laro', 'Pera', 'Pagkain']],
    ['Respondent', 'Taong sumagot', ['Pera', 'Laro', 'Pagkain']],
    ['Validity', 'Katumpakan', ['Kamalian', 'Pera', 'Laro']],
    ['Reliability', 'Katiyakan', ['Kawalan', 'Pera', 'Laro']],
    ['Ethics', 'Moral na pamantayan', ['Pera', 'Laro', 'Pagkain']],
  ];
  pananaliksikTerms.forEach(([term, def, wrong]) => {
    qs.push(makeQ(`Ano ang "${term}" sa pananaliksik?`, def, wrong));
  });

  // More wika questions
  const wikaTypes: [string, string, string[]][] = [
    ['Ano ang dayalek?', 'Variasyon ng wika sa lugar', ['Pambansang wika', 'Opisyal na wika', 'Dayalogo']],
    ['Ano ang idyoma?', 'Tayutay na may ibang kahulugan', ['Literal na salita', 'Pormal na wika', 'Dayalek']],
    ['Ano ang jargon?', 'Wika ng partikular na grupo', ['Pangkalahatang wika', 'Dayalek', 'Idyoma']],
    ['Ano ang slang?', 'Di-pormal na wika', ['Pormal na wika', 'Opisyal na wika', 'Dayalek']],
    ['Ano ang register?', 'Antas ng paggamit ng wika', ['Dayalek', 'Idyoma', 'Jargon']],
    ['Ano ang pormal na wika?', 'Wika sa opisyal na setting', ['Di-pormal', 'Slang', 'Jargon']],
    ['Ano ang di-pormal na wika?', 'Wika sa pang-araw-araw', ['Pormal', 'Opisyal', 'Jargon']],
    ['Ano ang akademikong wika?', 'Wika sa paaralan', ['Slang', 'Dayalek', 'Idyoma']],
    ['Ano ang teknikal na wika?', 'Wika ng partikular na disiplina', ['Pangkalahatang wika', 'Dayalek', 'Idyoma']],
    ['Ano ang colloquial?', 'Pang-araw-araw na wika', ['Pormal', 'Akademiko', 'Teknikal']],
  ];
  wikaTypes.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const pananaliksikEtika: [string, string, string[]][] = [
    ['Ano ang etika sa pananaliksik?', 'Moral na pamantayan', ['Pera', 'Laro', 'Pagkain']],
    ['Ano dapat gawin bago magsaliksik sa tao?', 'Humingi ng pahintulot', ['Pilitin', 'Lakihan', 'Takutin']],
    ['Ano ang confidentiality?', 'Pagiging lihim ng datos', ['Pagpapakalat', 'Pagbebenta', 'Paglalathala']],
    ['Ano ang informed consent?', 'Pahintulot na may kaalaman', ['Pilit na pahintulot', 'Walang kaalaman', 'Pilit']],
    ['Ano ang plagiarism?', 'Pang-aangkin ng gawa ng iba', ['Sariling gawa', 'Pera', 'Laro']],
    ['Ano dapat gawin sa datos ng respondent?', 'Iingatan at ililim', ['Ipapakalat', 'Ibebenta', 'Ilathala']],
    ['Ano ang bias sa pananaliksik?', 'Pagiging hindi objektibo', ['Objektibo', 'Pera', 'Laro']],
    ['Ano dapat gawin sa pananaliksik?', 'Maging objektibo', ['Maging biased', 'Pera', 'Laro']],
    ['Ano ang peer review?', 'Pagsusuri ng kapwa mananaliksik', ['Pagsusuri ng pera', 'Pagsusuri ng laro', 'Pagsusuri ng pagkain']],
    ['Ano ang citation?', 'Pagbanggit ng pinagmulan', ['Pagkakait', 'Pagbalewala', 'Paglaktaw']],
  ];
  pananaliksikEtika.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== GENERAL MATHEMATICS ==================================

function generalMathQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  // Functions (80)
  const functions: [string, string, string[]][] = [
    ['What is a function?', 'A relation where each input has one output', ['A relation with many outputs', 'A type of equation', 'A graph']],
    ['What is the domain of a function?', 'Set of all inputs', ['Set of all outputs', 'Set of all values', 'Set of all numbers']],
    ['What is the range of a function?', 'Set of all outputs', ['Set of all inputs', 'Set of all values', 'Set of all numbers']],
    ['If f(x) = 2x + 3, what is f(2)?', '7', ['5', '6', '8']],
    ['If f(x) = 2x + 3, what is f(0)?', '3', ['0', '2', '5']],
    ['If f(x) = 2x + 3, what is f(5)?', '13', ['10', '12', '15']],
    ['If f(x) = x² - 1, what is f(3)?', '8', ['6', '9', '10']],
    ['If f(x) = x² - 1, what is f(0)?', '-1', ['0', '1', '-2']],
    ['If f(x) = x² - 1, what is f(2)?', '3', ['1', '5', '0']],
    ['If f(x) = 3x - 2, what is f(4)?', '10', ['8', '12', '14']],
    ['If f(x) = 3x - 2, what is f(1)?', '1', ['-1', '0', '3']],
    ['If f(x) = 3x - 2, what is f(0)?', '-2', ['0', '2', '-3']],
    ['If f(x) = x² + 2x, what is f(3)?', '15', ['9', '12', '18']],
    ['If f(x) = x² + 2x, what is f(1)?', '3', ['1', '2', '5']],
    ['If f(x) = x² + 2x, what is f(0)?', '0', ['1', '2', '-1']],
    ['If f(x) = 5x + 1, what is f(2)?', '11', ['10', '12', '15']],
    ['If f(x) = 5x + 1, what is f(0)?', '1', ['0', '5', '-1']],
    ['If f(x) = 5x + 1, what is f(3)?', '16', ['15', '14', '18']],
    ['If f(x) = -2x + 5, what is f(2)?', '1', ['3', '-1', '9']],
    ['If f(x) = -2x + 5, what is f(0)?', '5', ['0', '-5', '3']],
    ['If f(x) = -2x + 5, what is f(3)?', '-1', ['1', '3', '-11']],
    ['If f(x) = 4x - 3, what is f(5)?', '17', ['15', '20', '23']],
    ['If f(x) = 4x - 3, what is f(0)?', '-3', ['0', '3', '4']],
    ['If f(x) = 4x - 3, what is f(1)?', '1', ['-1', '0', '4']],
    ['If f(x) = x/2, what is f(10)?', '5', ['10', '20', '2.5']],
    ['If f(x) = x/2, what is f(6)?', '3', ['6', '12', '1.5']],
    ['If f(x) = x/2, what is f(0)?', '0', ['1', '2', 'undefined']],
    ['If f(x) = 2x², what is f(3)?', '18', ['6', '12', '9']],
    ['If f(x) = 2x², what is f(2)?', '8', ['4', '6', '16']],
    ['If f(x) = 2x², what is f(0)?', '0', ['1', '2', '4']],
    ['If f(x) = 3x + 2, what is f(-1)?', '-1', ['1', '-5', '5']],
    ['If f(x) = 3x + 2, what is f(-2)?', '-4', ['4', '-8', '8']],
    ['If f(x) = 3x + 2, what is f(-3)?', '-7', ['7', '-11', '11']],
    ['If f(x) = x² + 3, what is f(-2)?', '7', ['1', '-1', '5']],
    ['If f(x) = x² + 3, what is f(-1)?', '4', ['1', '2', '-2']],
    ['If f(x) = x² + 3, what is f(-3)?', '12', ['6', '9', '-6']],
    ['What is the slope of f(x) = 2x + 3?', '2', ['3', '5', '1']],
    ['What is the slope of f(x) = -3x + 5?', '-3', ['5', '3', '-5']],
    ['What is the y-intercept of f(x) = 2x + 3?', '3', ['2', '5', '1']],
    ['What is the y-intercept of f(x) = -3x + 5?', '5', ['3', '-3', '1']],
    ['What is the slope of f(x) = x?', '1', ['0', '2', '-1']],
    ['What is the y-intercept of f(x) = x?', '0', ['1', '2', '-1']],
    ['What is the slope of a horizontal line?', '0', ['1', 'Undefined', 'Infinity']],
    ['What is the slope of a vertical line?', 'Undefined', ['0', '1', 'Infinity']],
    ['Is f(x) = x² a function?', 'Yes', ['No', 'Sometimes', 'Only for positive x']],
    ['Is f(x) = ±√x a function?', 'No', ['Yes', 'Sometimes', 'Only for positive x']],
    ['What is the inverse of f(x) = 2x?', 'f⁻¹(x) = x/2', ['f⁻¹(x) = 2/x', 'f⁻¹(x) = x - 2', 'f⁻¹(x) = x + 2']],
    ['What is the inverse of f(x) = x + 3?', 'f⁻¹(x) = x - 3', ['f⁻¹(x) = x + 3', 'f⁻¹(x) = 3 - x', 'f⁻¹(x) = 3x']],
    ['What is the inverse of f(x) = 3x?', 'f⁻¹(x) = x/3', ['f⁻¹(x) = 3/x', 'f⁻¹(x) = x - 3', 'f⁻¹(x) = x + 3']],
    ['What is the inverse of f(x) = x - 5?', 'f⁻¹(x) = x + 5', ['f⁻¹(x) = x - 5', 'f⁻¹(x) = 5 - x', 'f⁻¹(x) = 5x']],
    ['What is (f∘g)(x) if f(x) = 2x and g(x) = x + 1?', '2x + 2', ['2x + 1', '2x', 'x + 2']],
    ['What is (f∘g)(x) if f(x) = x² and g(x) = x + 1?', 'x² + 2x + 1', ['x² + 1', 'x²', 'x + 1']],
    ['What is (f∘g)(x) if f(x) = 3x and g(x) = x - 2?', '3x - 6', ['3x - 2', '3x', 'x - 6']],
    ['What is (f∘g)(x) if f(x) = x + 1 and g(x) = 2x?', '2x + 1', ['2x', 'x + 2', '2x + 2']],
    ['What is (f∘g)(x) if f(x) = 5x and g(x) = x + 3?', '5x + 15', ['5x + 3', '5x', 'x + 15']],
    ['What is (f∘g)(x) if f(x) = x² and g(x) = 3x?', '9x²', ['3x²', '9x', '3x']],
    ['What is (f∘g)(x) if f(x) = x - 1 and g(x) = x + 1?', 'x', ['x + 2', 'x - 2', 'x² - 1']],
    ['What is (f∘g)(x) if f(x) = 2x + 1 and g(x) = x - 3?', '2x - 5', ['2x - 3', '2x + 5', '2x - 7']],
    ['What is (f∘g)(x) if f(x) = 4x and g(x) = x/2?', '2x', ['4x/2', '2x', '4x']],
    ['What is (f∘g)(x) if f(x) = x³ and g(x) = x + 1?', 'x³ + 3x² + 3x + 1', ['x³ + 1', 'x³', 'x + 1']],
    ['What is (f∘g)(x) if f(x) = 1/x and g(x) = x + 1?', '1/(x + 1)', ['1/x + 1', '1/x', 'x + 1/x']],
    ['What is (f∘g)(x) if f(x) = √x and g(x) = x²?', 'x', ['x²', '√x', 'x⁴']],
    ['What is (f∘g)(x) if f(x) = 2x - 3 and g(x) = x + 5?', '2x + 7', ['2x + 5', '2x - 3', '2x + 2']],
    ['What is (f∘g)(x) if f(x) = x + 4 and g(x) = 3x?', '3x + 4', ['3x', 'x + 4', '3x + 12']],
    ['What is (f∘g)(x) if f(x) = 6x and g(x) = x/3?', '2x', ['6x/3', '2x', '6x']],
    ['What is (f∘g)(x) if f(x) = x² + 1 and g(x) = 2x?', '4x² + 1', ['2x² + 1', '4x²', '2x + 1']],
    ['What is (f∘g)(x) if f(x) = 3x - 1 and g(x) = x + 2?', '3x + 5', ['3x + 2', '3x - 1', '3x + 7']],
    ['What is (f∘g)(x) if f(x) = x/2 and g(x) = 4x?', '2x', ['4x/2', '2x', '4x']],
    ['What is (f∘g)(x) if f(x) = x + 7 and g(x) = x - 7?', 'x', ['x + 14', 'x - 14', 'x² - 49']],
    ['What is (f∘g)(x) if f(x) = 5x + 2 and g(x) = x - 1?', '5x - 3', ['5x + 2', '5x - 1', '5x + 7']],
    ['What is (f∘g)(x) if f(x) = x² and g(x) = x + 2?', 'x² + 4x + 4', ['x² + 2', 'x² + 4', 'x + 4']],
    ['What is (f∘g)(x) if f(x) = 2x + 5 and g(x) = x - 5?', '2x - 5', ['2x + 5', '2x - 5', '2x']],
    ['What is (f∘g)(x) if f(x) = 10x and g(x) = x/5?', '2x', ['10x/5', '2x', '10x']],
    ['What is (f∘g)(x) if f(x) = x - 4 and g(x) = x + 4?', 'x', ['x + 8', 'x - 8', 'x² - 16']],
  ];
  functions.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Business math (80)
  const businessMath: [string, string, string[]][] = [
    ['What is simple interest formula?', 'I = Prt', ['I = P + rt', 'I = P/r', 'I = Pr/t']],
    ['What is the simple interest on 1000 at 5% for 2 years?', '100', ['50', '200', '10']],
    ['What is the simple interest on 5000 at 3% for 1 year?', '150', ['50', '300', '15']],
    ['What is the simple interest on 2000 at 4% for 3 years?', '240', ['60', '120', '240']],
    ['What is the simple interest on 10000 at 2% for 5 years?', '1000', ['100', '200', '500']],
    ['What is the simple interest on 8000 at 5% for 6 months?', '200', ['400', '100', '2400']],
    ['What is the future value formula for simple interest?', 'FV = P(1 + rt)', ['FV = P + rt', 'FV = P × rt', 'FV = P/(1 + rt)']],
    ['What is the future value of 1000 at 5% for 2 years (simple)?', '1100', ['1050', '1200', '1000']],
    ['What is the future value of 5000 at 3% for 1 year (simple)?', '5150', ['5050', '5300', '5000']],
    ['What is the compound interest formula?', 'FV = P(1 + r)^t', ['FV = P(1 + rt)', 'FV = P + r^t', 'FV = P × r^t']],
    ['What is the future value of 1000 at 5% compounded for 2 years?', '1102.50', ['1050', '1100', '1200']],
    ['What is the future value of 2000 at 10% compounded for 2 years?', '2420', ['2200', '2400', '2000']],
    ['What is the future value of 5000 at 5% compounded for 3 years?', '5788.13', ['5250', '5750', '5500']],
    ['What is 10% of 500?', '50', ['5', '100', '500']],
    ['What is 20% of 300?', '60', ['30', '6', '300']],
    ['What is 25% of 800?', '200', ['100', '400', '800']],
    ['What is 15% of 200?', '30', ['20', '15', '40']],
    ['What is 5% of 1000?', '50', ['5', '100', '500']],
    ['If a shirt costs 200 and is 20% off, what is the sale price?', '160', ['180', '150', '40']],
    ['If a book costs 500 and is 30% off, what is the sale price?', '350', ['400', '300', '150']],
    ['If a phone costs 10000 and is 10% off, what is the sale price?', '9000', ['9500', '8000', '1000']],
    ['If a TV costs 15000 and is 15% off, what is the sale price?', '12750', ['13500', '12000', '2250']],
    ['If a bag costs 800 and is 25% off, what is the sale price?', '600', ['700', '500', '200']],
    ['What is the markup if cost is 100 and selling price is 150?', '50', ['100', '150', '25']],
    ['What is the markup if cost is 200 and selling price is 260?', '60', ['200', '260', '30']],
    ['What is the markup if cost is 500 and selling price is 650?', '150', ['500', '650', '75']],
    ['What is the markup percentage if cost is 100 and selling price is 150?', '50%', ['25%', '100%', '150%']],
    ['What is the markup percentage if cost is 200 and selling price is 300?', '50%', ['25%', '100%', '33%']],
    ['What is the markup percentage if cost is 400 and selling price is 600?', '50%', ['25%', '100%', '33%']],
    ['What is the profit if revenue is 5000 and cost is 3000?', '2000', ['5000', '3000', '8000']],
    ['What is the profit if revenue is 10000 and cost is 7000?', '3000', ['10000', '7000', '17000']],
    ['What is the profit if revenue is 800 and cost is 500?', '300', ['800', '500', '1300']],
    ['What is the profit percentage if revenue is 5000 and cost is 4000?', '25%', ['20%', '50%', '10%']],
    ['What is the profit percentage if revenue is 10000 and cost is 8000?', '25%', ['20%', '50%', '10%']],
    ['What is the loss if revenue is 3000 and cost is 5000?', '2000', ['3000', '5000', '8000']],
    ['What is the loss if revenue is 1000 and cost is 1500?', '500', ['1000', '1500', '2500']],
    ['What is the loss percentage if revenue is 4000 and cost is 5000?', '20%', ['25%', '10%', '50%']],
    ['What is the loss percentage if revenue is 800 and cost is 1000?', '20%', ['25%', '10%', '50%']],
    ['What is 12% of 250?', '30', ['25', '35', '12']],
    ['What is 8% of 125?', '10', ['8', '12', '15']],
    ['What is 6% of 50?', '3', ['6', '5', '30']],
    ['What is 4% of 75?', '3', ['4', '7.5', '30']],
    ['What is 3% of 600?', '18', ['6', '30', '3']],
    ['What is 7% of 140?', '9.80', ['7', '14', '9.8']],
    ['What is 9% of 90?', '8.10', ['9', '8.1', '90']],
    ['What is 11% of 110?', '12.10', ['11', '12.1', '110']],
    ['What is 14% of 70?', '9.80', ['14', '9.8', '7']],
    ['What is 18% of 150?', '27', ['15', '18', '30']],
    ['What is 22% of 200?', '44', ['22', '40', '20']],
    ['What is 35% of 60?', '21', ['35', '30', '6']],
    ['What is 45% of 80?', '36', ['45', '40', '80']],
    ['What is 55% of 40?', '22', ['55', '20', '40']],
    ['What is 65% of 20?', '13', ['65', '10', '20']],
    ['What is 75% of 16?', '12', ['75', '8', '16']],
    ['What is 85% of 120?', '102', ['85', '120', '100']],
    ['What is 95% of 200?', '190', ['95', '200', '100']],
    ['What is 33% of 300?', '99', ['33', '100', '300']],
    ['What is 66% of 150?', '99', ['66', '100', '150']],
    ['What is 99% of 100?', '99', ['99', '100', '1']],
    ['What is 1% of 1000?', '10', ['1', '100', '1000']],
    ['What is 2% of 500?', '10', ['2', '100', '500']],
    ['What is 0.5% of 200?', '1', ['0.5', '100', '200']],
    ['What is 0.1% of 1000?', '1', ['0.1', '100', '1000']],
    ['What is 0.25% of 400?', '1', ['0.25', '100', '400']],
    ['What is 150% of 100?', '150', ['100', '50', '150']],
    ['What is 200% of 50?', '100', ['50', '200', '100']],
    ['What is 300% of 20?', '60', ['20', '300', '60']],
    ['What is 500% of 10?', '50', ['10', '500', '50']],
    ['What is 1000% of 5?', '50', ['5', '1000', '50']],
    ['If you deposit 5000 at 4% simple interest for 3 years, how much interest?', '600', ['200', '400', '750']],
    ['If you deposit 10000 at 6% simple interest for 2 years, how much interest?', '1200', ['600', '300', '1800']],
    ['If you deposit 20000 at 3% simple interest for 5 years, how much interest?', '3000', ['600', '1000', '6000']],
    ['If you deposit 50000 at 2% simple interest for 1 year, how much interest?', '1000', ['100', '500', '2000']],
    ['If you deposit 100000 at 5% simple interest for 6 months, how much interest?', '2500', ['5000', '2500', '1000']],
    ['What is the maturity value of 5000 at 4% simple interest for 3 years?', '5600', ['5200', '5000', '5400']],
    ['What is the maturity value of 10000 at 6% simple interest for 2 years?', '11200', ['10600', '10000', '12000']],
    ['What is the maturity value of 20000 at 3% simple interest for 5 years?', '23000', ['20300', '20000', '21500']],
    ['What is the maturity value of 50000 at 2% simple interest for 1 year?', '51000', ['50500', '50000', '52000']],
  ];
  businessMath.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Logic (40)
  const logic: [string, string, string[]][] = [
    ['What is a proposition?', 'A statement that is true or false', ['A question', 'A command', 'An exclamation']],
    ['What is the negation of "It is raining"?', 'It is not raining', ['It is sunny', 'It is snowing', 'It is windy']],
    ['What is the conjunction of p and q?', 'p ∧ q', ['p ∨ q', 'p → q', 'p ↔ q']],
    ['What is the disjunction of p and q?', 'p ∨ q', ['p ∧ q', 'p → q', 'p ↔ q']],
    ['What is the implication of p → q?', 'If p then q', ['p and q', 'p or q', 'p if and only if q']],
    ['What is the biconditional of p ↔ q?', 'p if and only if q', ['If p then q', 'p and q', 'p or q']],
    ['What is a tautology?', 'Always true', ['Always false', 'Sometimes true', 'Never true']],
    ['What is a contradiction?', 'Always false', ['Always true', 'Sometimes true', 'Never false']],
    ['What is a contingency?', 'Sometimes true, sometimes false', ['Always true', 'Always false', 'Never true']],
    ['What is the truth value of T ∧ T?', 'True', ['False', 'Unknown', 'Both']],
    ['What is the truth value of T ∧ F?', 'False', ['True', 'Unknown', 'Both']],
    ['What is the truth value of F ∧ T?', 'False', ['True', 'Unknown', 'Both']],
    ['What is the truth value of F ∧ F?', 'False', ['True', 'Unknown', 'Both']],
    ['What is the truth value of T ∨ T?', 'True', ['False', 'Unknown', 'Both']],
    ['What is the truth value of T ∨ F?', 'True', ['False', 'Unknown', 'Both']],
    ['What is the truth value of F ∨ T?', 'True', ['False', 'Unknown', 'Both']],
    ['What is the truth value of F ∨ F?', 'False', ['True', 'Unknown', 'Both']],
    ['What is the truth value of T → T?', 'True', ['False', 'Unknown', 'Both']],
    ['What is the truth value of T → F?', 'False', ['True', 'Unknown', 'Both']],
    ['What is the truth value of F → T?', 'True', ['False', 'Unknown', 'Both']],
    ['What is the truth value of F → F?', 'True', ['False', 'Unknown', 'Both']],
    ['What is the contrapositive of p → q?', '¬q → ¬p', ['q → p', '¬p → ¬q', 'q ↔ p']],
    ['What is the converse of p → q?', 'q → p', ['¬q → ¬p', '¬p → ¬q', 'q ↔ p']],
    ['What is the inverse of p → q?', '¬p → ¬q', ['q → p', '¬q → ¬p', 'q ↔ p']],
    ['What is De Morgan\'s Law for ¬(p ∧ q)?', '¬p ∨ ¬q', ['¬p ∧ ¬q', 'p ∨ q', 'p ∧ q']],
    ['What is De Morgan\'s Law for ¬(p ∨ q)?', '¬p ∧ ¬q', ['¬p ∨ ¬q', 'p ∧ q', 'p ∨ q']],
    ['What is a truth table?', 'Table showing all truth values', ['A table of food', 'A table of numbers', 'A table of letters']],
    ['How many rows in a truth table with 2 variables?', '4', ['2', '8', '16']],
    ['How many rows in a truth table with 3 variables?', '8', ['4', '6', '16']],
    ['How many rows in a truth table with 4 variables?', '16', ['8', '12', '32']],
    ['What is modus ponens?', 'p → q, p, therefore q', ['p → q, q, therefore p', 'p ∨ q, ¬p, therefore q', 'p ∧ q, therefore p']],
    ['What is modus tollens?', 'p → q, ¬q, therefore ¬p', ['p → q, p, therefore q', 'p → q, ¬p, therefore ¬q', 'p ∨ q, ¬p, therefore q']],
    ['What is a syllogism?', 'Logical argument with premises and conclusion', ['A type of poem', 'A mathematical formula', 'A type of graph']],
    ['What is deductive reasoning?', 'General to specific', ['Specific to general', 'Random to ordered', 'Ordered to random']],
    ['What is inductive reasoning?', 'Specific to general', ['General to specific', 'Random to ordered', 'Ordered to random']],
    ['What is a valid argument?', 'Conclusion follows from premises', ['Conclusion is true', 'Premises are true', 'Conclusion is false']],
    ['What is a sound argument?', 'Valid and premises are true', ['Valid only', 'Premises true only', 'Conclusion is false']],
    ['What is a fallacy?', 'Error in reasoning', ['A type of argument', 'A true statement', 'A valid argument']],
    ['What is affirming the consequent?', 'If p then q, q, therefore p (fallacy)', ['If p then q, p, therefore q', 'If p then q, ¬q, therefore ¬p', 'If p then q, ¬p, therefore ¬q']],
    ['What is denying the antecedent?', 'If p then q, ¬p, therefore ¬q (fallacy)', ['If p then q, p, therefore q', 'If p then q, q, therefore p', 'If p then q, ¬q, therefore ¬p']],
  ];
  logic.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== STATISTICS AND PROBABILITY ==========================

function statisticsQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  // Descriptive statistics (80)
  const descStats: [string, string, string[]][] = [
    ['What is the mean of 2, 4, 6, 8, 10?', '6', ['5', '7', '8']],
    ['What is the mean of 5, 10, 15, 20?', '12.5', ['10', '15', '12']],
    ['What is the mean of 1, 3, 5, 7, 9?', '5', ['3', '7', '4']],
    ['What is the median of 2, 4, 6, 8, 10?', '6', ['4', '8', '5']],
    ['What is the median of 1, 3, 5, 7?', '4', ['3', '5', '6']],
    ['What is the median of 5, 10, 15, 20, 25?', '15', ['10', '20', '12.5']],
    ['What is the mode of 2, 2, 3, 4, 5?', '2', ['3', '4', '5']],
    ['What is the mode of 1, 1, 2, 2, 2, 3?', '2', ['1', '3', '1 and 2']],
    ['What is the range of 3, 7, 2, 9, 5?', '7', ['5', '9', '2']],
    ['What is the range of 10, 20, 30, 40?', '30', ['10', '20', '40']],
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
    ['What is the mean of 0, 0, 0, 0, 0?', '0', ['undefined', '1', '5']],
    ['What is the mean of 1, 1, 1, 1, 1?', '1', ['0', '5', 'undefined']],
    ['What is the mean of 2, 2, 2, 2?', '2', ['0', '4', '8']],
    ['What is the median of 2, 2, 2, 2?', '2', ['0', '4', '1']],
    ['What is the mode of 2, 2, 2, 2?', '2', ['No mode', '4', '8']],
    ['What is the range of 2, 2, 2, 2?', '0', ['2', '4', '8']],
    ['What is the mean of -2, -1, 0, 1, 2?', '0', ['1', '-1', 'undefined']],
    ['What is the median of -2, -1, 0, 1, 2?', '0', ['1', '-1', 'undefined']],
    ['What is the range of -2, -1, 0, 1, 2?', '4', ['2', '0', '-2']],
    ['What is the mean of 10, 10, 10, 20, 20, 20?', '15', ['10', '20', '12']],
    ['What is the median of 10, 10, 10, 20, 20, 20?', '15', ['10', '20', '12']],
    ['What is the mode of 10, 10, 10, 20, 20, 20?', '10 and 20', ['10', '20', '15']],
    ['What is the variance of 2, 4, 6?', '2.67', ['2', '4', '8']],
    ['What is the variance of 1, 3, 5, 7?', '5', ['4', '6', '10']],
    ['What is the standard deviation of 2, 4, 6?', '1.63', ['1', '2', '4']],
    ['What is the standard deviation of 1, 3, 5, 7?', '2.24', ['2', '3', '5']],
    ['What is the mean of 5, 5, 5, 5, 5, 5?', '5', ['0', '6', '30']],
    ['What is the median of 5, 5, 5, 5, 5, 5?', '5', ['0', '6', '3']],
    ['What is the mode of 5, 5, 5, 5, 5, 5?', '5', ['No mode', '0', '30']],
    ['What is the range of 5, 5, 5, 5, 5, 5?', '0', ['5', '30', '1']],
    ['What is the mean of 3, 6, 9, 12, 15?', '9', ['6', '7.5', '12']],
    ['What is the median of 3, 6, 9, 12, 15?', '9', ['6', '7.5', '12']],
    ['What is the range of 3, 6, 9, 12, 15?', '12', ['3', '9', '15']],
    ['What is the mean of 2, 4, 6, 8?', '5', ['4', '6', '10']],
    ['What is the median of 2, 4, 6, 8?', '5', ['4', '6', '10']],
    ['What is the range of 2, 4, 6, 8?', '6', ['2', '4', '8']],
    ['What is the mean of 1, 2, 3, 4, 5, 6, 7, 8, 9, 10?', '5.5', ['5', '6', '50']],
    ['What is the median of 1, 2, 3, 4, 5, 6, 7, 8, 9, 10?', '5.5', ['5', '6', '50']],
    ['What is the range of 1, 2, 3, 4, 5, 6, 7, 8, 9, 10?', '9', ['5', '10', '1']],
    ['What is the mean of 10, 20, 30, 40, 50, 60?', '35', ['30', '40', '210']],
    ['What is the median of 10, 20, 30, 40, 50, 60?', '35', ['30', '40', '210']],
    ['What is the range of 10, 20, 30, 40, 50, 60?', '50', ['10', '30', '60']],
    ['What is the mean of 1, 4, 7, 10, 13?', '7', ['5', '6', '8']],
    ['What is the median of 1, 4, 7, 10, 13?', '7', ['5', '6', '8']],
    ['What is the range of 1, 4, 7, 10, 13?', '12', ['1', '7', '13']],
    ['What is the mean of 100, 200, 300, 400?', '250', ['200', '300', '1000']],
    ['What is the median of 100, 200, 300, 400?', '250', ['200', '300', '1000']],
    ['What is the range of 100, 200, 300, 400?', '300', ['100', '200', '400']],
    ['What is the mean of 5, 10, 15, 20, 25, 30?', '17.5', ['15', '20', '105']],
    ['What is the median of 5, 10, 15, 20, 25, 30?', '17.5', ['15', '20', '105']],
    ['What is the range of 5, 10, 15, 20, 25, 30?', '25', ['5', '15', '30']],
    ['What is the mean of 0, 5, 10, 15, 20?', '10', ['5', '15', '50']],
    ['What is the median of 0, 5, 10, 15, 20?', '10', ['5', '15', '50']],
    ['What is the range of 0, 5, 10, 15, 20?', '20', ['0', '10', '20']],
    ['What is the mean of -5, 0, 5?', '0', ['-5', '5', 'undefined']],
    ['What is the median of -5, 0, 5?', '0', ['-5', '5', 'undefined']],
    ['What is the range of -5, 0, 5?', '10', ['0', '5', '-5']],
    ['What is the mean of 1, 1, 2, 2, 3, 3?', '2', ['1', '3', '12']],
    ['What is the median of 1, 1, 2, 2, 3, 3?', '2', ['1', '3', '12']],
    ['What is the mode of 1, 1, 2, 2, 3, 3?', '1, 2, and 3', ['1', '2', '3']],
    ['What is the range of 1, 1, 2, 2, 3, 3?', '2', ['1', '3', '6']],
    ['What is the mean of 10, 10, 10, 10?', '10', ['0', '5', '40']],
    ['What is the median of 10, 10, 10, 10?', '10', ['0', '5', '40']],
    ['What is the mode of 10, 10, 10, 10?', '10', ['No mode', '0', '40']],
  ];
  descStats.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  // Probability (80)
  const probability: [string, string, string[]][] = [
    ['What is the probability of flipping heads on a coin?', '1/2', ['1/4', '1/3', '2/3']],
    ['What is the probability of rolling a 6 on a die?', '1/6', ['1/2', '1/3', '1/4']],
    ['What is the probability of rolling an even number on a die?', '1/2', ['1/3', '1/4', '1/6']],
    ['What is the probability of rolling a 1 on a die?', '1/6', ['1/2', '1/3', '1/4']],
    ['What is the probability of drawing an ace from a deck of cards?', '4/52', ['1/4', '1/13', '1/52']],
    ['What is the probability of drawing a heart from a deck of cards?', '13/52', ['1/4', '1/13', '1/52']],
    ['What is the probability of drawing a king from a deck of cards?', '4/52', ['1/4', '1/13', '1/52']],
    ['What is the probability of drawing a red card from a deck?', '26/52', ['1/4', '1/2', '1/13']],
    ['What is the probability of drawing a black card from a deck?', '26/52', ['1/4', '1/2', '1/13']],
    ['What is the probability of drawing a face card from a deck?', '12/52', ['1/4', '1/13', '3/52']],
    ['What is the probability of rolling a number greater than 4 on a die?', '2/6', ['1/6', '1/3', '1/2']],
    ['What is the probability of rolling a number less than 3 on a die?', '2/6', ['1/6', '1/3', '1/2']],
    ['What is the probability of rolling a 7 on a standard die?', '0', ['1/6', '1/12', '1/2']],
    ['What is the probability of an impossible event?', '0', ['1', '1/2', 'undefined']],
    ['What is the probability of a certain event?', '1', ['0', '1/2', 'undefined']],
    ['What is the probability of flipping two heads in a row?', '1/4', ['1/2', '1/8', '1/3']],
    ['What is the probability of flipping two tails in a row?', '1/4', ['1/2', '1/8', '1/3']],
    ['What is the probability of flipping one head and one tail?', '1/2', ['1/4', '1/3', '1/8']],
    ['What is the probability of rolling two dice and getting a sum of 7?', '6/36', ['1/6', '1/12', '1/36']],
    ['What is the probability of rolling two dice and getting a sum of 12?', '1/36', ['1/6', '1/12', '2/36']],
    ['What is the probability of rolling two dice and getting a sum of 2?', '1/36', ['1/6', '1/12', '2/36']],
    ['What is the probability of rolling two dice and getting a sum of 8?', '5/36', ['1/6', '1/12', '6/36']],
    ['What is the probability of rolling two dice and getting doubles?', '6/36', ['1/6', '1/12', '1/36']],
    ['What is the sum of all probabilities?', '1', ['0', '100', 'undefined']],
    ['What is the probability range?', '0 to 1', ['0 to 100', '1 to 100', '-1 to 1']],
    ['What is P(A ∪ B) if A and B are mutually exclusive?', 'P(A) + P(B)', ['P(A) × P(B)', 'P(A) - P(B)', 'P(A)/P(B)']],
    ['What is P(A ∩ B) if A and B are independent?', 'P(A) × P(B)', ['P(A) + P(B)', 'P(A) - P(B)', 'P(A)/P(B)']],
    ['What is the complement of P(A)?', '1 - P(A)', ['P(A) + 1', 'P(A) - 1', '1/P(A)']],
    ['What is a random variable?', 'A variable whose value is determined by chance', ['A fixed number', 'A constant', 'A parameter']],
    ['What is a discrete random variable?', 'Countable values', ['Continuous values', 'Uncountable values', 'Infinite values']],
    ['What is a continuous random variable?', 'Uncountable values', ['Countable values', 'Finite values', 'Discrete values']],
    ['What is the expected value formula?', 'E(X) = Σx × P(x)', ['E(X) = Σx + P(x)', 'E(X) = Σx / P(x)', 'E(X) = Σx - P(x)']],
    ['What is the expected value of a fair die roll?', '3.5', ['3', '4', '3.5']],
    ['What is the expected value of a fair coin flip (heads=1, tails=0)?', '0.5', ['0', '1', '0.25']],
    ['What is a probability distribution?', 'Function showing probabilities of outcomes', ['A type of graph only', 'A type of table only', 'A type of formula only']],
    ['What is a normal distribution?', 'Bell-shaped curve', ['Square shape', 'Triangle shape', 'Flat line']],
    ['What is the mean of a standard normal distribution?', '0', ['1', '10', '100']],
    ['What is the standard deviation of a standard normal distribution?', '1', ['0', '10', '100']],
    ['What is the area under a normal curve?', '1', ['0', '0.5', 'undefined']],
    ['What is the area under a normal curve between -1 and +1 standard deviation?', '0.6827', ['0.9545', '0.9973', '0.5000']],
    ['What is the area under a normal curve between -2 and +2 standard deviations?', '0.9545', ['0.6827', '0.9973', '0.5000']],
    ['What is the area under a normal curve between -3 and +3 standard deviations?', '0.9973', ['0.6827', '0.9545', '0.5000']],
    ['What is the z-score formula?', 'z = (x - μ) / σ', ['z = (μ - x) / σ', 'z = (x + μ) / σ', 'z = x × μ / σ']],
    ['What is the z-score of a value equal to the mean?', '0', ['1', '-1', 'undefined']],
    ['What is the z-score of a value one standard deviation above the mean?', '1', ['0', '2', '-1']],
    ['What is the z-score of a value one standard deviation below the mean?', '-1', ['0', '1', '-2']],
    ['What is a sample?', 'Subset of a population', ['The entire group', 'A type of variable', 'A type of parameter']],
    ['What is a population?', 'The entire group of interest', ['A subset', 'A sample', 'A variable']],
    ['What is a parameter?', 'Numerical summary of a population', ['Numerical summary of a sample', 'A type of variable', 'A type of graph']],
    ['What is a statistic?', 'Numerical summary of a sample', ['Numerical summary of a population', 'A type of variable', 'A type of graph']],
    ['What is sampling?', 'Selecting members from a population', ['Counting everyone', 'Surveying everyone', 'Ignoring the population']],
    ['What is random sampling?', 'Every member has equal chance', ['Only certain members', 'Only volunteers', 'Only nearby members']],
    ['What is stratified sampling?', 'Dividing population into groups', ['Random selection only', 'Selecting volunteers', 'Selecting nearby members']],
    ['What is systematic sampling?', 'Selecting every kth member', ['Random selection only', 'Selecting volunteers', 'Selecting all members']],
    ['What is cluster sampling?', 'Selecting entire groups', ['Selecting individuals', 'Selecting volunteers', 'Selecting every kth']],
    ['What is convenience sampling?', 'Selecting easily accessible members', ['Random selection', 'Stratified selection', 'Systematic selection']],
    ['What is a frequency distribution?', 'Table showing how often values occur', ['A type of graph only', 'A type of formula only', 'A type of parameter only']],
    ['What is a histogram?', 'Bar graph of frequency distribution', ['A type of pie chart', 'A type of line graph', 'A type of scatter plot']],
    ['What is a bar chart?', 'Graph using bars to show data', ['A type of histogram only', 'A type of pie chart', 'A type of line graph']],
    ['What is a pie chart?', 'Circular graph showing proportions', ['A type of bar chart', 'A type of histogram', 'A type of line graph']],
    ['What is a scatter plot?', 'Graph showing relationship between two variables', ['A type of pie chart', 'A type of bar chart', 'A type of histogram']],
    ['What is correlation?', 'Relationship between two variables', ['Difference between variables', 'Sum of variables', 'Product of variables']],
    ['What is a positive correlation?', 'Both variables increase together', ['One increases, other decreases', 'No relationship', 'Variables are equal']],
    ['What is a negative correlation?', 'One increases, other decreases', ['Both increase together', 'No relationship', 'Variables are equal']],
    ['What is no correlation?', 'No relationship between variables', ['Both increase together', 'One increases, other decreases', 'Variables are equal']],
    ['What is the correlation coefficient range?', '-1 to 1', ['0 to 1', '0 to 100', '-100 to 100']],
    ['What does a correlation of 1 mean?', 'Perfect positive correlation', ['Perfect negative correlation', 'No correlation', 'Weak correlation']],
    ['What does a correlation of -1 mean?', 'Perfect negative correlation', ['Perfect positive correlation', 'No correlation', 'Weak correlation']],
    ['What does a correlation of 0 mean?', 'No correlation', ['Perfect positive correlation', 'Perfect negative correlation', 'Weak correlation']],
    ['What is regression?', 'Predicting one variable from another', ['Describing one variable', 'Counting variables', 'Graphing variables']],
    ['What is the independent variable in regression?', 'Predictor variable', ['Response variable', 'Error variable', 'Random variable']],
    ['What is the dependent variable in regression?', 'Response variable', ['Predictor variable', 'Error variable', 'Random variable']],
    ['What is the null hypothesis?', 'No effect or no difference', ['There is an effect', 'There is a difference', 'There is a large effect']],
    ['What is the alternative hypothesis?', 'There is an effect or difference', ['No effect or difference', 'No difference', 'No effect']],
    ['What is a Type I error?', 'Rejecting true null hypothesis', ['Accepting false null hypothesis', 'Accepting true null hypothesis', 'Rejecting false null hypothesis']],
    ['What is a Type II error?', 'Accepting false null hypothesis', ['Rejecting true null hypothesis', 'Accepting true null hypothesis', 'Rejecting false null hypothesis']],
    ['What is the significance level?', 'Probability of Type I error', ['Probability of Type II error', 'Probability of no error', 'Probability of all errors']],
    ['What is the common significance level?', '0.05', ['0.01', '0.10', '0.50']],
    ['What is a p-value?', 'Probability of observing the data if null is true', ['Probability of null being true', 'Probability of alternative being true', 'Probability of no effect']],
    ['If p-value < 0.05, what do we do?', 'Reject the null hypothesis', ['Accept the null hypothesis', 'Do nothing', 'Recalculate']],
    ['If p-value > 0.05, what do we do?', 'Fail to reject the null hypothesis', ['Reject the null hypothesis', 'Accept the alternative', 'Recalculate']],
  ];
  probability.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== EARTH AND LIFE SCIENCE ===============================

function earthLifeScienceQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const geology: [string, string, string[]][] = [
    ['What is the 3rd planet from the sun?', 'Earth', ['Mars', 'Venus', 'Jupiter']],
    ['What are the three main types of rocks?', 'Igneous, sedimentary, metamorphic', ['Hard, soft, medium', 'Big, small, tiny', 'Red, blue, green']],
    ['What type of rock forms from cooled lava?', 'Igneous', ['Sedimentary', 'Metamorphic', 'Sandstone']],
    ['What type of rock forms from compressed sediments?', 'Sedimentary', ['Igneous', 'Metamorphic', 'Granite']],
    ['What type of rock forms from heat and pressure?', 'Metamorphic', ['Igneous', 'Sedimentary', 'Limestone']],
    ['What is the outermost layer of the Earth?', 'Crust', ['Mantle', 'Core', 'Surface']],
    ['What is the thickest layer of the Earth?', 'Mantle', ['Crust', 'Core', 'Surface']],
    ['What is the center of the Earth called?', 'Core', ['Crust', 'Mantle', 'Surface']],
    ['What are the pieces of the Earth\'s crust called?', 'Tectonic plates', ['Rocks', 'Continents', 'Mountains']],
    ['What happens when tectonic plates collide?', 'Earthquakes and mountains', ['Nothing', 'Ocean forms', 'Volcanoes erupt']],
    ['What is the Richter scale used for?', 'Measuring earthquakes', ['Measuring temperature', 'Measuring wind', 'Measuring rain']],
    ['What is the Mohs scale used for?', 'Measuring mineral hardness', ['Measuring temperature', 'Measuring wind', 'Measuring rain']],
    ['What is the hardest mineral?', 'Diamond', ['Quartz', 'Gold', 'Iron']],
    ['What is the softest mineral?', 'Talc', ['Quartz', 'Gold', 'Diamond']],
    ['What is the most abundant mineral in Earth\'s crust?', 'Quartz', ['Gold', 'Diamond', 'Talc']],
    ['What is the largest desert in the world?', 'Antarctica', ['Sahara', 'Gobi', 'Kalahari']],
    ['What is the longest river in the world?', 'Nile', ['Amazon', 'Mississippi', 'Yangtze']],
    ['What is the largest rainforest?', 'Amazon', ['Congo', 'Southeast Asia', 'Madagascar']],
    ['What is the deepest ocean trench?', 'Mariana Trench', ['Philippine Trench', 'Java Trench', 'Tonga Trench']],
    ['What is the tallest mountain on Earth?', 'Mount Everest', ['K2', 'Kilimanjaro', 'Fuji']],
  ];
  geology.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

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
  ];
  biology.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const evolution: [string, string, string[]][] = [
    ['Who proposed the theory of evolution?', 'Charles Darwin', ['Gregor Mendel', 'Louis Pasteur', 'Isaac Newton']],
    ['What is natural selection?', 'Survival of the fittest', ['Random selection', 'Artificial selection', 'Human selection']],
    ['What is adaptation?', 'Changes that help survival', ['Changes that hurt survival', 'Random changes', 'No changes']],
    ['What is a mutation?', 'Change in DNA', ['Change in protein', 'Change in cell', 'Change in tissue']],
    ['What is speciation?', 'Formation of new species', ['Death of species', 'Merger of species', 'No change']],
    ['What is extinction?', 'Complete disappearance of a species', ['Formation of species', 'Change in species', 'No change']],
    ['What is a fossil?', 'Preserved remains of ancient organisms', ['A type of rock', 'A type of mineral', 'A type of crystal']],
    ['What is the geological time scale?', 'Timeline of Earth\'s history', ['A type of clock', 'A type of calendar', 'A type of ruler']],
    ['What era did dinosaurs live in?', 'Mesozoic', ['Paleozoic', 'Cenozoic', 'Precambrian']],
    ['What era do we live in?', 'Cenozoic', ['Paleozoic', 'Mesozoic', 'Precambrian']],
  ];
  evolution.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const ecology: [string, string, string[]][] = [
    ['What is an ecosystem?', 'Community of living and non-living things', ['Only living things', 'Only non-living things', 'Only plants']],
    ['What is a food chain?', 'Sequence of who eats whom', ['A type of restaurant', 'A type of store', 'A type of recipe']],
    ['What is a food web?', 'Interconnected food chains', ['A single food chain', 'A type of internet', 'A type of network']],
    ['What are producers?', 'Organisms that make their own food', ['Organisms that eat others', 'Organisms that decompose', 'Organisms that don\'t eat']],
    ['What are consumers?', 'Organisms that eat other organisms', ['Organisms that make food', 'Organisms that decompose', 'Organisms that don\'t eat']],
    ['What are decomposers?', 'Organisms that break down dead matter', ['Organisms that make food', 'Organisms that eat others', 'Organisms that don\'t eat']],
    ['What is a habitat?', 'Place where an organism lives', ['A type of house', 'A type of food', 'A type of weather']],
    ['What is a niche?', 'Role of an organism in its ecosystem', ['A type of house', 'A type of food', 'A type of weather']],
    ['What is biodiversity?', 'Variety of life in an area', ['Sameness of life', 'Lack of life', 'Only one type of life']],
    ['What is a biome?', 'Large geographic area with similar climate', ['A small area', 'A type of animal', 'A type of plant']],
    ['What is the carbon cycle?', 'Movement of carbon through ecosystems', ['Movement of water', 'Movement of nitrogen', 'Movement of oxygen']],
    ['What is the water cycle?', 'Movement of water through Earth', ['Movement of carbon', 'Movement of nitrogen', 'Movement of oxygen']],
    ['What is the nitrogen cycle?', 'Movement of nitrogen through ecosystems', ['Movement of water', 'Movement of carbon', 'Movement of oxygen']],
    ['What is global warming?', 'Increase in Earth\'s temperature', ['Decrease in temperature', 'No change in temperature', 'Change in seasons']],
    ['What causes global warming?', 'Greenhouse gases', ['Cold air', 'Rain', 'Wind']],
    ['What is the greenhouse effect?', 'Trapping of heat by gases', ['Cooling of Earth', 'Warming of the sun', 'Cooling of the moon']],
    ['What is deforestation?', 'Clearing of forests', ['Planting trees', 'Watering plants', 'Growing food']],
    ['What is pollution?', 'Introduction of harmful substances', ['Cleaning of environment', 'Planting trees', 'Growing food']],
    ['What is conservation?', 'Protection of natural resources', ['Destruction of resources', 'Use of resources', 'Waste of resources']],
    ['What is sustainability?', 'Using resources without depleting them', ['Using all resources', 'Wasting resources', 'Ignoring resources']],
  ];
  ecology.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== PHYSICAL SCIENCE =====================================

function physicalScienceQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

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
  ];
  physics.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const elements: [string, string, string[]][] = [
    ['What is the most abundant element in the universe?', 'Hydrogen', ['Oxygen', 'Carbon', 'Helium']],
    ['What is the second most abundant element in the universe?', 'Helium', ['Hydrogen', 'Oxygen', 'Carbon']],
    ['What is the most abundant element in Earth\'s crust?', 'Oxygen', ['Silicon', 'Aluminum', 'Iron']],
    ['What is the second most abundant element in Earth\'s crust?', 'Silicon', ['Oxygen', 'Aluminum', 'Iron']],
    ['What is the lightest element?', 'Hydrogen', ['Helium', 'Oxygen', 'Carbon']],
    ['What is the heaviest naturally occurring element?', 'Uranium', ['Lead', 'Gold', 'Mercury']],
    ['What element is in all organic compounds?', 'Carbon', ['Oxygen', 'Hydrogen', 'Nitrogen']],
    ['What element do we breathe?', 'Oxygen', ['Carbon dioxide', 'Nitrogen', 'Hydrogen']],
    ['What is the most abundant gas in the atmosphere?', 'Nitrogen', ['Oxygen', 'Carbon dioxide', 'Hydrogen']],
    ['What is the second most abundant gas in the atmosphere?', 'Oxygen', ['Nitrogen', 'Carbon dioxide', 'Hydrogen']],
    ['What is the atomic number of helium?', '2', ['1', '6', '8']],
    ['What is the atomic number of nitrogen?', '7', ['1', '6', '8']],
    ['What is the atomic number of iron?', '26', ['1', '6', '8']],
    ['What is the atomic number of gold?', '79', ['1', '6', '8']],
    ['What is the atomic number of silver?', '47', ['1', '6', '8']],
    ['What is the atomic number of copper?', '29', ['1', '6', '8']],
    ['What is the atomic number of zinc?', '30', ['1', '6', '8']],
    ['What is the atomic number of mercury?', '80', ['1', '6', '8']],
    ['What is the atomic number of lead?', '82', ['1', '6', '8']],
    ['What is the atomic number of uranium?', '92', ['1', '6', '8']],
  ];
  elements.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const reactions: [string, string, string[]][] = [
    ['What is a chemical reaction?', 'Process that changes substances', ['Process that creates energy', 'Process that destroys matter', 'Process that does nothing']],
    ['What are reactants?', 'Starting materials', ['End products', 'Catalysts', 'Waste']],
    ['What are products?', 'End results', ['Starting materials', 'Catalysts', 'Waste']],
    ['What is a catalyst?', 'Substance that speeds up a reaction', ['Substance that slows a reaction', 'Substance that stops a reaction', 'Substance that does nothing']],
    ['What is oxidation?', 'Loss of electrons', ['Gain of electrons', 'No change', 'Loss of protons']],
    ['What is reduction?', 'Gain of electrons', ['Loss of electrons', 'No change', 'Gain of protons']],
    ['What is an exothermic reaction?', 'Releases heat', ['Absorbs heat', 'No heat change', 'Creates cold']],
    ['What is an endothermic reaction?', 'Absorbs heat', ['Releases heat', 'No heat change', 'Creates heat']],
    ['What is combustion?', 'Burning in oxygen', ['Cooling in water', 'Freezing in ice', 'Melting in heat']],
    ['What is rust?', 'Iron oxide', ['Iron sulfide', 'Iron chloride', 'Iron nitrate']],
    ['What is the universal solvent?', 'Water', ['Alcohol', 'Oil', 'Vinegar']],
    ['What is the chemical formula for table salt?', 'NaCl', ['H2O', 'CO2', 'KCl']],
    ['What is the chemical formula for baking soda?', 'NaHCO3', ['NaCl', 'H2O', 'CO2']],
    ['What is the chemical formula for vinegar?', 'CH3COOH', ['NaCl', 'H2O', 'CO2']],
    ['What is the chemical formula for glucose?', 'C6H12O6', ['NaCl', 'H2O', 'CO2']],
    ['What is the chemical formula for methane?', 'CH4', ['NaCl', 'H2O', 'CO2']],
    ['What is the chemical formula for ethanol?', 'C2H5OH', ['NaCl', 'H2O', 'CO2']],
    ['What is the chemical formula for sulfuric acid?', 'H2SO4', ['NaCl', 'H2O', 'CO2']],
    ['What is the chemical formula for hydrochloric acid?', 'HCl', ['NaCl', 'H2O', 'CO2']],
    ['What is the chemical formula for nitric acid?', 'HNO3', ['NaCl', 'H2O', 'CO2']],
  ];
  reactions.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== 21ST CENTURY LITERATURE ===============================

function literatureQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const philLit: [string, string, string[]][] = [
    ['Who wrote "Noli Me Tangere"?', 'Jose Rizal', ['Andres Bonifacio', 'Apolinario Mabini', 'Graciano Lopez Jaena']],
    ['Who wrote "El Filibusterismo"?', 'Jose Rizal', ['Antonio Luna', 'Graciano Lopez Jaena', 'Marcelo del Pilar']],
    ['Who wrote "Florante at Laura"?', 'Francisco Balagtas', ['Jose Rizal', 'Nick Joaquin', 'Carlos Palanca']],
    ['Who wrote "Ibong Adarna"?', 'Jose de la Cruz', ['Francisco Balagtas', 'Jose Rizal', 'Nick Joaquin']],
    ['Who wrote "Dead Stars"?', 'Paz Marquez Benitez', ['Nick Joaquin', 'Carlos Bulosan', 'Manuel Arguilla']],
    ['Who wrote "How My Brother Leon Brought Home a Wife"?', 'Manuel Arguilla', ['Paz Marquez Benitez', 'Nick Joaquin', 'Carlos Bulosan']],
    ['Who wrote "The Woman Who Had Two Navels"?', 'Nick Joaquin', ['Paz Marquez Benitez', 'Manuel Arguilla', 'Carlos Bulosan']],
    ['Who wrote "America Is in the Heart"?', 'Carlos Bulosan', ['Nick Joaquin', 'Manuel Arguilla', 'Paz Marquez Benitez']],
    ['Who wrote "Kartilya ng Katipunan"?', 'Emilio Jacinto', ['Andres Bonifacio', 'Apolinario Mabini', 'Emilio Aguinaldo']],
    ['Who is the National Artist for Literature?', 'Nick Joaquin', ['Jose Rizal', 'Francisco Balagtas', 'Carlos Palanca']],
    ['What is the first Philippine novel?', 'Noli Me Tangere', ['El Filibusterismo', 'Florante at Laura', 'Ibong Adarna']],
    ['What is the national epic of the Philippines?', 'Biag ni Lam-ang', ['Ibong Adarna', 'Florante at Laura', 'Noli Me Tangere']],
    ['Who wrote "Biag ni Lam-ang"?', 'Pedro Bucaneg', ['Francisco Balagtas', 'Jose Rizal', 'Nick Joaquin']],
    ['What is a "balagtasan"?', 'Debate in verse', ['A type of song', 'A type of dance', 'A type of food']],
    ['Who is the "Prince of Filipino Poets"?', 'Francisco Balagtas', ['Jose Rizal', 'Levi Celerio', 'Nicanor Abelardo']],
  ];
  philLit.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const worldLit: [string, string, string[]][] = [
    ['Who wrote "Romeo and Juliet"?', 'William Shakespeare', ['Charles Dickens', 'Jane Austen', 'Mark Twain']],
    ['Who wrote "Hamlet"?', 'William Shakespeare', ['Charles Dickens', 'Jane Austen', 'Mark Twain']],
    ['Who wrote "Macbeth"?', 'William Shakespeare', ['Charles Dickens', 'Jane Austen', 'Mark Twain']],
    ['Who wrote "To Kill a Mockingbird"?', 'Harper Lee', ['J.K. Rowling', 'Stephen King', 'John Steinbeck']],
    ['Who wrote "The Great Gatsby"?', 'F. Scott Fitzgerald', ['Ernest Hemingway', 'John Steinbeck', 'William Faulkner']],
    ['Who wrote "1984"?', 'George Orwell', ['Aldous Huxley', 'Ray Bradbury', 'Isaac Asimov']],
    ['Who wrote "Lord of the Flies"?', 'William Golding', ['J.R.R. Tolkien', 'C.S. Lewis', 'George Orwell']],
    ['Who wrote "The Old Man and the Sea"?', 'Ernest Hemingway', ['John Steinbeck', 'F. Scott Fitzgerald', 'William Faulkner']],
    ['Who wrote "Pride and Prejudice"?', 'Jane Austen', ['Charlotte Bronte', 'Emily Bronte', 'Mary Shelley']],
    ['Who wrote "A Tale of Two Cities"?', 'Charles Dickens', ['Jane Austen', 'Mark Twain', 'Oscar Wilde']],
    ['Who wrote "The Odyssey"?', 'Homer', ['Virgil', 'Dante', 'Ovid']],
    ['Who wrote "The Iliad"?', 'Homer', ['Virgil', 'Dante', 'Ovid']],
    ['Who wrote "Divine Comedy"?', 'Dante Alighieri', ['Homer', 'Virgil', 'Ovid']],
    ['Who wrote "Don Quixote"?', 'Miguel de Cervantes', ['Gabriel Garcia Marquez', 'Pablo Neruda', 'Jorge Luis Borges']],
    ['Who wrote "One Hundred Years of Solitude"?', 'Gabriel Garcia Marquez', ['Miguel de Cervantes', 'Pablo Neruda', 'Jorge Luis Borges']],
  ];
  worldLit.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const literaryDevices: [string, string, string[]][] = [
    ['"The wind whispered" is an example of?', 'Personification', ['Simile', 'Metaphor', 'Hyperbole']],
    ['"Life is a journey" is an example of?', 'Metaphor', ['Simile', 'Personification', 'Hyperbole']],
    ['"She is as pretty as a flower" is an example of?', 'Simile', ['Metaphor', 'Personification', 'Hyperbole']],
    ['"I have told you a million times" is an example of?', 'Hyperbole', ['Simile', 'Metaphor', 'Personification']],
    ['"Buzz, hiss, cuckoo" are examples of?', 'Onomatopoeia', ['Alliteration', 'Assonance', 'Rhyme']],
    ['"Peter Piper picked" is an example of?', 'Alliteration', ['Onomatopoeia', 'Assonance', 'Rhyme']],
    ['"The fire crackled and popped" is an example of?', 'Onomatopoeia', ['Simile', 'Metaphor', 'Alliteration']],
    ['"Her smile was sunshine" is an example of?', 'Metaphor', ['Simile', 'Personification', 'Hyperbole']],
    ['"The leaves danced" is an example of?', 'Personification', ['Simile', 'Metaphor', 'Hyperbole']],
    ['"I am so hungry I could eat a horse" is an example of?', 'Hyperbole', ['Simile', 'Metaphor', 'Personification']],
    ['What is irony?', 'Opposite of what is expected', ['Exactly what is expected', 'Unrelated events', 'Random events']],
    ['What is symbolism?', 'Using objects to represent ideas', ['Using colors only', 'Using numbers only', 'Using words only']],
    ['What is foreshadowing?', 'Hints about future events', ['Past events', 'Current events', 'Unrelated events']],
    ['What is a flashback?', 'Scene from the past', ['Scene from the future', 'Current scene', 'Unrelated scene']],
    ['What is imagery?', 'Descriptive language that appeals to senses', ['Plain language', 'Technical language', 'Simple language']],
  ];
  literaryDevices.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const genres: [string, string, string[]][] = [
    ['What genre is a story about love?', 'Romance', ['Horror', 'Science fiction', 'Mystery']],
    ['What genre is a story about fear?', 'Horror', ['Romance', 'Science fiction', 'Mystery']],
    ['What genre is a story about the future?', 'Science fiction', ['Romance', 'Horror', 'Mystery']],
    ['What genre is a story about solving crimes?', 'Mystery', ['Romance', 'Horror', 'Science fiction']],
    ['What genre is a story about real events?', 'Non-fiction', ['Fiction', 'Fantasy', 'Fairy tale']],
    ['What genre is a story about imaginary events?', 'Fiction', ['Non-fiction', 'Biography', 'Autobiography']],
    ['What genre is a story about a person\'s life written by themselves?', 'Autobiography', ['Biography', 'Fiction', 'Non-fiction']],
    ['What genre is a story about a person\'s life written by someone else?', 'Biography', ['Autobiography', 'Fiction', 'Non-fiction']],
    ['What genre is a short story with a moral?', 'Fable', ['Novel', 'Epic', 'Sonnet']],
    ['What genre is a long narrative poem about heroes?', 'Epic', ['Fable', 'Sonnet', 'Haiku']],
  ];
  genres.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== CONTEMPORARY PHILIPPINE ARTS ==========================

function contemporaryArtsQuestions(): QuizQuestion[] {
  const qs: QuizQuestion[] = [];

  const artists: [string, string, string[]][] = [
    ['Who painted the "Spoliarium"?', 'Juan Luna', ['Fernando Amorsolo', 'Carlos Francisco', 'Jose Rizal']],
    ['Who is known as the "Grand Old Man of Philippine Art"?', 'Fernando Amorsolo', ['Juan Luna', 'Carlos Francisco', 'Jose Joya']],
    ['Who is known for "Bayanihan" painting?', 'Carlos "Botong" Francisco', ['Fernando Amorsolo', 'Juan Luna', 'Jose Joya']],
    ['Who is the National Artist for Visual Arts known for abstract art?', 'Jose Joya', ['Fernando Amorsolo', 'Juan Luna', 'Carlos Francisco']],
    ['Who is the National Artist for Music who composed "Lupang Hinirang"?', 'Julian Felipe', ['Francisco Balagtas', 'Levi Celerio', 'Nicanor Abelardo']],
    ['Who is the National Artist for Music known for kundiman?', 'Nicanor Abelardo', ['Julian Felipe', 'Levi Celerio', 'Francisco Balagtas']],
    ['Who is the National Artist for Literature?', 'Nick Joaquin', ['Jose Rizal', 'Francisco Balagtas', 'Carlos Palanca']],
    ['Who is the National Artist for Dance?', 'Francisca Reyes Aquino', ['Leonor Orosa', 'Alice Reyes', 'Luzviminda']],
    ['Who is the National Artist for Theater?', 'Daisy Avellana', ['Lamberto Avellana', 'Wilfrido Ma. Guerrero', 'Severino Montano']],
    ['Who is the National Artist for Film?', 'Lamberto Avellana', ['Daisy Avellana', 'Gerardo de Leon', 'Manuel Conde']],
  ];
  artists.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const artForms: [string, string, string[]][] = [
    ['What is the art of drawing or painting?', 'Visual arts', ['Music', 'Dance', 'Theater']],
    ['What is the art of making objects from clay?', 'Pottery', ['Painting', 'Sculpture', 'Weaving']],
    ['What is the art of carving stone or wood?', 'Sculpture', ['Painting', 'Pottery', 'Weaving']],
    ['What is the art of making fabric from thread?', 'Weaving', ['Painting', 'Pottery', 'Sculpture']],
    ['What is the art of taking photographs?', 'Photography', ['Painting', 'Pottery', 'Sculpture']],
    ['What is the art of singing?', 'Vocal music', ['Instrumental music', 'Dance', 'Theater']],
    ['What is the art of playing instruments?', 'Instrumental music', ['Vocal music', 'Dance', 'Theater']],
    ['What is the art of moving to music?', 'Dance', ['Music', 'Theater', 'Painting']],
    ['What is the art of acting on stage?', 'Theater', ['Music', 'Dance', 'Painting']],
    ['What is the art of making films?', 'Film making', ['Music', 'Dance', 'Painting']],
  ];
  artForms.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const artHistory: [string, string, string[]][] = [
    ['What is the oldest known form of art?', 'Cave painting', ['Photography', 'Film', 'Digital art']],
    ['Where are the oldest cave paintings found?', 'Indonesia', ['France', 'Spain', 'Egypt']],
    ['What is the most famous cave painting site in France?', 'Lascaux', ['Altamira', 'Chauvet', 'Magura']],
    ['What is the most famous cave painting site in Spain?', 'Altamira', ['Lascaux', 'Chauvet', 'Magura']],
    ['What is the most famous Philippine painting?', 'Spoliarium', ['Bayanihan', 'Mona Lisa', 'The Scream']],
    ['Who painted the Mona Lisa?', 'Leonardo da Vinci', ['Michelangelo', 'Raphael', 'Donatello']],
    ['Who painted The Scream?', 'Edvard Munch', ['Vincent van Gogh', 'Pablo Picasso', 'Salvador Dali']],
    ['Who painted Starry Night?', 'Vincent van Gogh', ['Edvard Munch', 'Pablo Picasso', 'Salvador Dali']],
    ['Who painted Guernica?', 'Pablo Picasso', ['Vincent van Gogh', 'Edvard Munch', 'Salvador Dali']],
    ['Who painted The Persistence of Memory?', 'Salvador Dali', ['Pablo Picasso', 'Vincent van Gogh', 'Edvard Munch']],
  ];
  artHistory.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const philArtTraditions: [string, string, string[]][] = [
    ['What is the traditional Filipino weaving called?', 'Hablon', ['Inabel', 'Pina', 'Jusi']],
    ['What is the traditional Filipino fabric from pineapple?', 'Pina', ['Hablon', 'Inabel', 'Jusi']],
    ['What is the traditional Filipino fabric from Ilocos?', 'Inabel', ['Hablon', 'Pina', 'Jusi']],
    ['What is the traditional Filipino pottery called?', 'Burnay', ['Vase', 'Jar', 'Pot']],
    ['What is the traditional Filipino basket weaving?', 'Basketry', ['Pottery', 'Painting', 'Sculpture']],
    ['What is the traditional Filipino wood carving?', 'Wood carving', ['Pottery', 'Painting', 'Weaving']],
    ['What is the traditional Filipino metal craft?', 'Metalcraft', ['Pottery', 'Painting', 'Weaving']],
    ['What is the traditional Filipino bamboo craft?', 'Bamboo craft', ['Pottery', 'Painting', 'Metalcraft']],
    ['What is the traditional Filipino shell craft?', 'Shell craft', ['Pottery', 'Painting', 'Metalcraft']],
    ['What is the traditional Filipino mat weaving?', 'Mat weaving', ['Pottery', 'Painting', 'Metalcraft']],
  ];
  philArtTraditions.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  const colorTheory: [string, string, string[]][] = [
    ['What are the primary colors?', 'Red, blue, yellow', ['Green, orange, purple', 'Black, white, gray', 'Red, green, blue']],
    ['What do you get when you mix red and blue?', 'Purple', ['Green', 'Orange', 'Brown']],
    ['What do you get when you mix red and yellow?', 'Orange', ['Green', 'Purple', 'Brown']],
    ['What do you get when you mix blue and yellow?', 'Green', ['Orange', 'Purple', 'Brown']],
    ['What do you get when you mix all primary colors?', 'Brown', ['White', 'Black', 'Gray']],
    ['What are complementary colors?', 'Opposite on the color wheel', ['Next to each other', 'Same color', 'Primary colors']],
    ['What are analogous colors?', 'Next to each other on the color wheel', ['Opposite each other', 'Same color', 'Primary colors']],
    ['What is the lightness or darkness of a color?', 'Value', ['Hue', 'Intensity', 'Saturation']],
    ['What is the pure color called?', 'Hue', ['Value', 'Intensity', 'Saturation']],
    ['What is the brightness of a color?', 'Intensity', ['Hue', 'Value', 'Tone']],
  ];
  colorTheory.forEach(([q, a, w]) => qs.push(makeQ(q, a, w)));

  return qs;
}

// ===================== BUILD AND EXPORT =====================================

const GENERATORS: Record<SeniorHighSubject, () => QuizQuestion[]> = {
  'Oral Communication': oralCommunicationQuestions,
  'Komunikasyon at Pananaliksik': komunikasyonQuestions,
  'General Mathematics': generalMathQuestions,
  'Statistics and Probability': statisticsQuestions,
  'Earth and Life Science': earthLifeScienceQuestions,
  'Physical Science': physicalScienceQuestions,
  '21st Century Literature': literatureQuestions,
  'Contemporary Philippine Arts': contemporaryArtsQuestions,
};

const bankCache: Partial<Record<SeniorHighSubject, QuizQuestion[]>> = {};

function buildSubjectBank(subject: SeniorHighSubject): QuizQuestion[] {
  if (bankCache[subject]) return bankCache[subject]!;
  const bank = GENERATORS[subject]();
  bankCache[subject] = bank;
  return bank;
}

export function getSeniorHighSubjectSize(subject: SeniorHighSubject): number {
  return buildSubjectBank(subject).length;
}

export function pickSeniorHighQuestions(subject: SeniorHighSubject, count: number): QuizQuestion[] {
  const bank = buildSubjectBank(subject);
  const n = Math.min(count, bank.length);
  return shuffle(bank).slice(0, n);
}
