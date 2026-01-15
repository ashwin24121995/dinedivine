import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How To Play - DineDivine",
  description:
    "Learn how to play social casino games on DineDivine. Step-by-step guide to enjoying slots, dice, and scratch cards for free.",
};

export default function HowToPlayPage() {
  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description:
        "Sign up for a free account on DineDivine. Registration is quick, easy, and completely free. You'll need to provide basic information and verify that you're 18 years or older.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      number: 2,
      title: "Browse the Game Library",
      description:
        "Explore our collection of premium social casino games. From classic slot machines to exciting scratch cards and dice games, there's something for everyone.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      number: 3,
      title: "Select Your Game",
      description:
        "Click on any game to start playing instantly. All games on DineDivine are 100% free to play, with no real money involved and no financial risk.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
        </svg>
      ),
    },
    {
      number: 4,
      title: "Enjoy the Experience",
      description:
        "Immerse yourself in high-quality graphics and smooth gameplay. Whether you're spinning the slots or scratching for a win, enjoy the thrill of the casino from your browser.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: 5,
      title: "Track Your Progress",
      description:
        "Keep track of your wins and achievements within each game. Compete with friends and climb the social leaderboards to showcase your skills.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002 2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      number: 6,
      title: "Play Responsibly",
      description:
        "While our games are free, we encourage responsible gaming. Set limits for yourself and enjoy the platform as a source of pure entertainment.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const gameTypes = [
    {
      category: "Slot Machines",
      description: "Classic 3-reel and 5-reel slots with various themes and exciting bonus features.",
    },
    {
      category: "Dice Games",
      description: "Test your luck with classic dice rolls and betting patterns in a social environment.",
    },
    {
      category: "Scratch Cards",
      description: "Instant-win scratch cards with multiple themes like Egypt and Jungle adventures.",
    },
    {
      category: "Bingo Bash",
      description: "Fast-paced bingo action where you can play multiple cards and aim for the jackpot.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#16a34a] to-[#22c55e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How To Play</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            New to social casino games? Follow our simple guide to start playing and enjoying the thrill in minutes!
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Getting Started in 6 Easy Steps
          </h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-[#22c55e] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#22c55e]/20">
                    {step.icon}
                  </div>
                </div>
                <div
                  className={`flex-grow bg-[#1a2332] p-8 rounded-2xl border border-white/5 shadow-xl ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <div className={`flex items-center gap-3 mb-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                    <span className="bg-[#22c55e]/20 text-[#22c55e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-16 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Our Game Categories
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore a variety of social casino games designed for pure entertainment and fun.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameTypes.map((type) => (
              <div
                key={type.category}
                className="bg-[#1a2332] p-8 rounded-2xl border border-white/5 shadow-lg text-center hover:border-[#22c55e]/30 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {type.category}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-[#22c55e]/10 border border-[#22c55e]/20 p-8 rounded-2xl text-center">
            <h4 className="text-xl font-bold text-[#22c55e] mb-4">
              Important Note:
            </h4>
            <p className="text-gray-300 max-w-3xl mx-auto">
              DineDivine is a <strong>Social Casino</strong> platform. All games are 100% free to play. 
              There is no real money involved, no betting, and no opportunity to win real money or prizes. 
              Our platform is strictly for entertainment purposes only.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Social Gaming Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of players enjoying the best free-to-play casino games in India.
          </p>
          <Link 
            href="/"
            className="inline-block bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-[#22c55e]/20"
          >
            Explore Games Now
          </Link>
        </div>
      </section>
    </div>
  );
}
