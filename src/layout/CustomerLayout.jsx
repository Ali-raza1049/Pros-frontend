import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/customer/Navbar";
import FooterCTA from "../components/customer/FooterCTA";
import Footer from "../components/customer/Footer";

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className=" `grow`">
        <Outlet />
      </main>

      {/* CTA Section Before Footer */}
      <FooterCTA />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default CustomerLayout;