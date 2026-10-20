import React, { useState } from 'react';
import { Gift, Package, Truck, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { IMAGES } from '../data/mockData';

import { api } from '../api/client';

export default function ResourceDonationPage() {
  const [category, setCategory] = useState('Food Supplies');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState('New / Sealed');
  const [logistics, setLogistics] = useState('Doorstep Pickup');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const resourceCategories = [
    { title: "Food Supplies", desc: "Dry grains, lentils, packaged cooking oil, baby formula", image: IMAGES.foodRelief, color: "border-orange-200 bg-orange-50/40 text-hope-orange" },
    { title: "Warm Clothes", desc: "Thermal blankets, woolens, jackets, clean wearables", image: IMAGES.clothingDrive, color: "border-teal-200 bg-teal-50/40 text-hope-teal" },
    { title: "Books & Study Kits", desc: "Storybooks, school textbooks, notebooks, geometry kits", image: IMAGES.booksDrive, color: "border-indigo-200 bg-indigo-50/40 text-indigo-700" },
    { title: "Medical Supplies", desc: "First-aid kits, wheelchairs, nebulizers, sterile dressings", image: IMAGES.healthcare, color: "border-rose-200 bg-rose-50/40 text-hope-coral" }
  ];

  const mapCategoryToEnum = (cat) => {
    if (cat.includes('Food')) return 'FOOD';
    if (cat.includes('Clothes') || cat.includes('Warm')) return 'CLOTHES';
    if (cat.includes('Books')) return 'BOOKS';
    if (cat.includes('Medical')) return 'MEDICAL';
    return 'OTHER';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.resources.submit({
        donorName: donorName || "Kind Philanthropist",
        donorEmail: "pledge@hopehub.org",
        donorPhone: donorPhone || "+91 99999 88888",
        itemType: mapCategoryToEnum(category),
        itemDescription: `${itemName} (${condition}, Logistics: ${logistics})`,
        quantity: parseInt(quantity) || 1,
        unit: "units",
        pickupAddress: address || "Not specified",
        preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
      });
    } catch {
      // Fallback
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-hope-cream/60 pb-20">
      
      {/* Visual Header */}
      <div className="relative bg-hope-charcoal text-white py-16 sm:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={IMAGES.clothingDrive} alt="Resource relief" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-hope-charcoal via-hope-teal-dark/95 to-hope-charcoal/90" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-hope-orange bg-orange-500/20 px-4 py-1.5 rounded-full border border-orange-400/30">
            Material Philanthropy
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black">
            Donate Essential Physical Resources
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Give items directly where they are needed most. Partner NGOs coordinate doorstep pickup or community drop-off centers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        
        {/* Category Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resourceCategories.map((c, i) => (
            <div
              key={i}
              onClick={() => setCategory(c.title)}
              className={`bg-white rounded-3xl overflow-hidden border-2 cursor-pointer transition shadow-card hover:shadow-hover transform hover:-translate-y-1 ${
                category === c.title ? 'border-hope-orange ring-4 ring-orange-100 scale-102' : 'border-slate-100'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback src={c.image} alt={c.title} aspectRatio="aspect-[4/3]" />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-black text-base text-hope-charcoal">{c.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.desc}</p>
                {category === c.title && (
                  <span className="inline-block mt-2 text-[10px] font-black uppercase text-hope-orange bg-orange-50 px-2 py-0.5 rounded-full">
                    Selected Category
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Pledge Form on Light Teal Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-card border-2 border-teal-100">
          
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-xs font-bold text-hope-teal uppercase tracking-widest block">Step 2 of 2</span>
            <h2 className="text-2xl font-heading font-black text-hope-charcoal mt-0.5">
              Submit a Resource Pledge
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your resource category and logistics preference. Registered NGOs in your area will evaluate your pledge.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Resource Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-hope-charcoal focus:outline-none focus:border-hope-teal bg-white"
                  >
                    <option value="Food Supplies">Food Supplies</option>
                    <option value="Warm Clothes">Warm Clothes & Blankets</option>
                    <option value="Books & Study Kits">Books & Study Kits</option>
                    <option value="Medical Supplies">Medical Supplies & Devices</option>
                    <option value="Other Essentials">Other Essentials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Item Description & Units
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50 Fleece Blankets, 10 Rice Bags"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Condition of Items
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-hope-charcoal focus:outline-none focus:border-hope-teal bg-white"
                  >
                    <option value="New / Sealed">Brand New / Sealed</option>
                    <option value="Gently Used">Gently Used / Like New</option>
                    <option value="Clean & Usable">Clean & Fully Functional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Logistics Preference
                  </label>
                  <select
                    value={logistics}
                    onChange={(e) => setLogistics(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-hope-charcoal focus:outline-none focus:border-hope-teal bg-white"
                  >
                    <option value="Doorstep Pickup">Request Doorstep Pickup by NGO</option>
                    <option value="Drop-off at Center">I will drop off at local NGO Hub</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Pickup Address / Landmark
                </label>
                <textarea
                  rows="2"
                  required
                  placeholder="Street, City, Pin Code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-hope-teal"
                />
              </div>

              {/* Demo Notice */}
              <div className="bg-amber-50 rounded-2xl p-4 text-xs text-amber-800 border border-amber-200 flex items-center gap-2 font-medium">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Demonstration Mode: Pledges are recorded in frontend mock state.</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-hope-orange hover:bg-hope-orange-hover text-white font-black font-heading text-base shadow-lg transition"
              >
                Submit Resource Pledge
              </button>

            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-black text-2xl text-hope-charcoal">
                Resource Pledge Recorded!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{donorName || 'Generous Donor'}</strong>. Your offer to donate <strong>{itemName || category}</strong> has been logged in demonstration state.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-hope-teal text-white font-bold text-xs"
              >
                Make Another Pledge
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
