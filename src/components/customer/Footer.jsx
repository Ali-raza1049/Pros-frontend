import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              All in One Pros
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Professional movers & home specialists at your doorstep. 
              We handle moving, fixing, installing, and all your home 
              service needs across Dubai.
            </p>
            <p className="text-sm text-gray-400">
              Serving Dubai, UAE
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/book" className="hover:text-white transition-colors">
                  Book Now
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <a href="tel:+971566118908" className="hover:text-white transition-colors">
                  +971 56 611 8908
                </a>
              </li>
              <li>
                <a href="mailto:info@allinonepros.ae" className="hover:text-white transition-colors">
                  info@allinonepros.ae
                </a>
              </li>
            </ul>
          </div>

          {/* CTA Column */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Need Help Fast?
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Book professional movers and home experts today.
            </p>

            <a
              href="https://wa.me/971566118908"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto px-4 sm:px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors text-center text-sm"
            >
              WhatsApp Us
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 text-center text-sm text-gray-500">
          © 2026 All in One Pros. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;