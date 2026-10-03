export type Difficulty = 'easy' | 'medium' | 'hard' | 'very-hard';

export const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard', 'very-hard'];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  'very-hard': 'Very Hard',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'from-green-400 to-candy-mint',
  medium: 'from-candy-yellow to-candy-green',
  hard: 'from-candy-pink to-candy-purple',
  'very-hard': 'from-red-500 to-candy-pink',
};

export const DIFFICULTY_EMOJIS: Record<Difficulty, string> = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴',
  'very-hard': '🟣',
};

// Stage difficulty: alternate easy/medium, hard every 5, very-hard every 10
export function getDifficultyForStage(stage: number): Difficulty {
  if (stage % 10 === 0) return 'very-hard';
  if (stage % 5 === 0) return 'hard';
  return stage % 2 === 0 ? 'medium' : 'easy';
}

// Which stages are "checkpoint" (special difficulty) stages
export function isCheckpointStage(stage: number): boolean {
  return stage % 5 === 0;
}

export function getCheckpointType(stage: number): 'hard' | 'very-hard' | null {
  if (stage % 10 === 0) return 'very-hard';
  if (stage % 5 === 0) return 'hard';
  return null;
}

export const TOTAL_STAGES = 999;
export const STAGES_PER_PAGE = 20;

// Expanded animal pool with English names
export const ANIMALS = [
  { emoji: '🐶', name: 'Dog', tl: 'Aso', sound: 'dog' },
  { emoji: '🐱', name: 'Cat', tl: 'Pusa', sound: 'cat' },
  { emoji: '🐰', name: 'Rabbit', tl: 'Konejo', sound: 'rabbit' },
  { emoji: '🐭', name: 'Mouse', tl: 'Daga', sound: 'mouse' },
  { emoji: '🐮', name: 'Cow', tl: 'Baka', sound: 'cow' },
  { emoji: '🐷', name: 'Pig', tl: 'Baboy', sound: 'pig' },
  { emoji: '🐔', name: 'Chicken', tl: 'Manok', sound: 'chicken' },
  { emoji: '🦆', name: 'Duck', tl: 'Bibe', sound: 'duck' },
  { emoji: '🐑', name: 'Sheep', tl: 'Tupa', sound: 'sheep' },
  { emoji: '🐴', name: 'Horse', tl: 'Kabayo', sound: 'horse' },
  { emoji: '🦁', name: 'Lion', tl: 'Leon', sound: 'lion' },
  { emoji: '🐯', name: 'Tiger', tl: 'Tigre', sound: 'tiger' },
  { emoji: '🐘', name: 'Elephant', tl: 'Elepante', sound: 'elephant' },
  { emoji: '🐸', name: 'Frog', tl: 'Palaka', sound: 'frog' },
  { emoji: '🐦', name: 'Bird', tl: 'Ibon', sound: 'bird' },
  { emoji: '🐝', name: 'Bee', tl: 'Bubuyog', sound: 'bee' },
  { emoji: '🦎', name: 'Lizard', tl: 'Butiki', sound: 'lizard' },
  { emoji: '🐍', name: 'Snake', tl: 'Ahas', sound: 'snake' },
  { emoji: '🐟', name: 'Fish', tl: 'Isda', sound: 'fish' },
  { emoji: '🐙', name: 'Octopus', tl: 'Pugita', sound: 'octopus' },
  { emoji: '🦉', name: 'Owl', tl: 'Kuwago', sound: 'owl' },
  { emoji: '🦇', name: 'Bat', tl: 'Paniki', sound: 'bat' },
  { emoji: '🐺', name: 'Wolf', tl: 'Lobo', sound: 'wolf' },
  { emoji: '🦊', name: 'Fox', tl: 'Soro', sound: 'fox' },
  { emoji: '🐻', name: 'Bear', tl: 'Oso', sound: 'bear' },
  { emoji: '🐼', name: 'Panda', tl: 'Panda', sound: 'panda' },
  { emoji: '🐨', name: 'Koala', tl: 'Koala', sound: 'koala' },
  { emoji: '🐢', name: 'Turtle', tl: 'Pagong', sound: 'turtle' },
  { emoji: '🦒', name: 'Giraffe', tl: 'Hirap', sound: 'giraffe' },
  { emoji: '🦓', name: 'Zebra', tl: 'Zebra', sound: 'zebra' },
  { emoji: '🦏', name: 'Rhinoceros', tl: 'Rino', sound: 'rhino' },
  { emoji: '🦛', name: 'Hippo', tl: 'Hippo', sound: 'hippo' },
  { emoji: '🐊', name: 'Crocodile', tl: 'Buwaya', sound: 'crocodile' },
  { emoji: '🦅', name: 'Eagle', tl: 'Agila', sound: 'eagle' },
  { emoji: '🦜', name: 'Parrot', tl: 'Loro', sound: 'parrot' },
  { emoji: '🦢', name: 'Swan', tl: 'Ibong Adarna', sound: 'swan' },
  { emoji: '🦩', name: 'Flamingo', tl: 'Flamingo', sound: 'flamingo' },
  { emoji: '🐧', name: 'Penguin', tl: 'Penguino', sound: 'penguin' },
  { emoji: '🐬', name: 'Dolphin', tl: 'Lumba-lumba', sound: 'dolphin' },
  { emoji: '🐳', name: 'Whale', tl: 'Balyena', sound: 'whale' },
  { emoji: '🦈', name: 'Shark', tl: 'Pating', sound: 'shark' },
  { emoji: '🦋', name: 'Butterfly', tl: 'Paruparo', sound: 'butterfly' },
  { emoji: '🐌', name: 'Snail', tl: 'Kuhol', sound: 'snail' },
  { emoji: '🐞', name: 'Ladybug', tl: 'Kuting-kuting', sound: 'ladybug' },
  { emoji: '🦗', name: 'Cricket', tl: 'Grillo', sound: 'cricket' },
  { emoji: '🕷️', name: 'Spider', tl: 'Gagamba', sound: 'spider' },
  { emoji: '🦂', name: 'Scorpion', tl: 'Alakdan', sound: 'scorpion' },
  { emoji: '🦭', name: 'Seal', tl: 'Kanding-dagat', sound: 'seal' },
  { emoji: '🦘', name: 'Kangaroo', tl: 'Kangaroo', sound: 'kangaroo' },
  { emoji: '🦡', name: 'Badger', tl: 'Badger', sound: 'badger' },
];

