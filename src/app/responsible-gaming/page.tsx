import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Responsible Gaming - DineDivine",
  description:
    "Learn about responsible gaming practices at DineDivine. Our commitment to providing a safe, fair, and enjoyable free-to-play fantasy sports experience.",
};

export default function ResponsibleGamingPage() {
  const guidelines = [
    {
      title: "Play for Entertainment",
      description:
        "Fantasy sports on DineDivine is designed purely for entertainment. Enjoy the game for the fun and excitement it brings, not as a source of income or reward.",
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
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Set Time Limits",
      description:
        "Balance your gaming time with other activities. Set personal time limits for how long you spend on the platform each day.",
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Keep It Social",
      description:
        "Fantasy sports is more fun with friends. Use DineDivine as a way to connect with fellow cricket enthusiasts and enjoy healthy competition.",
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
      title: "Stay Informed",
      description:
        "Understand how fantasy sports works before playing. Read our How To Play guide and familiarize yourself with the rules and scoring system.",
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const ageRestrictions = [
    "Users must be 18 years of age or older to create an account",
    "Age verification is required during the registration process",
    "We reserve the right to request additional age verification at any time",
    "Accounts found to be operated by minors will be immediately suspended",
    "Parents and guardians should monitor their children's online activities",
  ];

  const geoRestrictions = [
    {
      state: "Telangana",
      reason: "State regulations prohibit fantasy sports platforms",
    },
    {
      state: "Andhra Pradesh",
      reason: "State regulations prohibit fantasy sports platforms",
    },
    {
      state: "Assam",
      reason: "State regulations prohibit fantasy sports platforms",
    },
    {
      state: "Odisha",
      reason: "State regulations prohibit fantasy sports platforms",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Responsible Gaming
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            At DineDivine, we are committed to promoting responsible gaming
            practices and ensuring a safe, enjoyable experience for all our
            users.
          </p>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Commitment to Responsible Gaming
            </h2>
            <p className="text-gray-300 leading-relaxed">
              DineDivine is a free-to-play fantasy sports platform designed
              purely for entertainment. We do not involve any real money gaming,
              betting, or gambling activities. Our platform is built to provide
              cricket fans with a fun and engaging way to enjoy the sport they
              love, without any financial risks.
            </p>
          </div>

          <div className="bg-[#22c55e]/10 border border-green-500/30 p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-green-300 mb-4 text-center">
              What Makes DineDivine Different
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-[#22c55e] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">100% Free to Play</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-[#22c55e] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">No Real Money Involvement</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-[#22c55e] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">No Cash Prizes or Rewards</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-[#22c55e] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">Pure Entertainment Focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Responsible Gaming Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guidelines.map((guideline) => (
              <div
                key={guideline.title}
                className="bg-[#1a2332] p-8 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-[#22c55e]/20 rounded-full flex items-center justify-center mb-4 text-[#22c55e]">
                  {guideline.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {guideline.title}
                </h3>
                <p className="text-gray-300">{guideline.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Restrictions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🔞</span>
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Age Restrictions
                </h2>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                DineDivine is strictly for users who are 18 years of age or
                older. We take age verification seriously and have implemented
                measures to prevent underage access to our platform.
              </p>
              <ul className="space-y-3">
                {ageRestrictions.map((restriction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="text-gray-300">{restriction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-amber-900/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Geographic Restrictions
                </h2>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Due to state regulations, users from certain Indian states are
                not permitted to access or use DineDivine. We comply with all
                applicable laws and regulations.
              </p>
              <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-amber-900/30">
                    <tr>
                      <th className="px-4 py-3 text-left text-amber-300 font-semibold">
                        State
                      </th>
                      <th className="px-4 py-3 text-left text-amber-300 font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-500/30">
                    {geoRestrictions.map((restriction) => (
                      <tr key={restriction.state}>
                        <td className="px-4 py-3 text-white font-medium">
                          {restriction.state}
                        </td>
                        <td className="px-4 py-3 text-red-600">
                          Not Available
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Self-Exclusion */}
      <section className="py-16 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Self-Exclusion & Account Control
            </h2>
            <p className="text-center text-gray-300 mb-8">
              We believe users should have full control over their gaming
              experience. DineDivine offers the following account management
              options:
            </p>
            <div className="space-y-4">
              <div className="bg-[#1a2332] p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Temporary Break
                </h3>
                <p className="text-gray-300">
                  Take a break from the platform for a specified period. Your
                  account will be temporarily suspended and you won&apos;t be
                  able to participate in any contests during this time.
                </p>
              </div>
              <div className="bg-[#1a2332] p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Account Deactivation
                </h3>
                <p className="text-gray-300">
                  Deactivate your account if you wish to stop using DineDivine.
                  You can reactivate your account at any time by contacting our
                  support team.
                </p>
              </div>
              <div className="bg-[#1a2332] p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Permanent Account Deletion
                </h3>
                <p className="text-gray-300">
                  Request permanent deletion of your account and all associated
                  data. This action is irreversible and all your data will be
                  permanently removed from our systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#22c55e] text-white p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              If you have any questions about responsible gaming or need
              assistance with your account, our support team is here to help.
            </p>
            <Link
              href="/contact"
              className="bg-[#1a2332] text-[#22c55e] px-8 py-3 rounded-lg font-semibold hover:bg-[#22c55e]/10 transition-colors duration-200 text-lg inline-block"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Compliance */}
      <section className="py-8 bg-[#1a2332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-300 text-sm">
            DineDivine operates in compliance with all applicable Indian laws
            and regulations. We are committed to maintaining the highest
            standards of responsible gaming and user protection. For more
            information, please review our{" "}
            <Link href="/terms" className="text-[#22c55e] hover:underline">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#22c55e] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
