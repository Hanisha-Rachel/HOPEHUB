import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Mail, Phone, MapPin, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-hope-teal-800 to-hope-teal-dark text-white pt-16 pb-8 border-t-4 border-hope-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-teal-700/60">
          
          {/* Brand Col (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-hope-teal shadow-md group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-7 h-7 text-hope-teal" />
              </div>
              <span className="text-2xl font-black font-heading text-white">
                HOPE<span className="text-hope-orange">HUB</span>
              </span>
            </Link>

            <p className="text-teal-100 text-sm leading-relaxed max-w-sm">
              An Intelligent Online Charity Management System uniting donors, beneficiaries, volunteers, and verified NGOs through radical transparency and verified impact.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-hope-orange" />
              <span>Two-Tier Verification & Zero-Knowledge Beneficiary Privacy</span>
            </div>

            {/* Newsletter Simulation */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-200 block mb-2">
                Stay Updated with Community Impact
              </span>
              <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! You are subscribed to HOPEHUB demonstration newsletters."); }} className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-white/15 border border-teal-600 text-white placeholder-teal-300 px-4 py-2.5 rounded-l-xl text-sm focus:outline-none focus:border-hope-orange w-full"
                />
                <button
                  type="submit"
                  className="bg-hope-orange hover:bg-hope-orange-hover text-white px-5 py-2.5 rounded-r-xl font-bold text-sm flex items-center gap-1 transition shadow-md"
                >
                  Join <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-teal-700/80 pb-2">
              Explore & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-teal-100">
              <li>
                <Link to="/campaigns" className="hover:text-hope-orange transition">Explore Campaigns</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-hope-orange transition">Donate Physical Resources</Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-hope-orange transition">Volunteer Opportunities</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-hope-orange transition">How HOPEHUB Works</Link>
              </li>
              <li>
                <Link to="/campaigns?filter=urgent" className="hover:text-rose-300 transition flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  Urgent Relief Drives
                </Link>
              </li>
            </ul>
          </div>

          {/* Stakeholders & Portals */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-teal-700/80 pb-2">
              Stakeholders
            </h4>
            <ul className="space-y-2.5 text-sm text-teal-100">
              <li>
                <Link to="/register?role=NGO" className="hover:text-hope-orange transition">NGO Registration</Link>
              </li>
              <li>
                <Link to="/register?role=BENEFICIARY" className="hover:text-hope-orange transition">Request Assistance</Link>
              </li>
              <li>
                <Link to="/register?role=VOLUNTEER" className="hover:text-hope-orange transition">Join as a Volunteer</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-hope-orange transition">Stakeholder Login</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-hope-orange transition">Transparency & FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (Demo) */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-teal-700/80 pb-2">
              Contact & Support
            </h4>
            <ul className="space-y-3 text-sm text-teal-100">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-hope-orange shrink-0 mt-0.5" />
                <span>HOPEHUB Central Command, Innovation Park, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <span>+91 (011) 2345-6789</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-300 shrink-0" />
                <span>support@hopehub.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-teal-200 gap-4">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} HOPEHUB. Built with <Heart className="w-3.5 h-3.5 text-hope-coral fill-hope-coral inline" /> for compassionate communities.
          </p>

          <div className="bg-teal-900/80 px-3.5 py-1.5 rounded-lg border border-teal-700 text-amber-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Academic Demonstration Project — No real financial payments are collected.</span>
          </div>

          <div className="flex gap-4 text-teal-100">
            <Link to="/about" className="hover:text-white transition">About</Link>
            <Link to="/contact" className="hover:text-white transition">Support</Link>
            <Link to="/faq" className="hover:text-white transition">Security & Trust</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
