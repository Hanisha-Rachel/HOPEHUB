import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/mockData';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How does HOPEHUB verify that an NGO is legitimate?",
      a: "Before an NGO can create or publish campaigns, an administrator verifies their official government registration certificate, 12A/80G tax exemption documents, operational address, and board credentials. Only vetted organizations receive the Verified NGO Badge."
    },
    {
      q: "How is money handled? Does HOPEHUB process real financial transactions right now?",
      a: "In this academic development and demonstration version, HOPEHUB features a fully functional Demonstration Payment Gateway. No real bank accounts or credit cards are charged. It provides complete transactional state machines (success, failure, receipt generation, and atomic target updates) for testing and educational review."
    },
    {
      q: "How is beneficiary privacy protected?",
      a: "Beneficiary assistance requests are never posted publicly or shown in general search results. The platform enforces a zero-knowledge public policy where personal identities, medical records, and distress situations are only accessible to authorized platform administrators and designated case managers."
    },
    {
      q: "Can I donate physical goods like food, clothes, or books?",
      a: "Yes! HOPEHUB features a dedicated Material Philanthropy module. Donors can browse declared resource needs or pledge items (food grains, warm blankets, school supplies) with preferences for doorstep pickup or local center drop-off."
    },
    {
      q: "How can I become a volunteer for field initiatives?",
      a: "Navigate to the Volunteer Opportunities section, search drives matching your skills (Teaching, Healthcare, Disaster Aid, Food Packing), and click 'Apply to Participate'. Partner NGOs review applications and confirm slots directly."
    },
    {
      q: "Can anyone register as an Administrator?",
      a: "No. In accordance with enterprise security practices, public registration is strictly limited to Donors, Beneficiaries, Volunteers, and NGO representatives. Administrator accounts are provisioned exclusively through secure platform backend configurations."
    }
  ];

  return (
    <div className="min-h-screen bg-hope-cream/70 pb-20">
      
      <div className="relative bg-hope-charcoal text-white py-16 sm:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.heroBanner} alt="FAQ banner" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-hope-charcoal via-hope-teal-dark/95 to-hope-charcoal/90" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-hope-orange bg-orange-500/20 px-4 py-1.5 rounded-full border border-orange-400/30">
            Platform Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black mt-2">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about verification, transparency, simulated donations, and stakeholder roles.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border-2 border-orange-100 divide-y divide-slate-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-heading font-black text-base sm:text-lg text-hope-charcoal hover:text-hope-teal transition gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-hope-teal shrink-0 transform transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180 text-hope-orange' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <p className="mt-3 text-sm text-slate-600 leading-relaxed animate-in fade-in bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
