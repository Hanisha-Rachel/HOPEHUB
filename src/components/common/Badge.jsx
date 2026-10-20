import React from 'react';
import { ShieldCheck, Flame, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Badge({ type = 'verified', text = '', className = '' }) {
  if (type === 'verified') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-hope-teal border border-teal-200 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-hope-teal" />
        {text || 'Verified NGO'}
      </span>
    );
  }

  if (type === 'critical' || type === 'urgent') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-hope-coral border border-rose-200 animate-pulse ${className}`}>
        <Flame className="w-3.5 h-3.5 text-hope-coral" />
        {text || 'Urgent Need'}
      </span>
    );
  }

  if (type === 'demo') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 ${className}`}>
        <AlertCircle className="w-3 h-3 text-amber-600" />
        {text || 'Demonstration Mode'}
      </span>
    );
  }

  if (type === 'success') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        {text || 'Completed'}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 ${className}`}>
      {text}
    </span>
  );
}
