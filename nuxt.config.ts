// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/scss/global.scss'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    public: {
      EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
      EMAIL_PUBLIC_KEY: process.env.EMAIL_PUBLIC_KEY,
    },
  },

  image: {
    // force ipx, as otherwise it would default to using Netlify Image CDN (which probably is better to use, but issue is about ipx)

    domains: ['res.cloudinary.com'],
  },

  plugins: ['~/plugins/spline-viewer.client.ts'],
  ssr: false,

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `/aos-logo.png`,
        },
      ],
    },
  },

  compatibilityDate: '2026-04-01',
})