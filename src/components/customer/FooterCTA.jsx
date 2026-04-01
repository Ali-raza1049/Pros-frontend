import React from "react";

const FooterCTA = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 text-center">
        
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Need Movers Today?
        </h2>

        {/* Subtext */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-600">
          Get instant response and same-day service available
        </p>

        {/* CTA Button */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <a
            href="https://wa.me/971566118908"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4
            bg-green-500 hover:bg-green-600
            text-white font-semibold rounded-2xl
            shadow-md hover:shadow-lg
            transition-all duration-300
            hover:scale-105 active:scale-95
            text-sm sm:text-base"
          >
            <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-300 animate-pulse"></span>
            WhatsApp Us Now
          </a>
        </div>

      </div>
    </section>
  );
};

export default FooterCTA;