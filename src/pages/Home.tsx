import { useState, useEffect } from 'react';
import { Flame, Gamepad2, Trophy, User, Settings, MessageSquare, Heart, Gift, Star, Sparkles, Brain, FileText, Library, Smartphone, BarChart3, Download } from 'lucide-react';
import { getGreeting, getStreak, getStars, getStickers, lsGet, getShopItems, getPartners, getAppLogo } from '@/lib/storage';
import { t } from '@/lib/i18n';
import { promptInstall, canInstall, isInstalled } from '@/lib/pwa';
import { Confetti } from '@/components/Confetti';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [streak] = useState(() => getStreak());
  const [stars] = useState(() => getStars());
  const [stickers] = useState(() => getStickers());
  const [showEgg, setShowEgg] = useState(false);
  const [eggOpened, setEggOpened] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [parentalPopup, setParentalPopup] = useState<'elementary' | 'highschool' | null>(null);
  const [parentalAnswer, setParentalAnswer] = useState('');
  const [parentalError, setParentalError] = useState(false);
  const [shopItems, setShopItems] = useState(() => getShopItems());
  const [partners, setPartners] = useState(() => getPartners());
  const [appLogo, setAppLogo] = useState(() => getAppLogo());
  const [installable, setInstallable] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const recent = lsGet<string[]>('recentWatched', []);
    setShowEgg(recent.length >= 3);
    const handler = () => {
      setAppLogo(getAppLogo());
      setShopItems(getShopItems());
      setPartners(getPartners());
    };
    window.addEventListener('appLogoChanged', handler);
    window.addEventListener('cloudSynced', handler);

    setInstallable(canInstall());
    setInstalled(isInstalled());

    return () => {
      window.removeEventListener('appLogoChanged', handler);
      window.removeEventListener('cloudSynced', handler);
    };
  }, []);

  const handleParentalSubmit = () => {
    if (parseInt(parentalAnswer) === 15) {
      setParentalPopup(null);
      setParentalAnswer('');
      setParentalError(false);
      if (parentalPopup === 'elementary') onNavigate('elementary');
      else onNavigate('highschool');
    } else {
      setParentalError(true);
    }
  };

  const openEgg = () => {
    setEggOpened(true);
    setConfetti(c => c + 1);
    const bonus = Math.floor(Math.random() * 3) + 1;
    const cur = parseInt(localStorage.getItem('stars') ?? '0');
    localStorage.setItem('stars', String(cur + bonus));
    setTimeout(() => {
      setEggOpened(false);
      setShowEgg(false);
    }, 3000);
  };

  const handleInstall = () => {
    promptInstall();
    setInstallable(false);
  };

  return (
    <div className="home-pixar-shell min-h-screen pb-28 relative overflow-hidden text-slate-800">
      <div className="pixar-blob w-40 h-40 bg-white/25 left-[-18px] top-16" />
      <div className="pixar-blob w-52 h-52 bg-yellow-200/35 right-[-20px] top-24" />
      <div className="pixar-blob w-44 h-44 bg-pink-200/35 left-1/3 bottom-16" />

      <Confetti trigger={confetti} />

      <div className="relative z-10">
        {/* Hero */}
        <div className="px-4 pt-6 pb-4">
          <div className="pixar-card rounded-[32px] bg-gradient-to-br from-amber-100 via-emerald-100 to-cyan-100 p-4 shadow-2xl border border-white/60">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-16 h-16 shrink-0 rounded-[24px] bg-white/80 shadow-lg overflow-hidden flex items-center justify-center animate-float border border-white/60">
                  {appLogo ? (
                    <img src={appLogo} alt="Ready PH logo" className="block w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-[10px] font-bold text-center px-1 leading-tight">Ready PH</div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-600/80">{t('app.tagline')}</p>
                  <h1 className="text-2xl font-black text-slate-800 leading-none">Ready PH</h1>
                </div>
              </div>

              <div className="pixar-chip bg-white/40 rounded-full px-3 py-2 text-slate-800 border border-white/70">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Flame size={16} className="text-amber-500" />
                  <span>{streak.current} {t('home.streak_days')}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-slate-700 text-sm">{getGreeting()},</p>
                <p className="text-slate-800 text-2xl font-black leading-tight">{t('home.greeting')}! 👋</p>
              </div>
              <div className="pixar-chip bg-white/40 rounded-full px-3 py-2 text-slate-800 border border-white/70">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Star size={16} className="text-amber-500 fill-amber-400" />
                  <span>{stars}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-2">
          {!installed && installable && (
            <div className="pixar-card bg-gradient-to-r from-candy-blue to-candy-purple rounded-[24px] p-3.5 mb-4 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2 flex-shrink-0">
                  <Download size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{t('pwa.install')}</p>
                  <p className="text-white/80 text-[11px]">{t('pwa.install_desc')}</p>
                </div>
                <button
                  onClick={handleInstall}
                  className="bg-white rounded-full px-3 py-1.5 text-candy-purple font-bold text-[11px] whitespace-nowrap active:scale-95 transition flex-shrink-0"
                >
                  {t('install.btn')}
                </button>
              </div>
            </div>
          )}

          {/* Top row */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <button
              onClick={() => onNavigate('kinder')}
              className="pixar-button flex flex-col items-center justify-center h-28 rounded-[26px] bg-gradient-to-br from-green-400 to-teal-500 text-white"
            >
              <div className="text-3xl mb-1">🎨</div>
              <p className="font-black text-[11px] leading-tight text-center px-1">{t('home.kinder_ready')}</p>
            </button>
            <button
              onClick={() => setParentalPopup('elementary')}
              className="pixar-button flex flex-col items-center justify-center h-28 rounded-[26px] bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600"
            >
              <div className="text-3xl mb-1">📖</div>
              <p className="font-black text-[11px] leading-tight text-center px-1">{t('home.elementary')}</p>
              <p className="text-[9px] mt-0.5">🔒 {t('home.locked')}</p>
            </button>
            <button
              onClick={() => setParentalPopup('highschool')}
              className="pixar-button flex flex-col items-center justify-center h-28 rounded-[26px] bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600"
            >
              <div className="text-3xl mb-1">🎓</div>
              <p className="font-black text-[11px] leading-tight text-center px-1">{t('home.highschool')}</p>
              <p className="text-[9px] mt-0.5">🔒 {t('home.locked')}</p>
            </button>
          </div>

          {/* Daily challenge + egg */}
          <div className={`grid ${showEgg ? 'grid-cols-[1.5fr_0.9fr]' : 'grid-cols-1'} gap-3 mb-4`}>
            <div className="pixar-card bg-gradient-to-br from-candy-blue to-candy-purple rounded-[26px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-white" />
                <p className="text-white font-black text-sm">{t('home.daily_challenge')}</p>
              </div>
              <p className="text-white/80 text-xs mb-3">{t('home.daily_challenge_desc')}</p>
              <button
                onClick={() => onNavigate('kinder')}
                className="bg-white/25 backdrop-blur rounded-full px-3 py-1.5 text-white text-[11px] font-bold"
              >
                {t('home.start')} →
              </button>
            </div>

            {showEgg && (
              <button
                onClick={openEgg}
                className="pixar-button relative overflow-hidden bg-gradient-to-br from-candy-yellow to-candy-pink rounded-[26px] p-3 animate-bounce-in"
              >
                {eggOpened ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-pop">
                    <div className="text-3xl">🎉</div>
                    <p className="text-white font-black text-[10px] mt-1">{t('home.bonus_stars')}</p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="text-3xl animate-float">🥚</div>
                    <p className="text-white font-black text-[10px] mt-1">{t('home.surprise_egg')}</p>
                  </div>
                )}
              </button>
            )}
          </div>

          {/* Partners */}
          <div className="pixar-card bg-white/80 rounded-[28px] p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤝</span>
                <p className="font-black text-slate-700">{t('partners.title')}</p>
              </div>
              <button
                onClick={() => onNavigate('partners')}
                className="bg-slate-100 rounded-full px-3 py-1 text-[11px] font-bold text-slate-500 active:scale-95 transition"
              >
                {t('shop.view_all')} ›
              </button>
            </div>
            {partners.length === 0 ? (
              <p className="text-xs text-slate-400">{t('partners.empty')}</p>
            ) : (
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {partners.map((p, i) => (
                  <div key={i} className="flex-shrink-0 min-w-[82px] bg-slate-50 rounded-[22px] p-2.5 flex flex-col items-center gap-1.5 border border-slate-100">
                    <div className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                      {p.logoImg ? <img src={p.logoImg} alt={p.name} className="w-full h-full object-cover" /> : <span className="text-xl">{p.logo || '🤝'}</span>}
                    </div>
                    <p className="text-[11px] font-bold text-slate-600 text-center leading-tight max-w-[76px] truncate">{p.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shop */}
          <div className="pixar-card bg-white/80 rounded-[28px] p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <p className="font-black text-slate-700">{t('shop.title')}</p>
              </div>
              <button
                onClick={() => onNavigate('freebies')}
                className="bg-slate-100 rounded-full px-3 py-1 text-[11px] font-bold text-slate-500 active:scale-95 transition"
              >
                {t('shop.view_all')} ›
              </button>
            </div>
            {shopItems.length === 0 ? (
              <p className="text-xs text-slate-400">{t('shop.empty')}</p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {shopItems.slice(0, 3).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => window.open(item.link, '_blank')}
                    className="flex items-center gap-3 bg-slate-50 rounded-[22px] p-2.5 text-left active:scale-95 transition w-full border border-slate-100"
                  >
                    <div className="w-12 h-12 rounded-[18px] bg-white shadow flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.logoImg ? <img src={item.logoImg} alt={item.title} className="w-full h-full object-cover" /> : <span className="text-2xl">{item.logo || '🛒'}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-700 text-sm truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                      {item.subDesc && <span className="inline-block bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 mt-1 text-[10px] font-bold">{item.subDesc}</span>}
                    </div>
                    <span className="bg-gradient-to-r from-candy-green to-candy-mint rounded-full px-3 py-1.5 text-white text-[10px] font-bold flex-shrink-0">Buy ↗</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nav list */}
          <div className="flex flex-col gap-2.5 mb-4">
            <NavButton icon={<Brain size={24} />} label="Quiz Time!" color="from-candy-blue to-candy-mint" onClick={() => onNavigate('quiz')} />
            <NavButton icon={<FileText size={24} />} label="Worksheets" color="from-candy-green to-candy-mint" onClick={() => onNavigate('worksheets')} />
            <NavButton icon={<Library size={24} />} label="Textbooks" color="from-candy-purple to-candy-blue" onClick={() => onNavigate('textbooks')} />
            <NavButton icon={<Gamepad2 size={24} />} label={t('home.mini_games')} color="from-candy-pink to-candy-purple" onClick={() => onNavigate('games')} />
            <NavButton icon={<span className="text-2xl">🌾</span>} label="Ready Farm" color="from-green-500 to-green-600" onClick={() => onNavigate('readyfarm')} />
            <NavButton icon={<Trophy size={24} />} label={t('home.achievements')} color="from-candy-yellow to-candy-green" onClick={() => onNavigate('achievements')} />
            <NavButton icon={<BarChart3 size={24} />} label={t('parents.title')} color="from-candy-purple to-candy-blue" onClick={() => onNavigate('parents')} />
            <NavButton icon={<Smartphone size={24} />} label={t('install.title')} color="from-candy-blue to-candy-mint" onClick={() => onNavigate('install')} />
            <NavButton icon={<User size={24} />} label={t('home.profile_id')} color="from-candy-blue to-candy-mint" onClick={() => onNavigate('profile')} />
            <NavButton icon={<Heart size={24} />} label={t('home.support')} color="from-candy-pink to-red-400" onClick={() => onNavigate('support')} />
            <NavButton icon={<Gift size={24} />} label={t('home.freebies')} color="from-candy-green to-candy-mint" onClick={() => onNavigate('freebies')} />
            <NavButton icon={<MessageSquare size={24} />} label={t('home.message_dev')} color="from-candy-purple to-candy-blue" onClick={() => onNavigate('message')} />
            <NavButton icon={<Settings size={24} />} label={t('home.settings')} color="from-gray-400 to-gray-500" onClick={() => onNavigate('settings')} />
          </div>

          {/* Sticker book */}
          <div className="pixar-card bg-gradient-to-br from-amber-100 to-orange-100 rounded-[26px] p-4 mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📒</span>
              <p className="font-black text-orange-700">{t('home.sticker_book')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Letters', 'Numbers', 'Colors', 'Shapes', 'Animals'].map(cat => {
                const has = stickers.includes(cat);
                return (
                  <div
                    key={cat}
                    className={`rounded-[16px] px-3 py-2 text-[11px] font-black transition ${
                      has
                        ? 'bg-gradient-to-br from-candy-yellow to-candy-pink text-white shadow animate-pop'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {has ? getStickerEmoji(cat) : '🔒'} {cat}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Parental Gate Popup */}
      {parentalPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[30px] p-6 w-full max-w-sm shadow-2xl animate-pop">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-black text-lg text-slate-800">
                {parentalPopup === 'elementary' ? t('home.coming_elementary') : t('home.coming_highschool')}
              </h3>
              <p className="text-slate-500 text-sm mt-1">{t('home.parental_gate')}</p>
            </div>
            <input
              type="number"
              value={parentalAnswer}
              onChange={e => { setParentalAnswer(e.target.value); setParentalError(false); }}
              className="w-full text-center text-xl font-bold border-2 border-slate-200 rounded-[18px] py-3 mb-2 focus:border-primary-400 outline-none"
              placeholder="?"
            />
            {parentalError && <p className="text-red-500 text-sm text-center mb-2">{t('home.parental_wrong')}</p>}
            <div className="flex gap-2">
              <button onClick={() => { setParentalPopup(null); setParentalAnswer(''); setParentalError(false); }} className="flex-1 bg-slate-200 rounded-full py-2.5 font-black text-slate-600">{t('home.cancel')}</button>
              <button onClick={handleParentalSubmit} className="flex-1 bg-primary-500 rounded-full py-2.5 font-black text-white">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavButton({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 bg-gradient-to-r ${color} rounded-[22px] p-3.5 shadow-lg active:scale-95 transition transform hover:shadow-xl w-full text-left border border-white/15`}
    >
      <div className="bg-white/25 backdrop-blur rounded-[16px] p-2 text-white">{icon}</div>
      <span className="text-white font-black flex-1 text-sm">{label}</span>
      <span className="text-white/80 text-xl">›</span>
    </button>
  );
}

function getStickerEmoji(cat: string): string {
  const map: Record<string, string> = { Letters: '🔤', Numbers: '🔢', Colors: '🌈', Shapes: '🔷', Animals: '🐾' };
  return map[cat] ?? '⭐';
}
