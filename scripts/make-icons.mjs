import fs from 'node:fs';

// Create a clean SVG and PNG copy for the logo
const svgLogo = `<svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="6" width="48" height="48" rx="8" fill="#F5660A"/>
  <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="28" fill="#FFFFFF" text-anchor="middle">आ</text>
  <text x="58" y="28" font-family="Georgia, serif" font-weight="700" font-size="20" fill="#151210">Ashish Shukla</text>
  <text x="60" y="46" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="11" fill="#6B625A">166-Bhagwant Nagar (Unnao)</text>
</svg>`;

fs.writeFileSync('public/logo/ashish-shukla-logo.svg', svgLogo);

// Minimal 1x1 or simple valid PNG if requested
// Let's create an icon svg as well
const svgFavicon = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="#F5660A"/>
  <text x="32" y="44" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="34" fill="#FFFFFF" text-anchor="middle">आ</text>
</svg>`;

fs.writeFileSync('public/icons/favicon.svg', svgFavicon);
fs.writeFileSync('public/favicon.ico', svgFavicon);
