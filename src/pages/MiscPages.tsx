import { useState, useEffect, useMemo } from 'react';
import { Heart, Copy, Check, Send, Trash2, MessageSquare, Crown, Plus, Download, Youtube, Image as ImageIcon, Handshake, ShoppingBasket, X, Search, MapPin, Package, CreditCard, TimerReset, ShoppingCart, ArrowRight } from 'lucide-react';
import { lsGet, lsSet, lsRaw, lsRawSet, isOwner, addAdminLog, getAdminLogs, getShopItems, setShopItems as persistShopItems, getPartners, setPartners as persistPartners, MAX_PARTNERS, getAppLogo, clearAppLogo, setAppLogo, getShopFavorites, toggleShopFavorite, incrementShopClicks, getShopClicks } from '@/lib/storage';
import { saveAppConfigToCloud, savePartnersToCloud, saveShopItemsToCloud, saveManualVideosToCloud, saveSupportMediaToCloud, saveDevMessageToCloud, deleteDevMessageFromCloud, clearSponsoredFromCloud } from '@/lib/sync';
import { t } from '@/lib/i18n';
import type { VideoCategory, ShopItem, Partner } from '@/types';

function fileToResizedDataUrl(file: File, maxSize = 800, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read error'));
    reader.onload = () => {
      const original = reader.result as string;
      const img = new Image();
      img.onerror = () => resolve(original);
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(original);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = original;
    };
    reader.readAsDataURL(file);
  });
}

export function Support() {
  const [media, setMedia] = useState<string[]>(() => lsGet<string[]>('supportMedia', []));

  useEffect(() => {
    const handler = () => setMedia(lsGet<string[]>('supportMedia', []));
    window.addEventListener('cloudSynced', handler);
    return () => window.removeEventListener('cloudSynced', handler);
  }, []);

  return (
    <div className="min-h-screen pb-28">
      <div className="bg-gradient-to-br from-candy-pink to-red-400 px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Heart size={24} /> {t('support.title')}</h1>
        <p className="text-white/80 text-sm">{t('support.subtitle')}</p>
      </div>
      <div className="px-4 mt-4 space-y-4">
        {media.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <ImageIcon size={48} className="text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">{t('support.placeholder')}</p>
          </div>
        ) : (
          media.map((img, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 shadow overflow-hidden">
              <img src={img} alt="Support" className="w-full rounded-xl" />
            </div>
          ))
        )}
        <div className="bg-gradient-to-br from-candy-pink/20 to-red-400/20 rounded-2xl p-4 text-center">
          <p className="text-gray-600 font-bold text-sm">{t('support.thank_you')}</p>
        </div>
      </div>
    </div>
  );
}

