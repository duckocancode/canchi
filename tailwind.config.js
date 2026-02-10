/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monotone Black/White Theme
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // CanChi Colors - Ngũ Hành
        "sao-hoa": "#dc2626",     // Đỏ - Hỏa tinh, hung tinh
        "sao-moc": "#16a34a",     // Xanh lá - Mộc tinh, cát tinh  
        "sao-tho": "#ca8a04",     // Vàng - Thổ tinh
        "sao-kim": "#71717a",     // Xám - Kim tinh
        "sao-thuy": "#18181b",    // Đen - Thủy tinh
        
        // Đặc tính sao
        "mieu": "#16a34a",        // Miếu - xanh đậm
        "vuong": "#22c55e",       // Vượng - xanh nhạt
        "dac": "#71717a",         // Đắc - xám
        "ham": "#a1a1aa",         // Hãm - xám nhạt
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Noto Serif", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
