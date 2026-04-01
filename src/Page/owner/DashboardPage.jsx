import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users,
  AlertCircle,
  BarChart3,
  Eye,
  Settings,
  ArrowRight
} from "lucide-react";
import { fetchDashboardStats } from "../../store/slices/dashboardSlice";

export function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, recentBookings, loading, error } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const statsData = [
    { 
      title: "Total Bookings", 
      value: stats.totalBookings || 0,
      icon: <Calendar className="text-blue-600" size={24} />,
      color: "bg-blue-50 border-blue-200",
      change: "+12%"
    },
    { 
      title: "Pending Bookings", 
      value: stats.pendingBookings || 0,
      icon: <Clock className="text-yellow-600" size={24} />,
      color: "bg-yellow-50 border-yellow-200",
      change: "+5%"
    },
    { 
      title: "Completed Jobs", 
      value: stats.completedBookings || 0,
      icon: <CheckCircle className="text-green-600" size={24} />,
      color: "bg-green-50 border-green-200",
      change: "+18%"
    },
    { 
      title: "Active Services", 
      value: stats.totalServices || 0,
      icon: <Settings className="text-purple-600" size={24} />,
      color: "bg-purple-50 border-purple-200",
      change: "0%"
    },
    { 
      title: "Today's Jobs", 
      value: stats.todayBookings || 0,
      icon: <TrendingUp className="text-indigo-600" size={24} />,
      color: "bg-indigo-50 border-indigo-200",
      change: "+25%"
    },
    { 
      title: "Total Revenue", 
      value: `AED ${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: <DollarSign className="text-emerald-600" size={24} />,
      color: "bg-emerald-50 border-emerald-200",
      change: "+22%"
    },
  ];

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock size={14} />;
      case "in-progress":
        return <TrendingUp size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      case "confirmed":
        return <CheckCircle size={14} />;
      case "cancelled":
        return <AlertCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BarChart3 size={16} />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border ${stat.color}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-white shadow-sm">
                {stat.icon}
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Manage Bookings</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            View and manage all customer bookings, update job status, and track progress.
          </p>
          <NavLink
            to="/admin/bookings"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Go to Bookings
            <ArrowRight size={16} />
          </NavLink>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="text-purple-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Manage Services</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Add, edit, or remove services from your offerings. Set prices and availability.
          </p>
          <NavLink
            to="/admin/services"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
          >
            Go to Services
            <ArrowRight size={16} />
          </NavLink>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Eye className="text-emerald-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">View Website</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            See how your website looks to customers and test the booking process.
          </p>
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            Open Website
            <ArrowRight size={16} />
          </NavLink>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="text-gray-600" size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
          </div>
          <NavLink
            to="/admin/bookings"
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            View All
            <ArrowRight size={16} />
          </NavLink>
        </div>

        {recentBookings && recentBookings.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Service</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Date & Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900">{booking.customerName || booking.name}</p>
                          <p className="text-sm text-gray-500">{booking.customerPhone || booking.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{booking.serviceId?.icon || '🔧'}</span>
                          <span className="font-medium">{booking.serviceId?.name || booking.service}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{new Date(booking.bookingDate || booking.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">{booking.bookingTime || booking.time}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${statusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-emerald-600">
                          AED {booking.serviceId?.price || 0}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="space-y-4 md:hidden">
              {recentBookings.map((booking, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{booking.customerName || booking.name}</h4>
                      <p className="text-sm text-gray-500">{booking.customerPhone || booking.phone}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{booking.serviceId?.icon || '🔧'}</span>
                    <span className="font-medium">{booking.serviceId?.name || booking.service}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {new Date(booking.bookingDate || booking.date).toLocaleDateString()} at {booking.bookingTime || booking.time}
                    </span>
                    <span className="font-semibold text-emerald-600">
                      AED {booking.serviceId?.price || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="text-gray-400" size={24} />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No Recent Bookings</h4>
            <p className="text-gray-600 mb-4">When customers book services, they'll appear here.</p>
            <NavLink
              to="/admin/bookings"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              View All Bookings
              <ArrowRight size={16} />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;