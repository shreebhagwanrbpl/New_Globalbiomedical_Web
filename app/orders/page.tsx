import React from 'react';
import { Section } from '@/components/common';

export default function OrdersPage() {
  return (
    <Section title="Diagnostic Orders & Tracking" subtitle="View details of your laboratory instruments, reagents, and Rajasthan field engineer dispatches." variant="ivory">
      <div className="text-center py-12 text-spice-taupe text-sm">
        Clinical equipment consignment listing with live dispatch statuses.
      </div>
    </Section>
  );
}
