'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DistrictLocation } from '@/data/rajasthanDistricts';
import { MapPin, Search, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DistrictsDirectoryClientProps {
  allDistricts: DistrictLocation[];
}

export function DistrictsDirectoryClient({ allDistricts }: DistrictsDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const popularStates = [
    { id: 'all', label: `All India (${allDistricts.length})` },
    { id: 'Rajasthan', label: 'Rajasthan (50)' },
    { id: 'Uttar Pradesh', label: 'Uttar Pradesh (75)' },
    { id: 'Maharashtra', label: 'Maharashtra (36)' },
    { id: 'Bihar', label: 'Bihar (38)' },
    { id: 'Madhya Pradesh', label: 'Madhya Pradesh (55)' },
    { id: 'Gujarat', label: 'Gujarat (33)' },
    { id: 'Delhi NCR', label: 'Delhi NCR (11)' },
    { id: 'Haryana', label: 'Haryana (22)' },
    { id: 'Punjab', label: 'Punjab (23)' },
    { id: 'West Bengal', label: 'West Bengal (23)' },
    { id: 'Karnataka', label: 'Karnataka (31)' },
    { id: 'Tamil Nadu', label: 'Tamil Nadu (38)' },
    { id: 'Telangana', label: 'Telangana (33)' },
    { id: 'Andhra Pradesh', label: 'Andhra Pradesh (26)' },
    { id: 'Kerala', label: 'Kerala (14)' },
    { id: 'Odisha', label: 'Odisha (30)' },
    { id: 'Jharkhand', label: 'Jharkhand (24)' },
    { id: 'Chhattisgarh', label: 'Chhattisgarh (33)' },
    { id: 'Assam', label: 'Assam (31)' },
    { id: 'Uttarakhand', label: 'Uttarakhand (13)' },
  ];

  const filteredDistricts = allDistricts
    .filter((dist) => {
      if (selectedState !== 'all') {
        if (selectedState === 'Rajasthan' && dist.state && dist.state !== 'Rajasthan') return false;
        if (selectedState !== 'Rajasthan' && dist.state !== selectedState) return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        dist.name.toLowerCase().includes(q) ||
        dist.pincode.includes(q) ||
        (dist.state && dist.state.toLowerCase().includes(q)) ||
        dist.hindiName.includes(q)
      );
    })
    .slice(0, 80);

  return (
    <div className="space-y-6">
      {/* Search Bar & State Filter Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all 780+ districts of India (e.g. Nagaur, Patna, Lucknow, Pune, Ahmedabad, Jodhpur, Delhi...)"
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-slate-800"
          />
        </div>

        {/* State filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {popularStates.map((st) => (
            <button
              key={st.id}
              onClick={() => {
                setSelectedState(st.id);
                setSearchQuery('');
              }}
              className={cn(
                'px-3.5 py-2 rounded-xl font-bold shrink-0 transition-all text-xs',
                selectedState === st.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="flex items-center justify-between gap-4 pb-2">
        <span className="text-xs font-bold text-slate-600">
          Showing {filteredDistricts.length} District Hubs (of {allDistricts.length} Total in India)
        </span>
        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" />
          Same-Day Dispatch from Jaipur HQ
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredDistricts.map((dist) => {
          const isNagaur = dist.slug === 'nagaur';
          const isJaipur = dist.slug === 'jaipur';

          return (
            <Link
              key={dist.slug}
              href={`/${dist.slug}`}
              className={cn(
                'group relative p-4 rounded-2xl border transition-all duration-200 bg-white shadow-xs hover:shadow-md flex flex-col justify-between',
                isNagaur || isJaipur
                  ? 'border-red-500 ring-2 ring-red-100'
                  : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    PIN: {dist.pincode}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {dist.state || 'Rajasthan'}
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

              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                <span>View District Hub</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
