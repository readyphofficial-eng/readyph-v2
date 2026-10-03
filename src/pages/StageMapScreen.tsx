import { useState } from 'react';
import { getCompletedStages, getDifficultyForStage, DIFFICULTY_LABELS, DIFFICULTY_EMOJIS, TOTAL_STAGES, STAGES_PER_PAGE, getCheckpointType, isStageCompleted } from '@/lib/gameData';
import type { GameDef } from '@/pages/Games';

interface StageMapScreenProps {
  game: GameDef;
  onStart: (stage: number) => void;
  onBack: () => void;
}

export function StageMapScreen({ game, onStart, onBack }: StageMapScreenProps) {
  const completed = getCompletedStages(game.id);
  const currentStage = Math.min(
    (parseInt(localStorage.getItem(`stage_${game.id}`) ?? '1', 10)) || 1,
    TOTAL_STAGES
  );
  const totalPages = Math.ceil(TOTAL_STAGES / STAGES_PER_PAGE);
  const [pageIdx, setPageIdx] = useState(Math.floor((currentStage - 1) / STAGES_PER_PAGE));

  const startStage = pageIdx * STAGES_PER_PAGE + 1;
  const endStage = Math.min(startStage + STAGES_PER_PAGE - 1, TOTAL_STAGES);
  const stages = Array.from({ length: endStage - startStage + 1 }, (_, i) => startStage + i);

  const maxReachable = Math.max(currentStage, ...completed, 1);
  const highestUnlockedPage = Math.floor((maxReachable - 1) / STAGES_PER_PAGE);

  return (
    <div className="min-h-screen pb-28">
      <div className={`bg-gradient-to-br ${game.color} px-5 pt-10 pb-6 rounded-b-3xl shadow-lg`}>
        <button onClick={onBack} className="text-white text-sm mb-2 active:scale-95 transition">← Back to Games</button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-3xl">{game.emoji}</span> {game.name}
        </h1>
        <p className="text-white/80 text-sm mt-1">Pili ng stage na lalaruin!</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-white/80 text-xs">Kasalukuyan: Stage {currentStage}</span>
          <span className="text-white/60 text-xs">• {completed.length} tapos na</span>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setPageIdx(p => Math.max(0, p - 1))}
              disabled={pageIdx === 0}
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold disabled:opacity-30 active:scale-90 transition"
            >←</button>
            <span className="text-xs font-bold text-gray-500">Stages {startStage}–{endStage}</span>
            <button
              onClick={() => setPageIdx(p => Math.min(highestUnlockedPage, p + 1))}
              disabled={pageIdx >= highestUnlockedPage}
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold disabled:opacity-30 active:scale-90 transition"
            >→</button>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {stages.map(s => {
              const isDone = isStageCompleted(game.id, s);
              const isCurrent = s === currentStage;
              const isLocked = s > currentStage && !isDone;
              const checkpoint = getCheckpointType(s);
              const diff = getDifficultyForStage(s);
              return (
                <button
                  key={s}
                  onClick={() => !isLocked && onStart(s)}
                  disabled={isLocked}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-bold transition active:scale-90 ${
                    isCurrent
                      ? 'bg-gradient-to-br from-candy-green to-candy-mint text-white shadow-lg scale-105 animate-wiggle'
                      : isDone
                      ? 'bg-gradient-to-br from-candy-blue to-candy-mint text-white shadow'
                      : isLocked
                      ? 'bg-gray-100 text-gray-300'
                      : 'bg-gradient-to-br from-candy-yellow to-candy-pink text-white shadow'
                  }`}
                >
                  <span className="text-lg leading-none">
                    {isLocked ? '🔒' : checkpoint ? (checkpoint === 'hard' ? '🔥' : '🏆') : isDone ? '✓' : s}
                  </span>
                  <span className="text-[9px] mt-1">{isLocked ? '' : DIFFICULTY_EMOJIS[diff]} {DIFFICULTY_LABELS[diff]}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[10px] text-gray-400">
            <span>✓ Tapos na — pwedeng ulitin!</span>
            <span>🔥 Hard (every 5)</span>
            <span>🏆 Very Hard (every 10)</span>
            <span>🔒 Pa-bukas pa</span>
          </div>
        </div>

        <button
          onClick={() => onStart(currentStage)}
          className="w-full mt-4 bg-gradient-to-r from-candy-green to-candy-mint rounded-full py-3 font-bold text-white shadow active:scale-95 transition animate-pop"
        >
          ▶ Ituloy ang Stage {currentStage}
        </button>
      </div>
    </div>
  );
}
