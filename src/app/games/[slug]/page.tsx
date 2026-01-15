'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const GAMES_CONFIG: Record<string, { title: string; path: string }> = {
  'bingo-bash': { title: 'Bingo Bash', path: '/games/bingo-bash-html5-game/game/index.html' },
  'dice-game': { title: 'Dice Game', path: '/games/dice-game-html5-game/game/index.html' },
  'egypt-scratch': { title: 'Egypt Scratch', path: '/games/egypt-scratch-html5-game/game/index.html' },
  'jungle-scratch': { title: 'Jungle Scratch', path: '/games/jungle-scratch-html5-game/game/index.html' },
  'lottery-numbers': { title: 'Lottery Numbers', path: '/games/lottery-numbers-html5-game/game/index.html' },
  'lucky-wheels': { title: 'Lucky Wheels', path: '/games/lucky-wheels-html5-game/game/index.html' },
  'slot-machine': { title: 'Slot Machine', path: '/games/slot-machine-html5-game/game/index.html' },
};

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const game = GAMES_CONFIG[slug];

  if (!game) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
        <Link href="/" className="text-[#22c55e] hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Game Header / Navigation */}
      <div className="bg-[#1a2332] p-4 flex items-center justify-between border-b border-white/10">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-white hover:text-[#22c55e] transition-colors"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <h1 className="text-xl font-bold text-white">{game.title}</h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Game Viewport */}
      <div className="flex-grow relative">
        <iframe
          src={game.path}
          className="absolute inset-0 w-full h-full border-none"
          allow="autoplay; fullscreen; encrypted-media"
          title={game.title}
        />
      </div>
    </div>
  );
}
