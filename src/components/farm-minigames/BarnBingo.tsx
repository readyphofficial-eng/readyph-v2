import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ANIMALS } from '@/lib/farmData';

interface BarnBingoProps {
  onClose: () => void;
  onComplete: (coins: number, xp: number) => void;
  level: number;
}

interface Card {
  id: string;
  animal: string;
  matched: boolean;
}

export function BarnBingo({ onClose, onComplete, level }: BarnBingoProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<string | null>(null);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 + level * 5);

  // Initialize game
  useEffect(() => {
    const animalIds = Object.keys(ANIMALS).slice(0, Math.min(4 + Math.floor(level / 3), 8));
    const cardArray: Card[] = [];
    
    animalIds.forEach(animalId => {
      cardArray.push({ id: `${animalId}-1`, animal: animalId, matched: false });
      cardArray.push({ id: `${animalId}-2`, animal: animalId, matched: false });
    });
    
    setCards(cardArray.sort(() => Math.random() - 0.5));
  }, [level]);

  // Timer
  useEffect(() => {
    if (gameComplete || timeLeft <= 0) {
      if (timeLeft <= 0) finishGame();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameComplete]);

  const handleCardClick = (cardId: string) => {
    if (gameComplete || cards.find(c => c.id === cardId)?.matched) return;

    if (!firstCard) {
      setFirstCard(cardId);
    } else if (firstCard !== cardId) {
      const firstAnimal = cards.find(c => c.id === firstCard)?.animal;
      const secondAnimal = cards.find(c => c.id === cardId)?.animal;

      setAttempts(attempts + 1);

      if (firstAnimal === secondAnimal) {
        setMatches(matches + 1);
        setCards(cards.map(c => 
          c.id === firstCard || c.id === cardId ? { ...c, matched: true } : c
        ));
      }

      setTimeout(() => setFirstCard(null), 500);
    }
  };

  const finishGame = () => {
    const baseCoins = 50 + level * 10;
    const matchBonus = matches * 20;
    const accuracyBonus = attempts > 0 ? Math.floor((matches / (attempts / 2)) * 30) : 0;
    const totalCoins = baseCoins + matchBonus + accuracyBonus;
    const totalXp = 30 + matches * 5;

    setGameComplete(true);
    onComplete(totalCoins, totalXp);
  };

  const totalPairs = cards.length / 2;
  const progress = (matches / totalPairs) * 100;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl text-gray-700">🎮 Barn Bingo</h2>
          <button onClick={onClose} disabled={!gameComplete}>
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {!gameComplete ? (
          <>
            {/* Timer & Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-600">Time: {timeLeft}s</span>
                <span className="text-sm font-bold text-gray-600">Pairs: {matches}/{totalPairs}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {cards.map(card => {
                const animal = ANIMALS[card.animal];
                const isFlipped = firstCard === card.id || card.matched;

                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    disabled={card.matched}
                    className={`aspect-square rounded-lg font-bold text-2xl transition-all transform active:scale-90 ${
                      card.matched
                        ? 'bg-green-100 cursor-default'
                        : isFlipped
                        ? 'bg-blue-400 text-white'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {isFlipped ? animal?.emoji : '?'}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-[11px] text-gray-500">
              Match all pairs before time runs out!
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-4xl mb-2">🎉</div>
            <p className="font-bold text-lg text-gray-700 mb-1">Game Complete!</p>
            <p className="text-sm text-gray-500 mb-4">Matched {matches} pairs!</p>
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
