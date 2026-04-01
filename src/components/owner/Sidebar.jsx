import { NavLink } from "react-router-dom";
import { Home, ClipboardList, Settings, ExternalLink, LogOut, X } from "lucide-react";

export function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { title: "Overview", icon: <Home size={20} />, path: "/admin" },
    { title: "Bookings", icon: <ClipboardList size={20} />, path: "/admin/bookings" },
    { title: "Services", icon: <Settings size={20} />, path: "/admin/services" },
    { title: "View Website", icon: <ExternalLink size={20} />, path: "/" },
    { title: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-emerald-500 hover:text-white ${
      isActive ? "bg-emerald-500 text-white" : "text-gray-700 hover:text-white"
    }`;

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="font-bold text-emerald-500 text-xl">
            All in One Pros
          </h1>

          {/* Close button (mobile only) */}
          <button
            className="md:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={linkClass}
              onClick={onClose} // auto close on mobile
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Admin Dashboard v1.0
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;