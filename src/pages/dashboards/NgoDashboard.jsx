import React, { useEffect, useState } from 'react';
import { ShieldCheck, Plus, TrendingUp, Users, Heart, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CAMPAIGNS, IMAGES } from '../../data/mockData';
import ProgressBar from '../../components/common/ProgressBar';
import { api } from '../../api/client';

export default function NgoDashboard() {
  const { currentUser } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [ngoCampaigns, setNgoCampaigns] = useState([]);
  useEffect(() => {
  const loadNgoCampaigns = async () => {
    try {
      const response = await api.campaigns.getMyCampaigns();
      const campaigns = response.data || [];

      setNgoCampaigns(
        campaigns.map((c) => ({
          ...c,
          raised: Number(c.raisedAmount || 0),
          goal: Number(c.goalAmount || 0),
          donorsCount: Number(c.donorCount || 0),
          category: c.category,
        }))
      );
    } catch (error) {
      console.error('Failed to load NGO campaigns:', error);
    }
  };

  loadNgoCampaigns();
}, []);


  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Education');
  const [goal, setGoal] = useState('');
  const [days, setDays] = useState('30');
  const [description, setDescription] = useState('');

  // Volunteer applications for this NGO
  const [applicantList, setApplicantList] = useState([
    { id: 1, name: 'Rohan Varma', role: 'Weekend Reading Mentor', phone: '+91 97234 56789', skills: 'Teaching, Storytelling', status: 'Pending' },
    { id: 2, name: 'Ananya Sen', role: 'Weekend Reading Mentor', phone: '+91 98112 33445', skills: 'English, Child Psychology', status: 'Pending' },
    { id: 3, name: 'Vikram Joshi', role: 'Library Setup Volunteer', phone: '+91 99001 22334', skills: 'Logistics, Cataloging', status: 'Accepted' }
  ]);

  const handleCreateCampaign = async (e) => {
  e.preventDefault();

  try {
    const campaignData = {
      title: title.trim(),
      description: description.trim(),
      category:
  category === 'Food Relief'
    ? 'HUNGER'
    : category === 'Healthcare'
    ? 'HEALTHCARE'
    : category === 'Disaster Relief'
    ? 'DISASTER'
    : 'EDUCATION',
      goalAmount: Number(goal),
      status: 'PENDING_APPROVAL',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(
        Date.now() + Number(days) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
    };

    await api.campaigns.create(campaignData);

    const response = await api.campaigns.getMyCampaigns();
    const campaigns = response.data || [];

    setNgoCampaigns(
      campaigns.map((c) => ({
        ...c,
        raised: Number(c.raisedAmount || 0),
        goal: Number(c.goalAmount || 0),
        donorsCount: Number(c.donorCount || 0),
      }))
    );

    setShowCreateModal(false);
    setTitle('');
    setGoal('');
    setDescription('');

    alert('Campaign submitted successfully for admin review!');
  } catch (error) {
    console.error('Campaign submission failed:', error);
    alert('Campaign submission failed. Please check the browser console.');
  }
};
    

  const updateApplicantStatus = (id, newStatus) => {
    setApplicantList(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* NGO Header */}
        <div className="bg-gradient-to-r from-hope-teal to-hope-teal-dark rounded-3xl p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="NGO logo"
              className="w-16 h-16 rounded-2xl border-2 border-white object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-hope-orange bg-white/10 px-3 py-1 rounded-full">
                  Verified NGO Command Center
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-200">
                  <ShieldCheck className="w-4 h-4 text-hope-orange" />
                  Audit Cleared
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-black mt-1">
                {currentUser?.name || 'Pratham Shiksha Foundation'}
              </h1>
              <p className="text-xs text-teal-100 mt-0.5">
                Reg: NGO/DL/2018/004921 • 12A/80G Compliant
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3.5 rounded-2xl bg-hope-orange hover:bg-hope-orange-hover text-white font-extrabold text-sm shadow-md transition flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Launch New Campaign Draft</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <TrendingUp className="w-8 h-8 text-hope-teal mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">₹ 24,50,000</div>
            <span className="text-xs text-slate-500 font-medium">Total Funds Mobilized</span>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <Heart className="w-8 h-8 text-hope-orange mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">{ngoCampaigns.length}</div>
            <span className="text-xs text-slate-500 font-medium">Managed Charity Campaigns</span>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <Users className="w-8 h-8 text-hope-coral mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">{applicantList.length}</div>
            <span className="text-xs text-slate-500 font-medium">Active Volunteer Applications</span>
          </div>
        </div>

        {/* Create Campaign Modal */}
        {showCreateModal && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-hover border border-teal-200 space-y-5 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-heading font-black text-hope-charcoal">
                  Create Charity Campaign
                </h3>
                <p className="text-xs text-slate-400">Campaigns require administrative approval before going public.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-xs text-slate-400 hover:text-slate-600 font-bold">
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Sector Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-hope-charcoal focus:outline-none focus:border-hope-teal bg-white"
                  >
                    <option value="Education">Education & Literacy</option>
                    <option value="Food Relief">Food Security</option>
                    <option value="Healthcare">Healthcare & Medicine</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Fundraising Target (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 500000"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Campaign Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Classroom Tablets for Rural Primary School"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Detailed Description & Narrative</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Explain project impact, itemized budgets, and geographic scope..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-hope-teal hover:bg-hope-teal-dark text-white font-bold text-sm shadow-md transition"
              >
                Submit Draft for Admin Review
              </button>
            </form>
          </div>
        )}

        {/* My Campaigns Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
          <h2 className="text-xl font-heading font-black text-hope-charcoal border-b border-slate-100 pb-4">
            Active Campaigns & Progress
          </h2>

          <div className="space-y-4">
            {ngoCampaigns.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <span className="text-[11px] font-bold text-hope-orange uppercase tracking-wider">{c.category}</span>
                  <h4 className="font-heading font-bold text-base text-hope-charcoal">{c.title}</h4>
                  <div className="w-64 pt-1">
                    <ProgressBar current={c.raised} target={c.goal} height="h-2" showText={true} />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Raised</span>
                    <span className="text-hope-teal text-sm">₹{c.raised.toLocaleString()}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Applicants Management */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
          <h2 className="text-xl font-heading font-black text-hope-charcoal border-b border-slate-100 pb-4">
            Review Volunteer Applicants
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Applicant</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Skills</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applicantList.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-hope-charcoal">{a.name}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{a.role}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{a.phone}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{a.skills}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        a.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        a.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      {a.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateApplicantStatus(a.id, 'Accepted')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateApplicantStatus(a.id, 'Rejected')}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
