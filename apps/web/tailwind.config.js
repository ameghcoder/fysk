import tailwindcssAnimate from "tailwindcss-animate";
import colors from "tailwindcss/colors";

const tailwindConfig = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,astro,md,mdx}",
        "../../fysk/atoms/**/*.{js,ts,jsx,tsx}",
        "../../fysk/components/**/*.{js,ts,jsx,tsx}",
        "../../fysk/templates/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ...colors,
            },
            animation: {
                // 'blink': 'blink 1.5s ease-in-out infinite',
                // "shimmer": "var(--animate-shimmer)",
                // "indeterminate": "var(--animate-indeterminate)",
                // "stripe-move": "var(--animate-stripe-move)",
                // "accordion-down": "var(--animate-accordion-down)",
                // "accordion-up": "var(--animate-accordion-up)"
            },
        },
    },
    plugins: [tailwindcssAnimate],
}

export default tailwindConfig
