// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-05-07',
  app: {
    head: {
      title: 'Convertium vue', // default fallback title
      meta: [
        { name: 'description', content: 'excercise using vue' }
      ],
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@prisma/nuxt',
    'shadcn-nuxt',
  ],
  eslint: {
    config: {
      stylistic: true
    }
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/default": "./node_modules/.prisma/client/default.js",
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js",
      }
    }
  }
})