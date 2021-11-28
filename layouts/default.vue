<template>
  <div>
    <nav class="p-6 border-b border-gray-300">
      <NuxtLink to="/" class="mr-6">
        Home
      </NuxtLink>
      <NuxtLink to="/profile" class="mr-6">
        Profile
      </NuxtLink>
      <NuxtLink to="/create-post" class="mr-6" v-if="authenticated">
        Create post
      </NuxtLink>
      <NuxtLink to="/my-posts" class="mr-6" v-if="authenticated">
        My Posts
      </NuxtLink>
    </nav>
    <div class="py-8 px-16">
      <Nuxt />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, useNuxtApp } from '#app'

const { $supabase } = useNuxtApp().nuxt2Context
const authenticated = ref(false)
const authListener = ref(null)

const checkUser = async () => {
  const user = await $supabase.auth.user()
  authenticated.value = !!user
  // if (user) {
  //   authenticated.value = true
  // } else {
  //   authenticated.value = false
  // }
}

onMounted(() => {
  /* When the app loads, check to see if the user is signed in */
  /* also create a listener for when someone signs in or out */
  const { data: authList } = $supabase.auth.onAuthStateChange(
    () => this.checkUser()
  )
  authListener.value = authList
  checkUser()
})

onBeforeUnmount(() => {
  authListener.value?.unsubscribe()
})
</script>
