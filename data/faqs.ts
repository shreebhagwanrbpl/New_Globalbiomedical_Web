export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Equipment & Accuracy' | 'Rajasthan Delivery & Hubs' | 'Warranty & AMC' | 'Reagents & Storage' | 'Lab Setup';
}

export const staticFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Equipment & Accuracy',
    question: 'Are Human Biomedical analyzers compliant with NABL and international diagnostic standards?',
    answer: 'Yes, absolutely. All our Hematology Analyzers, Biochemistry Systems, and Rapid POCT kits are manufactured in ISO 13485:2016 and CE certified facilities. Every instrument is calibrated against international reference standards and supplied with factory calibration certificates required for NABL accreditation.',
  },
  {
    id: 'faq-2',
    category: 'Rajasthan Delivery & Hubs',
    question: 'Do you deliver and install in Nagaur and other districts across Rajasthan?',
    answer: 'Yes! Human Biomedical LLP delivers to all 50 districts of Rajasthan, including Nagaur, Jaipur, Jodhpur, Kota, Bikaner, Ajmer, Udaipur, Bhilwara, Alwar, and Sikar. We operate direct daily dispatch from our Central Headquarters on 200 Feet Bypass Road, Jaipur, ensuring 24-48 hour delivery to any district hospital, clinic, or diagnostic laboratory.',
  },
  {
    id: 'faq-3',
    category: 'Equipment & Accuracy',
    question: 'Are your CBC and Biochemistry reagents compatible with other analyzer brands like Mindray, Sysmex, and Erba?',
    answer: 'Yes. Our universal liquid-stable CBC diluents, lysing reagents, and clinical biochemistry kits (LFT, KFT, Lipid, Glucose) are formulated for open and universal analyzer platforms, delivering 100% correlation with Mindray, Sysmex, Erba Mannheim, Nihon Kohden, and Human Biomedical counters with low background counts and exceptional linearity.',
  },
  {
    id: 'faq-4',
    category: 'Warranty & AMC',
    question: 'What warranty and biomedical engineering support do you provide?',
    answer: 'Every diagnostic instrument comes with a comprehensive 12 to 24-month on-site warranty covering parts and labor. Our team of certified biomedical field engineers visits your facility for unboxing, installation, precision calibration, and staff operation training. We also offer affordable Annual Maintenance Contracts (AMC) and Comprehensive Maintenance Contracts (CMC) across Rajasthan.',
  },
  {
    id: 'faq-5',
    category: 'Reagents & Storage',
    question: 'How do you transport temperature-sensitive diagnostic reagents during hot Rajasthan summers?',
    answer: 'All temperature-sensitive reagents, enzymes, calibrators, and control serums are packed in heavy-duty insulated EPS thermocol boxes with validated frozen gel packs. Temperature indicators ensure cold-chain integrity (2°C – 8°C) is strictly maintained from our Jaipur cold storage to your lab door.',
  },
  {
    id: 'faq-6',
    category: 'Lab Setup',
    question: 'Can Human Biomedical LLP assist with establishing a new turnkey pathology laboratory?',
    answer: 'Yes, we specialize in complete turnkey pathology laboratory setups! We provide end-to-end guidance from instrument selection (Hematology, Biochemistry, Centrifuge, Microscope, Electrolyte Analyzer, POCT) to lab layout design, electrical/water prerequisites, NABL compliance documentation, and starter reagent packages.',
  },
  {
    id: 'faq-7',
    category: 'Warranty & AMC',
    question: 'How quickly does a biomedical engineer respond in case of an equipment emergency breakdown?',
    answer: 'We provide 24/7 technical telephone & video diagnostics support. For critical breakdown calls, an on-site biomedical engineer is dispatched within 4 to 24 hours depending on the district location in Rajasthan, with emergency backup spare parts readily stocked at our Jaipur HQ.',
  },
  {
    id: 'faq-8',
    category: 'Lab Setup',
    question: 'Where is your head office located and can we view live machine demonstrations?',
    answer: 'Our official corporate headquarters and demonstration center is located at: F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021. Pathologists, doctors, and lab owners are welcome to visit our experience center for live equipment demonstrations.',
  },
];
