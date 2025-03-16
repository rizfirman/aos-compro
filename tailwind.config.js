/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "components/**/*.{vue,js}",
    // 'layouts/**/*.vue',
    "pages/**/*.vue",
    // 'composables/**/*.{js,ts}',
    // 'plugins/**/*.{js,ts}',
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        Gilroy: ["Gilroy", "sans-serif"],
      },
    },
  },
  plugins: [],
};
