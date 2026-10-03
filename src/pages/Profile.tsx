import { useState, useEffect } from 'react';
import { User, Save, Camera, Crown } from 'lucide-react';
import { lsGet, lsSet, generateIdNumber, isOwner } from '@/lib/storage';
import type { Profile } from '@/types';
import { t } from '@/lib/i18n';

export function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(() => lsGet<Profile>('profile', {
    name: '', birthday: '', sex: '', address: '', picture: '', idNumber: '',
  }));
  const [saved, setSaved] = useState(false);
  const [ownerMode, setOwnerMode] = useState(false);

  useEffect(() => {
    if (!profile.idNumber) {
      setProfile(p => ({ ...p, idNumber: generateIdNumber() }));
    }
    setOwnerMode(isOwner());
  }, []);

  const handleSave = () => {
    if (profile.name.trim().toUpperCase() === 'OWNER JAYDEN') {
      localStorage.setItem('isOwner', 'true');
      setOwnerMode(true);
    } else {
      localStorage.setItem('isOwner', 'false');
      setOwnerMode(false);
    }
    lsSet('profile', profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile(p => ({ ...p, picture: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="bg-gradient-to-br from-candy-blue to-candy-mint px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white">🪪 {t('profile.title')}</h1>
        <p className="text-white/80 text-sm">{t('profile.subtitle')}</p>
      </div>

      <div className="px-4 mt-4">
        {ownerMode && (
          <div className="bg-gradient-to-r from-candy-yellow to-candy-pink rounded-2xl p-3 mb-4 flex items-center gap-2 animate-pop">
            <Crown size={20} className="text-white" />
            <span className="text-white font-bold text-sm">OWNER MODE ACTIVE</span>
          </div>
        )}

        {/* ID Card */}
        <div className="bg-gradient-to-br from-candy-blue via-candy-purple to-candy-pink rounded-3xl p-5 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/70 text-xs">READY PH ID</p>
              <p className="text-white font-bold text-sm">{profile.idNumber || 'READY-2025-XXX'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-full px-2 py-1">
              <span className="text-white text-xs font-bold">KINDER</span>
            </div>
          </div>

          {/* Picture */}
          <div className="flex justify-center mb-4">
            <label className="relative w-28 h-28 bg-white/30 backdrop-blur rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden border-4 border-white/50">
              {profile.picture ? (
                <img src={profile.picture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <Camera size={24} className="text-white mx-auto" />
                  <span className="text-white text-xs">{t('profile.add_photo')}</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePicture} className="hidden" />
            </label>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            <Field label={t('profile.name')}>
              <input
                value={profile.name}
                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                placeholder={t('profile.name_placeholder')}
                className="w-full bg-white/20 backdrop-blur rounded-xl px-3 py-2 text-white placeholder-white/50 outline-none"
              />
            </Field>
            <Field label={t('profile.birthday')}>
              <input
                type="date"
                value={profile.birthday}
                onChange={e => setProfile(p => ({ ...p, birthday: e.target.value }))}
                className="w-full bg-white/20 backdrop-blur rounded-xl px-3 py-2 text-white outline-none"
              />
            </Field>
            <Field label={t('profile.sex')}>
              <div className="flex gap-2">
                {['Boy', 'Girl', 'Other'].map(s => (
                  <button
                    key={s}
                    onClick={() => setProfile(p => ({ ...p, sex: s }))}
                    className={`flex-1 rounded-xl py-2 text-sm font-bold transition ${profile.sex === s ? 'bg-white text-candy-purple' : 'bg-white/20 text-white'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={t('profile.address')}>
              <input
                value={profile.address}
                onChange={e => setProfile(p => ({ ...p, address: e.target.value }))}
                placeholder={t('profile.address_placeholder')}
                className="w-full bg-white/20 backdrop-blur rounded-xl px-3 py-2 text-white placeholder-white/50 outline-none"
              />
            </Field>
          </div>

          {/* QR Placeholder */}
          <div className="flex justify-center mt-4">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
              <div className="grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-4 bg-gradient-to-r from-candy-green to-candy-mint rounded-2xl py-3 flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
        >
          <Save size={20} className="text-white" />
          <span className="text-white font-bold">{saved ? t('profile.saved') + ' ✓' : t('profile.save')}</span>
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-white/70 text-xs mb-1">{label}</p>
      {children}
    </div>
  );
}
