import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - DineDivine",
  description:
    "Read DineDivine's privacy policy to understand how we collect, use, and protect your personal information on our free-to-play fantasy sports platform.",
};

export default function PrivacyPage() {
  const lastUpdated = "December 2025";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
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
              <p className="text-gray-300 leading-relaxed mb-4">
                DINEDIVINE VENTURES PRIVATE LIMITED (&quot;Company&quot;,
                &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the
                DineDivine platform (the &quot;Platform&quot;). This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our Platform.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By using our Platform, you consent to the data practices
                described in this Privacy Policy. If you do not agree with the
                terms of this Privacy Policy, please do not access or use our
                Platform.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-white mb-3">
                2.1 Personal Information
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you register for an account, we may collect:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Full name</li>
                <li>Email address</li>
                <li>Mobile phone number</li>
                <li>Date of birth</li>
                <li>State of residence</li>
                <li>Username and password</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">
                2.2 Usage Information
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We automatically collect certain information when you use our
                Platform:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Device information (type, operating system, browser)</li>
                <li>IP address and location data</li>
                <li>Pages visited and features used</li>
                <li>Time spent on the Platform</li>
                <li>Referring URLs</li>
                <li>Contest participation and team selections</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">
                2.3 Cookies and Tracking Technologies
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your
                experience, analyze usage patterns, and improve our services.
                You can control cookie settings through your browser, but
                disabling cookies may affect Platform functionality.
              </p>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>To create and manage your account</li>
                <li>To provide and maintain our Platform services</li>
                <li>To verify your identity and eligibility</li>
                <li>To communicate with you about your account and updates</li>
                <li>To respond to your inquiries and support requests</li>
                <li>To improve our Platform and user experience</li>
                <li>To analyze usage patterns and trends</li>
                <li>To detect and prevent fraud or abuse</li>
                <li>To enforce our Terms and Conditions</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">
                4.1 Service Providers
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may share information with trusted third-party service
                providers who assist us in operating our Platform, such as
                hosting providers, analytics services, and customer support
                tools. These providers are bound by confidentiality agreements.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">
                4.2 Legal Requirements
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may disclose your information if required by law, court
                order, or government request, or if we believe disclosure is
                necessary to protect our rights, your safety, or the safety of
                others.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">
                4.3 Business Transfers
              </h3>
              <p className="text-gray-300 leading-relaxed">
                In the event of a merger, acquisition, or sale of assets, your
                information may be transferred to the acquiring entity. We will
                notify you of any such change.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures
                to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure server infrastructure</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                However, no method of transmission over the internet or
                electronic storage is 100% secure. While we strive to protect
                your information, we cannot guarantee absolute security.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Data Retention
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We retain your personal information for as long as your account
                is active or as needed to provide you services. We may also
                retain information as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
                <li>Maintain business records</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Your Rights
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <div className="space-y-4">
                <div className="bg-[#0a0f1a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    Right to Access
                  </h4>
                  <p className="text-gray-300 text-sm">
                    You can request a copy of the personal information we hold
                    about you.
                  </p>
                </div>
                <div className="bg-[#0a0f1a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    Right to Correction
                  </h4>
                  <p className="text-gray-300 text-sm">
                    You can request correction of inaccurate or incomplete
                    information.
                  </p>
                </div>
                <div className="bg-[#0a0f1a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    Right to Deletion
                  </h4>
                  <p className="text-gray-300 text-sm">
                    You can request deletion of your personal information,
                    subject to legal requirements.
                  </p>
                </div>
                <div className="bg-[#0a0f1a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    Right to Withdraw Consent
                  </h4>
                  <p className="text-gray-300 text-sm">
                    You can withdraw your consent for data processing at any
                    time.
                  </p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise these rights, please contact us using the
                information provided at the end of this policy.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Children&apos;s Privacy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our Platform is not intended for users under 18 years of age. We
                do not knowingly collect personal information from children. If
                we discover that we have collected information from a minor, we
                will delete it immediately. If you believe we have inadvertently
                collected information from a minor, please contact us.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Third-Party Links
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our Platform may contain links to third-party websites or
                services. We are not responsible for the privacy practices of
                these third parties. We encourage you to read the privacy
                policies of any third-party sites you visit.
              </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new Privacy
                Policy on this page and updating the &quot;Last Updated&quot;
                date. We encourage you to review this Privacy Policy
                periodically.
              </p>
            </div>

            {/* Grievance Officer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Grievance Officer
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                In accordance with the Information Technology Act, 2000 and
                rules made thereunder, the name and contact details of the
                Grievance Officer are provided below:
              </p>
              <div className="bg-[#0a0f1a] p-6 rounded-lg">
                <p className="text-gray-300 mb-2">
                  <strong>Grievance Officer</strong>
                </p>
                <p className="text-gray-300 mb-2">
                  DINEDIVINE VENTURES PRIVATE LIMITED
                </p>
                <p className="text-gray-300 mb-2">
                  C/O PARDEEP SAGGAR, 20-P DSC, SEC-23A, Shivaji Nagar (Gurgaon),
                  Shivaji Nagar, Gurgaon- 122001, Haryana, India
                </p>
                <p className="text-gray-300">
                  Time: Monday to Friday, 10:00 AM to 6:00 PM IST
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us:
              </p>
              <div className="bg-[#22c55e]/10 border border-green-500/30 p-6 rounded-lg">
                <p className="text-gray-300 mb-2">
                  <strong>DINEDIVINE VENTURES PRIVATE LIMITED</strong>
                </p>
                <p className="text-gray-300 mb-2">
                  C/O PARDEEP SAGGAR, 20-P DSC, SEC-23A, Shivaji Nagar (Gurgaon),
                  Shivaji Nagar, Gurgaon- 122001, Haryana, India
                </p>
                <p className="text-gray-300 mb-2">
                  CIN: U56102HR2024PTC123713
                </p>
                <p className="text-gray-300">
                  Website:{" "}
                  <a
                    href="https://www.dinedivinelive.com"
                    className="text-[#22c55e] hover:underline"
                  >
                    www.dinedivinelive.com
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
                href="/terms"
                className="text-[#22c55e] hover:text-[#22c55e] hover:underline"
              >
                Terms and Conditions
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
