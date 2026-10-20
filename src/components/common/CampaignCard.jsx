import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Users, Clock, Heart, Sparkles, ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import ProgressBar from './ProgressBar';
import Badge from './Badge';

export default function CampaignCard({ campaign, onQuickDonate }) {
  const percentage = Math.min(100, Math.round((campaign.raised / (campaign.goal || 1)) * 100));

  const getCategoryTheme = (category) => {
    switch (category) {
      case 'Education':
        return { tagBg: 'bg-teal-700 text-white', accentText: 'text-hope-teal', borderHover: 'hover:border-teal-400' };
      case 'Food Relief':
        return { tagBg: 'bg-hope-orange text-white', accentText: 'text-hope-orange', borderHover: 'hover:border-orange-400' };
      case 'Healthcare':
        return { tagBg: 'bg-hope-coral text-white', accentText: 'text-hope-coral', borderHover: 'hover:border-rose-400' };
      case 'Disaster Relief':
        return { tagBg: 'bg-amber-600 text-white', accentText: 'text-amber-600', borderHover: 'hover:border-amber-400' };
      default:
        return { tagBg: 'bg-hope-teal text-white', accentText: 'text-hope-teal', borderHover: 'hover:border-teal-400' };
    }
  };

  const theme = getCategoryTheme(campaign.category);

  return (
    <div className={`bg-white rounded-3xl overflow-hidden border-2 border-slate-100/90 shadow-card hover:shadow-hover transition-all duration-300 flex flex-col group transform hover:-translate-y-1.5 ${theme.borderHover}`}>
      
      {/* Prominent Image Section (Large, visual ratio) */}
      <div className="relative overflow-hidden aspect-[16/11]">
        <ImageWithFallback
          src={campaign.image}
          alt={campaign.title}
          aspectRatio="aspect-[16/11]"
          tag={campaign.category}
          tagColor={theme.tagBg}
        />

        {/* Urgency Badge */}
        {campaign.urgency === 'Critical' && (
          <div className="absolute top-3 right-3 z-10">
            <Badge type="critical" text="Urgent Aid" />
          </div>
        )}

        {/* Bottom Image Overlay with Location and Days Left */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent p-3 pt-8 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1.5 font-medium truncate max-w-[65%]">
            <MapPin className="w-3.5 h-3.5 text-hope-orange shrink-0" />
            <span className="truncate drop-shadow">{campaign.location || 'India'}</span>
          </div>

          <div className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>{campaign.daysLeft}d left</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4 bg-gradient-to-b from-white to-slate-50/50">
        
        <div className="space-y-2">
          {/* NGO Info & Verification */}
          <div className="flex items-center gap-2">
            <img
              src={campaign.ngoLogo}
              alt={campaign.ngoName}
              className="w-5 h-5 rounded-full object-cover border border-slate-200"
            />
            <span className="text-xs font-bold text-slate-600 truncate">
              {campaign.ngoName}
            </span>
            {campaign.ngoVerified && (
              <ShieldCheck className="w-4 h-4 text-hope-teal shrink-0" title="Verified NGO" />
            )}
          </div>

          {/* Title */}
          <Link to={`/campaigns/${campaign.slug}`}>
            <h3 className="font-heading font-black text-lg text-hope-charcoal group-hover:text-hope-teal transition line-clamp-2 leading-snug">
              {campaign.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {campaign.description}
          </p>
        </div>

        {/* Financial Progress & Metrics */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          
          <ProgressBar current={campaign.raised} target={campaign.goal} height="h-2.5" />

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Raised</span>
              <span className="font-black font-heading text-base text-hope-teal">
                ₹ {campaign.raised.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Target: ₹ {campaign.goal.toLocaleString()}</span>
              <span className="font-bold text-hope-orange text-xs">
                {percentage}% reached
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to={`/campaigns/${campaign.slug}`}
              className="w-full text-center py-2.5 px-3 rounded-xl border border-teal-200 text-hope-teal hover:bg-hope-light-teal font-extrabold text-xs transition"
            >
              View Details
            </Link>
            <button
              onClick={() => onQuickDonate ? onQuickDonate(campaign) : null}
              className="w-full py-2.5 px-3 rounded-xl bg-hope-orange hover:bg-hope-orange-hover text-white font-extrabold text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5 transform active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
