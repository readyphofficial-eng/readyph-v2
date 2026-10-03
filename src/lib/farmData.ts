export interface CropDef {
  emoji: string;
  grow: number;
  price: number;
  seedPrice: number;
  xp: number;
  unlock: number;
  name: string;
  witherTime: number;
  season: string;
}

export const CROPS: Record<string, CropDef> = {
  carrot:     { emoji: '🥕', grow: 30,  price: 5,  seedPrice: 2,  xp: 5,  unlock: 1, name: 'Carrot', witherTime: 120, season: 'spring' },
  corn:       { emoji: '🌽', grow: 60,  price: 10, seedPrice: 4,  xp: 10, unlock: 2, name: 'Corn', witherTime: 180, season: 'summer' },
  tomato:     { emoji: '🍅', grow: 90,  price: 18, seedPrice: 7,  xp: 15, unlock: 3, name: 'Tomato', witherTime: 240, season: 'summer' },
  strawberry: { emoji: '🍓', grow: 120, price: 30, seedPrice: 12, xp: 22, unlock: 4, name: 'Strawberry', witherTime: 300, season: 'spring' },
  eggplant:   { emoji: '🍆', grow: 150, price: 40, seedPrice: 16, xp: 30, unlock: 6, name: 'Eggplant', witherTime: 360, season: 'summer' },
  pumpkin:    { emoji: '🎃', grow: 180, price: 55, seedPrice: 20, xp: 40, unlock: 8, name: 'Pumpkin', witherTime: 420, season: 'autumn' },
  potato:     { emoji: '🥔', grow: 210, price: 70, seedPrice: 25, xp: 50, unlock: 10, name: 'Potato', witherTime: 480, season: 'autumn' },
  pepper:     { emoji: '🌶️', grow: 240, price: 85, seedPrice: 30, xp: 60, unlock: 12, name: 'Pepper', witherTime: 540, season: 'summer' },
  grape:      { emoji: '🍇', grow: 300, price: 110, seedPrice: 40, xp: 75, unlock: 14, name: 'Grape', witherTime: 600, season: 'autumn' },
  watermelon: { emoji: '🍉', grow: 360, price: 140, seedPrice: 50, xp: 95, unlock: 16, name: 'Watermelon', witherTime: 720, season: 'summer' },
  pineapple:  { emoji: '🍍', grow: 420, price: 180, seedPrice: 65, xp: 120, unlock: 18, name: 'Pineapple', witherTime: 840, season: 'summer' },
  broccoli:   { emoji: '🥦', grow: 480, price: 220, seedPrice: 80, xp: 150, unlock: 20, name: 'Broccoli', witherTime: 960, season: 'winter' },
  wheat:      { emoji: '🌾', grow: 45,  price: 8,  seedPrice: 3,  xp: 8,  unlock: 3, name: 'Wheat', witherTime: 150, season: 'summer' },
  onion:      { emoji: '🧅', grow: 75,  price: 14, seedPrice: 5,  xp: 12, unlock: 4, name: 'Onion', witherTime: 210, season: 'autumn' },
  garlic:     { emoji: '🧄', grow: 105, price: 22, seedPrice: 9,  xp: 18, unlock: 5, name: 'Garlic', witherTime: 270, season: 'winter' },
  mushroom:   { emoji: '🍄', grow: 135, price: 35, seedPrice: 14, xp: 28, unlock: 7, name: 'Mushroom', witherTime: 330, season: 'autumn' },
  blueberry:  { emoji: '🫐', grow: 165, price: 48, seedPrice: 18, xp: 35, unlock: 9, name: 'Blueberry', witherTime: 390, season: 'spring' },
  chili:      { emoji: '🌶️', grow: 200, price: 65, seedPrice: 22, xp: 45, unlock: 11, name: 'Chili', witherTime: 450, season: 'summer' },
  rice:       { emoji: '🌾', grow: 100, price: 16, seedPrice: 6,  xp: 14, unlock: 4, name: 'Rice', witherTime: 260, season: 'summer' },
  lettuce:    { emoji: '🥬', grow: 55, price: 9,  seedPrice: 3,  xp: 8,  unlock: 2, name: 'Lettuce', witherTime: 160, season: 'spring' },
  cucumber:   { emoji: '🥒', grow: 110, price: 20, seedPrice: 8,  xp: 16, unlock: 5, name: 'Cucumber', witherTime: 280, season: 'summer' },
  avocado:    { emoji: '🥑', grow: 280, price: 100, seedPrice: 35, xp: 70, unlock: 13, name: 'Avocado', witherTime: 560, season: 'spring' },
  starfruit:{ emoji: '⭐', grow: 380, price: 160, seedPrice: 55, xp: 110, unlock: 17, name: 'Star Fruit', witherTime: 760, season: 'summer' },
  sugarcane:  { emoji: '🎋', grow: 220, price: 75, seedPrice: 28, xp: 55, unlock: 12, name: 'Sugarcane', witherTime: 500, season: 'summer' },
  lavender:   { emoji: '💜', grow: 260, price: 90, seedPrice: 32, xp: 65, unlock: 14, name: 'Lavender', witherTime: 520, season: 'spring' },
  cornflower: { emoji: '🌽', grow: 320, price: 130, seedPrice: 45, xp: 90, unlock: 16, name: 'Cornflower', witherTime: 640, season: 'autumn' },
  goldenapple:{ emoji: '🍏', grow: 400, price: 200, seedPrice: 70, xp: 140, unlock: 19, name: 'Golden Apple', witherTime: 800, season: 'autumn' },
};