export const COLORS = [
  { name: 'Red', tl: 'Pula', hex: '#ef4444' },
  { name: 'Blue', tl: 'Asul', hex: '#3b82f6' },
  { name: 'Green', tl: 'Berde', hex: '#22c55e' },
  { name: 'Yellow', tl: 'Dilaw', hex: '#eab308' },
  { name: 'Orange', tl: 'Kahel', hex: '#f97316' },
  { name: 'Purple', tl: 'Lila', hex: '#a855f7' },
  { name: 'Pink', tl: 'Rosas', hex: '#ec4899' },
  { name: 'Brown', tl: 'Kayumanggi', hex: '#92400e' },
  { name: 'Black', tl: 'Itim', hex: '#1f2937' },
  { name: 'White', tl: 'Puti', hex: '#f9fafb' },
  { name: 'Gray', tl: 'Abu', hex: '#6b7280' },
  { name: 'Cyan', tl: 'Tisa', hex: '#06b6d4' },
  { name: 'Mint', tl: 'Mint', hex: '#4ecdc4' },
  { name: 'Lavender', tl: 'Lavender', hex: '#b794f4' },
  { name: 'Gold', tl: 'Ginto', hex: '#f59e0b' },
  { name: 'Coral', tl: 'Koral', hex: '#fb7185' },
  { name: 'Teal', tl: 'Teal', hex: '#14b8a6' },
  { name: 'Indigo', tl: 'Indigo', hex: '#6366f1' },
  { name: 'Lime', tl: 'Lime', hex: '#84cc16' },
  { name: 'Maroon', tl: 'Maroon', hex: '#7c2d12' },
  { name: 'Navy', tl: 'Navy', hex: '#1e3a8a' },
  { name: 'Olive', tl: 'Olive', hex: '#65734e' },
  { name: 'Peach', tl: 'Peach', hex: '#fda4af' },
  { name: 'Silver', tl: 'Pilak', hex: '#d1d5db' },
];

export const SHAPES = [
  { name: 'Circle', tl: 'Bilog', emoji: '🔵' },
  { name: 'Square', tl: 'Square', emoji: '🟦' },
  { name: 'Triangle', tl: 'Triangle', emoji: '🔺' },
  { name: 'Star', tl: 'Bituin', emoji: '⭐' },
  { name: 'Heart', tl: 'Puso', emoji: '❤️' },
  { name: 'Diamond', tl: 'Diamond', emoji: '🔷' },
  { name: 'Pentagon', tl: 'Pentagon', emoji: '⬟' },
  { name: 'Hexagon', tl: 'Hexagon', emoji: '⬢' },
  { name: 'Cross', tl: 'Krus', emoji: '✚' },
  { name: 'Arrow', tl: 'Arrow', emoji: '➡️' },
  { name: 'Crescent', tl: 'Buwan', emoji: '🌙' },
  { name: 'Cloud', tl: 'Ulap', emoji: '☁️' },
  { name: 'Rectangle', tl: 'Parihaba', emoji: '▬' },
  { name: 'Oval', tl: 'Itlog', emoji: '🥚' },
  { name: 'Cylinder', tl: 'Silindro', emoji: '🥫' },
  { name: 'Cone', tl: 'Kono', emoji: '📐' },
  { name: 'Ring', tl: 'Ring', emoji: '⭕' },
  { name: 'Target', tl: 'Target', emoji: '🎯' },
  { name: 'Octagon', tl: 'Octagon', emoji: '🛑' },
  { name: 'Cube', tl: 'Cube', emoji: '🧊' },
  { name: 'Pyramid', tl: 'Pyramid', emoji: '🔻' },
  { name: 'Rhombus', tl: 'Rhombus', emoji: '💠' },
  { name: 'Bolt', tl: 'Kidlat', emoji: '⚡' },
  { name: 'Drop', tl: 'Patak', emoji: '💧' },
  { name: 'Gem', tl: 'Hiyas', emoji: '💎' },
  { name: 'Sun', tl: 'Araw', emoji: '☀️' },
  { name: 'Umbrella', tl: 'Payong', emoji: '☂️' },
];

