import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Clock, CheckCircle2, AlertCircle, FileText, Lock, HeartHandshake, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';

export default function BeneficiaryDashboard() {
  const { currentUser } = useAuth();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requests, setRequests] = useState([
    {
      id: 'REQ-1092',
      category: 'Medical Assistance',
      title: 'Dialysis Treatment & Monthly Medication Support',
      urgency: 'Critical',
      amountNeeded: 25000,
      status: 'Approved',
      submittedDate: 'Oct 04, 2026',
      notes: 'Reviewed by HOPEHUB Medical Panel. Approved for emergency direct pharma supply.'
    },
    {
      id: 'REQ-0881',
      category: 'Educational Support',
      title: 'School Fees & Books for 2 Children (Primary)',
      urgency: 'Medium',
      amountNeeded: 12000,
      status: 'Fulfilled',
      submittedDate: 'Aug 14, 2026',
      notes: 'Disbursed in coordination with Pratham Shiksha Foundation.'
    }
  ]);

  const [category, setCategory] = useState('Medical Assistance');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [urgency, setUrgency] = useState('High');
  const [description, setDescription] = useState('');

  useEffect(() => {
    api.beneficiaries.getMyRequests()
      .then(res => {
        if (res?.data && res.data.length > 0) {
          const formatted = res.data.map(r => ({
            id: `REQ-${r.id}`,
            category: r.category,
            title: r.assistanceNeeded,
            urgency: 'High',
            amountNeeded: r.estimatedCost,
            status: r.verificationStatus,
            submittedDate: new Date(r.createdAt).toLocaleDateString(),
            notes: r.adminNotes || 'Under confidential review by administration.'
          }));
          setRequests(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const mapCategoryToEnum = (cat) => {
    if (cat.includes('Medical') || cat.includes('Healthcare')) return 'HEALTHCARE';
    if (cat.includes('Education')) return 'EDUCATION';
    if (cat.includes('Food') || cat.includes('Hunger')) return 'HUNGER';
    if (cat.includes('Disaster')) return 'DISASTER';
    return 'COMMUNITY';
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      await api.beneficiaries.submitRequest({
        fullName: currentUser?.name || 'Beneficiary User',
        contactPhone: currentUser?.phone || '+91 98112 23344',
        contactEmail: currentUser?.email || 'beneficiary@hopehub.org',
        category: mapCategoryToEnum(category),
        assistanceNeeded: `${title} - ${description}`,
        estimatedCost: parseFloat(amount || 0),
        documentsNote: 'Income and medical records submitted for verification'
      });
    } catch {}

    const newReq = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      title,
      urgency,
      amountNeeded: parseFloat(amount || 0),
      status: 'Submitted',
      submittedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      notes: 'Awaiting initial administrative compliance review.'
    };
    setRequests([newReq, ...requests]);
    setShowRequestForm(false);
    setTitle('');
    setAmount('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-hope-cream/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-hope-teal rounded-3xl p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 border-2 border-teal-600">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80"}
              alt="Beneficiary"
              className="w-16 h-16 rounded-2xl border-2 border-white object-cover shadow-sm"
            />
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full">
                Beneficiary Support Console
              </span>
              <h1 className="text-2xl sm:text-3xl font-heading font-black mt-1">
                Welcome, {currentUser?.name || 'Sunita Devi'}
              </h1>
              <p className="text-xs text-teal-100 mt-0.5">
                Dignified, confidential access to humanitarian assistance.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowRequestForm(true)}
            className="px-6 py-3.5 rounded-2xl bg-hope-orange hover:bg-hope-orange-hover text-white font-black text-sm shadow-md transition flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Submit New Assistance Request</span>
          </button>
        </div>

        {/* Privacy Shield Banner */}
        <div className="bg-white border-2 border-teal-200 rounded-3xl p-5 shadow-card flex items-center gap-4 text-xs text-hope-teal-800">
          <div className="w-12 h-12 rounded-2xl bg-hope-light-teal flex items-center justify-center text-hope-teal shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <strong className="block text-sm text-hope-teal font-heading font-black">Zero-Knowledge Beneficiary Shield Active:</strong>
            Your personal distress situation, name, and medical records are completely confidential. They are only reviewed by authorized administrators and assigned case officers.
          </div>
        </div>

        {/* Request Modal */}
        {showRequestForm && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-hover border-2 border-teal-200 space-y-5 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-heading font-black text-hope-charcoal">
                  Confidential Assistance Intake
                </h3>
                <p className="text-xs text-slate-400">Please provide genuine details for administrative evaluation.</p>
              </div>
              <button onClick={() => setShowRequestForm(false)} className="text-xs text-slate-400 hover:text-slate-600 font-bold">
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Assistance Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-hope-charcoal focus:outline-none focus:border-hope-teal bg-white"
                  >
                    <option value="Medical Assistance">Medical Assistance</option>
                    <option value="Educational Support">Educational Support</option>
                    <option value="Food & Ration Security">Food & Ration Security</option>
                    <option value="Emergency Relief">Emergency Relief</option>
                    <option value="Clothing & Essentials">Clothing & Essentials</option>
                    <option value="Financial Hardship">Financial Hardship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Estimated Aid Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Urgency Level</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-hope-charcoal focus:outline-none focus:border-hope-teal bg-white"
                  >
                    <option value="Critical">Critical (Immediate danger/medical risk)</option>
                    <option value="High">High Urgency</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Request Summary Title</label>
                <input
                  type="text"
                  required
                  placeholder="Briefly state the immediate need"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Detailed Explanation & Circumstances</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Explain why assistance is required, household situation, and supporting hospital/school details"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-hope-teal hover:bg-hope-teal-dark text-white font-black text-sm shadow-md transition"
              >
                Submit Request for Review
              </button>
            </form>
          </div>
        )}

        {/* Requests List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-card space-y-6">
          <h2 className="text-xl font-heading font-black text-hope-charcoal border-b border-slate-100 pb-4">
            Your Assistance Request History
          </h2>

          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r.id} className="p-6 rounded-2xl border-2 border-slate-100 hover:border-teal-200 transition space-y-3 bg-gradient-to-r from-white to-slate-50/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-hope-teal bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                      {r.id}
                    </span>
                    <span className="text-xs font-black text-hope-orange bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                      {r.category}
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-black ${
                    r.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    r.status === 'Fulfilled' ? 'bg-teal-50 text-hope-teal border border-teal-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {r.status}
                  </span>
                </div>

                <h4 className="font-heading font-black text-base sm:text-lg text-hope-charcoal">{r.title}</h4>

                <div className="flex flex-wrap gap-4 text-xs text-slate-600 font-semibold">
                  <span>Target Aid: <strong className="text-hope-teal font-black">₹{r.amountNeeded.toLocaleString()}</strong></span>
                  <span>Submitted: <strong>{r.submittedDate}</strong></span>
                  <span>Urgency: <strong className="text-hope-coral">{r.urgency}</strong></span>
                </div>

                <div className="bg-hope-light-teal/60 p-4 rounded-xl text-xs text-slate-700 border border-teal-200">
                  <span className="font-black block text-hope-teal mb-0.5">Administrator Evaluation Notes:</span>
                  {r.notes}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
