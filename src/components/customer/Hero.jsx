import { Star, Briefcase, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import HeroVideo from "../../assets/HeroVideo.mp4";
import { NavLink } from "react-router-dom";

export function Hero() {
  return (
    <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 text-white overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          className="text-center lg:text-left order-2 lg:order-1"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            All in One Pros
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl text-emerald-400 mt-3 sm:mt-4 font-semibold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Moving • Fixing • Installing
          </motion.h2>

          <motion.p
            className="mt-4 sm:mt-6 text-gray-200 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Reliable Experts in Dubai. Professional movers & home specialists at your doorstep.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {/* Book Now */}
            <NavLink to="/book" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                Book Now
              </motion.button>
            </NavLink>

            {/* Get Instant Quote */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto border border-white/30 hover:bg-white/10 px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
            >
              Get Instant Quote
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-8 sm:mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 grid grid-cols-3 gap-4 sm:gap-6 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[ 
              { icon: <Star className="text-emerald-400" size={20} />, title: "4.9", text: "Rating" },
              { icon: <Briefcase className="text-emerald-400" size={20} />, title: "1200+", text: "Jobs Done" },
              { icon: <MapPin className="text-emerald-400" size={20} />, title: "Dubai", text: "All Areas" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
              >
                <div className="flex justify-center mb-1 sm:mb-2">{item.icon}</div>
                <h3 className="text-lg sm:text-2xl font-bold">{item.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Video Card */}
        <motion.div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <video
            className="w-full h-64 sm:h-80 lg:h-full object-cover"
            src={HeroVideo}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Optional overlay for aesthetics */}
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;