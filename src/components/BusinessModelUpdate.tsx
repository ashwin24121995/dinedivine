'use client';

export default function BusinessModelUpdate() {
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <section className="py-16 bg-[#0f172a] border-y border-[#22c55e]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1e293b] rounded-3xl p-8 md:p-12 border border-[#22c55e]/20 shadow-2xl relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#22c55e]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Important <span className="text-[#22c55e]">Business Model</span> Update
                </h2>
                <p className="text-[#22c55e] font-medium">Compliance & Regulatory Announcement</p>
              </div>
              <div className="bg-[#0f172a] px-4 py-2 rounded-full border border-[#22c55e]/30 text-sm text-gray-300">
                Date: <span className="text-white font-semibold">{today}</span>
              </div>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                At <span className="text-white font-semibold">DineDivine</span>, we have always prioritized the safety of our users and strict adherence to the legal framework of the regions we operate in. In light of the recent legislative developments in India, we are announcing a significant transition in our platform's core services.
              </p>

              <div className="bg-[#0f172a]/50 p-6 rounded-2xl border-l-4 border-[#22c55e]">
                <h3 className="text-white font-bold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Regulatory Context: PROGA 2025
                </h3>
                <p className="text-sm">
                  The Government of India has recently enacted the <span className="text-white italic">Promotion and Regulation of Online Gaming Act (PROGA) 2025</span>. This landmark legislation has implemented a comprehensive ban on Real Money Games (RMGs), including popular fantasy sports and rummy platforms, to ensure consumer protection and mitigate financial risks.
                </p>
              </div>

              <p>
                As a responsible corporate entity, <span className="text-white font-semibold">DineDivine Ventures Private Limited</span> fully respects and supports the rules and regulations set forth by the Indian Government. Consequently, we have made the strategic decision to <strong>completely discontinue our Fantasy Sports services</strong> and pivot our business model toward <strong>Social Casino Games</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-[#0f172a]/30 p-5 rounded-xl border border-white/5">
                  <h4 className="text-white font-semibold mb-2">What is Changing?</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Removal of all Fantasy Cricket contests</li>
                    <li>Discontinuation of match-based leaderboards</li>
                    <li>Shift to a 100% Social Casino focus</li>
                  </ul>
                </div>
                <div className="bg-[#0f172a]/30 p-5 rounded-xl border border-white/5">
                  <h4 className="text-white font-semibold mb-2">Our Commitment</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Strict "Free to Play" environment</li>
                    <li>Zero real-money transactions</li>
                    <li>Full compliance with PROGA 2025</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm italic pt-4 border-t border-white/10">
                We thank our community for their continued support as we transition into this new era of safe, social, and compliant entertainment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
