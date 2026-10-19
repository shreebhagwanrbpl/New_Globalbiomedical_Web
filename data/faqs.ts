export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Purity & Quality' | 'Sourcing' | 'Storage & Freshness' | 'Shipping & Orders' | 'Gifting & Returns';
}

export const staticFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Purity & Quality',
    question: 'Are your spices 100% pure and free of artificial additives or dyes?',
    answer: 'Yes, absolutely. Every spice and blended masala is 100% pure, unadulterated, and free from added colours (like Sudan red or metanil yellow), artificial flavours, preservatives, anti-caking agents, or fillers. We process in certified small-batch facilities with strict zero-contamination protocols.'
  },
  {
    id: 'faq-2',
    category: 'Sourcing',
    question: 'Where are your spices sourced from?',
    answer: 'We practice single-origin direct sourcing from native heritage micro-regions across India: Lakadong Turmeric from Jaintia Hills Meghalaya, Mathania Chillies from Jodhpur, Green Cardamom from Idukki Kerala, Tellicherry Black Pepper from Malabar Coast, Mongra Saffron from Pampore Kashmir, and Cumin from Unjha Gujarat.'
  },
  {
    id: 'faq-3',
    category: 'Storage & Freshness',
    question: 'How long do your spices stay fresh and how should they be stored?',
    answer: 'Our ground spices retain peak aroma for 12 months, and whole spices for up to 24 months. Store them in airtight glass jars or opaque tins away from direct sunlight, moisture, and high heat. Never use a wet spoon inside the spice container.'
  },
  {
    id: 'faq-4',
    category: 'Shipping & Orders',
    question: 'Do you ship pan-India and what are the delivery timelines?',
    answer: 'We deliver to over 24,000 pincodes across India. Metro orders are delivered in 2-3 business days, while non-metro and regional locations take 3-5 business days. We provide end-to-end live tracking for every dispatched parcel.'
  },
  {
    id: 'faq-5',
    category: 'Shipping & Orders',
    question: 'Do you ship internationally to the USA, UK, UAE, and Europe?',
    answer: 'Yes! We ship our vacuum-sealed, export-grade spice collections worldwide via DHL Express and FedEx International. International transit typically takes 4-7 business days depending on customs clearance.'
  },
  {
    id: 'faq-6',
    category: 'Purity & Quality',
    question: 'Are your products FSSAI certified and tested for heavy metals?',
    answer: 'Yes, our central processing unit is FSSAI licensed (Lic No: 10022011000492) and ISO 22000 certified. Every harvest batch undergoes a 24-parameter laboratory test screening for pesticide residues, aflatoxins, and heavy metals before packaging.'
  },
  {
    id: 'faq-7',
    category: 'Gifting & Returns',
    question: 'What is your return and replacement policy?',
    answer: 'We offer a 100% Satisfaction Guarantee. If your order arrives damaged, unsealed, or if you are unsatisfied with the quality, we will arrange an instant free replacement or full refund within 7 days of delivery.'
  },
  {
    id: 'faq-8',
    category: 'Gifting & Returns',
    question: 'Can I order custom corporate gift boxes or wedding favours?',
    answer: 'Yes, we curate custom engraved wooden spice boxes, festive Diwali hampers, and bespoke wedding favours with custom branding and personalised greeting cards. Contact us via our concierge email or WhatsApp for bulk custom orders.'
  }
];
