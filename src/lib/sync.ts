import { supabase } from './supabase';
import { lsSet, lsRawSet, type ShopItem, type Partner } from './storage';

export interface ManualVideoRow {
  title: string;
  url: string;
  category: string;
  description: string;
  date: string;
}

let syncing = false;

// Debouncing for cloud save operations
const debounceTimers = new Map<string, NodeJS.Timeout>();

function debounce(key: string, fn: () => Promise<void>, delay: number = 1000): void {
  if (debounceTimers.has(key)) {
    clearTimeout(debounceTimers.get(key)!);
  }
  const timer = setTimeout(() => {
    fn().catch(err => console.warn(`[sync] debounced ${key} failed:`, err));
    debounceTimers.delete(key);
  }, delay);
  debounceTimers.set(key, timer);
}

// Retry logic with exponential backoff
async function retryAsync<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 500
): Promise<T> {
  let lastError: Error | null = null;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxAttempts - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, i)));
      }
    }
  }
  throw lastError || new Error('Max retry attempts reached');
}

export async function syncFromCloud(): Promise<void> {
  if (syncing) return;
  syncing = true;
  try {
    // app_config (singleton row id=1)
    const { data: cfg, error: cfgErr } = await supabase
      .from('app_config')
      .select('logo, yt_channel_name, yt_channel_id, sponsored_brand, sponsored_title, sponsored_url')
      .eq('id', 1)
      .maybeSingle();
    if (cfgErr) console.warn('[sync] app_config error:', cfgErr.message);
    if (cfg) {
      if (cfg.logo) lsRawSet('appLogo', cfg.logo);
      lsRawSet('ytChannelName', cfg.yt_channel_name ?? '');
      lsRawSet('ytChannelId', cfg.yt_channel_id ?? '');
      lsSet('sponsoredLesson', { brand: cfg.sponsored_brand ?? '', title: cfg.sponsored_title ?? '', url: cfg.sponsored_url ?? '' });
    }

    // partners
    const { data: partners, error: pErr } = await supabase
      .from('partners')
      .select('name, logo, logo_img')
      .order('sort_order', { ascending: true });
    if (pErr) console.warn('[sync] partners error:', pErr.message);
    if (partners) {
      lsSet('partners', partners.map((p: { name: string; logo: string; logo_img: string }) => ({ name: p.name, logo: p.logo, logoImg: p.logo_img })));
    }

    // shop_items
    const { data: shop, error: sErr } = await supabase
      .from('shop_items')
      .select('logo, logo_img, title, description, sub_desc, link')
      .order('sort_order', { ascending: true });
    if (sErr) console.warn('[sync] shop_items error:', sErr.message);
    if (shop) {
      lsSet('shopItems', shop.map((s: { logo: string; logo_img: string; title: string; description: string; sub_desc: string; link: string }) => ({
        logo: s.logo, logoImg: s.logo_img, title: s.title, desc: s.description, subDesc: s.sub_desc, link: s.link,
      })));
    }

    // manual_videos
    const { data: videos, error: vErr } = await supabase
      .from('manual_videos')
      .select('title, url, category, description, date')
      .order('sort_order', { ascending: true });
    if (vErr) console.warn('[sync] manual_videos error:', vErr.message);
    if (videos) {
      lsSet('manualVideos', videos as ManualVideoRow[]);
    }

    // support_media
    const { data: media, error: mErr } = await supabase
      .from('support_media')
      .select('image_data')
      .order('sort_order', { ascending: true });
    if (mErr) console.warn('[sync] support_media error:', mErr.message);
    if (media) {
      lsSet('supportMedia', media.map((m: { image_data: string }) => m.image_data));
    }

    // dev_messages
    const { data: msgs, error: dErr } = await supabase
      .from('dev_messages')
      .select('name, message, date')
      .order('date', { ascending: false });
    if (dErr) console.warn('[sync] dev_messages error:', dErr.message);
    if (msgs) {
      lsSet('devMessages', msgs);
    }

    // Notify the app that cloud data has been applied
    window.dispatchEvent(new Event('cloudSynced'));
    window.dispatchEvent(new Event('appLogoChanged'));
  } catch (err) {
    console.warn('[sync] failed:', err);
  } finally {
    syncing = false;
  }
}

