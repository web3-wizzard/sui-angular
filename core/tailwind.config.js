const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    fontSize: {
      4: '4px',
      8: '8px',
      12: '12px',
      13: '13px',
      14: '14px',
      15: '15px',
      16: '16px',
      17: '17px',
      18: '18px',
      19: '19px',
      20: '20px',
      32: '32px',
      40: '40px',
      72: '72px',
    },
    spacing: {
      2: '2px',
      4: '4px',
      5: '5px',
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      17: '17px',
      20: '20px',
      22: '22px',
      24: '24px',
      30: '30px',
      32: '32px',
      40: '40px',
      48: '48px',
      50: '50px',
      56: '56px',
      70: '70px',
      72: '72px',
      98: '98px',
      106: '106px',
      160: '160px',
      240: '240px',
      half: '50%',
    },
    lineHeight: {
      16: '16px',
      18: '18px',
      20: '20px',
      22: '22px',
      24: '24px',
      48: '48px',
    },
    gap: {
      7: '7px',
      20: '20px',
    },
    colors: {
      primary: 'var(--sa-color-text-primary, rgba(0, 0, 0, 1))',
      secondary: 'var(--sa-color-text-secondary, rgba(255, 255, 255, 1))',
      tertiary: 'var(--sa-color-text-tertiary, rgba(118, 122, 129, 1))',
      'accent-secondary': 'var(--sa-color-accent-secondary, rgba(88, 181, 255, 1))',
      accent: 'var(--sa-color-accent, rgba(255, 75, 0, 1))',
      error: 'var(--sa-color-text-error, rgba(244, 63, 94, 1))',
      quinary: 'var(--sa-color-text-quinary, rgba(251, 191, 36, 1))',
      'stroke-secondary': 'var(--sa-color-stroke-secondary, rgba(0, 0, 0, 1))',
      'background-secondary': 'var(--sa-color-background-secondary, rgba(0, 0, 0, 1))',
      'background-quinary': 'var(--sa-color-background-quinary, rgba(251, 191, 36, 0.1))',
    },
  },
  plugins: [],
};
