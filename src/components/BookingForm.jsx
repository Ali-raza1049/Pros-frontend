import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, MapPin, User, Mail, Phone, FileText, CheckCircle } from 'lucide-react';
import { fetchServices } from '../store/slices/serviceSlice';
import { createBooking } from '../store/slices/bookingSlice';

const BookingForm = ({ onClose, selectedService = null }) => {
  const dispatch = useDispatch();
  const { services } = useSelector(state => state.services);
  const { loading } = useSelector(state => state.bookings);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceId: selectedService?._id || '',
    bookingDate: '',
    bookingTime: '',
    address: '',
    notes: ''
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchServices());
    
    // If a service is pre-selected, set it in the form
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        serviceId: selectedService._id
      }));
    }
  }, [dispatch, selectedService]);

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Email is invalid';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    }

    if (!formData.serviceId) {
      newErrors.serviceId = 'Please select a service';
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Date is required';
    } else {
      const selectedDate = new Date(formData.bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.bookingDate = 'Date cannot be in the past';
      }
    }

    if (!formData.bookingTime) {
      newErrors.bookingTime = 'Time is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Save to database first
      const bookingResult = await dispatch(createBooking(formData)).unwrap();
      
      if (bookingResult.success) {
        const service = services.find(s => s._id === formData.serviceId);
        
        // Create enhanced WhatsApp message
        const whatsappMessage = `🎉 *NEW SERVICE BOOKING REQUEST*

👤 *Customer Details:*
• Name: ${formData.customerName}
• Phone: ${formData.customerPhone}
• Email: ${formData.customerEmail}

🔧 *Service Details:*
• Service: ${service?.name || 'N/A'}
• Category: ${service?.category || 'N/A'}
• Price: AED ${service?.price || 'N/A'}

📅 *Schedule:*
• Date: ${new Date(formData.bookingDate).toLocaleDateString('en-GB')}
• Time: ${formData.bookingTime}

📍 *Location:*
${formData.address}

📝 *Additional Notes:*
${formData.notes || 'No additional notes'}

---
*Booking ID: #${bookingResult.booking._id.toString().slice(-6)}*
*Status: Pending Confirmation*

Please confirm this booking and contact me to finalize the details. Thank you! 🙏`;

        // Redirect to WhatsApp
        const whatsappNumber = "971566118908";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Show success and close
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          if (onClose) {
            onClose();
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const selectedServiceData = services.find(s => s._id === formData.serviceId);

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h3 className="text-2xl font-bold text-green-600 mb-2">Redirecting to WhatsApp!</h3>
        <p className="text-gray-600 mb-4">
          Your booking has been saved and you're being redirected to WhatsApp to confirm with our team.
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-700 mb-2">
            ✅ Your booking has been saved successfully!
          </p>
          <p className="text-sm text-green-700">
            📱 You're being redirected to WhatsApp to confirm with our team.
            If WhatsApp didn't open automatically, please contact us at +971 56 611 8908
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Book a Service</h2>
        <p className="text-gray-600 text-sm sm:text-base">Fill in the details to schedule your service</p>
      </div>

      {/* Personal Information */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <User size={18} />
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-sm sm:text-base ${
                errors.customerName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.customerName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-sm sm:text-base ${
                  errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
            </div>
            {errors.customerEmail && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.customerEmail}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-sm sm:text-base ${
                errors.customerPhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+971 50 123 4567"
            />
          </div>
          {errors.customerPhone && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.customerPhone}</p>
          )}
        </div>
      </div>

      {/* Service Selection */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-semibold">Service Selection</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Service *
          </label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-sm sm:text-base ${
              errors.serviceId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Choose a service</option>
            {services.filter(s => s.isActive).map(service => (
              <option key={service._id} value={service._id}>
                {service.icon} {service.name} - AED {service.price}
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.serviceId}</p>
          )}
        </div>

        {selectedServiceData && (
          <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-xl sm:text-2xl">{selectedServiceData.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-sm sm:text-base">{selectedServiceData.name}</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">{selectedServiceData.description}</p>
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <span className="text-emerald-600 font-semibold">AED {selectedServiceData.price}</span>
                  <span className="text-gray-500">~{selectedServiceData.duration} minutes</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scheduling */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <Calendar size={18} />
          Schedule
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date *
            </label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-sm sm:text-base ${
                errors.bookingDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.bookingDate && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.bookingDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time *
            </label>
            <select
              name="bookingTime"
              value={formData.bookingTime}
              onChange={handleChange}
              className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-sm sm:text-base ${
                errors.bookingTime ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.bookingTime && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.bookingTime}</p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <MapPin size={18} />
          Location
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`w-full px-3 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-sm sm:text-base ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter complete address including building name, apartment number, area, and landmarks"
          />
          {errors.address && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          <FileText size={16} />
          Additional Notes (Optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-sm sm:text-base"
          placeholder="Any special instructions or requirements..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 sm:px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
              Booking...
            </>
          ) : (
            <>
              <Calendar size={18} />
              Book Service
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;