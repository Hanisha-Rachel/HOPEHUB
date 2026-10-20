import React from 'react';
import { Link } from 'react-router-dom';
import { HandHeart, Clock, CheckCircle2, Calendar, MapPin, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { VOLUNTEER_OPPORTUNITIES } from '../../data/mockData';

export default function VolunteerDashboard() {
  const { currentUser } = useAuth();

  const applications = [
    {
      id: 'APP-101',
      title: 'Weekend Reading Mentor for Primary Kids',
      ngo: 'Pratham Shiksha Foundation',
      date: 'Every Saturday',
      status: 'Accepted',
      hours: 18
    },
    {
      id: 'APP-102',
      title: 'Community Kitchen Food Prep & Packing Assistant',
      ngo: 'Annapurna Food Seva Trust',
      date: 'Mon-Wed Mornings',
      status: 'Completed',
      hours: 24
    },
    {
      id: 'APP-103',
      title: 'Healthcare Camp Registration Coordinator',
      ngo: 'Rural Health Relief Network',
      date: 'Oct 25, 2026',
      status: 'Under Review',
      hours: 0
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-hope-coral to-rose-600 rounded-3xl p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80"}
              alt="Volunteer"
              className="w-16 h-16 rounded-2xl border-2 border-white object-cover"
            />
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-white/90 bg-white/20 px-3 py-1 rounded-full">
                Volunteer Service Hub
              </span>
              <h1 className="text-2xl sm:text-3xl font-heading font-black mt-1">
                Welcome, {currentUser?.name || 'Rohan Varma'}
              </h1>
              <p className="text-xs text-rose-100 mt-0.5">
                Your hands-on time and skills create direct smiles on the ground.
              </p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-right">
            <span className="text-xs text-rose-100 block">Verified Service Hours</span>
            <span className="text-3xl font-heading font-black text-white">42 Hours</span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <Award className="w-8 h-8 text-hope-orange mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">3 Drives</div>
            <span className="text-xs text-slate-500 font-medium">Completed Community Drives</span>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">Active</div>
            <span className="text-xs text-slate-500 font-medium">Saturday Reading Mentor (Accepted)</span>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
            <HandHeart className="w-8 h-8 text-hope-teal mb-2" />
            <div className="text-2xl font-heading font-black text-hope-charcoal">Level 2 Hero</div>
            <span className="text-xs text-slate-500 font-medium">Community Volunteer Tier</span>
          </div>
        </div>

        {/* Application History Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-xl font-heading font-black text-hope-charcoal">
              Your Volunteer Application Records
            </h2>
            <Link to="/volunteer" className="text-xs font-bold text-hope-coral hover:underline flex items-center gap-1">
              <span>Find More Drives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Drive ID</th>
                  <th className="py-3 px-4">Opportunity</th>
                  <th className="py-3 px-4">NGO Host</th>
                  <th className="py-3 px-4">Schedule</th>
                  <th className="py-3 px-4">Hours Logged</th>
                  <th className="py-3 px-4 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-hope-coral">{a.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-hope-charcoal">{a.title}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{a.ngo}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{a.date}</td>
                    <td className="py-3.5 px-4 font-bold text-hope-charcoal">{a.hours} hrs</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        a.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        a.status === 'Completed' ? 'bg-teal-50 text-hope-teal border border-teal-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {a.status}
                      </span>
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
