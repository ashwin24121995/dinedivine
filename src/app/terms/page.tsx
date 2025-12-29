import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions - DineDivine",
  description:
    "Read the terms and conditions for using DineDivine, the free-to-play fantasy sports platform. Understand your rights and responsibilities as a user.",
};

export default function TermsPage() {
  const lastUpdated = "December 2025";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Please read these terms carefully before using DineDivine
          </p>
          <p className="text-green-200 mt-4">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Welcome to DineDivine. These Terms and Conditions
                (&quot;Terms&quot;) govern your use of the DineDivine website
                and services (collectively, the &quot;Platform&quot;) operated
                by DINEDIVINE VENTURES PRIVATE LIMITED (&quot;Company&quot;,
                &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company
                registered in India with CIN U56102HR2024PTC123713.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                By accessing or using our Platform, you agree to be bound by
                these Terms. If you do not agree to these Terms, please do not
                use our Platform.
              </p>
              <div className="bg-[#22c55e]/10 border border-green-200 p-4 rounded-lg">
                <p className="text-green-800 font-medium">
                  DineDivine is a FREE-TO-PLAY fantasy sports platform designed
                  purely for entertainment purposes. There is NO real money
                  involvement, NO cash prizes, and NO gambling or betting of any
                  kind.
                </p>
              </div>
            </div>

            {/* Eligibility */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Eligibility
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                To use DineDivine, you must:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                <li>Be at least 18 years of age</li>
                <li>Be a resident of India</li>
                <li>
                  NOT be a resident of Telangana, Andhra Pradesh, Assam, or
                  Odisha
                </li>
                <li>Have the legal capacity to enter into a binding agreement</li>
                <li>Not be prohibited from using the Platform under applicable laws</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                By using our Platform, you represent and warrant that you meet
                all eligibility requirements. We reserve the right to verify
                your eligibility at any time and suspend or terminate accounts
                that do not meet these requirements.
              </p>
            </div>

            {/* Account Registration */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                3. Account Registration
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                To access certain features of the Platform, you must create an
                account. When registering, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Keep your password secure and confidential</li>
                <li>Not share your account credentials with others</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                You may only create one account. Multiple accounts are
                prohibited and may result in termination of all associated
                accounts.
              </p>
            </div>

            {/* Platform Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Platform Services
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                DineDivine provides a free-to-play fantasy sports platform where
                users can:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                <li>Create virtual fantasy cricket teams</li>
                <li>Participate in free contests</li>
                <li>Track live scores and player performances</li>
                <li>Compete on leaderboards with other users</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <p className="text-yellow-800">
                  <strong>Important:</strong> All services are provided free of
                  charge. There are no entry fees, no real money prizes, and no
                  monetary rewards. The Platform is designed solely for
                  entertainment purposes.
                </p>
              </div>
            </div>

            {/* User Conduct */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                5. User Conduct
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                When using our Platform, you agree NOT to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Create multiple accounts or share accounts</li>
                <li>Use automated tools, bots, or scripts</li>
                <li>Attempt to manipulate contests or leaderboards</li>
                <li>Engage in collusion with other users</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Post offensive, defamatory, or inappropriate content</li>
                <li>Attempt to hack, disrupt, or compromise the Platform</li>
                <li>Exploit bugs or vulnerabilities for unfair advantage</li>
                <li>Impersonate others or provide false information</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                Violation of these rules may result in warnings, suspension, or
                permanent termination of your account.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                All content on the Platform, including but not limited to text,
                graphics, logos, images, software, and design, is the property
                of DINEDIVINE VENTURES PRIVATE LIMITED or its licensors and is
                protected by intellectual property laws.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                You are granted a limited, non-exclusive, non-transferable
                license to access and use the Platform for personal,
                non-commercial purposes. You may not:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Copy, modify, or distribute our content without permission</li>
                <li>Use our trademarks or branding without authorization</li>
                <li>Reverse engineer or decompile our software</li>
                <li>Remove any copyright or proprietary notices</li>
              </ul>
            </div>

            {/* Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Disclaimers
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                The Platform is provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, either express
                or implied. We do not warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                <li>The Platform will be uninterrupted or error-free</li>
                <li>Defects will be corrected in a timely manner</li>
                <li>The Platform is free of viruses or harmful components</li>
                <li>The results obtained from using the Platform will be accurate</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                Match data and player statistics are sourced from third-party
                providers. While we strive for accuracy, we do not guarantee the
                completeness or accuracy of such data.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                To the maximum extent permitted by law, DINEDIVINE VENTURES
                PRIVATE LIMITED and its directors, employees, and affiliates
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                <li>Your use or inability to use the Platform</li>
                <li>Any errors or inaccuracies in content</li>
                <li>Unauthorized access to your account</li>
                <li>Any third-party conduct on the Platform</li>
                <li>Any interruption or cessation of services</li>
              </ul>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Indemnification
              </h2>
              <p className="text-gray-400 leading-relaxed">
                You agree to indemnify, defend, and hold harmless DINEDIVINE
                VENTURES PRIVATE LIMITED, its officers, directors, employees,
                and agents from any claims, damages, losses, liabilities, and
                expenses (including legal fees) arising from your use of the
                Platform, violation of these Terms, or infringement of any
                third-party rights.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Termination
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We reserve the right to suspend or terminate your account and
                access to the Platform at any time, without prior notice, for
                any reason, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Conduct harmful to other users or the Platform</li>
                <li>Extended periods of inactivity</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                You may also terminate your account at any time by contacting
                our support team.
              </p>
            </div>

            {/* Modifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Modifications to Terms
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to modify these Terms at any time.
                Significant changes will be communicated through the Platform or
                via email. Your continued use of the Platform after changes
                constitutes acceptance of the modified Terms. We encourage you
                to review these Terms periodically.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance
                with the laws of India. Any disputes arising from these Terms or
                your use of the Platform shall be subject to the exclusive
                jurisdiction of the courts in Gurgaon, Haryana, India.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                13. Dispute Resolution
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Any dispute or claim arising out of or relating to these Terms
                shall first be attempted to be resolved through good-faith
                negotiations. If the dispute cannot be resolved through
                negotiations within 30 days, either party may pursue legal
                remedies as provided under applicable law.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                14. Severability
              </h2>
              <p className="text-gray-400 leading-relaxed">
                If any provision of these Terms is found to be invalid or
                unenforceable, the remaining provisions shall continue in full
                force and effect. The invalid provision shall be modified to the
                minimum extent necessary to make it valid and enforceable.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                15. Contact Information
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-[#0a0f1a] p-6 rounded-lg">
                <p className="text-gray-300 mb-2">
                  <strong>DINEDIVINE VENTURES PRIVATE LIMITED</strong>
                </p>
                <p className="text-gray-400 mb-2">
                  C/O PARDEEP SAGGAR, 20-P DSC, SEC-23A, Shivaji Nagar (Gurgaon),
                  Shivaji Nagar, Gurgaon- 122001, Haryana, India
                </p>
                <p className="text-gray-400 mb-2">
                  CIN: U56102HR2024PTC123713
                </p>
                <p className="text-gray-400">
                  Website:{" "}
                  <a
                    href="https://www.dinedivine.com"
                    className="text-[#22c55e] hover:underline"
                  >
                    www.dinedivine.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-[#22c55e]/20">
            <h3 className="text-lg font-semibold text-white mb-4">
              Related Policies
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy"
                className="text-[#22c55e] hover:text-[#22c55e] hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/fair-play"
                className="text-[#22c55e] hover:text-[#22c55e] hover:underline"
              >
                Fair Play Policy
              </Link>
              <Link
                href="/responsible-gaming"
                className="text-[#22c55e] hover:text-[#22c55e] hover:underline"
              >
                Responsible Gaming
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
