import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { IMAGES } from '../../data/mockData';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { loginAs, loginCustom } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    try {
      setError('');
      const res = await loginCustom(email, password, 'DONOR');
      const userRole = res?.user?.role?.toLowerCase() || 'donor';
      navigate(`/dashboard/${userRole}`);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleQuickDemoLogin = (roleKey) => {
    loginAs(roleKey);
    navigate(`/dashboard/${roleKey.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-hope-cream">
      
      {/* Left Visual Column (Span 6) - Split Screen with Beautiful Photography */}
      <div className="hidden lg:flex lg:col-span-6 relative bg-hope-charcoal overflow-hidden text-white flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-45">
          <img
            src={IMAGES.authBackground}
            alt="Compassionate volunteers"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-hope-charcoal via-hope-teal-dark/75 to-transparent" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-hope-teal shadow-md">
              <HeartHandshake className="w-7 h-7 text-hope-teal" />
            </div>
            <span className="text-2xl font-black font-heading tracking-tight text-white">
              HOPE<span className="text-hope-orange">HUB</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-4 max-w-md">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-hope-orange" />
            <span>Radical Transparency in Philanthropy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black leading-snug">
            Welcome Back to the Circle of Hope
          </h2>
          <p className="text-slate-200 text-sm leading-relaxed">
            Every login connects you to real-time project updates, verified NGO ledgers, and communities whose futures are brighter because of your participation.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-300">
          © {new Date().getFullYear()} HOPEHUB. Built for compassionate communities.
        </div>
      </div>

      {/* Right Form Column (Span 6) on Warm Cream */}
      <div className="lg:col-span-6 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-card border-2 border-orange-100 space-y-8">
          
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-hope-teal">Access Portal</span>
            <h1 className="text-3xl font-heading font-black text-hope-charcoal mt-1">
              Stakeholder Login
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Sign in to manage your donations, applications, campaigns, or administrative queue.
            </p>
          </div>

          {/* Quick Demo Credential Buttons for Evaluators */}
          <div className="bg-hope-light-teal/80 p-4 rounded-2xl border-2 border-teal-200 space-y-2">
            <span className="text-xs font-extrabold text-hope-teal block">
              ⚡ One-Click Evaluator Demo Login:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "Donor", key: "DONOR" },
                { label: "Beneficiary", key: "BENEFICIARY" },
                { label: "Volunteer", key: "VOLUNTEER" },
                { label: "NGO Partner", key: "NGO" },
                { label: "Administrator", key: "ADMIN" }
              ].map((b) => (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => handleQuickDemoLogin(b.key)}
                  className="px-2.5 py-1 text-xs font-extrabold rounded-lg bg-white hover:bg-hope-teal hover:text-white text-hope-teal border border-teal-300 shadow-xs transition"
                >
                  {b.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-teal-800 font-medium mt-1">
              Select any role above to test immediate authenticated dashboard permissions.
            </p>
          </div>

          {error && (
            <div className="p-3 text-xs bg-rose-50 text-hope-coral rounded-xl border border-rose-200 font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-hope-teal text-sm font-semibold"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset instructions simulated in demonstration mode."); }} className="text-xs font-bold text-hope-teal hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-hope-teal text-sm font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-hope-teal"
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-hope-teal hover:bg-hope-teal-dark text-white font-black font-heading text-base shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-extrabold text-hope-orange hover:underline">
              Create a free account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
