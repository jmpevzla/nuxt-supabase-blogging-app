<template>
  <Fragment>
    <Tutorial/>
    <h2>{{ alpha.demo }}</h2>
  </Fragment>
</template>

<script setup>
import { useNuxt2Meta, reactive } from '#app'
import { Fragment } from 'vue-fragment'
import Tutorial from '~/components/Tutorial.vue';

const alpha = reactive({
  demo: 'hello world'
})

useNuxt2Meta({
  title: 'My Nuxt Bridge App'
})
</script>