export interface TreeDef {
  emoji: string;
  price: number;
  fruit: string;
  fruitEmoji: string;
  fruitPrice: number;
  grow: number;
  xp: number;
  unlock: number;
  name: string;
}

export const TREES: Record<string, TreeDef> = {
  apple:  { emoji: '🌳', price: 300, fruit: 'Apple',  fruitEmoji: '🍎', fruitPrice: 25, grow: 600,  xp: 50,  unlock: 4,  name: 'Apple Tree' },
  orange: { emoji: '🍊', price: 500, fruit: 'Orange', fruitEmoji: '🍊', fruitPrice: 35, grow: 900,  xp: 80,  unlock: 7,  name: 'Orange Tree' },
  banana: { emoji: '🌴', price: 800, fruit: 'Banana', fruitEmoji: '🍌', fruitPrice: 50, grow: 1200, xp: 120, unlock: 10, name: 'Banana Tree' },
  cherry: { emoji: '🍒', price: 1200, fruit: 'Cherry', fruitEmoji: '🍒', fruitPrice: 70, grow: 1800, xp: 180, unlock: 14, name: 'Cherry Tree' },
  mango:  { emoji: '🥭', price: 600, fruit: 'Mango', fruitEmoji: '🥭', fruitPrice: 40, grow: 1000, xp: 90,  unlock: 8,  name: 'Mango Tree' },
  coconut: { emoji: '🥥', price: 900, fruit: 'Coconut', fruitEmoji: '🥥', fruitPrice: 55, grow: 1400, xp: 130, unlock: 12, name: 'Coconut Tree' },
  peach:  { emoji: '🍑', price: 700, fruit: 'Peach', fruitEmoji: '🍑', fruitPrice: 45, grow: 1100, xp: 100, unlock: 9, name: 'Peach Tree' },
  lemon:  { emoji: '🍋', price: 400, fruit: 'Lemon', fruitEmoji: '🍋', fruitPrice: 30, grow: 800, xp: 60, unlock: 6, name: 'Lemon Tree' },
  durian: { emoji: '🟢', price: 1500, fruit: 'Durian', fruitEmoji: '🟢', fruitPrice: 90, grow: 2000, xp: 200, unlock: 16, name: 'Durian Tree' },
  starfruit: { emoji: '🌟', price: 1100, fruit: 'Starfruit', fruitEmoji: '🌟', fruitPrice: 65, grow: 1600, xp: 150, unlock: 13, name: 'Starfruit Tree' },
};

