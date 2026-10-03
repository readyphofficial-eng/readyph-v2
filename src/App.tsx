import { useState, useEffect } from 'react';
import { Home, Palette, Gamepad2, Trophy, User, Settings, MessageSquare, Heart, Gift, Crown, X, Download, Brain, Handshake, Sprout, FileText, Library, Smartphone, BarChart3 } from 'lucide-react';
import { isOwner, getStreak, addStar, initScreenTime } from '@/lib/storage';
import { GAMES, type GameDef } from '@/pages/Games';
import { Home as HomePage } from '@/pages/Home';
import { Kinder } from '@/pages/Kinder';
import { QuizPage } from '@/pages/Quiz';
import { StageMapScreen } from '@/pages/StageMapScreen';
import { Achievements } from '@/pages/Achievements';
import { InstallPage } from '@/pages/Install';
import { ParentsDashboard } from '@/pages/ParentsDashboard';
import { ProfilePage } from '@/pages/Profile';
import { Support, Shop, Partners, MessageDev, OwnerDashboard } from '@/pages/MiscPages';
import { ReadyFarm } from '@/pages/ReadyFarm';
import { Worksheets } from '@/pages/Worksheets';
import { Textbooks } from '@/pages/Textbooks';
import { SettingsPage } from '@/pages/SettingsPage';
import { addGameScore } from '@/lib/storage';
import { initTheme } from '@/lib/themes';
import { t } from '@/lib/i18n';
import { initPWA, promptInstall, canInstall } from '@/lib/pwa';
import { syncFromCloud } from '@/lib/sync';
import { getStageProgress, getDifficultyForStage, DIFFICULTY_COLORS, DIFFICULTY_LABELS, TOTAL_STAGES } from '@/lib/gameData';
import { Confetti } from '@/components/Confetti';
import { ThemeStickers } from '@/components/ThemeStickers';

type Page = 'home' | 'kinder' | 'games' | 'readyfarm' | 'quiz' | 'achievements' | 'profile' | 'settings' | 'message' | 'support' | 'freebies' | 'partners' | 'owner' | 'elementary' | 'highschool' | 'worksheets' | 'textbooks' | 'install' | 'parents';

const NAV_BUTTONS: { id: Page; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'home', label: 'Home', icon: <Home size={18} />, color: 'from-primary-400 to-candy-pink' },
  { id: 'kinder', label: 'Kinder', icon: <Palette size={18} />, color: 'from-green-400 to-teal-500' },
  { id: 'games', label: 'Games', icon: <Gamepad2 size={18} />, color: 'from-candy-pink to-candy-purple' },
  { id: 'readyfarm', label: 'Ready Farm', icon: <Sprout size={18} />, color: 'from-green-500 to-green-600' },
  { id: 'quiz', label: 'Quiz', icon: <Brain size={18} />, color: 'from-candy-blue to-candy-mint' },
  { id: 'worksheets', label: 'Worksheets', icon: <FileText size={18} />, color: 'from-candy-green to-candy-mint' },
  { id: 'textbooks', label: 'Textbooks', icon: <Library size={18} />, color: 'from-candy-purple to-candy-blue' },
  { id: 'achievements', label: 'Awards', icon: <Trophy size={18} />, color: 'from-candy-yellow to-candy-green' },
  { id: 'parents', label: 'Parents', icon: <BarChart3 size={18} />, color: 'from-candy-purple to-candy-blue' },
  { id: 'install', label: 'Install', icon: <Smartphone size={18} />, color: 'from-candy-blue to-candy-mint' },
  { id: 'profile', label: 'Profile', icon: <User size={18} />, color: 'from-candy-blue to-candy-mint' },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} />, color: 'from-gray-400 to-gray-500' },
  { id: 'message', label: 'Message Dev', icon: <MessageSquare size={18} />, color: 'from-candy-purple to-candy-blue' },
  { id: 'support', label: 'Support', icon: <Heart size={18} />, color: 'from-candy-pink to-red-400' },
  { id: 'freebies', label: 'Shop', icon: <Gift size={18} />, color: 'from-candy-green to-candy-mint' },
  { id: 'partners', label: 'Partners', icon: <Handshake size={18} />, color: 'from-candy-purple to-candy-blue' },
  { id: 'owner', label: 'Owner', icon: <Crown size={18} />, color: 'from-candy-yellow to-candy-pink' },
];