export async function saveAppConfigToCloud(updates: {
  logo?: string;
  yt_channel_name?: string;
  yt_channel_id?: string;
  sponsored_brand?: string;
  sponsored_title?: string;
  sponsored_url?: string;
}): Promise<void> {
  try {
    const { error } = await retryAsync(async () => {
      const result = await supabase.from('app_config').upsert({
        id: 1,
        ...updates,
        updated_at: new Date().toISOString(),
      });
      if (result.error) throw result.error;
      return result;
    });
    if (error) console.warn('[sync] saveAppConfig error:', error.message);
  } catch (err) {
    console.warn('[sync] saveAppConfig failed:', err);
  }
}

export async function savePartnersToCloud(items: Partner[]): Promise<void> {
  debounce('savePartners', async () => {
    try {
      await retryAsync(async () => {
        const { error: delErr } = await supabase.from('partners').delete().gte('sort_order', 0);
        if (delErr) throw delErr;

        if (items.length > 0) {
          const { error: insErr } = await supabase.from('partners').insert(items.map((p, i) => ({
            name: p.name, logo: p.logo, logo_img: p.logoImg, sort_order: i,
          })));
          if (insErr) throw insErr;
        }
      });
    } catch (err) {
      console.warn('[sync] savePartners failed:', err);
    }
  });
}

export async function saveShopItemsToCloud(items: ShopItem[]): Promise<void> {
  debounce('saveShopItems', async () => {
    try {
      await retryAsync(async () => {
        const { error: delErr } = await supabase.from('shop_items').delete().gte('sort_order', 0);
        if (delErr) throw delErr;

        if (items.length > 0) {
          const { error: insErr } = await supabase.from('shop_items').insert(items.map((s, i) => ({
            logo: s.logo, logo_img: s.logoImg, title: s.title, description: s.desc, sub_desc: s.subDesc, link: s.link, sort_order: i,
          })));
          if (insErr) throw insErr;
        }
      });
    } catch (err) {
      console.warn('[sync] saveShopItems failed:', err);
    }
  });
}

export async function saveManualVideosToCloud(items: ManualVideoRow[]): Promise<void> {
  debounce('saveManualVideos', async () => {
    try {
      await retryAsync(async () => {
        const { error: delErr } = await supabase.from('manual_videos').delete().gte('sort_order', 0);
        if (delErr) throw delErr;

        if (items.length > 0) {
          const { error: insErr } = await supabase.from('manual_videos').insert(items.map((v, i) => ({
            title: v.title, url: v.url, category: v.category, description: v.description, date: v.date, sort_order: i,
          })));
          if (insErr) throw insErr;
        }
      });
    } catch (err) {
      console.warn('[sync] saveManualVideos failed:', err);
    }
  });
}

export async function saveSupportMediaToCloud(images: string[]): Promise<void> {
  debounce('saveSupportMedia', async () => {
    try {
      await retryAsync(async () => {
        const { error: delErr } = await supabase.from('support_media').delete().gte('sort_order', 0);
        if (delErr) throw delErr;

        if (images.length > 0) {
          const { error: insErr } = await supabase.from('support_media').insert(images.map((img, i) => ({
            image_data: img, sort_order: i,
          })));
          if (insErr) throw insErr;
        }
      });
    } catch (err) {
      console.warn('[sync] saveSupportMedia failed:', err);
    }
  });
}

export async function saveDevMessageToCloud(msg: { name: string; message: string; date: string }): Promise<void> {
  try {
    const { error } = await retryAsync(async () => {
      const result = await supabase.from('dev_messages').insert(msg);
      if (result.error) throw result.error;
      return result;
    });
    if (error) console.warn('[sync] dev_message insert error:', error.message);
  } catch (err) {
    console.warn('[sync] saveDevMessage failed:', err);
  }
}

export async function deleteDevMessageFromCloud(date: string): Promise<void> {
  try {
    const { error } = await retryAsync(async () => {
      const result = await supabase.from('dev_messages').delete().eq('date', date);
      if (result.error) throw result.error;
      return result;
    });
    if (error) console.warn('[sync] dev_message delete error:', error.message);
  } catch (err) {
    console.warn('[sync] deleteDevMessage failed:', err);
  }
}

export async function clearSponsoredFromCloud(): Promise<void> {
  try {
    const { error } = await retryAsync(async () => {
      const result = await supabase.from('app_config').upsert({
        id: 1,
        sponsored_brand: '',
        sponsored_title: '',
        sponsored_url: '',
        updated_at: new Date().toISOString(),
      });
      if (result.error) throw result.error;
      return result;
    });
    if (error) console.warn('[sync] clearSponsored error:', error.message);
  } catch (err) {
    console.warn('[sync] clearSponsored failed:', err);
  }
}
