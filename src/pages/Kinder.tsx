import { useState, useEffect, useMemo } from 'react';
import { Search, Heart, Play, Download, Star, Trophy, Medal, Focus, Volume2, X } from 'lucide-react';
import type { VideoItem, VideoCategory } from '@/types';
import { getDefaultVideos, getFavorites, toggleFavorite, getRecentWatched, addRecentWatched, addStar, addSticker, addQuizResult, addMedal, addTrophy, lsGet, lsRaw } from '@/lib/storage';
import { fetchYouTubeVideos, getManualVideos } from '@/lib/youtube';
import { generateQuiz } from '@/lib/questionBank';
import { generateWorksheet } from '@/lib/worksheet';
import { speak } from '@/components/Confetti';
import { Confetti } from '@/components/Confetti';
import { t } from '@/lib/i18n';

type Tab = 'All' | VideoCategory | 'Favorites' | 'Review' | 'New Uploads';

const TABS: Tab[] = ['All', 'Letters', 'Numbers', 'Colors', 'Shapes', 'Animals', 'New Uploads', 'Favorites', 'Review'];

export function Kinder() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [selected, setSelected] = useState<VideoItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [sponsored, setSponsored] = useState<VideoItem | null>(null);

  useEffect(() => {
    loadVideos();
    setFavorites(getFavorites());
    setRecent(getRecentWatched());
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    const channelId = lsRaw('ytChannelId', '');
    const ytVideos = await fetchYouTubeVideos(channelId);
    const manual = getManualVideos();
    const defaults = getDefaultVideos();
    const all = [...ytVideos, ...manual, ...defaults];
    setVideos(all);

    const sp = lsGet<{ title: string; url: string } | null>('sponsoredLesson', null);
    if (sp) {
      setSponsored({
        id: 'sponsored',
        title: sp.title,
        thumbnail: '',
        date: new Date().toISOString(),
        category: 'New Uploads',
        url: sp.url,
        youtubeId: sp.url.includes('v=') ? sp.url.split('v=')[1].split('&')[0] : sp.url.split('/').pop() ?? '',
      });
    }
    setLoading(false);
  };

  const filtered = useMemo(() => {
    let list = videos;
    if (activeTab === 'Favorites') {
      list = list.filter(v => favorites.includes(v.id));
    } else if (activeTab === 'Review') {
      list = list.filter(v => !recent.includes(v.id));
    } else if (activeTab !== 'All') {
      list = list.filter(v => v.category === activeTab);
    }
    if (search.trim()) {
      list = list.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));
    }
    return list;
  }, [videos, activeTab, search, favorites, recent]);

  const handleFav = (video: VideoItem) => {
    const f = toggleFavorite(video.id);
    setFavorites([...f]);
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="bg-gradient-to-br from-green-400 to-teal-500 px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-1">🎨 {t('kinder.title')}</h1>
        <p className="text-white/80 text-sm mb-4">{t('kinder.subtitle')}</p>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('kinder.search')}
            className="w-full bg-white rounded-full pl-10 pr-4 py-2.5 text-sm shadow outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition ${
              activeTab === tab
                ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white shadow'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {tab === 'Favorites' ? t('kinder.tab_favorites') : tab === 'Review' ? t('kinder.tab_recent') : tab === 'All' ? t('kinder.tab_all') : tab}
          </button>
        ))}
      </div>

      {/* Sponsored Slot */}
      {sponsored && (
        <div className="px-4 mb-3">
          <div className="border-2 border-dashed border-candy-pink bg-pink-50 rounded-2xl p-3 flex items-center gap-3">
            <div className="bg-candy-pink rounded-xl p-2">
              <span className="text-xl">📢</span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-candy-pink">{t('kinder.sponsored')}</p>
              <p className="font-bold text-sm text-gray-700">{sponsored.title}</p>
            </div>
            <button onClick={() => setSelected(sponsored)} className="bg-candy-pink rounded-full px-3 py-1.5 text-white text-xs font-bold">{t('kinder.watch')}</button>
          </div>
        </div>
      )}

      {/* Video Cards */}
      <div className="px-4 space-y-3">
        {loading && <p className="text-center text-gray-400 py-8">{t('kinder.loading')}</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8">{t('kinder.no_videos')}</p>
        )}
        {filtered.map(video => (
          <div key={video.id} className="bg-white rounded-2xl shadow overflow-hidden active:scale-95 transition">
            <button onClick={() => setSelected(video)} className="w-full text-left">
              <div className="flex gap-3 p-3">
                <div className="w-28 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  ) : (
                    <Play size={28} className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-700 line-clamp-2">{video.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(video.date).toLocaleDateString()}</p>
                  <span className="inline-block mt-1 bg-primary-100 text-primary-600 text-[10px] font-bold rounded-full px-2 py-0.5">{video.category}</span>
                </div>
              </div>
            </button>
            <div className="flex items-center justify-between px-3 pb-3">
              <button onClick={() => setSelected(video)} className="bg-gradient-to-r from-green-400 to-teal-500 rounded-full px-4 py-1.5 text-white text-xs font-bold">{t('kinder.watch')}</button>
              <button onClick={() => handleFav(video)} className="p-1">
                <Heart size={22} className={favorites.includes(video.id) ? 'fill-candy-pink text-candy-pink' : 'text-gray-300'} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <VideoModal video={selected} onClose={() => setSelected(null)} onFav={() => handleFav(selected)} isFav={favorites.includes(selected.id)} />
      )}
    </div>
  );
}

