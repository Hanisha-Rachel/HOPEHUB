import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Eye, Target, ShieldCheck, Heart, Sparkles, CheckCircle2, ArrowRight, Users, Globe2 } from 'lucide-react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { IMAGES } from '../data/mockData';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Banner on Soft Cream */}
      <div className="relative bg-hope-cream py-20 border-b border-orange-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-hope-teal bg-teal-100 px-4 py-1.5 rounded-full border border-teal-200">
            Our Purpose & Ethos
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-black text-hope-charcoal">
            Building a World Where <br />
            <span className="text-hope-teal">Compassion Meets Accountability</span>
          </h1>
          <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            HOPEHUB was created to restore absolute trust, transparency, and dignity in social giving by creating a unified digital bridge between those who give and those who need.
          </p>
        </div>
      </div>

      {/* Section 1: The Problem We Address on Light Teal */}
      <section className="py-20 bg-hope-light-teal/50 border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-hope-coral bg-rose-100 px-3.5 py-1 rounded-full border border-rose-200">
                The Core Challenge
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-hope-charcoal">
                Charity Should Never Be a Black Box
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                Every day, generous individuals want to help someone in distress, but are deterred by fraudulent appeals on social media, lack of verified organizational records, and opaque fund utilization.
              </p>
              <p className="text-slate-700 text-base leading-relaxed">
                At the same time, legitimate grassroots NGOs spend excessive time keeping manual ledgers, while vulnerable beneficiaries have their medical emergencies publicized without dignity.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-bold text-hope-charcoal bg-white p-3.5 rounded-2xl border border-teal-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-hope-teal shrink-0" />
                  <span>Zero unvetted or untracked fundraising campaigns</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-hope-charcoal bg-white p-3.5 rounded-2xl border border-teal-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-hope-teal shrink-0" />
                  <span>Zero-knowledge shielding for sensitive beneficiary data</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-hope-charcoal bg-white p-3.5 rounded-2xl border border-teal-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-hope-teal shrink-0" />
                  <span>Real-time milestone transparency for every single rupee</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                <ImageWithFallback
                  src={IMAGES.aboutMission}
                  alt="Community hands united"
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Mission & Vision on Soft Cream */}
      <section className="py-20 bg-hope-cream border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-orange-100 shadow-card space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-hope-teal text-white flex items-center justify-center shadow-md">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-heading font-black text-hope-charcoal">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To empower donors, verified NGOs, volunteers, and beneficiaries through an intelligent, unified digital management platform that enforces rigorous administrative vetting, direct resource routing, and absolute accountability.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-teal-100 shadow-card space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-hope-orange text-white flex items-center justify-center shadow-md">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-heading font-black text-hope-charcoal">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                A humane society where no genuine human plea goes unanswered, no charitable contribution is diverted, and every act of kindness—from financial aid to volunteer hours—creates verifiable, lasting change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Ground Impact Photo Mosaic */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-hope-orange bg-orange-100 px-4 py-1.5 rounded-full">
              Field Action
            </span>
            <h2 className="text-3xl font-heading font-black text-hope-charcoal mt-3">
              Witnessing Impact on the Ground
            </h2>
            <p className="text-slate-500 text-sm mt-1">Real programs active across 12 Indian states</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: IMAGES.education, tag: "Education", text: "24 Rural School Libraries" },
              { img: IMAGES.foodRelief, tag: "Food Relief", text: "1,200 Hot Meals Daily" },
              { img: IMAGES.healthcare, tag: "Mobile Health", text: "Free Tribal Diagnostics" },
              { img: IMAGES.volunteering, tag: "Environment", text: "Urban Afforestation" }
            ].map((p, i) => (
              <div key={i} className="rounded-3xl overflow-hidden shadow-card border-2 border-slate-100 group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.tag} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 bg-slate-50 text-left">
                  <span className="text-[10px] font-black uppercase text-hope-teal">{p.tag}</span>
                  <h4 className="font-heading font-black text-sm text-hope-charcoal">{p.text}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 4: Pillars of Integrity */}
      <section className="py-20 bg-hope-light-teal/40 border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-hope-teal bg-teal-100 px-4 py-1 rounded-full border border-teal-200">
              Pillars of Integrity
            </span>
            <h2 className="text-3xl font-heading font-black text-hope-charcoal">
              The Values That Guide Every Decision
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Radical Transparency",
                desc: "Every campaign progress bar and donation record is bound to true relational ledger entries.",
                icon: ShieldCheck,
                color: "text-hope-teal bg-teal-50"
              },
              {
                title: "Beneficiary Dignity",
                desc: "We guard personal privacy fiercely; vulnerable individuals are protected from public exposure.",
                icon: Heart,
                color: "text-hope-coral bg-rose-50"
              },
              {
                title: "Accountable Leadership",
                desc: "NGOs must pass rigorous administrative validation before publishing campaigns.",
                icon: Target,
                color: "text-hope-orange bg-orange-50"
              },
              {
                title: "Community Synergy",
                desc: "Uniting donors, volunteers, and ground teams into an efficient, collaborative engine.",
                icon: HeartHandshake,
                color: "text-teal-700 bg-teal-50"
              }
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-card space-y-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${v.color}`}>
                  <v.icon className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-black text-base text-hope-charcoal">{v.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="py-20 bg-hope-teal text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-heading font-black">
            Ready to Be Part of the Solution?
          </h2>
          <p className="text-teal-100 text-sm sm:text-base max-w-xl mx-auto">
            Explore verified campaigns, apply for volunteer drives, or register your organization today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/campaigns"
              className="px-8 py-3.5 rounded-2xl bg-hope-orange hover:bg-hope-orange-hover text-white font-black text-sm shadow-md transition"
            >
              Explore Campaigns
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