// 50 colors used to generate different shape "pictures" each round
export const SHAPE_COLORS = [
  '#ef4444','#f97316','#f59e0b','#eab308','#fde047','#a3e635','#84cc16','#22c55e','#16a34a','#10b981',
  '#14b8a6','#06b6d4','#0ea5e9','#38bdf8','#3b82f6','#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899',
  '#f43f5e','#fb7185','#fda4af','#fbbf24','#fdba74','#fca5a5','#e879f9','#c084fc','#f472b6','#f9a8d4',
  '#fbcfe8','#bae6fd','#a5f3fc','#67e8f9','#99f6e4','#6ee7b7','#86efac','#bef264','#fde68a','#fef08a',
  '#fecaca','#f3e8ff','#ddd6fe','#fae8ff','#f5f5f4','#d6d3d1','#78716c','#57534e','#292524','#111827',
];

// Look-alike letters used as harder balloon distractors
export const SIMILAR_LETTERS: Record<string, string[]> = {
  A: ['V', 'W'], B: ['D', 'P', 'R'], C: ['G', 'O'], D: ['B', 'P'], E: ['F'],
  F: ['E', 'T'], G: ['C', 'O'], H: ['N', 'K'], I: ['J', 'T'], J: ['I', 'T'],
  K: ['H', 'X'], L: ['T', 'I'], M: ['N', 'W'], N: ['M', 'H'], O: ['Q', 'C'],
  P: ['B', 'D'], Q: ['O', 'G'], R: ['P', 'B'], S: ['Z', 'E'], T: ['F', 'I'],
  U: ['V', 'W'], V: ['U', 'A'], W: ['M', 'V'], X: ['K', 'Y'], Y: ['X'], Z: ['S', 'E'],
};

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const NUMBERS = Array.from({ length: 100 }, (_, i) => i + 1);

