"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is DineDivine?",
        answer:
          "DineDivine is a free-to-play fantasy sports platform where you can create virtual cricket teams and compete with other users based on real match performances. It's designed purely for entertainment purposes with no real money involvement.",
      },
      {
        question: "Is DineDivine free to use?",
        answer:
          "Yes, DineDivine is 100% free to use. There are no entry fees, subscription charges, or hidden costs. All contests and features are completely free.",
      },
      {
        question: "Is this a gambling or betting platform?",
        answer:
          "No, DineDivine is NOT a gambling or betting platform. We are a free-to-play fantasy sports platform for entertainment only. There is no real money involved, no cash prizes, and no monetary rewards of any kind.",
      },
      {
        question: "Who can use DineDivine?",
        answer:
          "DineDivine is available to users who are 18 years of age or older and reside in India, except for residents of Telangana, Andhra Pradesh, Assam, and Odisha due to state regulations.",
      },
    ],
  },
  {
    category: "Account & Registration",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Click on the 'Register' button on our website, fill in your details including name, email, and phone number, verify your age (18+), and create a password. You'll receive a verification email/OTP to complete the registration.",
      },
      {
        question: "What information do I need to register?",
        answer:
          "You'll need to provide your full name, email address, mobile number, date of birth (to verify you're 18+), and create a secure password. You may also need to verify your identity.",
      },
      {
        question: "Can I have multiple accounts?",
        answer:
          "No, each user is allowed only one account. Creating multiple accounts violates our fair play policy and may result in permanent ban from the platform.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click on 'Forgot Password' on the login page, enter your registered email address, and follow the instructions sent to your email to reset your password.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes, you can request account deletion by contacting our support team. Once deleted, all your data will be permanently removed and cannot be recovered.",
      },
    ],
  },
  {
    category: "Playing Fantasy Cricket",
    questions: [
      {
        question: "How do I create a fantasy team?",
        answer:
          "Select an upcoming match, choose 11 players from both teams within the credit limit, select your Captain (2x points) and Vice-Captain (1.5x points), and save your team before the match deadline.",
      },
      {
        question: "How many players can I select from one team?",
        answer:
          "You can select a maximum of 7 players from a single playing team. Your fantasy team must include players from both teams.",
      },
      {
        question: "What is the team composition requirement?",
        answer:
          "Your team must have: 1-4 Wicket-keepers, 3-6 Batsmen, 1-4 All-rounders, and 3-6 Bowlers. The total must be exactly 11 players.",
      },
      {
        question: "Can I edit my team after creating it?",
        answer:
          "Yes, you can edit your team any time before the match deadline (usually when the match starts). Once the match begins, no changes can be made.",
      },
      {
        question: "How are fantasy points calculated?",
        answer:
          "Points are calculated based on real player performances including runs scored, wickets taken, catches, stumpings, and more. Your Captain earns 2x points and Vice-Captain earns 1.5x points.",
      },
      {
        question: "Can I create multiple teams for the same match?",
        answer:
          "Yes, you can create multiple fantasy teams for the same match to try different strategies and player combinations.",
      },
    ],
  },
  {
    category: "Contests & Leaderboards",
    questions: [
      {
        question: "How do contests work?",
        answer:
          "Contests are competitions where you enter your fantasy team to compete against other users. All contests on DineDivine are free to join. Your ranking depends on how many points your team scores.",
      },
      {
        question: "Are there any prizes for winning?",
        answer:
          "DineDivine is a free-to-play platform for entertainment only. There are no cash prizes, monetary rewards, or real money involved. The satisfaction of showcasing your cricket knowledge is the reward!",
      },
      {
        question: "How are leaderboard rankings determined?",
        answer:
          "Rankings are based on the total fantasy points scored by your team. The user with the highest points ranks first. In case of a tie, the ranking may be shared or determined by other criteria.",
      },
    ],
  },
  {
    category: "Technical & Support",
    questions: [
      {
        question: "What devices can I use to access DineDivine?",
        answer:
          "DineDivine is a web-based platform accessible from any device with a modern web browser, including smartphones, tablets, laptops, and desktop computers.",
      },
      {
        question: "The website is not loading properly. What should I do?",
        answer:
          "Try clearing your browser cache, using a different browser, or checking your internet connection. If the issue persists, contact our support team.",
      },
      {
        question: "How do I contact customer support?",
        answer:
          "You can reach our support team through the Contact Us page on our website. We aim to respond to all queries within 24-48 hours.",
      },
      {
        question: "Where can I report bugs or issues?",
        answer:
          "Please report any bugs or technical issues through our Contact Us page. Provide as much detail as possible including screenshots if available.",
      },
    ],
  },
  {
    category: "Legal & Compliance",
    questions: [
      {
        question: "Is fantasy sports legal in India?",
        answer:
          "Fantasy sports is recognized as a game of skill in India and is legal in most states. However, some states have restrictions, which is why DineDivine is not available in Telangana, Andhra Pradesh, Assam, and Odisha.",
      },
      {
        question: "Why is DineDivine not available in some states?",
        answer:
          "Due to state-specific regulations regarding online gaming and fantasy sports, we are unable to offer our services in Telangana, Andhra Pradesh, Assam, and Odisha. We comply with all applicable laws.",
      },
      {
        question: "How is my personal data protected?",
        answer:
          "We take data privacy seriously. Your personal information is encrypted and stored securely. We do not sell or share your data with third parties. Please read our Privacy Policy for complete details.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[#22c55e]/20">
      <button
        className="w-full py-4 flex justify-between items-center text-left hover:text-[#22c55e] transition-colors duration-200"
        onClick={onClick}
      >
        <span className="font-medium text-white pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-[#22c55e] flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-400 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Find answers to common questions about DineDivine, fantasy cricket,
            and how our platform works.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b-2 border-green-600">
                {category.category}
              </h2>
              <div className="bg-[#1a2332] rounded-xl shadow-lg p-6">
                {category.questions.map((item, questionIndex) => (
                  <FAQItem
                    key={questionIndex}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openItems[`${categoryIndex}-${questionIndex}`] || false}
                    onClick={() => toggleItem(categoryIndex, questionIndex)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#22c55e] text-white p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Our support
              team is here to help. Reach out to us and we&apos;ll get back to
              you as soon as possible.
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

      {/* Quick Links */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/how-to-play"
              className="bg-[#1a2332] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center group"
            >
              <div className="w-12 h-12 bg-[#22c55e]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                <svg
                  className="w-6 h-6 text-[#22c55e]"
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
              </div>
              <h3 className="font-semibold text-white mb-2">How To Play</h3>
              <p className="text-gray-400 text-sm">
                Step-by-step guide to get started
              </p>
            </Link>
            <Link
              href="/fair-play"
              className="bg-[#1a2332] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center group"
            >
              <div className="w-12 h-12 bg-[#22c55e]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                <svg
                  className="w-6 h-6 text-[#22c55e]"
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
              <h3 className="font-semibold text-white mb-2">Fair Play</h3>
              <p className="text-gray-400 text-sm">
                Our policies for fair competition
              </p>
            </Link>
            <Link
              href="/responsible-gaming"
              className="bg-[#1a2332] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center group"
            >
              <div className="w-12 h-12 bg-[#22c55e]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                <svg
                  className="w-6 h-6 text-[#22c55e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">
                Responsible Gaming
              </h3>
              <p className="text-gray-400 text-sm">
                Play responsibly and safely
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
