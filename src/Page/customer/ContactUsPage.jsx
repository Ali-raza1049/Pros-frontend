import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, CalendarDays, MapPin } from "lucide-react";

const ContactUsPage = () => {
  const contacts = [
    {
      title: "Phone",
      description: "Call us anytime",
      info: "+971 XX XXX XXXX",
      icon: <Phone size={32} />,
      bg: "bg-emerald-50",
    },
    {
      title: "WhatsApp",
      description: "Quick response",
      info: "Message Us",
      icon: <MessageCircle size={32} />,
      bg: "bg-emerald-50",
    },
    {
      title: "Email",
      description: "Send us a message",
      info: "info@allinonepros.ae",
      icon: <MessageCircle size={32} />,
      bg: "bg-emerald-50",
    },
    {
      title: "Working Hours",
      description: "Available 24/7",
      info: "Round the Clock",
      icon: <CalendarDays size={32} />,
      bg: "bg-emerald-50",
    },
    {
      title: "Service Area",
      description: "We serve all of Dubai",
      info: "Coverage Areas include Dubai Marina, Downtown Dubai, Jumeirah, Business Bay, Arabian Ranches, Dubai Hills, JBR, Dubai Silicon Oasis, International City, Deira, Bur Dubai, and all Dubai areas",
      icon: <MapPin size={32} />,
      bg: "bg-emerald-50",
    },
  ];

  const faqs = [
    {
      question: "What areas do you serve?",
      answer:
        "We provide services across all areas of Dubai, including Dubai Marina, Downtown Dubai, Jumeirah, Business Bay, and more.",
    },
    {
      question: "Do you offer same-day service?",
      answer:
        "Yes! We offer same-day service for most of our services. Contact us early for the best availability.",
    },
    {
      question: "How do I get a quote?",
      answer:
        "Simply fill out our booking form or message us on WhatsApp with your requirements, and we'll provide a transparent quote.",
    },
    {
      question: "Are your workers licensed and insured?",
      answer:
        "Yes, all our team members are fully licensed, insured, and trained professionals.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, bank transfers, and all major payment cards for your convenience.",
    },
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
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Get in touch with our team. We're here to help 24/7.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className={`${contact.bg} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="flex justify-center mb-4 text-emerald-500">{contact.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{contact.title}</h3>
            <p className="text-gray-700 text-base mb-2">{contact.description}</p>
            <p className="text-gray-800 font-medium">{contact.info}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Immediate Assistance */}
      <motion.div
        className="max-w-4xl mx-auto text-center px-6 mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Need Immediate Assistance?
        </h2>
        <p className="text-gray-700 mb-8 text-lg">
          Don't wait! Contact us now for instant support and quick service.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-3xl font-semibold transition-all duration-300">
            💬 WhatsApp Us Now
          </button>
          <button className="bg-teal-400 hover:bg-teal-500 text-white px-8 py-4 rounded-3xl font-semibold transition-all duration-300">
            📞 Call Us
          </button>
          <button className="bg-emerald-300 hover:bg-emerald-400 text-white px-8 py-4 rounded-3xl font-semibold transition-all duration-300">
            📅 Book Online
          </button>
        </div>
        <p className="text-gray-700 mt-6 font-medium">
          ⭐ Trusted by 1200+ customers across Dubai
        </p>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="max-w-6xl mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2 text-emerald-500">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUsPage;