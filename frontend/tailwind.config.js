/** @type {import('tailwindcss').Config} */
// Design tokens exported from the "Academic & Heritage Publishing" design system
// (see /docs/DESIGN.md). Colour roles, type scale and spacing names are used
// directly in components, e.g. `bg-surface-container-low`, `text-headline-xl`,
// `font-label-sm`, `py-space-xxl`.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
  "colors": {
    "surface-container-highest": "#dde3ec",
    "secondary": "#775a00",
    "surface-container": "#e9eef8",
    "secondary-fixed": "#ffdf98",
    "error-container": "#ffdad6",
    "on-tertiary-fixed": "#3f0110",
    "surface-container-low": "#eef4fe",
    "error": "#ba1a1a",
    "surface-dim": "#d5dae4",
    "on-surface-variant": "#43474e",
    "on-primary": "#ffffff",
    "on-tertiary-container": "#d77782",
    "on-background": "#161c23",
    "secondary-fixed-dim": "#eec14b",
    "on-surface": "#161c23",
    "secondary-container": "#fece57",
    "primary-fixed": "#d6e3ff",
    "on-secondary": "#ffffff",
    "surface-container-lowest": "#ffffff",
    "on-primary-fixed-variant": "#2c4770",
    "primary-fixed-dim": "#adc7f8",
    "tertiary-fixed": "#ffdadc",
    "surface-variant": "#dde3ec",
    "on-error": "#ffffff",
    "tertiary-fixed-dim": "#ffb2b9",
    "surface": "#f7f9ff",
    "surface-tint": "#455f8a",
    "inverse-on-surface": "#ecf1fb",
    "tertiary": "#39000d",
    "primary": "#001736",
    "outline": "#74777f",
    "on-error-container": "#93000a",
    "inverse-surface": "#2b3138",
    "surface-container-high": "#e3e8f2",
    "inverse-primary": "#adc7f8",
    "outline-variant": "#c4c6d0",
    "background": "#f7f9ff",
    "on-tertiary": "#ffffff",
    "on-secondary-container": "#735700",
    "primary-container": "#0d2c54",
    "on-primary-fixed": "#001b3d",
    "on-secondary-fixed-variant": "#5a4300",
    "on-secondary-fixed": "#251a00",
    "on-primary-container": "#7a94c2",
    "surface-bright": "#f7f9ff",
    "on-tertiary-fixed-variant": "#792d39",
    "tertiary-container": "#56121f"
  },
  "borderRadius": {
    "DEFAULT": "0.125rem",
    "lg": "0.25rem",
    "xl": "0.5rem",
    "full": "0.75rem"
  },
  "spacing": {
    "space-sm": "0.5rem",
    "space-xl": "2.5rem",
    "margin-mobile": "1.25rem",
    "space-xxl": "4rem",
    "space-xs": "0.25rem",
    "space-lg": "1.5rem",
    "gutter": "1.5rem",
    "gutter-mobile": "1rem",
    "margin": "2.5rem",
    "space-md": "1rem"
  },
  "fontFamily": {
    "label-lg": [
      "Work Sans"
    ],
    "body-sm": [
      "Work Sans"
    ],
    "headline-sm": [
      "\"Source Serif 4\""
    ],
    "headline-xl": [
      "\"Source Serif 4\""
    ],
    "label-md": [
      "Work Sans"
    ],
    "headline-md": [
      "\"Source Serif 4\""
    ],
    "display-hero": [
      "\"Source Serif 4\""
    ],
    "body-md": [
      "Work Sans"
    ],
    "mono-cite": [
      "Work Sans"
    ],
    "display-hero-mobile": [
      "\"Source Serif 4\""
    ],
    "label-sm": [
      "Work Sans"
    ],
    "headline-xl-mobile": [
      "\"Source Serif 4\""
    ],
    "headline-lg": [
      "\"Source Serif 4\""
    ],
    "body-lg": [
      "Work Sans"
    ]
  },
  "fontSize": {
    "label-lg": [
      "14px",
      {
        "lineHeight": "20px",
        "letterSpacing": "0.02em",
        "fontWeight": "600"
      }
    ],
    "body-sm": [
      "13px",
      {
        "lineHeight": "20px",
        "fontWeight": "400"
      }
    ],
    "headline-sm": [
      "18px",
      {
        "lineHeight": "26px",
        "fontWeight": "600"
      }
    ],
    "headline-xl": [
      "36px",
      {
        "lineHeight": "44px",
        "letterSpacing": "-0.015em",
        "fontWeight": "600"
      }
    ],
    "label-md": [
      "12px",
      {
        "lineHeight": "16px",
        "letterSpacing": "0.05em",
        "fontWeight": "600"
      }
    ],
    "headline-md": [
      "22px",
      {
        "lineHeight": "30px",
        "fontWeight": "600"
      }
    ],
    "display-hero": [
      "48px",
      {
        "lineHeight": "56px",
        "letterSpacing": "-0.02em",
        "fontWeight": "700"
      }
    ],
    "body-md": [
      "15px",
      {
        "lineHeight": "24px",
        "fontWeight": "400"
      }
    ],
    "mono-cite": [
      "12px",
      {
        "lineHeight": "16px",
        "fontWeight": "500"
      }
    ],
    "display-hero-mobile": [
      "32px",
      {
        "lineHeight": "40px",
        "letterSpacing": "-0.01em",
        "fontWeight": "700"
      }
    ],
    "label-sm": [
      "11px",
      {
        "lineHeight": "14px",
        "letterSpacing": "0.08em",
        "fontWeight": "600"
      }
    ],
    "headline-xl-mobile": [
      "26px",
      {
        "lineHeight": "34px",
        "letterSpacing": "-0.01em",
        "fontWeight": "600"
      }
    ],
    "headline-lg": [
      "28px",
      {
        "lineHeight": "36px",
        "fontWeight": "600"
      }
    ],
    "body-lg": [
      "18px",
      {
        "lineHeight": "28px",
        "fontWeight": "400"
      }
    ]
  }
},
  },
  plugins: [],
};
