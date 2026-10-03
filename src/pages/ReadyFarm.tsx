import { useState, useEffect, useRef, useCallback } from 'react';
import { ShoppingBasket, X, Coins, Star, Lock, Sprout, Zap, Trophy, Gift, Tractor, Trees, Egg, Home as HomeIcon, Hammer, Store, Palette, Gem, Sparkles, Bot, BarChart3 } from 'lucide-react';
import { addStar, getStars, lsGet, lsSet } from '@/lib/storage';
import {
  CROPS, TREES, ANIMALS, QUESTS, ACHIEVEMENTS, RECIPES, DECORATIONS, STALL_ORDERS,
  POWERUPS, FARM_HANDS, EXPANDS, STAGES, SEASONS, FERTILIZER_PRICE, FERTILIZER_SPEED,
  WEATHER_EVENTS, xpNeeded, getCurrentSeason,
  type QuestData,
} from '@/lib/farmData';

interface Plot {
  crop: string | null;
  plantedAt: number | null;
  ready: boolean;
  fertilized: boolean;
  withered: boolean;
}

interface TreeState {
  id: string;
  plantedAt: number;
  ready: boolean;
}

interface AnimalState {
  id: string;
  count: number;
  lastCollect: number;
}

interface CraftState {
  recipeId: string;
  startedAt: number;
  ready: boolean;
}

interface FarmData {
  plots: Plot[];
  trees: TreeState[];
  coins: number;
  gems: number;
  level: number;
  xp: number;
  seeds: Record<string, number>;
  animals: AnimalState[];
  harvested: Record<string, number>;
  gridSize: number;
  questData: QuestData;
  questDone: string[];
  achievementsDone: string[];
  lastDailyBonus: number;
  mastery: Record<string, number>;
  decorations: string[];
  crafts: CraftState[];
  stallOrderIdx: number;
  stallOrdersDone: number;
  weather: string;
  weatherUntil: number;
  farmHands: string[];
  activePowerups: Record<string, number>;
  season: string;
}

function defaultData(): FarmData {
  return {
    plots: Array.from({ length: 25 }, () => ({ crop: null, plantedAt: null, ready: false, fertilized: false, withered: false })),
    trees: [],
    coins: 200,
    gems: 10,
    level: 1,
    xp: 0,
    seeds: { carrot: 5, corn: 2, tomato: 1 },
    animals: [{ id: 'chicken', count: 1, lastCollect: Date.now() }],
    harvested: {},
    gridSize: 5,
    questData: { totalHarvested: 0, totalCoinsEarned: 0, animalCollects: 0, treesHarvested: 0, expansions: 0, uniqueCrops: 0, recipesCrafted: 0, ordersCompleted: 0, decorationsOwned: 0, highestLevel: 1, powerupsUsed: 0, gemsSpent: 0 },
    questDone: [],
    achievementsDone: [],
    lastDailyBonus: 0,
    mastery: {},
    decorations: [],
    crafts: [],
    stallOrderIdx: 0,
    stallOrdersDone: 0,
    weather: 'sunny',
    weatherUntil: Date.now() + 300000,
    farmHands: [],
    activePowerups: {},
    season: getCurrentSeason(),
  };
}

function loadData(): FarmData {
  const d = lsGet<FarmData>('readyFarmData', defaultData());
  const def = defaultData();
  if (!d.plots || d.plots.length === 0) d.plots = def.plots;
  d.plots = d.plots.map(p => ({ ...p, fertilized: p.fertilized ?? false, withered: p.withered ?? false }));
  if (!d.seeds) d.seeds = def.seeds;
  if (!d.animals) d.animals = def.animals;
  if (!d.harvested) d.harvested = {};
  if (!d.gridSize) d.gridSize = 5;
  if (!d.trees) d.trees = [];
  if (!d.questData) d.questData = def.questData;
  if (!d.questDone) d.questDone = [];
  if (!d.achievementsDone) d.achievementsDone = [];
  if (!d.mastery) d.mastery = {};
  if (d.lastDailyBonus === undefined) d.lastDailyBonus = 0;
  if (!d.decorations) d.decorations = [];
  if (!d.crafts) d.crafts = [];
  if (d.stallOrderIdx === undefined) d.stallOrderIdx = 0;
  if (d.stallOrdersDone === undefined) d.stallOrdersDone = 0;
  if (!d.weather) d.weather = 'sunny';
  if (!d.weatherUntil) d.weatherUntil = Date.now() + 300000;
  if (d.gems === undefined) d.gems = 10;
  if (!d.farmHands) d.farmHands = [];
  if (!d.activePowerups) d.activePowerups = {};
  if (!d.season) d.season = getCurrentSeason();
  return d;
}

function saveData(d: FarmData) {
  lsSet('readyFarmData', d);
}

function pickWeather(level: number): string {
  const available = WEATHER_EVENTS.filter(w => level >= w.unlock);
  return available[Math.floor(Math.random() * available.length)].id;
}

