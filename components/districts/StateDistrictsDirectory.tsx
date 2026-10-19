'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DistrictLocation } from '@/data/rajasthanDistricts';
import { Search, MapPin, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StateDistrictsDirectoryProps {
  districts: DistrictLocation[];
  stateName: string;
}

export function StateDistrictsDirectory({ districts, stateName }: StateDistrictsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = districts.filter((d) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      d.name.toLowerCase().includes(q) ||
      d.pincode.includes(q) ||
      d.hindiName.includes(q) ||
      d.landmark.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search across all ${districts.length} districts in ${stateName} (e.g. name, PIN code, landmark...)`}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-slate-800"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-800">{filtered.length}</strong> of {districts.length} district hubs in {stateName}
          </span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Same-day dispatch from Jaipur Central Warehouse
          </span>
        </div>
      </div>

      {/* Grid of Districts */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
          <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No district found matching "{searchQuery}"</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching by district name or 6-digit postal PIN code.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
          >
            Clear Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((dist) => (
            <Link
              key={dist.slug}
              href={`/${dist.slug}`}
              className="group relative p-4 rounded-2xl border border-slate-200 hover:border-red-500 bg-white shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    PIN: {dist.pincode}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {dist.state || stateName}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                    {dist.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {dist.hindiName}
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {dist.landmark}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  Express Delivery
                </span>
                <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  View Hub <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