export interface AnimalDef {
  emoji: string;
  price: number;
  product: string;
  productEmoji: string;
  productTime: number;
  sell: number;
  unlock: number;
  name: string;
}

export const ANIMALS: Record<string, AnimalDef> = {
  chicken: { emoji: '🐔', price: 60,  product: 'Egg',   productEmoji: '🥚', productTime: 60,  sell: 8,  unlock: 1, name: 'Chicken' },
  cow:     { emoji: '🐄', price: 120, product: 'Milk',  productEmoji: '🥛', productTime: 120, sell: 18, unlock: 3, name: 'Cow' },
  sheep:   { emoji: '🐑', price: 200, product: 'Wool',  productEmoji: '🧶', productTime: 180, sell: 30, unlock: 5, name: 'Sheep' },
  pig:     { emoji: '🐖', price: 300, product: 'Bacon', productEmoji: '🥓', productTime: 240, sell: 45, unlock: 7, name: 'Pig' },
  duck:    { emoji: '🦆', price: 400, product: 'Egg',   productEmoji: '🥚', productTime: 300, sell: 60, unlock: 9, name: 'Duck' },
  goat:    { emoji: '🐐', price: 550, product: 'Milk',  productEmoji: '🥛', productTime: 360, sell: 80, unlock: 11, name: 'Goat' },
  horse:   { emoji: '🐎', price: 800, product: 'Mane',  productEmoji: '💇', productTime: 480, sell: 110, unlock: 13, name: 'Horse' },
  bee:     { emoji: '🐝', price: 1000, product: 'Honey', productEmoji: '🍯', productTime: 600, sell: 150, unlock: 15, name: 'Bee Hive' },
  turkey:  { emoji: '🦃', price: 450, product: 'Feather', productEmoji: '🪶', productTime: 270, sell: 50, unlock: 8, name: 'Turkey' },
  rabbit:  { emoji: '🐇', price: 350, product: 'Foot',  productEmoji: '🐾', productTime: 210, sell: 40, unlock: 6, name: 'Rabbit' },
  alpaca:  { emoji: '🦙', price: 650, product: 'Wool',  productEmoji: '🧶', productTime: 420, sell: 95, unlock: 12, name: 'Alpaca' },
  deer:    { emoji: '🦌', price: 900, product: 'Antler', productEmoji: '🦌', productTime: 540, sell: 130, unlock: 14, name: 'Deer' },
  peacock: { emoji: '🦚', price: 1200, product: 'Feather', productEmoji: '🪶', productTime: 660, sell: 170, unlock: 16, name: 'Peacock' },
  unicorn:  { emoji: '🦄', price: 3000, product: 'Magic Dust', productEmoji: '✨', productTime: 900, sell: 400, unlock: 20, name: 'Unicorn' },
};

export interface RecipeDef {
  id: string;
  name: string;
  emoji: string;
  ingredients: Record<string, number>;
  productEmoji: string;
  productPrice: number;
  craftTime: number;
  unlock: number;
}

