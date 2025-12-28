import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fair Play Policy - DineDivine",
  description:
    "Learn about DineDivine's fair play policies. Our commitment to ensuring a level playing field for all fantasy cricket enthusiasts.",
};

export default function FairPlayPage() {
  const principles = [
    {
      title: "Equal Opportunity",
      description:
        "Every user has an equal opportunity to participate and succeed on our platform. No user receives preferential treatment or unfair advantages.",
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
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>
      ),
    },
    {
      title: "Transparency",
      description:
        "Our scoring system, rules, and contest mechanics are clearly documented and available to all users. There are no hidden rules or secret algorithms.",
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      title: "Data Integrity",
      description:
        "All match data and player statistics are sourced from reliable, official sources. We ensure accuracy and consistency in all data displayed on our platform.",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Anti-Fraud Measures",
      description:
        "We employ robust systems to detect and prevent fraudulent activities, multiple accounts, and any form of cheating or manipulation.",
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
  ];

  const prohibitedActivities = [
    {
      activity: "Multiple Accounts",
      description:
        "Creating or operating multiple accounts to gain unfair advantages is strictly prohibited. Each user is allowed only one account.",
    },
    {
      activity: "Collusion",
      description:
        "Coordinating with other users to manipulate contest outcomes or share insider information is not allowed.",
    },
    {
      activity: "Automated Tools",
      description:
        "Using bots, scripts, or automated tools to create teams, join contests, or interact with the platform is prohibited.",
    },
    {
      activity: "Account Sharing",
      description:
        "Sharing your account credentials with others or allowing others to access your account is not permitted.",
    },
    {
      activity: "Exploitation of Bugs",
      description:
        "Intentionally exploiting any bugs, glitches, or vulnerabilities in the platform for personal advantage is prohibited.",
    },
    {
      activity: "False Information",
      description:
        "Providing false or misleading information during registration or at any other time is strictly prohibited.",
    },
  ];

  const consequences = [
    "Warning and notification of the violation",
    "Temporary suspension of account access",
    "Permanent ban from the platform",
    "Forfeiture of any contest standings or achievements",
    "Legal action in cases of severe violations",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fair Play Policy
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            At DineDivine, we believe in fair competition. Our fair play
            policies ensure that every user enjoys a level playing field.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Commitment to Fair Play
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              DineDivine is committed to providing a fair and enjoyable fantasy
              sports experience for all users. We have implemented
              comprehensive policies and systems to ensure that every
              participant has an equal opportunity to showcase their cricket
              knowledge and skills.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our fair play policy applies to all users and covers all aspects
              of the platform, from account creation to contest participation.
              By using DineDivine, you agree to abide by these policies and
              contribute to a fair gaming environment.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Core Fair Play Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibited Activities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Prohibited Activities
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The following activities are strictly prohibited on DineDivine.
            Engaging in any of these activities may result in account
            suspension or permanent ban.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prohibitedActivities.map((item) => (
              <div
                key={item.activity}
                className="bg-red-50 border border-red-200 p-6 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-red-800">
                    {item.activity}
                  </h3>
                </div>
                <p className="text-red-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Ensure Fair Play */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How We Ensure Fair Play
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Identity Verification
              </h3>
              <p className="text-gray-600">
                We verify user identities to prevent multiple accounts and
                ensure each user is who they claim to be.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Automated Monitoring
              </h3>
              <p className="text-gray-600">
                Our systems continuously monitor for suspicious activities,
                unusual patterns, and potential violations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Manual Review
              </h3>
              <p className="text-gray-600">
                Our team manually reviews flagged accounts and activities to
                ensure accurate enforcement of policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consequences */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Consequences of Violations
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Violations of our fair play policy may result in the following
              actions, depending on the severity and nature of the violation:
            </p>
            <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-xl">
              <ol className="space-y-4">
                {consequences.map((consequence, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-yellow-800 pt-1">{consequence}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Report Violations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-600 text-white p-8 md:p-12 rounded-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Report a Violation</h2>
              <p className="text-green-100 text-lg mb-8">
                If you suspect any user of violating our fair play policy,
                please report it to us. We take all reports seriously and
                investigate them thoroughly. Your identity will be kept
                confidential.
              </p>
              <Link
                href="/contact"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 text-lg inline-block"
              >
                Report Violation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skill-Based Game */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Fantasy Cricket is a Game of Skill
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Fantasy cricket on DineDivine is a game of skill where success
              depends on your knowledge of cricket, understanding of player
              performance, and ability to analyze match conditions. Unlike games
              of chance, your decisions directly impact your team&apos;s
              performance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We encourage all users to develop their skills, learn from
              experienced players, and continuously improve their fantasy
              cricket strategies. Remember, the goal is to have fun while
              showcasing your cricket expertise!
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            This fair play policy is subject to updates. Users will be notified
            of any significant changes. For questions about our fair play
            policies, please{" "}
            <Link href="/contact" className="text-green-600 hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
