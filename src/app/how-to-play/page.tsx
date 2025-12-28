import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How To Play - DineDivine",
  description:
    "Learn how to play fantasy cricket on DineDivine. Step-by-step guide to creating your dream team, joining contests, and enjoying the game.",
};

export default function HowToPlayPage() {
  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description:
        "Sign up for a free account on DineDivine. Registration is quick, easy, and completely free. You'll need to provide basic information and verify that you're 18 years or older.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      number: 2,
      title: "Select a Match",
      description:
        "Browse through the list of upcoming cricket matches. Choose the match you want to play fantasy cricket for. You can see match details including teams, venue, and start time.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      number: 3,
      title: "Build Your Fantasy Team",
      description:
        "Create your dream team of 11 players from both teams playing in the match. Select players based on their recent form, playing conditions, and your cricket knowledge.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      number: 4,
      title: "Choose Captain & Vice-Captain",
      description:
        "Select your Captain and Vice-Captain wisely. Your Captain earns 2x points while your Vice-Captain earns 1.5x points. These selections can make or break your fantasy team's performance.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    },
    {
      number: 5,
      title: "Join a Contest",
      description:
        "Enter free contests to compete with other fantasy cricket enthusiasts. All contests on DineDivine are completely free to join - no entry fees, no hidden charges.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      number: 6,
      title: "Watch & Enjoy",
      description:
        "Once the match starts, watch your fantasy team score points based on real player performances. Track live scores, leaderboards, and enjoy the excitement of fantasy cricket!",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const teamRules = [
    {
      category: "Wicket-Keepers",
      min: 1,
      max: 4,
      description: "Select 1-4 wicket-keepers for your team",
    },
    {
      category: "Batsmen",
      min: 3,
      max: 6,
      description: "Select 3-6 batsmen for your team",
    },
    {
      category: "All-Rounders",
      min: 1,
      max: 4,
      description: "Select 1-4 all-rounders for your team",
    },
    {
      category: "Bowlers",
      min: 3,
      max: 6,
      description: "Select 3-6 bowlers for your team",
    },
  ];

  const pointsSystem = [
    { action: "Run scored", points: "+1 point" },
    { action: "Boundary (4 runs)", points: "+1 bonus point" },
    { action: "Six (6 runs)", points: "+2 bonus points" },
    { action: "Half-century (50 runs)", points: "+8 bonus points" },
    { action: "Century (100 runs)", points: "+16 bonus points" },
    { action: "Wicket taken", points: "+25 points" },
    { action: "Maiden over", points: "+12 points" },
    { action: "Catch taken", points: "+8 points" },
    { action: "Stumping", points: "+12 points" },
    { action: "Run out (direct)", points: "+12 points" },
    { action: "Run out (indirect)", points: "+6 points" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How To Play</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            New to fantasy cricket? Follow our simple step-by-step guide to
            start playing and enjoying the game in minutes!
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
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
                  <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>
                <div
                  className={`flex-grow bg-white p-6 rounded-xl shadow-lg ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Selection Rules */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Team Selection Rules
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Build a balanced team of 11 players following these composition
            rules. You can select players from both teams playing in the match.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamRules.map((rule) => (
              <div
                key={rule.category}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {rule.category}
                </h3>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {rule.min} - {rule.max}
                </div>
                <p className="text-gray-600 text-sm">{rule.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-green-50 border border-green-200 p-6 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">
              Important Notes:
            </h4>
            <ul className="list-disc list-inside text-green-700 space-y-1">
              <li>You must select exactly 11 players for your team</li>
              <li>
                Maximum 7 players can be selected from a single playing team
              </li>
              <li>
                Each player has a credit value - stay within the total credit
                limit
              </li>
              <li>
                You can create multiple teams for the same match to increase
                your chances
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Points System */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Points System
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Your fantasy team earns points based on the real-life performance
            of your selected players. Here&apos;s how points are calculated:
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Player Action</th>
                    <th className="px-6 py-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pointsSystem.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 text-gray-900">{item.action}</td>
                      <td className="px-6 py-4 text-right font-semibold text-green-600">
                        {item.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Captain Bonus:</strong> Your Captain earns 2x points for
                all actions.
                <br />
                <strong>Vice-Captain Bonus:</strong> Your Vice-Captain earns
                1.5x points for all actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pro Tips for Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Check Player Form
              </h3>
              <p className="text-gray-600">
                Always check recent performances of players before selecting
                them. A player in good form is more likely to score points.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Consider Pitch Conditions
              </h3>
              <p className="text-gray-600">
                Pitch conditions affect player performance. Select more spinners
                on turning tracks and pacers on seaming pitches.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Choose Captain Wisely
              </h3>
              <p className="text-gray-600">
                Your Captain earns double points. Pick a reliable performer who
                is likely to have a significant impact on the match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Now that you know how to play, it&apos;s time to put your cricket
            knowledge to the test. Create your free account and start building
            your dream team!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 text-lg"
            >
              Create Free Account
            </Link>
            <Link
              href="/fantasy-cricket"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors duration-200 text-lg"
            >
              Explore Fantasy Cricket
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
