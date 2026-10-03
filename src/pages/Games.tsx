import { useState, useEffect, useRef, useCallback } from 'react';
import { addGameScore } from '@/lib/storage';
import { getLang, t } from '@/lib/i18n';
import {
  ANIMALS, COLORS, SHAPES, SHAPE_COLORS, LETTERS, SIMILAR_LETTERS,
  DIFFICULTY_LABELS, DIFFICULTY_COLORS, DIFFICULTY_EMOJIS,
  getDifficultyForStage, getWordPool, getCountRange, getChoiceCount,
  getMemoryPairs, getConnectDotsMax, getBalloonGridSize, shouldHideBalloonLetters,
  getLetterHeroBlanks,
  getStageProgress, setStageProgress, addCompletedStage, isStageCompleted,
  getCompletedStages, TOTAL_STAGES, STAGES_PER_PAGE,
  isCheckpointStage, getCheckpointType,
  shuffle, pickRandom, seedRandom, generateDotPositions,
  type Difficulty,
} from '@/lib/gameData';
import { playAnimalByName } from '@/lib/animalSounds';

export interface GameDef {
  id: string;
  name: string;
  emoji: string;
  color: string;
  render: (onScore: (s: number) => void) => React.ReactNode;
}

export const GAMES: GameDef[] = [
  { id: 'drag-letter', name: 'Spell Quest', emoji: '🔤', color: 'from-candy-pink to-candy-purple', render: (onScore) => <DragDropLetters onScore={onScore} /> },
  { id: 'count-animals', name: 'Animal Safari', emoji: '🐶', color: 'from-candy-yellow to-candy-green', render: (onScore) => <CountAnimals onScore={onScore} /> },
  { id: 'color-match', name: 'Rainbow Hunt', emoji: '🌈', color: 'from-red-400 to-candy-pink', render: (onScore) => <ColorMatching onScore={onScore} /> },
  { id: 'shape-sort', name: 'Shape Adventure', emoji: '🔷', color: 'from-candy-blue to-candy-mint', render: (onScore) => <ShapeSorting onScore={onScore} /> },
  { id: 'pop-balloon', name: 'Balloon Pop', emoji: '🎈', color: 'from-candy-pink to-red-400', render: (onScore) => <PopBalloonLetter onScore={onScore} /> },
  { id: 'memory-match', name: 'Memory Forest', emoji: '🧠', color: 'from-candy-purple to-candy-blue', render: (onScore) => <MemoryMatch onScore={onScore} /> },
  { id: 'connect-dots', name: 'Dot Journey', emoji: '✏️', color: 'from-candy-mint to-candy-green', render: (onScore) => <ConnectDots onScore={onScore} /> },
  { id: 'fill-letter', name: 'Letter Hero', emoji: '📝', color: 'from-candy-yellow to-candy-pink', render: (onScore) => <FillMissingLetter onScore={onScore} /> },
  { id: 'animal-sound', name: 'Name the Animals', emoji: '🐾', color: 'from-candy-blue to-candy-purple', render: (onScore) => <AnimalSound onScore={onScore} /> },
  { id: 'color-draw', name: 'Color World', emoji: '🎨', color: 'from-candy-pink to-candy-yellow', render: (onScore) => <ColorDrawing onScore={onScore} /> },
];

interface GameProps { onScore: (s: number) => void; }

const lang = () => getLang();

function animalName(a: typeof ANIMALS[0]): string {
  return lang() === 'tl' ? a.tl : a.name;
}
function colorName(c: typeof COLORS[0]): string {
  return lang() === 'tl' ? c.tl : c.name;
}
function shapeName(s: typeof SHAPES[0]): string {
  return lang() === 'tl' ? s.tl : s.name;
}

const STORIES: Record<string, { intros: string[]; wins: string[]; tasks: string[] }> = {
  'drag-letter': {
    intros: ['Mateo wants to learn how to spell!', 'Teacher Nena is teaching new words.', 'The little child is ready for the spelling bee!'],
    wins: ['You spelled it right! Mateo is happy!', 'Bravo! Teacher Nena is proud!', 'Yay! The little child did great!'],
    tasks: ['Help! Arrange the letters for Mateo.', 'Put the letters in order to complete the word.', 'Build the word for the spelling bee!'],
  },
  'count-animals': {
    intros: ['Safari Time! Kiko is at the zoo and wants to count the animals.', 'The farmer asks: how many animals do I have?', 'Its animal month, lets count together!'],
    wins: ['Correct! Kiko counted them all!', 'Bravo! The farmer knows the answer!', 'Yay! All animals counted!'],
    tasks: ['Count the animals for Kiko!', 'Help the farmer count them!', 'How many animals do you see?'],
  },
  'color-match': {
    intros: ['Lola is making a rainbow and needs the right color!', 'The painter is looking for a color for the painting.', 'In the world of colors, pick the right one!'],
    wins: ['Correct! Lola found the color!', 'Bravo! The painting is done!', 'Yay! The rainbow is complete!'],
    tasks: ['Pick the color for Lola!', 'Find the color for the painting!', 'Which color is needed?'],
  },
  'shape-sort': {
    intros: ['Teacher Amy is teaching shapes in class.', 'The architect is looking for the right shape for the building.', 'At the shape game, discover the right one!'],
    wins: ['Correct! Teacher Amy is happy!', 'Bravo! The architect found the shape!', 'Yay! Won the shape game!'],
    tasks: ['Tap the shape for Teacher Amy!', 'Which shape does the architect need?', 'Find the right shape!'],
  },
  'pop-balloon': {
    intros: ['At the fiesta, there are many balloons with hidden letters!', 'Nena is playing with balloons and looking for a letter.', 'The balloon bunch has a surprise inside!'],
    wins: ['Found the letter! Surprise!', 'Yay! Nena popped the right balloon!', 'Bravo! Got the letter at the fiesta!'],
    tasks: ['Find this letter among the balloons!', 'Pop the balloon with the right letter!', 'Which balloon has the letter?'],
  },
  'memory-match': {
    intros: ['In the forest, lets play memory game with the animals!', 'Grandpa has a memory game full of animals.', 'In the animal paradise, match the pairs!'],
    wins: ['All pairs matched! Amazing!', 'Bravo! Grandpa matched them all!', 'Yay! Memory game complete!'],
    tasks: ['Match the animal pairs!', 'Find the pair for each animal!', 'Open the cards and match!'],
  },
  'connect-dots': {
    intros: ['Captain Bola is drawing a map using dots.', 'The fisherman Dodo connects dots to see the route.', 'At the beach, follow the dots!'],
    wins: ['The route is done! Thank you!', 'Bravo! Dodo found the route!', 'Yay! The map is complete!'],
    tasks: ['Follow the numbers for the Captain!', 'Connect the dots together!', 'Follow the fishermans route!'],
  },
  'fill-letter': {
    intros: ['Miss Rosa is writing a poem but a letter is missing!', 'Little Pong wants to finish the word.', 'At school, theres a word with a missing letter!'],
    wins: ['Correct! Rosas poem is done!', 'Bravo! Pong finished the word!', 'Yay! The word is complete!'],
    tasks: ['Which letter is missing in the poem?', 'Complete the word for Pong!', 'Fill in the missing letter!'],
  },
  'animal-sound': {
    intros: ['In the Philippine forest, many animals are making sounds! Listen and guess!', 'Dr. Animal asks: which animal makes this sound?', 'Its nature month, listen to the sounds of nature!'],
    wins: ['Correct! Thats the animal sound!', 'Bravo! Dr. Animal knows the animal!', 'Yay! Great job guessing the sound!'],
    tasks: ['Listen to the sound and guess the animal!', 'Which animal makes this sound?', 'Name the animal from the sound!'],
  },
  'color-draw': {
    intros: ['Ate Mae is painting a beautiful picture and needs help!', 'In art class, color the picture!', 'The little artist is ready to paint!'],
    wins: ['Bravo! Ate Maes painting is beautiful!', 'Yay! Art class is done!', 'Great! The colors look amazing!'],
    tasks: ['Color the picture for Ate Mae!', 'Fill each part with color!', 'Make a beautiful painting!'],
  },
};

