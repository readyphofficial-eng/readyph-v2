import { useState, useEffect, useRef } from 'react';
import { Trophy, Medal, Star, BarChart3, Share2, Check, Lock, Award, Download, Printer, ScrollText } from 'lucide-react';
import { getStars, getMedals, getTrophies, getQuizResults, getRecentWatched, getTotalGamePoints, getStreak, lsGet, lsSet, getStickers, getGameScores } from '@/lib/storage';
import { Confetti } from '@/components/Confetti';
import { t } from '@/lib/i18n';

interface MajorAchievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  check: (s: AchievementStats) => boolean;
}

interface AchievementStats {
  videos: number;
  quizzes: number;
  avgPct: number;
  gamePoints: number;
  stars: number;
  medals: number;
  trophies: number;
  currentStreak: number;
  longestStreak: number;
  stickers: number;
  worksheets: number;
  textbooks: number;
  uniqueGames: number;
}

const MAJOR_ACHIEVEMENTS: MajorAchievement[] = [
  { id: 'first_steps', name: 'First Steps', desc: 'Watch your first video', icon: '👣', check: s => s.videos >= 1 },
  { id: 'curious_mind', name: 'Curious Mind', desc: 'Watch 10 videos', icon: '🧠', check: s => s.videos >= 10 },
  { id: 'video_master', name: 'Video Master', desc: 'Watch 25 videos', icon: '📺', check: s => s.videos >= 25 },
  { id: 'quiz_rookie', name: 'Quiz Rookie', desc: 'Complete 1 quiz', icon: '📝', check: s => s.quizzes >= 1 },
  { id: 'quiz_pro', name: 'Quiz Pro', desc: 'Complete 10 quizzes', icon: '✏️', check: s => s.quizzes >= 10 },
  { id: 'quiz_champion', name: 'Quiz Champion', desc: 'Complete 25 quizzes', icon: '🏆', check: s => s.quizzes >= 25 },
  { id: 'perfect_score', name: 'Perfect Score', desc: 'Get 100% on a quiz', icon: '💯', check: s => s.avgPct >= 100 },
  { id: 'high_achiever', name: 'High Achiever', desc: '80%+ quiz average', icon: '🌟', check: s => s.avgPct >= 80 },
  { id: 'star_collector', name: 'Star Collector', desc: 'Earn 50 stars', icon: '⭐', check: s => s.stars >= 50 },
  { id: 'star_master', name: 'Star Master', desc: 'Earn 100 stars', icon: '✨', check: s => s.stars >= 100 },
  { id: 'medal_winner', name: 'Medal Winner', desc: 'Earn 10 medals', icon: '🏅', check: s => s.medals >= 10 },
  { id: 'trophy_hunter', name: 'Trophy Hunter', desc: 'Earn 5 trophies', icon: '🏆', check: s => s.trophies >= 5 },
  { id: 'streak_week', name: 'Week Warrior', desc: '7-day streak', icon: '🔥', check: s => s.currentStreak >= 7 },
  { id: 'streak_month', name: 'Monthly Master', desc: '30-day streak', icon: '📅', check: s => s.currentStreak >= 30 },
  { id: 'game_explorer', name: 'Game Explorer', desc: 'Play 5 different games', icon: '🎮', check: s => s.uniqueGames >= 5 },
  { id: 'game_champion', name: 'Game Champion', desc: '1000+ game points', icon: '🕹️', check: s => s.gamePoints >= 1000 },
  { id: 'category_master', name: 'Category Master', desc: 'Collect 3+ stickers', icon: '📒', check: s => s.stickers >= 3 },
  { id: 'worksheet_starter', name: 'Worksheet Starter', desc: 'Download a worksheet', icon: '📄', check: s => s.worksheets >= 1 },
  { id: 'textbook_reader', name: 'Textbook Reader', desc: 'Complete a textbook chapter', icon: '📖', check: s => s.textbooks >= 1 },
  { id: 'farm_grower', name: 'Farm Grower', desc: 'Reach farm level 5', icon: '🌾', check: s => (lsGet<{ level?: number }>('readyFarmData', {}).level ?? 0) >= 5 },
];

