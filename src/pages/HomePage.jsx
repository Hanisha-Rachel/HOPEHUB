import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import {
  Heart,
  Users,
  Building2,
  TrendingUp,
  ShieldCheck,
  Search,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Gift,
  HelpCircle,
  FileCheck2,
  HandHeart,
  CheckCircle2,
  AlertCircle,
  Flame,
  Award,
  BookOpen,
  Apple,
  Stethoscope,
  Droplets,
  Package,
  ShieldAlert
} from 'lucide-react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import CampaignCard from '../components/common/CampaignCard';
import DonationModal from '../components/common/DonationModal';
import Badge from '../components/common/Badge';
import { IMAGES, PLATFORM_STATS, CAMPAIGNS, NGOS, IMPACT_STORIES } from '../data/mockData';

export default function HomePage() {
  const [selectedCampaignForDonation, setSelectedCampaignForDonation] = useState(null);
  const [campaignList, setCampaignList] = useState(CAMPAIGNS);
  const loadCampaigns = async () => {
  try {
    const response = await api.campaigns.getAll();

    const backendCampaigns = Array.isArray(response)
      ? response
      : response?.data;

    if (!Array.isArray(backendCampaigns)) {
      console.error('Invalid campaigns response:', response);
      return;
    }

    setCampaignList(
      backendCampaigns.map((campaign) => {
        const existingCampaign = CAMPAIGNS.find(
          (item) => String(item.id) === String(campaign.id)
        ) || {};

        return {
          ...existingCampaign,
          ...campaign,
          id: campaign.id,
          raised: Number(
            campaign.raisedAmount ?? campaign.raised ?? existingCampaign.raised ?? 0
          ),
          goal: Number(
            campaign.goalAmount ?? campaign.goal ?? existingCampaign.goal ?? 1
          ),
          donorsCount: Number(
            campaign.donorCount ??
            campaign.donorsCount ??
            existingCampaign.donorsCount ??
            0
          ),
        };
      })
    );
  } catch (error) {
    console.error('Failed to load campaigns:', error);
  }
};

useEffect(() => {
  loadCampaigns();
}, []);

const handleDonationComplete = () => {
  loadCampaigns();
};

  const causeCategories = [
    { title: "Education", subtitle: "24 Rural Libraries", icon: BookOpen, image: IMAGES.education, color: "from-teal-600 to-teal-800", count: "12 Drives" },
    { title: "Food Relief", subtitle: "20,000+ Daily Meals", icon: Apple, image: IMAGES.foodRelief, color: "from-orange-500 to-amber-700", count: "15 Drives" },
    { title: "Healthcare", subtitle: "Mobile Tribal Clinics", icon: Stethoscope, image: IMAGES.healthcare, color: "from-rose-500 to-red-700", count: "8 Drives" },
    { title: "Clean Water", subtitle: "Solar Borewells", icon: Droplets, image: IMAGES.cleanWater, color: "from-cyan-600 to-teal-800", count: "6 Drives" },
    { title: "Disaster Aid", subtitle: "Flood Relief Packs", icon: ShieldAlert, image: IMAGES.emergencyRelief, color: "from-amber-600 to-orange-800", count: "5 Drives" },
    { title: "Winter Care", subtitle: "Thermal Blankets", icon: Package, image: IMAGES.clothingDrive, color: "from-purple-600 to-indigo-800", count: "7 Drives" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* ========================================================
          1. HERO SECTION (Vibrant Soft Cream with Multi-Photo Collage)
          ======================================================== */}
      <section className="relative overflow-hidden bg-hope-cream py-12 sm:py-20 border-b border-orange-100">
        
        {/* Ambient Warm Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[30rem] h-[30rem] rounded-full bg-teal-200/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] rounded-full bg-orange-200/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Memorable Copy & Prominent CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-teal-100/90 text-hope-teal px-4 py-2 rounded-full text-xs font-bold tracking-wide border border-teal-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-hope-orange animate-spin" />
                <span>Verified Charities • Radical Transparency • Zero Hidden Fees</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-hope-charcoal tracking-tight leading-[1.12]">
                Small Acts. <br />
                <span className="text-hope-teal">Greater Hope.</span> <br />
                <span className="text-hope-orange">Lasting Change.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Join a vibrant community that turns compassion into action. Discover vetted campaigns, support individuals in need with complete transparency, and empower grassroots NGOs across India.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/campaigns"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-hope-orange hover:bg-hope-orange-hover text-white font-black font-heading text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Explore Campaigns</span>
                </Link>

                <Link
                  to="/volunteer"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-teal-50 text-hope-teal font-extrabold text-base border-2 border-hope-teal shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <HandHeart className="w-5 h-5 text-hope-teal" />
                  <span>Become a Volunteer</span>
                </Link>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-6 border-t border-orange-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-600 font-bold">
                <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full border border-teal-100 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-hope-teal" />
                  <span>100% Vetted NGOs</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full border border-teal-100 shadow-xs">
                  <FileCheck2 className="w-4 h-4 text-hope-orange" />
                  <span>Audited Ledgers</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full border border-teal-100 shadow-xs">
                  <HeartHandshake className="w-4 h-4 text-hope-coral" />
                  <span>Direct Beneficiary Shield</span>
                </div>
              </div>

            </div>

            {/* Right Column: Multi-Photo Charity Collage (Dense Visual Layout) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* 3-Photo Dynamic Grid */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Photo 1: Large Children Learning */}
                  <div className="col-span-2 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] group relative">
                    <img
                      src={IMAGES.heroBanner}
                      alt="Children learning together - HOPEHUB Impact"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                      <span className="text-white text-xs font-bold drop-shadow flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-hope-orange" />
                        Project Vidya • 24 Village Libraries Supported
                      </span>
                    </div>
                  </div>

                  {/* Photo 2: Food Distribution */}
                  <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] group relative">
                    <img
                      src={IMAGES.foodKitchen}
                      alt="Community Kitchen Food Distribution"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white text-[11px] font-bold drop-shadow flex items-center gap-1">
                        <Apple className="w-3 h-3 text-amber-300" />
                        20,000+ Hot Meals
                      </span>
                    </div>
                  </div>

                  {/* Photo 3: Medical Mobile Clinic */}
                  <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] group relative">
                    <img
                      src={IMAGES.medicalCamp}
                      alt="Mobile Health Camps"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white text-[11px] font-bold drop-shadow flex items-center gap-1">
                        <Stethoscope className="w-3 h-3 text-rose-300" />
                        Tribal Health Checkups
                      </span>
                    </div>
                  </div>

                </div>

                {/* Floating Metric Badge (Raised Total) */}
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-card border-2 border-teal-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-hope-light-teal flex items-center justify-center text-hope-teal shrink-0">
                    <TrendingUp className="w-5 h-5 text-hope-teal" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Mobilized</span>
                    <h4 className="font-heading font-black text-hope-charcoal text-base leading-tight">₹ 4.82 Cr</h4>
                  </div>
                </div>

                {/* Floating Volunteer Pill */}
                <div className="absolute -bottom-4 -left-4 bg-hope-teal text-white rounded-2xl p-3 shadow-xl border-2 border-white flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-teal-200 block uppercase font-bold">Community Force</span>
                    <span className="text-xs font-black">3,420+ Volunteers</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          2. PHOTOGRAPHIC CAUSE BROWSER (Vibrant Photographic Cards)
          ======================================================== */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-hope-teal uppercase tracking-widest bg-hope-light-teal px-3 py-1 rounded-full">
                Sectors of Impact
              </span>
              <h2 className="text-2xl font-heading font-black text-hope-charcoal mt-1">
                Explore Causes That Need Your Support
              </h2>
            </div>
            <Link to="/campaigns" className="text-xs font-bold text-hope-orange hover:underline flex items-center gap-1">
              <span>View all categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {causeCategories.map((c, i) => {
              const Icon = c.icon;
              return (
                <Link
                  key={i}
                  to={`/campaigns`}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-hover border-2 border-slate-100 transition-all duration-300 transform hover:-translate-y-1 block"
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.color} opacity-60 group-hover:opacity-75 transition-opacity`} />
                  <div className="absolute inset-0 p-3.5 flex flex-col justify-between text-white z-10">
                    <span className="self-end bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {c.count}
                    </span>
                    <div>
                      <Icon className="w-5 h-5 text-white mb-1.5" />
                      <h4 className="font-heading font-black text-sm leading-tight">{c.title}</h4>
                      <p className="text-[10px] text-white/80 font-medium truncate mt-0.5">{c.subtitle}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================
          3. IMPACT STATISTICS SECTION (Deep Teal Background)
          ======================================================== */}
      <section className="bg-hope-teal text-white py-14 border-y-4 border-teal-800 relative overflow-hidden">
        
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={IMAGES.ctaBanner} alt="Pattern" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-teal-600/70">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-hope-orange bg-white/10 px-3.5 py-1 rounded-full">
                Real-Time Verified Metrics
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-white mt-2">
                Our Collective Footprint Across India
              </h2>
            </div>
            <div className="bg-teal-900/40 border border-teal-500/40 px-4 py-2 rounded-2xl text-xs text-teal-100 max-w-md">
              ⚡ Aggregated directly from verified platform ledger records. All figures represent illustrative demonstration data.
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition group">
              <Users className="w-8 h-8 text-hope-orange mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl sm:text-4xl font-heading font-black text-white">
                {PLATFORM_STATS.livesImpacted}
              </div>
              <div className="text-xs sm:text-sm text-teal-100 font-semibold mt-1">
                Lives Touched & Supported
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition group">
              <TrendingUp className="w-8 h-8 text-amber-300 mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl sm:text-4xl font-heading font-black text-white">
                {PLATFORM_STATS.activeCampaigns}
              </div>
              <div className="text-xs sm:text-sm text-teal-100 font-semibold mt-1">
                Active Verified Campaigns
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition group">
              <Building2 className="w-8 h-8 text-teal-200 mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl sm:text-4xl font-heading font-black text-white">
                {PLATFORM_STATS.verifiedNGOs}
              </div>
              <div className="text-xs sm:text-sm text-teal-100 font-semibold mt-1">
                Vetted Partner NGOs
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition group">
              <HandHeart className="w-8 h-8 text-hope-coral mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl sm:text-4xl font-heading font-black text-white">
                {PLATFORM_STATS.activeVolunteers}
              </div>
              <div className="text-xs sm:text-sm text-teal-100 font-semibold mt-1">
                Active Registered Volunteers
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          4. FEATURED CAMPAIGNS (Light Teal Background with Popping Cards)
          ======================================================== */}
      <section className="py-20 bg-hope-light-teal/50 border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-hope-orange uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4 text-hope-coral" />
                <span>Urgent & High-Impact Causes</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-hope-charcoal">
                Featured Verified Campaigns
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Every campaign undergoes thorough background inspection, financial goal validation, and legal document audit by platform administrators.
              </p>
            </div>

            <Link
              to="/campaigns"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 font-black text-sm text-hope-teal hover:text-hope-teal-dark group bg-white px-5 py-2.5 rounded-xl border border-teal-200 shadow-sm"
            >
              <span>Explore all {campaignList.length} campaigns</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-hope-orange" />
            </Link>
          </div>

          {/* Grid of Campaign Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaignList.slice(0, 6).map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onQuickDonate={(c) => setSelectedCampaignForDonation(c)}
              />
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          5. HOW HOPEHUB WORKS (Soft Cream Background with Photo Step Cards)
          ======================================================== */}
      <section className="py-20 bg-hope-cream border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs font-bold uppercase tracking-widest text-hope-teal bg-teal-100 px-4 py-1.5 rounded-full">
            Transparent Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-hope-charcoal mt-3">
            How HOPEHUB Connects Hearts & Hands
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-2">
            A frictionless digital environment designed to eliminate confusion, prevent duplicate claims, and restore absolute trust to social giving.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 text-left">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-orange-100 shadow-card hover:shadow-hover transition flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={IMAGES.education}
                  alt="Discovering verified causes"
                  aspectRatio="aspect-[16/10]"
                  tag="Step 01"
                  tagColor="bg-hope-orange text-white"
                />
              </div>
              <div className="p-7 space-y-3">
                <h3 className="text-xl font-heading font-black text-hope-charcoal">
                  Discover a Vetted Cause
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Browse campaigns filtered by sector (Education, Healthcare, Food, Disaster Aid) with certified NGO documentation and transparent budget goals.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-teal-100 shadow-card hover:shadow-hover transition flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={IMAGES.volunteering}
                  alt="Choosing how to contribute"
                  aspectRatio="aspect-[16/10]"
                  tag="Step 02"
                  tagColor="bg-hope-teal text-white"
                />
              </div>
              <div className="p-7 space-y-3">
                <h3 className="text-xl font-heading font-black text-hope-charcoal">
                  Choose How to Help
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Support financially via our safe simulated demonstration gateway, pledge physical materials (clothes, food, books), or register your time as an active volunteer.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-rose-100 shadow-card hover:shadow-hover transition flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={IMAGES.heroSecondary}
                  alt="Tracking impact on HopeHub"
                  aspectRatio="aspect-[16/10]"
                  tag="Step 03"
                  tagColor="bg-hope-coral text-white"
                />
              </div>
              <div className="p-7 space-y-3">
                <h3 className="text-xl font-heading font-black text-hope-charcoal">
                  Make & Track Impact
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Receive verifiable transaction acknowledgements, track real-time campaign progress bars, and view photographic milestone updates as resources reach beneficiaries.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          6. WAYS TO HELP (Dark Charcoal Background with Vibrant Glowing Cards)
          ======================================================== */}
      <section className="py-20 bg-hope-charcoal text-white relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-hope-teal/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-hope-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-hope-orange bg-white/10 px-4 py-1.5 rounded-full border border-orange-400/30">
              Multi-Faceted Philanthropy
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mt-3">
              Four Meaningful Pathways to Participate
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Everyone has something valuable to give—whether it is financial aid, essential physical supplies, specialized skills, or seeking assistance in times of need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Donate Money */}
            <div className="bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-700 shadow-xl hover:border-hope-teal transition group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={IMAGES.healthcare}
                    alt="Donate Money"
                    aspectRatio="aspect-[4/3]"
                    tag="Financial Aid"
                    tagColor="bg-hope-teal text-white"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-black text-lg text-white group-hover:text-teal-300 transition">
                    Donate Funds
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Directly support verified medical emergencies, school literacy labs, and hunger relief drives through transparent ledgers.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/campaigns"
                  className="block w-full text-center py-2.5 rounded-xl bg-hope-teal hover:bg-hope-teal-dark text-white font-bold text-xs transition shadow-md"
                >
                  Browse Causes
                </Link>
              </div>
            </div>

            {/* 2. Donate Resources */}
            <div className="bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-700 shadow-xl hover:border-hope-orange transition group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={IMAGES.clothingDrive}
                    alt="Donate Resources"
                    aspectRatio="aspect-[4/3]"
                    tag="Material Aid"
                    tagColor="bg-hope-orange text-white"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-black text-lg text-white group-hover:text-orange-300 transition">
                    Donate Resources
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Pledge essential physical goods: books, warm clothing, dry ration food kits, and emergency first-aid supplies.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/resources"
                  className="block w-full text-center py-2.5 rounded-xl bg-hope-orange hover:bg-hope-orange-hover text-white font-bold text-xs transition shadow-md"
                >
                  Pledge Supplies
                </Link>
              </div>
            </div>

            {/* 3. Volunteer Your Time */}
            <div className="bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-700 shadow-xl hover:border-rose-400 transition group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={IMAGES.volunteering}
                    alt="Volunteer Your Time"
                    aspectRatio="aspect-[4/3]"
                    tag="Field Action"
                    tagColor="bg-hope-coral text-white"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-black text-lg text-white group-hover:text-rose-300 transition">
                    Volunteer Time
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Lend your hands and talents: teaching, medical camp logistics, community kitchen packing, or tree planting.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/volunteer"
                  className="block w-full text-center py-2.5 rounded-xl bg-hope-coral hover:bg-rose-600 text-white font-bold text-xs transition shadow-md"
                >
                  Explore Drives
                </Link>
              </div>
            </div>

            {/* 4. Request Assistance */}
            <div className="bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-700 shadow-xl hover:border-cyan-400 transition group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={IMAGES.aboutMission}
                    alt="Request Assistance"
                    aspectRatio="aspect-[4/3]"
                    tag="Dignified Aid"
                    tagColor="bg-teal-700 text-white"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-black text-lg text-white group-hover:text-cyan-300 transition">
                    Request Assistance
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Facing critical medical, educational, or emergency hardship? Submit a private, confidential aid request.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/register?role=BENEFICIARY"
                  className="block w-full text-center py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition shadow-md"
                >
                  Submit Request
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          7. COMMUNITY IMPACT PHOTO GALLERY (Image-Rich Mosaic Showcase)
          ======================================================== */}
      <section className="py-20 bg-hope-light-teal/60 border-b border-teal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-hope-teal bg-teal-100 px-4 py-1.5 rounded-full border border-teal-200">
              Grassroots Impact Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-hope-charcoal mt-3">
              Moments of Hope in Every Corner
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              From solar classroom tablets in Rajasthan to emergency mobile clinics in Wayanad—see how your support brings real dignity to lives.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { img: IMAGES.gallery1, title: "Rural Education", desc: "Digital Tablets in 24 Schools" },
              { img: IMAGES.gallery2, title: "Food Security", desc: "20,000+ Hot Slum Meals" },
              { img: IMAGES.gallery3, title: "Healthcare Camp", desc: "Tribal Maternal Care" },
              { img: IMAGES.gallery4, title: "Clean Water", desc: "Solar Wells Installed" },
              { img: IMAGES.gallery5, title: "Youth Volunteers", desc: "Tree Planting Drives" },
              { img: IMAGES.gallery6, title: "Winter Warmth", desc: "3,000 Blankets Distributed" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-md border-2 border-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hope-charcoal/90 via-hope-charcoal/30 to-transparent flex flex-col justify-end p-3.5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-hope-orange drop-shadow">
                    {item.title}
                  </span>
                  <h4 className="font-heading font-black text-xs leading-snug drop-shadow mt-0.5">
                    {item.desc}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          8. FEATURED VERIFIED ORGANIZATIONS (Vibrant White & Tinted Cards)
          ======================================================== */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-hope-teal uppercase tracking-widest bg-hope-light-teal px-3 py-1 rounded-full">
                Vetted Partners
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-hope-charcoal mt-2">
                Verified Non-Governmental Organizations
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Every NGO displays its government registration compliance, operational history, and active community initiatives.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs text-slate-500 font-bold bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-hope-teal" />
              <span>Certified under HOPEHUB Governance Standards</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NGOS.map((ngo) => (
              <div
                key={ngo.id}
                className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-card hover:shadow-hover transition group flex flex-col justify-between hover:border-hope-teal"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
                    <ImageWithFallback
                      src={ngo.image}
                      alt={ngo.name}
                      aspectRatio="aspect-[16/10]"
                    />
                    <div className="absolute top-2 right-2 bg-white/95 rounded-full p-1 shadow">
                      <ShieldCheck className="w-4 h-4 text-hope-teal" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-hope-orange uppercase tracking-wider block">
                    {ngo.category}
                  </span>
                  <h3 className="font-heading font-black text-base text-hope-charcoal mt-1 line-clamp-1 group-hover:text-hope-teal transition">
                    {ngo.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                    Reg: {ngo.regNo}
                  </span>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {ngo.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold">
                    {ngo.activeCampaigns} Active Drives
                  </span>
                  <span className="font-black text-hope-teal">
                    {ngo.totalRaised} Raised
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          9. IMPACT STORIES (Soft Cream Background with Story Cards)
          ======================================================== */}
      <section className="py-20 bg-hope-cream border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-hope-coral bg-rose-100 px-3.5 py-1 rounded-full border border-rose-200">
              Stories of Hope
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-hope-charcoal mt-3">
              The Real Lives Behind the Numbers
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Every completed campaign transforms human lives. Here are demonstrative stories illustrating the profound power of community kindness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {IMPACT_STORIES.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-orange-100 shadow-card flex flex-col justify-between hover:shadow-hover transition"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.name}
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-bold text-hope-teal">{story.category}</span>
                      <span>{story.location}</span>
                    </div>
                    <h3 className="font-heading font-black text-lg text-hope-charcoal">
                      {story.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 italic mt-3 leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className={`rounded-xl p-3 text-xs font-bold border flex items-center gap-2 ${story.accent || 'bg-teal-50 border-teal-200 text-hope-teal'}`}>
                    <CheckCircle2 className="w-4 h-4 text-hope-orange shrink-0" />
                    <span>{story.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          10. FINAL CALL TO ACTION (Full Photographic Composition)
          ======================================================== */}
      <section className="relative py-24 bg-hope-charcoal overflow-hidden text-white">
        
        {/* Full Photograph Backdrop */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={IMAGES.ctaBanner}
            alt="Community solidarity"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-hope-charcoal via-hope-teal-dark/90 to-hope-charcoal/95 z-0" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-hope-orange/20 text-hope-orange px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border border-hope-orange/30">
            <Heart className="w-3.5 h-3.5 fill-hope-orange" />
            <span>Join the Hope Movement Today</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight">
            "Your Kindness Can Change Someone's Tomorrow."
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Whether you are contributing ₹100, volunteering an afternoon, or registering an NGO to expand community reach—HOPEHUB provides the transparent foundation you can trust.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/campaigns"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-hope-orange hover:bg-hope-orange-hover text-white font-black text-base shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Start Helping Now</span>
            </Link>

            <Link
              to="/register"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-sm transition flex items-center justify-center gap-2"
            >
              <span>Create an Account</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Demonstration Donation Modal */}
      <DonationModal
        campaign={selectedCampaignForDonation}
        isOpen={!!selectedCampaignForDonation}
        onClose={() => setSelectedCampaignForDonation(null)}
        onDonationComplete={handleDonationComplete}
      />

    </div>
  );
}