export function ReadyFarm() {
  const [data, setData] = useState<FarmData>(() => loadData());
  const [shopTab, setShopTab] = useState<'seeds' | 'animals' | 'trees' | 'decor' | 'expand'>('seeds');
  const [showShop, setShowShop] = useState(false);
  const [showPowerups, setShowPowerups] = useState(false);
  const [showFarmHands, setShowFarmHands] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [plantPlot, setPlantPlot] = useState<number | null>(null);
  const [floats, setFloats] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [levelUp, setLevelUp] = useState<number | null>(null);
  const [stars, setStars] = useState(() => getStars());
  const [questPopup, setQuestPopup] = useState<string | null>(null);
  const [achPopup, setAchPopup] = useState<string | null>(null);
  const [dailyAvailable, setDailyAvailable] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [showStall, setShowStall] = useState(false);
  const [showCraft, setShowCraft] = useState(false);
  const floatId = useRef(0);

  const addFloat = useCallback((text: string) => {
    const id = ++floatId.current;
    setFloats(f => [...f, { id, text, x: 35 + Math.random() * 30, y: 25 + Math.random() * 30 }]);
    setTimeout(() => setFloats(f => f.filter(fl => fl.id !== id)), 1500);
  }, []);

  const updateData = useCallback((updater: (d: FarmData) => FarmData) => {
    setData(prev => {
      const next = updater(structuredClone(prev));
      saveData(next);
      return next;
    });
  }, []);

  const getWeather = () => WEATHER_EVENTS.find(w => w.id === data.weather) ?? WEATHER_EVENTS[0];
  const getSeason = () => SEASONS.find(s => s.id === data.season) ?? SEASONS[0];
  const weatherSpeed = getWeather().speed;
  const isRainbow = data.weather === 'rainbow';
  const isStorm = data.weather === 'storm';
  const isBreeze = data.weather === 'breeze';
  const hasDoubleCoins = (data.activePowerups['double'] ?? 0) > Date.now();
  const hasNoWither = (data.activePowerups['nowither'] ?? 0) > Date.now();
  const hasAutoHarvest = (data.activePowerups['autoharvest'] ?? 0) > Date.now();

  useEffect(() => {
    const today = new Date().toDateString();
    setDailyAvailable(data.lastDailyBonus !== Date.parse(today));
  }, [data.lastDailyBonus]);

  const getEffGrowTime = (crop: { grow: number }, fertilized: boolean) => {
    let time = fertilized ? crop.grow / FERTILIZER_SPEED : crop.grow;
    time /= weatherSpeed;
    if (isBreeze) time /= 1; // breeze affects trees not crops
    const seasonBonus = getSeason().speedBonus;
    return time / seasonBonus;
  };

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        let changed = false;
        const now = Date.now();
        const wSpeed = WEATHER_EVENTS.find(w => w.id === prev.weather)?.speed ?? 1;
        const storm = prev.weather === 'storm';
        const noWither = (prev.activePowerups['nowither'] ?? 0) > now;
        const autoHarvest = (prev.activePowerups['autoharvest'] ?? 0) > now;
        const season = SEASONS.find(s => s.id === prev.season) ?? SEASONS[0];
        const seasonBonus = season.speedBonus;

        let autoHarvested = 0;
        let autoCoins = 0;
        let autoXP = 0;

        const plots = prev.plots.map(p => {
          if (p.crop && p.plantedAt && !p.ready && !p.withered) {
            const crop = CROPS[p.crop];
            let growTime = (p.fertilized ? crop.grow / FERTILIZER_SPEED : crop.grow) / wSpeed / seasonBonus;
            const elapsed = (now - p.plantedAt) / 1000;
            if (elapsed >= growTime) {
              if (autoHarvest) {
                const mb = 1 + Math.floor((prev.mastery[p.crop] ?? 0) / 10) * 0.1;
                let gain = Math.floor(crop.price * mb);
                if (prev.weather === 'rainbow') gain *= 2;
                if ((prev.activePowerups['double'] ?? 0) > now) gain *= 2;
                autoCoins += gain;
                autoXP += crop.xp;
                autoHarvested++;
                changed = true;
                return { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
              }
              changed = true;
              return { ...p, ready: true };
            }
            const witherT = storm ? crop.witherTime / 2 : crop.witherTime;
            if (!noWither && elapsed >= growTime + witherT) {
              changed = true;
              return { ...p, withered: true, ready: false };
            }
          }
          return p;
        });

        const breeze = prev.weather === 'breeze';
        const trees = prev.trees.map(t => {
          if (!t.ready) {
            const tree = TREES[t.id];
            let growTime = tree.grow;
            if (breeze) growTime /= 1.5;
            const elapsed = (now - t.plantedAt) / 1000;
            if (elapsed >= growTime) {
              changed = true;
              return { ...t, ready: true };
            }
          }
          return t;
        });

        const crafts = prev.crafts.map(c => {
          if (!c.ready) {
            const recipe = RECIPES.find(r => r.id === c.recipeId);
            if (recipe) {
              const elapsed = (now - c.startedAt) / 1000;
              if (elapsed >= recipe.craftTime) {
                changed = true;
                return { ...c, ready: true };
              }
            }
          }
          return c;
        });

        let weather = prev.weather;
        let weatherUntil = prev.weatherUntil;
        if (now >= weatherUntil) {
          weather = pickWeather(prev.level);
          weatherUntil = now + 300000 + Math.random() * 300000;
          changed = true;
        }

        // Farm hand auto actions
        let fhCoins = 0;
        let fhXP = 0;
        let fhHarvested = 0;
        let fhAnimalCollects = 0;
        if (prev.farmHands.includes('h1')) {
          // auto harvest every ~30s — just harvest all ready
          const newPlots = plots.map(p => {
            if (p.crop && p.ready) {
              const crop = CROPS[p.crop];
              const mb = 1 + Math.floor((prev.mastery[p.crop] ?? 0) / 10) * 0.1;
              let gain = Math.floor(crop.price * mb);
              if (prev.weather === 'rainbow') gain *= 2;
              if ((prev.activePowerups['double'] ?? 0) > now) gain *= 2;
              fhCoins += gain; fhXP += crop.xp; fhHarvested++;
              return { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
            }
            return p;
          });
          if (fhHarvested > 0) {
            plots.splice(0, plots.length, ...newPlots);
            changed = true;
          }
        }
        if (prev.farmHands.includes('h2')) {
          const wSpeedA = prev.weather === 'rainy' ? 0.5 : 1;
          const animals = prev.animals.map(a => {
            const def = ANIMALS[a.id];
            const effTime = def.productTime * wSpeedA;
            if ((now - a.lastCollect) / 1000 >= effTime) {
              fhCoins += def.sell * a.count;
              fhAnimalCollects++;
              return { ...a, lastCollect: now };
            }
            return a;
          });
          if (fhAnimalCollects > 0) {
            prev.animals = animals;
            changed = true;
          }
        }
        if (prev.farmHands.includes('h3')) {
          // Master Gardener: auto-plant empty plots with the best available seed
          const owned = prev.seeds;
          const sortedCrops = Object.entries(CROPS)
            .filter(([k, c]) => prev.level >= c.unlock && (owned[k] ?? 0) > 0)
            .sort((a, b) => b[1].price - a[1].price);
          if (sortedCrops.length > 0) {
            const [bestKey, bestCrop] = sortedCrops[0];
            let seeds = owned[bestKey] ?? 0;
            let planted = 0;
            const newPlots = plots.map(p => {
              if (!p.crop && seeds > 0) {
                seeds--;
                planted++;
                return { crop: bestKey, plantedAt: now, ready: false, fertilized: false, withered: false };
              }
              return p;
            });
            if (planted > 0) {
              plots.splice(0, plots.length, ...newPlots);
              prev.seeds = { ...owned, [bestKey]: seeds };
              changed = true;
            }
          }
        }

        const totalCoins = autoCoins + fhCoins;
        const totalXP = autoXP + fhXP;
        const totalHarvested = autoHarvested + fhHarvested;

        if (changed) {
          const harvested = { ...prev.harvested };
          if (totalHarvested > 0) {
            for (const p of plots) { /* already cleared */ }
            // Track harvested crops from auto-harvest
            for (const p of prev.plots) {
              if (p.crop && p.ready && !plots.includes(p)) {
                harvested[p.crop] = (harvested[p.crop] ?? 0) + 1;
              }
            }
          }
          const questData = {
            ...prev.questData,
            totalHarvested: prev.questData.totalHarvested + totalHarvested,
            totalCoinsEarned: prev.questData.totalCoinsEarned + totalCoins,
            animalCollects: prev.questData.animalCollects + fhAnimalCollects,
            uniqueCrops: Object.keys(harvested).length,
            highestLevel: Math.max(prev.questData.highestLevel, prev.level),
          };
          const next = {
            ...prev,
            plots,
            trees,
            crafts,
            weather,
            weatherUntil,
            animals: prev.animals,
            harvested,
            questData,
            coins: prev.coins + totalCoins,
            xp: prev.xp + totalXP,
          };
          saveData(next);
          return next;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkLevelUp = (d: FarmData, oldLevel: number): FarmData => {
    let { coins, xp, level, gems } = d;
    let leveledUp = false;
    while (xp >= xpNeeded(level)) {
      xp -= xpNeeded(level);
      level++;
      coins += 50;
      gems += 1;
      addStar(10);
      leveledUp = true;
    }
    if (leveledUp) {
      setStars(s => s + 10 * (level - oldLevel));
      setTimeout(() => setLevelUp(level), 200);
    }
    const questData = { ...d.questData, highestLevel: Math.max(d.questData.highestLevel, level) };
    return { ...d, coins, xp, level, gems, questData };
  };

  const checkQuestsAndAchievements = (d: FarmData): FarmData => {
    const newQuests: string[] = [];
    for (const q of QUESTS) {
      if (!d.questDone.includes(q.id) && q.check(d.questData)) newQuests.push(q.id);
    }
    const newAchs: string[] = [];
    for (const a of ACHIEVEMENTS) {
      if (!d.achievementsDone.includes(a.id) && a.check(d.questData)) newAchs.push(a.id);
    }
    if (newQuests.length === 0 && newAchs.length === 0) return d;

    let { coins, xp } = d;
    let starGain = 0;
    const questDone = [...d.questDone, ...newQuests];
    for (const id of newQuests) {
      const q = QUESTS.find(qq => qq.id === id)!;
      coins += q.reward; xp += q.xp; starGain += q.starReward;
      addStar(q.starReward);
      addFloat(`Quest! +${q.reward}🪙`);
    }
    const achievementsDone = [...d.achievementsDone, ...newAchs];
    for (const id of newAchs) {
      const a = ACHIEVEMENTS.find(aa => aa.id === id)!;
      coins += a.reward;
      addFloat(`Achievement! +${a.reward}🪙`);
      setTimeout(() => setAchPopup(id), 500);
    }
    setStars(s => s + starGain);
    if (newQuests.length > 0) setTimeout(() => setQuestPopup(newQuests[0]), 300);
    return checkLevelUp({ ...d, questDone, achievementsDone, coins, xp }, d.level);
  };

  const plant = (plotIdx: number, cropKey: string) => {
    updateData(d => {
      if ((d.seeds[cropKey] ?? 0) <= 0) return d;
      const plots = [...d.plots];
      plots[plotIdx] = { crop: cropKey, plantedAt: Date.now(), ready: false, fertilized: false, withered: false };
      return { ...d, plots, seeds: { ...d.seeds, [cropKey]: d.seeds[cropKey] - 1 } };
    });
    setPlantPlot(null);
  };

  const plantAll = (cropKey: string) => {
    updateData(d => {
      const crop = CROPS[cropKey];
      if (d.level < crop.unlock) return d;
      const plots = [...d.plots];
      let seeds = d.seeds[cropKey] ?? 0;
      let planted = 0;
      for (let i = 0; i < plots.length && seeds > 0; i++) {
        if (!plots[i].crop) {
          plots[i] = { crop: cropKey, plantedAt: Date.now(), ready: false, fertilized: false, withered: false };
          seeds--;
          planted++;
        }
      }
      if (planted === 0) return d;
      addFloat(`Planted ${planted} ${crop.name}!`);
      return { ...d, plots, seeds: { ...d.seeds, [cropKey]: seeds } };
    });
  };

  const fertilize = (plotIdx: number) => {
    updateData(d => {
      if (d.coins < FERTILIZER_PRICE) return d;
      const plots = [...d.plots];
      if (!plots[plotIdx].crop || plots[plotIdx].ready || plots[plotIdx].withered) return d;
      plots[plotIdx] = { ...plots[plotIdx], fertilized: true };
      addFloat('⚡ Fertilized!');
      return { ...d, plots, coins: d.coins - FERTILIZER_PRICE };
    });
  };

  const clearWithered = (plotIdx: number) => {
    updateData(d => {
      const plots = [...d.plots];
      plots[plotIdx] = { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
      addFloat('🧹 Cleared');
      return { ...d, plots };
    });
  };

  const harvest = (plotIdx: number) => {
    const plot = data.plots[plotIdx];
    if (!plot.crop || !plot.ready) return;
    const crop = CROPS[plot.crop];
    const masteryBonus = 1 + Math.floor((data.mastery[plot.crop] ?? 0) / 10) * 0.1;
    let coinGain = Math.floor(crop.price * masteryBonus);
    if (isRainbow) coinGain *= 2;
    if (hasDoubleCoins) coinGain *= 2;
    if ((data.activePowerups['triple'] ?? 0) > Date.now()) coinGain *= 3;
    const xpGain = crop.xp;
    const starGain = Math.floor(crop.price / 3);

    addFloat(`+${coinGain} 🪙`);
    addStar(starGain);
    setStars(s => s + starGain);

    const cropKey = plot.crop;
    updateData(d => {
      const plots = [...d.plots];
      plots[plotIdx] = { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
      const harvested = { ...d.harvested, [cropKey]: (d.harvested[cropKey] ?? 0) + 1 };
      const mastery = { ...d.mastery, [cropKey]: (d.mastery[cropKey] ?? 0) + 1 };
      const questData = {
        ...d.questData,
        totalHarvested: d.questData.totalHarvested + 1,
        totalCoinsEarned: d.questData.totalCoinsEarned + coinGain,
        uniqueCrops: Object.keys(harvested).length,
      };
      let next: FarmData = { ...d, plots, harvested, mastery, questData, coins: d.coins + coinGain, xp: d.xp + xpGain };
      next = checkLevelUp(next, d.level);
      next = checkQuestsAndAchievements(next);
      return next;
    });
  };

  const harvestAll = () => {
    let totalCoins = 0, totalXP = 0, totalStars = 0, count = 0;
    updateData(d => {
      const rainbow = d.weather === 'rainbow';
      const dbl = (d.activePowerups['double'] ?? 0) > Date.now();
      const plots = d.plots.map(p => {
        if (p.crop && p.ready) {
          const crop = CROPS[p.crop];
          const mb = 1 + Math.floor((d.mastery[p.crop] ?? 0) / 10) * 0.1;
          let gain = Math.floor(crop.price * mb);
          if (rainbow) gain *= 2;
          if (dbl) gain *= 2;
          totalCoins += gain; totalXP += crop.xp; totalStars += Math.floor(crop.price / 3); count++;
          return { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
        }
        return p;
      });
      if (count === 0) return d;
      addFloat(`Harvested ${count}! +${totalCoins}🪙`);
      addStar(totalStars);
      setStars(s => s + totalStars);
      const harvested = { ...d.harvested };
      for (const p of d.plots) { if (p.crop && p.ready) harvested[p.crop] = (harvested[p.crop] ?? 0) + 1; }
      const questData = { ...d.questData, totalHarvested: d.questData.totalHarvested + count, totalCoinsEarned: d.questData.totalCoinsEarned + totalCoins, uniqueCrops: Object.keys(harvested).length };
      let next: FarmData = { ...d, plots, harvested, questData, coins: d.coins + totalCoins, xp: d.xp + totalXP };
      next = checkLevelUp(next, d.level);
      next = checkQuestsAndAchievements(next);
      return next;
    });
  };

  const buySeed = (cropKey: string) => {
    const crop = CROPS[cropKey];
    updateData(d => {
      if (d.coins < crop.seedPrice) return d;
      return { ...d, coins: d.coins - crop.seedPrice, seeds: { ...d.seeds, [cropKey]: (d.seeds[cropKey] ?? 0) + 1 } };
    });
  };

  const buyAnimal = (animalKey: string) => {
    const animal = ANIMALS[animalKey];
    updateData(d => {
      if (d.level < animal.unlock || d.coins < animal.price) return d;
      const existing = d.animals.find(a => a.id === animalKey);
      const animals = existing
        ? d.animals.map(a => a.id === animalKey ? { ...a, count: a.count + 1 } : a)
        : [...d.animals, { id: animalKey, count: 1, lastCollect: Date.now() }];
      return { ...d, coins: d.coins - animal.price, animals };
    });
  };

  const buyTree = (treeKey: string) => {
    const tree = TREES[treeKey];
    updateData(d => {
      if (d.level < tree.unlock || d.coins < tree.price || d.trees.length >= 6) return d;
      const trees = [...d.trees, { id: treeKey, plantedAt: Date.now(), ready: false }];
      return { ...d, coins: d.coins - tree.price, trees };
    });
  };

  const buyDecoration = (decId: string) => {
    const dec = DECORATIONS.find(d => d.id === decId)!;
    updateData(d => {
      if (d.level < dec.unlock || d.coins < dec.price || d.decorations.includes(decId)) return d;
      const decorations = [...d.decorations, decId];
      const questData = { ...d.questData, decorationsOwned: decorations.length };
      let next: FarmData = { ...d, coins: d.coins - dec.price, decorations, xp: d.xp + dec.xp, questData };
      next = checkLevelUp(next, d.level);
      next = checkQuestsAndAchievements(next);
      return next;
    });
  };

  const harvestTree = (idx: number) => {
    updateData(d => {
      const tree = d.trees[idx];
      if (!tree.ready) return d;
      const def = TREES[tree.id];
      let gain = def.fruitPrice;
      if (d.weather === 'rainbow') gain *= 2;
      if ((d.activePowerups['double'] ?? 0) > Date.now()) gain *= 2;
      addFloat(`+${gain}🪙 ${def.fruitEmoji}`);
      addStar(Math.floor(gain / 5));
      setStars(s => s + Math.floor(gain / 5));
      const trees = d.trees.map((t, i) => i === idx ? { ...t, ready: false, plantedAt: Date.now() } : t);
      const questData = { ...d.questData, treesHarvested: d.questData.treesHarvested + 1, totalCoinsEarned: d.questData.totalCoinsEarned + gain };
      let next: FarmData = { ...d, trees, questData, coins: d.coins + gain, xp: d.xp + def.xp };
      next = checkLevelUp(next, d.level);
      next = checkQuestsAndAchievements(next);
      return next;
    });
  };

  const collectAnimal = (idx: number) => {
    updateData(d => {
      const animal = d.animals[idx];
      const def = ANIMALS[animal.id];
      const wSpeed = d.weather === 'rainy' ? 0.5 : 1;
      const effectiveTime = def.productTime * wSpeed;
      const elapsed = (Date.now() - animal.lastCollect) / 1000;
      if (elapsed < effectiveTime) return d;
      let gain = def.sell * animal.count;
      if ((d.activePowerups['double'] ?? 0) > Date.now()) gain *= 2;
      addFloat(`+${gain} 🪙`);
      const animals = d.animals.map((a, i) => i === idx ? { ...a, lastCollect: Date.now() } : a);
      const questData = { ...d.questData, animalCollects: d.questData.animalCollects + 1, totalCoinsEarned: d.questData.totalCoinsEarned + gain };
      let next: FarmData = { ...d, animals, questData, coins: d.coins + gain, xp: d.xp + 5 };
      next = checkLevelUp(next, d.level);
      next = checkQuestsAndAchievements(next);
      return next;
    });
  };

  const collectAllAnimals = () => {
    let totalGain = 0;
    updateData(d => {
      let anyReady = false;
      const dbl = (d.activePowerups['double'] ?? 0) > Date.now();
      const wSpeed = d.weather === 'rainy' ? 0.5 : 1;
      const animals = d.animals.map(a => {
        const def = ANIMALS[a.id];
        const effectiveTime = def.productTime * wSpeed;
        if ((Date.now() - a.lastCollect) / 1000 >= effectiveTime) {
          let gain = def.sell * a.count;
          if (dbl) gain *= 2;
          totalGain += gain;
          anyReady = true;
          return { ...a, lastCollect: Date.now() };
        }
        return a;
      });
      if (!anyReady) return d;
      addFloat(`+${totalGain} 🪙`);
      const questData = { ...d.questData, totalCoinsEarned: d.questData.totalCoinsEarned + totalGain };
      let next: FarmData = { ...d, animals, questData, coins: d.coins + totalGain };
      next = checkLevelUp(next, d.level);
      return next;
    });
  };

  const startCraft = (recipeId: string) => {
    updateData(d => {
      const recipe = RECIPES.find(r => r.id === recipeId);
      if (!recipe || d.level < recipe.unlock) return d;
      if (d.crafts.length >= 3) return d;
      for (const [crop, need] of Object.entries(recipe.ingredients)) {
        if ((d.harvested[crop] ?? 0) < need) return d;
      }
      const harvested = { ...d.harvested };
      for (const [crop, need] of Object.entries(recipe.ingredients)) harvested[crop] -= need;
      const crafts = [...d.crafts, { recipeId, startedAt: Date.now(), ready: false }];
      return { ...d, harvested, crafts };
    });
  };

  const collectCraft = (idx: number) => {
    updateData(d => {
      const craft = d.crafts[idx];
      if (!craft.ready) return d;
      const recipe = RECIPES.find(r => r.id === craft.recipeId)!;
      let gain = recipe.productPrice;
      if (d.weather === 'rainbow') gain *= 2;
      if ((d.activePowerups['double'] ?? 0) > Date.now()) gain *= 2;
      addFloat(`+${gain}🪙 ${recipe.emoji}`);
      const crafts = d.crafts.filter((_, i) => i !== idx);
      const questData = { ...d.questData, recipesCrafted: d.questData.recipesCrafted + 1, totalCoinsEarned: d.questData.totalCoinsEarned + gain };
      let next: FarmData = { ...d, crafts, questData, coins: d.coins + gain, xp: d.xp + 30 };
      next = checkLevelUp(next, d.level);
      next = checkQuestsAndAchievements(next);
      return next;
    });
  };

  const completeStallOrder = () => {
    updateData(d => {
      const order = STALL_ORDERS[d.stallOrderIdx];
      if (!order) return d;
      for (const [crop, need] of Object.entries(order.need)) {
        if ((d.harvested[crop] ?? 0) < need) return d;
      }
      const harvested = { ...d.harvested };
      for (const [crop, need] of Object.entries(order.need)) harvested[crop] -= need;
      addFloat(`Order! +${order.reward}🪙`);
      addStar(order.starReward);
      setStars(s => s + order.starReward);
      const questData = { ...d.questData, ordersCompleted: d.stallOrdersDone + 1, totalCoinsEarned: d.questData.totalCoinsEarned + order.reward };
      const nextIdx = (d.stallOrderIdx + 1) % STALL_ORDERS.length;
      let next: FarmData = { ...d, harvested, questData, coins: d.coins + order.reward, xp: d.xp + order.xp, stallOrderIdx: nextIdx, stallOrdersDone: d.stallOrdersDone + 1 };
      next = checkLevelUp(next, d.level);
      next = checkQuestsAndAchievements(next);
      return next;
    });
  };

  const expand = () => {
    const next = EXPANDS.find(e => e.from === data.gridSize);
    if (!next) return;
    updateData(d => {
      if (d.level < next.unlock || d.coins < next.cost) return d;
      const newSize = next.to * next.to;
      const plots = [...d.plots];
      while (plots.length < newSize) plots.push({ crop: null, plantedAt: null, ready: false, fertilized: false, withered: false });
      const questData = { ...d.questData, expansions: d.questData.expansions + 1 };
      let result: FarmData = { ...d, coins: d.coins - next.cost, gridSize: next.to, plots, questData };
      result = checkQuestsAndAchievements(result);
      return result;
    });
  };

  const claimDailyBonus = () => {
    const today = Date.parse(new Date().toDateString());
    updateData(d => {
      const bonus = 50 + d.level * 5;
      const gemBonus = 1 + Math.floor(d.level / 5);
      addFloat(`Daily! +${bonus}🪙 +${gemBonus}💠`);
      return { ...d, coins: d.coins + bonus, gems: d.gems + gemBonus, lastDailyBonus: today };
    });
    setDailyAvailable(false);
  };

  const usePowerUp = (puId: string) => {
    const pu = POWERUPS.find(p => p.id === puId);
    if (!pu) return;
    updateData(d => {
      if (d.gems < pu.gemCost) return d;
      const activePowerups = { ...d.activePowerups };
      if (pu.duration > 0) {
        activePowerups[puId] = Date.now() + pu.duration * 1000;
      } else if (puId === 'megagrow') {
        // mega grow: instantly grow AND harvest all planted crops
        let megaCoins = 0;
        let megaXP = 0;
        let megaCount = 0;
        const plots = d.plots.map(p => {
          if (p.crop && p.plantedAt && !p.withered) {
            const crop = CROPS[p.crop];
            const mb = 1 + Math.floor((d.mastery[p.crop] ?? 0) / 10) * 0.1;
            let gain = Math.floor(crop.price * mb);
            if (d.weather === 'rainbow') gain *= 2;
            if ((d.activePowerups['double'] ?? 0) > Date.now()) gain *= 2;
            if ((d.activePowerups['triple'] ?? 0) > Date.now()) gain *= 3;
            megaCoins += gain; megaXP += crop.xp; megaCount++;
            return { crop: null, plantedAt: null, ready: false, fertilized: false, withered: false };
          }
          return p;
        });
        addFloat(`🌟 Mega! +${megaCoins}🪙`);
        const harvested = { ...d.harvested };
        for (const p of d.plots) {
          if (p.crop && p.plantedAt && !p.withered) harvested[p.crop] = (harvested[p.crop] ?? 0) + 1;
        }
        const questData = { ...d.questData, totalHarvested: d.questData.totalHarvested + megaCount, totalCoinsEarned: d.questData.totalCoinsEarned + megaCoins, powerupsUsed: d.questData.powerupsUsed + 1, gemsSpent: d.questData.gemsSpent + pu.gemCost, uniqueCrops: Object.keys(harvested).length };
        let next: FarmData = { ...d, gems: d.gems - pu.gemCost, plots, harvested, questData, coins: d.coins + megaCoins, xp: d.xp + megaXP };
        next = checkLevelUp(next, d.level);
        next = checkQuestsAndAchievements(next);
        return next;
      } else {
        // instant grow - set all planted crops to ready
        const plots = d.plots.map(p => {
          if (p.crop && p.plantedAt && !p.ready && !p.withered) {
            return { ...p, ready: true };
          }
          return p;
        });
        addFloat(`⚡ Instant Grow!`);
        const questData = { ...d.questData, powerupsUsed: d.questData.powerupsUsed + 1, gemsSpent: d.questData.gemsSpent + pu.gemCost };
        let next: FarmData = { ...d, gems: d.gems - pu.gemCost, plots, activePowerups, questData };
        next = checkQuestsAndAchievements(next);
        return next;
      }
      addFloat(`${pu.emoji} ${pu.name}!`);
      const questData = { ...d.questData, powerupsUsed: d.questData.powerupsUsed + 1, gemsSpent: d.questData.gemsSpent + pu.gemCost };
      let next: FarmData = { ...d, gems: d.gems - pu.gemCost, activePowerups, questData };
      next = checkQuestsAndAchievements(next);
      return next;
    });
  };

  const buyFarmHand = (fhId: string) => {
    const fh = FARM_HANDS.find(f => f.id === fhId);
    if (!fh) return;
    updateData(d => {
      if (d.farmHands.includes(fhId) || d.gems < fh.gemCost) return d;
      const farmHands = [...d.farmHands, fhId];
      addFloat(`${fh.emoji} Hired!`);
      return { ...d, gems: d.gems - fh.gemCost, farmHands, questData: { ...d.questData, gemsSpent: d.questData.gemsSpent + fh.gemCost } };
    });
  };

  const xpPct = Math.min(100, (data.xp / xpNeeded(data.level)) * 100);
  const grid = data.gridSize;
  const readyCount = data.plots.filter(p => p.ready).length;
  const emptyCount = data.plots.filter(p => !p.crop).length;
  const animalsReady = data.animals.filter(a => {
    const def = ANIMALS[a.id];
    const wSpeed = data.weather === 'rainy' ? 0.5 : 1;
    return (Date.now() - a.lastCollect) / 1000 >= def.productTime * wSpeed;
  }).length;
  const currentOrder = STALL_ORDERS[data.stallOrderIdx];
  const canCompleteOrder = currentOrder && Object.entries(currentOrder.need).every(([c, n]) => (data.harvested[c] ?? 0) >= n);
  const activePUs = Object.entries(data.activePowerups).filter(([, until]) => until > Date.now());

  return (
    <div className="min-h-screen pb-28 max-w-2xl mx-auto" style={{ background: '#E8F5E9' }}>
      <div className="fixed inset-0 pointer-events-none z-[100]">
        {floats.map(f => (
          <div key={f.id} className="absolute font-bold text-lg text-white drop-shadow-lg animate-floatUp" style={{ left: `${f.x}%`, top: `${f.y}%` }}>
            {f.text}
          </div>
        ))}
      </div>

      {/* Top HUD */}
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-700 px-4 pt-10 pb-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-white flex items-center gap-1.5">🌾 Ready Farm</h1>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-white/25 backdrop-blur rounded-full px-2 py-1">
              <span className="text-sm">{getWeather().emoji}</span>
              <span className="text-white/90 text-[9px] font-bold">{getWeather().name}</span>
            </div>
            <button onClick={() => setShowStats(true)} className="bg-white/25 backdrop-blur rounded-full p-1.5 active:scale-90 transition">
              <BarChart3 size={14} className="text-white" />
            </button>
            <button onClick={() => setShowQuests(true)} className="bg-white/25 backdrop-blur rounded-full px-2.5 py-1.5 flex items-center gap-1 active:scale-90 transition">
              <Trophy size={14} className="text-yellow-300" />
              <span className="text-white font-bold text-[10px]">{data.questDone.length}/{QUESTS.length}</span>
            </button>
            <button onClick={() => setShowShop(true)} className="bg-white/25 backdrop-blur rounded-full px-3 py-1.5 flex items-center gap-1.5 active:scale-95 transition">
              <ShoppingBasket size={16} className="text-white" />
              <span className="text-white font-bold text-xs">Shop</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl px-2 py-1 shadow border-2 border-black/80 flex-shrink-0">
            <span className="text-white font-bold text-sm">LVL {data.level}</span>
          </div>
          <div className="flex-1 h-3 bg-black/80 rounded-full overflow-hidden border border-black/80">
            <div className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-500" style={{ width: `${xpPct}%` }} />
          </div>
          <span className="text-white/90 text-[10px] font-bold flex-shrink-0">{data.xp}/{xpNeeded(data.level)}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 bg-white/25 backdrop-blur rounded-full px-3 py-1">
            <Coins size={14} className="text-yellow-300" />
            <span className="text-white font-bold text-sm">{data.coins}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/25 backdrop-blur rounded-full px-3 py-1">
            <Gem size={14} className="text-cyan-200" />
            <span className="text-white font-bold text-sm">{data.gems}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/25 backdrop-blur rounded-full px-3 py-1">
            <Star size={14} className="text-yellow-300 fill-yellow-300" />
            <span className="text-white font-bold text-sm">{stars}</span>
          </div>
          {dailyAvailable && (
            <button onClick={claimDailyBonus} className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-3 py-1 active:scale-95 transition animate-pop">
              <Gift size={14} className="text-white" />
              <span className="text-white font-bold text-[10px]">Daily!</span>
            </button>
          )}
        </div>

        {/* Active power-ups */}
        {activePUs.length > 0 && (
          <div className="flex gap-1 mt-1.5">
            {activePUs.map(([id, until]) => {
              const pu = POWERUPS.find(p => p.id === id);
              if (!pu) return null;
              const remaining = Math.ceil((until - Date.now()) / 1000);
              return (
                <div key={id} className="flex items-center gap-1 bg-purple-500/40 backdrop-blur rounded-full px-2 py-0.5">
                  <span className="text-xs">{pu.emoji}</span>
                  <span className="text-white text-[9px] font-bold">{remaining}s</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Season + Weather Banner */}
      <div className="px-3 mt-2">
        <div className="flex gap-2">
          <div className="flex-1 bg-white/80 backdrop-blur rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <span className="text-lg">{getSeason().emoji}</span>
            <div>
              <p className="text-[9px] font-bold text-gray-500">{getSeason().name} Season</p>
              <p className="text-[8px] text-gray-400">{getSeason().bonus}</p>
            </div>
          </div>
          <div className="flex-1 bg-white/80 backdrop-blur rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <span className="text-lg">{getWeather().emoji}</span>
            <span className="text-[10px] font-bold text-gray-600">{getWeather().desc}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-3 mt-2 flex gap-2">
        <button onClick={harvestAll} disabled={readyCount === 0} className="flex-1 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl py-2 flex items-center justify-center gap-1.5 active:scale-95 transition disabled:opacity-40" style={{ boxShadow: '0 4px 0 #b8860b' }}>
          <Tractor size={16} className="text-white" />
          <span className="text-white font-bold text-xs">Harvest{readyCount > 0 ? ` (${readyCount})` : ''}</span>
        </button>
        <button onClick={collectAllAnimals} disabled={animalsReady === 0} className="flex-1 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl py-2 flex items-center justify-center gap-1.5 active:scale-95 transition disabled:opacity-40" style={{ boxShadow: '0 4px 0 #cc6f00' }}>
          <Egg size={16} className="text-white" />
          <span className="text-white font-bold text-xs">Collect{animalsReady > 0 ? ` (${animalsReady})` : ''}</span>
        </button>
        <button onClick={() => setShowPowerups(true)} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl py-2 px-3 flex items-center justify-center gap-1 active:scale-95 transition" style={{ boxShadow: '0 4px 0 #6a1b9a' }}>
          <Zap size={16} className="text-white" />
          <span className="text-white font-bold text-xs">Power</span>
        </button>
      </div>

      {/* Farm Hands Bar */}
      <div className="px-3 mt-2 flex gap-2">
        <button onClick={() => setShowFarmHands(true)} className="flex-1 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl py-2 flex items-center justify-center gap-1.5 active:scale-95 transition" style={{ boxShadow: '0 4px 0 #00695c' }}>
          <Bot size={16} className="text-white" />
          <span className="text-white font-bold text-xs">Hands{data.farmHands.length > 0 ? ` (${data.farmHands.length})` : ''}</span>
        </button>
        {data.farmHands.length === 0 && (
          <span className="text-[9px] text-gray-400 self-center">Hire helpers to automate your farm!</span>
        )}
      </div>

      {/* Farm Grid */}
      <div className="px-3 mt-3">
        <div className="mx-auto rounded-2xl p-2 shadow-inner bg-[#8BC34A]" style={{ maxWidth: 'min(92vw, 560px)' }}>
          <div className="grid gap-1 sm:gap-1.5" style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}>
            {data.plots.slice(0, grid * grid).map((plot, i) => {
              const crop = plot.crop ? CROPS[plot.crop] : null;
              const effGrow = crop ? getEffGrowTime(crop, plot.fertilized) : 0;
              const elapsed = plot.plantedAt ? (Date.now() - plot.plantedAt) / 1000 : 0;
              const progress = crop ? Math.min(1, elapsed / effGrow) : 0;
              const stage = !plot.ready && !plot.withered && crop ? Math.min(3, Math.floor(progress * 4)) : -1;
              return (
                <button
                  key={i}
                  onClick={() => plot.withered ? clearWithered(i) : plot.ready ? harvest(i) : setPlantPlot(i)}
                  onContextMenu={(e) => { e.preventDefault(); if (plot.crop && !plot.ready && !plot.withered) fertilize(i); }}
                  className="relative flex items-center justify-center transition active:scale-90"
                  style={{
                    background: plot.withered ? '#5D4037' : plot.fertilized ? '#A1887F' : '#8D6E63',
                    border: '3px solid #3E2723',
                    borderRadius: '12px',
                    boxShadow: '0 4px 0 #3E2723',
                    aspectRatio: '1 / 1',
                  }}
                >
                  {plot.withered ? (
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-lg sm:text-xl opacity-60">🥀</span>
                      <span className="text-[7px] text-white/50 font-bold">Clear</span>
                    </div>
                  ) : plot.ready && crop ? (
                    <div className="flex flex-col items-center animate-farmBounce">
                      <span className="text-xl sm:text-2xl" style={{ filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.8))' }}>{crop.emoji}</span>
                      <span className="absolute -top-0.5 -right-0.5 text-[10px]">✨</span>
                    </div>
                  ) : plot.crop && crop ? (
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-base sm:text-lg">{STAGES[stage] ?? '🌱'}</span>
                      <span className="text-[7px] text-white/80 font-bold">{Math.ceil(effGrow - elapsed)}s</span>
                      {plot.fertilized && <span className="absolute top-0.5 left-0.5 text-[8px]">⚡</span>}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-sm opacity-50">🌱</span>
                      <span className="text-[7px] text-white/60 font-bold">Taniman</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-1">Long-press to fertilize (⚡{FERTILIZER_PRICE}🪙) • Crops wither if not harvested!</p>
      </div>

      {/* Stall Order */}
      <div className="px-3 mt-3">
        <div className="bg-white rounded-2xl p-3 shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-700 text-sm flex items-center gap-1.5"><Store size={16} className="text-blue-500" /> Farm Stall</h3>
            <button onClick={() => setShowStall(true)} className="text-[10px] font-bold text-blue-500">View ›</button>
          </div>
          {currentOrder ? (
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentOrder.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-600">{currentOrder.name}</p>
                <p className="text-[10px] text-gray-400">{Object.entries(currentOrder.need).map(([c, n]) => `${CROPS[c]?.emoji ?? c}x${n}`).join(' ')}</p>
              </div>
              {canCompleteOrder ? (
                <button onClick={completeStallOrder} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg px-3 py-1.5 text-white text-[10px] font-bold active:scale-90 transition" style={{ boxShadow: '0 3px 0 #1565c0' }}>
                  Sell +{currentOrder.reward}🪙
                </button>
              ) : (
                <span className="text-[9px] text-gray-400 font-bold">Need more</span>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Crafting */}
      <div className="px-3 mt-3">
        <div className="bg-white rounded-2xl p-3 shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-700 text-sm flex items-center gap-1.5"><Hammer size={16} className="text-amber-600" /> Kitchen</h3>
            <button onClick={() => setShowCraft(true)} className="text-[10px] font-bold text-amber-600">Craft ›</button>
          </div>
          {data.crafts.length === 0 ? (
            <p className="text-xs text-gray-400">Craft crops into food for more coins!</p>
          ) : (
            <div className="flex gap-2">
              {data.crafts.map((c, i) => {
                const recipe = RECIPES.find(r => r.id === c.recipeId);
                if (!recipe) return null;
                const elapsed = (Date.now() - c.startedAt) / 1000;
                const remaining = Math.ceil(recipe.craftTime - elapsed);
                return (
                  <div key={i} className="bg-gray-50 rounded-xl p-2 flex flex-col items-center gap-1 flex-1">
                    <span className="text-2xl">{recipe.emoji}</span>
                    {c.ready ? (
                      <button onClick={() => collectCraft(i)} className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg px-2 py-1 text-white text-[9px] font-bold w-full" style={{ boxShadow: '0 2px 0 #b8860b' }}>
                        Sell {recipe.productPrice}🪙
                      </button>
                    ) : (
                      <span className="text-[8px] text-gray-400 font-bold">{remaining}s</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Trees */}
      <div className="px-3 mt-3">
        <div className="bg-white rounded-2xl p-3 shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-700 text-sm flex items-center gap-1.5"><Trees size={16} className="text-green-600" /> Orchard</h3>
            <span className="text-[10px] text-gray-400">{data.trees.length}/6</span>
          </div>
          {data.trees.length === 0 ? (
            <p className="text-xs text-gray-400">Buy trees in the Shop!</p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {data.trees.map((t, i) => {
                const def = TREES[t.id];
                let growTime = def.grow;
                if (isBreeze) growTime /= 1.5;
                const remaining = Math.ceil(growTime - (Date.now() - t.plantedAt) / 1000);
                return (
                  <div key={i} className="bg-gray-50 rounded-xl p-2 flex flex-col items-center gap-1">
                    <div className={`text-2xl ${t.ready ? 'animate-farmBounce' : ''}`} style={t.ready ? { filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.8))' } : {}}>{def.emoji}</div>
                    {t.ready ? (
                      <button onClick={() => harvestTree(i)} className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg px-2 py-1 text-white text-[9px] font-bold active:scale-90 transition w-full" style={{ boxShadow: '0 3px 0 #2e7d32' }}>
                        {def.fruitEmoji} {def.fruitPrice}🪙
                      </button>
                    ) : (
                      <span className="text-[8px] text-gray-400 font-bold">{remaining}s</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Barn */}
      <div className="px-3 mt-3">
        <div className="bg-white rounded-2xl p-3 shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-700 text-sm flex items-center gap-1.5"><HomeIcon size={16} className="text-amber-600" /> Barn</h3>
            {animalsReady > 0 && <span className="text-[10px] text-green-500 font-bold animate-pulse">{animalsReady} ready!</span>}
          </div>
          {data.animals.length === 0 ? (
            <p className="text-xs text-gray-400">Buy animals in the Shop!</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {data.animals.map((a, i) => {
                const def = ANIMALS[a.id];
                const wSpeed = data.weather === 'rainy' ? 0.5 : 1;
                const effTime = def.productTime * wSpeed;
                const elapsed = (Date.now() - a.lastCollect) / 1000;
                const ready = elapsed >= effTime;
                const remaining = Math.ceil(effTime - elapsed);
                return (
                  <div key={i} className="bg-gray-50 rounded-xl p-2 flex items-center gap-2">
                    <div className={`text-2xl ${ready ? 'animate-farmBounce' : ''}`}>{def.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-600 truncate">{def.name} x{a.count}</p>
                      <p className="text-[10px] text-gray-400">{def.productEmoji} {def.product}</p>
                    </div>
                    {ready ? (
                      <button onClick={() => collectAnimal(i)} className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg px-2 py-1.5 text-white text-[10px] font-bold active:scale-90 transition" style={{ boxShadow: '0 3px 0 #2e7d32' }}>Collect</button>
                    ) : (
                      <span className="text-[9px] text-gray-400 font-bold">{remaining}s</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Decorations */}
      {data.decorations.length > 0 && (
        <div className="px-3 mt-3">
          <div className="bg-white rounded-2xl p-3 shadow">
            <h3 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-1.5"><Palette size={16} className="text-purple-500" /> Decorations</h3>
            <div className="flex flex-wrap gap-2">
              {data.decorations.map(id => {
                const dec = DECORATIONS.find(d => d.id === id);
                if (!dec) return null;
                return <span key={id} className="text-2xl bg-gray-50 rounded-lg px-2 py-1">{dec.emoji}</span>;
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mastery */}
      <div className="px-3 mt-3">
        <div className="bg-white rounded-2xl p-3 shadow">
          <h3 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-1.5"><Sprout size={16} className="text-green-600" /> Crop Mastery</h3>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(data.harvested).map(([key, count]) => {
              const crop = CROPS[key];
              if (!crop) return null;
              const ml = Math.floor((data.mastery[key] ?? 0) / 10);
              return (
                <div key={key} className="bg-gray-50 rounded-lg px-2 py-1 flex items-center gap-1">
                  <span className="text-sm">{crop.emoji}</span>
                  <span className="text-[10px] font-bold text-gray-600">{count}</span>
                  {ml > 0 && <span className="text-[8px] font-bold text-yellow-600">M{ml}</span>}
                </div>
              );
            })}
            {Object.keys(data.harvested).length === 0 && <p className="text-[10px] text-gray-400">Harvest crops to track mastery!</p>}
          </div>
        </div>
      </div>

      {/* Plant Modal */}
      {plantPlot !== null && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setPlantPlot(null)}>
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl animate-bounce-in max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-base">🌱 Plant a Seed</h3>
              <button onClick={() => setPlantPlot(null)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="space-y-2">
              {Object.entries(CROPS).map(([key, crop]) => {
                const locked = data.level < crop.unlock;
                const owned = data.seeds[key] ?? 0;
                const ml = Math.floor((data.mastery[key] ?? 0) / 10);
                const seasonMatch = crop.season === data.season;
                return (
                  <div key={key} className={`flex items-center gap-3 rounded-xl p-2.5 ${locked ? 'bg-gray-100' : 'bg-gray-50'}`}>
                    <div className="text-2xl">{crop.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-700">{crop.name} {ml > 0 && <span className="text-[9px] text-yellow-600">M{ml}</span>} {seasonMatch && <span className="text-[8px] text-green-500">in season</span>}</p>
                      <p className="text-[10px] text-gray-400">{locked ? `🔒 LVL ${crop.unlock}` : `${crop.grow}s • Sell ${crop.price}🪙 • +${crop.xp}xp`}</p>
                    </div>
                    {locked ? <Lock size={16} className="text-gray-300" /> : owned > 0 ? (
                      <button onClick={() => plant(plantPlot, key)} className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition" style={{ boxShadow: '0 3px 0 #2e7d32' }}>Plant ({owned})</button>
                    ) : (
                      <button onClick={() => { buySeed(key); plant(plantPlot, key); }} disabled={data.coins < crop.seedPrice} className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #f57f17' }}>Buy {crop.seedPrice}🪙</button>
                    )}
                  </div>
                );
              })}
            </div>
            {emptyCount > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 mb-2">Quick Plant All (empty plots: {emptyCount})</p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(CROPS).filter(([, c]) => data.level >= c.unlock && (data.seeds[c.name.toLowerCase()] ?? 0) > 0).map(([key, crop]) => (
                    <button key={key} onClick={() => plantAll(key)} className="bg-gray-100 rounded-lg px-2 py-1 text-[10px] font-bold text-gray-600 active:scale-90 transition">
                      {crop.emoji} All
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shop Modal */}
      {showShop && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowShop(false)}>
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl animate-bounce-in max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-base flex items-center gap-1.5"><ShoppingBasket size={18} /> Farm Shop</h3>
              <button onClick={() => setShowShop(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="flex gap-1 mb-3 bg-gray-100 rounded-xl p-1 overflow-x-auto no-scrollbar">
              {(['seeds', 'animals', 'trees', 'decor', 'expand'] as const).map(tab => (
                <button key={tab} onClick={() => setShopTab(tab)} className={`flex-1 rounded-lg py-1.5 text-[10px] font-bold capitalize transition whitespace-nowrap ${shopTab === tab ? 'bg-white shadow text-gray-700' : 'text-gray-400'}`}>{tab}</button>
              ))}
            </div>
            {shopTab === 'seeds' && (
              <div className="space-y-2">
                {Object.entries(CROPS).map(([key, crop]) => {
                  const locked = data.level < crop.unlock;
                  const owned = data.seeds[key] ?? 0;
                  const seasonMatch = crop.season === data.season;
                  return (
                    <div key={key} className={`flex items-center gap-3 rounded-xl p-2.5 ${locked ? 'bg-gray-100' : seasonMatch ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className="text-2xl">{crop.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-700">{crop.name} <span className="text-[10px] text-gray-400">({owned})</span> {seasonMatch && <span className="text-[8px] text-green-500">in season</span>}</p>
                        <p className="text-[10px] text-gray-400">{locked ? `🔒 LVL ${crop.unlock}` : `${crop.grow}s • +${crop.xp}xp • Sell ${crop.price}🪙`}</p>
                      </div>
                      {locked ? <Lock size={16} className="text-gray-300" /> : (
                        <button onClick={() => buySeed(key)} disabled={data.coins < crop.seedPrice} className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #f57f17' }}>{crop.seedPrice}🪙</button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {shopTab === 'animals' && (
              <div className="space-y-2">
                {Object.entries(ANIMALS).map(([key, animal]) => {
                  const locked = data.level < animal.unlock;
                  const owned = data.animals.find(a => a.id === key)?.count ?? 0;
                  return (
                    <div key={key} className={`flex items-center gap-3 rounded-xl p-2.5 ${locked ? 'bg-gray-100' : 'bg-gray-50'}`}>
                      <div className="text-2xl">{animal.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-700">{animal.name} <span className="text-[10px] text-gray-400">({owned})</span></p>
                        <p className="text-[10px] text-gray-400">{locked ? `🔒 LVL ${animal.unlock}` : `${animal.productEmoji} ${animal.product} ${animal.productTime}s • Sell ${animal.sell}🪙`}</p>
                      </div>
                      {locked ? <Lock size={16} className="text-gray-300" /> : (
                        <button onClick={() => buyAnimal(key)} disabled={data.coins < animal.price} className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #2e7d32' }}>{animal.price}🪙</button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {shopTab === 'trees' && (
              <div className="space-y-2">
                <p className="text-[10px] text-gray-400">Trees give fruit repeatedly! Max 6. {data.trees.length}/6 planted.</p>
                {Object.entries(TREES).map(([key, tree]) => {
                  const locked = data.level < tree.unlock;
                  return (
                    <div key={key} className={`flex items-center gap-3 rounded-xl p-2.5 ${locked ? 'bg-gray-100' : 'bg-gray-50'}`}>
                      <div className="text-2xl">{tree.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-700">{tree.name}</p>
                        <p className="text-[10px] text-gray-400">{locked ? `🔒 LVL ${tree.unlock}` : `${tree.fruitEmoji} ${tree.fruit} • ${tree.grow}s • Sell ${tree.fruitPrice}🪙`}</p>
                      </div>
                      {locked ? <Lock size={16} className="text-gray-300" /> : (
                        <button onClick={() => buyTree(key)} disabled={data.coins < tree.price || data.trees.length >= 6} className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #2e7d32' }}>{tree.price}🪙</button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {shopTab === 'decor' && (
              <div className="space-y-2">
                {DECORATIONS.map(dec => {
                  const locked = data.level < dec.unlock;
                  const owned = data.decorations.includes(dec.id);
                  return (
                    <div key={dec.id} className={`flex items-center gap-3 rounded-xl p-2.5 ${locked ? 'bg-gray-100' : owned ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className="text-2xl">{dec.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-700">{dec.name}</p>
                        <p className="text-[10px] text-gray-400">{locked ? `🔒 LVL ${dec.unlock}` : owned ? '✅ Owned' : `+${dec.xp}xp • ${dec.price}🪙`}</p>
                      </div>
                      {locked ? <Lock size={16} className="text-gray-300" /> : owned ? null : (
                        <button onClick={() => buyDecoration(dec.id)} disabled={data.coins < dec.price} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #6a1b9a' }}>{dec.price}🪙</button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {shopTab === 'expand' && (
              <div className="space-y-2">
                {EXPANDS.map((e, i) => {
                  const isCurrent = data.gridSize === e.from;
                  const isDone = data.gridSize >= e.to;
                  const locked = data.level < e.unlock;
                  return (
                    <div key={i} className={`flex items-center gap-3 rounded-xl p-2.5 ${isDone ? 'bg-green-50' : isCurrent ? 'bg-gray-50' : 'bg-gray-100'}`}>
                      <div className="text-2xl">📐</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-700">{e.from}x{e.from} → {e.to}x{e.to}</p>
                        <p className="text-[10px] text-gray-400">{isDone ? '✅ Expanded!' : locked ? `🔒 LVL ${e.unlock}` : `${e.cost}🪙`}</p>
                      </div>
                      {isCurrent && !locked && (
                        <button onClick={expand} disabled={data.coins < e.cost} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #1565c0' }}>{e.cost}🪙</button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Power-ups Modal */}
      {showPowerups && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowPowerups(false)}>
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl animate-bounce-in max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-base flex items-center gap-1.5"><Zap size={18} className="text-purple-500" /> Power-Ups</h3>
              <button onClick={() => setShowPowerups(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="flex items-center gap-2 mb-3 bg-purple-50 rounded-xl p-2">
              <Gem size={16} className="text-cyan-500" />
              <span className="text-sm font-bold text-gray-700">{data.gems} gems</span>
              <span className="text-[10px] text-gray-400 ml-auto">Earn gems from daily bonus & level ups!</span>
            </div>
            <div className="space-y-2">
              {POWERUPS.map(pu => (
                <div key={pu.id} className="flex items-center gap-3 rounded-xl p-2.5 bg-gray-50">
                  <div className="text-2xl">{pu.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-700">{pu.name}</p>
                    <p className="text-[10px] text-gray-400">{pu.desc}</p>
                  </div>
                  <button onClick={() => usePowerUp(pu.id)} disabled={data.gems < pu.gemCost} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #6a1b9a' }}>{pu.gemCost}💠</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Farm Hands Modal */}
      {showFarmHands && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowFarmHands(false)}>
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl animate-bounce-in max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-base flex items-center gap-1.5"><Bot size={18} className="text-teal-500" /> Farm Hands</h3>
              <button onClick={() => setShowFarmHands(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <p className="text-[10px] text-gray-400 mb-3">Hire helpers to automate your farm! They work permanently once hired.</p>
            <div className="space-y-2">
              {FARM_HANDS.map(fh => {
                const owned = data.farmHands.includes(fh.id);
                return (
                  <div key={fh.id} className={`flex items-center gap-3 rounded-xl p-2.5 ${owned ? 'bg-teal-50' : 'bg-gray-50'}`}>
                    <div className="text-2xl">{fh.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-700">{fh.name}</p>
                      <p className="text-[10px] text-gray-400">{fh.desc}</p>
                    </div>
                    {owned ? (
                      <span className="text-[10px] font-bold text-teal-500">✅ Hired</span>
                    ) : (
                      <button onClick={() => buyFarmHand(fh.id)} disabled={data.gems < fh.gemCost} className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #00695c' }}>{fh.gemCost}💠</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStats && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowStats(false)}>
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl animate-bounce-in max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-base flex items-center gap-1.5"><BarChart3 size={18} className="text-green-500" /> Farm Stats</h3>
              <button onClick={() => setShowStats(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <StatCard label="Level" value={data.level} emoji="⭐" />
              <StatCard label="Coins" value={data.coins} emoji="🪙" />
              <StatCard label="Gems" value={data.gems} emoji="💠" />
              <StatCard label="Stars" value={stars} emoji="✨" />
              <StatCard label="Crops Harvested" value={data.questData.totalHarvested} emoji="🌾" />
              <StatCard label="Coins Earned" value={data.questData.totalCoinsEarned} emoji="💰" />
              <StatCard label="Animal Collects" value={data.questData.animalCollects} emoji="🐾" />
              <StatCard label="Trees Harvested" value={data.questData.treesHarvested} emoji="🌳" />
              <StatCard label="Recipes Crafted" value={data.questData.recipesCrafted} emoji="🔨" />
              <StatCard label="Orders Done" value={data.stallOrdersDone} emoji="📦" />
              <StatCard label="Decorations" value={data.decorations.length} emoji="🎨" />
              <StatCard label="Expansions" value={data.questData.expansions} emoji="📐" />
              <StatCard label="Power-ups Used" value={data.questData.powerupsUsed} emoji="⚡" />
              <StatCard label="Farm Hands" value={data.farmHands.length} emoji="🤖" />
              <StatCard label="Unique Crops" value={data.questData.uniqueCrops} emoji="🌈" />
              <StatCard label="Achievements" value={data.achievementsDone.length} emoji="🏆" />
            </div>
          </div>
        </div>
      )}

      {/* Stall Modal */}
      {showStall && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowStall(false)}>
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl animate-bounce-in max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-base flex items-center gap-1.5"><Store size={18} className="text-blue-500" /> Farm Stall</h3>
              <button onClick={() => setShowStall(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <p className="text-[10px] text-gray-400 mb-3">Complete orders by delivering crops. Orders cycle after completion. {data.stallOrdersDone} completed so far.</p>
            <div className="space-y-2">
              {STALL_ORDERS.map((order, i) => {
                const isCurrent = i === data.stallOrderIdx;
                const canDo = Object.entries(order.need).every(([c, n]) => (data.harvested[c] ?? 0) >= n);
                return (
                  <div key={order.id} className={`flex items-center gap-3 rounded-xl p-2.5 ${isCurrent ? 'bg-blue-50 border-2 border-blue-300' : 'bg-gray-50 opacity-60'}`}>
                    <div className="text-2xl">{order.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-700">{order.name}</p>
                      <p className="text-[10px] text-gray-400">{Object.entries(order.need).map(([c, n]) => `${CROPS[c]?.emoji ?? c}x${n}`).join(' ')}</p>
                      <p className="text-[10px] font-bold text-yellow-600">+{order.reward}🪙 +{order.xp}xp +{order.starReward}⭐</p>
                    </div>
                    {isCurrent && (
                      <button onClick={completeStallOrder} disabled={!canDo} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #1565c0' }}>Deliver</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Craft Modal */}
      {showCraft && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowCraft(false)}>
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl animate-bounce-in max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-base flex items-center gap-1.5"><Hammer size={18} className="text-amber-600" /> Kitchen</h3>
              <button onClick={() => setShowCraft(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <p className="text-[10px] text-gray-400 mb-3">Craft crops into food, then sell for profit! Max 3 at once. {data.questData.recipesCrafted} crafted so far.</p>
            <div className="space-y-2">
              {RECIPES.map(recipe => {
                const locked = data.level < recipe.unlock;
                const canCraft = Object.entries(recipe.ingredients).every(([c, n]) => (data.harvested[c] ?? 0) >= n);
                return (
                  <div key={recipe.id} className={`flex items-center gap-3 rounded-xl p-2.5 ${locked ? 'bg-gray-100' : 'bg-gray-50'}`}>
                    <div className="text-2xl">{recipe.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-700">{recipe.name}</p>
                      <p className="text-[10px] text-gray-400">{locked ? `🔒 LVL ${recipe.unlock}` : `${Object.entries(recipe.ingredients).map(([c, n]) => `${CROPS[c]?.emoji ?? c}x${n}`).join(' ')} • ${recipe.craftTime}s`}</p>
                      <p className="text-[10px] font-bold text-yellow-600">Sell {recipe.productPrice}🪙</p>
                    </div>
                    {locked ? <Lock size={16} className="text-gray-300" /> : (
                      <button onClick={() => startCraft(recipe.id)} disabled={!canCraft || data.crafts.length >= 3} className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg px-3 py-1.5 text-white text-xs font-bold active:scale-90 transition disabled:opacity-40" style={{ boxShadow: '0 3px 0 #b8860b' }}>Craft</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quests Modal */}
      {showQuests && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuests(false)}>
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl animate-bounce-in max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700 text-base flex items-center gap-1.5"><Trophy size={18} className="text-yellow-500" /> Quests & Achievements</h3>
              <button onClick={() => setShowQuests(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <p className="text-[10px] font-bold text-gray-500 mb-1">Quests ({data.questDone.length}/{QUESTS.length})</p>
            <div className="space-y-2 mb-3">
              {QUESTS.map(q => {
                const done = data.questDone.includes(q.id);
                return (
                  <div key={q.id} className={`flex items-center gap-3 rounded-xl p-2.5 ${done ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className="text-2xl">{done ? '✅' : q.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-700">{q.name}</p>
                      <p className="text-[10px] text-gray-400">{q.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] font-bold text-yellow-600">+{q.reward}🪙</p>
                      <p className="text-[9px] text-gray-400">+{q.xp}xp +{q.starReward}⭐</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] font-bold text-gray-500 mb-1">Achievements ({data.achievementsDone.length}/{ACHIEVEMENTS.length})</p>
            <div className="space-y-2">
              {ACHIEVEMENTS.map(a => {
                const done = data.achievementsDone.includes(a.id);
                return (
                  <div key={a.id} className={`flex items-center gap-3 rounded-xl p-2.5 ${done ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className="text-2xl">{done ? '🏆' : a.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-700">{a.name}</p>
                      <p className="text-[10px] text-gray-400">{a.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold text-yellow-600">+{a.reward}🪙</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Level Up Modal */}
      {levelUp !== null && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setLevelUp(null)}>
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce-in max-w-xs">
            <div className="text-5xl mb-3 animate-float">🎉</div>
            <h2 className="font-bold text-xl text-gray-700 mb-1">LEVEL UP!</h2>
            <p className="text-gray-400 text-sm mb-1">You reached Level {levelUp}!</p>
            <p className="text-green-500 font-bold text-sm mb-3">+50 🪙 +1 💠 +10 ⭐</p>
            <div className="bg-gray-50 rounded-xl p-2 mb-3 text-[10px] text-gray-500">
              {Object.entries(CROPS).filter(([, c]) => c.unlock === levelUp).map(([k, c]) => <span key={k} className="inline-block mx-1">{c.emoji} {c.name}!</span>)}
              {Object.entries(ANIMALS).filter(([, a]) => a.unlock === levelUp).map(([k, a]) => <span key={k} className="inline-block mx-1">{a.emoji} {a.name}!</span>)}
              {Object.entries(TREES).filter(([, t]) => t.unlock === levelUp).map(([k, t]) => <span key={k} className="inline-block mx-1">{t.emoji} {t.name}!</span>)}
            </div>
            <button onClick={() => setLevelUp(null)} className="bg-gradient-to-br from-green-500 to-green-600 rounded-full px-6 py-2 text-white font-bold text-sm" style={{ boxShadow: '0 4px 0 #2e7d32' }}>Awesome!</button>
          </div>
        </div>
      )}

      {/* Quest Complete Modal */}
      {questPopup && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setQuestPopup(null)}>
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce-in max-w-xs">
            <div className="text-4xl mb-2 animate-float">🏆</div>
            <h2 className="font-bold text-lg text-gray-700 mb-1">Quest Complete!</h2>
            <p className="text-gray-400 text-sm mb-3">{QUESTS.find(q => q.id === questPopup)?.name}</p>
            <button onClick={() => setQuestPopup(null)} className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full px-6 py-2 text-white font-bold text-sm" style={{ boxShadow: '0 4px 0 #f57f17' }}>Claim!</button>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {achPopup && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setAchPopup(null)}>
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce-in max-w-xs">
            <div className="text-4xl mb-2 animate-float">🏅</div>
            <h2 className="font-bold text-lg text-gray-700 mb-1">Achievement!</h2>
            <p className="text-gray-400 text-sm mb-3">{ACHIEVEMENTS.find(a => a.id === achPopup)?.name}</p>
            <button onClick={() => setAchPopup(null)} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full px-6 py-2 text-white font-bold text-sm" style={{ boxShadow: '0 4px 0 #6a1b9a' }}>Nice!</button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, emoji }: { label: string; value: number; emoji: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
      <span className="text-xl">{emoji}</span>
      <div className="min-w-0">
        <p className="text-[9px] text-gray-400 font-bold truncate">{label}</p>
        <p className="text-sm font-bold text-gray-700">{value}</p>
      </div>
    </div>
  );
}
