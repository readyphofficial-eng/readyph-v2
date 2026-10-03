import { useState, useMemo, useRef } from 'react';
import { ChevronRight, ChevronLeft, Check, X, RotateCcw, Library, BookMarked, Sparkles, Lightbulb, HelpCircle, Volume2, Search, Bookmark, BookmarkCheck, Layers, Zap, Info, Target, Home, Star, TrendingUp, BookOpen } from 'lucide-react';
import {
  TEXTBOOK_LEVELS,
  searchPages,
  getAllKeyTerms,
  getStats,
  type TextbookLevel,
  type TextbookSubject,
  type TextbookChapter,
  type TextbookPage,
  type TextbookBlock,
  type SearchResult,
  type Flashcard,
} from '@/lib/textbookData';
import { t } from '@/lib/i18n';
import { speak } from '@/components/Confetti';

type Phase = 'library' | 'level' | 'subject' | 'chapter' | 'reader' | 'search' | 'bookmarks' | 'flashcards' | 'dashboard';

interface ReadingProgress { [key: string]: number; }
type BookmarkSet = Set<string>;

function loadProgress(): ReadingProgress {
  try { return JSON.parse(localStorage.getItem('textbookProgress') ?? '{}') as ReadingProgress; } catch { return {}; }
}
function saveProgress(progress: ReadingProgress): void { localStorage.setItem('textbookProgress', JSON.stringify(progress)); }
function loadCompleted(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem('textbookCompleted') ?? '{}') as Record<string, boolean>; } catch { return {}; }
}
function saveCompleted(completed: Record<string, boolean>): void { localStorage.setItem('textbookCompleted', JSON.stringify(completed)); }
function loadBookmarks(): BookmarkSet {
  try { return new Set(JSON.parse(localStorage.getItem('textbookBookmarks') ?? '[]') as string[]); } catch { return new Set(); }
}
function saveBookmarks(bm: BookmarkSet): void { localStorage.setItem('textbookBookmarks', JSON.stringify([...bm])); }