// Greatly expanded word pools
export const WORDS_3 = ['CAT','DOG','SUN','BAT','PIG','COW','FOX','OWL','ANT','BEE','HEN','RAT','BUN','CUP','HAT','MAP','JAR','PEN','BAG','TOY','KEY','EGG','FAN','BUS','CAR','BED','BOX','CAN','JAM','TAP','POT','PAN','RUG','MUG','LOG','WEB','SKY','SEA','TEN','TWO','SIX','ARM','LEG','EAR','EYE','LIP','GUM','HAM','JET','SKI','FLY','BUG','RIB','HIP','LID','INK','OAK','RAY','BAR','CAB','DAB','GAS','GUN','HUT','ICE','KID','LIP','MOM','DAD','NET','NUT','OAR','PAD','PIE','RAM','SAD','TAR','VAN','WAX','YAM','ZIP','ZOO','DEN','FAT','GEM','HOP','JOG','KID','LAB','MUD','NIB','ORE','PIT','RIM','SAP','TIC','URN','VET','WIG','YAK','ZAP'];
export const WORDS_4 = ['FISH','BIRD','FROG','LION','BEAR','DEER','GOAT','DUCK','CRAB','WOLF','SHIP','MOON','STAR','TREE','LEAF','RAIN','SNOW','WIND','FIRE','CAKE','MILK','RICE','SOUP','BALL','RING','KITE','DOLL','DRUM','FORK','LAMP','BOOK','DOOR','ROOM','ROAD','CITY','FARM','PARK','LAKE','HILL','ROCK','SAND','DUST','GOLD','IRON','WOOD','GLAS','SHOE','SOCK','COAT','HAT','VEIL','LION','LAMB','SEAL','WORM','MOTH','CRAB','CLAM','REEF','WAVE','TIDE','POOL','POND','CREE','RIVE','BOAT','RAFT','MAST','SAIL','DECK','HULL','PORT','DOCK','ANCH','WAVE','FOAM','SALT','KELP','CORAL','SHEL','PEAR','OYST','SQUID','KRIL','PLANK','ALGAE','REEF','TIDE','SAND','DUNE','BAY','COVE','CAPE','HARB','PIER','WAVE','BOAT','FISH','NET','ROD','BAIT','HOOK','LINE','SINK','FLOAT','TACKLE','LURE','FIN','GILL','TAIL','SCALE','SHELL','SAND','REEF','WAVE','TIDE','MOON','STAR','DAWN','DUSK','NOON','TIME','HOUR','WEEK','YEAR','MONTH','DAY','NITE','DAWN','SUN','MOON','STAR','SKY','CLOUD','RAIN','SNOW','WIND','HAIL','MIST','FOG','DEW','FROST','STORM','CALM','WAVE','TIDE','POOL','POND','LAKE','RIVER','SEA','OCEAN','GULF','BAY','COVE','CAPE','REEF','SAND','DUNE','HILL','MOUNT','ROCK','STONE','PEAK','CLIFF','VALLEY','PLAIN','FIELD','MEADOW','GRASS','TREE','LEAF','BARK','ROOT','SEED','BUD','BLOOM','FLOWER','FRUIT','BERRY','NUT','ACORN','PINE','OAK','MAPLE','BIRCH','WILLOW','CEDAR','FERN','MOSS','VINE','BUSH','SHRUB','THORN','STem','TWIG','BRANCH','LIMB','TRUNK','GROVE','WOOD','FOREST','JUNGLE','DESERT','TUNDRA','SAVANNA','PRAIRIE','MARSH','SWAMP','BOG','POND','LAKE','RIVER','STREAM','CREEK','BROOK','RAPIDS','FALLS','POOL','POND','SPRING','WELL','OASIS','GEYSER','GLACIER','ICEBERG','AVALANCHE','BLIZZARD','TORNADO','HURRICANE','TYPHOON','MONSOON','DROUGHT','FLOOD','EARTHQUAKE','VOLCANO','ERUPTION','LAVA','MAGMA','ASH','SMOKE','STEAM','FIRE','FLAME','SPARK','EMBER','BLAZE','INFERNO','HEAT','WARM','COOL','COLD','FREEZE','MELT','BOIL','EVAPORATE','CONDENSE','PRECIPITATE','COLLECT','GATHER','STORE','PACK','WRAP','TIE','BIND','KNOT','LACE','STRING','ROPE','CABLE','WIRE','CHAIN','LINK','HOOK','CLIP','PIN','NAIL','SCREW','BOLT','RIVET','WELD','SOLDER','GLUE','PASTE','TAPE','STICK','JOIN','MERGE','BLEND','MIX','STIR','SHAKE','POUR','SPILL','DRIP','DROP','SPLASH','PUDDLE','STREAM','FLOW','CURRENT','TIDE','WAVE','RIPPLE','SWELL','SURGE','FLOOD','DRAIN','SINK','FLOAT','BOB','DRIFT','GLIDE','SLIDE','SLIP','SKID','ROLL','SPIN','TURN','TWIST','BEND','FOLD','CREASE','WRINKLE','CRUMPLE','FLATTEN','SMOOTH','POLISH','SHINE','GLOW','GLEAM','GLINT','SPARKLE','SHIMMER','FLASH','FLICKER','BLINK','WINK','STARE','LOOK','SEE','WATCH','VIEW','GAZE','PEEK','GLANCE','STUDY','READ','WRITE','DRAW','PAINT','COLOR','SKETCH','DOODLE','TRACE','COPY','PRINT','TYPE','ERASE','WIPE','CLEAN','WASH','RINSE','SCRUB','SOAK','DRAIN','DRY','WIPE','DUST','MOP','SWEEP','VACUUM','POLISH','SHINE','BUFF','WAX','COAT','PAINT','STAIN','VARNISH','SEAL','FINISH','SAND','GRIND','CUT','SLICE','CHOP','DICE','MINCE','MASH','CRUSH','SMASH','BREAK','CRACK','SPLIT','TEAR','RIP','SHRED','CUT','SNIP','CLIP','TRIM','SHAVE','PEEL','SKIN','SHELL','HUSK','POD','SEED','PIT','CORE','STEM','STALK','LEAF','PETAL','BLOOM','BUD','SPROUT','SHOOT','ROOT','BULB','TUBER','RHIZOME','STOLON','RUNNER','VINE','CREEPER','CLIMBER','EPiphyte','BROMELIAD','ORCHID','LILY','ROSE','TULIP','DAISY','SUNFLOWER','DAFFODIL','IRIS','POPPY','VIOLET','LAVENDER','JASMINE','HIBISCUS','FRANGIPANI','BOUGAINVILLEA','CARNATION','PEONY','MARIGOLD','ZINNIA','PETUNIA','GERANIUM','FUCHSIA','BEGONIA','IMPATIENS','COLEUS','FERN','MOSS','LIVERWORT','HORNWORT','ALGAE','KELP','SEAWEED','CORAL','SPONGE','JELLYFISH','ANEMONE','STARFISH','URCHIN','SEA CUCUMBER','WORM','LEECH','SNAIL','SLUG','CLAM','OYSTER','MUSSEL','SCALLOP','PERIWINKLE','CONCH','WHELK','COWRIE','NAUTILUS','OCTOPUS','SQUID','CUTTLEFISH','CHAMBERED NAUTILUS','DOLPHIN','PORPOISE','WHALE','SHARK','RAY','SKATE','EEL','TUNA','SALMON','COD','HADDOCK','FLOUNDER','SOLE','TROUT','BASS','PIKE','PERCH','CRAPPIE','BLUEGILL','SUNFISH','CATFISH','STURGEON','PADDLEFISH','GAR','BOWFIN','LAMPREY','HAGFISH','LANCELET','SEA LANCELET','AMPHIOXUS','TUNICATE','LANCELET','SEA SQUIRT','SALP','DOLIOLID','PYROSOME','CTENOPHORE','COMB JELLY','SIPHONOPHORE','PORTUGUESE MAN O WAR','BY-THE-WIND SAILOR','VELLELA','SIPHONOPHORE','HYDROID','HYDRA','OBELIA','PORTUGUESE MAN O WAR','SEA WASP','BOX JELLY','MOON JELLY','LION MANE JELLY','SEA NETTLE','CANNONBALL JELLY','COMB JELLY','BEROE','MNEMIOPSIS','PLEUROBRACHIA','CTENOPHORE'];
export const WORDS_5 = ['HORSE','TIGER','ZEBRA','PANDA','SNAKE','MOUSE','EAGLE','SHARK','WHALE','CLOUD','RIVER','OCEAN','BEACH','HOUSE','CHAIR','TABLE','PHONE','BREAD','APPLE','MANGO','CANDY','HAPPY','SMILE','DREAM','LIGHT','MUSIC','DANCE','GAMES','TRAIN','PLANE','TRUCK','CYCLE','BOATS','BEARS','SHEEP','GOOSE','MOOSE','DEERS','CRANE','HERON','STORK','SWANS','GECKO','SKINK','IBIS','RAVEN','ROBIN','WRENS','LARKS','FINCH','SWIFT','DRAKE','QUAIL','COOTS','RAILS','HERON','STORK','IBISES','BITTERN','EGRET','SPOONBILL','FLAMINGO','PELICAN','CORMORANT','FRIGATEBIRD','GANNET','BOOBY','TROPICBIRD','SKIMMER','AUKLET','PUFFIN','MURRELET','GUILLEMOT','RAZORBILL','DOVEKIE','PTARMIGAN','PHEASANT','GROUSE','TURKEY','GUINEAFOWL','MEGAPODE','CUCKOO','ROADRUNNER','ANIS','HOOPOE','KINGFISHER','HORNBILL','BEE-EATER','ROLLER','MOTMOT','TODY','TROGON','QUETZAL','BARBET','TOUCAN','HONEYGUIDE','WOODPECKER','JACAMAR','PUFFBIRD','FURNARIID','OVENBIRD','WOODCREEPER','ANTBIRD','ANTSHRIKE','ANTWREN','ANTPITTA','GNATEATER','TAPACULO','COTINGA','FRUITEATER','BERRYGUAN','SHRIKE','VIREO','SHRIKE-VIREO','JAY','MAGPIE','NUTCRACKER','CROW','RAVEN','STARLING','MYNA','MOCKINGBIRD','THRASHER','CATBIRD','WREN','GNATCATCHER','KINGLETS','DIPPER','THRUSH','ROBIN','BLUEBIRD','NIGHTINGALE','WHEATEAR','STONECHAT','OLDBIRD','FLYCATCHER','TYRANNULID','COTINGA','MANAKIN','TANAGER','EMBERIZID','CARDINAL','BUNTING','FINCH','GROSBEAK','SPARROW','WARBLER','STARLING','WAXBILL','WAXBILL','WIDOWBIRD','WHYDAH','INDIGOBIRD','FIREFINCH','WAXBILL','AVADAVAT','MUNIA','SPARROW','SNOWFINCH','GOLDFINCH','SISKIN','TWITE','LINNET','SERIN','CITRIL','GOLDFINCH','GREENFINCH','HAWFINCH','BULLFINCH','ROSEFINCH','CROSSBILL','BRAMBLING','BUNTING','TANAGER','CARDINAL','GROSBEAK','DICKCISSEL','YELLOWTHROAT','CHAT','WARBLER','VIREO','SHRIKE','FLYCATCHER','PHOEBE','PEWEE','KINGBIRD','EMPIDONAX','WOODPEWER','FOLIAGE','CANOPY','BRANCH','TIMBER','SHRUB','THICKET','GROVE','MEADOW','PASTURE','PRAIRIE','GRASSLAND','SAVANNA','STEPPE','TUNDRA','TAIGA','FOREST','WOODLAND','JUNGLE','RAIN FOREST','CLOUD FOREST','MANGROVE','SWAMP','MARSH','BOG','FEN','MIRES','POND','LAKE','POTHOLE','SLough','BAYOU','CREEK','STREAM','BROOK','RIVULET','TRIBUTARY','RIVER','DRAINAGE','WATERSHED','BASIN','DELTA','ESTUARY','FJORD','GULF','BAY','BIGHT','SOUND','STRAIT','CHANNEL','PASSAGE','GUT','INLET','COVE','HARBOR','ANCHORAGE','ROADSTEAD','ROADS','MOORING','BERTH','SLIP','WHARF','PIER','DOCK','QUAY','JETTY','BREAKWATER','GROIN','SEAWALL','BULKHEAD','RIPRAP','REVETMENT','LEVEE','DIKE','DAM','WEIR','SPILLWAY','SLUICE','LOCK','CANAL','AQUEDUCT','FLUME','PENSTOCK','TAILRACE','HEADRACE','RACEWAY','CULVERT','DRAIN','DITCH','TRENCH','SWALE','BERM','BANK','SHORE','BEACH','STRAND','SHINGLE','COBBLE','BOULDER','LEDGE','REEF','BAR','SHOAL','SAND','MUD','SILT','CLAY','GRAVEL','PEBBLE','COBBLE','BOULDER','ROCK','STONE','MOUNTAIN','HILL','RIDGE','CLIFF','BLUFF','ESCarpMENT','SCARP','CANYON','GORGE','RAVINE','VALLEY','DALE','GLEN','HOLLOW','BASIN','PLAIN','PLATEAU','MESA','BUTTE','PINNACLE','SPINE','ARETE','COL','PASS','SADDLE','NOTCH','GAP','DEFILE','GORGE','CHASM','ABYSS','CAVERN','GROTTO','CAVE','TUNNEL','MINE','QUARRY','PIT','SHAFT','ADIT','DRIFT','WINZE','STOPE','STOPING','BREAST','BACK','WALL','HANGING WALL','FOOT WALL','ORE','VEIN','LEDGE','LODE','PLACER','CLAIM','PROSPECT','GRUBSTAKE','BONANZA','PAYSTREAK','WALLOP','BULLION','COIN','SPECIE','MINT','ASSAY','ALLOY','CARAT','KARAT','FINENESS','STAMP','MILL','CRUSH','GRIND','PULVERIZE','CONCENTRATE','PAN','SLUICE','ROCKER','DREDGE','HYDRAULIC','DRIFT','QUARTZ','GOLD','SILVER','COPPER','IRON','LEAD','ZINC','TIN','MERCURY','ANTIMONY','ARSENIC','BISMUTH','COBALT','NICKEL','TUNGSTEN','MOLYBDENUM','VANADIUM','CHROMIUM','URANIUM','RADIUM','THORIUM','PLUTONIUM','LITHIUM','SODIUM','POTASSIUM','CALCIUM','MAGNESIUM','ALUMINUM','SILICON','CARBON','SULFUR','PHOSPHORUS','NITROGEN','OXYGEN','HYDROGEN','HELIUM','NEON','ARGON','KRYPTON','XENON','RADON','FLUORINE','CHLORINE','BROMINE','IODINE','ASTATINE','BORON','GALLIUM','INDIUM','THALLIUM','GERMANIUM','TIN','LEAD','ARSENIC','ANTIMONY','BISMUTH','POLONIUM','TELLURIUM','SELENIUM','SULFUR','OXYGEN','CHROMIUM','MOLYBDENUM','TUNGSTEN','URANIUM','MANGANESE','TECHNETIUM','RHENIUM','IRON','COBALT','NICKEL','COPPER','ZINC','CADMIUM','SILVER','GOLD','MERCURY','ALUMINUM','GALLIUM','INDIUM','THALLIUM','TIN','LEAD','BISMUTH','POLONIUM','SCANDIUM','YTTRIUM','LANTHANUM','CERIUM','PRASEODYMIUM','NEODYMIUM','PROMETHIUM','SAMARIUM','EUROPIUM','GADOLINIUM','TERBIUM','DYSPROSIUM','HOLMIUM','ERBIUM','THULIUM','YTTERBIUM','LUTETIUM','HAFNIUM','TANTALUM','TUNGSTEN','RHENIUM','OSMIUM','IRIDIUM','PLATINUM','PALLADIUM','RHODIUM','RUTHENIUM','TECHNETIUM']
export const WORDS_6 = ['RABBIT','MONKEY','TURTLE','DRAGON','FLOWER','ORANGE','BANANA','PURPLE','YELLOW','SCHOOL','TEACHER','PENCIL','ERASER','BASKET','BOTTLE','WINDOW','GARDEN','MARKET','BRIDGE','CASTLE','PLANET','ROCKET','GUITAR','PIANO','SOCCER','TENNIS','WINTER','SUMMER','SPRING','AUTUMN','GIRAFFE','PENGUIN','EAGLES','SHARKS','WHALES','TURTLE','SNAILS','BEETLE','DRAGON','BUTTER','FLOWER','SUNSET','SUNRISE','MEADOW','VALLEY','CANYON','STREAM','POND','PUDDLE','PUZZLE','RIDDLE','JUMBLE','MIXED','SCRAM','SHUFFLE','RANDOM','PICKED','CHOSEN','SELECT','DECIDE','CHOOSE','PREFER','FAVOR','LIKING','TASTE','FLAVOR','SPICE','HERBS','MINTY','SWEET','SOUR','SALTY','BITTER','SAVORY','UMAMI','TASTY','YUMMY','DELIC','YUMME','SCRUM','NIBBLE','CHOMP','MUNCH','CRUNCH','CHEWING','BITING','LICKING','SIPPING','GULPING','SWALLOW','DRINK','EATING','DINING','FEAST','BANQUET','PARTY','PICNIC','BARBECUE','COOKOUT','MEALTIME','BREAKFAST','LUNCH','DINNER','SUPPER','SNACK','BRUNCH','APPETIZER','ENTREE','DESSERT','BEVERAGE','REFRESH','COCKTAIL','SMOOTHIE','MILKSHAKE','FLOAT','SUNDAE','SPLIT','PARFAIT','TRIFLE','PUDDING','CUSTARD','FLAN','JELLY','MOUSSE','TIRAMISU','CHEESECAKE','BROWNY','BLONDIE','COOKIE','BISCUIT','SCONE','MUFFIN','CUPCAKE','CAKEPOP','POPTART','DONUT','BAGEL','CRUMPET','PANCAKE','WAFFLE','FRENCH TOAST','CREPE','OMELET','FRITTATA','QUICHE','TART','GALETTE','PIE','COBBLER','CRISPS','CRUMBLE','Buckle','BROWN','BETTY','GRUNT','SLUMP','PANDOWDY','SONKER','CLAFLOUTI','BRETON','NAPOLION','ECLAIR','PROFITEROLE','CHOUX','CROQUEMBOUCHE','PARIS-BREST','SAINT-HONORE','MACARON','MACAROON','MERINGUE','Pavlova','DACQUOISE','MARJOLAINE','BUCHEDENOEL','YULELOG','BABAAURHUM','SAVOY','PANETTONE','STOLLEN','KOEK','LEBKUCHEN','PFEFFERNUSSE','SPRITZ','KRANSEKAKE','KREMBO','MALAXOLONG','BIBINGKA','PUDDING','HAUPIA','KULULU','MOCHI','DAIFUKU','TAIYAKI','DORAYAKI','NERIYOKAN','YOKAN','UIRO','KASUTERA','MANJU','KARUKAN','SUAMA','HIGASHI','RAKUGAN','KONASHI','FUNOYAKI','SASAYAKI','CHITOSEAME','KINTSUBA','GIONBO','TENYAWA','UKUMAME','AKOYAGI','IWAIDEN','KURUMANORI','KUROMAME','KINTOKI','DAIKON','KONNYAKU','YOKAN','MATSURI','HANAMI','BONODORI','OMATSURI','TANABATA','HINAMATSURI','KODOMONOHI','SHICHI','SHICHIGOSAN','SEIJIN','SEIJINNOHI','KEIRO','KEIRONOHI','TAIYAKI','KAKIGORI','YUKIMI','NABE','SUKIYAKI','SHABUSHABU','ODEN','NIMONO','NIZAKANA','MISO','TOFU','NATTO','YAKITORI','TAKOYAKI','OKONOMIYAKI','MONJAYAKI','NEGIMA','YAKIMESHI','CHAHAN','GYOZA','RAMEN','UDON','SOBA','SOMEN','HIYAMUGI','KITSUNE','TANUKI','TEMPURA','TONKATSU','KATSUDON','KUSHIKATSU','KOROKKE','MENCHI','HAMBAGU','CURRY','KARE','OMURICE','NAPORITAN','MABODOFU','CHUKAMAN','NIKUMAN','ANMAN','CURRYPAN','YAKISOBA','YAKIUDON','TAKIKOMI','OMUSUBI','ONIGIRI','INARI','CHIRASHI','ZUSHI','SUSHI','NIGIRI','MAKI','GUNKAN','TEMARI','OSHI','BOZUSHI','HAKOZUSHI','KANSUI','KORI','MOCHI','KINAKO','ANMITSU','MITSUMAME','KUROMITSU','SHIRUKO','ZENZAI','OSHIRUKO','KANTEN','KONNYAKU','MIZUYOKAN','NERIYOKAN','YOKAN','UIRO','KASUTERA','FUKI','KOROMOCHI','DAIFUKU','HANABIRAMOCHI','SAKURAMOCHI','KASHIWAMOCHI','HISHIMOCHI','KUSANOHAMOCHI','SASAMOCHI','CHIMAKI','AKIMANJU','TSUKIMI','OHIRU','OBENTO','MAKUNOUCHI','EKIBEN','SHOKADO','KAISEKI','KAPPO','IZAKAYA','YATAI','ROTEMPO','SENBEI','ARARE','KAKIMOCHI','FUKUARARE','OKAKI','KATAYAKI','NORIMAKI','KOMEBOKU','TSUKUDANI','KUROKUROME','KAMPYO','KANPYO','FUKUSHINDZU','KINTSUBA','TENYAWA','UKUMAME','AKOYAGI','IWAIDEN','KURUMANORI','KUROMAME','KINTOKI','DAIKON','KONNYAKU','YOKAN','MATSURI','HANAMI','BONODORI','OMATSURI','TANABATA','HINAMATSURI','KODOMONOHI','SHICHI','SHICHIGOSAN','SEIJIN','SEIJINNOHI','KEIRO','KEIRONOHI','TAIYAKI','KAKIGORI','YUKIMI','NABE','SUKIYAKI','SHABUSHABU','ODEN','NIMONO','NIZAKANA','MISO','TOFU','NATTO','YAKITORI','TAKOYAKI','OKONOMIYAKI','MONJAYAKI','NEGIMA','YAKIMESHI','CHAHAN','GYOZA','RAMEN','UDON','SOBA','SOMEN','HIYAMUGI','KITSUNE','TANUKI','TEMPURA','TONKATSU','KATSUDON','KUSHIKATSU','KOROKKE','MENCHI','HAMBAGU','CURRY','KARE','OMURICE','NAPORITAN','MABODOFU','CHUKAMAN','NIKUMAN','ANMAN','CURRYPAN','YAKISOBA','YAKIUDON','TAKIKOMI','OMUSUBI','ONIGIRI','INARI','CHIRASHI','ZUSHI','SUSHI','NIGIRI','MAKI','GUNKAN','TEMARI','OSHI','BOZUSHI','HAKOZUSHI','KANSUI','KORI','MOCHI','KINAKO','ANMITSU','MITSUMAME','KUROMITSU','SHIRUKO','ZENZAI','OSHIRUKO','KANTEN','KONNYAKU','MIZUYOKAN','NERIYOKAN','YOKAN','UIRO','KASUTERA','FUKI','KOROMOCHI','DAIFUKU','HANABIRAMOCHI','SAKURAMOCHI','KASHIWAMOCHI','HISHIMOCHI','KUSANOHAMOCHI','SASAMOCHI','CHIMAKI','AKIMANJU','TSUKIMI','OHIRU','OBENTO','MAKUNOUCHI','EKIBEN','SHOKADO','KAISEKI','KAPPO','IZAKAYA','YATAI','ROTEMPO','SENBEI','ARARE','KAKIMOCHI','FUKUARARE','OKAKI','KATAYAKI','NORIMAKI','KOMEBOKU','TSUKUDANI','KUROKUROME','KAMPYO','KANPYO','FUKUSHINDZU']

