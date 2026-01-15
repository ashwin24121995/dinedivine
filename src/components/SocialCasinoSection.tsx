'use client';

import Image from 'next/image';
import Link from 'next/link';

const GAMES = [
  {
    id: 'slot-machine',
    title: 'Slot Machine',
    image: '/games/slot-machine-html5-game/preview/02_preview_landing.jpg',
    slug: 'slot-machine',
    description: 'Classic casino slot experience with multiple themes.'
  },
  {
    id: 'lucky-wheels',
    title: 'Lucky Wheels',
    image: '/games/lucky-wheels-html5-game/preview/02_preview_landing.jpg',
    slug: 'lucky-wheels',
    description: 'Spin the wheel and test your luck for big rewards.'
  },
  {
    id: 'dice-game',
    title: 'Dice Game',
    image: '/games/dice-game-html5-game/preview/02_preview_landing.jpg',
    slug: 'dice-game',
    description: 'Roll the dice in this classic game of chance.'
  },
  {
    id: 'bingo-bash',
    title: 'Bingo Bash',
    image: '/games/bingo-bash-html5-game/preview/02_preview_landing.jpg',
    slug: 'bingo-bash',
    description: 'Fast-paced bingo action with exciting patterns.'
  },
  {
    id: 'egypt-scratch',
    title: 'Egypt Scratch',
    image: '/games/egypt-scratch-html5-game/preview/02_preview_landing.jpg',
    slug: 'egypt-scratch',
    description: 'Uncover ancient treasures in this scratch card game.'
  },
  {
    id: 'jungle-scratch',
    title: 'Jungle Scratch',
    image: '/games/jungle-scratch-html5-game/preview/02_preview_landing.jpg',
    slug: 'jungle-scratch',
    description: 'Wild wins await in the heart of the jungle.'
  }
];

export default function SocialCasinoSection() {
  return (
    <section className="py-20 bg-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Social <span className="text-[#22c55e]">Casino</span> Games
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience the thrill of casino games 100% Free to Play. No real money involved, just pure entertainment!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GAMES.map((game) => (
            <Link 
              key={game.id} 
              href={`/games/${game.slug}`}
              className="group bg-[#1a2332] rounded-2xl overflow-hidden border border-white/10 hover:border-[#22c55e]/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332] to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#22c55e] text-black text-xs font-bold px-2 py-1 rounded uppercase">
                    Free Play
                  </span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#22c55e] transition-colors">
                  {game.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {game.description}
                </p>
                <div className="flex items-center text-[#22c55e] font-semibold text-sm">
                  Play Now
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
