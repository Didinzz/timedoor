import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                'spin-cylinder': {
                    '0%': { transform: 'rotateX(-6deg) rotateY(0deg)' },
                    '100%': { transform: 'rotateX(-6deg) rotateY(-360deg)' },
                },
            },
            // 👇 PINDAHKAN KE DALAM EXTEND (sebelumnya di luar, makanya tidak jalan)
            animation: {
                'spin-cylinder': 'spin-cylinder 35s linear infinite',
            },
        },
    },

    plugins: [forms],
};