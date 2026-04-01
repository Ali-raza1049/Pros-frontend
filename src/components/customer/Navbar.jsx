import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/Logo.jpeg";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 hover:text-emerald-400 ${
      isActive ? "text-emerald-400" : "text-white"
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">

        {/* Logo */}
        <NavLink to="/" onClick={closeMenu} className="flex items-center space-x-2 sm:space-x-3">
          <img src={Logo} alt="All in One Pros Logo" className="h-10 sm:h-12 w-auto rounded-lg" />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-white">
              All in One <span className="text-emerald-400">Pros</span>
            </span>
            <span className="hidden sm:block text-xs text-gray-400">Dubai's Trusted Home Experts</span>
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 xl:space-x-8 font-medium">
          <li>
            <NavLink to="/" className={linkClass}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/services" className={linkClass}>Services</NavLink>
          </li>
          <li>
            <NavLink to="/book" className={linkClass}>Book Now</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClass}>About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </li>
        </ul>

        {/* WhatsApp Button - Desktop */}
        <div className="hidden lg:block">
          <a
            href="https://wa.me/971566118908"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 px-4 xl:px-5 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 text-sm xl:text-base"
          >
            WhatsApp Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden text-white">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 sm:px-6 py-4 space-y-3 font-medium">
            <NavLink 
              to="/" 
              onClick={closeMenu} 
              className="block py-2 px-3 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              onClick={closeMenu} 
              className="block py-2 px-3 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              Services
            </NavLink>
            <NavLink 
              to="/book" 
              onClick={closeMenu} 
              className="block py-2 px-3 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              Book Now
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={closeMenu} 
              className="block py-2 px-3 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={closeMenu} 
              className="block py-2 px-3 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              Contact
            </NavLink>

            <div className="pt-3 border-t border-white/10">
              <a
                href="https://wa.me/971566118908"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-lg text-center text-white font-semibold transition-colors"
                onClick={closeMenu}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;