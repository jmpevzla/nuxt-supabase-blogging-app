<template>
  <main>
    <div v-for="post in posts" :key="post.id">
      <div class="cursor-pointer border-b border-gray-300 mt-8 pb-4">
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <p class="text-gray-500 mt-2">Author: {{ post.user_email }}</p>
        <NuxtLink :to="`/edit-post?id=${post.id}`" class="text-sm mr-4 text-blue-500">Edit Post</NuxtLink>
        <NuxtLink :to="`/posts/${post.id}`" class="text-sm mr-4 text-blue-500">View Post</NuxtLink>
        <button
          class="text-sm mr-4 text-red-500"
          @click="deletePost(post.id)"
        >Delete Post</button>
      </div>
    </div>
    <h1 v-if="loaded && !posts.length" class="text-2xl">No posts...</h1>
    <h2 v-if="!loaded" class="text-2xl text-center">Loading...</h2>
  </main>
</template>

<script setup>
import { useNuxtApp, onMounted, ref } from '#app'

const { $supabase } = useNuxtApp().nuxt2Context

const posts = ref([])
const loaded = ref(false)

const fetchPosts = async () => {
  const user = $supabase.auth.user()
  if (!user) return
  /* fetch only the posts for the signed in user */
  const { data: sbPosts, error } = await $supabase
    .from('posts')
    .select('*')
    .filter('user_id', 'eq', user.id)

  posts.value = sbPosts
  loaded.value = true
}

const deletePost = async (id) => {
  await $supabase
    .from('posts')
    .delete()
    .match({ id })
  fetchPosts()
}

onMounted(() => {
  fetchPosts()
})
</script>
