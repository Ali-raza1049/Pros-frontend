import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Calendar, MapPin, Star } from "lucide-react";
import { fetchServices } from "../../store/slices/serviceSlice";

export function ServicePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services, loading, error } = useSelector(state => state.services);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Get unique categories from services
  const categories = [...new Set(services.map(service => service.category))];

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    const isActive = service.isActive;
    
    return matchesSearch && matchesCategory && isActive;
  });

  const handleBookService = (service) => {
    // Navigate to booking page with service info
    navigate('/book', { state: { selectedService: service } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">⚠️ Error loading services</div>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => dispatch(fetchServices())}
              className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 mt-6 sm:mt-10">
            Our <span className="text-emerald-500">Services</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Professional solutions for all your home and business needs. 
            Quality service guaranteed with experienced professionals.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
              
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none text-sm sm:text-base"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none bg-white min-w-full md:min-w-48 text-sm sm:text-base"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
              Showing {filteredServices.length} of {services.filter(s => s.isActive).length} services
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Service Header */}
              <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-3xl sm:text-4xl">{service.icon}</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{service.name}</h3>
                      <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                        {service.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                  {service.description}
                </p>

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

                {/* Service Details */}
                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                  {service.duration && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <Calendar size={12} />
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
              </div>

              {/* Service Footer */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                      AED {service.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">starting</span>
                  </div>
                  
                  <button
                    onClick={() => handleBookService(service)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && !loading && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Services Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory 
                ? "Try adjusting your search criteria or browse all services"
                : "No services are currently available"
              }
            </p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                View All Services
              </button>
            )}
          </motion.div>
        )}

        {/* Call to Action */}
        {filteredServices.length > 0 && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Need a Custom Service?
              </h3>
              <p className="text-gray-600 mb-6">
                Don't see what you're looking for? Contact us for custom solutions tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/book')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  📞 Contact Us
                </button>
                <a
                  href="https://wa.me/971566118908"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-500 px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default ServicePage;