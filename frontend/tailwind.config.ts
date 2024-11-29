// import animate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // first font is  applied to the body
        montserrat: [
          "Montserrat",
          "var(--font-montserrat-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
        poppins: [
          "Poppins",
          "var(--font-poppins-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
        sans: [
          "Inter",
          "var(--font-inter-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
        inter: [
          "Inter",
          "var(--font-inter-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
        opensans: [
          "Open Sans",
          "var(--font-open-sans-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
        raleway: [
          "Raleway",
          "var(--font-raleway-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
        lato: [
          "Lato",
          "var(--font-lato-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
        roboto: [
          "Roboto",
          "var(--font-roboto-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
        ubuntu: [
          "Ubuntu",
          "var(--font-ubuntu-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        fade: {
          from: { opacity: "0.10" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fade: "fade 1s linear infinite",
      },
    },
  },
  // plugins: [animate],
};

export default config;