export const RECIPES: RecipeDef[] = [
  { id: 'r1', name: 'Carrot Pie', emoji: '🥧', ingredients: { carrot: 3 }, productEmoji: '🥧', productPrice: 25, craftTime: 60, unlock: 2 },
  { id: 'r2', name: 'Corn Bread', emoji: '🍞', ingredients: { corn: 3 }, productEmoji: '🍞', productPrice: 40, craftTime: 90, unlock: 3 },
  { id: 'r3', name: 'Tomato Sauce', emoji: '🥫', ingredients: { tomato: 3 }, productEmoji: '🥫', productPrice: 65, craftTime: 120, unlock: 4 },
  { id: 'r4', name: 'Berry Jam', emoji: '🍯', ingredients: { strawberry: 3 }, productEmoji: '🍯', productPrice: 100, craftTime: 150, unlock: 5 },
  { id: 'r5', name: 'Pumpkin Soup', emoji: '🍲', ingredients: { pumpkin: 3 }, productEmoji: '🍲', productPrice: 180, craftTime: 180, unlock: 8 },
  { id: 'r6', name: 'Fruit Salad', emoji: '🥗', ingredients: { grape: 2, watermelon: 1 }, productEmoji: '🥗', productPrice: 350, craftTime: 240, unlock: 14 },
  { id: 'r7', name: 'Feast', emoji: '🍽️', ingredients: { pineapple: 2, broccoli: 2 }, productEmoji: '🍽️', productPrice: 600, craftTime: 300, unlock: 18 },
  { id: 'r8', name: 'Onion Rings', emoji: '🍟', ingredients: { onion: 3 }, productEmoji: '🍟', productPrice: 50, craftTime: 100, unlock: 4 },
  { id: 'r9', name: 'Mushroom Stew', emoji: '🍲', ingredients: { mushroom: 3 }, productEmoji: '🍲', productPrice: 120, craftTime: 160, unlock: 7 },
  { id: 'r10', name: 'Blueberry Muffin', emoji: '🧁', ingredients: { blueberry: 3, wheat: 2 }, productEmoji: '🧁', productPrice: 160, craftTime: 200, unlock: 9 },
  { id: 'r11', name: 'Chili Powder', emoji: '🧂', ingredients: { chili: 4 }, productEmoji: '🧂', productPrice: 220, craftTime: 220, unlock: 11 },
  { id: 'r12', name: 'Garlic Bread', emoji: '🥖', ingredients: { garlic: 2, wheat: 3 }, productEmoji: '🥖', productPrice: 140, craftTime: 170, unlock: 5 },
  { id: 'r13', name: 'Rice Cake', emoji: '🍚', ingredients: { rice: 3 }, productEmoji: '🍚', productPrice: 60, craftTime: 110, unlock: 4 },
  { id: 'r14', name: 'Cucumber Salad', emoji: '🥙', ingredients: { cucumber: 3, lettuce: 2 }, productEmoji: '🥙', productPrice: 90, craftTime: 140, unlock: 5 },
  { id: 'r15', name: 'Avocado Toast', emoji: '🥑', ingredients: { avocado: 2 }, productEmoji: '🥑', productPrice: 250, craftTime: 200, unlock: 13 },
  { id: 'r16', name: 'Star Smoothie', emoji: '🥤', ingredients: { starfruit: 2, blueberry: 2 }, productEmoji: '🥤', productPrice: 400, craftTime: 260, unlock: 17 },
  { id: 'r17', name: 'Sugarcane Syrup', emoji: '🍯', ingredients: { sugarcane: 3 }, productEmoji: '🍯', productPrice: 200, craftTime: 180, unlock: 12 },
  { id: 'r18', name: 'Lavender Tea', emoji: '🍵', ingredients: { lavender: 2 }, productEmoji: '🍵', productPrice: 180, craftTime: 160, unlock: 14 },
  { id: 'r19', name: 'Golden Pie', emoji: '🥧', ingredients: { goldenapple: 2, rice: 2 }, productEmoji: '🥧', productPrice: 500, craftTime: 280, unlock: 19 },
  { id: 'r20', name: 'Royal Feast', emoji: '👑', ingredients: { starfruit: 1, avocado: 1, sugarcane: 2, lavender: 1 }, productEmoji: '👑', productPrice: 800, craftTime: 350, unlock: 18 },
];

export interface DecorationDef {
  id: string;
  name: string;
  emoji: string;
  price: number;
  unlock: number;
  xp: number;
}

export const DECORATIONS: DecorationDef[] = [
  { id: 'd1', name: 'Scarecrow', emoji: '🧑‍🌾', price: 100, unlock: 2, xp: 15 },
  { id: 'd2', name: 'Fence', emoji: '🚧', price: 150, unlock: 3, xp: 20 },
  { id: 'd3', name: 'Garden Gnome', emoji: '🟢', price: 200, unlock: 4, xp: 25 },
  { id: 'd4', name: 'Pond', emoji: '💧', price: 300, unlock: 5, xp: 40 },
  { id: 'd5', name: 'Windmill', emoji: '🌬️', price: 500, unlock: 7, xp: 60 },
  { id: 'd6', name: 'Barn', emoji: '🏠', price: 800, unlock: 10, xp: 100 },
  { id: 'd7', name: 'Fountain', emoji: '⛲', price: 1000, unlock: 12, xp: 150 },
  { id: 'd8', name: 'Sun Statue', emoji: '🗿', price: 2000, unlock: 16, xp: 300 },
  { id: 'd9', name: 'Flower Bed', emoji: '🌷', price: 250, unlock: 3, xp: 30 },
  { id: 'd10', name: 'Lamppost', emoji: '💡', price: 400, unlock: 6, xp: 50 },
  { id: 'd11', name: 'Bridge', emoji: '🌉', price: 700, unlock: 9, xp: 80 },
  { id: 'd12', name: 'Greenhouse', emoji: '🏡', price: 1500, unlock: 14, xp: 200 },
  { id: 'd13', name: 'Topiary', emoji: '🌳', price: 600, unlock: 8, xp: 70 },
  { id: 'd14', name: 'Bird Bath', emoji: '🐦', price: 350, unlock: 6, xp: 45 },
  { id: 'd15', name: 'Gazebo', emoji: '🎪', price: 1200, unlock: 12, xp: 160 },
  { id: 'd16', name: 'Golden Well', emoji: '⛲', price: 3000, unlock: 18, xp: 400 },
  { id: 'd17', name: 'Rainbow Fountain', emoji: '🌈', price: 5000, unlock: 20, xp: 600 },
  { id: 'd18', name: 'Flower Arch', emoji: '🌸', price: 800, unlock: 10, xp: 100 },
];

export interface StallOrderDef {
  id: string;
  name: string;
  emoji: string;
  need: Record<string, number>;
  reward: number;
  xp: number;
  starReward: number;
}

export const STALL_ORDERS: StallOrderDef[] = [
  { id: 's1', name: 'Market Run', emoji: '🛒', need: { carrot: 3 }, reward: 30, xp: 10, starReward: 2 },
  { id: 's2', name: 'Bakery Order', emoji: '🥐', need: { corn: 4, carrot: 2 }, reward: 70, xp: 25, starReward: 3 },
  { id: 's3', name: 'Restaurant', emoji: '🍽️', need: { tomato: 3, corn: 2 }, reward: 120, xp: 40, starReward: 5 },
  { id: 's4', name: 'Festival', emoji: '🎪', need: { strawberry: 4, pumpkin: 2 }, reward: 250, xp: 80, starReward: 8 },
  { id: 's5', name: 'Export', emoji: '🚢', need: { grape: 3, watermelon: 2 }, reward: 400, xp: 120, starReward: 12 },
  { id: 's6', name: 'Royal Feast', emoji: '👑', need: { pineapple: 3, broccoli: 2, pepper: 2 }, reward: 800, xp: 250, starReward: 20 },
  { id: 's7', name: 'Soup Kitchen', emoji: '🍜', need: { onion: 4, mushroom: 3 }, reward: 180, xp: 60, starReward: 6 },
  { id: 's8', name: 'Bakery Rush', emoji: '🧁', need: { blueberry: 3, wheat: 4 }, reward: 300, xp: 100, starReward: 10 },
  { id: 's9', name: 'Spice Trade', emoji: '🌶️', need: { chili: 5, garlic: 3 }, reward: 500, xp: 150, starReward: 15 },
  { id: 's10', name: 'Sushi Bar', emoji: '🍣', need: { rice: 5, cucumber: 3 }, reward: 350, xp: 120, starReward: 12 },
  { id: 's11', name: 'Cafe Order', emoji: '☕', need: { lavender: 3, sugarcane: 2 }, reward: 450, xp: 140, starReward: 14 },
  { id: 's12', name: 'Fruit Market', emoji: '🥭', need: { avocado: 3, starfruit: 1 }, reward: 700, xp: 200, starReward: 18 },
  { id: 's13', name: 'Royal Banquet', emoji: '👑', need: { goldenapple: 2, starfruit: 2, avocado: 2 }, reward: 1200, xp: 350, starReward: 25 },
];

