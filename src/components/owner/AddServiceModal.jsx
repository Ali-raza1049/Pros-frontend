import React from "react";
import { X } from "lucide-react";

export  function AddServiceModal({
  showModal,
  setShowModal,
  newService,
  setNewService,
  handleAddService,
}) {
  const icons = [
    "🚚","❄️","🔧","📺","🚰","🔨",
    "🎨","🪛","⚡","🏠","📦","🛠️"
  ];

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setShowModal(false)}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-2xl mx-4 p-6 md:p-8 rounded-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto">

        {/* Close */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <h3 className="text-xl font-bold mb-6">Add New Service</h3>

        <form onSubmit={handleAddService} className="space-y-6">

          {/* Icon Picker */}
          <div>
            <label className="font-semibold block mb-2">
              Service Icon
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 text-2xl">
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

          {/* Name */}
          <div>
            <label className="font-semibold block mb-1">
              Service Name *
            </label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold block mb-1">
              Description *
            </label>
            <textarea
              value={newService.description}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  description: e.target.value,
                })
              }
              className="w-full border p-3 rounded-xl"
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
            >
              <option>Moving</option>
              <option>Fixing</option>
              <option>Handyman</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="font-semibold block mb-1">
              Price (AED) *
            </label>
            <input
              type="number"
              value={newService.price}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  price: e.target.value,
                })
              }
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddServiceModal;