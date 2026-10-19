'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container, Button } from '@/components/common';
import { User, Mail, Lock, Phone, Sparkles, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: 'Aditya Birla',
    email: 'aditya.birla@example.com',
    phone: '9876543210',
    password: '••••••••',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/account');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-spice-ivory flex items-center justify-center py-16 px-4">
      <Container size="sm">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-spice-peach/40 text-spice-terracotta flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
              NEW CUSTOMER PERKS
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-spice-espresso mt-1">
              Join AAXOL
            </h1>
            <p className="text-xs sm:text-sm text-spice-taupe mt-1">
              Unlock 15% off your first order with code <strong className="text-spice-espresso font-mono">WELCOME15</strong>.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-spice-espresso block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-spice-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aditya Birla"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-spice-espresso block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-spice-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-spice-espresso block mb-1">Mobile Phone (for tracking updates)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-spice-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit number"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-spice-espresso block mb-1">Create Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-spice-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full shadow-terracotta-glow text-xs sm:text-sm font-bold mt-2"
            >
              {loading ? 'Creating Account...' : 'Create My Free Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-spice-taupe">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-spice-terracotta hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
