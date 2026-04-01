import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, LogOut, User } from "lucide-react";
import { logout } from "../../store/slices/authSlice";

export function Topbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector(state => state.auth);

  const today = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  // Dynamic Title Logic
  const getTitle = () => {
    if (location.pathname === "/admin") return "Dashboard Overview";
    if (location.pathname.includes("bookings")) return "Bookings";
    if (location.pathname.includes("services")) return "Services";
    return "Dashboard";
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin-login");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">

        {/* Left Section */}
        <div className="flex items-center gap-4">

          {/* Hamburger (Mobile Only) */}
          <button
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              {getTitle()}
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-1">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Right Section - User Info & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-gray-600">
            <User size={20} />
            <span className="text-sm font-medium">{admin?.email}</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}

export default Topbar;