function getStory(gameId: string, stage: number, type: 'intro' | 'win' | 'task'): string {
  const stories = STORIES[gameId];
  if (!stories) return '';
  const arr = type === 'intro' ? stories.intros : type === 'win' ? stories.wins : stories.tasks;
  const r = seedRandom(stage * 100 + type.charCodeAt(0));
  return arr[Math.floor(r() * arr.length)];
}

function useStage(gameId: string) {
  const [stage, setStage] = useState(() => {
    // One-shot override set by the stage map when replaying an old stage
    const forced = parseInt(localStorage.getItem(`playStage_${gameId}`) ?? '0', 10);
    if (forced > 0) {
      localStorage.removeItem(`playStage_${gameId}`);
      return forced;
    }
    return getStageProgress(gameId);
  });
  useEffect(() => {
    localStorage.setItem(`curStage_${gameId}`, String(stage));
  }, [stage, gameId]);
  const difficulty = getDifficultyForStage(stage);
  const rng = useCallback(() => seedRandom(stage * 1000 + gameId.charCodeAt(0)), [stage, gameId]);

  const goTo = useCallback((s: number) => {
    setStage(Math.max(1, Math.min(s, TOTAL_STAGES)));
  }, []);

  const next = useCallback((won: boolean) => {
    if (won) {
      addCompletedStage(gameId, stage);
      const newStage = Math.min(stage + 1, TOTAL_STAGES);
      setStageProgress(gameId, newStage);
      setStage(newStage);
    }
  }, [stage, gameId]);

  return { stage, difficulty, rng, next, goTo };
}

function StoryBanner({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-3 mb-3 border-l-4 border-candy-purple animate-slide-up">
      <div className="flex items-start gap-2">
        <span className="text-2xl flex-shrink-0">📖</span>
        <p className="text-sm text-gray-600 leading-snug">{text}</p>
      </div>
    </div>
  );
}

function HintBanner({ hint }: { hint: string }) {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-3 mb-3 border-l-4 border-yellow-400 animate-slide-up">
      <div className="flex items-start gap-2">
        <span className="text-2xl flex-shrink-0">💡</span>
        <p className="text-sm text-gray-600 leading-snug">{hint}</p>
      </div>
    </div>
  );
}

function StageHeader({ stage, difficulty, score }: { stage: number; difficulty: Difficulty; score: number }) {
  const checkpoint = getCheckpointType(stage);
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-400">Stage {stage} / {TOTAL_STAGES}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${DIFFICULTY_COLORS[difficulty]} text-white flex items-center gap-1`}>
          {DIFFICULTY_EMOJIS[difficulty]} {DIFFICULTY_LABELS[difficulty]}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full transition-all" style={{ width: `${(stage / TOTAL_STAGES) * 100}%` }} />
      </div>
      {checkpoint && (
        <p className="text-center text-xs font-bold mt-1.5 text-candy-purple">
          {checkpoint === 'hard' && '🔥 Hard Challenge!'}
          {checkpoint === 'very-hard' && '🏆 Very Hard Challenge!'}
        </p>
      )}
      {score > 0 && <p className="text-center text-candy-green font-bold mt-2 animate-pop">+{score} points!</p>}
    </div>
  );
}

function RetryNotice() {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 rounded-xl p-3 mb-3 animate-slide-up">
      <p className="text-center text-red-500 font-bold text-sm">❌ Please retry this stage!</p>
    </div>
  );
}

function WinScreen({ onNext, onRetry, story }: { onNext: () => void; onRetry: () => void; story: string }) {
  return (
    <div className="text-center py-4 animate-pop">
      <div className="text-5xl mb-3 animate-bounce-in">🎉</div>
      <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-3 mb-4 border-l-4 border-candy-green">
        <p className="text-sm text-gray-600">{story}</p>
      </div>
      <p className="font-bold text-candy-green text-lg mb-4">Correct! 🎉</p>
      <button onClick={onNext} className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-3 font-bold text-white shadow active:scale-95 transition mb-2">
        Next Stage →
      </button>
      <button onClick={onRetry} className="w-full bg-gray-200 rounded-full py-2 font-bold text-gray-500 text-sm">Try Again</button>
    </div>
  );
}

function FailScreen({ onRetry, correctAnswer }: { onRetry: () => void; correctAnswer?: string }) {
  return (
    <div className="text-center py-4 animate-pop">
      <div className="text-5xl mb-3">😢</div>
      <RetryNotice />
      {correctAnswer && (
        <p className="text-center text-sm font-bold text-candy-purple mb-3 bg-purple-50 rounded-xl p-2">
          💡 The correct answer was: <span className="text-candy-pink">{correctAnswer}</span>
        </p>
      )}
      <button onClick={onRetry} className="w-full bg-gradient-to-r from-candy-blue to-candy-purple rounded-full py-3 font-bold text-white shadow active:scale-95 transition">
        Please Retry
      </button>
    </div>
  );
}

function GameWrapper({ children, title, gameId, stage }: { children: React.ReactNode; title: string; gameId: string; stage: number }) {
  const intro = getStory(gameId, stage, 'intro');
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <StoryBanner text={intro} />
      <h3 className="font-bold text-gray-700 mb-3 text-center">{title}</h3>
      {children}
    </div>
  );
}

const SPELL_SENTENCES = [
  'The magic word today is',
  'Teacher Nena wrote a new word:',
  'The spelling bee word is',
  'Can you spell the mystery word',
  'The secret word of the day is',
  'Kiko found a mystery word:',
];