function VideoModal({ video, onClose, onFav, isFav }: { video: VideoItem; onClose: () => void; onFav: () => void; isFav: boolean }) {
  const [mode, setMode] = useState<'video' | 'quiz' | 'result'>('video');
  const [quiz, setQuiz] = useState(() => generateQuiz(video));
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const embedUrl = video.youtubeId ? `https://www.youtube.com/embed/${video.youtubeId}` : '';

  const handleComplete = () => {
    addRecentWatched(video.id);
    addStar(1);
    addSticker(video.category);
    setConfetti(c => c + 1);
    setTimeout(onClose, 1500);
  };

  const startQuiz = () => {
    setQuiz(generateQuiz(video));
    setAnswers([]);
    setCurrentQ(0);
    setScore(0);
    setMode('quiz');
  };

  const answerQuestion = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (idx === quiz[currentQ].answer) setScore(s => s + 1);
    if (currentQ + 1 < quiz.length) {
      setCurrentQ(c => c + 1);
    } else {
      const finalScore = newAnswers.filter((a, i) => a === quiz[i].answer).length;
      setScore(finalScore);
      addQuizResult(finalScore);
      addStar(finalScore);
      if (finalScore >= 7) {
        setConfetti(c => c + 1);
        if (finalScore === 10) { addTrophy(1); addMedal(1); }
        else { addMedal(1); }
      }
      setMode('result');
    }
  };

  const downloadWorksheet = () => {
    const profile = lsGet<{ name: string }>('profile', { name: '' });
    generateWorksheet(video.category, profile.name);
  };

  const passed = score >= 7;

  if (focusMode) {
    return (
      <div className="fixed inset-0 z-[2000] bg-black flex items-center justify-center">
        <button onClick={() => setFocusMode(false)} className="absolute top-4 right-4 bg-white/20 rounded-full p-2 z-10">
          <X size={24} className="text-white" />
        </button>
        {embedUrl && <iframe src={embedUrl} className="w-full h-full" allowFullScreen />}
        {!embedUrl && <p className="text-white">No video available</p>}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Confetti trigger={confetti} />
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-pop">
        <div className="sticky top-0 bg-gradient-to-r from-green-400 to-teal-500 px-5 py-3 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="font-bold text-white text-sm truncate flex-1">{video.title}</h2>
          <button onClick={onClose} className="bg-white/30 rounded-full p-1.5"><X size={18} className="text-white" /></button>
        </div>

        {mode === 'video' && (
          <div className="p-4">
            {embedUrl ? (
              <div className="aspect-video rounded-2xl overflow-hidden mb-3 bg-black">
                <iframe src={embedUrl} className="w-full h-full" allowFullScreen />
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                <p className="text-gray-400 text-sm">No embed available</p>
              </div>
            )}

            <button onClick={() => speak(video.title)} className="flex items-center gap-2 bg-candy-blue/20 rounded-full px-3 py-1.5 mb-3">
              <Volume2 size={16} className="text-candy-blue" />
              <span className="text-xs font-bold text-candy-blue">{t('kinder.listen')}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={handleComplete} className="bg-gradient-to-br from-candy-yellow to-candy-green rounded-2xl py-3 flex flex-col items-center gap-1 shadow active:scale-95 transition">
                <Star size={20} className="text-white" />
                <span className="text-white text-xs font-bold">{t('kinder.watch_complete')}</span>
              </button>
              <button onClick={startQuiz} className="bg-gradient-to-br from-candy-pink to-candy-purple rounded-2xl py-3 flex flex-col items-center gap-1 shadow active:scale-95 transition">
                <Trophy size={20} className="text-white" />
                <span className="text-white text-xs font-bold">{t('kinder.take_quiz')}</span>
              </button>
              <button onClick={downloadWorksheet} className="bg-gradient-to-br from-candy-blue to-candy-mint rounded-2xl py-3 flex flex-col items-center gap-1 shadow active:scale-95 transition">
                <Download size={20} className="text-white" />
                <span className="text-white text-xs font-bold">{t('kinder.worksheet')}</span>
              </button>
              <button onClick={onFav} className="bg-gradient-to-br from-red-400 to-candy-pink rounded-2xl py-3 flex flex-col items-center gap-1 shadow active:scale-95 transition">
                <Heart size={20} className={isFav ? 'fill-white text-white' : 'text-white'} />
                <span className="text-white text-xs font-bold">{t('kinder.favorite')}</span>
              </button>
            </div>
            <button onClick={() => setFocusMode(true)} className="w-full mt-2 bg-gray-800 rounded-2xl py-2.5 flex items-center justify-center gap-2 shadow active:scale-95 transition">
              <Focus size={18} className="text-white" />
              <span className="text-white text-xs font-bold">{t('kinder.focus_mode')}</span>
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-400 font-bold">{t('kinder.question')} {currentQ + 1} / {quiz.length}</span>
              <span className="text-xs text-candy-green font-bold">{t('kinder.score')}: {score}</span>
            </div>
            <h3 className="font-bold text-gray-700 mb-4 text-lg">{quiz[currentQ].q}</h3>
            <div className="space-y-2">
              {quiz[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answerQuestion(i)}
                  className="w-full bg-gray-100 hover:bg-primary-100 rounded-2xl py-3 px-4 text-left font-bold text-gray-600 active:scale-95 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'result' && (
          <div className="p-6 text-center">
            <div className={`text-5xl mb-3 animate-bounce-in`}>{passed ? '🎉' : '😢'}</div>
            <h3 className={`text-2xl font-bold mb-2 ${passed ? 'text-candy-green' : 'text-red-500'}`}>
              {passed ? t('kinder.passed') : t('kinder.failed')}
            </h3>
            <p className="text-gray-500 mb-4">Score: <span className="font-bold text-gray-700">{score} / {quiz.length}</span></p>
            {passed && (
              <div className="flex justify-center gap-3 mb-4">
                {score === 10 && <div className="bg-yellow-100 rounded-2xl px-4 py-2 flex items-center gap-1"><Trophy size={20} className="text-yellow-500" /><span className="font-bold text-yellow-600 text-sm">Trophy!</span></div>}
                {score >= 7 && <div className="bg-orange-100 rounded-2xl px-4 py-2 flex items-center gap-1"><Medal size={20} className="text-orange-500" /><span className="font-bold text-orange-600 text-sm">Medal!</span></div>}
              </div>
            )}
            <p className="text-xs text-gray-400 mb-4">+{score} {t('kinder.stars_added')}</p>
            <div className="flex gap-2">
              {!passed && <button onClick={startQuiz} className="flex-1 bg-candy-blue rounded-full py-2.5 font-bold text-white">{t('kinder.retry')}</button>}
              <button onClick={onClose} className="flex-1 bg-primary-500 rounded-full py-2.5 font-bold text-white">{t('kinder.done')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
