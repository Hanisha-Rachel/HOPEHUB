import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Calendar, Users, Heart, Share2, ArrowLeft, Clock, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import ProgressBar from '../components/common/ProgressBar';
import Badge from '../components/common/Badge';
import DonationModal from '../components/common/DonationModal';
import CampaignCard from '../components/common/CampaignCard';
import { CAMPAIGNS } from '../data/mockData';

export default function CampaignDetailPage() {
  const { slug } = useParams();
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [campaignList, setCampaignList] = useState(CAMPAIGNS);

  const campaign = campaignList.find((c) => c.slug === slug) || campaignList[0];
  const percentage = Math.min(100, Math.round((campaign.raised / (campaign.goal || 1)) * 100));

  const relatedCampaigns = campaignList
    .filter((c) => c.id !== campaign.id)
    .slice(0, 3);

  const handleDonationComplete = (campaignId, amount) => {
    setCampaignList((prev) =>
      prev.map((c) =>
        c.id === campaignId
          ? { ...c, raised: c.raised + amount, donorsCount: c.donorsCount + 1 }
          : c
      )
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Campaign link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-hope-light-teal/30 pb-20">
      
      {/* Breadcrumb Navigation on Soft Cream */}
      <div className="bg-hope-cream border-b border-orange-100 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/campaigns"
            className="inline-flex items-center gap-2 text-xs font-bold text-hope-teal hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all campaigns</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Left Content (Span 8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Large Hero Banner Photo */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-card border-2 border-teal-100">
              <div className="relative aspect-[16/9] w-full">
                <ImageWithFallback
                  src={campaign.image}
                  alt={campaign.title}
                  aspectRatio="aspect-[16/9]"
                  tag={campaign.category}
                  tagColor="bg-hope-teal text-white"
                />
              </div>

              {/* Title & Metadata Header */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={campaign.ngoLogo}
                      alt={campaign.ngoName}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-200 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading font-black text-base text-hope-charcoal">{campaign.ngoName}</span>
                        {campaign.ngoVerified && <ShieldCheck className="w-5 h-5 text-hope-teal" title="Verified NGO" />}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">Verified Platform Partner • 12A/80G Compliant</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {campaign.urgency === 'Critical' && <Badge type="critical" text="Urgent Need" />}
                    <button
                      onClick={handleShare}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
                      title="Share campaign"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-hope-charcoal leading-tight">
                  {campaign.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-hope-orange" />
                    {campaign.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-hope-teal" />
                    {campaign.daysLeft} days remaining
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-hope-coral" />
                    {campaign.donorsCount} contributors
                  </span>
                </div>
              </div>
            </div>

            {/* In-depth Narrative & Story */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border-2 border-slate-100 space-y-6">
              <h2 className="text-xl sm:text-2xl font-heading font-black text-hope-charcoal border-b border-slate-100 pb-4">
                About the Initiative
              </h2>
              <div className="prose max-w-none text-slate-600 space-y-4 text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-hope-charcoal text-base">
                  {campaign.description}
                </p>
                <p>
                  {campaign.story}
                </p>
              </div>

              {/* Transparency Declaration */}
              <div className="bg-hope-light-teal/70 rounded-2xl p-6 border-2 border-teal-200 text-xs text-hope-teal-800 space-y-2">
                <div className="font-extrabold flex items-center gap-2 text-hope-teal text-sm">
                  <ShieldCheck className="w-5 h-5 text-hope-orange" />
                  <span>HOPEHUB Verified Impact Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  Funds from this campaign are routed directly toward project milestones. The organizing NGO submits purchase invoices and distribution photographs to HOPEHUB platform administrators prior to fund tranches release.
                </p>
              </div>
            </div>

            {/* Campaign Timeline & Milestone Updates */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border-2 border-slate-100 space-y-6">
              <h2 className="text-xl font-heading font-black text-hope-charcoal border-b border-slate-100 pb-4 flex items-center justify-between">
                <span>Milestone Updates ({campaign.updates?.length || 0})</span>
                <span className="text-xs font-bold text-hope-orange">Audited Records</span>
              </h2>

              {campaign.updates && campaign.updates.length > 0 ? (
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-teal-200">
                  {campaign.updates.map((update, i) => (
                    <div key={i} className="relative flex items-start gap-4 pl-8">
                      <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-hope-teal border-4 border-white shadow-sm" />
                      <div>
                        <span className="text-[11px] font-black text-hope-orange uppercase tracking-wider">{update.date}</span>
                        <h4 className="font-heading font-black text-base text-hope-charcoal mt-0.5">{update.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{update.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No milestone updates posted yet for this campaign.</p>
              )}
            </div>

          </div>


          {/* Sticky Right Donation Card (Span 4) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-hover border-2 border-teal-200 space-y-6">
              
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">Total Raised</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-heading font-black text-hope-teal">
                    ₹ {campaign.raised.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">
                    of ₹ {campaign.goal.toLocaleString()}
                  </span>
                </div>
              </div>

              <ProgressBar current={campaign.raised} target={campaign.goal} height="h-3.5" showText={false} />

              <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100 text-center">
                <div>
                  <span className="text-xl font-heading font-black text-hope-charcoal">{percentage}%</span>
                  <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">Goal Achieved</span>
                </div>
                <div>
                  <span className="text-xl font-heading font-black text-hope-charcoal">{campaign.donorsCount}</span>
                  <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">Supporters</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="w-full py-4 rounded-2xl bg-hope-orange hover:bg-hope-orange-hover text-white font-black font-heading text-base shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Support This Campaign</span>
                </button>

                <p className="text-[11px] text-center text-slate-400 font-medium">
                  ⚡ Instant tax-exemption demonstration receipt generated upon contribution.
                </p>
              </div>

            </div>

            {/* Organizing NGO Card */}
            <div className="bg-hope-cream rounded-3xl p-6 border-2 border-orange-200 space-y-3 shadow-card">
              <span className="text-[11px] font-black text-hope-teal uppercase tracking-widest block">
                About the Organizer
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={campaign.ngoLogo}
                  alt={campaign.ngoName}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-heading font-black text-sm text-hope-charcoal">{campaign.ngoName}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-teal-800 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-hope-teal" />
                    <span>Verified Organization</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Registered non-profit actively managing grassroots humanitarian projects across India.
              </p>
            </div>

          </div>

        </div>

        {/* Related Campaigns Section on Tinted Background */}
        <div className="mt-20 pt-12 border-t-2 border-teal-200/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-heading font-black text-hope-charcoal">
                Other Campaigns You Can Support
              </h2>
              <p className="text-xs text-slate-500">Explore vetted initiatives making an urgent impact</p>
            </div>
            <Link to="/campaigns" className="text-sm font-bold text-hope-teal hover:underline bg-white px-4 py-2 rounded-xl border border-teal-200">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCampaigns.map((rc) => (
              <CampaignCard
                key={rc.id}
                campaign={rc}
                onQuickDonate={(c) => {
                  setCampaignList(prev => prev);
                  setIsDonationModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Donation Modal */}
      <DonationModal
        campaign={campaign}
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onDonationComplete={handleDonationComplete}
      />

    </div>
  );
}
