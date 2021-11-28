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
  </main>
</template>

<script>
export default {
  async asyncData({ $supabase }) {

    const { data: posts, error } = await $supabase
      .from('posts')
      .select('*')

    return {
      posts,
      loaded: true
    }
  },
  data() {
    return {
      loaded: false,
      posts: []
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
