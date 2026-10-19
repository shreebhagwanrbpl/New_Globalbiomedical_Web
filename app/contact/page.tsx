'use client';

import React, { useState } from 'react';
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
  Gift,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Enquiry',
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>SPICE CONCIERGE &amp; CARE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-3">
              We'd Love to Hear From You
            </h1>
            <p className="text-sm sm:text-base text-spice-taupe leading-relaxed">
              Have questions regarding spice origin, bulk wedding favours, international shipping rates, or culinary advice? Our culinary concierge team is at your service.
            </p>
          </div>
        </Container>
      </section>

      <Container size="2xl" className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* =========================================================================
              LEFT COLUMN: CONTACT INFO & CHANNELS
          ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-8 shadow-warm-xs space-y-6">
              <h3 className="font-serif font-bold text-xl text-spice-espresso pb-3 border-b border-spice-border">
                Direct Contact Channels
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-spice-cardamom-50 text-spice-cardamom flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">Customer Support &amp; Concierge</span>
                    <a href="tel:+918008334277" className="font-serif font-bold text-sm text-spice-espresso hover:text-spice-terracotta">
                      +91 (800) 833-4277 (Toll Free)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-spice-terracotta/10 text-spice-terracotta flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">Email Concierge</span>
                    <a href="mailto:care@aaxol.com" className="font-serif font-bold text-sm text-spice-espresso hover:text-spice-terracotta">
                      care@aaxol.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">Instant WhatsApp Support</span>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="font-serif font-bold text-sm text-emerald-800 hover:underline">
                      Chat on WhatsApp (+91 98765 43210)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-spice-sand/50 text-spice-espresso flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">Business Hours</span>
                    <span className="text-xs text-spice-espresso font-semibold">
                      Monday to Saturday • 9:00 AM to 7:00 PM IST
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-spice-sand/50 text-spice-espresso flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-spice-taupe uppercase block">Heritage Processing Unit</span>
                    <span className="text-xs text-spice-taupe leading-relaxed block">
                      AAXOL Mills &amp; Caddies, Plot 42, Sitapura Industrial Heritage Zone, Jaipur, Rajasthan 302022
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate / Wedding Gifting Banner */}
            <div className="bg-spice-espresso text-white rounded-3xl p-6 shadow-warm-md">
              <div className="flex items-center gap-2 text-spice-sand text-xs font-bold uppercase tracking-wider mb-2">
                <Gift className="w-4 h-4" />
                <span>Bulk &amp; Corporate Gifting</span>
              </div>
              <h4 className="font-serif font-bold text-base text-white mb-2">
                Custom Engraved Wooden Boxes
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                We curate custom bespoke spice gift boxes for luxury weddings, corporate celebrations, and festive hampers.
              </p>
              <a href="mailto:gifting@aaxol.com" className="text-xs font-bold text-spice-sand underline">
                Contact Corporate Gifting Desk →
              </a>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: INTERACTIVE CONTACT FORM
          ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-spice-cardamom-50 text-spice-cardamom flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-spice-espresso">
                    Message Received Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-spice-taupe max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our spice concierge team will review your message and respond to <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'Order Enquiry', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif font-bold text-xl text-spice-espresso mb-4">
                    Send a Message to Our Concierge
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-spice-espresso block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Meera Rajput"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-spice-espresso block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-spice-espresso block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-spice-espresso block mb-1">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta bg-white"
                      >
                        <option value="Order Enquiry">Order Status &amp; Tracking</option>
                        <option value="Product Advice">Spice Recommendations</option>
                        <option value="Bulk Order">Bulk &amp; Wedding Hampers</option>
                        <option value="International Shipping">International Shipping Query</option>
                        <option value="Feedback">Feedback / Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-spice-espresso block mb-1">How can we assist you? *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details about your query..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full shadow-terracotta-glow text-xs sm:text-sm font-bold"
                  >
                    <Send className="w-4 h-4 mr-2" /> Send Message to AAXOL Organium Concierge
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
