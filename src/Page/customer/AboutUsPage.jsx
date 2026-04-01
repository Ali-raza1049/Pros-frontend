import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const AboutUsPage = () => {
  const values = [
    { title: "Excellence", description: "We strive for excellence in every job we undertake", icon: <CheckCircle size={32} /> },
    { title: "Customer First", description: "Your satisfaction is our top priority", icon: <CheckCircle size={32} /> },
    { title: "Reliability", description: "On-time service delivery, every time", icon: <CheckCircle size={32} /> },
    { title: "Trust", description: "Licensed, insured, and trusted professionals", icon: <CheckCircle size={32} /> },
    { title: "Care", description: "We treat your home like our own", icon: <CheckCircle size={32} /> },
  ];

  const stats = [
    { value: "1200+", label: "Jobs Completed" },
    { value: "4.9", label: "Customer Rating" },
    { value: "5+", label: "Years Experience" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        className="text-center py-24 bg-linear-to-r from-emerald-500 to-teal-400 text-white px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">About Us</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Dubai's trusted partner for all your home service needs
        </p>
      </motion.div>

      {/* Our Story */}
      <motion.div
        className="max-w-5xl mx-auto my-16 px-6 space-y-6"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 border-l-4 border-emerald-500 pl-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          All in One Pros was founded with a simple mission: to provide Dubai residents with reliable, professional, and affordable home services all under one roof.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
          We understand the challenges of moving homes, maintaining properties, and finding trustworthy professionals in a fast-paced city like Dubai. That's why we've assembled a team of skilled experts who are passionate about delivering exceptional service.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
          From our humble beginnings as a small moving company, we've grown to offer a comprehensive range of services including furniture fixing, appliance installation, handyman services, and complete home setups. Our commitment to quality and customer satisfaction has earned us the trust of over 1200 satisfied customers across Dubai.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
          Today, we're proud to be one of Dubai's most trusted home service providers, known for our professionalism, efficiency, and dedication to making our customers' lives easier.
        </p>
      </motion.div>

      {/* Our Values */}
      <motion.div
        className="bg-white py-16"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-12">Our Values</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-emerald-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4 text-emerald-500">{value.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-700 text-sm md:text-base">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us / Stats */}
      <motion.div
        className="py-16 bg-linear-to-r from-teal-400 to-emerald-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Why Choose All in One Pros?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white text-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold mb-2 text-emerald-500">{stat.value}</h3>
              <p className="text-lg md:text-xl">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUsPage;