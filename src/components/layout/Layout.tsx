import React from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="min-h-[calc(100vh-4rem)]">
        {" "}
        {/* Navbar yüksekliğini çıkarıyoruz */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
