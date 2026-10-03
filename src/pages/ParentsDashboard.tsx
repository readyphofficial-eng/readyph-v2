import { useState, useEffect, useRef } from 'react';
import { Share2, Download, Eye, Award, Star, Medal, Trophy, Flame, BookOpen, Brain, Gamepad2, FileText, Library, Sprout, BarChart3, Clock } from 'lucide-react';
import { getStars, getMedals, getTrophies, getQuizResults, getRecentWatched, getTotalGamePoints, getStreak, lsGet, getStickers, getGameScores } from '@/lib/storage';
import { t } from '@/lib/i18n';

export function ParentsDashboard() {
  const [stats, setStats] = useState({
    videos: 0,
    quizzes: 0,
    avgPct: 0,
    gamePoints: 0,
    stars: 0,
    medals: 0,
    trophies: 0,
    currentStreak: 0,
    longestStreak: 0,
    stickers: 0,
    worksheets: 0,
    textbooks: 0,
    farmLevel: 1,
  });
  const [gameScores, setGameScores] = useState<{ game: string; score: number; date: string }[]>([]);
  const [quizResults, setQuizResults] = useState<number[]>([]);
  const [profile, setProfile] = useState<{ name: string; birthday: string; sex: string; address: string; picture: string; idNumber: string }>({ name: '', birthday: '', sex: '', address: '', picture: '', idNumber: '' });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const recent = getRecentWatched();
    const qr = getQuizResults();
    const streak = getStreak();
    const avg = qr.length > 0 ? Math.round(qr.reduce((a, b) => a + b, 0) / qr.length * 10) : 0;
    const gs = getGameScores();
    const tbProgress = lsGet<Record<string, number>>('textbookProgress', {});
    const tbCompleted = lsGet<Record<string, boolean>>('textbookCompleted', {});
    const farmData = lsGet<{ level?: number }>('readyFarmData', { level: 1 });
    const wsDownloaded = lsGet<string[]>('worksheetsDownloaded', []);
    const childName = lsGet<string>('childName', '');

    setStats({
      videos: recent.length,
      quizzes: qr.length,
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
      farmLevel: farmData.level ?? 1,
    });
    setGameScores(gs.slice(-10).reverse());
    setQuizResults(qr);
    setProfile(lsGet('profile', { name: '', birthday: '', sex: '', address: '', picture: '', idNumber: '' }));
    void childName;
    void tbProgress;
  }, []);

  const generateReport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const name = profile.name || t('ach.child_default');
    const W = 800, H = 1100;

    ctx.fillStyle = '#fff7ed';
    ctx.fillRect(0, 0, W, H);

    // Header
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, '#f97316');
    grad.addColorStop(1, '#ff6b9d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, 130);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 38px Fredoka, sans-serif';
    ctx.fillText('Ready PH', 40, 55);
    ctx.font = '20px Fredoka, sans-serif';
    ctx.fillText(t('parents.report_title'), 40, 90);
    ctx.font = '14px Fredoka, sans-serif';
    ctx.fillText(t('app.tagline'), 40, 115);

    // Child info
    ctx.fillStyle = '#333';
    ctx.font = 'bold 26px Fredoka, sans-serif';
    ctx.fillText(`${t('ach.name_label')}: ${name}`, 40, 185);
    if (profile.idNumber) {
      ctx.font = '18px Fredoka, sans-serif';
      ctx.fillStyle = '#666';
      ctx.fillText(`ID: ${profile.idNumber}`, 40, 215);
    }
    ctx.font = '18px Fredoka, sans-serif';
    ctx.fillStyle = '#666';
    ctx.fillText(`${t('ach.date_label')}: ${new Date().toLocaleDateString()}`, 40, 245);

    // Stats grid
    ctx.fillStyle = '#333';
    ctx.font = 'bold 22px Fredoka, sans-serif';
    ctx.fillText(t('parents.summary'), 40, 295);

    const statRows: [string, string | number][] = [
      [`⭐ ${t('ach.stars')}`, stats.stars],
      [`🏅 ${t('ach.medals')}`, stats.medals],
      [`🏆 ${t('ach.trophies')}`, stats.trophies],
      [`📚 ${t('ach.videos_watched')}`, stats.videos],
      [`📝 ${t('ach.quizzes_taken')}`, stats.quizzes],
      [`📊 ${t('ach.average')}`, `${stats.avgPct}%`],
      [`🎮 ${t('ach.game_points')}`, stats.gamePoints],
      [`🔥 ${t('ach.current_streak')}`, `${stats.currentStreak} ${t('ach.days')}`],
      [`🔥 ${t('ach.longest_streak')}`, `${stats.longestStreak} ${t('ach.days')}`],
      [`📒 ${t('parents.stickers')}`, stats.stickers],
      [`📄 ${t('parents.worksheets')}`, stats.worksheets],
      [`📖 ${t('parents.textbooks')}`, stats.textbooks],
      [`🌾 ${t('parents.farm_level')}`, stats.farmLevel],
    ];

    statRows.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 40 + col * 360;
      const y = 330 + row * 45;
      ctx.fillStyle = '#fff';
      ctx.fillRect(x, y - 25, 340, 38);
      ctx.strokeStyle = '#f0e0d0';
      ctx.strokeRect(x, y - 25, 340, 38);
      ctx.fillStyle = '#555';
      ctx.font = '16px Fredoka, sans-serif';
      ctx.fillText(label, x + 12, y);
      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 18px Fredoka, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(String(value), x + 328, y);
      ctx.textAlign = 'left';
    });

    // Recent activity
    ctx.fillStyle = '#333';
    ctx.font = 'bold 22px Fredoka, sans-serif';
    ctx.fillText(t('parents.recent_activity'), 40, 660);

    ctx.fillStyle = '#555';
    ctx.font = '14px Fredoka, sans-serif';
    if (gameScores.length === 0) {
      ctx.fillText(t('parents.no_activity'), 50, 690);
    } else {
      gameScores.slice(0, 8).forEach((g, i) => {
        const y = 690 + i * 28;
        ctx.fillText(`🎮 ${g.game}: ${g.score} pts — ${new Date(g.date).toLocaleDateString()}`, 50, y);
      });
    }

    // Footer
    ctx.fillStyle = '#6bcb77';
    ctx.fillRect(40, 980, 720, 3);
    ctx.fillStyle = '#999';
    ctx.font = '12px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${t('app.tagline')} — ReadyPH`, W / 2, 1020);
    ctx.fillText(`${t('parents.generated')} ${new Date().toLocaleString()}`, W / 2, 1045);
    ctx.textAlign = 'left';

    const link = document.createElement('a');
    link.download = `readyph-parent-report-${name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareReport = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      if (navigator.share) {
        try {
          await navigator.share({
            files: [new File([blob], `readyph-report-${profile.name || 'child'}.png`, { type: 'image/png' })],
            title: 'Ready PH Parent Report',
            text: t('parents.share_text'),
          });
        } catch {}
      } else {
        const link = document.createElement('a');
        link.download = `readyph-parent-report-${profile.name || 'child'}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    });
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="bg-gradient-to-br from-candy-purple to-candy-blue px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 size={24} /> {t('parents.title')}
        </h1>
        <p className="text-white/80 text-sm">{t('parents.subtitle')}</p>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Child card */}
        <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-candy-blue to-candy-purple flex items-center justify-center overflow-hidden flex-shrink-0">
            {profile.picture ? (
              <img src={profile.picture} alt="Child" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl">👶</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-700 text-sm truncate">{profile.name || t('ach.child_default')}</p>
            {profile.idNumber && <p className="text-xs text-gray-400">{profile.idNumber}</p>}
            <p className="text-xs text-gray-400">{t('parents.overview')}</p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          <StatBox icon={<Star size={18} className="text-yellow-400" />} label={t('ach.stars')} value={stats.stars} />
          <StatBox icon={<Medal size={18} className="text-orange-400" />} label={t('ach.medals')} value={stats.medals} />
          <StatBox icon={<Trophy size={18} className="text-yellow-500" />} label={t('ach.trophies')} value={stats.trophies} />
          <StatBox icon={<BookOpen size={18} className="text-candy-blue" />} label={t('ach.videos_watched')} value={stats.videos} />
          <StatBox icon={<Brain size={18} className="text-candy-pink" />} label={t('ach.quizzes_taken')} value={stats.quizzes} />
          <StatBox icon={<BarChart3 size={18} className="text-candy-green" />} label={t('ach.average_pct')} value={`${stats.avgPct}%`} />
          <StatBox icon={<Gamepad2 size={18} className="text-candy-purple" />} label={t('ach.game_points')} value={stats.gamePoints} />
          <StatBox icon={<Flame size={18} className="text-red-400" />} label={t('ach.current_streak')} value={stats.currentStreak} />
          <StatBox icon={<Clock size={18} className="text-candy-mint" />} label={t('ach.longest_streak')} value={stats.longestStreak} />
        </div>

        {/* Extra stats */}
        <div className="grid grid-cols-2 gap-2">
          <ExtraStat icon={<FileText size={16} className="text-candy-green" />} label={t('parents.worksheets')} value={stats.worksheets} />
          <ExtraStat icon={<Library size={16} className="text-candy-purple" />} label={t('parents.textbooks')} value={stats.textbooks} />
          <ExtraStat icon={<span className="text-base">📒</span>} label={t('parents.stickers')} value={stats.stickers} />
          <ExtraStat icon={<Sprout size={16} className="text-green-500" />} label={t('parents.farm_level')} value={stats.farmLevel} />
        </div>

        {/* Recent quiz scores chart */}
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
            <Brain size={16} className="text-candy-pink" /> {t('parents.quiz_history')}
          </h3>
          {quizResults.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">{t('parents.no_quizzes')}</p>
          ) : (
            <div className="flex items-end gap-1 h-24">
              {quizResults.slice(-15).map((score, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-candy-pink to-candy-purple"
                    style={{ height: `${Math.max(score * 10, 4)}%` }}
                  />
                  <span className="text-[8px] text-gray-400 mt-0.5">{score * 10}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent game scores */}
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
            <Gamepad2 size={16} className="text-candy-purple" /> {t('parents.recent_games')}
          </h3>
          {gameScores.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">{t('parents.no_games')}</p>
          ) : (
            <div className="space-y-1.5">
              {gameScores.slice(0, 5).map((g, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                  <span className="text-xs font-bold text-gray-600">{g.game}</span>
                  <span className="text-xs text-gray-400">{new Date(g.date).toLocaleDateString()}</span>
                  <span className="text-xs font-bold text-candy-purple">{g.score} pts</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={generateReport}
            className="flex-1 bg-gradient-to-r from-candy-blue to-candy-purple rounded-2xl py-3 flex items-center justify-center gap-2 shadow active:scale-95 transition"
          >
            <Download size={20} className="text-white" />
            <span className="text-white font-bold text-sm">{t('parents.download_report')}</span>
          </button>
          <button
            onClick={shareReport}
            className="flex-1 bg-gradient-to-r from-candy-green to-candy-mint rounded-2xl py-3 flex items-center justify-center gap-2 shadow active:scale-95 transition"
          >
            <Share2 size={20} className="text-white" />
            <span className="text-white font-bold text-sm">{t('parents.share_report')}</span>
          </button>
        </div>

        <canvas ref={canvasRef} width={800} height={1100} className="hidden" />
      </div>
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-gray-400 text-[10px]">{label}</p>
      <p className="font-bold text-gray-700 text-lg">{value}</p>
    </div>
  );
}

function ExtraStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow flex items-center gap-2">
      {icon}
      <div className="flex-1">
        <p className="text-gray-400 text-[10px]">{label}</p>
        <p className="font-bold text-gray-700 text-sm">{value}</p>
      </div>
    </div>
  );
}
