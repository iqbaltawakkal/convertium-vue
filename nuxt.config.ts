// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
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