export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'Plus Jakarta Sans': [400, 500, 600, 700, 800],
      'Inter': [400, 500, 600],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/Feria-Cientifica/' : '/',
    head: {
      title: 'Feria Científica 2026 - Ciencia Sin Límites',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Feria Científica 2026 del Colegio Visión de Fe - Ciencia Sin Límites. Descubre proyectos de biología, robótica, química y tecnología.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
})
