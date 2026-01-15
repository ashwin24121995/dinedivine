import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - DineDivine",
  description:
    "Learn about DineDivine, India's premier social casino platform. Discover our mission, vision, and commitment to providing safe, free-to-play entertainment in compliance with PROGA 2025.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#16a34a] to-[#22c55e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover the story behind DineDivine and our commitment to bringing
            you the best social casino entertainment experience.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Who We Are
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                DineDivine is a premier free-to-play social casino platform
                operated by <strong>DINEDIVINE VENTURES PRIVATE LIMITED</strong>. 
                We are dedicated to providing gaming enthusiasts across India
                with an engaging and entertaining platform to enjoy classic casino-style games.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our platform is designed purely for entertainment purposes,
                allowing users to play slots, dice, and scratch card games without any monetary
                involvement. We believe that the thrill of gaming should be
                accessible to everyone, which is why our platform is completely
                free to play.
              </p>
              <p className="text-gray-300 leading-relaxed">
                In 2025, following the enactment of the <strong>Promotion and Regulation of Online Gaming Act (PROGA)</strong>, 
                we made the strategic decision to transition from Social Casino Games to a pure social casino model. 
                This shift reflects our unwavering commitment to following the rules and regulations of the 
                Indian Government while continuing to provide high-quality entertainment to our community.
              </p>
            </div>
            <div className="bg-[#22c55e]/10 p-8 rounded-2xl border border-[#22c55e]/20">
              <h3 className="text-xl font-semibold text-[#22c55e] mb-4">
                Company Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Company Name</p>
                  <p className="font-medium text-white">
                    DINEDIVINE VENTURES PRIVATE LIMITED
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">CIN</p>
                  <p className="font-medium text-white">
                    U56102HR2024PTC123713
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">GST Number</p>
                  <p className="font-medium text-white">06AALCD0239Q1ZA</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Registered Address</p>
                  <p className="font-medium text-white">
                    First Floor, Sco 20P, Back Half, Sector 23A, HUDA Market, Gurugram, Haryana, 122017
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1a2332] p-8 rounded-2xl shadow-lg border border-white/5">
              <div className="w-16 h-16 bg-[#22c55e]/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#22c55e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To democratize social gaming entertainment by providing a
                completely free platform where users can engage with high-quality casino-style games. 
                We aim to create an inclusive community where passion for gaming is celebrated 
                without any financial barriers or risks.
              </p>
            </div>
            <div className="bg-[#1a2332] p-8 rounded-2xl shadow-lg border border-white/5">
              <div className="w-16 h-16 bg-[#22c55e]/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#22c55e]"
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
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To become India's most trusted and beloved free-to-play
                social casino platform. We envision a future where millions of
                enthusiasts come together on DineDivine to enjoy the excitement 
                of gaming in a safe, responsible, and fully compliant environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Integrity
              </h3>
              <p className="text-gray-400 text-sm">
                We operate with complete transparency and honesty in all our
                dealings.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-xl font-semibold text-white mb-2">
                Accessibility
              </h3>
              <p className="text-gray-400 text-sm">
                Free-to-play model ensures everyone can enjoy social gaming.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Community
              </h3>
              <p className="text-gray-400 text-sm">
                Building a vibrant community of passionate gaming enthusiasts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Compliance
              </h3>
              <p className="text-gray-400 text-sm">
                Ensuring full adherence to government rules and regulations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
