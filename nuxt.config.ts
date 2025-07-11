// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true }
})
