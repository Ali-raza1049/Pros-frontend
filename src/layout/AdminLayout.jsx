import { useState } from "react";
import Sidebar from "../components/owner/Sidebar";
import Topbar from "../components/owner/Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-4 md:p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}