export interface PowerUpDef {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  gemCost: number;
  duration: number;
}

export const POWERUPS: PowerUpDef[] = [
  { id: 'instant', name: 'Instant Grow', emoji: '⚡', desc: 'All planted crops ready now!', gemCost: 5, duration: 0 },
  { id: 'double', name: 'Double Coins', emoji: '💰', desc: '2x coins for 2 minutes', gemCost: 3, duration: 120 },
  { id: 'nowither', name: 'No Wither', emoji: '🛡️', desc: 'Crops never wither for 5 min', gemCost: 2, duration: 300 },
  { id: 'autoharvest', name: 'Auto Harvest', emoji: '🤖', desc: 'Auto-harvest ready crops for 3 min', gemCost: 4, duration: 180 },
  { id: 'triple', name: 'Triple Coins', emoji: '💎', desc: '3x coins for 1 minute', gemCost: 6, duration: 60 },
  { id: 'megagrow', name: 'Mega Grow', emoji: '🌟', desc: 'Instantly grow AND harvest all crops!', gemCost: 8, duration: 0 },
];

export interface FarmHandDef {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  gemCost: number;
}

export const FARM_HANDS: FarmHandDef[] = [
  { id: 'h1', name: 'Harvest Helper', emoji: '🧑‍🌾', desc: 'Auto-harvests ready crops every 30s', gemCost: 10 },
  { id: 'h2', name: 'Animal Keeper', emoji: '👨‍🌾', desc: 'Auto-collects animal products every 60s', gemCost: 15 },
  { id: 'h3', name: 'Master Gardener', emoji: '👩‍🌾', desc: 'Auto-plants empty plots with best seed', gemCost: 25 },
];

export interface AchievementDef {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  check: (d: QuestData) => boolean;
  reward: number;
}

export interface QuestData {
  totalHarvested: number;
  totalCoinsEarned: number;
  animalCollects: number;
  treesHarvested: number;
  expansions: number;
  uniqueCrops: number;
  recipesCrafted: number;
  ordersCompleted: number;
  decorationsOwned: number;
  highestLevel: number;
  powerupsUsed: number;
  gemsSpent: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'a1', name: 'Seedling', emoji: '🌱', desc: 'Harvest your first crop', check: d => d.totalHarvested >= 1, reward: 10 },
  { id: 'a2', name: 'Green Thumb', emoji: '👍', desc: 'Harvest 50 crops', check: d => d.totalHarvested >= 50, reward: 100 },
  { id: 'a3', name: 'Harvest King', emoji: '👑', desc: 'Harvest 250 crops', check: d => d.totalHarvested >= 250, reward: 500 },
  { id: 'a4', name: 'Animal Whisperer', emoji: '🐾', desc: 'Collect 30 times', check: d => d.animalCollects >= 30, reward: 150 },
  { id: 'a5', name: 'Orchard Master', emoji: '🌳', desc: 'Harvest 20 fruits', check: d => d.treesHarvested >= 20, reward: 200 },
  { id: 'a6', name: 'Craftsman', emoji: '🔨', desc: 'Craft 10 recipes', check: d => d.recipesCrafted >= 10, reward: 200 },
  { id: 'a7', name: 'Merchant', emoji: '💰', desc: 'Complete 5 stall orders', check: d => d.ordersCompleted >= 5, reward: 300 },
  { id: 'a8', name: 'Decorator', emoji: '🎨', desc: 'Own 5 decorations', check: d => d.decorationsOwned >= 5, reward: 250 },
  { id: 'a9', name: 'Tycoon', emoji: '💎', desc: 'Earn 2000 total coins', check: d => d.totalCoinsEarned >= 2000, reward: 400 },
  { id: 'a10', name: 'Farmer of the Year', emoji: '🏆', desc: 'Reach Level 15', check: d => d.highestLevel >= 15, reward: 1000 },
  { id: 'a11', name: 'Power Player', emoji: '⚡', desc: 'Use 5 power-ups', check: d => d.powerupsUsed >= 5, reward: 200 },
  { id: 'a12', name: 'Gem Hoarder', emoji: '💠', desc: 'Spend 20 gems', check: d => d.gemsSpent >= 20, reward: 300 },
  { id: 'a13', name: 'Crop Encyclopedia', emoji: '📖', desc: 'Harvest 10 different crops', check: d => d.uniqueCrops >= 10, reward: 350 },
  { id: 'a14', name: 'Millionaire', emoji: '🤑', desc: 'Earn 5000 total coins', check: d => d.totalCoinsEarned >= 5000, reward: 1000 },
  { id: 'a15', name: 'Crop God', emoji: '🌾', desc: 'Harvest 1000 crops', check: d => d.totalHarvested >= 1000, reward: 2000 },
  { id: 'a16', name: 'Unicorn Friend', emoji: '🦄', desc: 'Reach Level 20', check: d => d.highestLevel >= 20, reward: 2000 },
  { id: 'a17', name: 'Master Chef', emoji: '👨‍🍳', desc: 'Craft 25 recipes', check: d => d.recipesCrafted >= 25, reward: 800 },
  { id: 'a18', name: 'Trade Empire', emoji: '🏛️', desc: 'Complete 15 stall orders', check: d => d.ordersCompleted >= 15, reward: 1000 },
  { id: 'a19', name: 'Zookeeper', emoji: '🦁', desc: 'Collect from animals 100 times', check: d => d.animalCollects >= 100, reward: 800 },
  { id: 'a20', name: 'Orchard Empire', emoji: '🌴', desc: 'Harvest 50 fruits', check: d => d.treesHarvested >= 50, reward: 600 },
];

