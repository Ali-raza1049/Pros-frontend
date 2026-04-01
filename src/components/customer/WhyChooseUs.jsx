import { motion } from "framer-motion";
import { ShieldCheck, Clock, DollarSign, MessageCircle, Smile, Users } from "lucide-react";

export  function WhyChooseUs() {
  const features = [
    { icon: <ShieldCheck size={24} />, text: "Licensed & Insured Team" },
    { icon: <Clock size={24} />, text: "Fast Response Time" },
    { icon: <DollarSign size={24} />, text: "Affordable & Transparent Rates" },
    { icon: <MessageCircle size={24} />, text: "WhatsApp Support 24/7" },
    { icon: <Smile size={24} />, text: "100% Customer Satisfaction" },
    { icon: <Users size={24} />, text: "Experienced Professionals" },
  ];

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 text-white">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518684079-3c830dcef090')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-emerald-400 text-base sm:text-lg font-medium mb-2 sm:mb-3">
            Dubai Skyline
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Why Choose Us
          </h2>
          <p className="text-gray-300 mt-3 sm:mt-4 text-base sm:text-lg">
            Dubai's most trusted home service professionals
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 sm:gap-4 bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-lg hover:bg-white/10 transition duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-emerald-400 flex-shrink-0">
                {feature.icon}
              </div>
              <p className="text-base sm:text-lg font-medium">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default WhyChooseUs;