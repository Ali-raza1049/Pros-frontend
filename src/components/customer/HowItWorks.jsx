import { motion } from "framer-motion";

export  function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Book Online",
      description:
        "Fill out our simple booking form or message us on WhatsApp.",
    },
    {
      number: "2",
      title: "We Contact You",
      description:
        "Our team reaches out instantly to confirm details and schedule.",
    },
    {
      number: "3",
      title: "Job Complete",
      description:
        "We arrive on time and complete the job with excellence.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            How It <span className="text-emerald-500">Works</span>
          </h2>
          <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg">
            Simple, fast, and efficient
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">

          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-10 sm:top-12 left-0 w-full h-1 bg-gray-200"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Step Number Circle */}
              <div className="relative z-10 flex items-center justify-center mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 text-white text-xl sm:text-2xl font-bold shadow-lg">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="mt-6 sm:mt-8 text-lg sm:text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 sm:mt-4 text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default HowItWorks;