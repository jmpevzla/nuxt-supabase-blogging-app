<template>
  <main>
    <div v-for="post in posts" :key="post.id">
      <NuxtLink key="{post.id}" :to="`/posts/${post.id}`">
        <div class="cursor-pointer border-b border-gray-300 mt-8 pb-4">
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p class="text-gray-500 mt-2">Author: {{ post.user_email }}</p>
        </div>
      </NuxtLink>
    </div>
    <h1 v-if="loaded && !posts.length" class="text-2xl">No posts...</h1>
    <h2 v-if="!loaded" class="text-2xl text-center">Loading ...</h2>
  </main>
</template>

<script>
import { onMounted, getCurrentInstance, useNuxtApp, ref } from '#app'

const getData = async ($supabase) => {
  const { data: posts, error } = await $supabase
    .from('posts')
    .select('*')

  return { posts }
}

export default {
  async asyncData({ $supabase }) {
    if (process.server){
      const { posts } = await getData($supabase)

      return {
        posts,
        loaded: true
      }
    }
    return {}
  },
  data() {
    return {
      loaded: false,
      posts: []
    }
  },
  setup() {
    const {
      $supabase
    } = useNuxtApp().nuxt2Context.app

    const page = getCurrentInstance()

    onMounted(async () => {
      const { posts } = await getData($supabase)
      page.data.posts = posts
      page.data.loaded = true
    })
    return {
    }
  }
}
// import { ref, useNuxtApp } from '#app'

// const { $supabase } = useNuxtApp().nuxt2Context
// const loaded = ref(false)
// const posts = ref([])

// const created = async () => {
//   const { data: posts, error } = await $supabase
//       .from('posts')
//       .select('*')

//   posts.value = posts
//   loaded.value = true
// }

// created()
</script>
