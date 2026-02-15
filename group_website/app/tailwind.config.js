/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        a: {
                            color: 'var(--color-secondary)',
                        },
                    },
                },
            },
        },
    },
}