// 1. Spell Quest - a sentence with the word blanked out
function DragDropLetters({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('drag-letter');
  const [word, setWord] = useState('');
  const [letters, setLetters] = useState<string[]>([]);
  const [arranged, setArranged] = useState<string[]>([]);
  const [result, setResult] = useState<'none' | 'win' | 'fail'>('none');
  const [score, setScore] = useState(0);
  const [hidden, setHidden] = useState<number[]>([]);
  const [sentence, setSentence] = useState(SPELL_SENTENCES[0]);

  useEffect(() => {
    const pool = getWordPool(difficulty);
    const r = rng();
    const w = pool[Math.floor(r() * pool.length)];
    setWord(w);
    const scrambled = w.split('').map((l, i) => ({ l, o: r() })).sort((a, b) => a.o - b.o).map(x => x.l);
    setLetters(scrambled);
    setArranged([]); setResult('none'); setScore(0);
    const blankCount = getLetterHeroBlanks(difficulty);
    setHidden(shuffle(w.split('').map((_, i) => i)).slice(0, blankCount));
    setSentence(SPELL_SENTENCES[Math.floor(r() * SPELL_SENTENCES.length)]);
  }, [stage, difficulty]);

  const place = (letter: string) => {
    if (result !== 'none') return;
    const nextArr = [...arranged, letter];
    setArranged(nextArr);
    setLetters(l => l.filter((_, i) => i !== letters.indexOf(letter)));
    if (nextArr.length === word.length) {
      const correct = nextArr.join('') === word;
      const pts = correct ? 10 + difficulty.length * 5 : 0;
      if (correct) { setScore(pts); onScore(pts); }
      setResult(correct ? 'win' : 'fail');
    }
  };

  const retry = () => {
    setArranged([]); setLetters(word.split('').sort(() => Math.random() - 0.5)); setResult('none'); setScore(0);
  };

  return (
    <GameWrapper title="Spell the Mystery Word!" gameId="drag-letter" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <p className="text-center text-sm text-candy-purple font-bold mb-3">{getStory('drag-letter', stage, 'task')}</p>
          <p className="text-center text-sm font-bold text-gray-600 mb-1">{sentence}</p>
          <p className="text-center text-2xl font-bold text-candy-purple tracking-[0.35em] mb-3">
            {word.split('').map((letter, i) => <span key={i}>{hidden.includes(i) ? '_' : letter}</span>)}
          </p>
          <p className="text-center text-xs text-gray-400 mb-2">Fill the {hidden.length} blank{hidden.length === 1 ? '' : 's'} to reveal the word.</p>
          <div className="flex justify-center gap-1.5 mb-4 min-h-[56px] flex-wrap">
            {arranged.map((l, i) => <div key={i} className="w-12 h-12 bg-candy-green rounded-xl flex items-center justify-center text-xl font-bold text-white shadow animate-pop">{l}</div>)}
            {Array.from({ length: word.length - arranged.length }).map((_, i) => <div key={`b${i}`} className="w-12 h-12 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300" />)}
          </div>
          <div className="flex justify-center gap-1.5 flex-wrap">
            {letters.map((l, i) => (
              <button key={i} onClick={() => place(l)} className="w-12 h-12 rounded-xl bg-candy-pink flex items-center justify-center text-xl font-bold text-white shadow active:scale-90 transition">{l}</button>
            ))}
          </div>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={retry} story={getStory('drag-letter', stage, 'win')} />}
      {result === 'fail' && <FailScreen onRetry={retry} correctAnswer={word} />}
    </GameWrapper>
  );
}

// 2. Animal Safari - type the answer
function CountAnimals({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('count-animals');
  const [count, setCount] = useState(0);
  const [animal, setAnimal] = useState(ANIMALS[0]);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState<'none' | 'win' | 'fail'>('none');
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    const r = rng();
    const range = getCountRange(difficulty);
    const c = range.min + Math.floor(r() * (range.max - range.min + 1));
    setCount(c);
    setAnimal(ANIMALS[Math.floor(r() * ANIMALS.length)]);
    setGuess(''); setResult('none'); setScore(0); setWrongCount(0);
  }, [stage, difficulty]);

  const check = () => {
    const num = parseInt(guess, 10);
    if (num === count) {
      const pts = 10 + difficulty.length * 5;
      setScore(pts); onScore(pts);
      setResult('win');
    } else {
      const w = wrongCount + 1;
      setWrongCount(w);
      if (w >= 3) setResult('fail');
      else setGuess('');
    }
  };

  const retry = () => { setGuess(''); setResult('none'); setScore(0); setWrongCount(0); };

  return (
    <GameWrapper title={`Count the ${animalName(animal)}!`} gameId="count-animals" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <p className="text-center text-sm text-candy-green font-bold mb-3">{getStory('count-animals', stage, 'task')}</p>
          <p className="text-center text-xs text-gray-400 mb-2">Wrong tries: {wrongCount}/3</p>
          <div className="flex flex-wrap justify-center gap-1.5 mb-4 max-h-48 overflow-y-auto">
            {Array.from({ length: count }).map((_, i) => <span key={i} className="text-3xl animate-pop" style={{ animationDelay: `${i * 0.02}s` }}>{animal.emoji}</span>)}
          </div>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type your answer"
            className="w-full text-center text-2xl font-bold text-gray-700 bg-gray-50 rounded-2xl py-3 mb-3 border-2 border-gray-200 focus:border-candy-green focus:outline-none"
          />
          <button onClick={check} disabled={!guess} className="w-full bg-candy-green rounded-full py-2.5 font-bold text-white shadow active:scale-95 transition disabled:opacity-50">Check</button>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={retry} story={getStory('count-animals', stage, 'win')} />}
      {result === 'fail' && <FailScreen onRetry={retry} correctAnswer={String(count)} />}
    </GameWrapper>
  );
}

// 3. Rainbow Hunt - the color name is written in a tricky random ink color
function ColorMatching({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('color-match');
  const [target, setTarget] = useState(COLORS[0]);
  const [choices, setChoices] = useState<typeof COLORS>([]);
  const [result, setResult] = useState<'none' | 'win' | 'fail'>('none');
  const [score, setScore] = useState(0);
  const [promptColor, setPromptColor] = useState('#333333');
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    const r = rng();
    const numChoices = getChoiceCount(difficulty);
    const shuffled = shuffle(COLORS);
    setTarget(shuffled[0]);
    setChoices(shuffle([shuffled[0], ...shuffled.slice(1, numChoices)]));
    const others = shuffled.slice(numChoices);
    setPromptColor(others[Math.floor(r() * others.length)]?.hex ?? '#333333');
    setResult('none'); setScore(0); setWrongCount(0);
  }, [stage, difficulty]);

  const pick = (c: typeof COLORS[0]) => {
    if (result !== 'none') return;
    if (c.name === target.name) {
      const pts = 10 + difficulty.length * 5;
      setScore(pts); onScore(pts);
      setResult('win');
    } else {
      const w = wrongCount + 1;
      setWrongCount(w);
      if (w >= 3) setResult('fail');
    }
  };

  const retry = () => { setResult('none'); setScore(0); setWrongCount(0); };

  return (
    <GameWrapper title="Rainbow Hunt" gameId="color-match" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <p className="text-center text-sm text-candy-pink font-bold mb-3">{getStory('color-match', stage, 'task')}</p>
          <p className="text-center text-3xl font-bold mb-1" style={{ color: promptColor }}>Pick {colorName(target)}</p>
          <p className="text-center text-[10px] text-gray-400 mb-3">Read the name — the ink color is a trick!</p>
          <p className="text-center text-xs text-gray-400 mb-2">Wrong picks: {wrongCount}/3</p>
          <div className="grid grid-cols-3 gap-3">
            {choices.map((c, i) => (
              <button key={i} onClick={() => pick(c)} className="aspect-square rounded-2xl shadow border-2 border-gray-100 active:scale-90 transition" style={{ background: c.hex }} />
            ))}
          </div>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={retry} story={getStory('color-match', stage, 'win')} />}
      {result === 'fail' && <FailScreen onRetry={retry} correctAnswer={`${colorName(target)} (${target.hex})`} />}
    </GameWrapper>
  );
}

// 4. Shape Adventure - every shape is drawn as an SVG in one of 50 random colors
const SHAPE_SVGS: Record<string, React.ReactNode> = {
  Circle: <circle cx="20" cy="20" r="16" />,
  Square: <rect x="5" y="5" width="30" height="30" rx="2" />,
  Triangle: <polygon points="20,4 36,35 4,35" />,
  Star: <polygon points="20,3 24.6,13.6 36,14.2 27.5,22 30.3,33.4 20,27.4 9.7,33.4 12.5,22 4,14.2 15.4,13.6" />,
  Heart: <path d="M20 35 C6 24 3 14 10 8.5 C15 4.8 20 9 20 13 C20 9 25 4.8 30 8.5 C37 14 34 24 20 35 Z" />,
  Diamond: <polygon points="20,3 37,20 20,37 3,20" />,
  Pentagon: <polygon points="20,3 36,14.5 30,34.5 10,34.5 4,14.5" />,
  Hexagon: <polygon points="12,4 28,4 37,20 28,36 12,36 3,20" />,
  Cross: <path d="M15 5 h10 v10 h10 v10 h-10 v10 h-10 v-10 h-10 v-10 h-10 Z" />,
  Arrow: <path d="M4 18 h20 v-8 l12 10 -12 10 v-8 h-20 Z" />,
  Crescent: <path d="M26 4 A16 16 0 1 0 26 36 A20 20 0 1 1 26 4 Z" />,
  Cloud: <path d="M11 30 a8 8 0 0 1 0-16 a10 10 0 0 1 18.5-3 a9 9 0 0 1 2.5 19 Z" />,
  Rectangle: <rect x="3" y="11" width="34" height="18" rx="2" />,
  Oval: <ellipse cx="20" cy="20" rx="17" ry="11" />,
  Cylinder: <path d="M8 9 a12 4.5 0 0 0 24 0 v22 a12 4.5 0 0 1 -24 0 Z" />,
  Cone: <path d="M20 4 L32 32 a12 4 0 0 1 -24 0 Z" />,
  Ring: <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="7" />,
  Target: <g><circle cx="20" cy="20" r="16" /><circle cx="20" cy="20" r="9" fill="#fff" /><circle cx="20" cy="20" r="4" /></g>,
  Octagon: <polygon points="13,4 27,4 36,13 36,27 27,36 13,36 4,27 4,13" />,
  Cube: <polygon points="20,4 34,11 34,29 20,36 6,29 6,11" />,
  Pyramid: <polygon points="20,5 36,34 4,34" />,
  Rhombus: <polygon points="20,7 33,20 20,33 7,20" />,
  Bolt: <path d="M22 3 L8 22 h9 L15 37 L30 17 h-9 Z" />,
  Drop: <path d="M20 4 C20 4 8 18 8 26 a12 12 0 0 0 24 0 C32 18 20 4 20 4 Z" />,
  Gem: <polygon points="12,6 28,6 36,16 20,36 4,16" />,
  Sun: <g><circle cx="20" cy="20" r="8" /><g stroke="currentColor" strokeWidth="3">{[0, 45, 90, 135, 180, 225, 270, 315].map(a => <line key={a} x1={20 + Math.cos(a * Math.PI / 180) * 12} y1={20 + Math.sin(a * Math.PI / 180) * 12} x2={20 + Math.cos(a * Math.PI / 180) * 17} y2={20 + Math.sin(a * Math.PI / 180) * 17} />)}</g></g>,
  Umbrella: <path d="M20 5 a15 15 0 0 1 15 12 H5 A15 15 0 0 1 20 5 Z M20 17 v13 a4 4 0 0 0 8 3" />,
};

interface ShapePic { shape: typeof SHAPES[0]; color: string; rotate: number }

function makeShapePics(r: () => number): ShapePic[] {
  return SHAPES.map(s => ({
    shape: s,
    color: SHAPE_COLORS[Math.floor(r() * SHAPE_COLORS.length)],
    rotate: Math.floor(r() * 60) - 30,
  }));
}

function ShapePicView({ pic, size = 40 }: { pic: ShapePic; size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="currentColor" style={{ color: pic.color, transform: `rotate(${pic.rotate}deg)` }}>
      {SHAPE_SVGS[pic.shape.name] ?? <circle cx="20" cy="20" r="16" />}
    </svg>
  );
}

function ShapeSorting({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('shape-sort');
  const [target, setTarget] = useState<ShapePic | null>(null);
  const [choices, setChoices] = useState<ShapePic[]>([]);
  const [result, setResult] = useState<'none' | 'win' | 'fail'>('none');
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    const r = rng();
    const numChoices = getChoiceCount(difficulty);
    const pics = shuffle(makeShapePics(r)).slice(0, numChoices);
    setTarget(pics[0]);
    setChoices(shuffle(pics));
    setResult('none'); setScore(0); setWrongCount(0);
  }, [stage, difficulty]);

  const pick = (p: ShapePic) => {
    if (result !== 'none' || !target) return;
    if (p.shape.name === target.shape.name) {
      const pts = 10 + difficulty.length * 5;
      setScore(pts); onScore(pts);
      setResult('win');
    } else {
      const w = wrongCount + 1;
      setWrongCount(w);
      if (w >= 3) setResult('fail');
    }
  };

  const retry = () => { setResult('none'); setScore(0); setWrongCount(0); };

  return (
    <GameWrapper title="Shape Adventure" gameId="shape-sort" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <p className="text-center text-sm text-candy-blue font-bold mb-3">{getStory('shape-sort', stage, 'task')}</p>
          <div className="flex items-center justify-center mb-3 bg-gray-50 rounded-2xl py-3">
            <p className="text-2xl font-bold text-gray-700">{target ? shapeName(target.shape) : ''}</p>
          </div>
          <p className="text-center text-xs text-gray-400 mb-2">Wrong taps: {wrongCount}/3</p>
          <div className="grid grid-cols-3 gap-3">
            {choices.map((p, i) => (
              <button key={i} onClick={() => pick(p)} className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center shadow active:scale-90 transition hover:bg-gray-100">
                <ShapePicView pic={p} size={48} />
              </button>
            ))}
          </div>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={retry} story={getStory('shape-sort', stage, 'win')} />}
      {result === 'fail' && <FailScreen onRetry={retry} correctAnswer={target ? shapeName(target.shape) : ''} />}
    </GameWrapper>
  );
}

