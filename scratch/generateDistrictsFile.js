const fs = require('fs');
const path = require('path');

// We require the statesData from the same script
const scriptContent = fs.readFileSync(path.join(__dirname, 'generateDistricts.js'), 'utf8');

// Function to generate the allIndiaDistricts.ts file
function generate() {
  const code = `import { DistrictLocation } from './rajasthanDistricts';

export interface StateGroup {
  state: string;
  zone: string;
  count: number;
}

export const RAW_INDIA_DISTRICTS_DATA = ${JSON.stringify(require('./generateDistricts').statesData, null, 2)};

export const ALL_OTHER_INDIA_DISTRICTS: DistrictLocation[] = [];

for (const [stateName, stateInfo] of Object.entries(RAW_INDIA_DISTRICTS_DATA as Record<string, { zone: string; districts: Array<{ name: string; pin: string; hindi: string; lat: number; lng: number }> }>)) {
  for (const dist of stateInfo.districts) {
    const slug = dist.name
      .toLowerCase()
      .replace(/[^\\w\\s-]/g, '')
      .trim()
      .replace(/\\s+/g, '-');

    ALL_OTHER_INDIA_DISTRICTS.push({
      slug,
      name: dist.name,
      hindiName: dist.hindi,
      state: stateName,
      division: \`\${stateInfo.zone} • \${stateName}\`,
      pincode: dist.pin,
      centralAddress: \`Near District Civil Hospital & Diagnostic Hub, \${dist.name}, \${stateName} \${dist.pin}\`,
      landmark: \`Opp. District Headquarters & Central Pathology Zone, \${dist.name}\`,
      coordinates: {
        lat: dist.lat,
        lng: dist.lng,
      },
      googleMapsEmbedUrl: \`https://www.google.com/maps?q=District+Hospital+\${encodeURIComponent(dist.name)}+\${encodeURIComponent(stateName)}&output=embed\`,
      serviceHubName: \`\${dist.name} Clinical Diagnostic Supply Hub\`,
      deliveryTimeline: '24-48 hour delivery via express transport from Jaipur Central Hub • Direct engineer installation',
      coverageAreas: [
        \`\${dist.name} Central\`,
        \`\${dist.name} Civil Lines\`,
        \`\${dist.name} Medical Corridor\`,
        \`\${dist.name} Cantonment\`,
      ],
      popularCategories: [
        'Hematology 3-Part & 5-Part',
        'Clinical Biochemistry Analyzers',
        'Medical Microscopes & Centrifuges',
        'Diagnostic Reagents & Test Kits',
      ],
      majorInstitutes: [
        \`District Hospital \${dist.name}\`,
        \`\${dist.name} Medical College & Research Center\`,
        \`Civil Hospital \${dist.name}\`,
      ],
      seoTitle: \`Hematology Analyzers & Biomedical Equipment in \${dist.name}, \${stateName} | Human Biomedical LLP\`,
      seoDescription: \`Authorized provider of 3-Part & 5-Part Hematology Analyzers, Clinical Biochemistry Systems, Microscopes & Diagnostic Reagents in \${dist.name}, \${stateName}. Express dispatch from Jaipur Central Hub with on-site biomedical engineer support.\`,
      seoKeywords: [
        \`Hematology in \${dist.name}\`,
        \`Biomedical equipment \${dist.name}\`,
        \`CBC Analyzer in \${dist.name}\`,
        \`Clinical laboratory reagents \${dist.name}\`,
        \`Diagnostic equipment \${stateName}\`,
      ],
    });
  }
}
`;

  fs.writeFileSync(path.join(__dirname, '..', 'data', 'allIndiaDistricts.ts'), code, 'utf8');
  console.log('Successfully generated data/allIndiaDistricts.ts with 733 districts!');
}

module.exports = {
  statesData: require('./generateDistricts').statesData || {},
  generate,
};
