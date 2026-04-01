import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";
import { fetchServices } from "../../store/slices/serviceSlice";
import { Link, useNavigate } from "react-router-dom";

export function Service() {
  const dispatch = useDispatch();
  const { services, loading } = useSelector(state => state.services);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Get only active services and limit to 4 for homepage display
  const activeServices = services.filter(service => service.isActive).slice(0, 4);

  const handleBookService = (service) => {
    // Navigate to booking page with service info
    navigate('/book', { state: { selectedService: service } });
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Our <span className="text-emerald-500">Services</span>
          </h2>
          <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Professional solutions for all your home and business needs with experienced professionals
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {activeServices.map((service, index) => (
            <motion.div
              key={service._id}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => handleBookService(service)}
            >
              {/* Service Icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">
                {service.name}
              </h3>

              {/* Service Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                {service.description}
              </p>

              {/* Service Details */}
              <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>~{service.duration || 60} min</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <MapPin size={12} />
                  <span>UAE Wide</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Star size={12} />
                  <span>Professional</span>
                </div>
              </div>

              {/* Price and Category */}
              <div className="mb-4">
                <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-2">
                  AED {service.price}
                </div>
                <span className="inline-block bg-emerald-100 text-emerald-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                  {service.category}
                </span>
              </div>

              {/* Book Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookService(service);
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-emerald-600 text-sm sm:text-base"
              >
                Book Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Fallback for no services */}
        {activeServices.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-4xl sm:text-6xl mb-4">🔧</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Services Coming Soon</h3>
            <p className="text-gray-600">We're preparing amazing services for you. Check back soon!</p>
          </div>
        )}

        {/* View All Button */}
        {activeServices.length > 0 && (
          <motion.div
            className="mt-12 sm:mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 mx-auto text-sm sm:text-base"
              >
                View All Services
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Additional Info */}
        <motion.div
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Star className="text-emerald-600" size={20} />
            </div>
            <h4 className="text-base sm:text-lg font-semibold mb-2">Quality Guaranteed</h4>
            <p className="text-gray-600 text-sm">Professional service with 100% satisfaction guarantee</p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Clock className="text-emerald-600" size={20} />
            </div>
            <h4 className="text-base sm:text-lg font-semibold mb-2">Quick Response</h4>
            <p className="text-gray-600 text-sm">Same-day service available for urgent requirements</p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <MapPin className="text-emerald-600" size={20} />
            </div>
            <h4 className="text-base sm:text-lg font-semibold mb-2">UAE Wide</h4>
            <p className="text-gray-600 text-sm">Serving all emirates with professional teams</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Service;