import { useState, useMemo } from 'react';
import { Brain, Sparkles, Check, X, Star, ArrowRight, RotateCcw, HelpCircle, Volume2, School, Baby, GraduationCap, BookOpen, FlaskConical } from 'lucide-react';
import { pickQuizQuestions, getQuestionBankSize } from '@/lib/questionBank';
import { pickElementaryQuestions, getElementarySubjectSize, ELEMENTARY_SUBJECTS } from '@/lib/elementaryQuestions';
import type { ElementarySubject } from '@/lib/elementaryQuestions';
import { pickJuniorHighQuestions, getJuniorHighSubjectSize, JUNIOR_HIGH_SUBJECTS } from '@/lib/juniorHighQuestions';
import type { JuniorHighSubject } from '@/lib/juniorHighQuestions';
import { pickSeniorHighQuestions, getSeniorHighSubjectSize, SENIOR_HIGH_SUBJECTS } from '@/lib/seniorHighQuestions';
import type { SeniorHighSubject } from '@/lib/seniorHighQuestions';
import { pickSpecializedQuestions, getSpecializedTrackSize, SPECIALIZED_TRACKS } from '@/lib/specializedQuestions';
import type { SpecializedTrack } from '@/lib/specializedQuestions';
import type { QuizQuestion } from '@/types';
import { addQuizResult, addStar, addMedal, addTrophy } from '@/lib/storage';
import { Confetti, speak } from '@/components/Confetti';
import { t } from '@/lib/i18n';

const QUIZ_LENGTHS = [10, 20, 30, 40, 50];

type Phase = 'level' | 'subject' | 'length' | 'quiz' | 'result';
type Level = 'preschool' | 'elementary' | 'juniorhigh' | 'seniorhigh' | 'specialized';

type SubjectType = ElementarySubject | JuniorHighSubject | SeniorHighSubject | SpecializedTrack;

interface LevelConfig {
  id: Level;
  icon: React.ReactNode;
  color: string;
  subjects: readonly string[];
  getSubjectSize: (s: string) => number;
  pickQuestions: (s: string, count: number) => QuizQuestion[];
}

const SUBJECT_EMOJIS: Record<string, string> = {
  Filipino: '📖', English: '🔤', Math: '🔢', Science: '🔬', 'Aralin Panlipunan': '🗺️',
  TLE: '🔧', MAPEH: '🎨', 'Oral Communication': '🗣️', 'Komunikasyon at Pananaliksik': '📝',
  'General Mathematics': '📊', 'Statistics and Probability': '📈', 'Earth and Life Science': '🌍',
  'Physical Science': '⚗️', '21st Century Literature': '📚', 'Contemporary Philippine Arts': '🎭',
  STEM: '🔬', HUMSS: '🏛️', ABM: '💼', GAS: '📋', TVL: '🛠️', 'Arts and Design': '🎨',
};

const SUBJECT_COLORS: Record<string, string> = {
  Filipino: 'from-red-400 to-orange-400', English: 'from-blue-400 to-cyan-400',
  Math: 'from-green-400 to-emerald-400', Science: 'from-purple-400 to-indigo-400',
  'Aralin Panlipunan': 'from-amber-400 to-yellow-400', TLE: 'from-orange-400 to-red-400',
  MAPEH: 'from-pink-400 to-rose-400', 'Oral Communication': 'from-cyan-400 to-blue-400',
  'Komunikasyon at Pananaliksik': 'from-indigo-400 to-purple-400', 'General Mathematics': 'from-green-400 to-teal-400',
  'Statistics and Probability': 'from-emerald-400 to-green-400', 'Earth and Life Science': 'from-teal-400 to-cyan-400',
  'Physical Science': 'from-violet-400 to-purple-400', '21st Century Literature': 'from-rose-400 to-pink-400',
  'Contemporary Philippine Arts': 'from-fuchsia-400 to-pink-400', STEM: 'from-blue-500 to-indigo-500',
  HUMSS: 'from-amber-500 to-orange-500', ABM: 'from-green-500 to-emerald-500',
  GAS: 'from-cyan-500 to-blue-500', TVL: 'from-orange-500 to-amber-500',
  'Arts and Design': 'from-pink-500 to-rose-500',
};

