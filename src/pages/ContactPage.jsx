import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/mockData';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-hope-light-teal/30 pb-20">
      
      <div className="relative bg-hope-charcoal text-white py-16 sm:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.ctaBanner} alt="Contact Support" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-hope-charcoal via-hope-teal-dark/95 to-hope-charcoal/90" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-hope-orange bg-orange-500/20 px-4 py-1.5 rounded-full border border-orange-400/30">
            Support & Governance Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black mt-2">
            Get in Touch with HOPEHUB
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Have questions about NGO verification, donation transparency, or partnership opportunities? Our support desk is here to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details Card (Span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-hope-teal to-hope-teal-dark text-white rounded-3xl p-8 sm:p-10 shadow-card flex flex-col justify-between space-y-8 border-2 border-teal-600">
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-black">
                Central Operations & Assistance
              </h3>
              <p className="text-teal-100 text-sm leading-relaxed">
                We are committed to fast, transparent turnaround times for all stakeholders.
              </p>

              <div className="space-y-4 text-sm pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-hope-orange shrink-0 mt-0.5" />
                  <span>HOPEHUB Foundation, Innovation Park, Connaught Place, New Delhi - 110001</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-hope-orange shrink-0" />
                  <span>+91 (011) 2345-6789 (Mon-Sat, 9AM-6PM)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-hope-orange shrink-0" />
                  <span>support@hopehub.org / compliance@hopehub.org</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 text-xs text-teal-100 border border-white/15">
              💡 For urgent beneficiary support or disaster rescue dispatch, reach out directly to the nearest registered NGO emergency desk.
            </div>
          </div>

          {/* Form (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-card border-2 border-teal-100">
            <h3 className="text-2xl font-heading font-black text-hope-charcoal mb-6">
              Send Us a Message
            </h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-hope-charcoal focus:outline-none focus:border-hope-teal bg-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="NGO Onboarding & Verification">NGO Onboarding & Verification</option>
                    <option value="Donation & Receipt Query">Donation & Receipt Query</option>
                    <option value="Volunteer Programs">Volunteer Programs</option>
                    <option value="Academic Demo Feedback">Academic Demonstration Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Message</label>
                  <textarea
                    rows="4"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you today?"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-hope-teal hover:bg-hope-teal-dark text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-heading font-black text-2xl text-hope-charcoal">
                  Message Transmitted!
                </h4>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. Your inquiry has been received in demonstration state. Our support team responds within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-hope-teal text-white font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
