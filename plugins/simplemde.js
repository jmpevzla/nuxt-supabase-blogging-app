import { defineNuxtPlugin } from '#app'
import VueSimplemde from 'vue-simplemde'

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.component('vue-simplemde', VueSimplemde)
})