// 5. Balloon Pop - big balloons, look-alike letters/numbers, 3 strikes
function PopBalloonLetter({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('pop-balloon');
  const [target, setTarget] = useState('A');
  const [balloons, setBalloons] = useState<{ id: number; letter: string }[]>([]);
  const [popped, setPopped] = useState<number[]>([]);
  const [result, setResult] = useState<'none' | 'win' | 'fail'>('none');
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const useNumbers = difficulty === 'hard' || difficulty === 'very-hard';

  useEffect(() => {
    const r = rng();
    const gridSize = getBalloonGridSize(difficulty);
    const targetLetter = useNumbers ? String(1 + Math.floor(r() * 20)) : LETTERS[Math.floor(r() * 26)];
    setTarget(targetLetter);
    const pool = useNumbers ? Array.from({ length: 20 }, (_, i) => String(i + 1)) : LETTERS;
    const similar = useNumbers
      ? [String(parseInt(targetLetter) + 1), String(parseInt(targetLetter) - 1), String(parseInt(targetLetter) + 10), String(parseInt(targetLetter) - 10)].filter(n => parseInt(n) >= 1 && n !== targetLetter)
      : (SIMILAR_LETTERS[targetLetter] ?? []);
    const letters = Array.from({ length: gridSize }, (_, i) => ({
      id: i,
      letter: i < 2
        ? targetLetter
        : (similar.length > 0 && r() < 0.6 ? similar[Math.floor(r() * similar.length)] : pool[Math.floor(r() * pool.length)]),
    }));
    setBalloons(shuffle(letters));
    setPopped([]); setResult('none'); setScore(0); setWrongCount(0);
  }, [stage, difficulty]);

  const pop = (id: number, letter: string) => {
    if (popped.includes(id) || result !== 'none') return;
    setPopped(p => [...p, id]);
    if (letter === target) {
      const pts = 10 + difficulty.length * 5;
      setScore(pts); onScore(pts);
      setResult('win');
    } else {
      const w = wrongCount + 1;
      setWrongCount(w);
      if (w >= 3) setResult('fail');
    }
  };

  const retry = () => { setPopped([]); setResult('none'); setScore(0); setWrongCount(0); };

  return (
    <GameWrapper title={`Find ${target}!`} gameId="pop-balloon" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <p className="text-center text-sm text-candy-pink font-bold mb-3">{getStory('pop-balloon', stage, 'task')}</p>
          <p className="text-center text-xs text-gray-400 mb-2">Wrong pops: {wrongCount}/3</p>
          <div className="grid grid-cols-4 gap-2 max-h-[420px] overflow-y-auto no-scrollbar">
            {balloons.map(b => (
              <button
                key={b.id}
                onClick={() => pop(b.id, b.letter)}
                disabled={popped.includes(b.id)}
                className={`aspect-square transition flex items-center justify-center ${popped.includes(b.id) ? 'opacity-20' : 'active:scale-90 animate-float'}`}
                style={{ animationDelay: `${b.id * 0.05}s` }}
              >
                {popped.includes(b.id) ? <span className="text-4xl">💥</span> : (
                  <span className="relative flex items-center justify-center">
                    <span className="text-5xl leading-none">🎈</span>
                    <span className="absolute text-base font-bold text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>{b.letter}</span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={retry} story={getStory('pop-balloon', stage, 'win')} />}
      {result === 'fail' && <FailScreen onRetry={retry} correctAnswer={target} />}
    </GameWrapper>
  );
}

// 6. Memory Forest
function MemoryMatch({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('memory-match');
  const [cards, setCards] = useState<{ id: number; emoji: string }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [result, setResult] = useState<'none' | 'win'>('none');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const r = rng();
    const pairs = getMemoryPairs(difficulty);
    const selected = pickRandom(ANIMALS, pairs);
    const cardArr = shuffle([...selected, ...selected]).map((a, i) => ({ id: i, emoji: a.emoji }));
    setCards(cardArr);
    setFlipped([]); setMatched([]); setResult('none'); setScore(0);
  }, [stage, difficulty]);

  const flip = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx) || result !== 'none') return;
    const nextFlipped = [...flipped, idx];
    setFlipped(nextFlipped);
    if (nextFlipped.length === 2) {
      if (cards[nextFlipped[0]].emoji === cards[nextFlipped[1]].emoji) {
        setMatched(m => [...m, ...nextFlipped]);
        setScore(s => s + 2); onScore(2);
        if (matched.length + 2 === cards.length) {
          const pts = 10 + difficulty.length * 5;
          setScore(s => s + pts); onScore(pts);
          setResult('win');
        }
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  const cols = cards.length <= 8 ? 4 : cards.length <= 12 ? 4 : 6;

  return (
    <GameWrapper title="Memory Match!" gameId="memory-match" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <p className="text-center text-sm text-candy-purple font-bold mb-3">{getStory('memory-match', stage, 'task')}</p>
          <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {cards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => flip(i)}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow transition ${flipped.includes(i) || matched.includes(i) ? 'bg-white' : 'bg-candy-purple'}`}
              >
                {flipped.includes(i) || matched.includes(i) ? card.emoji : '❓'}
              </button>
            ))}
          </div>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={() => { setFlipped([]); setMatched([]); setResult('none'); setScore(0); }} story={getStory('memory-match', stage, 'win')} />}
    </GameWrapper>
  );
}

// 7. Dot Journey - most dots drift around, only completed dots stand out
function ConnectDots({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('connect-dots');
  const [max, setMax] = useState(10);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [moving, setMoving] = useState<number[]>([]);
  const [current, setCurrent] = useState(1);
  const [result, setResult] = useState<'none' | 'win' | 'fail'>('none');
  const [score, setScore] = useState(0);
  const [wrongTap, setWrongTap] = useState<number | null>(null);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    const m = getConnectDotsMax(difficulty);
    setMax(m);
    setPositions(generateDotPositions(m, stage * 1000));
    const r = rng();
    setMoving(Array.from({ length: m }, (_, i) => i + 1).filter(() => r() < 0.8));
    setCurrent(1); setResult('none'); setScore(0); setWrongCount(0);
  }, [stage, difficulty]);

  const connect = (n: number) => {
    if (result !== 'none') return;
    if (n === current && current <= max) {
      setCurrent(c => c + 1);
      if (current === max) {
        const pts = 10 + difficulty.length * 5;
        setScore(pts); onScore(pts);
        setResult('win');
      }
    } else if (n !== current) {
      setWrongTap(n);
      setTimeout(() => setWrongTap(null), 500);
      const w = wrongCount + 1;
      setWrongCount(w);
      if (w >= 3) setResult('fail');
    }
  };

  return (
    <GameWrapper title="Connect the Dots!" gameId="connect-dots" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <p className="text-center text-sm text-candy-mint font-bold mb-3">{getStory('connect-dots', stage, 'task')}</p>
          <p className="text-center text-xs text-gray-400 mb-2">Wrong taps: {wrongCount}/3 • most dots are drifting!</p>
          <p className="text-center text-sm text-gray-500 mb-3">Tap number {current <= max ? current : '✓'}</p>
          <div className="relative w-full bg-gray-50 rounded-2xl border-2 border-gray-200" style={{ aspectRatio: '1 / 1' }}>
            {Array.from({ length: max }, (_, i) => i + 1).map(n => {
              const done = n < current;
              const isMoving = moving.includes(n);
              return (
                <button
                  key={n}
                  onClick={() => connect(n)}
                  className={`absolute w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    done
                      ? 'bg-candy-green text-white scale-90'
                      : wrongTap === n
                      ? 'bg-red-400 text-white animate-pop'
                      : 'bg-gray-200 text-gray-400'
                  } ${isMoving && !done ? 'animate-drift' : ''}`}
                  style={{
                    left: `${positions[n - 1]?.x ?? 50}%`,
                    top: `${positions[n - 1]?.y ?? 50}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDuration: isMoving ? `${4 + (n % 5)}s` : undefined,
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={() => { setCurrent(1); setResult('none'); setScore(0); setWrongCount(0); }} story={getStory('connect-dots', stage, 'win')} />}
      {result === 'fail' && <FailScreen onRetry={() => { setCurrent(1); setResult('none'); setScore(0); setWrongCount(0); }} correctAnswer={`number ${current}`} />}
    </GameWrapper>
  );
}

// 8. Letter Hero - multiple blanks, hint on top, answer shown after 3 wrongs
function FillMissingLetter({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('fill-letter');
  const [word, setWord] = useState('');
  const [missingIdxs, setMissingIdxs] = useState<number[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [result, setResult] = useState<'none' | 'win' | 'fail'>('none');
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    const pool = getWordPool(difficulty);
    const r = rng();
    const w = pool[Math.floor(r() * pool.length)];
    const blankCount = Math.min(getLetterHeroBlanks(difficulty), Math.max(1, w.length - 1));
    const idxs = shuffle(w.split('').map((_, i) => i)).slice(0, blankCount);
    const correctLetters = Array.from(new Set(idxs.map(i => w[i])));
    const optionCount = Math.max(getChoiceCount(difficulty), correctLetters.length + 2);
    const wrongLetters = shuffle(LETTERS.filter(letter => !correctLetters.includes(letter))).slice(0, optionCount - correctLetters.length);
    setWord(w); setMissingIdxs(idxs); setPicked({});
    setOptions(shuffle([...correctLetters, ...wrongLetters]));
    setResult('none'); setScore(0); setWrongCount(0);
  }, [stage, difficulty]);

  const hint = () => {
    const shown = word.split('').map((l, i) => missingIdxs.includes(i) ? (picked[i] ?? '_') : l).join('');
    return `${shown} — hint: ${word[0]}... ${word.length} letters`;
  };

  const pick = (letter: string) => {
    if (result !== 'none') return;
    const idx = missingIdxs.find(i => picked[i] === undefined && word[i] === letter)
      ?? missingIdxs.find(i => picked[i] === undefined);
    if (idx === undefined) return;
    const nextPicked = { ...picked, [idx]: letter };
    setPicked(nextPicked);
    if (word[idx] !== letter) {
      const w = wrongCount + 1;
      setWrongCount(w);
      if (w >= 3) setResult('fail');
      return;
    }
    if (missingIdxs.every(i => nextPicked[i] !== undefined)) {
      if (missingIdxs.every(i => nextPicked[i] === word[i])) {
        const pts = 10 + difficulty.length * 5;
        setScore(pts); onScore(pts);
        setResult('win');
      } else {
        const w = wrongCount + 1;
        setWrongCount(w);
        if (w >= 3) setResult('fail');
      }
    }
  };

  const retry = () => { setPicked({}); setResult('none'); setScore(0); setWrongCount(0); };

  return (
    <GameWrapper title="Which letters are missing?" gameId="fill-letter" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <HintBanner hint={`💡 Hint: the word starts with "${word[0]}" and has ${word.length} letters`} />
          <p className="text-center text-sm text-candy-yellow font-bold mb-3" style={{ color: '#eab308' }}>{getStory('fill-letter', stage, 'task')}</p>
          <p className="text-center text-xs text-gray-400 mb-2">Wrong picks: {wrongCount}/3 • {missingIdxs.filter(i => picked[i] === undefined).length} blank(s) left</p>
          <div className="text-center text-4xl font-bold text-gray-700 mb-4 flex justify-center gap-1 flex-wrap">
            {word.split('').map((l, i) => (
              <span key={i} className={missingIdxs.includes(i) ? 'text-candy-pink' : ''}>
                {missingIdxs.includes(i) ? (picked[i] ?? '_') : l}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {options.map(o => (
              <button key={o} onClick={() => pick(o)} className="w-12 h-12 bg-candy-blue rounded-xl flex items-center justify-center text-xl font-bold text-white shadow active:scale-90 transition">{o}</button>
            ))}
          </div>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={retry} story={getStory('fill-letter', stage, 'win')} />}
      {result === 'fail' && <FailScreen onRetry={retry} correctAnswer={word} />}
    </GameWrapper>
  );
}

// 9. Name the Animals - show animal, pick the correct name
function AnimalSound({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('animal-sound');
  const [target, setTarget] = useState(ANIMALS[0]);
  const [choices, setChoices] = useState<string[]>([]);
  const [result, setResult] = useState<'none' | 'win' | 'fail'>('none');
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    const r = rng();
    const numChoices = getChoiceCount(difficulty);
    const shuffled = shuffle(ANIMALS);
    const t = shuffled[0];
    setTarget(t);
    const correctName = animalName(t);
    const wrongAnimals = shuffled.slice(1, numChoices);
    const wrongNames = wrongAnimals.map(a => animalName(a));
    setChoices(shuffle([correctName, ...wrongNames]));
    setResult('none'); setScore(0); setWrongCount(0);
  }, [stage, difficulty]);

  useEffect(() => {
    playAnimalByName(target.name);
  }, [target]);

  const pick = (name: string) => {
    if (result !== 'none') return;
    if (name === animalName(target)) {
      const pts = 10 + difficulty.length * 5;
      setScore(pts); onScore(pts);
      setResult('win');
    } else {
      const w = wrongCount + 1;
      setWrongCount(w);
      if (w >= 3) setResult('fail');
    }
  };

  const retry = () => { setResult('none'); setScore(0); setWrongCount(0); };

  return (
    <GameWrapper title="Name the Animals!" gameId="animal-sound" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <p className="text-center text-sm text-candy-purple font-bold mb-3">{getStory('animal-sound', stage, 'task')}</p>
          <p className="text-center text-xs text-gray-400 mb-2">Wrong picks: {wrongCount}/3</p>
          <div className="flex flex-col items-center mb-4">
            <button
              onClick={() => playAnimalByName(target.name)}
              className="text-7xl mb-2 animate-bounce-in active:scale-90 transition"
              aria-label={`Play the sound of the ${animalName(target)}`}
            >
              {target.emoji}
            </button>
            <p className="text-[10px] text-gray-400">Pindutin ang hayop para marinig ang tunog!</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {choices.map((name, i) => (
              <button key={i} onClick={() => pick(name)} className="bg-gray-50 rounded-2xl py-3 px-4 font-bold text-gray-600 shadow active:scale-90 transition hover:bg-gray-100 text-sm">
                {name}
              </button>
            ))}
          </div>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={retry} story={getStory('animal-sound', stage, 'win')} />}
      {result === 'fail' && <FailScreen onRetry={retry} correctAnswer={animalName(target)} />}
    </GameWrapper>
  );
}

// 10. Color World - coloring book with SVG regions
interface ColoringPage { name: string; regions: { id: string; path: string }[] }

const ALL_DRAW_COLORS = [
  '#ef4444','#f97316','#f59e0b','#eab308','#fde047','#a3e635','#84cc16','#22c55e','#16a34a','#10b981',
  '#14b8a6','#06b6d4','#0ea5e9','#38bdf8','#3b82f6','#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899',
  '#f43f5e','#fb7185','#fda4af','#f9a8d4','#c084fc','#fbcfe8','#bae6fd','#a5f3fc','#67e8f9','#99f6e4',
  '#6ee7b7','#86efac','#4ecdc4','#f472b6','#e879f9','#d8b4fe','#fef08a','#fde68a','#fbbf24','#fdba74',
  '#fecaca','#fca5a5','#92400e','#78716c','#57534e','#1f2937','#f9fafb','#d1d5db','#fda4af','#b794f4',
];

const COLORING_PAGES: ColoringPage[] = [
  { name: 'House', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,120 L0,120 Z' },
    { id: 'grass', path: 'M0,120 L300,120 L300,200 L0,200 Z' },
    { id: 'roof', path: 'M80,80 L150,40 L220,80 Z' },
    { id: 'wall', path: 'M90,80 L210,80 L210,160 L90,160 Z' },
    { id: 'door', path: 'M130,120 L170,120 L170,160 L130,160 Z' },
    { id: 'window', path: 'M100,90 L120,90 L120,110 L100,110 Z' },
    { id: 'sun', path: 'M250,30 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0' },
    { id: 'chimney', path: 'M180,55 L200,55 L200,80 L180,80 Z' },
    { id: 'cloud', path: 'M50,35 a14,10 0 0 1 28,0 a14,10 0 0 1 22,4 a12,10 0 0 1 -50,-4 Z' },
    { id: 'flower', path: 'M60,150 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M60,140 L60,150 M68,145 L60,150' },
  ]},
  { name: 'Animal', regions: [
    { id: 'body', path: 'M60,100 L240,100 L240,180 L60,180 Z' },
    { id: 'head', path: 'M180,60 L240,60 L240,120 L180,120 Z' },
    { id: 'ear1', path: 'M190,40 L210,40 L210,65 L190,65 Z' },
    { id: 'ear2', path: 'M220,40 L240,40 L240,65 L220,65 Z' },
    { id: 'leg1', path: 'M80,180 L110,180 L110,200 L80,200 Z' },
    { id: 'leg2', path: 'M190,180 L220,180 L220,200 L190,200 Z' },
    { id: 'tail', path: 'M50,100 L60,80 L70,100 Z' },
    { id: 'eye', path: 'M215,75 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0' },
    { id: 'patch', path: 'M100,130 m-12,0 a12,10 0 1,0 24,0 a12,10 0 1,0 -24,0' },
    { id: 'nose', path: 'M230,95 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0' },
  ]},
  { name: 'Tree', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,200 L0,200 Z' },
    { id: 'trunk', path: 'M130,100 L170,100 L170,200 L130,200 Z' },
    { id: 'leaves1', path: 'M150,20 m-60,0 a60,60 0 1,0 120,0 a60,60 0 1,0 -120,0' },
    { id: 'leaves2', path: 'M80,80 m-30,0 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0' },
    { id: 'leaves3', path: 'M220,80 m-30,0 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0' },
    { id: 'grass', path: 'M0,180 L300,180 L300,200 L0,200 Z' },
    { id: 'fruit1', path: 'M120,40 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0' },
    { id: 'fruit2', path: 'M180,60 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0' },
    { id: 'fruit3', path: 'M150,80 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0' },
    { id: 'bird', path: 'M50,40 m-10,0 a10,8 0 1,0 20,0 a10,8 0 1,0 -20,0 M60,40 L70,35' },
    { id: 'hole', path: 'M140,150 m-6,0 a6,10 0 1,0 12,0 a6,10 0 1,0 -12,0' },
  ]},
  { name: 'Car', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,200 L0,200 Z' },
    { id: 'body', path: 'M40,100 L260,100 L260,160 L40,160 Z' },
    { id: 'top', path: 'M80,60 L220,60 L240,100 L60,100 Z' },
    { id: 'window1', path: 'M90,70 L140,70 L140,95 L70,95 Z' },
    { id: 'window2', path: 'M160,70 L210,70 L230,95 L150,95 Z' },
    { id: 'wheel1', path: 'M80,160 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0' },
    { id: 'wheel2', path: 'M220,160 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0' },
    { id: 'light', path: 'M250,110 L260,110 L260,130 L250,130 Z' },
    { id: 'road', path: 'M0,160 L300,160 L300,200 L0,200 Z' },
    { id: 'stripe', path: 'M40,115 L260,115 L260,125 L40,125 Z' },
  ]},
  { name: 'Boat', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,120 L0,120 Z' },
    { id: 'sea', path: 'M0,120 L300,120 L300,200 L0,200 Z' },
    { id: 'hull', path: 'M50,120 L250,120 L220,170 L80,170 Z' },
    { id: 'sail1', path: 'M140,40 L140,120 L200,120 Z' },
    { id: 'sail2', path: 'M130,50 L130,120 L80,120 Z' },
    { id: 'mast', path: 'M135,30 L145,30 L145,120 L135,120 Z' },
    { id: 'flag', path: 'M145,30 L180,35 L145,45 Z' },
    { id: 'sun', path: 'M260,30 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0' },
    { id: 'fish', path: 'M100,160 m-10,0 a10,7 0 1,0 20,0 a10,7 0 1,0 -20,0 M120,160 L127,155 L127,165 Z' },
    { id: 'cloud', path: 'M180,30 a12,9 0 0 1 24,0 a12,9 0 0 1 20,3 a10,8 0 0 1 -44,-3 Z' },
  ]},
  { name: 'Flower', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,200 L0,200 Z' },
    { id: 'stem', path: 'M145,100 L155,100 L155,190 L145,190 Z' },
    { id: 'petal1', path: 'M150,40 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0' },
    { id: 'petal2', path: 'M110,70 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0' },
    { id: 'petal3', path: 'M190,70 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0' },
    { id: 'petal4', path: 'M120,100 m-18,0 a18,18 0 1,0 36,0 a18,18 0 1,0 -36,0' },
    { id: 'petal5', path: 'M180,100 m-18,0 a18,18 0 1,0 36,0 a18,18 0 1,0 -36,0' },
    { id: 'center', path: 'M150,60 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0' },
    { id: 'leaf1', path: 'M155,130 L195,140 L155,150 Z' },
    { id: 'leaf2', path: 'M145,140 L105,150 L145,160 Z' },
    { id: 'butterfly', path: 'M230,40 m-12,8 a10,12 0 1,0 12,-6 a10,12 0 1,0 12,6 M230,32 L230,46' },
  ]},
  { name: 'Rocket', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,200 L0,200 Z' },
    { id: 'body', path: 'M135,60 a15,40 0 0 1 30,0 L165,140 L135,140 Z' },
    { id: 'window', path: 'M150,85 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0' },
    { id: 'fin1', path: 'M135,120 L115,150 L135,150 Z' },
    { id: 'fin2', path: 'M165,120 L185,150 L165,150 Z' },
    { id: 'flame', path: 'M140,140 L160,140 L150,180 Z' },
    { id: 'star1', path: 'M60,40 m-8,0 l2.5,6 6.5,0.5 -5,4.5 1.5,7 -6,-3.5 -6,3.5 1.5,-7 -5,-4.5 6.5,-0.5 Z' },
    { id: 'star2', path: 'M240,60 m-8,0 l2.5,6 6.5,0.5 -5,4.5 1.5,7 -6,-3.5 -6,3.5 1.5,-7 -5,-4.5 6.5,-0.5 Z' },
    { id: 'planet', path: 'M240,140 m-18,0 a18,14 0 1,0 36,0 a18,14 0 1,0 -36,0 M215,132 L255,132 L258,136 L215,136 Z' },
    { id: 'moon', path: 'M80,130 a20,20 0 1 0 20,26 a16,16 0 0 1 -20,-26 Z' },
  ]},
  { name: 'Fish', regions: [
    { id: 'water', path: 'M0,0 L300,0 L300,200 L0,200 Z' },
    { id: 'body', path: 'M80,100 m-40,0 a40,30 0 1,0 80,0 a40,30 0 1,0 -80,0' },
    { id: 'tail', path: 'M160,100 L195,75 L195,125 Z' },
    { id: 'fin', path: 'M105,72 L125,60 L125,90 Z' },
    { id: 'eye', path: 'M55,90 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0' },
    { id: 'scale1', path: 'M95,95 m-10,0 a10,7 0 1,0 20,0 a10,7 0 1,0 -20,0' },
    { id: 'scale2', path: 'M120,105 m-10,0 a10,7 0 1,0 20,0 a10,7 0 1,0 -20,0' },
    { id: 'bubble1', path: 'M230,60 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0' },
    { id: 'bubble2', path: 'M245,85 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0' },
    { id: 'seaweed', path: 'M40,160 q-8,-15 0,-30 q8,-15 0,-30 L48,160 q8,-15 0,-30 q-8,-15 0,-30 Z' },
  ]},
  { name: 'Ice Cream', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,200 L0,200 Z' },
    { id: 'scoop1', path: 'M150,60 m-28,0 a28,26 0 1,0 56,0 a28,26 0 1,0 -56,0' },
    { id: 'scoop2', path: 'M120,95 m-24,0 a24,22 0 1,0 48,0 a24,22 0 1,0 -48,0' },
    { id: 'scoop3', path: 'M180,95 m-24,0 a24,22 0 1,0 48,0 a24,22 0 1,0 -48,0' },
    { id: 'cherry', path: 'M150,32 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0 M150,25 L150,32' },
    { id: 'cone', path: 'M110,115 L190,115 L150,185 Z' },
    { id: 'sprinkle', path: 'M135,90 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M165,100 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0' },
    { id: 'drip', path: 'M145,118 a5,8 0 0 0 10,0 Z' },
    { id: 'sun', path: 'M260,30 m-13,0 a13,13 0 1,0 26,0 a13,13 0 1,0 -26,0' },
  ]},
  { name: 'Butterfly', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,200 L0,200 Z' },
    { id: 'wingTL', path: 'M148,100 C100,55 70,60 75,90 C78,112 115,112 148,100 Z' },
    { id: 'wingTR', path: 'M152,100 C200,55 230,60 225,90 C222,112 185,112 152,100 Z' },
    { id: 'wingBL', path: 'M148,105 C110,135 85,140 92,165 C98,182 130,160 148,105 Z' },
    { id: 'wingBR', path: 'M152,105 C190,135 215,140 208,165 C202,182 170,160 152,105 Z' },
    { id: 'body', path: 'M145,80 L155,80 L157,140 L143,140 Z' },
    { id: 'head', path: 'M150,72 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0' },
    { id: 'spot1', path: 'M105,85 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0' },
    { id: 'spot2', path: 'M195,85 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0' },
    { id: 'antenna', path: 'M143,75 L135,60 M157,75 L165,60' },
    { id: 'flower', path: 'M40,170 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0' },
  ]},
  { name: 'Cupcake', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,200 L0,200 Z' },
    { id: 'frosting', path: 'M110,90 q-6,-28 40,-30 q46,2 40,30 q8,12 -8,14 L118,104 q-16,-2 -8,-14 Z' },
    { id: 'top', path: 'M150,60 m-18,0 a18,14 0 1,0 36,0 a18,14 0 1,0 -36,0' },
    { id: 'cherry', path: 'M150,44 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 M150,38 L150,44' },
    { id: 'cup', path: 'M105,104 L195,104 L185,165 L115,165 Z' },
    { id: 'stripe1', path: 'M125,104 L120,165 L135,165 L130,104 Z' },
    { id: 'stripe2', path: 'M170,104 L175,165 L160,165 L165,104 Z' },
    { id: 'spr1', path: 'M130,80 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0' },
    { id: 'spr2', path: 'M165,88 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0' },
    { id: 'sprinkle3', path: 'M148,98 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0' },
    { id: 'plate', path: 'M100,165 L200,165 L195,180 L105,180 Z' },
  ]},
  { name: 'Rainbow', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,200 L0,200 Z' },
    { id: 'arc1', path: 'M150,180 m-70,0 a70,70 0 0 1 140,0 L190,180 a40,40 0 0 0 -80,0 Z' },
    { id: 'arc2', path: 'M150,180 m-55,0 a55,55 0 0 1 110,0 L182,180 a32,32 0 0 0 -64,0 Z' },
    { id: 'arc3', path: 'M150,180 m-40,0 a40,40 0 0 1 80,0 L174,180 a24,24 0 0 0 -48,0 Z' },
    { id: 'sun', path: 'M255,35 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0' },
    { id: 'cloud1', path: 'M55,165 a16,12 0 0 1 32,0 a14,11 0 0 1 24,4 a12,11 0 0 1 -56,-4 Z' },
    { id: 'cloud2', path: 'M215,170 a14,11 0 0 1 28,0 a13,10 0 0 1 22,3 a11,10 0 0 1 -50,-3 Z' },
    { id: 'star', path: 'M60,40 m-8,0 l2.5,6 6.5,0.5 -5,4.5 1.5,7 -6,-3.5 -6,3.5 1.5,-7 -5,-4.5 6.5,-0.5 Z' },
    { id: 'grass', path: 'M0,180 L300,180 L300,200 L0,200 Z' },
  ]},
  { name: 'Train', regions: [
    { id: 'sky', path: 'M0,0 L300,0 L300,140 L0,140 Z' },
    { id: 'engine', path: 'M60,90 L150,90 L150,140 L60,140 Z' },
    { id: 'cab', path: 'M60,60 L110,60 L110,90 L60,90 Z' },
    { id: 'chimney', path: 'M155,70 L175,70 L175,95 L155,95 Z' },
    { id: 'smoke', path: 'M165,55 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 M185,40 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0' },
    { id: 'carriage', path: 'M190,100 L270,100 L270,140 L190,140 Z' },
    { id: 'wheel1', path: 'M85,140 m-14,0 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0' },
    { id: 'wheel2', path: 'M230,140 m-14,0 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0' },
    { id: 'ground', path: 'M0,140 L300,140 L300,200 L0,200 Z' },
    { id: 'window', path: 'M70,65 L100,65 L100,85 L70,85 Z' },
    { id: 'coal', path: 'M195,105 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M210,112 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M222,105 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0' },
  ]},
];

