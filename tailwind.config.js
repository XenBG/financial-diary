/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans: ['Sofia Sans'],
            serif: ['serif'],
            mono: ['monospace'],
            display: ['JetBrains Mono'],
            body: ['Sofia Sans'],
        },
    },
    plugins: [],
}