const LEVEL_CONFIGS: LevelConfig[] = [
  {
    id: 'preschool', icon: <Baby size={28} className="text-white" />, color: 'from-candy-yellow to-candy-green',
    subjects: [], getSubjectSize: () => getQuestionBankSize(), pickQuestions: (_s, count) => pickQuizQuestions(count),
  },
  {
    id: 'elementary', icon: <School size={28} className="text-white" />, color: 'from-candy-blue to-candy-purple',
    subjects: ELEMENTARY_SUBJECTS, getSubjectSize: (s) => getElementarySubjectSize(s as ElementarySubject),
    pickQuestions: (s, count) => pickElementaryQuestions(s as ElementarySubject, count),
  },
  {
    id: 'juniorhigh', icon: <BookOpen size={28} className="text-white" />, color: 'from-green-500 to-teal-600',
    subjects: JUNIOR_HIGH_SUBJECTS, getSubjectSize: (s) => getJuniorHighSubjectSize(s as JuniorHighSubject),
    pickQuestions: (s, count) => pickJuniorHighQuestions(s as JuniorHighSubject, count),
  },
  {
    id: 'seniorhigh', icon: <GraduationCap size={28} className="text-white" />, color: 'from-indigo-500 to-purple-600',
    subjects: SENIOR_HIGH_SUBJECTS, getSubjectSize: (s) => getSeniorHighSubjectSize(s as SeniorHighSubject),
    pickQuestions: (s, count) => pickSeniorHighQuestions(s as SeniorHighSubject, count),
  },
  {
    id: 'specialized', icon: <FlaskConical size={28} className="text-white" />, color: 'from-rose-500 to-red-600',
    subjects: SPECIALIZED_TRACKS, getSubjectSize: (s) => getSpecializedTrackSize(s as SpecializedTrack),
    pickQuestions: (s, count) => pickSpecializedQuestions(s as SpecializedTrack, count),
  },
];

interface QuizPageProps {
  onNavigate?: (page: string) => void;
}

