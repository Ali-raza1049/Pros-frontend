import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Lock, AlertCircle } from "lucide-react";
import { loginAdmin, clearError } from "../../store/slices/authSlice";
import Loginimg from "../../assets/Loginimg.avif";

export function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) {
      dispatch(clearError());
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const result = await dispatch(loginAdmin(formData)).unwrap();
      if (result.success) {
        navigate("/admin");
      }
    } catch (error) {
      // Error is handled by Redux slice
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900">
      
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
          
          <div className="flex justify-center mb-6">
            <Lock className="text-emerald-500 w-14 h-14 p-2 bg-emerald-100 rounded-full" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Owner Dashboard Access
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Login as Owner to manage your services and bookings
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-gray-600 font-semibold mb-1 block">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="owner@allinonepros.ae"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-gray-600 font-semibold mb-1 block">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3 rounded-xl font-semibold transition-all duration-300 mt-2 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging in...
                </>
              ) : (
                <>🔐 Login as Owner</>
              )}
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Default: owner@allinonepros.ae / admin123
          </p>

          <div className="mt-6 text-center">
            <NavLink
              to="/"
              className="text-emerald-500 hover:underline font-semibold"
            >
              ← Back to Home
            </NavLink>
          </div>
        </div>
      </div>

      {/* Right Section - Image / Visual Panel */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src={Loginimg}
          alt="Dashboard Illustration"
          className="object-cover w-full h-full rounded-l-3xl shadow-2xl"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 to-black/20 rounded-l-3xl flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center px-6">
            Welcome Back! Manage your services & bookings seamlessly.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;