export function Achievements() {
  const [tab, setTab] = useState<'stats' | 'cabinet' | 'certificates'>('stats');
  const [confetti, setConfetti] = useState(0);
  const [stats, setStats] = useState<AchievementStats>({
    videos: 0, quizzes: 0, avgPct: 0, gamePoints: 0, stars: 0, medals: 0, trophies: 0,
    currentStreak: 0, longestStreak: 0, stickers: 0, worksheets: 0, textbooks: 0, uniqueGames: 0,
  });
  const [tasks, setTasks] = useState<{ id: string; name: string; done: boolean }[]>([]);
  const [majorUnlocked, setMajorUnlocked] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const certCanvasRef = useRef<HTMLCanvasElement>(null);
  const [certAchievement, setCertAchievement] = useState<MajorAchievement | null>(null);

  useEffect(() => {
    const recent = getRecentWatched();
    const quizResults = getQuizResults();
    const streak = getStreak();
    const avg = quizResults.length > 0 ? Math.round(quizResults.reduce((a, b) => a + b, 0) / quizResults.length * 10) : 0;
    const gameScores = getGameScores();
    const uniqueGames = new Set(gameScores.map(g => g.game)).size;
    const tbCompleted = lsGet<Record<string, boolean>>('textbookCompleted', {});
    const wsDownloaded = lsGet<string[]>('worksheetsDownloaded', []);

    const s: AchievementStats = {
      videos: recent.length,
      quizzes: quizResults.length,
      avgPct: avg,
      gamePoints: getTotalGamePoints(),
      stars: getStars(),
      medals: getMedals(),
      trophies: getTrophies(),
      currentStreak: streak.current,
      longestStreak: streak.longest,
      stickers: getStickers().length,
      worksheets: wsDownloaded.length,
      textbooks: Object.keys(tbCompleted).filter(k => tbCompleted[k]).length,
      uniqueGames,
    };
    setStats(s);

    const taskList = [
      { id: 'beginner', name: t('ach.task_beginner'), done: recent.length >= 1 },
      { id: 'category', name: t('ach.task_category'), done: s.stickers >= 3 },
      { id: 'games', name: t('ach.task_games'), done: uniqueGames >= 5 },
      { id: 'streak3', name: t('ach.task_streak3'), done: streak.current >= 3 },
      { id: 'streak7', name: t('ach.task_streak7'), done: streak.current >= 7 },
      { id: 'early', name: t('ach.task_early'), done: new Date().getHours() < 8 },
      { id: 'night', name: t('ach.task_night'), done: new Date().getHours() >= 20 },
      { id: 'quiz80', name: t('ach.task_quiz80'), done: avg >= 80 },
      { id: 'quiz100', name: t('ach.task_quiz100'), done: avg >= 100 },
      { id: 'videos10', name: t('ach.task_videos10'), done: recent.length >= 10 },
      { id: 'stars50', name: t('ach.task_stars50'), done: s.stars >= 50 },
      { id: 'stars100', name: t('ach.task_stars100'), done: s.stars >= 100 },
      { id: 'medals10', name: t('ach.task_medals10'), done: s.medals >= 10 },
      { id: 'trophies5', name: t('ach.task_trophies5'), done: s.trophies >= 5 },
      { id: 'gamepts500', name: t('ach.task_gamepts500'), done: s.gamePoints >= 500 },
      { id: 'gamepts1000', name: t('ach.task_gamepts1000'), done: s.gamePoints >= 1000 },
    ];
    setTasks(taskList);

    const unlocked = MAJOR_ACHIEVEMENTS.filter(a => a.check(s)).map(a => a.id);
    const prevUnlocked = lsGet<string[]>('majorAchievements', []);
    const newOnes = unlocked.filter(id => !prevUnlocked.includes(id));
    if (newOnes.length > 0) {
      setConfetti(c => c + 1);
      lsSet('majorAchievements', unlocked);
    }
    setMajorUnlocked(unlocked);
    if (taskList.some(t => t.done && !lsGet(`taskSeen_${t.id}`, false))) {
      taskList.forEach(t => { if (t.done) lsSet(`taskSeen_${t.id}`, true); });
    }
  }, []);

  const generateReport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const profile = lsGet<{ name: string }>('profile', { name: '' });
    const name = profile.name || t('ach.child_default');

    ctx.fillStyle = '#fff7ed';
    ctx.fillRect(0, 0, 600, 800);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(0, 0, 600, 100);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px Fredoka, sans-serif';
    ctx.fillText('Ready PH Report Card', 140, 55);
    ctx.font = '18px Fredoka, sans-serif';
    ctx.fillText(t('ach.report_card'), 210, 85);

    ctx.fillStyle = '#333';
    ctx.font = 'bold 24px Fredoka, sans-serif';
    ctx.fillText(`${t('ach.name_label')}: ${name}`, 40, 150);
    ctx.fillText(`${t('ach.date_label')}: ${new Date().toLocaleDateString()}`, 40, 185);

    ctx.font = '20px Fredoka, sans-serif';
    ctx.fillStyle = '#555';
    ctx.fillText(`⭐ ${t('ach.stars')}: ${stats.stars}`, 40, 240);
    ctx.fillText(`🏅 ${t('ach.medals')}: ${stats.medals}`, 40, 275);
    ctx.fillText(`🏆 ${t('ach.trophies')}: ${stats.trophies}`, 40, 310);
    ctx.fillText(`📚 ${t('ach.videos_watched')}: ${stats.videos}`, 40, 345);
    ctx.fillText(`📝 ${t('ach.quizzes_taken')}: ${stats.quizzes}`, 40, 380);
    ctx.fillText(`📊 ${t('ach.average')}: ${stats.avgPct}%`, 40, 415);
    ctx.fillText(`🎮 ${t('ach.game_points')}: ${stats.gamePoints}`, 40, 450);
    ctx.fillText(`🔥 ${t('ach.current_streak')}: ${stats.currentStreak} ${t('ach.days')}`, 40, 485);
    ctx.fillText(`🔥 ${t('ach.longest_streak')}: ${stats.longestStreak} ${t('ach.days')}`, 40, 520);

    ctx.fillStyle = '#6bcb77';
    ctx.fillRect(40, 620, 520, 4);
    ctx.fillStyle = '#333';
    ctx.font = '16px Fredoka, sans-serif';
    ctx.fillText(t('ach.keep_up'), 120, 670);
    ctx.fillStyle = '#999';
    ctx.font = '12px Fredoka, sans-serif';
    ctx.fillText(t('app.tagline'), 180, 750);

    const link = document.createElement('a');
    link.download = `ready-ph-report-${name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const generateCertificate = (ach: MajorAchievement) => {
    setCertAchievement(ach);
    setTimeout(() => {
      const canvas = certCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const profile = lsGet<{ name: string }>('profile', { name: '' });
      const name = profile.name || t('ach.child_default');
      const W = 1000, H = 700;

      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, W, H);

      // Border
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, W - 40, H - 40);
      ctx.strokeStyle = '#ff6b9d';
      ctx.lineWidth = 2;
      ctx.strokeRect(35, 35, W - 70, H - 70);

      // Corner decorations
      ctx.fillStyle = '#f97316';
      [[40, 40], [W - 80, 40], [40, H - 80], [W - 80, H - 80]].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x + 20, y + 20, 12, 0, Math.PI * 2);
        ctx.fill();
      });

      // Logo circle
      ctx.fillStyle = '#fff7ed';
      ctx.beginPath();
      ctx.arc(W / 2, 110, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#f97316';
      ctx.fillText('📚', W / 2, 122);

      // Title
      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 42px Fredoka, Georgia, serif';
      ctx.fillText('Certificate of Achievement', W / 2, 200);

      ctx.fillStyle = '#666';
      ctx.font = '20px Fredoka, sans-serif';
      ctx.fillText(t('cert.presented_to'), W / 2, 250);

      // Name
      ctx.fillStyle = '#333';
      ctx.font = 'bold 36px Fredoka, Georgia, serif';
      ctx.fillText(name, W / 2, 300);

      // Underline
      const nameWidth = ctx.measureText(name).width;
      ctx.strokeStyle = '#ff6b9d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2 - nameWidth / 2 - 10, 315);
      ctx.lineTo(W / 2 + nameWidth / 2 + 10, 315);
      ctx.stroke();

      // Achievement
      ctx.fillStyle = '#666';
      ctx.font = '18px Fredoka, sans-serif';
      ctx.fillText(t('cert.for_completing'), W / 2, 360);

      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 28px Fredoka, Georgia, serif';
      ctx.fillText(`${ach.icon} ${ach.name}`, W / 2, 405);

      ctx.fillStyle = '#555';
      ctx.font = '16px Fredoka, sans-serif';
      ctx.fillText(ach.desc, W / 2, 435);

      // Date
      ctx.fillStyle = '#999';
      ctx.font = '14px Fredoka, sans-serif';
      ctx.fillText(`${t('ach.date_label')}: ${new Date().toLocaleDateString()}`, W / 2, 480);

      // Signature line
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(150, 580);
      ctx.lineTo(350, 580);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(650, 580);
      ctx.lineTo(850, 580);
      ctx.stroke();

      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px Fredoka, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Ready PH', 180, 600);
      ctx.font = '12px Fredoka, sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(t('cert.issued_by'), 200, 618);

      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px Fredoka, sans-serif';
      ctx.fillText('Jim Marc Briones', 670, 600);
      ctx.font = '12px Fredoka, sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(t('cert.founder'), 670, 618);

      // Seal
      ctx.fillStyle = '#ff6b9d';
      ctx.beginPath();
      ctx.arc(W / 2, 590, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('READY', W / 2, 585);
      ctx.fillText('PH', W / 2, 602);

      // Tagline
      ctx.fillStyle = '#999';
      ctx.font = '11px Fredoka, sans-serif';
      ctx.fillText(t('app.tagline'), W / 2, 660);

      ctx.textAlign = 'left';

      const link = document.createElement('a');
      link.download = `readyph-certificate-${ach.id}-${name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }, 100);
  };

  const printCertificate = () => {
    const canvas = certCanvasRef.current;
    if (!canvas || !certAchievement) return;
    const dataUrl = canvas.toDataURL();
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>Ready PH Certificate</title>
      <style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f5f5f5}
      img{max-width:100%;height:auto}@media print{body{background:#fff}}</style></head>
      <body><img src="${dataUrl}" onload="window.print()" /></body></html>
    `);
    win.document.close();
  };

  const shareCertificate = async () => {
    const canvas = certCanvasRef.current;
    if (!canvas || !certAchievement) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      if (navigator.share) {
        try {
          await navigator.share({
            files: [new File([blob], `readyph-cert-${certAchievement.id}.png`, { type: 'image/png' })],
            title: 'Ready PH Certificate',
            text: t('cert.share_text'),
          });
        } catch {}
      } else {
        const link = document.createElement('a');
        link.download = `readyph-cert-${certAchievement.id}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    });
  };

  return (
    <div className="min-h-screen pb-28">
      <Confetti trigger={confetti} />
      <div className="bg-gradient-to-br from-candy-yellow to-candy-green px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white">🏆 {t('ach.title')}</h1>
        <p className="text-white/80 text-sm">{t('ach.subtitle')}</p>
      </div>

      <div className="flex gap-2 px-4 py-3">
        <button onClick={() => setTab('stats')} className={`flex-1 rounded-full py-2 font-bold text-xs ${tab === 'stats' ? 'bg-candy-green text-white shadow' : 'bg-gray-200 text-gray-500'}`}>
          <BarChart3 size={14} className="inline mr-1" /> {t('ach.statistics')}
        </button>
        <button onClick={() => setTab('cabinet')} className={`flex-1 rounded-full py-2 font-bold text-xs ${tab === 'cabinet' ? 'bg-candy-yellow text-white shadow' : 'bg-gray-200 text-gray-500'}`}>
          <Trophy size={14} className="inline mr-1" /> {t('ach.trophy_cabinet')}
        </button>
        <button onClick={() => setTab('certificates')} className={`flex-1 rounded-full py-2 font-bold text-xs ${tab === 'certificates' ? 'bg-candy-purple text-white shadow' : 'bg-gray-200 text-gray-500'}`}>
          <ScrollText size={14} className="inline mr-1" /> {t('cert.title')}
        </button>
      </div>

      {tab === 'stats' && (
        <div className="px-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon="📚" label={t('ach.videos_watched')} value={stats.videos} color="from-candy-blue to-candy-mint" />
            <StatCard icon="📝" label={t('ach.quizzes_taken')} value={stats.quizzes} color="from-candy-pink to-candy-purple" />
            <StatCard icon="📊" label={t('ach.average_pct')} value={stats.avgPct + '%'} color="from-candy-yellow to-candy-green" />
            <StatCard icon="🎮" label={t('ach.game_points')} value={stats.gamePoints} color="from-candy-purple to-candy-blue" />
            <StatCard icon="⭐" label={t('ach.stars')} value={stats.stars} color="from-candy-yellow to-candy-pink" />
            <StatCard icon="🔥" label={t('ach.current_streak')} value={stats.currentStreak} color="from-red-400 to-candy-pink" />
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <p className="font-bold text-gray-700 mb-2">🔥 {t('ach.longest_streak')}: {stats.longestStreak} {t('ach.days')}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-bold text-gray-700 mb-3">📋 {t('ach.tasks')}</h3>
            <div className="space-y-2">
              {tasks.map(task => (
                <div key={task.id} className={`flex items-center gap-2 rounded-xl p-2 ${task.done ? 'bg-candy-green/20' : 'bg-gray-100'}`}>
                  {task.done ? <Check size={18} className="text-candy-green" /> : <Lock size={18} className="text-gray-400" />}
                  <span className={`text-sm ${task.done ? 'text-candy-green font-bold' : 'text-gray-400'}`}>{task.name}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={generateReport} className="w-full bg-gradient-to-r from-candy-blue to-candy-purple rounded-2xl py-3 flex items-center justify-center gap-2 shadow active:scale-95 transition">
            <Share2 size={20} className="text-white" />
            <span className="text-white font-bold">{t('ach.share_report')}</span>
          </button>

          <canvas ref={canvasRef} width={600} height={800} className="hidden" />
        </div>
      )}

      {tab === 'cabinet' && (
        <div className="px-4">
          <div className="bg-gradient-to-b from-amber-800 to-amber-900 rounded-3xl p-4 shadow-lg">
            <Shelf label="Stars ⭐" items={stats.stars} icon={<Star size={28} className="text-yellow-400 fill-yellow-400" />} />
            <Shelf label="Medals 🏅" items={stats.medals} icon={<Medal size={28} className="text-orange-400" />} />
            <Shelf label="Trophies 🏆" items={stats.trophies} icon={<Trophy size={28} className="text-yellow-500" />} />
          </div>

          <div className="mt-4 bg-white rounded-2xl p-4 shadow">
            <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
              <Award size={18} className="text-candy-yellow" /> {t('ach.major_achievements')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {MAJOR_ACHIEVEMENTS.map(ach => {
                const unlocked = majorUnlocked.includes(ach.id);
                return (
                  <div key={ach.id} className={`rounded-xl p-3 text-center ${unlocked ? 'bg-gradient-to-br from-candy-yellow to-candy-pink shadow' : 'bg-gray-100'}`}>
                    <div className={`text-2xl mb-1 ${unlocked ? '' : 'grayscale opacity-40'}`}>{unlocked ? ach.icon : '🔒'}</div>
                    <p className={`text-xs font-bold ${unlocked ? 'text-white' : 'text-gray-400'}`}>{ach.name}</p>
                    <p className={`text-[10px] ${unlocked ? 'text-white/80' : 'text-gray-300'}`}>{ach.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === 'certificates' && (
        <div className="px-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
              <ScrollText size={18} className="text-candy-purple" /> {t('cert.unlocked')}
            </h3>
            <p className="text-xs text-gray-400 mb-3">{t('cert.desc')}</p>
            {majorUnlocked.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-gray-400 text-sm">{t('cert.none_unlocked')}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {MAJOR_ACHIEVEMENTS.filter(a => majorUnlocked.includes(a.id)).map(ach => (
                  <div key={ach.id} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
                    <span className="text-2xl">{ach.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-700 text-sm">{ach.name}</p>
                      <p className="text-xs text-gray-400">{ach.desc}</p>
                    </div>
                    <button
                      onClick={() => generateCertificate(ach)}
                      className="bg-candy-purple rounded-full px-3 py-1.5 text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition"
                    >
                      <Download size={14} /> {t('cert.download')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {certAchievement && (
            <div className="bg-white rounded-2xl p-4 shadow space-y-3">
              <h3 className="font-bold text-gray-700 text-sm">{t('cert.preview_title')}: {certAchievement.icon} {certAchievement.name}</h3>
              <div className="flex gap-2">
                <button onClick={printCertificate} className="flex-1 bg-candy-blue rounded-xl py-2.5 flex items-center justify-center gap-2 text-white font-bold text-sm active:scale-95 transition">
                  <Printer size={16} /> {t('cert.print')}
                </button>
                <button onClick={shareCertificate} className="flex-1 bg-candy-green rounded-xl py-2.5 flex items-center justify-center gap-2 text-white font-bold text-sm active:scale-95 transition">
                  <Share2 size={16} /> {t('cert.share')}
                </button>
              </div>
            </div>
          )}

          <canvas ref={certCanvasRef} width={1000} height={700} className="hidden" />
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string | number; color: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-3 shadow`}>
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-white/80 text-xs">{label}</p>
      <p className="text-white font-bold text-xl">{value}</p>
    </div>
  );
}

function Shelf({ label, items, icon }: { label: string; items: number; icon: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-amber-100 font-bold text-sm mb-2">{label}</p>
      <div className="bg-amber-700 rounded-t-xl p-2 min-h-[60px] flex flex-wrap gap-2 items-center">
        {items === 0 ? (
          <p className="text-amber-200/50 text-xs italic">{t('ach.empty_shelf')}... 🔒</p>
        ) : (
          Array.from({ length: Math.min(items, 10) }).map((_, i) => (
            <div key={i} className="bg-amber-600 rounded-lg p-1.5 animate-pop" style={{ animationDelay: `${i * 0.05}s` }}>
              {icon}
            </div>
          ))
        )}
        {items > 10 && <span className="text-amber-100 font-bold text-sm">+{items - 10}</span>}
      </div>
      <div className="h-3 bg-amber-600 rounded-b-xl" style={{ background: '#C19A6B' }} />
    </div>
  );
}
