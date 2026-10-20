import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Building2, CheckCircle2, XCircle, AlertTriangle, TrendingUp, FileCheck2, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { api } from '../../api/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pendingNgos, setPendingNgos] = useState([
    { id: 1, name: 'Sahayata Relief Trust', regNo: 'NGO/UP/2021/048123', contact: 'contact@sahayata.org', category: 'Emergency Relief', status: 'Pending Review' },
    { id: 2, name: 'Shiksha Jyoti Mission', regNo: 'NGO/MP/2020/099182', contact: 'info@shikshajyoti.org', category: 'Education', status: 'Pending Review' }
  ]);

  const [pendingCampaigns, setPendingCampaigns] = useState([
    { id: 101, title: 'Clean Drinking Water Plant for Bundelkhand', ngo: 'EcoHope Earth Initiative', goal: 400000, status: 'Pending Review' },
    { id: 102, title: 'Slum Children Winter Jacket Drive', ngo: 'Samarpan Seva Samiti', goal: 250000, status: 'Pending Review' }
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    { id: 'REQ-4401', beneficiary: 'Sunita Devi', need: 'Pediatric Cardiac Surgery Assistance', amount: 45000, urgency: 'Critical', status: 'Under Review' },
    { id: 'REQ-4402', beneficiary: 'Mohan Lal', need: 'Vocational Sewing Machine Kit', amount: 8000, urgency: 'Medium', status: 'Under Review' }
  ]);

  useEffect(() => {
    api.admin.getStats()
      .then(res => {
        if (res?.data) {
          setStats(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const chartData = [
    { category: 'Education', amount: 38.5 },
    { category: 'Food Relief', amount: 31.5 },
    { category: 'Healthcare', amount: 52.0 },
    { category: 'Disaster', amount: 49.0 },
    { category: 'Clean Water', amount: 28.0 }
  ];

  const handleNgoAction = async (id, newStatus) => {
    setPendingNgos(prev => prev.map(n => n.id === id ? { ...n, status: newStatus } : n));
    try {
      const statusEnum = newStatus.includes('Approve') ? 'VERIFIED' : 'REJECTED';
      await api.admin.verifyNgo(id, statusEnum);
    } catch {}
  };

  const handleCampaignAction = async (id, newStatus) => {
    setPendingCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    try {
      const statusEnum = newStatus.includes('Approve') ? 'ACTIVE' : 'CANCELLED';
      await api.admin.updateCampaignStatus(id, statusEnum);
    } catch {}
  };

  const handleRequestAction = async (id, newStatus) => {
    setPendingRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    try {
      const numericId = id.toString().replace(/\D/g, '') || '1';
      const statusEnum = newStatus.includes('Approve') ? 'APPROVED' : 'REJECTED';
      await api.admin.updateRequestStatus(numericId, statusEnum, 'Reviewed by administrator');
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-hope-charcoal via-slate-900 to-hope-teal-dark rounded-3xl p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-hope-orange bg-white/10 px-3 py-1 rounded-full">
                Platform Custodian & Oversight
              </span>
              <span className="text-xs font-bold text-teal-200">System Admin Privilege</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black mt-1">
              HOPEHUB Governance Command
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Two-Tier NGO verification queue, campaign moderation, and audit ledgers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30">
              System Health: Optimal (ACID Enforced)
            </span>
          </div>
        </div>

        {/* Executive KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <Users className="w-7 h-7 text-hope-teal mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">
              {stats?.totalUsers ? stats.totalUsers.toLocaleString() : '3,594'}
            </div>
            <span className="text-xs text-slate-500 font-medium">Registered Platform Users</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <Building2 className="w-7 h-7 text-amber-500 mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">
              {stats?.pendingNgos !== undefined ? stats.pendingNgos : pendingNgos.filter(n => n.status === 'Pending Review').length}
            </div>
            <span className="text-xs text-slate-500 font-medium">NGOs Awaiting Vetting</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <FileCheck2 className="w-7 h-7 text-hope-orange mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">
              {stats?.pendingCampaigns !== undefined ? stats.pendingCampaigns : pendingCampaigns.filter(c => c.status === 'Pending Review').length}
            </div>
            <span className="text-xs text-slate-500 font-medium">Campaigns in Moderation</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <TrendingUp className="w-7 h-7 text-hope-coral mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">
              {stats?.totalFundsRaised ? `₹ ${(stats.totalFundsRaised / 100000).toFixed(1)} Lakhs` : '₹ 4.82 Cr'}
            </div>
            <span className="text-xs text-slate-500 font-medium">Demonstrated Total Volume</span>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-heading font-black text-hope-charcoal flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-hope-teal" />
                <span>Sector Distribution Analytics (Lakhs INR)</span>
              </h2>
              <p className="text-xs text-slate-400">Total verified fund allocations grouped by social cause sector</p>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip
                  formatter={(val) => [`₹ ${val} Lakhs`, 'Funds Mobilized']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                />
                <Bar dataKey="amount" fill="#0F766E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Queue 1: NGO Verification Queue */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-heading font-black text-hope-charcoal">
                Pending NGO Verification Queue
              </h2>
              <p className="text-xs text-slate-400">Review official registration proofs prior to enabling campaign publishing</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Organization</th>
                  <th className="py-3 px-4">Govt Reg Number</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingNgos.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-hope-charcoal">{n.name}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{n.regNo}</td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-hope-teal">{n.category}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        n.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        n.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {n.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      {n.status === 'Pending Review' ? (
                        <>
                          <button
                            onClick={() => handleNgoAction(n.id, 'Verified')}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleNgoAction(n.id, 'Rejected')}
                            className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 font-bold">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Queue 2: Campaign Moderation Queue */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-heading font-black text-hope-charcoal">
                Campaign Publication Approval Queue
              </h2>
              <p className="text-xs text-slate-400">Validate fundraising goals and timelines before public listing</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Campaign Title</th>
                  <th className="py-3 px-4">Host NGO</th>
                  <th className="py-3 px-4">Financial Goal</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-hope-charcoal">{c.title}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{c.ngo}</td>
                    <td className="py-3.5 px-4 font-bold text-hope-teal">₹{c.goal.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        c.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        c.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      {c.status === 'Pending Review' ? (
                        <>
                          <button
                            onClick={() => handleCampaignAction(c.id, 'Approved')}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleCampaignAction(c.id, 'Rejected')}
                            className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 font-bold">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Queue 3: Confidential Beneficiary Assistance Requests */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-heading font-black text-hope-charcoal">
                Confidential Beneficiary Assistance Intake Review
              </h2>
              <p className="text-xs text-slate-400">Strictly confidential administrative triage for humanitarian assistance</p>
            </div>
          </div>

          <div className="space-y-4">
            {pendingRequests.map((r) => (
              <div key={r.id} className="p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-hope-teal bg-teal-50 px-2 py-0.5 rounded">{r.id}</span>
                    <span className="text-xs font-bold text-hope-coral">{r.urgency} Urgency</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-hope-charcoal">{r.need}</h4>
                  <span className="text-xs text-slate-500">Beneficiary: <strong>{r.beneficiary}</strong> • Requested Aid: <strong>₹{r.amount.toLocaleString()}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  {r.status === 'Under Review' ? (
                    <>
                      <button
                        onClick={() => handleRequestAction(r.id, 'Approved for Aid')}
                        className="px-4 py-2 rounded-xl bg-hope-teal hover:bg-hope-teal-dark text-white font-bold text-xs transition"
                      >
                        Approve Aid
                      </button>
                      <button
                        onClick={() => handleRequestAction(r.id, 'Declined')}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition"
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {r.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
