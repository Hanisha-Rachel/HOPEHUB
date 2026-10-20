import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HeartHandshake, Menu, X, Bell, User, LogOut, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { currentUser, role, logout, loginAs, notifications, markAllNotificationsRead } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Campaigns', path: '/campaigns' },
    { name: 'About Us', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Donate Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleRoleSelect = async (roleKey) => {
  setRoleDropdownOpen(false);

  try {
    await loginAs(roleKey);
    navigate(`/dashboard/${roleKey.toLowerCase()}`);
  } catch (error) {
    console.error('Failed to switch demo role:', error);
  }
};

  const getDashboardPath = () => {
    if (!role) return '/login';
    return `/dashboard/${role.toLowerCase()}`;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-100/60 shadow-sm transition-all">
      {/* Top Demo Banner Notice */}
      <div className="bg-gradient-to-r from-hope-teal-800 to-hope-teal text-white py-1.5 px-4 text-xs font-medium text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-hope-orange animate-spin" />
        <span>HOPEHUB Intelligent Charity Platform — Academic Demonstration Mode</span>
        <div className="hidden sm:inline-flex items-center gap-1.5 ml-2 bg-white/15 px-2 py-0.5 rounded text-[11px]">
          <span>Role Switcher Ready:</span>
          <button onClick={() => handleRoleSelect('DONOR')} className="underline hover:text-hope-orange">Donor</button>•
          <button onClick={() => handleRoleSelect('NGO')} className="underline hover:text-hope-orange">NGO</button>•
          <button onClick={() => handleRoleSelect('ADMIN')} className="underline hover:text-hope-orange">Admin</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-hope-teal to-hope-teal-dark flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <HeartHandshake className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black font-heading tracking-tight text-hope-teal group-hover:text-hope-teal-dark transition-colors">
                HOPE<span className="text-hope-orange">HUB</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-hope-charcoal-muted -mt-1">
                Charity Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-hope-teal bg-hope-light-teal'
                      : 'text-hope-charcoal hover:text-hope-teal hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl text-hope-charcoal hover:text-hope-teal hover:bg-hope-light-teal transition relative"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-hope-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-hover border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="font-bold text-sm text-hope-charcoal">Notifications</span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-hope-teal hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-3 text-xs ${n.isRead ? 'opacity-70' : 'bg-teal-50/40'}`}>
                        <div className="font-bold text-hope-charcoal mb-0.5">{n.title}</div>
                        <p className="text-hope-charcoal-muted leading-relaxed">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* If Authenticated: Dashboard & Profile */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  to={getDashboardPath()}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold bg-hope-teal text-white hover:bg-hope-teal-dark shadow-sm transition flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>{currentUser.role} Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl text-slate-400 hover:text-hope-coral hover:bg-rose-50 transition"
                  title="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              /* If Visitor: Login & Get Started */
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-hope-teal hover:bg-hope-light-teal transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-hope-orange text-white hover:bg-hope-orange-hover shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Quick Demo Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="px-2.5 py-2 rounded-xl text-xs font-bold border border-teal-200 text-hope-teal hover:bg-teal-50 flex items-center gap-1 transition"
                title="Test with any role"
              >
                <span>Demo Role</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-hover border border-teal-100 p-2 z-50">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Simulate User View:
                  </div>
                  {['DONOR', 'BENEFICIARY', 'VOLUNTEER', 'NGO', 'ADMIN'].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSelect(r)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                        role === r ? 'bg-hope-teal text-white' : 'hover:bg-teal-50 text-hope-charcoal'
                      }`}
                    >
                      <span>{r.charAt(0) + r.slice(1).toLowerCase()}</span>
                      {role === r && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-hope-charcoal hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-base font-semibold ${
                    isActive ? 'bg-hope-light-teal text-hope-teal' : 'text-hope-charcoal hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl bg-hope-teal text-white font-bold"
                >
                  Go to {currentUser.role} Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="block w-full text-center px-4 py-2 rounded-xl text-hope-coral font-semibold text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-3 rounded-xl border border-teal-200 text-hope-teal font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-3 rounded-xl bg-hope-orange text-white font-bold"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Role Switcher */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-400 block mb-1">Switch Demo Role:</span>
              <div className="flex flex-wrap gap-1.5">
                {['DONOR', 'BENEFICIARY', 'VOLUNTEER', 'NGO', 'ADMIN'].map((r) => (
                  <button
                    key={r}
                    onClick={() => { handleRoleSelect(r); setMobileMenuOpen(false); }}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-50 text-hope-teal border border-teal-200"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
