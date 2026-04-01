import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, X, Star, Clock, MapPin, Phone, Calendar, ArrowRight } from "lucide-react";
import { fetchServices } from "../../store/slices/serviceSlice";
import BookingForm from "../../components/BookingForm";

const BookingPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { services, loading } = useSelector(state => state.services);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    dispatch(fetchServices());
    
    // Check if a service was passed from navigation
    if (location.state?.selectedService) {
      setSelectedService(location.state.selectedService);
      setShowBookingForm(true);
    }
  }, [dispatch, location.state]);

  const activeServices = services.filter(service => service.isActive);

  const infoCards = [
    { 
      title: "Instant Response", 
      description: "We'll reply within minutes on WhatsApp", 
      icon: <MessageCircle size={32} />,
      color: "bg-green-50 text-green-600"
    },
    { 
      title: "24/7 Support", 
      description: "Contact us anytime, any day", 
      icon: <Phone size={32} />,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      title: "Flexible Scheduling", 
      description: "Same-day service available", 
      icon: <Calendar size={32} />,
      color: "bg-purple-50 text-purple-600"
    },
  ];

  const handleBookService = (service = null) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  const handleWhatsAppContact = () => {
    const message = `Hello! I'm interested in booking a service. Can you please help me with the available options and pricing?`;
    const whatsappNumber = "971566118908";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-16 px-4 sm:px-6">
      {/* Header */}
      <motion.div
        className="max-w-5xl mx-auto text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 mt-6 sm:mt-10">
          Book Your <span className="text-emerald-500">Service</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
          Choose from our professional services and book instantly. Our experienced team is ready to help you with all your home and business needs.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="max-w-4xl mx-auto mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => handleBookService()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Calendar size={20} />
            Book Any Service Now
          </button>
          
          <button
            onClick={handleWhatsAppContact}
            className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </button>
        </div>
      </motion.div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <motion.div
          className="max-w-6xl mx-auto mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Available Services</h2>
          
          {activeServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {activeServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {/* Service Header */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800">{service.name}</h3>
                          <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                            {service.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Service Details */}
                    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      {service.duration && (
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                          <Clock size={12} />
                          <span>Duration: ~{service.duration} minutes</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <MapPin size={12} />
                        <span>Available across UAE</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <Star size={12} />
                        <span>Professional service guaranteed</span>
                      </div>
                    </div>

                    {/* Service Features */}
                    {service.features && service.features.length > 0 && (
                      <div className="mb-3 sm:mb-4">
                        <div className="flex flex-wrap gap-1">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service Footer */}
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                          AED {service.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">starting</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBookService(service)}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 sm:px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        Book Now
                        <ArrowRight size={14} />
                      </button>
                      
                      <button
                        onClick={() => {
                          const message = `Hi! I'm interested in the ${service.name} service (AED ${service.price}). Can you provide more details?`;
                          const whatsappUrl = `https://wa.me/971566118908?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200"
                        title="Ask about this service on WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Services Loading...</h3>
              <p className="text-gray-600">Please wait while we load our available services.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Info Cards */}
      <motion.div
        className="max-w-6xl mx-auto mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${card.color}`}>
                {card.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="bg-emerald-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Need Help Choosing a Service?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is available 24/7 to help you select the right service for your needs. 
            Contact us via WhatsApp for instant assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsAppContact}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Chat with Us
            </button>
            <a
              href="tel:+971566118908"
              className="bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-500 px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Call Now
            </a>
          </div>
        </div>
      </motion.div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowBookingForm(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowBookingForm(false)}
              className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Form Content */}
            <div className="p-6">
              <BookingForm 
                selectedService={selectedService}
                onClose={() => {
                  setShowBookingForm(false);
                  setSelectedService(null);
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;