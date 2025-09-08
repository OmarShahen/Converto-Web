module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#10a37f",
        "brand-hover": "#0e8c6e",
        neutral: {
          100: "hsl(var(--color-neutral-100))",
          200: "hsl(var(--color-neutral-200))",
          300: "hsl(var(--color-neutral-300))",
          400: "hsl(var(--color-neutral-400))",
          500: "hsl(var(--color-neutral-500))",
        },
        success: "hsl(var(--color-success))",
        error: "hsl(var(--color-error))",
        warning: "hsl(var(--color-warning))",
        info: "hsl(var(--color-info))",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      fontSize: {
        // Display headings
        "display-lg": [
          "3rem",
          { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "2.25rem",
          { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.01em" },
        ],
        "display-sm": [
          "1.875rem",
          { lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.01em" },
        ],

        // Headings
        "heading-lg": [
          "1.5rem",
          { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.01em" },
        ],
        "heading-md": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }],

        // Body text
        "body-lg": [
          "1rem",
          { lineHeight: "1.5", fontWeight: "400", letterSpacing: "0em" },
        ],
        "body-md": [
          "0.9375rem",
          { lineHeight: "1.5", fontWeight: "400", letterSpacing: "0em" },
        ],
        "body-sm": [
          "0.875rem",
          { lineHeight: "1.5", fontWeight: "400", letterSpacing: "0em" },
        ],
        "body-xs": [
          "0.75rem",
          { lineHeight: "1.4", fontWeight: "400", letterSpacing: "0em" },
        ],
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        6: "var(--space-6)",
        8: "var(--space-8)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
      },
    },
  },
  plugins: [],
};
