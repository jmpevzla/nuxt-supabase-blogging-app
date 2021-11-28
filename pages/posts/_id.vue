<template>
  <main>
    <div v-if="loaded">
      <h1 class="text-5xl mt-4 font-semibold tracking-wide">{{ post.title }}</h1>
      <p class="text-sm font-light my-4">by {{ post.user_email }}</p>
      <div class="mt-8 prose">
        <div v-html="compiledMarkdown"></div>
      </div>
    </div>
    <div v-else class="text-2xl text-center">Loading ...</div>
  </main>
</template>

<script>
import { marked } from 'marked'

const getData = async ($supabase, route) => {
  /* use the ID from the route parameter to fetch the post */
  const { data: post } = await $supabase
    .from('posts')
    .select()
    .filter('id', 'eq', route.params.id)
    .single()

  return {
    post,
    loaded: true
  }
}

export default {
  computed: {
    compiledMarkdown: function () {
      return marked(this.post.content, { sanitize: true })
    }
  },
  async asyncData({ route, $supabase }) {
    /* use the ID from the route parameter to fetch the post */
    if (process.server) {
      return getData($supabase, route)
    }

    return {}
  },
  data: () => ({
    post: {
      title: '',
      user_email: '',
      content: '...'
    },
    loaded: false
  }),
  async mounted() {
    const { post: sbpost } = await getData(this.$supabase, this.$route)
    this.post = sbpost
    this.loaded = true
  }
}
</script>
