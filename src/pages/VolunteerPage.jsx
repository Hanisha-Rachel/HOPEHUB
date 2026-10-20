import React, { useState, useEffect } from 'react';
import { HandHeart, MapPin, Calendar, Users, CheckCircle2, Search, X, Sparkles, AlertCircle } from 'lucide-react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { VOLUNTEER_OPPORTUNITIES, IMAGES } from '../data/mockData';
import { api } from '../api/client';

export default function VolunteerPage() {
  const [opportunities, setOpportunities] = useState(VOLUNTEER_OPPORTUNITIES);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Application modal state
  const [fullName, setFullName] = useState('Rohan Varma');
  const [email, setEmail] = useState('volunteer@hopehub.org');
  const [phone, setPhone] = useState('+91 97234 56789');
  const [statement, setStatement] = useState('I am eager to contribute my time and basic first-aid/teaching skills to support this community drive.');
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.volunteers.getOpportunities()
      .then(res => {
        if (res?.data && res.data.length > 0) {
          const formatted = res.data.map(o => ({
            id: o.id,
            title: o.title,
            ngoName: o.ngoName,
            category: o.category,
            image: IMAGES.volunteering,
            location: o.location,
            date: o.startDate,
            skills: o.requiredSkills ? o.requiredSkills.split(',') : ["Teamwork"],
            capacity: o.openSlots,
            applied: o.filledSlots,
            description: o.description
          }));
          setOpportunities(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const categories = ['All', 'Education', 'Hunger Relief', 'Healthcare', 'Environment'];

  const filteredOpps = opportunities.filter((o) => {
    const matchesSearch =
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.ngoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || o.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (selectedOpp) {
        await api.volunteers.apply(selectedOpp.id, statement);
      }
    } catch {}
    finally {
      setSubmitting(false);
      setAppliedSuccess(true);
      setOpportunities((prev) =>
        prev.map((o) => (o.id === selectedOpp.id ? { ...o, applied: Math.min(o.capacity, o.applied + 1) } : o))
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedOpp(null);
    setAppliedSuccess(false);
  };

  return (
    <div className="min-h-screen bg-hope-light-teal/30 pb-20">
      
      {/* Visual Banner */}
      <div className="relative bg-hope-charcoal text-white py-16 sm:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={IMAGES.volunteering} alt="Volunteering" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-hope-charcoal via-hope-teal-dark/95 to-hope-charcoal/90" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-hope-coral bg-rose-500/20 px-4 py-1.5 rounded-full border border-rose-400/30">
            Hands-On Community Impact
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black">
            Volunteer Your Time & Skills
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Connect directly with verified NGO field programs. Teach children, pack meals, coordinate healthcare camps, and restore urban ecosystems.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        
        {/* Search & Filter Bar on Card */}
        <div className="bg-white rounded-3xl p-6 shadow-card border-2 border-teal-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-hope-teal absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, skill, or location..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-hope-teal text-sm font-semibold"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-hope-teal text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-hope-teal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities Grid with Prominent Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {filteredOpps.map((opp) => {
            const slotsLeft = opp.capacity - opp.applied;
            return (
              <div
                key={opp.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-slate-100 shadow-card hover:shadow-hover transition group flex flex-col justify-between hover:border-hope-coral"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={opp.image}
                      alt={opp.title}
                      aspectRatio="aspect-[16/10]"
                      tag={opp.category}
                      tagColor="bg-hope-teal text-white"
                    />
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black text-hope-charcoal shadow-md border border-slate-200">
                      {slotsLeft > 0 ? `${slotsLeft} Open Slots` : 'Capacity Full'}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <span className="text-xs font-black text-hope-orange uppercase tracking-wider block">
                      {opp.ngoName}
                    </span>
                    <h3 className="font-heading font-black text-xl text-hope-charcoal group-hover:text-hope-coral transition leading-snug">
                      {opp.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {opp.description}
                    </p>

                    <div className="space-y-2 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-hope-orange shrink-0" />
                        <span>{opp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-hope-teal shrink-0" />
                        <span>{opp.date}</span>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {opp.skills.map((skill, idx) => (
                        <span key={idx} className="bg-teal-50 text-hope-teal border border-teal-200 px-3 py-1 rounded-lg text-xs font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedOpp(opp)}
                    disabled={slotsLeft <= 0}
                    className={`w-full py-3.5 rounded-2xl font-black text-sm transition flex items-center justify-center gap-2 ${
                      slotsLeft > 0
                        ? 'bg-hope-coral hover:bg-rose-600 text-white shadow-md hover:shadow-lg'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <HandHeart className="w-4 h-4" />
                    <span>{slotsLeft > 0 ? 'Apply to Participate' : 'Positions Filled'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Application Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hope-charcoal/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-teal-100">
            <div className="bg-gradient-to-r from-hope-teal to-hope-teal-dark p-6 text-white relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs uppercase font-extrabold text-hope-orange tracking-wider">
                Volunteer Drive Application
              </span>
              <h3 className="font-heading font-black text-xl mt-1 line-clamp-1">
                {selectedOpp.title}
              </h3>
              <p className="text-xs text-teal-100 mt-0.5">{selectedOpp.ngoName}</p>
            </div>

            <div className="p-6 space-y-4">
              {!appliedSuccess ? (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-hope-teal"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-hope-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-hope-teal"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Statement of Interest</label>
                    <textarea
                      rows="3"
                      required
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-hope-teal"
                    />
                  </div>

                  <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-800 border border-amber-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Demonstration mode: Your application will instantly be registered in your Volunteer Dashboard.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-hope-coral hover:bg-rose-600 text-white font-black text-sm shadow-md transition"
                  >
                    Submit Application
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-heading font-black text-2xl text-hope-charcoal">
                    Application Recorded!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Your interest has been submitted to <strong>{selectedOpp.ngoName}</strong>. You can monitor the review status inside your Volunteer Dashboard.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 rounded-xl bg-hope-teal text-white font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
