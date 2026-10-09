import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Menu, X, GraduationCap, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs group-hover:shadow transition-shadow">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              SkillHub
            </span>
          </button>
        </div>

        {/* Zone 2: Clean 4-6 Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNavClick(link.path)}
                className={`relative py-1 transition-colors hover:text-slate-900 ${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            );
          })}
          {user && (
            <button
              type="button"
              onClick={() => handleNavClick('/dashboard')}
              className={`flex items-center gap-1.5 py-1 transition-colors hover:text-slate-900 ${
                currentPath === '/dashboard' ? 'text-indigo-600 font-semibold' : 'text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleNavClick('/dashboard')}
                className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                title="Go to Student Dashboard"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <span className="text-xs font-semibold text-slate-700 max-w-[110px] truncate">
                  {user.name}
                </span>
              </button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                icon={<LogOut className="w-3.5 h-3.5" />}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick('/login')}
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavClick('/register')}
              >
                Register
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <button
              type="button"
              onClick={() => handleNavClick('/dashboard')}
              className="p-1 rounded-full ring-2 ring-indigo-500/20"
              aria-label="Student Dashboard"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNavClick(link.path)}
                className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPath === link.path
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            {user && (
              <button
                type="button"
                onClick={() => handleNavClick('/dashboard')}
                className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  currentPath === '/dashboard'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Student Dashboard</span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg">
                  <UserIcon className="w-4 h-4 text-indigo-600" />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800">{user.name}</p>
                    <p className="text-slate-500">{user.email}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={logout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleNavClick('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleNavClick('/register')}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
