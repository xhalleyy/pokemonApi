/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kodchasan-reg' : ['kodchasan-reg'],
        'kodchasan-medium' : ['kodchasan-medium'],
        'kodchasan-semi' : ['kodchasan-semi'],
        'kodchasan-bold' : ['kodchasan-bold'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