export function getWordPool(difficulty: Difficulty): string[] {
  switch (difficulty) {
    case 'easy': return WORDS_3;
    case 'medium': return WORDS_4;
    case 'hard': return WORDS_5;
    case 'very-hard': return WORDS_6;
  }
}

export function getCountRange(difficulty: Difficulty): { min: number; max: number } {
  switch (difficulty) {
    case 'easy': return { min: 2, max: 6 };
    case 'medium': return { min: 3, max: 12 };
    case 'hard': return { min: 5, max: 20 };
    case 'very-hard': return { min: 10, max: 30 };
  }
}

export function getChoiceCount(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 3;
    case 'medium': return 4;
    case 'hard': return 6;
    case 'very-hard': return 8;
  }
}

export function getMemoryPairs(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 3;
    case 'medium': return 4;
    case 'hard': return 6;
    case 'very-hard': return 8;
  }
}

export function getConnectDotsMax(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 10;
    case 'medium': return 20;
    case 'hard': return 30;
    case 'very-hard': return 50;
  }
}

export function getBalloonGridSize(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 18;
    case 'medium': return 28;
    case 'hard': return 36;
    case 'very-hard': return 48;
  }
}

// Balloon letters are hidden (show ? instead of letter)
export function shouldHideBalloonLetters(difficulty: Difficulty): boolean {
  return difficulty === 'hard' || difficulty === 'very-hard';
}

