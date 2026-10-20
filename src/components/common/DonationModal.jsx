import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, AlertTriangle, Download, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../../api/client';

export default function DonationModal({ campaign, isOpen, onClose, onDonationComplete }) {
  if (!isOpen || !campaign) return null;

  const [amount, setAmount] = useState('1000');
  const [donorName, setDonorName] = useState('Compassionate Donor');
  const [donorEmail, setDonorEmail] = useState('donor@example.com');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [simulateOutcome, setSimulateOutcome] = useState('SUCCESS');
  const [step, setStep] = useState('INPUT'); // INPUT, PROCESSING, SUCCESS, FAILED
  const [txnDetails, setTxnDetails] = useState(null);

  const presetAmounts = ['500', '1000', '2500', '5000', '10000'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep('PROCESSING');

    if (simulateOutcome === 'FAILED') {
      setTimeout(() => setStep('FAILED'), 800);
      return;
    }

    try {
      // Connect to Spring Boot backend API
      const res = await api.donations.create({
        campaignId: campaign.id,
        donorName,
        donorEmail,
        amount: parseFloat(amount),
        paymentMethod: paymentMethod + '_SIMULATED',
        isAnonymous
      });

      if (res?.data) {
        const txn = {
          txnId: res.data.transactionReference,
          receiptNumber: res.data.receiptNumber,
          amount: res.data.amount,
          campaignTitle: res.data.campaignTitle || campaign.title,
          ngoName: campaign.ngoName,
          date: new Date(res.data.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          paymentMethod,
          isAnonymous,
          disclaimer: res.data.demoDisclaimer
        };
        setTxnDetails(txn);
        setStep('SUCCESS');
        if (onDonationComplete) {
          onDonationComplete(campaign.id, parseFloat(amount));
        }
        return;
      }
    } catch (error) {
  console.error('Donation API failed:', error);
  alert(
    'Donation could not be recorded. Please check the backend and try again.'
  );
  setStep('INPUT');
  return;
}

    // Local demonstration fallback
    setTimeout(() => {
      const txn = {
        txnId: `TXN-DEMO-${Math.floor(100000 + Math.random() * 900000)}`,
        receiptNumber: `HH-RCPT-${Math.floor(10000 + Math.random() * 90000)}`,
        amount: parseFloat(amount),
        campaignTitle: campaign.title,
        ngoName: campaign.ngoName,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        paymentMethod,
        isAnonymous,
        disclaimer: "DEMO MODE — No real money has been transferred."
      };
      setTxnDetails(txn);
      setStep('SUCCESS');
      if (onDonationComplete) {
        onDonationComplete(campaign.id, parseFloat(amount));
      }
    }, 1000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hope-charcoal/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-teal-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-hope-teal to-hope-teal-dark p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider font-extrabold bg-hope-orange px-2.5 py-0.5 rounded-full">
              Simulated Contribution
            </span>
            <span className="text-xs text-teal-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Academic Demo
            </span>
          </div>

          <h3 className="font-heading font-black text-xl line-clamp-1">
            {campaign.title}
          </h3>
          <p className="text-xs text-teal-100 mt-1">Organized by {campaign.ngoName}</p>
        </div>

        {/* Prominent Mandatory Academic Disclaimer */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-semibold">
            DEMO MODE — No real money has been transferred. This is an academic demonstration workflow.
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {step === 'INPUT' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-hope-charcoal mb-2">
                  Select Contribution Amount (INR)
                </label>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        amount === preset
                          ? 'bg-hope-teal text-white border-hope-teal shadow-sm'
                          : 'border-slate-200 text-hope-charcoal hover:bg-slate-50'
                      }`}
                    >
                      ₹{preset}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-3 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    min="10"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-hope-charcoal focus:outline-none focus:border-hope-teal"
                  />
                </div>
              </div>

              {/* Donor Contact Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-hope-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-hope-teal"
                  />
                </div>
              </div>

              {/* Simulated Payment Channel */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-hope-charcoal mb-2">
                  Simulated Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'UPI', label: 'Simulated UPI' },
                    { id: 'CARD', label: 'Simulated Card' },
                    { id: 'NETBANKING', label: 'Net Banking' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center ${
                        paymentMethod === m.id
                          ? 'border-hope-orange bg-orange-50/50 text-hope-orange'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evaluator Testing Toggle */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700 block mb-1">
                  🧪 Examiner / Test Simulation Controls:
                </span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="outcome"
                      checked={simulateOutcome === 'SUCCESS'}
                      onChange={() => setSimulateOutcome('SUCCESS')}
                      className="text-hope-teal"
                    />
                    <span>Simulate Successful Transaction</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="outcome"
                      checked={simulateOutcome === 'FAILED'}
                      onChange={() => setSimulateOutcome('FAILED')}
                      className="text-hope-coral"
                    />
                    <span className="text-rose-700">Simulate Payment Failure</span>
                  </label>
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-hope-teal"
                />
                <span>Make my donation anonymous on public leaderboards</span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-hope-orange hover:bg-hope-orange-hover text-white font-black font-heading text-base shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Simulate Donation of ₹{parseFloat(amount || 0).toLocaleString()}</span>
              </button>

            </form>
          )}

          {step === 'PROCESSING' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-hope-teal border-t-transparent animate-spin mx-auto" />
              <h4 className="font-heading font-bold text-lg text-hope-charcoal">
                Processing Simulated Transaction...
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Securing payment simulation token and generating transaction ledger entry.
              </p>
            </div>
          )}

          {step === 'SUCCESS' && txnDetails && (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Demonstration Recorded Successfully
                </span>
                <h4 className="font-heading font-black text-2xl text-hope-charcoal mt-1">
                  Thank You for Your Generosity!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your simulated pledge of ₹{txnDetails.amount.toLocaleString()} has updated the campaign balance.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Transaction ID</span>
                  <span className="font-mono font-bold text-hope-teal">{txnDetails.txnId}</span>
                </div>
                {txnDetails.receiptNumber && (
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Official Receipt No.</span>
                    <span className="font-mono font-bold text-hope-orange">{txnDetails.receiptNumber}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Campaign</span>
                  <span className="font-semibold text-slate-800 line-clamp-1">{txnDetails.campaignTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Recipient NGO</span>
                  <span className="font-semibold text-slate-800">{txnDetails.ngoName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date</span>
                  <span>{txnDetails.date}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-slate-200">
                  <span>Amount Credited</span>
                  <span className="text-hope-teal">₹{txnDetails.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="py-2.5 px-3 rounded-xl border border-teal-200 text-hope-teal hover:bg-teal-50 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-3 rounded-xl bg-hope-teal text-white hover:bg-hope-teal-dark font-bold text-xs transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {step === 'FAILED' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <h4 className="font-heading font-black text-xl text-hope-charcoal">
                Simulated Transaction Failed
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                The test simulation outcome was intentionally set to Fail. No contribution was registered and the campaign balance remains unchanged.
              </p>
              <button
                type="button"
                onClick={() => setStep('INPUT')}
                className="py-2.5 px-6 rounded-xl bg-hope-teal text-white font-bold text-xs shadow-md transition"
              >
                Try Again
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
