import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Edit, Trash2, ToggleLeft, ToggleRight, Plus } from "lucide-react";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
  clearError
} from "../../store/slices/serviceSlice";

export function ServicesPage() {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(state => state.services);
  
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    icon: "🚚",
    name: "",
    description: "",
    category: "Moving",
    price: "",
    duration: "60",
    features: []
  });

  const icons = [
    "🚚","❄️","🔧","📺","🚰","🔨",
    "🎨","🪛","⚡","🏠","📦","🛠️"
  ];

  const categories = ["Moving", "Fixing", "Handyman", "Cleaning", "Maintenance", "Installation", "Repair", "Other"];

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleAddService = async (e) => {
    e.preventDefault();

    if (!newService.name || !newService.description || !newService.price) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingService) {
        await dispatch(updateService({
          id: editingService._id,
          serviceData: {
            ...newService,
            price: Number(newService.price),
            duration: Number(newService.duration)
          }
        })).unwrap();
      } else {
        await dispatch(createService({
          ...newService,
          price: Number(newService.price),
          duration: Number(newService.duration)
        })).unwrap();
      }

      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Service operation failed:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({
      icon: service.icon || "🚚",
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price.toString(),
      duration: service.duration?.toString() || "60",
      features: service.features || []
    });
    setShowModal(true);
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await dispatch(deleteService(id)).unwrap();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await dispatch(toggleServiceStatus(id)).unwrap();
    } catch (error) {
      console.error('Toggle status failed:', error);
    }
  };

  const resetForm = () => {
    setNewService({
      icon: "🚚",
      name: "",
      description: "",
      category: "Moving",
      price: "",
      duration: "60",
      features: []
    });
    setEditingService(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading && services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage Services</h2>
          <p className="text-gray-500">
            Manage your services - these appear on the website and booking form
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className={`bg-white p-6 rounded-2xl shadow space-y-3 ${
              !service.isActive ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{service.icon}</div>
                <h3 className="font-bold">{service.name}</h3>
              </div>
              
              <button
                onClick={() => handleToggleStatus(service._id)}
                className={`p-1 rounded ${service.isActive ? 'text-green-600' : 'text-gray-400'}`}
                title={service.isActive ? 'Active' : 'Inactive'}
              >
                {service.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
              </button>
            </div>

            <p className="text-gray-600 text-sm">
              {service.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {service.category}
              </span>
              <span className="text-emerald-600 font-bold">
                AED {service.price}
              </span>
            </div>

            {service.duration && (
              <div className="text-sm text-gray-500">
                Duration: {service.duration} minutes
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleEditService(service)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDeleteService(service._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">No Services Yet</h3>
          <p className="text-gray-500 mb-4">Create your first service to get started</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Add Your First Service
          </button>
        </div>
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-white w-full max-w-2xl mx-4 p-8 rounded-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <h3 className="text-xl font-bold mb-6">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleAddService} className="space-y-6">

              {/* Icon Picker */}
              <div>
                <label className="font-semibold block mb-2">
                  Service Icon
                </label>
                <div className="grid grid-cols-6 gap-3 text-2xl">
                  {icons.map((icon, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() =>
                        setNewService({ ...newService, icon })
                      }
                      className={`p-2 rounded-lg border ${
                        newService.icon === icon
                          ? "bg-emerald-100 border-emerald-400"
                          : "bg-gray-50"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Name */}
              <div>
                <label className="font-semibold block mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Home Moving"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold block mb-1">
                  Description *
                </label>
                <textarea
                  placeholder="Brief description of the service"
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-xl"
                  rows="3"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="font-semibold block mb-1">
                  Category *
                </label>
                <select
                  value={newService.category}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      category: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-xl"
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price and Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    placeholder="500"
                    value={newService.price}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        price: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    placeholder="60"
                    value={newService.duration}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        duration: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl"
                    min="15"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3 rounded-xl font-semibold"
                >
                  {loading ? 'Saving...' : (editingService ? 'Update Service' : 'Add Service')}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default ServicesPage;