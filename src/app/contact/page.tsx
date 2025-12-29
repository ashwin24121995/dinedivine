"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission - in production, this would send to an API
    try {
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      title: "Address",
      content:
        "C/O PARDEEP SAGGAR, 20-P DSC, SEC-23A, Shivaji Nagar (Gurgaon), Shivaji Nagar, Gurgaon- 122001, Haryana, India",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      title: "Website",
      content: "www.dinedivine.com",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
    },
    {
      title: "Business Hours",
      content: "Monday - Friday: 10:00 AM - 6:00 PM IST",
      icon: (
        <svg
          className="w-6 h-6"
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
  ];

  const subjectOptions = [
    "General Inquiry",
    "Account Support",
    "Technical Issue",
    "Report a Bug",
    "Fair Play Concern",
    "Privacy Inquiry",
    "Partnership Inquiry",
    "Feedback",
    "Other",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Have questions or need assistance? We&apos;re here to help. Reach
            out to us and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] outline-none transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] outline-none transition-colors bg-[#1a2332]"
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] outline-none transition-colors resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <div className="bg-[#22c55e]/10 border border-green-200 text-[#22c55e] px-4 py-3 rounded-lg">
                    Thank you for your message! We&apos;ll get back to you
                    within 24-48 hours.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    Something went wrong. Please try again later.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-[#22c55e]/20 rounded-lg flex items-center justify-center flex-shrink-0 text-[#22c55e]">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {info.title}
                      </h3>
                      <p className="text-gray-300">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Details */}
              <div className="bg-[#0a0f1a] p-6 rounded-xl mb-8">
                <h3 className="font-semibold text-white mb-4">
                  Company Details
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <strong>Company Name:</strong> DINEDIVINE VENTURES PRIVATE
                    LIMITED
                  </p>
                  <p>
                    <strong>CIN:</strong> U56102HR2024PTC123713
                  </p>
                  <p>
                    <strong>GST No:</strong> 06AALCD0239Q1ZA
                  </p>
                  <p>
                    <strong>PAN No:</strong> AALCD0239Q
                  </p>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-[#22c55e]/10 border border-green-200 p-6 rounded-xl">
                <h3 className="font-semibold text-green-800 mb-2">
                  Response Time
                </h3>
                <p className="text-[#22c55e] text-sm">
                  We aim to respond to all inquiries within 24-48 business
                  hours. For urgent matters, please indicate so in your message
                  subject.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Check out our FAQ section for answers to commonly asked questions
            about DineDivine, fantasy cricket, and our platform.
          </p>
          <Link
            href="/faq"
            className="inline-block bg-[#22c55e] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#22c55e]/30 transition-colors duration-200"
          >
            Visit FAQ
          </Link>
        </div>
      </section>

      {/* Helpful Links */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <h3 className="font-semibold text-white">How To Play</h3>
            </Link>
            <Link
              href="/terms"
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Terms & Conditions</h3>
            </Link>
            <Link
              href="/privacy"
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Privacy Policy</h3>
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
              <h3 className="font-semibold text-white">Responsible Gaming</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
