"use client";

import { useState } from "react";
import Link from "next/link";

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is DineDivine?",
        answer:
          "DineDivine is a free-to-play social casino platform where you can enjoy classic casino-style games like slots, dice, and scratch cards. It's designed purely for entertainment purposes with no real money involvement.",
      },
      {
        question: "Is DineDivine free to use?",
        answer:
          "Yes, DineDivine is 100% free to use. There are no entry fees, subscription charges, or hidden costs. All games and features are completely free.",
      },
      {
        question: "Is this a gambling or betting platform?",
        answer:
          "No, DineDivine is NOT a gambling or betting platform. We are a social casino platform for entertainment only. There is no real money involved, no cash prizes, and no monetary rewards of any kind.",
      },
      {
        question: "Why did the business model change?",
        answer:
          "Following the Promotion and Regulation of Online Gaming Act (PROGA) 2025, we transitioned from fantasy sports to a social casino model to ensure full compliance with Indian government regulations while continuing to provide safe entertainment.",
      },
    ],
  },
  {
    category: "Account & Registration",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Click on the 'Register' button on our website, fill in your details including name, email, and phone number, verify your age (18+), and create a password.",
      },
      {
        question: "What information do I need to register?",
        answer:
          "You'll need to provide your full name, email address, mobile number, and date of birth to verify you're 18 or older.",
      },
      {
        question: "Can I have multiple accounts?",
        answer:
          "No, each user is allowed only one account. Creating multiple accounts violates our fair play policy.",
      },
    ],
  },
  {
    category: "Playing Games",
    questions: [
      {
        question: "What games are available on DineDivine?",
        answer:
          "We offer a variety of social casino games including Slot Machines, Lucky Wheels, Dice Games, Bingo Bash, and themed Scratch Cards like Egypt and Jungle Scratch.",
      },
      {
        question: "Do I need to download anything to play?",
        answer:
          "No, all our games are web-based and can be played directly in your browser on any device.",
      },
      {
        question: "Can I win real money?",
        answer:
          "No. DineDivine is a social casino platform. All games use virtual points for entertainment only. There is no possibility to win real money or physical prizes.",
      },
    ],
  },
  {
    category: "Technical & Support",
    questions: [
      {
        question: "What devices can I use to access DineDivine?",
        answer:
          "DineDivine is accessible from any device with a modern web browser, including smartphones, tablets, laptops, and desktop computers.",
      },
      {
        question: "How do I contact customer support?",
        answer:
          "You can reach our support team through the Contact Us page on our website. We aim to respond to all queries within 24-48 hours.",
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
        className="w-full py-5 flex justify-between items-center text-left hover:text-[#22c55e] transition-colors duration-200"
        onClick={onClick}
      >
        <span className="font-semibold text-white pr-4">{question}</span>
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
        <div className="pb-5 text-gray-400 leading-relaxed text-sm">{answer}</div>
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
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#16a34a] to-[#22c55e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Find answers to common questions about DineDivine, social casino games,
            and our commitment to compliance.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b-2 border-[#22c55e]">
                {category.category}
              </h2>
              <div className="bg-[#1a2332] rounded-2xl shadow-xl p-8 border border-white/5">
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1a2332] to-[#111827] border border-[#22c55e]/20 p-12 rounded-3xl text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support
              team is here to help. Reach out to us and we'll get back to
              you as soon as possible.
            </p>
            <Link
              href="/contact"
              className="bg-[#22c55e] text-black px-10 py-4 rounded-full font-bold hover:bg-[#16a34a] transition-all duration-200 text-lg inline-block shadow-lg shadow-[#22c55e]/20"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
