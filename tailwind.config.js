/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
        serif: ['Inter'],
        mono: ['Inter'],
        display: ['Inter'],
        body: ['Inter']
    },
    borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '1': '1px'
    }
    },
  },
  plugins: [],
}

