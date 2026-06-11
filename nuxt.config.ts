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
  devServer: {
    host: '0.0.0.0', // Atau isi dengan IP spesifik/nama domain lokal
    port: 8080       // Ganti dengan port yang Anda inginkan (default: 3000)
  },

  runtimeConfig: {
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    public: {
      EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
      EMAIL_PUBLIC_KEY: process.env.EMAIL_PUBLIC_KEY,
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      cloudinaryCloudName: process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      cloudinaryApiKey: process.env.NUXT_PUBLIC_CLOUDINARY_API_KEY,
      cloudinaryUploadPreset: process.env.NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    },
  },

  image: {
    // force ipx, as otherwise it would default to using Netlify Image CDN (which probably is better to use, but issue is about ipx)

    domains: ['res.cloudinary.com'],
  },

  plugins: [
    '~/plugins/firebase.client.ts',
    '~/plugins/spline-viewer.client.ts'
  ],
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