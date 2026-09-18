'use client';

import React, { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import { Check, X, ShieldCheck, Clock, AlertCircle, Building2, CheckCircle2 } from 'lucide-react';

export default function AdminWholesaleApplicationsPage() {
  const { wholesaleApplications, updateApplicationStatus } = useRole();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const filteredApps = wholesaleApplications.filter((app) => {
    if (filter === 'pending') return app.status === 'pending';
    if (filter === 'approved') return app.status === 'approved';
    if (filter === 'rejected') return app.status === 'rejected';
    return true;
  });

  const handleApprove = (id: string, name: string) => {
    updateApplicationStatus(id, 'approved');
    setActionSuccess(`Application for "${name}" has been APPROVED. B2B Tier Pricing unlocked for client.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleReject = (id: string, name: string) => {
    updateApplicationStatus(id, 'rejected');
    setActionSuccess(`Application for "${name}" has been REJECTED.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-300">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C4A35A]">B2B Partner Verification</span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">
            Wholesale Applications ({wholesaleApplications.length})
          </h1>
        </div>

        <div className="flex space-x-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                filter === st ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {st} ({wholesaleApplications.filter((a) => st === 'all' || a.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-900 text-white font-serif uppercase tracking-wider">
              <th className="p-3">Application ID</th>
              <th className="p-3">Business Name</th>
              <th className="p-3">Contact Person</th>
              <th className="p-3">GSTIN Number</th>
              <th className="p-3">Location</th>
              <th className="p-3">Expected Vol</th>
              <th className="p-3">Applied Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Approval Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-neutral-500 font-semibold">
                  No applications found in &quot;{filter}&quot; state.
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="p-3 font-mono font-bold text-neutral-800">{app.id}</td>
                  <td className="p-3 font-bold text-neutral-900">
                    {app.businessName}
                    <span className="block text-[10px] text-neutral-500 font-normal">{app.businessType}</span>
                  </td>
                  <td className="p-3 text-neutral-700">
                    {app.contactPerson}
                    <span className="block text-[10px] text-neutral-400">{app.email} • {app.phone}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-[#C4A35A]">{app.gstNumber}</td>
                  <td className="p-3 text-neutral-600">{app.city}, {app.state}</td>
                  <td className="p-3 text-neutral-700">{app.expectedOrderQty}</td>
                  <td className="p-3 text-neutral-500">{app.appliedDate}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                        app.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : app.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {app.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(app.id, app.businessName)}
                          className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-[10px] uppercase hover:bg-emerald-700 transition-colors shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app.id, app.businessName)}
                          className="px-3 py-1.5 bg-rose-600 text-white font-bold text-[10px] uppercase hover:bg-rose-700 transition-colors shadow-sm"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-end space-x-1">
                        {app.status === 'approved' && (
                          <button
                            onClick={() => handleReject(app.id, app.businessName)}
                            className="text-[10px] text-neutral-500 hover:text-rose-600 underline font-semibold"
                          >
                            Revoke Approval
                          </button>
                        )}
                        {app.status === 'rejected' && (
                          <button
                            onClick={() => handleApprove(app.id, app.businessName)}
                            className="text-[10px] text-emerald-700 hover:underline font-semibold"
                          >
                            Re-Approve
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
