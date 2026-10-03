import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { TREES } from '@/lib/farmData';

interface FruitCatchProps {
  onClose: () => void;
  onComplete: (coins: number, xp: number) => void;
  level: number;
}

interface Fruit {
  id: number;
  x: number;
  y: number;
  caught: boolean;
  treeType: string;
}

export function FruitCatch({ onClose, onComplete, level }: FruitCatchProps) {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [caught, setCaught] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 + level * 3);
  const [gameComplete, setGameComplete] = useState(false);
  const fruitIdRef = useRef(0);

  const treeTypes = Object.keys(TREES).slice(0, Math.min(3 + Math.floor(level / 4), 6));
  const spawnRate = 800 - level * 40; // Faster with higher level

  // Spawn fruits
  useEffect(() => {
    if (gameComplete || timeLeft <= 0) return;

    const spawnInterval = setInterval(() => {
      const newFruit: Fruit = {
        id: ++fruitIdRef.current,
        x: Math.random() * 80 + 10,
        y: -10,
        caught: false,
        treeType: treeTypes[Math.floor(Math.random() * treeTypes.length)],
      };
      setFruits(prev => [...prev, newFruit]);
    }, spawnRate);

    return () => clearInterval(spawnInterval);
  }, [level, spawnRate, gameComplete, timeLeft, treeTypes]);

  // Drop fruits
  useEffect(() => {
    if (gameComplete || timeLeft <= 0) return;

    const dropInterval = setInterval(() => {
      setFruits(prev => {
        const updated = prev.map(f => ({ ...f, y: f.y + 3 })).filter(f => f.y < 100);
        return updated;
      });
    }, 50);

    return () => clearInterval(dropInterval);
  }, [gameComplete, timeLeft]);

  // Timer
  useEffect(() => {
    if (gameComplete || timeLeft <= 0) {
      if (timeLeft <= 0) finishGame();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameComplete]);

  const handleCatch = (fruitId: number) => {
    setFruits(prev => prev.map(f => f.id === fruitId ? { ...f, caught: true } : f));
    setCaught(caught + 1);
    
    const tree = TREES[fruits.find(f => f.id === fruitId)?.treeType || ''];
    const baseScore = tree?.fruitPrice || 10;
    setScore(score + baseScore + 5); // Bonus 5 for catching
  };

  const finishGame = () => {
    const baseCoins = 40 + level * 8;
    const catchBonus = caught * 15;
    const totalCoins = baseCoins + catchBonus;
    const totalXp = 25 + caught * 3;

    setGameComplete(true);
    onComplete(totalCoins, totalXp);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl text-gray-700">🍎 Fruit Catch</h2>
          <button onClick={onClose} disabled={!gameComplete}>
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {!gameComplete ? (
          <>
            {/* Score & Timer */}
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-600">Score: {score}</span>
              <span className="text-sm font-bold text-gray-600">Caught: {caught}</span>
              <span className={`text-sm font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-gray-600'}`}>
                {timeLeft}s
              </span>
            </div>

            {/* Game Area */}
            <div className="relative w-full bg-gradient-to-b from-blue-100 to-blue-50 rounded-2xl overflow-hidden mb-4" style={{ height: '300px' }}>
              {/* Fruits falling */}
              {fruits.map(fruit => {
                const treeData = TREES[fruit.treeType];
                return (
                  <button
                    key={fruit.id}
                    onClick={() => !fruit.caught && handleCatch(fruit.id)}
                    disabled={fruit.caught}
                    className={`absolute w-8 h-8 rounded-full text-lg font-bold transition-all cursor-pointer active:scale-125 ${
                      fruit.caught ? 'opacity-0' : 'hover:scale-110'
                    }`}
                    style={{
                      left: `${fruit.x}%`,
                      top: `${fruit.y}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {treeData?.fruitEmoji || '🍎'}
                  </button>
                );
              })}

              {/* Catch Zone */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-3xl shadow-lg flex items-center justify-center text-2xl opacity-80">
                🧺
              </div>
            </div>

            <p className="text-center text-[11px] text-gray-500">
              Click falling fruits to catch them!
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-4xl mb-2">🎉</div>
            <p className="font-bold text-lg text-gray-700 mb-1">Game Complete!</p>
            <p className="text-sm text-gray-500 mb-2">Caught {caught} fruits!</p>
            <p className="text-lg font-bold text-yellow-600 mb-4">+{score} points</p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-br from-green-500 to-green-600 rounded-lg px-4 py-2 text-white font-bold text-sm"
            >
              Claim Reward
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