export function QuizPage({ onNavigate }: QuizPageProps) {
  const [phase, setPhase] = useState<Phase>('level');
  const [level, setLevel] = useState<Level | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [count, setCount] = useState<number>(10);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const levelConfig = useMemo(() => LEVEL_CONFIGS.find(l => l.id === level) ?? null, [level]);

  const currentBankSize = useMemo(() => {
    if (!levelConfig) return 0;
    if (levelConfig.subjects.length === 0) return levelConfig.getSubjectSize('');
    return subject ? levelConfig.getSubjectSize(subject) : 0;
  }, [levelConfig, subject]);

  const startQuiz = () => {
    if (!levelConfig) return;
    const picked = levelConfig.subjects.length === 0
      ? levelConfig.pickQuestions('', count)
      : subject ? levelConfig.pickQuestions(subject, count) : [];
    setQuestions(picked);
    setAnswers([]);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setPhase('quiz');
  };

  const answerQuestion = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[currentQ].answer;
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      const newAnswers = [...answers, idx];
      setAnswers(newAnswers);
      setSelected(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(c => c + 1);
      } else {
        const finalScore = correct ? score + 1 : score;
        addQuizResult(finalScore);
        addStar(finalScore);
        if (finalScore >= questions.length * 0.7) {
          setConfetti(c => c + 1);
          addMedal(1);
          if (finalScore === questions.length) addTrophy(1);
        }
        setScore(finalScore);
        setPhase('result');
      }
    }, 700);
  };

  const restart = () => {
    setPhase('level');
    setLevel(null);
    setSubject(null);
    setQuestions([]);
    setAnswers([]);
    setCurrentQ(0);
    setScore(0);
  };

  const passed = questions.length > 0 && score >= questions.length * 0.7;

  const levelLabels: Record<Level, { title: string; desc: string }> = {
    preschool: { title: t('quiz.preschool'), desc: t('quiz.preschool_desc') },
    elementary: { title: t('quiz.elementary'), desc: t('quiz.elementary_desc') },
    juniorhigh: { title: t('quiz.juniorhigh'), desc: t('quiz.juniorhigh_desc') },
    seniorhigh: { title: t('quiz.seniorhigh'), desc: t('quiz.seniorhigh_desc') },
    specialized: { title: t('quiz.specialized'), desc: t('quiz.specialized_desc') },
  };

  return (
    <div className="min-h-screen pb-28">
      <Confetti trigger={confetti} />

      {/* Header */}
      <div className="bg-gradient-to-br from-candy-blue to-candy-purple px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Brain size={24} /> {t('quiz.title')}</h1>
        <p className="text-white/80 text-sm">
          {phase === 'level' && t('quiz.pick_level')}
          {phase === 'subject' && t('quiz.pick_subject')}
          {phase === 'length' && t('quiz.pick_length')}
          {phase === 'quiz' && t('quiz.answer_desc')}
          {phase === 'result' && t('quiz.result_desc')}
        </p>
      </div>

      <div className="px-4 mt-4">
        {/* Phase: pick level */}
        {phase === 'level' && (
          <div className="space-y-3">
            {LEVEL_CONFIGS.map(cfg => (
              <button
                key={cfg.id}
                onClick={() => {
                  setLevel(cfg.id);
                  if (cfg.subjects.length === 0) setPhase('length');
                  else setPhase('subject');
                }}
                className={`w-full bg-gradient-to-br ${cfg.color} rounded-3xl p-5 shadow-lg active:scale-95 transition text-left`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/30 backdrop-blur rounded-2xl p-3">{cfg.icon}</div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-lg">{levelLabels[cfg.id].title}</p>
                    <p className="text-white/80 text-sm">{levelLabels[cfg.id].desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Phase: pick subject */}
        {phase === 'subject' && levelConfig && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={20} className="text-candy-purple" />
              <h3 className="font-bold text-gray-700">{t('quiz.choose_subject')}</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {levelConfig.subjects.map(subj => (
                <button
                  key={subj}
                  onClick={() => { setSubject(subj); setPhase('length'); }}
                  className={`w-full bg-gradient-to-r ${SUBJECT_COLORS[subj] ?? 'from-gray-400 to-gray-500'} rounded-2xl p-4 shadow-lg active:scale-95 transition text-left`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{SUBJECT_EMOJIS[subj] ?? '📚'}</span>
                    <div className="flex-1">
                      <p className="text-white font-bold text-base">{subj}</p>
                      <p className="text-white/80 text-xs">{levelConfig.getSubjectSize(subj)}+ {t('quiz.questions')}</p>
                    </div>
                    <ArrowRight size={20} className="text-white/70" />
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setPhase('level')} className="w-full bg-gray-200 rounded-full py-2.5 font-bold text-gray-600 text-sm mt-2">
              ← {t('quiz.back')}
            </button>
          </div>
        )}

        {/* Phase: pick length */}
        {phase === 'length' && (
          <div className="bg-white rounded-2xl p-4 shadow animate-slide-up">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} className="text-candy-purple" />
              <h3 className="font-bold text-gray-700">{t('quiz.how_many')}</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {QUIZ_LENGTHS.map(n => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`rounded-2xl py-3 font-bold text-lg transition active:scale-95 ${
                    count === n
                      ? 'bg-gradient-to-br from-candy-blue to-candy-purple text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mb-3">
              {t('quiz.random_desc', { count: currentBankSize })}
            </p>
            <button
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-3 font-bold text-white shadow active:scale-95 transition"
            >
              {t('quiz.start')} →
            </button>
            <button onClick={() => setPhase(levelConfig && levelConfig.subjects.length > 0 ? 'subject' : 'level')} className="w-full bg-gray-200 rounded-full py-2.5 font-bold text-gray-600 text-sm mt-2">
              ← {t('quiz.back')}
            </button>
          </div>
        )}

        {/* Phase: quiz */}
        {phase === 'quiz' && questions.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-gray-400 font-bold">{t('quiz.question')} {currentQ + 1} / {questions.length}</span>
              <span className="text-xs text-candy-green font-bold">{t('quiz.score')}: {score}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-candy-blue to-candy-purple rounded-full transition-all"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>
            <div className="flex items-start gap-2 mb-4">
              <HelpCircle size={20} className="text-candy-blue flex-shrink-0 mt-0.5" />
              <h3 className="font-bold text-gray-700 text-lg leading-snug">{questions[currentQ].q}</h3>
              <button
                onClick={() => speak(questions[currentQ].q)}
                className="ml-auto bg-candy-blue/20 rounded-full p-1.5 flex-shrink-0 active:scale-90 transition"
                aria-label={t('quiz.read_question')}
              >
                <Volume2 size={16} className="text-candy-blue" />
              </button>
            </div>
            <div className="space-y-2">
              {questions[currentQ].options.map((opt, i) => {
                const isCorrect = i === questions[currentQ].answer;
                const showState = selected !== null && (isCorrect || i === selected);
                return (
                  <button
                    key={i}
                    onClick={() => answerQuestion(i)}
                    disabled={selected !== null}
                    className={`w-full rounded-2xl py-3 px-4 text-left font-bold text-sm active:scale-95 transition flex items-center justify-between ${
                      showState && isCorrect
                        ? 'bg-green-100 text-green-600'
                        : showState && !isCorrect
                        ? 'bg-red-100 text-red-500'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary-100'
                    }`}
                  >
                    {opt}
                    {showState && isCorrect && <Check size={18} className="text-green-500" />}
                    {showState && !isCorrect && <X size={18} className="text-red-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Phase: result */}
        {phase === 'result' && (
          <div className="bg-white rounded-2xl p-6 shadow text-center animate-pop">
            <div className="text-5xl mb-3">{passed ? '🎉' : '😢'}</div>
            <h3 className="font-bold text-xl text-gray-700 mb-1">{passed ? t('quiz.passed') : t('quiz.failed')}</h3>
            <p className="text-gray-500 mb-4">
              {t('quiz.score_label')}: <span className="font-bold text-gray-700">{score} / {questions.length}</span>
            </p>
            <p className="text-xs text-gray-400 mb-4">
              {t('quiz.earned_stars', { score })} {passed ? t('quiz.plus_medal') : t('quiz.try_again')}
            </p>
            <div className="flex gap-2">
              <button onClick={restart} className="flex-1 bg-gray-200 rounded-full py-2.5 font-bold text-gray-600 text-sm flex items-center justify-center gap-1">
                <RotateCcw size={16} /> {t('quiz.new_quiz')}
              </button>
              <button
                onClick={startQuiz}
                className="flex-1 bg-gradient-to-r from-candy-blue to-candy-purple rounded-full py-2.5 font-bold text-white text-sm flex items-center justify-center gap-1"
              >
                <ArrowRight size={16} /> {t('quiz.retry_quiz')}
              </button>
            </div>
          </div>
        )}

        {/* How to play */}
        {(phase === 'level' || phase === 'subject' || phase === 'length') && (
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 shadow mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Star size={18} className="text-amber-500 fill-amber-500" />
              <p className="font-bold text-orange-700 text-sm">{t('quiz.how_to_play')}</p>
            </div>
            <ul className="text-xs text-orange-600 space-y-1">
              <li>• {t('quiz.how1')}</li>
              <li>• {t('quiz.how2')}</li>
              <li>• {t('quiz.how3')}</li>
              <li>• {t('quiz.how4')}</li>
            </ul>
          </div>
        )}
      </div>

      {onNavigate && phase === 'level' && (
        <div className="px-4 mt-4">
          <button onClick={() => onNavigate('games')} className="w-full bg-gradient-to-r from-candy-pink to-candy-purple rounded-full py-2.5 font-bold text-white text-sm shadow active:scale-95 transition">
            🎮 {t('quiz.play_games')}
          </button>
        </div>
      )}
    </div>
  );
}
