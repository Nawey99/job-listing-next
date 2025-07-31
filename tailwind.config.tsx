/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                custom: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'], // Custom Poppins font
            },
        },
    },
    plugins: [],
};