import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Globe, Palette, Clock, Download, Upload, Trash2, Check } from 'lucide-react';
import { lsRaw, lsRawSet, backupData, restoreData } from '@/lib/storage';
import { THEMES, getTheme, applyTheme } from '@/lib/themes';
import { getLang, setLang, t } from '@/lib/i18n';

export function SettingsPage() {
  const [lang, setLangState] = useState(getLang());
  const [themeId, setThemeId] = useState(getTheme());
  const [screenLimit, setScreenLimit] = useState(() => lsRaw('screenTimeLimit', '0'));
  const [savedMsg, setSavedMsg] = useState('');
  const [clearConfirm, setClearConfirm] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState('');

  useEffect(() => {
    applyTheme(themeId);
  }, [themeId]);

  const flash = (msg: string) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'tl' : 'en';
    setLang(next);
    setLangState(next);
    flash(t('settings.saved'));
    setTimeout(() => window.location.reload(), 300);
  };

  const handleTheme = (id: string) => {
    setThemeId(id);
    applyTheme(id);
    flash(t('settings.saved'));
  };

  const handleScreenLimit = (mins: string) => {
    setScreenLimit(mins);
    lsRawSet('screenTimeLimit', mins);
    flash(t('settings.saved'));
  };

  const handleBackup = () => {
    backupData();
    flash(t('settings.saved'));
  };

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await restoreData(file);
      setRestoreMsg(t('settings.saved'));
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      setRestoreMsg('Error!');
      setTimeout(() => setRestoreMsg(''), 2000);
    }
  };

  const clearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="bg-gradient-to-br from-gray-400 to-gray-500 px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><SettingsIcon size={24} /> {t('settings.title')}</h1>
        <p className="text-white/80 text-sm">{t('settings.subtitle')}</p>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {savedMsg && <div className="bg-green-100 rounded-xl p-2 text-center text-green-600 font-bold text-sm animate-pop">{savedMsg}</div>}
        {restoreMsg && <div className="bg-blue-100 rounded-xl p-2 text-center text-blue-600 font-bold text-sm animate-pop">{restoreMsg}</div>}

        {/* Language */}
        <div className="bg-white rounded-2xl p-4 shadow space-y-3">
          <div className="flex items-center gap-2">
            <Globe size={20} className="text-blue-500" />
            <h3 className="font-bold text-gray-700 text-sm">{t('settings.language')}</h3>
          </div>
          <div className="flex gap-2">
            <button onClick={() => lang !== 'en' && toggleLang()} className={`flex-1 rounded-xl py-2.5 font-bold text-sm transition ${lang === 'en' ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 text-gray-500'}`}>
              English
            </button>
            <button onClick={() => lang !== 'tl' && toggleLang()} className={`flex-1 rounded-xl py-2.5 font-bold text-sm transition ${lang === 'tl' ? 'bg-candy-pink text-white shadow' : 'bg-gray-100 text-gray-500'}`}>
              Tagalog
            </button>
          </div>
        </div>

        {/* Themes */}
        <div className="bg-white rounded-2xl p-4 shadow space-y-3">
          <div className="flex items-center gap-2">
            <Palette size={20} className="text-candy-purple" />
            <h3 className="font-bold text-gray-700 text-sm">{t('settings.themes')}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => handleTheme(theme.id)}
                className={`rounded-2xl p-3 text-left transition active:scale-95 ${themeId === theme.id ? 'ring-2 ring-candy-pink shadow-lg' : 'shadow border border-gray-100'}`}
                style={{ background: theme.vars['--bg'], color: theme.vars['--text'] }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{theme.emoji}</span>
                  <span className="font-bold text-xs">{theme.name}</span>
                  {themeId === theme.id && <Check size={14} className="ml-auto text-candy-pink" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Screen Time */}
        <div className="bg-white rounded-2xl p-4 shadow space-y-3">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-candy-green" />
            <h3 className="font-bold text-gray-700 text-sm">{t('settings.screen_time')}</h3>
          </div>
          <div className="flex gap-2">
            {[
              { v: '0', label: t('settings.no_limit') },
              { v: '15', label: '15 ' + t('settings.mins') },
              { v: '30', label: '30 ' + t('settings.mins') },
              { v: '60', label: '60 ' + t('settings.mins') },
            ].map(opt => (
              <button
                key={opt.v}
                onClick={() => handleScreenLimit(opt.v)}
                className={`flex-1 rounded-xl py-2 font-bold text-xs transition ${screenLimit === opt.v ? 'bg-candy-green text-white shadow' : 'bg-gray-100 text-gray-500'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Backup / Restore */}
        <div className="bg-white rounded-2xl p-4 shadow space-y-3">
          <h3 className="font-bold text-gray-700 text-sm">{t('settings.backup')}</h3>
          <button onClick={handleBackup} className="w-full bg-gradient-to-r from-candy-blue to-candy-mint rounded-xl py-2.5 flex items-center justify-center gap-2 font-bold text-white text-sm active:scale-95 transition">
            <Download size={18} /> {t('settings.download_backup')}
          </button>
          <label className="w-full bg-gradient-to-r from-candy-purple to-candy-blue rounded-xl py-2.5 flex items-center justify-center gap-2 font-bold text-white text-sm cursor-pointer active:scale-95 transition">
            <Upload size={18} /> {t('settings.restore')}
            <input type="file" accept=".json" onChange={handleRestore} className="hidden" />
          </label>
        </div>

        {/* Clear Data */}
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-2"><Trash2 size={16} className="text-red-400" /> {t('settings.clear_data')}</h3>
          {!clearConfirm ? (
            <button onClick={() => setClearConfirm(true)} className="w-full bg-red-100 rounded-xl py-2 font-bold text-red-500 text-sm">{t('settings.clear_data')}</button>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-red-500 text-center">{t('settings.clear_confirm')}</p>
              <div className="flex gap-2">
                <button onClick={() => setClearConfirm(false)} className="flex-1 bg-gray-200 rounded-xl py-2 font-bold text-gray-500 text-sm">{t('home.cancel')}</button>
                <button onClick={clearData} className="flex-1 bg-red-500 rounded-xl py-2 font-bold text-white text-sm">{t('settings.yes_clear')}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
