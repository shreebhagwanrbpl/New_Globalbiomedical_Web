import React from 'react';
import { Section } from '@/components/common';

export default function OrdersPage() {
  return (
    <Section title="Order History & Tracking" subtitle="View details of your past and in-transit spice deliveries." variant="ivory">
      <div className="text-center py-12 text-spice-taupe text-sm">
        Customer orders listing with live tracking statuses.
      </div>
    </Section>
  );
}
