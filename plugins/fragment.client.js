import { defineNuxtPlugin } from '#app'
import { Plugin } from 'vue-fragment'

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(Plugin)
})
