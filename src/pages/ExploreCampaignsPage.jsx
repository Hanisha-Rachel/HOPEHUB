import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Flame, Sparkles, AlertCircle, Heart, BookOpen, Apple, Stethoscope, Droplets, ShieldAlert, Package } from 'lucide-react';
import CampaignCard from '../components/common/CampaignCard';
import DonationModal from '../components/common/DonationModal';
import { CAMPAIGNS, IMAGES } from '../data/mockData';
import { api } from '../api/client';

export default function ExploreCampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const [sortBy, setSortBy] = useState('urgent');
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
        const existing = CAMPAIGNS.find(
          (item) => String(item.id) === String(campaign.id)
        ) || {};

        return {
          ...existing,
          ...campaign,
          id: campaign.id,
          raised: Number(
            campaign.raisedAmount ?? campaign.raised ?? existing.raised ?? 0
          ),
          goal: Number(
            campaign.goalAmount ?? campaign.goal ?? existing.goal ?? 1
          ),
          donorsCount: Number(
            campaign.donorCount ??
            campaign.donorsCount ??
            existing.donorsCount ??
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

  const categories = [
    { name: 'All', icon: Sparkles },
    { name: 'Education', icon: BookOpen },
    { name: 'Food Relief', icon: Apple },
    { name: 'Healthcare', icon: Stethoscope },
    { name: 'Disaster Relief', icon: ShieldAlert },
    { name: 'Clean Water', icon: Droplets },
    { name: 'Resource Relief', icon: Package }
  ];

  const filteredCampaigns = useMemo(() => {
    return campaignList
      .filter((c) => {
        const matchesSearch =
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.ngoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
        const matchesUrgency = selectedUrgency === 'All' || c.urgency === selectedUrgency;
        return matchesSearch && matchesCategory && matchesUrgency;
      })
      .sort((a, b) => {
        if (sortBy === 'urgent') return (b.urgency === 'Critical' ? 1 : 0) - (a.urgency === 'Critical' ? 1 : 0);
        if (sortBy === 'raised-high') return b.raised - a.raised;
        if (sortBy === 'raised-low') return a.raised - b.raised;
        if (sortBy === 'goal-high') return b.goal - a.goal;
        return 0;
      });
  }, [campaignList, searchTerm, selectedCategory, selectedUrgency, sortBy]);

  const handleDonationComplete = () => {
  loadCampaigns();
};

  return (
    <div className="min-h-screen bg-hope-light-teal/40 pb-20">
      
      {/* Visual Page Banner with Photo Collage */}
      <div className="relative bg-hope-charcoal text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src={IMAGES.ctaBanner}
            alt="Explore campaigns banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-hope-charcoal via-hope-teal-dark/95 to-hope-charcoal/90" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-hope-orange/20 text-hope-orange px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-hope-orange/30">
            <Sparkles className="w-4 h-4" />
            <span>100% Administrative Vetting Assured</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Explore Active Charity Campaigns
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Choose a vetted initiative, review transparent budgetary goals, and make a measurable difference in communities across India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Search & Filter Control Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border-2 border-teal-100 space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-hope-teal absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by cause, state, keyword, or NGO name..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-hope-teal text-sm font-semibold"
              />
            </div>

            {/* Urgency Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-hope-teal text-sm font-bold text-hope-charcoal bg-white"
              >
                <option value="All">All Urgency Levels</option>
                <option value="Critical">🔥 Critical Urgency</option>
                <option value="High">⚡ High Urgency</option>
                <option value="Medium">🌱 Medium Urgency</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-hope-teal text-sm font-bold text-hope-charcoal bg-white"
              >
                <option value="urgent">Sort: Highest Urgency</option>
                <option value="raised-high">Sort: Most Funded First</option>
                <option value="raised-low">Sort: Needs Most Help</option>
                <option value="goal-high">Sort: Highest Target</option>
              </select>
            </div>

          </div>

          {/* Category Chips with Icons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Sector:
            </span>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-hope-teal text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-hope-teal'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mt-8 mb-6 text-sm text-slate-600 font-bold">
          <span>
            Showing <strong className="text-hope-teal text-base">{filteredCampaigns.length}</strong> active initiatives
          </span>
          {(searchTerm || selectedCategory !== 'All' || selectedUrgency !== 'All') && (
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedUrgency('All'); }}
              className="text-xs font-bold text-hope-orange hover:underline bg-white px-3 py-1 rounded-lg border border-orange-200"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Campaign Cards Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onQuickDonate={(c) => setSelectedCampaignForDonation(c)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-16 text-center border-2 border-slate-200 shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-hope-orange flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-black text-xl text-hope-charcoal">
              No matching campaigns found
            </h3>
            <p className="text-sm text-slate-500">
              Try adjusting your search criteria, selecting a different sector, or clearing the active filters.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedUrgency('All'); }}
              className="px-6 py-2.5 rounded-xl bg-hope-teal text-white font-bold text-xs"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      {/* Donation Modal */}
      <DonationModal
        campaign={selectedCampaignForDonation}
        isOpen={!!selectedCampaignForDonation}
        onClose={() => setSelectedCampaignForDonation(null)}
        onDonationComplete={handleDonationComplete}
      />

    </div>
  );
}
