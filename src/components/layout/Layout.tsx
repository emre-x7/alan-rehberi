import React from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
      <Navigation />
      <main className="min-h-[calc(100vh-5rem)]">{children}</main>

      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200/60 dark:border-slate-700/60 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                AlanRehberi
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
              Üniversite öğrencileri için hazırlanmış alan rehberliği{" "}
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-xs">
              © 2025 AlanRehberi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