// Letter Hero: how many letters are blanked out
export function getLetterHeroBlanks(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 1;
    case 'medium': return 2;
    case 'hard': return 3;
    case 'very-hard': return 4;
  }
}

// Get number of coloring regions required
export function getColoringRegions(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 4;
    case 'medium': return 6;
    case 'hard': return 8;
    case 'very-hard': return 10;
  }
}

export function getStageProgress(gameId: string): number {
  return parseInt(localStorage.getItem(`stage_${gameId}`) ?? '1', 10);
}

export function setStageProgress(gameId: string, stage: number): void {
  const cur = getStageProgress(gameId);
  if (stage > cur) localStorage.setItem(`stage_${gameId}`, String(Math.min(stage, TOTAL_STAGES)));
}

export function getCompletedStages(gameId: string): number[] {
  try {
    return JSON.parse(localStorage.getItem(`completed_${gameId}`) ?? '[]') as number[];
  } catch {
    return [];
  }
}

export function addCompletedStage(gameId: string, stage: number): void {
  const completed = getCompletedStages(gameId);
  if (!completed.includes(stage)) {
    completed.push(stage);
    localStorage.setItem(`completed_${gameId}`, JSON.stringify(completed));
  }
}

export function isStageCompleted(gameId: string, stage: number): boolean {
  return getCompletedStages(gameId).includes(stage);
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

export function seedRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Generate random positions for dots (non-overlapping)
export function generateDotPositions(count: number, seed: number): { x: number; y: number }[] {
  const r = seedRandom(seed);
  const positions: { x: number; y: number }[] = [];
  const minDist = 15;
  let attempts = 0;
  while (positions.length < count && attempts < count * 100) {
    attempts++;
    const x = 5 + r() * 90;
    const y = 5 + r() * 90;
    const tooClose = positions.some(p => Math.hypot(p.x - x, p.y - y) < minDist);
    if (!tooClose) positions.push({ x, y });
  }
  while (positions.length < count) {
    positions.push({ x: 5 + (positions.length % 10) * 9, y: 5 + Math.floor(positions.length / 10) * 9 });
  }
  return positions;
}
