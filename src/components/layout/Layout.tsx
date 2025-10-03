import React from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navigation />
      <main className="min-h-[calc(100vh-5rem)]">{children}</main>

      {/* Yeni Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/60 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                CareerPathfinder
              </span>
            </div>
            <p className="text-slate-600 text-sm mb-2">
              Üniversite öğrencileri için kişiselleştirilmiş kariyer rehberliği
            </p>
            <p className="text-slate-500 text-xs">
              © 2024 CareerPathfinder · Bilimsel metodlarla hazırlanmıştır
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