export function PartnersRow({ compact = false }: { compact?: boolean }) {
  const [partners, setPartners] = useState(() => getPartners());
  useEffect(() => {
    const handler = () => setPartners(getPartners());
    window.addEventListener('cloudSynced', handler);
    return () => window.removeEventListener('cloudSynced', handler);
  }, []);
  if (partners.length === 0) return null;
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="flex items-center gap-2 mb-3">
        <Handshake size={18} className="text-candy-purple" />
        <p className="font-bold text-gray-700 text-sm">🤝 {t('partners.title')}</p>
      </div>
      <div className={`flex gap-2.5 overflow-x-auto no-scrollbar ${compact ? 'pb-1' : 'pb-1'}`}>
        {partners.map((p, i) => (
          <div key={i} className="flex-shrink-0 min-w-[80px] bg-gray-50 rounded-2xl p-2 flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
              {p.logoImg ? <img src={p.logoImg} alt={p.name} className="w-full h-full object-cover" /> : <span className="text-xl">{p.logo || '🤝'}</span>}
            </div>
            <p className="text-[11px] font-bold text-gray-600 text-center leading-tight max-w-[76px] truncate">{p.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  const [partners, setPartners] = useState(() => getPartners());
  useEffect(() => {
    const handler = () => setPartners(getPartners());
    window.addEventListener('cloudSynced', handler);
    return () => window.removeEventListener('cloudSynced', handler);
  }, []);
  return (
    <div className="min-h-screen pb-28">
      <div className="bg-gradient-to-br from-candy-purple to-candy-blue px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Handshake size={24} /> 🤝 {t('partners.title')}</h1>
        <p className="text-white/80 text-sm">{t('partners.subtitle')}</p>
      </div>
      <div className="px-4 mt-4">
        {partners.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <Handshake size={40} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">{t('partners.empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {partners.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow flex flex-col items-center gap-2 animate-pop" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="w-14 h-14 rounded-full bg-gray-50 shadow flex items-center justify-center overflow-hidden">
                  {p.logoImg ? <img src={p.logoImg} alt={p.name} className="w-full h-full object-cover" /> : <span className="text-2xl">{p.logo || '🤝'}</span>}
                </div>
                <p className="text-xs font-bold text-gray-600 text-center leading-tight">{p.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function normalizeImages(item: ShopItem): string[] {
  return Array.isArray(item.images) && item.images.length > 0
    ? item.images
    : item.logoImg
      ? [item.logoImg]
      : [];
}

function ShopCard({ item, isFav, onFavToggle, onBuy }: { item: ShopItem; isFav: boolean; onFavToggle: () => void; onBuy: () => void }) {
  const images = normalizeImages(item);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [item.id]);

  return (
    <article className="bg-white rounded-3xl p-4 shadow-lg border border-gray-100 animate-pop overflow-hidden">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow flex items-center justify-center overflow-hidden flex-shrink-0">
          {images[index] ? <img src={images[index]} alt={item.title} className="w-full h-full object-cover" /> : <span className="text-2xl">{item.logo || '🛒'}</span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-gray-800 text-sm truncate">{item.title}</p>
            {item.subDesc && <span className="shrink-0 rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-700">{item.subDesc}</span>}
          </div>
          <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-400">
            <MapPin size={12} />
            <span>{item.category || t('shop.category_general')}</span>
          </div>
        </div>
        <button onClick={onFavToggle} className="shrink-0 rounded-full p-2 bg-gray-100 active:scale-95 transition" aria-label={isFav ? t('shop.unfavorite') : t('shop.favorite')}>
          <Heart size={16} className={isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      {images.length > 1 && (
        <div className="mt-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {images.map((img, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 ${index === i ? 'border-candy-green' : 'border-transparent'}`}>
                <img src={img} alt={`${item.title} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
        <div className="rounded-2xl bg-candy-green/10 px-3 py-2 text-center">
          <Package size={14} className="mx-auto text-candy-green mb-1" />
          <p className="text-[10px] font-bold text-gray-500 uppercase">{t('shop.top_sellers')}</p>
          <p className="text-xs font-bold text-gray-700">{item.clicks}</p>
        </div>
        <div className="rounded-2xl bg-candy-blue/10 px-3 py-2 text-center">
          <CreditCard size={14} className="mx-auto text-candy-blue mb-1" />
          <p className="text-[10px] font-bold text-gray-500 uppercase">{t('shop.images')}</p>
          <p className="text-xs font-bold text-gray-700">{images.length}</p>
        </div>
        <div className="rounded-2xl bg-candy-pink/10 px-3 py-2 text-center">
          <TimerReset size={14} className="mx-auto text-candy-pink mb-1" />
          <p className="text-[10px] font-bold text-gray-500 uppercase">{t('shop.clicks')}</p>
          <p className="text-xs font-bold text-gray-700">{getShopClicks(item.id)}</p>
        </div>
      </div>

      <button
        onClick={onBuy}
        className="w-full bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-3 font-bold text-white shadow active:scale-95 transition flex items-center justify-center gap-2"
      >
        <ShoppingCart size={16} /> {t('shop.buy_full')}
        <ArrowRight size={16} />
      </button>
    </article>
  );
}

export function Shop() {
  const [shopItems, setShopItems] = useState<ShopItem[]>(() => getShopItems());
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState(() => getShopFavorites());

  useEffect(() => {
    const handler = () => {
      setShopItems(getShopItems());
      setFavorites(getShopFavorites());
    };
    window.addEventListener('cloudSynced', handler);
    return () => window.removeEventListener('cloudSynced', handler);
  }, []);

  const categoryOptions = useMemo(() => {
    const cats = Array.from(new Set(shopItems.map(item => item.category || t('shop.category_general')).filter(Boolean)));
    return ['all', ...cats];
  }, [shopItems]);

  const topSellers = useMemo(() => [...shopItems].sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0)).slice(0, 3), [shopItems]);

  const filteredItems = shopItems.filter(item => {
    const q = query.trim().toLowerCase();
    const haystack = [item.title, item.desc, item.subDesc, item.category].join(' ').toLowerCase();
    const matchesQuery = !q || haystack.includes(q);
    const matchesCategory = activeCategory === 'all' || (item.category || t('shop.category_general')) === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const toggleFav = (id: string) => {
    setFavorites(toggleShopFavorite(id));
  };

  const handleBuy = (item: ShopItem) => {
    const nextClicks = (item.clicks ?? 0) + 1;
    const updated = shopItems.map(cur => cur.id === item.id ? { ...cur, clicks: nextClicks } : cur);
    setShopItems(updated);
    persistShopItems(updated);
    saveShopItemsToCloud(updated);
    incrementShopClicks(item.id);
    window.open(item.link, '_blank');
  };

  const tabs = ['all', ...categoryOptions.filter(cat => cat !== 'all')];
  const favoriteItems = filteredItems.filter(item => favorites.includes(item.id));
  const displayItems = activeCategory === t('shop.favorites') ? favoriteItems : filteredItems;

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-br from-candy-green to-candy-mint px-5 pt-10 pb-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="relative">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><ShoppingBasket size={24} /> 🛒 {t('shop.title')}</h1>
          <p className="text-white/80 text-sm mt-1">{t('shop.subtitle')}</p>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        <PartnersRow />

        <div className="bg-white rounded-2xl p-3 shadow space-y-3">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t('shop.search')} className="w-full bg-gray-100 rounded-full pl-12 pr-4 py-3 text-sm outline-none" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeCategory === tab ? 'bg-candy-green text-white shadow' : 'bg-gray-100 text-gray-500'}`}
              >
                {tab === 'all' ? t('shop.category_all') : tab}
              </button>
            ))}
            <button
              onClick={() => setActiveCategory(t('shop.favorites'))}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeCategory === t('shop.favorites') ? 'bg-candy-pink text-white shadow' : 'bg-gray-100 text-gray-500'}`}
            >
              {t('shop.favorites')}
            </button>
          </div>
        </div>

        {topSellers.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow space-y-3">
            <p className="font-black text-gray-700">🏆 {t('shop.top_sellers')}</p>
            <div className="grid gap-2">
              {topSellers.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shadow flex-shrink-0">
                    {normalizeImages(item)[0] ? <img src={normalizeImages(item)[0]} alt={item.title} className="w-full h-full object-cover" /> : <span className="flex items-center justify-center h-full">{item.logo || '🛒'}</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm truncate">{item.title}</p>
                    <p className="text-[11px] text-gray-500 truncate">{item.category || t('shop.category_general')}</p>
                  </div>
                  <span className="text-xs font-bold text-candy-green">{item.clicks}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {shopItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <ShoppingBasket size={40} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">{t('shop.empty')}</p>
          </div>
        ) : displayItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <Search size={40} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">{t('shop.no_match')}</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {displayItems.map((item) => (
              <ShopCard
                key={item.id}
                item={item}
                isFav={favorites.includes(item.id)}
                onFavToggle={() => toggleFav(item.id)}
                onBuy={() => handleBuy(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function MessageDev() {
  const [name, setName] = useState(() => lsGet<{ name: string }>('profile', { name: '' }).name);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [messages, setMessages] = useState(() => lsGet<{ name: string; message: string; date: string }[]>('devMessages', []));

  useEffect(() => {
    const handler = () => setMessages(lsGet<{ name: string; message: string; date: string }[]>('devMessages', []));
    window.addEventListener('cloudSynced', handler);
    return () => window.removeEventListener('cloudSynced', handler);
  }, []);

  const send = () => {
    if (!message.trim()) return;
    const msg = { name: name || 'Anonymous', message, date: new Date().toISOString() };
    const all = [...messages, msg];
    lsSet('devMessages', all);
    setMessages(all);
    saveDevMessageToCloud(msg);
    setMessage('');
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  const deleteMsg = (idx: number) => {
    const all = messages.filter((_, i) => i !== idx);
    lsSet('devMessages', all);
    setMessages(all);
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="bg-gradient-to-br from-candy-purple to-candy-blue px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><MessageSquare size={24} /> {t('msg.title')}</h1>
        <p className="text-white/80 text-sm">{t('msg.subtitle')}</p>
      </div>
      <div className="px-4 mt-4 space-y-3">
        <div className="bg-white rounded-2xl p-4 shadow space-y-3">
          <div>
            <label className="text-xs text-gray-500 font-bold">{t('msg.name')}</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder={t('msg.name_placeholder')} className="w-full bg-gray-100 rounded-xl px-3 py-2 mt-1 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-bold">{t('msg.message')}</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder={t('msg.message_placeholder')} rows={4} className="w-full bg-gray-100 rounded-xl px-3 py-2 mt-1 outline-none resize-none" />
          </div>
          <button onClick={send} className="w-full bg-gradient-to-r from-candy-purple to-candy-blue rounded-2xl py-3 flex items-center justify-center gap-2 active:scale-95 transition">
            {sent ? <Check size={20} className="text-white" /> : <Send size={20} className="text-white" />}
            <span className="text-white font-bold">{sent ? t('msg.sent') + ' ✓' : t('msg.send')}</span>
          </button>
        </div>

        {sent && (
          <div className="bg-green-100 rounded-2xl p-4 text-center animate-pop">
            <p className="text-green-600 font-bold">{t('msg.thank_you_popup')} 🎉</p>
          </div>
        )}

        {isOwner() && messages.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-bold text-gray-600 text-sm mb-2">📥 {t('owner.s7_title')}</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-2 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-600">{m.name}</span>
                    <button onClick={() => deleteMsg(i)}><Trash2 size={14} className="text-red-400" /></button>
                  </div>
                  <p className="text-gray-500 mt-1">{m.message}</p>
                  <p className="text-gray-300 mt-1">{new Date(m.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ManualVideo {
  title: string;
  url: string;
  category: string;
  description: string;
  date: string;
}

export function OwnerDashboard() {
  if (!isOwner()) {
    alert(t('owner.only'));
    return null;
  }
  return <OwnerDashboardContent />;
}

function OwnerDashboardContent() {
  const [savedMsg, setSavedMsg] = useState('');
  const [channelName, setChannelName] = useState(() => lsRaw('ytChannelName', ''));
  const [channelId, setChannelId] = useState(() => lsRaw('ytChannelId', ''));

  const [manualVideos, setManualVideos] = useState<ManualVideo[]>(() => lsGet<ManualVideo[]>('manualVideos', []));
  const [mvTitle, setMvTitle] = useState('');
  const [mvUrl, setMvUrl] = useState('');
  const [mvCategory, setMvCategory] = useState('Letters');
  const [mvDesc, setMvDesc] = useState('');

  const [sponsoredBrand, setSponsoredBrand] = useState(() => lsGet<{ brand?: string }>('sponsoredLesson', {}).brand ?? '');
  const [sponsoredTitle, setSponsoredTitle] = useState(() => lsGet<{ title?: string }>('sponsoredLesson', {}).title ?? '');
  const [sponsoredUrl, setSponsoredUrl] = useState(() => lsGet<{ url?: string }>('sponsoredLesson', {}).url ?? '');

  const [quizText, setQuizText] = useState('');
  const [quizKey, setQuizKey] = useState('');

  const [shopItems, setShopItems] = useState<ShopItem[]>(() => getShopItems());
  const [sLogo, setSLogo] = useState('');
  const [sTitle, setSTitle] = useState('');
  const [sDesc, setSDesc] = useState('');
  const [sSubDesc, setSSubDesc] = useState('');
  const [sLink, setSLink] = useState('');
  const [sCategory, setSCategory] = useState('General');
  const [sImages, setSImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [partners, setPartners] = useState<Partner[]>(() => getPartners());
  const [pName, setPName] = useState('');
  const [pLogo, setPLogo] = useState('');
  const [pLogoImg, setPLogoImg] = useState('');

  const [supportMedia, setSupportMedia] = useState<string[]>(() => lsGet<string[]>('supportMedia', []));
  const [devMessages, setDevMessages] = useState(() => lsGet<{ name: string; message: string; date: string }[]>('devMessages', []));
  const [logs, setLogs] = useState(() => getAdminLogs());
  const [appLogo, setAppLogoState] = useState(() => getAppLogo());

  const flash = (msg: string) => {
    setSavedMsg(msg);
    addAdminLog(msg);
    setLogs(getAdminLogs());
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const uploadAppLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAppLogo(reader.result as string);
      setAppLogoState(reader.result as string);
      window.dispatchEvent(new Event('appLogoChanged'));
      saveAppConfigToCloud({ logo: reader.result as string });
      flash(t('owner.saved'));
    };
    reader.readAsDataURL(file);
  };

  const removeAppLogo = () => {
    clearAppLogo();
    setAppLogoState('');
    window.dispatchEvent(new Event('appLogoChanged'));
    saveAppConfigToCloud({ logo: '' });
    flash(t('owner.deleted'));
  };

  const saveChannel = () => {
    lsRawSet('ytChannelName', channelName);
    lsRawSet('ytChannelId', channelId);
    saveAppConfigToCloud({ yt_channel_name: channelName, yt_channel_id: channelId });
    flash(t('owner.saved'));
  };

  const uploadMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const all = [...supportMedia, reader.result as string];
      lsSet('supportMedia', all);
      setSupportMedia(all);
      saveSupportMediaToCloud(all);
      flash(t('owner.added'));
    };
    reader.readAsDataURL(file);
  };

  const deleteMedia = (idx: number) => {
    const all = supportMedia.filter((_, i) => i !== idx);
    lsSet('supportMedia', all);
    setSupportMedia(all);
    saveSupportMediaToCloud(all);
    flash(t('owner.deleted'));
  };

  // Shop album: multiple photos, first photo = cover
  const uploadShopAlbum = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length === 0) return;
    setUploading(true);
    try {
      const results = await Promise.all(files.map(file => fileToResizedDataUrl(file)));
      setSImages(prev => [...prev, ...results]);
    } catch {
      alert('Hindi ma-upload ang isa o higit pang photo. Subukan ulit.');
    } finally {
      setUploading(false);
    }
  };

  const removeAlbumPhoto = (idx: number) => {
    setSImages(prev => prev.filter((_, i) => i !== idx));
  };

  const makeCover = (idx: number) => {
    setSImages(prev => {
      if (idx === 0) return prev;
      const next = [...prev];
      const [picked] = next.splice(idx, 1);
      return [picked, ...next];
    });
  };

  const addShopItem = () => {
    if (!sTitle.trim() || !sLink.trim()) return;
    const item: ShopItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      logo: sLogo || '🛒',
      logoImg: sImages[0] ?? '',
      title: sTitle,
      desc: sDesc,
      subDesc: sSubDesc,
      link: sLink,
      category: sCategory || 'General',
      images: sImages,
      clicks: 0,
    };
    const all = [...shopItems, item];
    persistShopItems(all);
    setShopItems(all);
    saveShopItemsToCloud(all);
    setSLogo(''); setSTitle(''); setSDesc(''); setSSubDesc(''); setSLink(''); setSCategory('General'); setSImages([]);
    flash(t('owner.added'));
  };

  const deleteShopItem = (idx: number) => {
    const all = shopItems.filter((_, i) => i !== idx);
    persistShopItems(all);
    setShopItems(all);
    saveShopItemsToCloud(all);
    flash(t('owner.deleted'));
  };

  const uploadPartnerLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPLogoImg(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addPartner = () => {
    if (!pName.trim()) return;
    if (partners.length >= MAX_PARTNERS) {
      alert(t('partners.max'));
      return;
    }
    const all = [...partners, { name: pName, logo: pLogo || '🤝', logoImg: pLogoImg }];
    persistPartners(all);
    setPartners(all);
    savePartnersToCloud(all);
    setPName(''); setPLogo(''); setPLogoImg('');
    flash(t('owner.added'));
  };

  const deletePartner = (idx: number) => {
    const all = partners.filter((_, i) => i !== idx);
    persistPartners(all);
    setPartners(all);
    savePartnersToCloud(all);
    flash(t('owner.deleted'));
  };

  const addManualVideo = () => {
    if (!mvTitle.trim() || !mvUrl.trim()) return;
    const all = [...manualVideos, { title: mvTitle, url: mvUrl, category: mvCategory, description: mvDesc, date: new Date().toISOString() }];
    lsSet('manualVideos', all);
    setManualVideos(all);
    saveManualVideosToCloud(all);
    setMvTitle(''); setMvUrl(''); setMvDesc('');
    flash(t('owner.added'));
  };

  const deleteManualVideo = (idx: number) => {
    const all = manualVideos.filter((_, i) => i !== idx);
    lsSet('manualVideos', all);
    setManualVideos(all);
    saveManualVideosToCloud(all);
    flash(t('owner.deleted'));
  };

  const saveQuiz = () => {
    if (!quizKey.trim() || !quizText.trim()) return;
    const lines = quizText.trim().split('\n').filter(l => l.trim());
    const questions = lines.map(line => {
      const parts = line.split('|');
      return { q: parts[0]?.trim() ?? '', options: [parts[1]?.trim() ?? '', parts[2]?.trim() ?? '', parts[3]?.trim() ?? ''], answer: 0 };
    });
    const quizzes = lsGet<Record<string, typeof questions>>('manualQuizzes', {});
    quizzes[quizKey] = questions;
    lsSet('manualQuizzes', quizzes);
    setQuizKey(''); setQuizText('');
    flash(t('owner.saved'));
  };

  const saveSponsored = () => {
    if (sponsoredTitle.trim() && sponsoredUrl.trim()) {
      lsSet('sponsoredLesson', { brand: sponsoredBrand, title: sponsoredTitle, url: sponsoredUrl });
      saveAppConfigToCloud({ sponsored_brand: sponsoredBrand, sponsored_title: sponsoredTitle, sponsored_url: sponsoredUrl });
    } else {
      localStorage.removeItem('sponsoredLesson');
      clearSponsoredFromCloud();
    }
    flash(t('owner.saved'));
  };

  const deleteMsg = (idx: number) => {
    const msg = devMessages[idx];
    const all = devMessages.filter((_, i) => i !== idx);
    lsSet('devMessages', all);
    setDevMessages(all);
    if (msg) deleteDevMessageFromCloud(msg.date);
    flash(t('owner.deleted'));
  };

  const copyMsg = (msg: string) => {
    navigator.clipboard?.writeText(msg);
    flash(t('owner.saved'));
  };

  const exportCSV = () => {
    const csv = 'Name,Message,Date\n' + devMessages.map(m => `"${m.name}","${m.message.replace(/"/g, '""')}","${m.date}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dev-messages.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    videos: lsGet<string[]>('recentWatched', []).length,
    stars: parseInt(localStorage.getItem('stars') ?? '0'),
    medals: parseInt(localStorage.getItem('medals') ?? '0'),
    messages: devMessages.length,
  };

  const categories: VideoCategory[] = ['Letters', 'Numbers', 'Colors', 'Shapes', 'Animals', 'New Uploads'];

  return (
    <div className="min-h-screen pb-28">
      <div className="bg-gradient-to-br from-candy-yellow via-candy-pink to-candy-purple px-5 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-2">
          <Crown size={24} className="text-white" />
          <h1 className="text-2xl font-bold text-white">{t('owner.title')}</h1>
        </div>
        <p className="text-white/80 text-sm">{t('owner.welcome')}</p>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {savedMsg && <div className="bg-green-100 rounded-xl p-2 text-center text-green-600 font-bold text-sm animate-pop">{savedMsg}</div>}

        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white rounded-xl p-2 text-center shadow"><p className="text-lg font-bold text-gray-700">{stats.videos}</p><p className="text-[10px] text-gray-400">Videos</p></div>
          <div className="bg-white rounded-xl p-2 text-center shadow"><p className="text-lg font-bold text-gray-700">{stats.stars}</p><p className="text-[10px] text-gray-400">Stars</p></div>
          <div className="bg-white rounded-xl p-2 text-center shadow"><p className="text-lg font-bold text-gray-700">{stats.medals}</p><p className="text-[10px] text-gray-400">Medals</p></div>
          <div className="bg-white rounded-xl p-2 text-center shadow"><p className="text-lg font-bold text-gray-700">{stats.messages}</p><p className="text-[10px] text-gray-400">Msgs</p></div>
        </div>

        <SectionCard color="border-candy-yellow" icon={<ImageIcon size={16} className="text-candy-yellow" />} title="App Logo">
          <p className="text-[10px] text-gray-400">Upload an image to show as the logo on the home page.</p>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              {appLogo ? <img src={appLogo} alt="Logo preview" className="w-full h-full object-contain" /> : <span className="text-[9px] text-gray-400 font-bold text-center px-1 leading-tight">No logo</span>}
            </div>
            <div className="flex-1 space-y-2">
              <label className="w-full bg-candy-yellow rounded-xl py-2 flex items-center justify-center gap-2 font-bold text-white text-sm cursor-pointer">
                <ImageIcon size={16} /> Upload Logo
                <input type="file" accept="image/*" onChange={uploadAppLogo} className="hidden" />
              </label>
              {appLogo && (
                <button onClick={removeAppLogo} className="w-full bg-gray-200 rounded-xl py-2 font-bold text-gray-500 text-sm flex items-center justify-center gap-2">
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
          </div>
        </SectionCard>

        <SectionCard color="border-red-400" icon={<Youtube size={16} className="text-red-500" />} title={t('owner.s1_title')}>
          <input value={channelName} onChange={e => setChannelName(e.target.value)} placeholder={t('owner.s1_channel_name')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={channelId} onChange={e => setChannelId(e.target.value)} placeholder={t('owner.s1_channel_id')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          {(lsRaw('ytChannelName') || lsRaw('ytChannelId')) && <p className="text-[10px] text-gray-400">{t('owner.s1_current')}: {lsRaw('ytChannelName') || '—'} / {lsRaw('ytChannelId') || '—'}</p>}
          <button onClick={saveChannel} className="w-full bg-red-500 rounded-xl py-2 font-bold text-white text-sm">{t('owner.s1_save')}</button>
        </SectionCard>

        <SectionCard color="border-candy-pink" icon={<ImageIcon size={16} className="text-candy-pink" />} title={t('owner.s2_title')}>
          <label className="w-full bg-candy-pink rounded-xl py-2 flex items-center justify-center gap-2 font-bold text-white text-sm cursor-pointer">
            <Plus size={16} /> {t('owner.s2_upload')}
            <input type="file" accept="image/*" onChange={uploadMedia} className="hidden" />
          </label>
          <div className="space-y-2">
            {supportMedia.map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden">
                <img src={img} alt="Support" className="w-full max-h-32 object-cover" />
                <button onClick={() => deleteMedia(i)} className="absolute top-1 right-1 bg-black/50 rounded-full p-1"><Trash2 size={14} className="text-white" /></button>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Online Shop Manager with photo album */}
        <SectionCard color="border-candy-green" icon={<ShoppingBasket size={16} className="text-candy-green" />} title={t('owner.s3_title')}>
          <input value={sLogo} onChange={e => setSLogo(e.target.value)} placeholder={t('owner.s3_logo')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />

          <div className="rounded-2xl border-2 border-dashed border-candy-green/40 p-3 space-y-2">
            <p className="text-xs font-bold text-gray-600">📷 Photo Album ({sImages.length})</p>
            <p className="text-[10px] text-gray-400">Pwede kang pumili ng maraming photos nang sabay. Ang unang photo ang cover. I-tap ang photo para gawing cover.</p>
            <label className={`w-full rounded-xl py-2 flex items-center justify-center gap-2 font-bold text-white text-sm cursor-pointer ${uploading ? 'bg-gray-400' : 'bg-candy-green'}`}>
              <Plus size={16} /> {uploading ? 'Uploading...' : 'Add Photos'}
              <input type="file" accept="image/*" multiple onChange={uploadShopAlbum} disabled={uploading} className="hidden" />
            </label>
            {sImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {sImages.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <button type="button" onClick={() => makeCover(i)} className="w-full h-full">
                      <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                    {i === 0 && <span className="absolute bottom-1 left-1 bg-candy-green text-white text-[9px] font-bold rounded-full px-1.5 py-0.5">Cover</span>}
                    <button type="button" onClick={() => removeAlbumPhoto(i)} className="absolute top-1 right-1 bg-black/60 rounded-full p-1">
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input value={sTitle} onChange={e => setSTitle(e.target.value)} placeholder={t('owner.s3_title_input')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={sDesc} onChange={e => setSDesc(e.target.value)} placeholder={t('owner.s3_desc')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={sSubDesc} onChange={e => setSSubDesc(e.target.value)} placeholder={t('owner.s3_subdesc')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={sCategory} onChange={e => setSCategory(e.target.value)} list="shop-categories" placeholder={t('owner.s3_category')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <datalist id="shop-categories">
            {Array.from(new Set(shopItems.map(item => item.category || 'General'))).map(cat => <option key={cat} value={cat} />)}
          </datalist>
          <input value={sLink} onChange={e => setSLink(e.target.value)} placeholder={t('owner.s3_link')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <button onClick={addShopItem} disabled={uploading} className="w-full bg-candy-green rounded-xl py-2 font-bold text-white text-sm">{t('owner.s3_add')}</button>
          {shopItems.map((item, i) => (
            <div key={item.id ?? i} className="flex items-center justify-between bg-gray-100 rounded-xl px-2 py-1.5 text-xs gap-2">
              <span className="flex items-center gap-1.5 flex-1 min-w-0">
                {normalizeImages(item)[0] ? <img src={normalizeImages(item)[0]} alt="" className="w-6 h-6 rounded object-cover" /> : <span>{item.logo}</span>}
                <span className="truncate">{item.title}</span>
                <span className="text-gray-400 shrink-0">({normalizeImages(item).length} 📷)</span>
              </span>
              <button onClick={() => deleteShopItem(i)}><Trash2 size={14} className="text-red-400" /></button>
            </div>
          ))}
        </SectionCard>

        <SectionCard color="border-[#A78BFA]" icon={<Handshake size={16} className="text-[#A78BFA]" />} title={`🤝 ${t('owner.s10_title')}`}>
          <p className="text-[10px] text-gray-400">{t('owner.s10_current')}: {partners.length}/{MAX_PARTNERS}</p>
          <input value={pName} onChange={e => setPName(e.target.value)} placeholder={t('owner.s10_name')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={pLogo} onChange={e => setPLogo(e.target.value)} placeholder={t('owner.s10_logo')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <label className="w-full bg-gray-100 rounded-xl py-2 flex items-center justify-center gap-2 font-bold text-gray-500 text-sm cursor-pointer">
            <ImageIcon size={16} /> Upload Logo Image
            <input type="file" accept="image/*" onChange={uploadPartnerLogo} className="hidden" />
          </label>
          {pLogoImg && <img src={pLogoImg} alt="Logo preview" className="w-12 h-12 rounded-xl object-cover" />}
          <button onClick={addPartner} className="w-full bg-[#A78BFA] rounded-xl py-2 font-bold text-white text-sm">{t('owner.s10_add')}</button>
          <div className="grid grid-cols-2 gap-2">
            {partners.map((p, i) => (
              <div key={i} className="relative bg-gray-100 rounded-xl p-2 flex flex-col items-center gap-1">
                <button onClick={() => deletePartner(i)} className="absolute top-1 right-1 bg-red-400 rounded-full p-0.5"><X size={10} className="text-white" /></button>
                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                  {p.logoImg ? <img src={p.logoImg} alt={p.name} className="w-full h-full object-cover" /> : <span className="text-lg">{p.logo}</span>}
                </div>
                <p className="text-[10px] font-bold text-gray-600 text-center truncate max-w-[80px]">{p.name}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard color="border-candy-blue" icon={<Plus size={16} className="text-candy-blue" />} title={t('owner.s4_title')}>
          <input value={mvUrl} onChange={e => setMvUrl(e.target.value)} placeholder={t('owner.s4_link')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={mvTitle} onChange={e => setMvTitle(e.target.value)} placeholder={t('owner.s4_title_input')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <select value={mvCategory} onChange={e => setMvCategory(e.target.value)} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea value={mvDesc} onChange={e => setMvDesc(e.target.value)} placeholder={t('owner.s4_desc')} rows={2} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none resize-none" />
          <button onClick={addManualVideo} className="w-full bg-candy-blue rounded-xl py-2 font-bold text-white text-sm">{t('owner.s4_add')}</button>
          {manualVideos.map((v, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-100 rounded-xl px-2 py-1.5 text-xs">
              <span className="truncate flex-1">{v.title} ({v.category})</span>
              <button onClick={() => deleteManualVideo(i)}><Trash2 size={14} className="text-red-400" /></button>
            </div>
          ))}
        </SectionCard>

        <SectionCard color="border-candy-purple" icon={<Plus size={16} className="text-candy-purple" />} title={t('owner.s5_title')}>
          <p className="text-[10px] text-gray-400">{t('owner.s5_format')}</p>
          <textarea value={quizText} onChange={e => setQuizText(e.target.value)} placeholder="Question|Correct|Wrong1|Wrong2" rows={6} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-xs outline-none font-mono resize-none" />
          <input value={quizKey} onChange={e => setQuizKey(e.target.value)} placeholder={t('owner.s5_keyword')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <button onClick={saveQuiz} className="w-full bg-candy-purple rounded-xl py-2 font-bold text-white text-sm">{t('owner.s5_save')}</button>
        </SectionCard>

        <SectionCard color="border-candy-yellow" icon={<Plus size={16} className="text-candy-yellow" />} title={t('owner.s6_title')}>
          <input value={sponsoredBrand} onChange={e => setSponsoredBrand(e.target.value)} placeholder={t('owner.s6_brand')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={sponsoredTitle} onChange={e => setSponsoredTitle(e.target.value)} placeholder={t('owner.s6_title_input')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={sponsoredUrl} onChange={e => setSponsoredUrl(e.target.value)} placeholder={t('owner.s6_link')} className="w-full bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none" />
          <button onClick={saveSponsored} className="w-full bg-candy-yellow rounded-xl py-2 font-bold text-white text-sm">{t('owner.s6_save')}</button>
        </SectionCard>

        <SectionCard color="border-candy-mint" icon={<MessageSquare size={16} className="text-candy-mint" />} title={t('owner.s7_title')}>
          {devMessages.length > 0 && (
            <button onClick={exportCSV} className="w-full bg-candy-mint rounded-xl py-2 flex items-center justify-center gap-2 font-bold text-white text-sm mb-2">
              <Download size={16} /> {t('owner.s7_export')}
            </button>
          )}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {devMessages.length === 0 && <p className="text-xs text-gray-400 text-center">No messages</p>}
            {devMessages.map((m, i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-2 text-xs">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-bold text-gray-600">{m.name}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => copyMsg(m.message)}><Copy size={14} className="text-gray-400" /></button>
                    <button onClick={() => deleteMsg(i)}><Trash2 size={14} className="text-red-400" /></button>
                  </div>
                </div>
                <p className="text-gray-500 mt-1">{m.message}</p>
                <p className="text-gray-300 mt-1">{new Date(m.date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard color="border-gray-400" icon={<Plus size={16} className="text-gray-400" />} title={t('owner.s8_title')}>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {logs.length === 0 && <p className="text-xs text-gray-400 text-center">{t('owner.s8_empty')}</p>}
            {logs.slice().reverse().map((log, i) => (
              <div key={i} className="text-xs text-gray-500 bg-gray-50 rounded-lg px-2 py-1">
                <span className="font-bold">{log.action}</span> — <span className="text-gray-300">{new Date(log.date).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function SectionCard({ color, icon, title, children }: { color: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow space-y-2 border-l-4 ${color}`}>
      <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">{icon} {title}</h3>
      {children}
    </div>
  );
}