export const QUESTS: { id: string; name: string; emoji: string; desc: string; check: (d: QuestData) => boolean; reward: number; xp: number; starReward: number }[] = [
  { id: 'q1', name: 'First Harvest', emoji: '🌾', desc: 'Harvest 5 crops', check: d => d.totalHarvested >= 5, reward: 50, xp: 20, starReward: 3 },
  { id: 'q2', name: 'Farm Hand', emoji: '🚜', desc: 'Harvest 25 crops', check: d => d.totalHarvested >= 25, reward: 100, xp: 40, starReward: 5 },
  { id: 'q3', name: 'Animal Lover', emoji: '🐾', desc: 'Collect from animals 10 times', check: d => d.animalCollects >= 10, reward: 80, xp: 30, starReward: 4 },
  { id: 'q4', name: 'Orchard', emoji: '🌳', desc: 'Harvest 5 tree fruits', check: d => d.treesHarvested >= 5, reward: 120, xp: 50, starReward: 5 },
  { id: 'q5', name: 'Tycoon', emoji: '💰', desc: 'Earn 500 total coins', check: d => d.totalCoinsEarned >= 500, reward: 100, xp: 40, starReward: 5 },
  { id: 'q6', name: 'Variety', emoji: '🌈', desc: 'Harvest 5 different crops', check: d => d.uniqueCrops >= 5, reward: 150, xp: 60, starReward: 8 },
  { id: 'q7', name: 'Big Farm', emoji: '📐', desc: 'Expand your farm once', check: d => d.expansions >= 1, reward: 200, xp: 80, starReward: 10 },
  { id: 'q8', name: 'Master Farmer', emoji: '👑', desc: 'Harvest 100 crops', check: d => d.totalHarvested >= 100, reward: 500, xp: 200, starReward: 20 },
  { id: 'q9', name: 'Crafty', emoji: '🔨', desc: 'Craft your first recipe', check: d => d.recipesCrafted >= 1, reward: 100, xp: 40, starReward: 5 },
  { id: 'q10', name: 'Trader', emoji: '🏪', desc: 'Complete 3 stall orders', check: d => d.ordersCompleted >= 3, reward: 200, xp: 80, starReward: 10 },
  { id: 'q11', name: 'Power Up', emoji: '⚡', desc: 'Use your first power-up', check: d => d.powerupsUsed >= 1, reward: 80, xp: 30, starReward: 5 },
  { id: 'q12', name: 'Diversified', emoji: '📚', desc: 'Harvest 8 different crops', check: d => d.uniqueCrops >= 8, reward: 250, xp: 100, starReward: 12 },
  { id: 'q13', name: 'Stall Master', emoji: '🏪', desc: 'Complete 6 stall orders', check: d => d.ordersCompleted >= 6, reward: 300, xp: 120, starReward: 15 },
  { id: 'q14', name: 'Craft Master', emoji: '🔨', desc: 'Craft 5 recipes', check: d => d.recipesCrafted >= 5, reward: 250, xp: 100, starReward: 12 },
  { id: 'q15', name: 'Rice Farmer', emoji: '🍚', desc: 'Harvest 10 rice', check: d => d.totalHarvested >= 10, reward: 120, xp: 50, starReward: 6 },
  { id: 'q16', name: 'Orchard Empire', emoji: '🌴', desc: 'Harvest 15 fruits', check: d => d.treesHarvested >= 15, reward: 300, xp: 120, starReward: 15 },
  { id: 'q17', name: 'Wealthy', emoji: '💰', desc: 'Earn 2000 total coins', check: d => d.totalCoinsEarned >= 2000, reward: 400, xp: 150, starReward: 15 },
  { id: 'q18', name: 'Crop Diversity', emoji: '🌍', desc: 'Harvest 12 different crops', check: d => d.uniqueCrops >= 12, reward: 400, xp: 150, starReward: 18 },
  { id: 'q19', name: 'Stall Tycoon', emoji: '🏪', desc: 'Complete 10 stall orders', check: d => d.ordersCompleted >= 10, reward: 500, xp: 200, starReward: 20 },
  { id: 'q20', name: 'Legendary Farmer', emoji: '👑', desc: 'Harvest 500 crops', check: d => d.totalHarvested >= 500, reward: 1000, xp: 400, starReward: 40 },
];

