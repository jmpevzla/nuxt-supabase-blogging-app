<template>
  <main>
    <div id="editor">
      <h1 class="text-3xl font-semibold tracking-wide mt-6">Edit post</h1>
      <input
        name="title"
        placeholder="Title"
        v-model="post.title"
        class="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <client-only>
        <vue-simplemde v-model="post.content"></vue-simplemde>
      </client-only>
      <button
        type="button"
        class="mb-4 w-full bg-blue-500 text-white font-semibold px-8 py-4"
        @click="editPost"
      >Edit Post</button>
    </div>
  </main>
</template>

<script setup>
import { useNuxtApp, onMounted, ref } from '#app'

const { $supabase, route: $route, app } = useNuxtApp().nuxt2Context
const { router: $router } = app

const post = ref({})

const editPost = async () => {
  /* when the user edits a post, redirect them back to their posts */
  const { title, content } = post.value
  if (!title || !content) return
  await $supabase
    .from('posts')
    .update([
        { title, content }
    ])
    .match({ id: post.value.id })
  $router.push('/my-posts')
}

onMounted(async () => {
  /* when the page loads, fetch the post using the route id parameter */
  const id = $route.query.id
  const { data: sbPost } = await $supabase
    .from('posts')
    .select()
    .filter('id', 'eq', id)
    .single()
  if (!sbPost) $router.push('/')
  post.value = sbPost
})

</script>
