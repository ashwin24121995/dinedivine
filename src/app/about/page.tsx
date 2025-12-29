import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - DineDivine",
  description:
    "Learn about DineDivine, the leading free-to-play fantasy sports platform in India. Discover our mission, vision, and commitment to providing entertainment through fantasy cricket.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover the story behind DineDivine and our commitment to bringing
            you the best fantasy sports entertainment experience.
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
              <p className="text-gray-400 mb-4 leading-relaxed">
                DineDivine is a premier free-to-play fantasy sports platform
                operated by <strong>DINEDIVINE VENTURES PRIVATE LIMITED</strong>
                . We are dedicated to providing cricket enthusiasts across India
                with an engaging and entertaining platform to showcase their
                knowledge of the game.
              </p>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Our platform is designed purely for entertainment purposes,
                allowing users to create fantasy cricket teams, participate in
                contests, and enjoy the thrill of the game without any monetary
                involvement. We believe that the joy of cricket should be
                accessible to everyone, which is why our platform is completely
                free to play.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Based in Gurgaon, Haryana, we operate in strict compliance with
                all applicable Indian laws and regulations governing fantasy
                sports platforms. Our commitment to responsible gaming and fair
                play ensures a safe and enjoyable experience for all our users.
              </p>
            </div>
            <div className="bg-[#22c55e]/10 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
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
                  <p className="text-sm text-gray-400">PAN Number</p>
                  <p className="font-medium text-white">AALCD0239Q</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Registered Address</p>
                  <p className="font-medium text-white">
                    C/O PARDEEP SAGGAR, 20-P DSC, SEC-23A, Shivaji Nagar
                    (Gurgaon), Shivaji Nagar, Gurgaon- 122001, Haryana, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1a2332] p-8 rounded-2xl shadow-lg">
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
              <p className="text-gray-400 leading-relaxed">
                To democratize fantasy sports entertainment by providing a
                completely free platform where cricket fans can engage with the
                sport they love. We aim to create an inclusive community where
                knowledge and passion for cricket are celebrated, without any
                financial barriers or risks.
              </p>
            </div>
            <div className="bg-[#1a2332] p-8 rounded-2xl shadow-lg">
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
              <p className="text-gray-400 leading-relaxed">
                To become India&apos;s most trusted and beloved free-to-play
                fantasy sports platform. We envision a future where millions of
                cricket enthusiasts come together on DineDivine to share their
                passion, compete in friendly contests, and experience the
                excitement of fantasy cricket in a safe and responsible
                environment.
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
              <p className="text-gray-400">
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
              <p className="text-gray-400">
                Free-to-play model ensures everyone can enjoy fantasy sports.
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
              <p className="text-gray-400">
                Building a vibrant community of passionate cricket enthusiasts.
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
                Fair Play
              </h3>
              <p className="text-gray-400">
                Ensuring a level playing field for all participants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#22c55e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose DineDivine?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-green-100">Free To Play</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-green-100">Platform Availability</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">Real-Time</div>
              <p className="text-green-100">Live Score Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">
              Legal Compliance & Restrictions
            </h3>
            <p className="text-yellow-700 mb-4">
              DineDivine operates in full compliance with Indian laws and
              regulations. Please note the following important restrictions:
            </p>
            <ul className="list-disc list-inside text-yellow-700 space-y-2">
              <li>
                Users must be <strong>18 years of age or older</strong> to use
                this platform.
              </li>
              <li>
                Users from <strong>Telangana, Andhra Pradesh, Assam, and Odisha</strong>{" "}
                are not permitted to access or use this platform due to state
                regulations.
              </li>
              <li>
                This is a <strong>free-to-play platform</strong> with no real
                money involvement.
              </li>
              <li>
                No cash prizes, monetary rewards, or gambling activities are
                offered.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