export function Textbooks() {
  const [phase, setPhase] = useState<Phase>('library');
  const [selectedLevel, setSelectedLevel] = useState<TextbookLevel | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<TextbookSubject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<TextbookChapter | null>(null);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [progress, setProgress] = useState<ReadingProgress>(() => loadProgress());
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => loadCompleted());
  const [bookmarks, setBookmarks] = useState<BookmarkSet>(() => loadBookmarks());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const chapterKey = useMemo(() => {
    if (!selectedLevel || !selectedSubject || !selectedChapter) return '';
    return `${selectedLevel.id}/${selectedSubject.id}/${selectedChapter.id}`;
  }, [selectedLevel, selectedSubject, selectedChapter]);

  const currentPage: TextbookPage | null = selectedChapter && currentPageIdx < selectedChapter.pages.length
    ? selectedChapter.pages[currentPageIdx]
    : null;

  const stats = useMemo(() => getStats(), []);

  const completedCount = useMemo(() => Object.values(completed).filter(Boolean).length, [completed]);
  const startedCount = useMemo(() => Object.keys(progress).length, [progress]);

  const openLevel = (level: TextbookLevel) => { setSelectedLevel(level); setPhase('level'); window.scrollTo(0, 0); };
  const openSubject = (subject: TextbookSubject) => { setSelectedSubject(subject); setPhase('subject'); window.scrollTo(0, 0); };
  const openChapter = (chapter: TextbookChapter) => {
    setSelectedChapter(chapter);
    const key = `${selectedLevel!.id}/${selectedSubject!.id}/${chapter.id}`;
    const savedPage = progress[key] ?? 0;
    setCurrentPageIdx(Math.min(savedPage, chapter.pages.length - 1));
    setQuizAnswers({}); setQuizSubmitted({});
    setPhase('reader'); window.scrollTo(0, 0);
  };

  const nextPage = () => {
    if (!selectedChapter) return;
    stopReading();
    if (currentPageIdx < selectedChapter.pages.length - 1) {
      const newIdx = currentPageIdx + 1;
      setCurrentPageIdx(newIdx);
      const newProgress = { ...progress, [chapterKey]: newIdx };
      setProgress(newProgress); saveProgress(newProgress);
      setQuizAnswers({}); setQuizSubmitted({});
      window.scrollTo(0, 0);
    } else {
      const newCompleted = { ...completed, [chapterKey]: true };
      setCompleted(newCompleted); saveCompleted(newCompleted);
    }
  };

  const prevPage = () => {
    stopReading();
    if (currentPageIdx > 0) { setCurrentPageIdx(currentPageIdx - 1); setQuizAnswers({}); setQuizSubmitted({}); window.scrollTo(0, 0); }
  };

  const goLibrary = () => { stopReading(); setPhase('library'); setSelectedLevel(null); setSelectedSubject(null); setSelectedChapter(null); window.scrollTo(0, 0); };
  const goLevel = () => { stopReading(); setPhase('level'); setSelectedSubject(null); setSelectedChapter(null); window.scrollTo(0, 0); };
  const goSubject = () => { stopReading(); setPhase('subject'); setSelectedChapter(null); window.scrollTo(0, 0); };

  const handleQuizAnswer = (blockKey: string, optionIdx: number) => { if (quizSubmitted[blockKey]) return; setQuizAnswers(prev => ({ ...prev, [blockKey]: optionIdx })); };
  const submitQuiz = (blockKey: string) => setQuizSubmitted(prev => ({ ...prev, [blockKey]: true }));
  const resetQuiz = (blockKey: string) => {
    setQuizAnswers(prev => { const n = { ...prev }; delete n[blockKey]; return n; });
    setQuizSubmitted(prev => { const n = { ...prev }; delete n[blockKey]; return n; });
  };

  const toggleBookmark = () => {
    if (!currentPage || !selectedLevel || !selectedSubject || !selectedChapter) return;
    const key = `${selectedLevel.id}/${selectedSubject.id}/${selectedChapter.id}/${currentPageIdx}`;
    const next = new Set(bookmarks);
    if (next.has(key)) next.delete(key); else next.add(key);
    setBookmarks(next); saveBookmarks(next);
  };

  const isBookmarked = () => {
    if (!selectedLevel || !selectedSubject || !selectedChapter) return false;
    return bookmarks.has(`${selectedLevel.id}/${selectedSubject.id}/${selectedChapter.id}/${currentPageIdx}`);
  };

  const readPageAloud = () => {
    if (!currentPage) return;
    if (isReading) { stopReading(); return; }
    const text = currentPage.blocks.map(b => {
      switch (b.type) {
        case 'heading': return b.text;
        case 'paragraph': return b.text;
        case 'example': return `Example. ${b.text}`;
        case 'keyterm': return `${b.term}. ${b.definition}`;
        case 'diagram': return b.text;
        case 'summary': return `Remember. ${b.text}`;
        case 'funfact': return `Fun fact. ${b.text}`;
        case 'tip': return `Tip. ${b.text}`;
        case 'quiz': return b.question;
        default: return '';
      }
    }).filter(Boolean).join('. ');
    const utterance = new SpeechSynthesisUtterance(`${currentPage.title}. ${text}`);
    utterance.onend = () => setIsReading(false);
    utteranceRef.current = utterance;
    window.speechSynthesis?.speak(utterance);
    setIsReading(true);
  };

  const stopReading = () => {
    window.speechSynthesis?.cancel();
    setIsReading(false);
  };

  const doSearch = (query: string) => {
    setSearchQuery(query);
    setSearchResults(searchPages(query));
  };

  const openSearchResult = (result: SearchResult) => {
    const level = TEXTBOOK_LEVELS.find(l => l.id === result.levelId)!;
    const subject = level.subjects.find(s => s.id === result.subjectId)!;
    const chapter = subject.chapters.find(c => c.id === result.chapterId)!;
    setSelectedLevel(level); setSelectedSubject(subject); setSelectedChapter(chapter);
    setCurrentPageIdx(result.pageIdx);
    setQuizAnswers({}); setQuizSubmitted({});
    setPhase('reader'); window.scrollTo(0, 0);
  };

  const startFlashcards = () => {
    const cards = getAllKeyTerms();
    // Shuffle
    for (let i = cards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]]; }
    setFlashcards(cards); setFlashcardIdx(0); setFlashcardFlipped(false);
    setPhase('flashcards'); window.scrollTo(0, 0);
  };

  const nextFlashcard = () => {
    setFlashcardFlipped(false);
    setFlashcardIdx(prev => (prev + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setFlashcardFlipped(false);
    setFlashcardIdx(prev => (prev - 1 + flashcards.length) % flashcards.length);
  };

  // ===================== LIBRARY =============================================
  if (phase === 'library') {
    return (
      <div className="min-h-screen pb-28">
        <div className="bg-gradient-to-br from-candy-purple to-candy-blue px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Library size={24} /> {t('textbooks.title')}</h1>
          <p className="text-white/80 text-sm">{t('textbooks.subtitle')}</p>
        </div>

        <div className="px-4 mt-4 space-y-4">
          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setPhase('search')} className="bg-white rounded-2xl p-4 shadow-lg active:scale-95 transition text-left">
              <div className="flex items-center gap-2 mb-1">
                <Search size={18} className="text-candy-purple" />
                <span className="font-bold text-sm text-gray-700">{t('textbooks.search')}</span>
              </div>
              <p className="text-xs text-gray-400">{t('textbooks.search_desc')}</p>
            </button>
            <button onClick={startFlashcards} className="bg-white rounded-2xl p-4 shadow-lg active:scale-95 transition text-left">
              <div className="flex items-center gap-2 mb-1">
                <Layers size={18} className="text-candy-pink" />
                <span className="font-bold text-sm text-gray-700">{t('textbooks.flashcards')}</span>
              </div>
              <p className="text-xs text-gray-400">{stats.totalKeyTerms} {t('textbooks.terms')}</p>
            </button>
            <button onClick={() => setPhase('bookmarks')} className="bg-white rounded-2xl p-4 shadow-lg active:scale-95 transition text-left">
              <div className="flex items-center gap-2 mb-1">
                <Bookmark size={18} className="text-candy-blue" />
                <span className="font-bold text-sm text-gray-700">{t('textbooks.bookmarks')}</span>
              </div>
              <p className="text-xs text-gray-400">{bookmarks.size} {t('textbooks.saved')}</p>
            </button>
            <button onClick={() => setPhase('dashboard')} className="bg-white rounded-2xl p-4 shadow-lg active:scale-95 transition text-left">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-candy-green" />
                <span className="font-bold text-sm text-gray-700">{t('textbooks.dashboard')}</span>
              </div>
              <p className="text-xs text-gray-400">{completedCount} {t('textbooks.completed_badge')}</p>
            </button>
          </div>

          {/* Stats banner */}
          <div className="bg-gradient-to-r from-candy-purple/10 to-candy-blue/10 rounded-2xl p-4 flex items-center justify-around">
            <div className="text-center">
              <p className="text-2xl font-bold text-candy-purple">{TEXTBOOK_LEVELS.length}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{t('textbooks.levels')}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-candy-pink">{stats.totalChapters}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{t('textbooks.chapters')}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-candy-green">{stats.totalPages}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{t('textbooks.pages')}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-candy-blue">{stats.totalQuizzes}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{t('textbooks.quizzes')}</p>
            </div>
          </div>

          {/* Levels */}
          <div className="space-y-3">
            {TEXTBOOK_LEVELS.map((level, i) => {
              const totalChapters = level.subjects.reduce((sum, s) => sum + s.chapters.length, 0);
              return (
                <button key={level.id} onClick={() => openLevel(level)}
                  className={`w-full bg-gradient-to-br ${level.color} rounded-3xl p-5 shadow-lg active:scale-95 transition text-left animate-slide-up`}
                  style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/30 backdrop-blur rounded-2xl p-3 text-3xl">{level.emoji}</div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-lg">{level.name}</p>
                      <p className="text-white/80 text-xs">{level.subjects.length} {t('textbooks.subjects')} · {totalChapters} {t('textbooks.chapters')}</p>
                    </div>
                    <ChevronRight size={24} className="text-white/70" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ===================== LEVEL ===============================================
  if (phase === 'level' && selectedLevel) {
    return (
      <div className="min-h-screen pb-28">
        <div className={`bg-gradient-to-br ${selectedLevel.color} px-5 pt-10 pb-6 rounded-b-3xl shadow-lg`}>
          <button onClick={goLibrary} className="text-white text-sm mb-2 active:scale-95 transition flex items-center gap-1"><ChevronLeft size={16} /> {t('textbooks.library')}</button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">{selectedLevel.emoji} {selectedLevel.name}</h1>
          <p className="text-white/80 text-sm">{t('textbooks.pick_subject')}</p>
        </div>
        <div className="px-4 mt-4 space-y-3">
          {selectedLevel.subjects.map((subject, i) => (
            <button key={subject.id} onClick={() => openSubject(subject)}
              className={`w-full bg-gradient-to-r ${subject.color} rounded-2xl p-4 shadow-lg active:scale-95 transition text-left animate-slide-up`}
              style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{subject.emoji}</span>
                <div className="flex-1">
                  <p className="text-white font-bold text-base">{subject.name}</p>
                  <p className="text-white/80 text-xs">{subject.chapters.length} {t('textbooks.chapters')}</p>
                </div>
                <ChevronRight size={20} className="text-white/70" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ===================== SUBJECT =============================================
  if (phase === 'subject' && selectedLevel && selectedSubject) {
    return (
      <div className="min-h-screen pb-28">
        <div className={`bg-gradient-to-br ${selectedSubject.color} px-5 pt-10 pb-6 rounded-b-3xl shadow-lg`}>
          <button onClick={goLevel} className="text-white text-sm mb-2 active:scale-95 transition flex items-center gap-1"><ChevronLeft size={16} /> {selectedLevel.name}</button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">{selectedSubject.emoji} {selectedSubject.name}</h1>
          <p className="text-white/80 text-sm">{t('textbooks.pick_chapter')}</p>
        </div>
        <div className="px-4 mt-4 space-y-3">
          {selectedSubject.chapters.map((chapter, i) => {
            const key = `${selectedLevel.id}/${selectedSubject.id}/${chapter.id}`;
            const isCompleted = completed[key];
            const savedPage = progress[key] ?? 0;
            const isStarted = savedPage > 0;
            return (
              <button key={chapter.id} onClick={() => openChapter(chapter)}
                className="w-full bg-white rounded-2xl p-4 shadow-lg active:scale-95 transition text-left flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${isCompleted ? 'bg-gradient-to-br from-candy-green to-candy-mint' : isStarted ? 'bg-gradient-to-br from-candy-yellow to-candy-pink' : 'bg-gray-100'}`}>
                  {isCompleted ? <Check size={24} className="text-white" /> : chapter.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-700 text-sm">{chapter.title}</p>
                  <p className="text-xs text-gray-400">{chapter.pages.length} {t('textbooks.pages')}{isCompleted && ` · ${t('textbooks.completed_badge')}`}{isStarted && !isCompleted && ` · ${t('textbooks.in_progress')} ${savedPage + 1}/${chapter.pages.length}`}</p>
                </div>
                <ChevronRight size={20} className="text-gray-300 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ===================== READER ==============================================
  if (phase === 'reader' && selectedLevel && selectedSubject && selectedChapter && currentPage) {
    const totalPages = selectedChapter.pages.length;
    const isLastPage = currentPageIdx === totalPages - 1;
    const chapterComplete = completed[chapterKey];

    return (
      <div className="min-h-screen pb-28">
        <div className={`bg-gradient-to-br ${selectedSubject.color} px-5 pt-10 pb-6 rounded-b-3xl shadow-lg`}>
          <div className="flex items-center justify-between">
            <button onClick={goSubject} className="text-white text-sm active:scale-95 transition flex items-center gap-1"><ChevronLeft size={16} /> {selectedSubject.name}</button>
            <div className="flex items-center gap-2">
              <button onClick={readPageAloud} className={`rounded-full p-2 transition active:scale-90 ${isReading ? 'bg-white/40' : 'bg-white/20'}`} aria-label="Read aloud">
                <Volume2 size={16} className={`text-white ${isReading ? 'animate-pulse' : ''}`} />
              </button>
              <button onClick={toggleBookmark} className="rounded-full p-2 bg-white/20 transition active:scale-90" aria-label="Bookmark">
                {isBookmarked() ? <BookmarkCheck size={16} className="text-candy-yellow" /> : <Bookmark size={16} className="text-white" />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1 mt-2">
            <span className="text-2xl">{selectedChapter.emoji}</span>
            <h1 className="text-xl font-bold text-white">{selectedChapter.title}</h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${((currentPageIdx + 1) / totalPages) * 100}%` }} />
            </div>
            <span className="text-white/90 text-xs font-bold whitespace-nowrap">{currentPageIdx + 1} / {totalPages}</span>
          </div>
        </div>

        <div className="px-4 mt-4">
          <div className="bg-white rounded-3xl shadow-xl p-6 min-h-[400px]">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <BookMarked size={20} className="text-candy-purple flex-shrink-0" />
              <h2 className="font-bold text-lg text-gray-700">{currentPage.title}</h2>
              <button onClick={() => speak(currentPage.title)} className="ml-auto bg-candy-purple/20 rounded-full p-1.5 active:scale-90 transition flex-shrink-0" aria-label="Read title">
                <Volume2 size={14} className="text-candy-purple" />
              </button>
            </div>
            <div className="space-y-4">
              {currentPage.blocks.map((block, blockIdx) => {
                const blockKey = `${chapterKey}/${currentPageIdx}/${blockIdx}`;
                return (
                  <BlockRenderer key={blockIdx} block={block} blockKey={blockKey}
                    selectedAnswer={quizAnswers[blockKey]} isSubmitted={quizSubmitted[blockKey] ?? false}
                    onAnswer={(idx) => handleQuizAnswer(blockKey, idx)} onSubmit={() => submitQuiz(blockKey)} onReset={() => resetQuiz(blockKey)} />
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button onClick={prevPage} disabled={currentPageIdx === 0}
              className={`flex items-center gap-1 rounded-full px-5 py-2.5 font-bold text-sm transition ${currentPageIdx === 0 ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-600 shadow active:scale-95'}`}>
              <ChevronLeft size={18} /> {t('textbooks.prev')}
            </button>
            <div className="flex-1 flex justify-center gap-1.5">
              {selectedChapter.pages.map((_, i) => (
                <button key={i} onClick={() => { stopReading(); setCurrentPageIdx(i); setQuizAnswers({}); setQuizSubmitted({}); const np = { ...progress, [chapterKey]: i }; setProgress(np); saveProgress(np); window.scrollTo(0, 0); }}
                  className={`w-2.5 h-2.5 rounded-full transition ${i === currentPageIdx ? 'bg-candy-purple scale-125' : i < currentPageIdx ? 'bg-candy-mint' : 'bg-gray-200'}`} />
              ))}
            </div>
            {isLastPage ? (
              <button onClick={goSubject} className="flex items-center gap-1 bg-gradient-to-r from-candy-green to-candy-mint rounded-full px-5 py-2.5 font-bold text-white text-sm shadow active:scale-95 transition">
                {chapterComplete ? t('textbooks.done') : t('textbooks.finish')} <Check size={16} />
              </button>
            ) : (
              <button onClick={nextPage} className="flex items-center gap-1 bg-gradient-to-r from-candy-purple to-candy-blue rounded-full px-5 py-2.5 font-bold text-white text-sm shadow active:scale-95 transition">
                {t('textbooks.next')} <ChevronRight size={18} />
              </button>
            )}
          </div>

          {isLastPage && chapterComplete && (
            <div className="mt-4 bg-gradient-to-br from-candy-yellow to-candy-green rounded-2xl p-4 shadow-lg text-center animate-bounce-in">
              <div className="text-3xl mb-1">🎉</div>
              <p className="font-bold text-white text-sm">{t('textbooks.chapter_complete')}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===================== SEARCH ==============================================
  if (phase === 'search') {
    return (
      <div className="min-h-screen pb-28">
        <div className="bg-gradient-to-br from-candy-purple to-candy-blue px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
          <button onClick={goLibrary} className="text-white text-sm mb-2 active:scale-95 transition flex items-center gap-1"><ChevronLeft size={16} /> {t('textbooks.library')}</button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Search size={24} /> {t('textbooks.search')}</h1>
          <p className="text-white/80 text-sm">{t('textbooks.search_desc')}</p>
        </div>
        <div className="px-4 mt-4">
          <div className="relative mb-4">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchQuery} onChange={(e) => doSearch(e.target.value)} placeholder={t('textbooks.search_placeholder')}
              className="w-full bg-white rounded-full pl-12 pr-4 py-3 text-sm shadow-lg outline-none text-gray-700" autoFocus />
          </div>
          {searchQuery.trim() === '' ? (
            <div className="text-center text-gray-400 text-sm mt-8">
              <Search size={48} className="mx-auto mb-3 text-gray-200" />
              <p>{t('textbooks.search_empty')}</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center text-gray-400 text-sm mt-8">
              <p>{t('textbooks.no_results')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-gray-400 font-bold mb-2">{searchResults.length} {t('textbooks.results_found')}</p>
              {searchResults.map((result, i) => (
                <button key={i} onClick={() => openSearchResult(result)}
                  className="w-full bg-white rounded-2xl p-3 shadow active:scale-95 transition text-left flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${i * 0.03}s` }}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${result.subjectColor} flex items-center justify-center text-xl flex-shrink-0`}>{result.subjectEmoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-700 truncate">{result.pageTitle}</p>
                    <p className="text-xs text-gray-400 truncate">{result.subjectName} · {result.chapterTitle}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===================== BOOKMARKS ===========================================
  if (phase === 'bookmarks') {
    const bookmarkList = [...bookmarks].map(key => {
      const [levelId, subjectId, chapterId, pageIdxStr] = key.split('/');
      const level = TEXTBOOK_LEVELS.find(l => l.id === levelId);
      const subject = level?.subjects.find(s => s.id === subjectId);
      const chapter = subject?.chapters.find(c => c.id === chapterId);
      const pageIdx = parseInt(pageIdxStr, 10);
      const page = chapter?.pages[pageIdx];
      return { key, level, subject, chapter, pageIdx, page };
    }).filter(b => b.page);

    return (
      <div className="min-h-screen pb-28">
        <div className="bg-gradient-to-br from-candy-purple to-candy-blue px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
          <button onClick={goLibrary} className="text-white text-sm mb-2 active:scale-95 transition flex items-center gap-1"><ChevronLeft size={16} /> {t('textbooks.library')}</button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Bookmark size={24} /> {t('textbooks.bookmarks')}</h1>
          <p className="text-white/80 text-sm">{bookmarkList.length} {t('textbooks.saved')}</p>
        </div>
        <div className="px-4 mt-4">
          {bookmarkList.length === 0 ? (
            <div className="text-center text-gray-400 text-sm mt-8">
              <Bookmark size={48} className="mx-auto mb-3 text-gray-200" />
              <p>{t('textbooks.no_bookmarks')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarkList.map((bm, i) => (
                <div key={bm.key} className="bg-white rounded-2xl p-3 shadow flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${i * 0.03}s` }}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bm.subject!.color} flex items-center justify-center text-xl flex-shrink-0`}>{bm.subject!.emoji}</div>
                  <button onClick={() => { setSelectedLevel(bm.level!); setSelectedSubject(bm.subject!); setSelectedChapter(bm.chapter!); setCurrentPageIdx(bm.pageIdx); setQuizAnswers({}); setQuizSubmitted({}); setPhase('reader'); window.scrollTo(0, 0); }}
                    className="flex-1 text-left min-w-0">
                    <p className="font-bold text-sm text-gray-700 truncate">{bm.page!.title}</p>
                    <p className="text-xs text-gray-400 truncate">{bm.subject!.name} · {bm.chapter!.title}</p>
                  </button>
                  <button onClick={() => { const next = new Set(bookmarks); next.delete(bm.key); setBookmarks(next); saveBookmarks(next); }}
                    className="p-2 text-gray-300 active:scale-90 transition">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===================== DASHBOARD ==========================================
  if (phase === 'dashboard') {
    const totalChapters = stats.totalChapters;
    const pct = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

    return (
      <div className="min-h-screen pb-28">
        <div className="bg-gradient-to-br from-candy-purple to-candy-blue px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
          <button onClick={goLibrary} className="text-white text-sm mb-2 active:scale-95 transition flex items-center gap-1"><ChevronLeft size={16} /> {t('textbooks.library')}</button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><TrendingUp size={24} /> {t('textbooks.dashboard')}</h1>
          <p className="text-white/80 text-sm">{t('textbooks.dashboard_desc')}</p>
        </div>
        <div className="px-4 mt-4 space-y-4">
          {/* Progress ring */}
          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <div className="relative inline-flex items-center justify-center mb-3">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="url(#grad)" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 327} 327`} />
                <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a66cdd" /><stop offset="100%" stopColor="#4d96ff" /></linearGradient></defs>
              </svg>
              <div className="absolute">
                <p className="text-3xl font-bold text-gray-700">{pct}%</p>
                <p className="text-xs text-gray-400">{t('textbooks.completed_badge')}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{completedCount} / {totalChapters} {t('textbooks.chapters')}</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-1"><BookOpen size={16} className="text-candy-blue" /><span className="text-xs text-gray-400 font-bold uppercase">{t('textbooks.started')}</span></div>
              <p className="text-2xl font-bold text-gray-700">{startedCount}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-1"><Check size={16} className="text-candy-green" /><span className="text-xs text-gray-400 font-bold uppercase">{t('textbooks.completed_badge')}</span></div>
              <p className="text-2xl font-bold text-gray-700">{completedCount}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-1"><Bookmark size={16} className="text-candy-purple" /><span className="text-xs text-gray-400 font-bold uppercase">{t('textbooks.saved')}</span></div>
              <p className="text-2xl font-bold text-gray-700">{bookmarks.size}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-1"><Star size={16} className="text-candy-yellow" /><span className="text-xs text-gray-400 font-bold uppercase">{t('textbooks.terms')}</span></div>
              <p className="text-2xl font-bold text-gray-700">{stats.totalKeyTerms}</p>
            </div>
          </div>

          {/* Per-level progress */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="font-bold text-sm text-gray-700 mb-3">{t('textbooks.by_level')}</h3>
            <div className="space-y-3">
              {TEXTBOOK_LEVELS.map(level => {
                const total = level.subjects.reduce((sum, s) => sum + s.chapters.length, 0);
                let done = 0;
                level.subjects.forEach(s => s.chapters.forEach(c => { if (completed[`${level.id}/${s.id}/${c.id}`]) done++; }));
                const levelPct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={level.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-600">{level.emoji} {level.name}</span>
                      <span className="text-xs text-gray-400">{done}/{total}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${level.color} rounded-full transition-all`} style={{ width: `${levelPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================== FLASHCARDS =========================================
  if (phase === 'flashcards') {
    if (flashcards.length === 0) return null;
    const card = flashcards[flashcardIdx];

    return (
      <div className="min-h-screen pb-28">
        <div className="bg-gradient-to-br from-candy-pink to-candy-purple px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
          <button onClick={goLibrary} className="text-white text-sm mb-2 active:scale-95 transition flex items-center gap-1"><ChevronLeft size={16} /> {t('textbooks.library')}</button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Layers size={24} /> {t('textbooks.flashcards')}</h1>
          <p className="text-white/80 text-sm">{flashcardIdx + 1} / {flashcards.length}</p>
        </div>
        <div className="px-4 mt-4">
          {/* Progress dots */}
          <div className="flex justify-center gap-1 mb-4 flex-wrap">
            {flashcards.map((_, i) => (
              <button key={i} onClick={() => { setFlashcardIdx(i); setFlashcardFlipped(false); }}
                className={`w-2 h-2 rounded-full transition ${i === flashcardIdx ? 'bg-candy-purple scale-125' : 'bg-gray-200'}`} />
            ))}
          </div>

          {/* Card */}
          <button onClick={() => setFlashcardFlipped(!flashcardFlipped)}
            className="w-full bg-white rounded-3xl shadow-xl p-8 min-h-[280px] flex flex-col items-center justify-center active:scale-95 transition relative">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-bold text-gray-300 uppercase">{flashcardFlipped ? t('textbooks.definition') : t('textbooks.term')}</span>
            </div>
            <div className="absolute top-4 left-4">
              <span className="text-xs">{card.subjectEmoji}</span>
            </div>
            {!flashcardFlipped ? (
              <>
                <div className="bg-gradient-to-br from-candy-purple/10 to-candy-blue/10 rounded-2xl px-6 py-4 mb-3">
                  <p className="text-center text-xl font-bold text-gray-700">{card.term}</p>
                </div>
                <p className="text-xs text-gray-400 text-center">{t('textbooks.tap_to_flip')}</p>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-candy-green/10 to-candy-mint/10 rounded-2xl px-6 py-4">
                  <p className="text-center text-sm text-gray-600 leading-relaxed">{card.definition}</p>
                </div>
                <p className="text-xs text-gray-400 mt-3">{t('textbooks.tap_to_flip')}</p>
              </>
            )}
            <div className="absolute bottom-4 right-4">
              <RotateCcw size={14} className="text-gray-200" />
            </div>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-4">
            <button onClick={prevFlashcard} className="flex items-center gap-1 bg-white text-gray-600 rounded-full px-5 py-2.5 font-bold text-sm shadow active:scale-95 transition">
              <ChevronLeft size={18} /> {t('textbooks.prev')}
            </button>
            <div className="flex-1 text-center">
              <span className="text-xs text-gray-400">{card.subjectName}</span>
            </div>
            <button onClick={nextFlashcard} className="flex items-center gap-1 bg-gradient-to-r from-candy-purple to-candy-blue text-white rounded-full px-5 py-2.5 font-bold text-sm shadow active:scale-95 transition">
              {t('textbooks.next')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ===================== Block Renderer ======================================

function BlockRenderer({ block, blockKey, selectedAnswer, isSubmitted, onAnswer, onSubmit, onReset }: {
  block: TextbookBlock; blockKey: string; selectedAnswer?: number; isSubmitted: boolean;
  onAnswer: (idx: number) => void; onSubmit: () => void; onReset: () => void;
}) {
  switch (block.type) {
    case 'heading':
      return (
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1 h-6 bg-gradient-to-b from-candy-purple to-candy-blue rounded-full" />
          <h3 className="font-bold text-base text-gray-700">{block.text}</h3>
        </div>
      );
    case 'paragraph':
      return <p className="text-sm text-gray-600 leading-relaxed">{block.text}</p>;
    case 'example':
      return (
        <div className="bg-candy-blue/10 border-l-4 border-candy-blue rounded-r-xl px-4 py-3">
          <div className="flex items-start gap-2">
            <Lightbulb size={16} className="text-candy-blue flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-candy-blue uppercase tracking-wide mb-1">{t('textbooks.example_label')}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{block.text}</p>
            </div>
          </div>
        </div>
      );
    case 'keyterm':
      return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-4 py-3">
          <div className="flex items-start gap-2">
            <BookMarked size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-amber-800">{block.term}</p>
              <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{block.definition}</p>
            </div>
          </div>
        </div>
      );
    case 'diagram':
      return (
        <div className="bg-gradient-to-br from-candy-mint/10 to-candy-blue/10 rounded-2xl px-4 py-5 text-center">
          <div className="text-4xl mb-2">{block.emoji}</div>
          <p className="text-xs text-gray-500 leading-relaxed">{block.text}</p>
        </div>
      );
    case 'summary':
      return (
        <div className="bg-gradient-to-br from-candy-green/10 to-candy-mint/10 border border-candy-green/30 rounded-xl px-4 py-3">
          <div className="flex items-start gap-2">
            <Sparkles size={16} className="text-candy-green flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-candy-green uppercase tracking-wide mb-1">{t('textbooks.summary_label')}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{block.text}</p>
            </div>
          </div>
        </div>
      );
    case 'funfact':
      return (
        <div className="bg-gradient-to-br from-candy-pink/10 to-candy-purple/10 border border-candy-pink/30 rounded-xl px-4 py-3">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-candy-pink flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-candy-pink uppercase tracking-wide mb-1">{t('textbooks.funfact_label')}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{block.text}</p>
            </div>
          </div>
        </div>
      );
    case 'tip':
      return (
        <div className="bg-gradient-to-br from-candy-yellow/10 to-amber-50 border border-candy-yellow/40 rounded-xl px-4 py-3">
          <div className="flex items-start gap-2">
            <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide mb-1">{t('textbooks.tip_label')}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{block.text}</p>
            </div>
          </div>
        </div>
      );
    case 'quiz':
      if (!block.options || block.answer === undefined) return null;
      const selected = selectedAnswer;
      const correct = selected === block.answer;
      return (
        <div className="bg-white border-2 border-gray-100 rounded-2xl px-4 py-3">
          <div className="flex items-start gap-2 mb-3">
            <HelpCircle size={18} className="text-candy-pink flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[10px] font-bold text-candy-pink uppercase tracking-wide mb-1">{t('textbooks.check_understanding')}</p>
              <p className="text-sm font-bold text-gray-700">{block.question}</p>
            </div>
          </div>
          <div className="space-y-2">
            {block.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === block.answer;
              let style = 'bg-gray-50 text-gray-600 border border-gray-200';
              if (isSubmitted) {
                if (isCorrect) style = 'bg-candy-green/20 text-candy-green border-2 border-candy-green font-bold';
                else if (isSelected && !isCorrect) style = 'bg-red-100 text-red-500 border-2 border-red-300';
                else style = 'bg-gray-50 text-gray-400 border border-gray-200';
              } else if (isSelected) style = 'bg-candy-purple/15 text-candy-purple border-2 border-candy-purple font-bold';
              return (
                <button key={i} onClick={() => onAnswer(i)} disabled={isSubmitted}
                  className={`w-full text-left rounded-xl px-3 py-2.5 text-sm transition active:scale-[0.98] flex items-center gap-2 ${style}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isSubmitted && isCorrect ? 'bg-candy-green text-white' : isSubmitted && isSelected && !isCorrect ? 'bg-red-400 text-white' : isSelected ? 'bg-candy-purple text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {isSubmitted && isCorrect ? <Check size={14} /> : isSubmitted && isSelected && !isCorrect ? <X size={14} /> : String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
          {!isSubmitted ? (
            <button onClick={onSubmit} disabled={selected === undefined}
              className={`w-full mt-3 rounded-full py-2 font-bold text-sm transition ${selected === undefined ? 'bg-gray-200 text-gray-400' : 'bg-gradient-to-r from-candy-purple to-candy-blue text-white shadow active:scale-95'}`}>
              {t('textbooks.check_answer')}
            </button>
          ) : (
            <div className="mt-3">
              <div className={`rounded-xl px-3 py-2 text-sm font-bold text-center ${correct ? 'bg-candy-green/20 text-candy-green' : 'bg-red-100 text-red-500'}`}>
                {correct ? `✓ ${t('textbooks.correct_answer')}` : `✗ ${t('textbooks.wrong_answer')}`}
              </div>
              <button onClick={onReset} className="w-full mt-2 flex items-center justify-center gap-1 text-xs text-gray-400 font-bold py-1">
                <RotateCcw size={12} /> {t('textbooks.try_again')}
              </button>
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}
