


const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {

      colors:{
 
        textPrimary:"#1D1915",

        textSecondary:"#3A3126",

        primaryBackground:"#C1AA90",

        secondaryBackground:"#695441"

      },

      fontFamily:{}

    },
  },
  plugins: [
    flowbite.plugin()
  ],
}