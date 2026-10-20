import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { HeartHandshake, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { IMAGES } from '../../data/mockData';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role')?.toUpperCase() || 'DONOR';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(['DONOR', 'BENEFICIARY', 'VOLUNTEER', 'NGO'].includes(initialRole) ? initialRole : 'DONOR');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState('');
  const { register, loginCustom } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAgreed) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    try {
      setError('');
      if (register) {
        await register({ fullName, email, password, role, phone });
      } else {
        await loginCustom(email, password, role);
      }
      navigate(`/dashboard/${role.toLowerCase()}`);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-hope-cream">
      
      {/* Left Visual Banner (Span 5) */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-hope-charcoal overflow-hidden text-white flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-45">
          <img
            src={IMAGES.aboutVision}
            alt="Collaborative social initiative"
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

        <div className="relative z-10 space-y-4 max-w-sm">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-hope-orange" />
            <span>Join 140,000+ Changemakers</span>
          </div>
          <h2 className="text-3xl font-heading font-black leading-snug">
            Your Giving Journey Begins Here
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Create your account to track donations, coordinate volunteer activities, or request private assistance under our dignified framework.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-300">
          🔒 High Security • Zero Unverified Fundraising • Privacy Protected
        </div>
      </div>

      {/* Right Form (Span 7) on Soft Cream */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-3xl shadow-card border-2 border-orange-100 space-y-6">
          
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-hope-orange">
              Join the Platform
            </span>
            <h1 className="text-3xl font-heading font-black text-hope-charcoal mt-1">
              Create Your HOPEHUB Account
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Select your role below. Public registration for Administrator accounts is restricted.
            </p>
          </div>

          {error && (
            <div className="p-3 text-xs bg-rose-50 text-hope-coral rounded-xl border border-rose-200 font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                I am joining as a:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'DONOR', label: 'Donor' },
                  { key: 'BENEFICIARY', label: 'Beneficiary' },
                  { key: 'VOLUNTEER', label: 'Volunteer' },
                  { key: 'NGO', label: 'NGO Org' }
                ].map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRole(r.key)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border-2 transition text-center ${
                      role === r.key
                        ? 'bg-hope-teal text-white border-hope-teal shadow-sm'
                        : 'border-slate-200 text-hope-charcoal hover:bg-slate-50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name {role === 'NGO' && '/ Representative Name'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal font-semibold"
                />
              </div>

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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal font-semibold"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-2">
              <input
                type="checkbox"
                required
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-0.5 rounded text-hope-teal"
              />
              <span>
                I agree to the HOPEHUB Platform Terms of Service, Ethics Guidelines, and Privacy Policy.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-hope-orange hover:bg-hope-orange-hover text-white font-black font-heading text-base shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Complete Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-hope-teal hover:underline">
              Sign In here
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
