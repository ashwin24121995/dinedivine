import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/how-to-play", label: "How To Play" },
    { href: "/fantasy-cricket", label: "Fantasy Cricket" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ];

  const legalLinks = [
    { href: "/terms", label: "Terms and Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/responsible-gaming", label: "Responsible Gaming" },
    { href: "/fair-play", label: "Fair Play" },
  ];

  return (
    <footer className="bg-[#0a0f1a] border-t border-[#22c55e]/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/favicon.png"
                alt="DineDivine"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <h3 className="text-2xl font-bold text-[#22c55e]">DineDivine</h3>
            </div>
            <p className="text-gray-400 text-sm">
              The Leading Entertainment Platform for Games & Social Fun. A free
              to play platform built for entertainment only.
            </p>
            <div className="text-gray-400 text-sm space-y-1">
              <p>
                <strong className="text-gray-300">Company:</strong> DINEDIVINE
                VENTURES PRIVATE LIMITED
              </p>
              <p>
                <strong className="text-gray-300">CIN:</strong>{" "}
                U56102HR2024PTC123713
              </p>
              <p>
                <strong className="text-gray-300">GST:</strong> 06AALCD0239Q1ZA
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#22c55e]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#22c55e] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#22c55e]">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#22c55e] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#22c55e]">
              Contact Us
            </h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>
                <strong className="text-gray-300">Address:</strong>
              </p>
              <p>
                C/O PARDEEP SAGGAR, 20-P DSC, SEC-23A, Shivaji Nagar (Gurgaon),
                Shivaji Nagar, Gurgaon- 122001, Haryana, India
              </p>
              <p className="pt-2">
                <strong className="text-gray-300">Website:</strong>{" "}
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
      </div>

      {/* Age Restriction Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white font-semibold text-sm">
            This platform is strictly for users aged 18 years and above.
            Users from Telangana, Andhra Pradesh, Assam, and Odisha are not
            allowed.
          </p>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-[#111827] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h5 className="text-sm font-semibold text-yellow-400 mb-2">
            DISCLAIMER
          </h5>
          <p className="text-gray-500 text-xs leading-relaxed">
            DineDivine is a free-to-play fantasy sports platform designed purely
            for entertainment purposes. This platform does not involve any real
            money gaming, betting, or gambling. No real money rewards, cash
            prizes, or monetary returns are offered or implied. Users
            participate solely for entertainment and social engagement. By using
            this platform, you acknowledge that you are 18 years of age or older
            and are not accessing this service from Telangana, Andhra Pradesh,
            Assam, or Odisha. DineDivine strictly adheres to all applicable
            Indian laws and regulations governing fantasy sports platforms.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#050810] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            © {currentYear} DINEDIVINE VENTURES PRIVATE LIMITED. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
