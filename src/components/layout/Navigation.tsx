import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/auth/authSlice";
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  Book,
  BarChart3,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { path: "/", label: "Ana Sayfa", icon: Home },
    { path: "/departments", label: "Bölümler", icon: Book },
    { path: "/profile", label: "Profilim", icon: BarChart3 },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-2 w-2 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  CareerPathfinder
                </span>
                <p className="text-xs text-slate-500 -mt-1">
                  kariyer yolculuğunuzda
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.path)
                      ? "text-blue-600 bg-blue-50/80 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-4 py-2 bg-slate-50/80 rounded-xl border border-slate-200/60">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-slate-800">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-slate-500 text-xs">{user?.university}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50/80 rounded-xl transition-all duration-300 border border-transparent hover:border-rose-200"
              title="Çıkış Yap"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-sm">
          <div className="px-6 pt-4 pb-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActivePath(item.path)
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Mobile User Info */}
            <div className="border-t border-slate-200/60 pt-4 mt-4 space-y-3">
              <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50/80 rounded-xl">
                <User className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-slate-500">{user?.university}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-base font-medium text-rose-600 hover:bg-rose-50/80 transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
