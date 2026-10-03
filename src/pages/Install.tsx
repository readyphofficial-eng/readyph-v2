import { useState, useEffect } from 'react';
import { Download, Smartphone, Monitor, Check, Share2, Wifi, WifiOff } from 'lucide-react';
import { promptInstall, canInstall, isInstalled, isStandalone } from '@/lib/pwa';
import { t } from '@/lib/i18n';

export function InstallPage() {
  const [installable, setInstallable] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    setInstallable(canInstall());
    setInstalled(isInstalled());
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const handleInstall = () => {
    promptInstall();
    setInstallable(false);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Ready PH', text: t('install.share_text'), url });
      } catch {}
    } else {
      navigator.clipboard?.writeText(url);
    }
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="bg-gradient-to-br from-candy-blue to-candy-purple px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Download size={24} /> {t('install.title')}
        </h1>
        <p className="text-white/80 text-sm">{t('install.subtitle')}</p>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Status badge */}
        <div className={`rounded-2xl p-4 shadow flex items-center gap-3 ${installed ? 'bg-green-50' : 'bg-white'}`}>
          {installed ? (
            <>
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={24} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-green-700 text-sm">{t('install.installed_title')}</p>
                <p className="text-green-600 text-xs">{t('install.installed_desc')}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-candy-blue flex items-center justify-center">
                <Download size={24} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-700 text-sm">{t('install.not_installed_title')}</p>
                <p className="text-gray-400 text-xs">{t('install.not_installed_desc')}</p>
              </div>
            </>
          )}
        </div>

        {/* Online/Offline indicator */}
        <div className={`rounded-2xl p-4 shadow flex items-center gap-3 ${online ? 'bg-white' : 'bg-amber-50'}`}>
          {online ? (
            <>
              <div className="w-12 h-12 rounded-full bg-candy-green flex items-center justify-center">
                <Wifi size={24} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-700 text-sm">{t('install.online')}</p>
                <p className="text-gray-400 text-xs">{t('install.online_desc')}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                <WifiOff size={24} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-amber-700 text-sm">{t('install.offline')}</p>
                <p className="text-amber-600 text-xs">{t('install.offline_desc')}</p>
              </div>
            </>
          )}
        </div>

        {/* Install button or instructions */}
        {installed ? (
          <div className="bg-gradient-to-br from-candy-green to-candy-mint rounded-2xl p-5 shadow-lg text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-white font-bold">{t('install.already_installed')}</p>
            <p className="text-white/80 text-xs mt-1">{t('install.already_installed_desc')}</p>
          </div>
        ) : installable ? (
          <button
            onClick={handleInstall}
            className="w-full bg-gradient-to-r from-candy-blue to-candy-purple rounded-2xl py-4 flex items-center justify-center gap-3 shadow-lg active:scale-95 transition"
          >
            <Download size={24} className="text-white" />
            <span className="text-white font-bold text-lg">{t('install.btn')}</span>
          </button>
        ) : (
          <div className="bg-white rounded-2xl p-5 shadow space-y-4">
            <div>
              <p className="font-bold text-gray-700 text-sm flex items-center gap-2 mb-2">
                <Smartphone size={18} className="text-candy-blue" /> {t('install.phone_title')}
              </p>
              <ol className="text-xs text-gray-500 space-y-1.5 list-decimal list-inside">
                <li>{t('install.phone_step1')}</li>
                <li>{t('install.phone_step2')}</li>
                <li>{t('install.phone_step3')}</li>
              </ol>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="font-bold text-gray-700 text-sm flex items-center gap-2 mb-2">
                <Monitor size={18} className="text-candy-purple" /> {t('install.pc_title')}
              </p>
              <ol className="text-xs text-gray-500 space-y-1.5 list-decimal list-inside">
                <li>{t('install.pc_step1')}</li>
                <li>{t('install.pc_step2')}</li>
                <li>{t('install.pc_step3')}</li>
              </ol>
            </div>
          </div>
        )}

        {/* Share app */}
        <button
          onClick={handleShare}
          className="w-full bg-white rounded-2xl py-3 flex items-center justify-center gap-2 shadow active:scale-95 transition"
        >
          <Share2 size={20} className="text-candy-pink" />
          <span className="text-gray-700 font-bold text-sm">{t('install.share')}</span>
        </button>

        {/* Features list */}
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-bold text-gray-700 text-sm mb-3">{t('install.features_title')}</h3>
          <div className="space-y-2">
            {[
              { icon: '📲', text: t('install.feat1') },
              { icon: '📴', text: t('install.feat2') },
              { icon: '⚡', text: t('install.feat3') },
              { icon: '🏠', text: t('install.feat4') },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                <span className="text-xl">{f.icon}</span>
                <span className="text-xs text-gray-600">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
