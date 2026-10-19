'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container, Button } from '@/components/common';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('aditya.birla@example.com');
  const [password, setPassword] = useState('••••••••');
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
            <div className="w-12 h-12 rounded-2xl bg-spice-sand/50 text-spice-terracotta flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
              WELCOME BACK
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-spice-espresso mt-1">
              Customer Sign In
            </h1>
            <p className="text-xs sm:text-sm text-spice-taupe mt-1">
              Access your order history, saved addresses, and VIP spice rewards.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-spice-espresso block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-spice-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-spice-espresso">Password</label>
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Demo reset link sent!'); }} className="text-[11px] text-spice-terracotta hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-spice-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {loading ? 'Signing In...' : 'Sign In to Account'}
            </Button>
          </form>

          {/* Social Login Placeholders */}
          <div className="mt-6 pt-6 border-t border-spice-border space-y-3">
            <span className="text-[11px] text-spice-taupe text-center block">Or continue with demo provider</span>
            <button
              type="button"
              onClick={() => router.push('/account')}
              className="w-full py-2.5 rounded-xl border border-spice-border hover:bg-spice-sand/20 text-xs font-bold text-spice-espresso flex items-center justify-center gap-2 transition-colors"
            >
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-spice-taupe">
            Don't have an account yet?{' '}
            <Link href="/register" className="font-bold text-spice-terracotta hover:underline">
              Create One Free
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
