import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Phone, MapPin, Calendar, Clock, User, FileText, Trash2 } from "lucide-react";
import {
  fetchBookings,
  updateBookingStatus,
  deleteBooking,
  clearError
} from "../../store/slices/bookingSlice";

export function BookingsPage() {
  const dispatch = useDispatch();
  const { bookings, loading, error, pagination } = useSelector(state => state.bookings);
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBookings({ 
      status: statusFilter, 
      page: currentPage, 
      limit: 10 
    }));
  }, [dispatch, statusFilter, currentPage]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await dispatch(updateBookingStatus({ id, status: newStatus })).unwrap();
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await dispatch(deleteBooking(id)).unwrap();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    `${booking.customerName || booking.name} ${booking.serviceId?.name || booking.service} ${booking.customerPhone || booking.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const formatPhone = (phone) => {
    if (!phone) return 'N/A';
    return phone.startsWith('+') ? phone : `+${phone}`;
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header & Filters */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Bookings Management</h2>
            <p className="text-gray-500">Manage customer bookings and update their status</p>
          </div>
          
          <div className="text-sm text-gray-600">
            Total: {pagination.total} bookings
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, service, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <User className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {booking.customerName || booking.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Phone size={14} />
                    {formatPhone(booking.customerPhone || booking.phone)}
                  </div>
                  {booking.customerEmail && (
                    <div className="text-gray-500 text-sm">
                      {booking.customerEmail}
                    </div>
                  )}
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-start gap-2">
                <FileText className="text-gray-400 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-sm">Service</p>
                  <p className="text-gray-600">
                    {booking.serviceId?.name || booking.service}
                  </p>
                  {booking.serviceId?.price && (
                    <p className="text-emerald-600 font-semibold text-sm">
                      AED {booking.serviceId.price}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="text-gray-400 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-sm">Date & Time</p>
                  <p className="text-gray-600">
                    {formatDate(booking.bookingDate || booking.date)}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock size={12} />
                    {booking.bookingTime || booking.time}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="text-gray-400 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-sm">Address</p>
                  <p className="text-gray-600 text-sm">
                    {booking.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FileText className="text-gray-400 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-sm">Notes</p>
                  <p className="text-gray-600 text-sm">
                    {booking.notes || 'No notes'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between pt-4 border-t">
              {/* Status Update */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-sm font-medium">
                  Update Status:
                </label>
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                  className="border p-2 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
                  disabled={loading}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${(booking.customerPhone || booking.phone)?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm text-center flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  WhatsApp
                </a>

                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          
          <span className="px-4 py-2">
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
            disabled={currentPage === pagination.pages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredBookings.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">No Bookings Found</h3>
          <p className="text-gray-500">
            {search || statusFilter 
              ? "Try adjusting your search or filter criteria" 
              : "Bookings will appear here when customers make reservations"
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default BookingsPage;