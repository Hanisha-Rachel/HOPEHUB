import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, UserPlus, FileCheck, CheckCircle2, ArrowRight, Sparkles, Building2, Eye } from 'lucide-react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { IMAGES } from '../data/mockData';

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Vetted NGO Registration",
      desc: "NGOs submit government registration credentials, tax exemption records, and operational proofs to platform administrators for audit before any fundraising is enabled.",
      image: IMAGES.aboutVision,
      tag: "Governance"
    },
    {
      num: "02",
      title: "Campaign Review & Approval",
      desc: "Every fundraising or material drive is reviewed individually by Admins to verify goal feasibility, documentation validity, and appropriate milestones.",
      image: IMAGES.educationDetail,
      tag: "Verification"
    },
    {
      num: "03",
      title: "Transparent Giving & Pledging",
      desc: "Donors contribute through our safe simulated gateway with unique transaction IDs and immediate receipts, or pledge physical resources (books, clothes, rations).",
      image: IMAGES.heroSecondary,
      tag: "Contribution"
    },
    {
      num: "04",
      title: "Real-Time Milestone Accountability",
      desc: "NGOs upload milestone photographic proofs and distribution receipts before project phases are finalized, updating donors automatically.",
      image: IMAGES.volunteering,
      tag: "Impact Proof"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Header */}
      <div className="bg-hope-charcoal text-white py-16 text-center space-y-4">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-hope-orange bg-hope-orange/20 px-3.5 py-1 rounded-full">
            The HOPEHUB Framework
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black mt-2">
            How Our Ecosystem Ensures Trust
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Discover the two-tier verification workflow, confidential intake, and auditable accounting that powers HOPEHUB.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Step-by-Step Flow */}
        <div className="space-y-12">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-hope-teal text-white flex items-center justify-center font-heading font-black text-lg shadow-sm">
                    {s.num}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-hope-orange bg-orange-50 px-3 py-1 rounded-full">
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-black text-hope-charcoal">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="rounded-2xl overflow-hidden aspect-[16/10] shadow-sm">
                  <ImageWithFallback
                    src={s.image}
                    alt={s.title}
                    aspectRatio="aspect-[16/10]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Roles Breakdown Section */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <h2 className="text-3xl font-heading font-black text-center text-hope-charcoal mb-12">
            Tailored Experiences for Every Role
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Donors",
                desc: "Discover vetted causes, simulate secure contributions, generate downloadable receipts, and track real-time campaign progress bars.",
                link: "/campaigns",
                btn: "Explore Causes"
              },
              {
                role: "Beneficiaries",
                desc: "Confidential, respectful intake for urgent medical, education, and disaster relief. Zero public exposure of private details.",
                link: "/register?role=BENEFICIARY",
                btn: "Request Help"
              },
              {
                role: "Volunteers",
                desc: "Browse skill-matched opportunities, apply with one click, and build a verified service record with partner NGOs.",
                link: "/volunteer",
                btn: "View Drives"
              },
              {
                role: "NGO Partners",
                desc: "Submit legal verification, launch vetted campaigns, coordinate volunteers, and manage resource donations in one dashboard.",
                link: "/register?role=NGO",
                btn: "Register NGO"
              }
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-heading font-black text-xl text-hope-teal">{r.role}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{r.desc}</p>
                </div>
                <Link
                  to={r.link}
                  className="w-full text-center py-2.5 rounded-xl bg-hope-light-teal text-hope-teal hover:bg-hope-teal hover:text-white font-bold text-xs transition"
                >
                  {r.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