function ColorDrawing({ onScore }: GameProps) {
  const { stage, difficulty, rng, next } = useStage('color-draw');
  const [page, setPage] = useState(COLORING_PAGES[0]);
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('#ef4444');
  const [filled, setFilled] = useState<Record<string, string>>({});
  const [result, setResult] = useState<'none' | 'win'>('none');
  const [score, setScore] = useState(0);
  const [saved, setSaved] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const allColors = ALL_DRAW_COLORS;

  useEffect(() => {
    const r = rng();
    const pageIdx = Math.floor(r() * COLORING_PAGES.length);
    setPage(COLORING_PAGES[pageIdx]);
    setFilled({});
    setResult('none'); setScore(0); setSaved(false);
    const numColors = Math.min(getChoiceCount(difficulty) + 2, allColors.length);
    setColors(shuffle(allColors).slice(0, numColors));
    setSelectedColor(shuffle(allColors)[0]);
  }, [stage, difficulty]);

  const fillRegion = (regionId: string) => {
    if (result !== 'none') return;
    const newFilled = { ...filled, [regionId]: selectedColor };
    setFilled(newFilled);
    const allFilled = page.regions.every(r => newFilled[r.id]);
    if (allFilled) {
      const pts = 10 + difficulty.length * 5;
      setScore(pts); onScore(pts);
      setResult('win');
    }
  };

  const save = () => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const data = new XMLSerializer().serializeToString(svgEl);
    const drawings = JSON.parse(localStorage.getItem('drawings') ?? '[]');
    drawings.push({ data, date: new Date().toISOString(), type: 'coloring' });
    localStorage.setItem('drawings', JSON.stringify(drawings));
    setSaved(true);
    onScore(5);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <GameWrapper title={`Color: ${page.name}`} gameId="color-draw" stage={stage}>
      <StageHeader stage={stage} difficulty={difficulty} score={score} />
      {result === 'none' && (
        <>
          <p className="text-center text-sm text-candy-pink font-bold mb-3">{getStory('color-draw', stage, 'task')}</p>
          <div className="flex justify-center gap-1.5 mb-3 flex-wrap">
            {colors.map(c => (
              <button key={c} onClick={() => setSelectedColor(c)} className={`w-7 h-7 rounded-full shadow transition ${selectedColor === c ? 'ring-4 ring-gray-300 scale-110' : ''}`} style={{ background: c }} />
            ))}
          </div>
          <svg ref={svgRef} viewBox="0 0 300 200" className="w-full bg-white rounded-2xl border-2 border-gray-200">
            {page.regions.map(r => (
              <path key={r.id} d={r.path} fill={filled[r.id] ?? '#ffffff'} stroke="#333" strokeWidth={1.5} onClick={() => fillRegion(r.id)} className="cursor-pointer hover:opacity-80 transition" />
            ))}
          </svg>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setFilled({})} className="flex-1 bg-gray-200 rounded-full py-2 font-bold text-gray-600 text-sm">Clear</button>
            <button onClick={save} className="flex-1 bg-candy-green rounded-full py-2 font-bold text-white text-sm">{saved ? 'Saved! ✓' : 'Save'}</button>
          </div>
        </>
      )}
      {result === 'win' && <WinScreen onNext={() => next(true)} onRetry={() => { setFilled({}); setResult('none'); setScore(0); }} story={getStory('color-draw', stage, 'win')} />}
    </GameWrapper>
  );
}
