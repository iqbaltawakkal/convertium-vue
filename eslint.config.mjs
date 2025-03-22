// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
).override('nuxt/typescript', {
  rules: {
    // ...Override rules, for example:
    'vue/multi-word-component-names': 'off'
  }
})