export const EXPANDS = [
  { from: 5, to: 6, cost: 500,  unlock: 5 },
  { from: 6, to: 7, cost: 1200, unlock: 10 },
  { from: 7, to: 8, cost: 2500, unlock: 15 },
  { from: 8, to: 9, cost: 5000, unlock: 20 },
];

export const STAGES = ['🌱', '🌿', '🌾', '🌻'];

export const FERTILIZER_PRICE = 50;
export const FERTILIZER_SPEED = 2;

export const SEASONS = [
  { id: 'spring', name: 'Spring', emoji: '🌸', bonus: 'Spring crops grow 1.2x faster', speedBonus: 1.2 },
  { id: 'summer', name: 'Summer', emoji: '☀️', bonus: 'Summer crops grow 1.2x faster', speedBonus: 1.2 },
  { id: 'autumn', name: 'Autumn', emoji: '🍂', bonus: 'Autumn crops grow 1.2x faster', speedBonus: 1.2 },
  { id: 'winter', name: 'Winter', emoji: '❄️', bonus: 'Winter crops grow 1.2x faster', speedBonus: 1.2 },
];

export const WEATHER_EVENTS = [
  { id: 'sunny', name: 'Sunny', emoji: '☀️', desc: 'Crops grow 1.5x faster!', speed: 1.5, unlock: 1 },
  { id: 'rainy', name: 'Rainy', emoji: '🌧️', desc: 'Animals produce 2x faster!', speed: 1, unlock: 2 },
  { id: 'foggy', name: 'Foggy', emoji: '🌫️', desc: 'Normal speed', speed: 1, unlock: 1 },
  { id: 'rainbow', name: 'Rainbow', emoji: '🌈', desc: '2x coins on harvest!', speed: 1, unlock: 5 },
  { id: 'storm', name: 'Storm', emoji: '⛈️', desc: 'Crops grow 2x but wither 2x faster!', speed: 2, unlock: 8 },
  { id: 'breeze', name: 'Breeze', emoji: '🍃', desc: 'Trees grow 1.5x faster!', speed: 1, unlock: 3 },
];

export function xpNeeded(level: number): number {
  return level * 100;
}

export function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}
