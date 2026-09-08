// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxtjs/supabase'],
  supabase: {
    redirect: false
  },
  site: {
    url: 'https://basemed.qa',
    name: 'BaseMed'
  },
  sitemap: {
    sources: [
      '/api/_sitemap-urls'
    ],
    exclude: [
      '/admin/**'
    ]
  },
  robots: {
    disallow: ['/admin', '/api'],
    allow: '/'
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'BaseMed | Premium Medical Supplies in Qatar',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "BaseMed is Qatar's trusted supplier of premium medical, dental, and CSSD materials. We empower clinics, hospitals, and dental practices with high-quality supplies, exceptional service, and timely delivery." }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/Based%20Med.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

})