function App() {
  const [page, setPage] = useState<Page>('home');
  const [owner, setOwner] = useState(isOwner());
  const [selectedGame, setSelectedGame] = useState<GameDef | null>(null);
  const [gameView, setGameView] = useState<'list' | 'map' | 'play'>('list');
  const [playedStage, setPlayedStage] = useState(1);
  const [streakPopup, setStreakPopup] = useState(false);
  const [streakDay, setStreakDay] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const [showInstall, setShowInstall] = useState(false);
  const [screenAlert, setScreenAlert] = useState(false);

  useEffect(() => {
    initTheme();
    const streak = getStreak();
    if (streak.isNewDay) {
      addStar(1);
      setStreakDay(streak.current);
      setStreakPopup(true);
      setConfetti(c => c + 1);
      setTimeout(() => setStreakPopup(false), 4000);
    }
    initPWA(() => setShowInstall(true));
    initScreenTime(() => setScreenAlert(true));
    syncFromCloud();
  }, []);

  const navigate = (p: string) => {
    if (p === 'owner' && !isOwner()) {
      alert(t('owner.only'));
      return;
    }
    setOwner(isOwner());
    setPage(p as Page);
    if (p !== 'games') {
      setSelectedGame(null);
      setGameView('list');
    }
    window.scrollTo(0, 0);
  };

  const navItems = owner ? NAV_BUTTONS : NAV_BUTTONS.filter(b => b.id !== 'owner');

  const openGame = (g: GameDef) => {
    setSelectedGame(g);
    setGameView('map');
    window.scrollTo(0, 0);
  };

  const startStage = (g: GameDef, stage: number) => {
    localStorage.setItem(`playStage_${g.id}`, String(stage));
    setPlayedStage(stage);
    setGameView('play');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'kinder': return <Kinder />;
      case 'quiz': return <QuizPage onNavigate={navigate} />;
      case 'games':
        if (selectedGame && gameView === 'map') {
          return (
            <StageMapScreen
              game={selectedGame}
              onStart={(stage) => startStage(selectedGame, stage)}
              onBack={() => { setSelectedGame(null); setGameView('list'); }}
            />
          );
        }
        if (selectedGame && gameView === 'play') {
          // the game writes the stage it is actually on (works for replays too)
          const liveStage = parseInt(localStorage.getItem(`curStage_${selectedGame.id}`) ?? '0', 10);
          const shownStage = liveStage > 0 ? liveStage : playedStage;
          const diff = getDifficultyForStage(shownStage);
          return (
            <div className="min-h-screen pb-28">
              <div className={`bg-gradient-to-br ${selectedGame.color} px-5 pt-10 pb-6 rounded-b-3xl shadow-lg`}>
                <button
                  onClick={() => setGameView('map')}
                  className="text-white text-sm mb-2 active:scale-95 transition"
                >← Stage Map</button>
                <h1 className="text-2xl font-bold text-white">{selectedGame.emoji} {selectedGame.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-white/80 text-xs">Stage {shownStage} / {TOTAL_STAGES}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${DIFFICULTY_COLORS[diff]} text-white`}>
                    {DIFFICULTY_LABELS[diff]}
                  </span>
                </div>
              </div>
              <div className="px-4 mt-4">
                {selectedGame.render((score) => addGameScore(selectedGame.name, score))}
              </div>
            </div>
          );
        }
        return (
          <div className="min-h-screen pb-28">
            <div className="bg-gradient-to-br from-candy-pink to-candy-purple px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
              <h1 className="text-2xl font-bold text-white">🎮 {t('games.title')}</h1>
              <p className="text-white/80 text-sm">{t('games.subtitle')}</p>
            </div>
            <div className="px-4 mt-4 grid grid-cols-2 gap-3">
              {GAMES.map((g, i) => {
                const stage = getStageProgress(g.id);
                const diff = getDifficultyForStage(stage);
                return (
                  <button
                    key={g.id}
                    onClick={() => openGame(g)}
                    className={`bg-gradient-to-br ${g.color} rounded-2xl p-4 shadow-lg active:scale-95 transition animate-pop relative overflow-hidden`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="text-3xl mb-1">{g.emoji}</div>
                    <p className="text-white font-bold text-xs text-center">{g.name}</p>
                    <div className="mt-1.5 flex items-center justify-center gap-1">
                      <span className="text-white/70 text-[9px]">Stage {stage}</span>
                      <span className="text-white/50 text-[9px]">•</span>
                      <span className="text-white/70 text-[9px]">{DIFFICULTY_LABELS[diff]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 'readyfarm': return <ReadyFarm />;
      case 'worksheets': return <Worksheets />;
      case 'textbooks': return <Textbooks />;
      case 'achievements': return <Achievements />;
      case 'install': return <InstallPage />;
      case 'parents': return <ParentsDashboard />;
      case 'profile': return <ProfilePage />;
      case 'settings': return <SettingsPage />;
      case 'message': return <MessageDev />;
      case 'support': return <Support />;
      case 'freebies': return <Shop />;
      case 'partners': return <Partners />;
      case 'owner': return <OwnerDashboard />;
      case 'elementary':
      case 'highschool':
        return (
          <div className="min-h-screen pb-28 flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl p-8 text-center shadow-xl max-w-sm">
              <div className="text-5xl mb-3">🚧</div>
              <h2 className="font-bold text-xl text-gray-700 mb-2">{page === 'elementary' ? t('home.coming_elementary') : t('home.coming_highschool')}</h2>
              <p className="text-gray-400 text-sm">{t('misc.coming_soon')}</p>
              <button onClick={() => navigate('home')} className="mt-4 bg-primary-500 rounded-full px-6 py-2 text-white font-bold text-sm">{t('misc.back_home')}</button>
            </div>
          </div>
        );
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="font-fredoka min-h-screen" style={{ background: 'var(--bg, #fff7ed)' }}>
      <ThemeStickers />
      <Confetti trigger={confetti} />
      <div className="max-w-[480px] mx-auto min-h-screen relative shadow-xl z-10" style={{ background: 'var(--bg, #fff7ed)' }}>
        {renderPage()}

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50">
          <div className="bg-white/95 backdrop-blur rounded-t-3xl border-t border-gray-100 px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {navItems.map(btn => (
                <button
                  key={btn.id}
                  onClick={() => navigate(btn.id)}
                  className={`flex flex-col items-center gap-0.5 rounded-2xl px-3 py-1.5 flex-shrink-0 transition ${
                    page === btn.id
                      ? `bg-gradient-to-br ${btn.color} shadow`
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className={page === btn.id ? 'text-white' : 'text-gray-400'}>{btn.icon}</div>
                  <span className={`text-[9px] font-bold whitespace-nowrap ${page === btn.id ? 'text-white' : 'text-gray-400'}`}>{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Streak Popup */}
      {streakPopup && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce-in max-w-xs">
            <div className="text-5xl mb-3 animate-float">🔥</div>
            <h2 className="font-bold text-xl text-gray-700 mb-1">{t('streak.popup_title')}</h2>
            <p className="text-gray-400 text-sm">{t('streak.day')} {streakDay}</p>
          </div>
        </div>
      )}

      {/* Install PWA Popup */}
      {showInstall && canInstall() && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[1500] w-full max-w-[480px] px-4">
          <div className="bg-gradient-to-r from-candy-blue to-candy-purple rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-slide-up">
            <Download size={24} className="text-white flex-shrink-0" />
            <div className="flex-1">
              <p className="text-white font-bold text-sm">{t('pwa.install')}</p>
              <p className="text-white/80 text-xs">{t('pwa.install_desc')}</p>
            </div>
            <button onClick={() => { promptInstall(); setShowInstall(false); }} className="bg-white rounded-full px-3 py-1.5 text-candy-purple font-bold text-xs whitespace-nowrap">{t('pwa.install_btn')}</button>
            <button onClick={() => setShowInstall(false)} className="text-white/70"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* Screen Time Alert */}
      {screenAlert && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce-in max-w-xs">
            <div className="text-5xl mb-3">😴</div>
            <h2 className="font-bold text-xl text-gray-700 mb-2">{t('screentime.alert')}</h2>
            <button onClick={() => setScreenAlert(false)} className="mt-3 bg-primary-500 rounded-full px-6 py-2 text-white font-bold text-sm">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
