/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                "bg-primary": "var(--bg-primary)",
            },
            dropShadow: {
                purple: "2px 5px 10px var(--color-primary)",
            },
            keyframes: {
                slideIn: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-100%)",
                    },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                slideIn: "slideIn 0.5s ease-in-out",
            },
            screens: {
                "2xl": { max: "1535px" },
                // => @media (max-width: 1535px) { ... }

                xl: { max: "1279px" },
                // => @media (max-width: 1279px) { ... }

                lg: { max: "1023px" },
                // => @media (max-width: 1023px) { ... }

                md: { max: "767px" },
                // => @media (max-width: 767px) { ... }

                sm: { max: "639px" },
                // => @media (max-width: 639px) { ... }
            },
        },
    },
    plugins: [],
};
