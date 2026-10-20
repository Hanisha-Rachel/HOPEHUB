import React, { useEffect, useState } from 'react';
import {
  Heart,
  TrendingUp,
  Download,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { IMAGES } from '../../data/mockData';
import ProgressBar from '../../components/common/ProgressBar';
import { api } from '../../api/client';

export default function DonorDashboard() {
  const { currentUser } = useAuth();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch actual donation history from the backend
  useEffect(() => {
    let isMounted = true;

    const fetchDonations = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.donations.getMyDonations();

        // Backend ApiResponse format: { success, message, data }
        const records = Array.isArray(response?.data)
          ? response.data
          : [];

        if (isMounted) {
          const formattedDonations = records.map((donation) => ({
            id:
              donation.transactionReference ||
              donation.receiptNumber ||
              `DON-${donation.id}`,

            campaign:
              donation.campaignTitle || 'Charity Campaign',

            ngo:
              donation.ngoName || 'NGO',

            amount: Number(donation.amount) || 0,

            date: donation.createdAt
              ? new Date(donation.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })
              : 'Date unavailable',

            status: donation.status || 'UNKNOWN',

            image:
              donation.campaignImageUrl ||
              donation.imageUrl ||
              null,

            receiptNumber: donation.receiptNumber || null
          }));

          setDonations(formattedDonations);
        }
      } catch (err) {
        console.error('Failed to load donation history:', err);

        if (isMounted) {
          setError(
            err.status === 401 || err.status === 403
              ? 'Please log in again to view your donation history.'
              : 'Unable to load your donation history. Please try again.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDonations();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalDonated = donations.reduce((sum, donation) => {
    // Only count successful donations in the lifetime total
    if (donation.status === 'SUCCESSFUL') {
      return sum + donation.amount;
    }

    return sum;
  }, 0);

  const completedDonations = donations.filter(
    (donation) => donation.status === 'SUCCESSFUL'
  );

  const handlePrintReceipt = async (donation) => {
    if (!donation.receiptNumber) {
      alert('A receipt number is not available for this donation.');
      return;
    }

    try {
      const response = await api.donations.getReceipt(
        donation.receiptNumber
      );

      if (!response?.data) {
        alert('Receipt details could not be retrieved.');
        return;
      }

      const receipt = response.data;

      const receiptWindow = window.open('', '_blank');

      if (!receiptWindow) {
        alert('Please allow pop-ups to view your receipt.');
        return;
      }

      const escapeHtml = (value) =>
        String(value ?? '').replace(/[&<>"']/g, (character) => {
          const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
          };

          return entities[character];
        });

      receiptWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>HOPEHUB Donation Receipt</title>
            <meta charset="UTF-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                max-width: 700px;
                margin: 40px auto;
                padding: 24px;
                color: #173b3b;
              }
              h1 { color: #087f75; }
              .disclaimer {
                margin-top: 24px;
                padding: 12px;
                background: #fff7e6;
                border: 1px solid #f3d28b;
              }
              .row {
                padding: 12px 0;
                border-bottom: 1px solid #ddd;
              }
              .label { color: #666; }
              .value { font-weight: bold; }
              button {
                margin-top: 24px;
                padding: 12px 20px;
                cursor: pointer;
              }
              @media print {
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <h1>HOPEHUB</h1>
            <h2>Simulated Donation Receipt</h2>

            <div class="row">
              <span class="label">Receipt Number:</span>
              <span class="value">${escapeHtml(receipt.receiptNumber)}</span>
            </div>

            <div class="row">
              <span class="label">Transaction Reference:</span>
              <span class="value">${escapeHtml(receipt.transactionReference)}</span>
            </div>

            <div class="row">
              <span class="label">Campaign:</span>
              <span class="value">${escapeHtml(receipt.campaignTitle)}</span>
            </div>

            <div class="row">
              <span class="label">Amount:</span>
              <span class="value">
                ₹${escapeHtml(Number(receipt.amount || 0).toLocaleString('en-IN'))}
              </span>
            </div>

            <div class="row">
              <span class="label">Date:</span>
              <span class="value">
                ${escapeHtml(
                  receipt.createdAt
                    ? new Date(receipt.createdAt).toLocaleDateString('en-IN')
                    : 'Unavailable'
                )}
              </span>
            </div>

            <div class="row">
              <span class="label">Status:</span>
              <span class="value">${escapeHtml(receipt.status)}</span>
            </div>

            <div class="disclaimer">
              DEMO MODE — No real money has been transferred.
              This is an academic demonstration receipt, not an official
              tax-deductible receipt or 80G certificate.
            </div>

            <button onclick="window.print()">Print / Save as PDF</button>
          </body>
        </html>
      `);

      receiptWindow.document.close();
    } catch (err) {
      console.error('Failed to retrieve receipt:', err);
      alert('Unable to retrieve the receipt. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-hope-light-teal/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-hope-teal to-hope-teal-dark rounded-3xl p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 border-2 border-teal-600">
          <div className="flex items-center gap-4">
            <img
              src={
                currentUser?.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
              }
              alt="Avatar"
              className="w-16 h-16 rounded-2xl border-2 border-white object-cover shadow-sm"
            />

            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-hope-orange bg-white/10 px-3 py-1 rounded-full">
                Donor Impact Portal
              </span>

              <h1 className="text-2xl sm:text-3xl font-heading font-black mt-1">
                Welcome, {currentUser?.name || 'Donor'}!
              </h1>

              <p className="text-xs text-teal-100 mt-0.5">
                Thank you for supporting verified charitable causes.
              </p>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-right">
            <span className="text-xs text-teal-200 block font-bold">
              Total Lifetime Impact
            </span>

            <span className="text-2xl sm:text-3xl font-heading font-black text-white">
              ₹ {totalDonated.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-6 border-2 border-rose-100 shadow-card bg-gradient-to-br from-white to-rose-50/40">
            <Heart className="w-8 h-8 text-hope-coral mb-2" />

            <div className="text-2xl font-heading font-black text-hope-charcoal">
              {loading ? '…' : completedDonations.length}
            </div>

            <span className="text-xs text-slate-500 font-bold">
              Successful Donations
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-teal-100 shadow-card bg-gradient-to-br from-white to-teal-50/40">
            <ShieldCheck className="w-8 h-8 text-hope-teal mb-2" />

            <div className="text-2xl font-heading font-black text-hope-charcoal">
              {loading ? '…' : 'Demo Mode'}
            </div>

            <span className="text-xs text-slate-500 font-bold">
              Simulated Transactions
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-orange-100 shadow-card bg-gradient-to-br from-white to-orange-50/40">
            <TrendingUp className="w-8 h-8 text-hope-orange mb-2" />

            <div className="text-2xl font-heading font-black text-hope-charcoal">
              {loading ? '…' : donations.filter((d) => d.receiptNumber).length}
            </div>

            <span className="text-xs text-slate-500 font-bold">
              Receipts Available
            </span>
          </div>

        </div>

        {/* Donation History */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-100 shadow-card space-y-4">

          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-heading font-black text-hope-charcoal">
                Your Giving Ledger
              </h2>

              <p className="text-xs text-slate-400">
                Donation records retrieved from HOPEHUB
              </p>
            </div>
          </div>

          {loading && (
            <p className="py-8 text-center text-slate-500">
              Loading your donation history…
            </p>
          )}

          {!loading && error && (
            <div className="p-4 rounded-xl bg-amber-50 text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && donations.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              <Heart className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <p className="font-semibold">No donations found yet.</p>
              <p className="text-sm mt-1">
                Your successful donations will appear here.
              </p>
            </div>
          )}

          {!loading && !error && donations.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-hope-light-teal/60 text-hope-teal-800 text-xs uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4 rounded-l-xl">Ref ID</th>
                    <th className="py-3 px-4">Campaign</th>
                    <th className="py-3 px-4">NGO</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 rounded-r-xl text-right">Receipt</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-teal-50/30 transition">

                      <td className="py-3.5 px-4 font-mono font-bold text-xs text-hope-teal">
                        {donation.id}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-hope-charcoal">
                        <div className="flex items-center gap-3">
                          {donation.image ? (
                            <img
                              src={donation.image}
                              alt={donation.campaign}
                              className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                              <Heart className="w-5 h-5 text-hope-teal" />
                            </div>
                          )}

                          <span className="line-clamp-1">
                            {donation.campaign}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-500 font-medium">
                        {donation.ngo}
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-500">
                        {donation.date}
                      </td>

                      <td className="py-3.5 px-4 font-black text-hope-teal">
                        ₹{donation.amount.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          donation.status === 'SUCCESSFUL'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          {donation.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handlePrintReceipt(donation)}
                          disabled={!donation.receiptNumber}
                          className="p-1.5 rounded-lg border border-teal-200 hover:bg-teal-50 text-hope-teal transition inline-flex items-center gap-1 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}