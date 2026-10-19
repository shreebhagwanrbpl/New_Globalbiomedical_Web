'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/common';
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Award,
  ChevronDown,
} from 'lucide-react';
import { useDistrictLocation } from '@/hooks/useDistrictLocation';
import { RAJASTHAN_DISTRICTS } from '@/data/rajasthanDistricts';

export default function ContactPage() {
  const activeLocation = useDistrictLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: activeLocation.district?.name || 'Jaipur',
    subject: 'Equipment Quotation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border py-12 sm:py-16">
        <Container size="2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold uppercase tracking-wider mb-4 border border-spice-cardamom-200">
              <Activity className="w-3.5 h-3.5 text-spice-terracotta" />
              <span>
                {activeLocation.isDistrictActive
                  ? `${activeLocation.district?.name} Healthcare Support Desk`
                  : 'Rajasthan Central Healthcare & Biomedical Desk'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-3">
              {activeLocation.isDistrictActive
                ? `Biomedical Support & Supply Desk in ${activeLocation.district?.name}`
                : 'Connect With Human Biomedical LLP'}
            </h1>
            <p className="text-sm sm:text-base text-spice-taupe leading-relaxed">
              Serving hospitals, diagnostic laboratories, blood centers, and research facilities across all 50 districts of Rajasthan. Inquire for equipment demonstrations, reagent supplies, NABL calibration, and on-site engineering services.
            </p>
          </div>
        </Container>
      </section>

      <Container size="2xl" className="mt-10">
        {/* District Switcher Notice Bar */}
        <div className="bg-white rounded-2xl border border-spice-border p-4 mb-8 shadow-warm-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-spice-terracotta-50 text-spice-terracotta flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-spice-taupe uppercase block">Viewing Service Location</span>
              <span className="text-sm font-serif font-bold text-spice-espresso">
                {activeLocation.isDistrictActive
                  ? `${activeLocation.district?.name} District Service Hub (${activeLocation.district?.hindiName})`
                  : 'Jaipur Corporate Headquarters & Central Warehouse'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-spice-taupe font-medium">Switch District:</span>
            <Link
              href="/contact"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                !activeLocation.isDistrictActive
                  ? 'bg-spice-terracotta text-white border-spice-terracotta'
                  : 'bg-spice-sand/50 text-spice-espresso border-spice-border hover:bg-spice-sand'
              }`}
            >
              Jaipur (HQ)
            </Link>
            <Link
              href="/rajasthan/nagaur"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                activeLocation.district?.slug === 'nagaur'
                  ? 'bg-spice-terracotta text-white border-spice-terracotta'
                  : 'bg-spice-sand/50 text-spice-espresso border-spice-border hover:bg-spice-sand'
              }`}
            >
              Nagaur Hub
            </Link>
            <Link
              href="/rajasthan/jodhpur"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-spice-sand/50 text-spice-espresso border border-spice-border hover:bg-spice-sand transition-colors"
            >
              Jodhpur
            </Link>
            <Link
              href="/rajasthan/kota"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-spice-sand/50 text-spice-espresso border border-spice-border hover:bg-spice-sand transition-colors"
            >
              Kota
            </Link>
            <Link
              href="/rajasthan"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-spice-terracotta hover:underline"
            >
              All 50 Districts →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* =========================================================================
              LEFT COLUMN: CONTACT INFO & CENTRAL LOCATION MAP
          ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-8 shadow-warm-xs space-y-6">
              <h3 className="font-serif font-bold text-xl text-spice-espresso pb-3 border-b border-spice-border flex items-center justify-between">
                <span>Direct Contact Channels</span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-spice-cardamom bg-spice-cardamom-50 px-2 py-0.5 rounded border border-spice-cardamom-200">
                  24/7 SUPPORT
                </span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-spice-cardamom-50 text-spice-cardamom flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">Biomedical Engineer Helpline</span>
                    <a href="tel:+919829088234" className="font-serif font-bold text-sm text-spice-espresso hover:text-spice-terracotta">
                      +91 98290 88234
                    </a>
                    <span className="text-[11px] text-spice-taupe block">Toll-Free: 1800 890 2344</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-spice-terracotta/10 text-spice-terracotta flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">Sales &amp; Institutional Tenders</span>
                    <a href="mailto:sales@humanbiomedical.in" className="font-serif font-bold text-sm text-spice-espresso hover:text-spice-terracotta">
                      sales@humanbiomedical.in
                    </a>
                    <span className="text-[11px] text-spice-taupe block">Technical: service@humanbiomedical.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">Instant WhatsApp Support</span>
                    <a
                      href={`https://wa.me/919829088234?text=${encodeURIComponent(
                        `Hello Human Biomedical LLP, I would like to inquire about diagnostic equipment for my lab in ${
                          activeLocation.isDistrictActive ? activeLocation.district?.name : 'Rajasthan'
                        }.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif font-bold text-sm text-emerald-800 hover:underline"
                    >
                      Chat with Biomedical Desk (+91 98290 88234)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-spice-sand/50 text-spice-espresso flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">Office &amp; Dispatch Hours</span>
                    <span className="text-xs text-spice-espresso font-semibold block">
                      Monday to Saturday • 9:00 AM to 7:30 PM IST
                    </span>
                    <span className="text-[11px] text-spice-cardamom font-medium">Emergency breakdown calls attended 24/7</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-spice-sand/50 text-spice-espresso flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">
                      {activeLocation.isDistrictActive
                        ? `${activeLocation.district?.name} Central Location`
                        : 'Corporate Headquarters'}
                    </span>
                    <span className="text-xs text-spice-taupe leading-relaxed block font-medium">
                      {activeLocation.displayAddress}
                    </span>
                    <span className="text-[11px] text-spice-taupe block mt-0.5">
                      Landmark: {activeLocation.landmark}
                    </span>
                  </div>
                </div>

                {/* If viewing a district, also display the permanent Jaipur HQ */}
                {activeLocation.isDistrictActive && (
                  <div className="p-3.5 rounded-2xl bg-spice-sand/30 border border-spice-border text-xs space-y-1">
                    <span className="font-bold text-spice-espresso block">Registered Corporate Head Office:</span>
                    <p className="text-spice-taupe text-[11px] leading-relaxed">
                      Human Biomedical LLP, F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Embedded Live Google Map for Location */}
            <div className="bg-white rounded-3xl border border-spice-border p-4 shadow-warm-xs overflow-hidden">
              <span className="text-xs font-bold text-spice-espresso px-2 py-1 block mb-2">
                📍 Location Map ({activeLocation.isDistrictActive ? activeLocation.district?.name : 'Jaipur HQ'})
              </span>
              <div className="w-full h-60 rounded-2xl overflow-hidden border border-spice-border relative">
                <iframe
                  title="Human Biomedical Location"
                  src={activeLocation.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Turnkey Setup Banner */}
            <div className="bg-spice-espresso text-white rounded-3xl p-6 shadow-warm-md">
              <div className="flex items-center gap-2 text-spice-sand text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-spice-turmeric" />
                <span>Turnkey Diagnostic Setup</span>
              </div>
              <h4 className="font-serif font-bold text-base text-white mb-2">
                Planning a New Pathology Lab in {activeLocation.isDistrictActive ? activeLocation.district?.name : 'Rajasthan'}?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Our biomedical engineering team provides end-to-end laboratory layout planning, power &amp; water specifications, instrumentation bundles, and NABL documentation.
              </p>
              <a
                href={`https://wa.me/919829088234?text=${encodeURIComponent(
                  `Hello, I would like to schedule a Turnkey Pathology Lab Setup consultation in ${
                    activeLocation.isDistrictActive ? activeLocation.district?.name : 'Rajasthan'
                  }.`
                )}`}
                className="text-xs font-bold text-spice-sand underline"
              >
                Schedule Turnkey Consultation on WhatsApp →
              </a>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: INTERACTIVE BIOMEDICAL INQUIRY FORM
          ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-spice-cardamom-50 text-spice-cardamom flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-spice-espresso">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-spice-taupe max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our biomedical engineering and sales team for <strong>{formData.district}</strong> will review your request and get in touch with you at <strong>{formData.phone || formData.email}</strong> within 2 business hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        district: activeLocation.district?.name || 'Jaipur',
                        subject: 'Equipment Quotation',
                        message: '',
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-xl text-spice-espresso">
                      Request Equipment Quote / Service
                    </h3>
                    <span className="text-[10px] text-spice-taupe">Direct to Jaipur HQ</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-spice-espresso block mb-1">
                        Doctor / Lab Representative Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. R. K. Choudhary"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-spice-espresso block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="doctor@pathologylab.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-spice-espresso block mb-1">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98290 XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-spice-espresso block mb-1">
                        Rajasthan District *
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta bg-white"
                      >
                        {RAJASTHAN_DISTRICTS.map((dist) => (
                          <option key={dist.slug} value={dist.name}>
                            {dist.name} ({dist.hindiName})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-spice-espresso block mb-1">Inquiry Subject *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta bg-white"
                    >
                      <option value="Equipment Quotation">Hematology / Biochemistry Analyzer Quotation</option>
                      <option value="Reagent Regular Supply">Monthly Diagnostic Reagent Supply Contract</option>
                      <option value="On-Site Engineer Installation">On-Site Calibration &amp; Installation Service</option>
                      <option value="Turnkey Lab Setup">Complete Turnkey Pathology Lab Setup</option>
                      <option value="Microscopes & Centrifuges">Microscopes, Centrifuges &amp; Consumables</option>
                      <option value="AMC / CMC Contract">Annual Maintenance Contract (AMC / CMC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-spice-espresso block mb-1">
                      Hospital / Laboratory Details &amp; Requirements *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify your required equipment (e.g. 3-Part or 5-Part Hematology), approximate daily sample test volume, hospital/lab name, and location..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full shadow-terracotta-glow text-xs sm:text-sm font-bold"
                  >
                    <Send className="w-4 h-4 mr-2" /> Send Inquiry to Human Biomedical LLP Desk
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
