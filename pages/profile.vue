<template>
  <main class="m-auto py-20" style="width: 700px">
    <!-- if the user is not signed in, show the sign in form -->
    <div v-if="!data.profile && !data.submitted" class="flex flex-col">
      <h2 class="text-2xl">Sign up / sign in</h2>
      <input v-model="data.email" type="email" placeholder="Email" class="border py-2 px-4 rounded mt-4" />
      <button @click="signIn" class="mt-4 py-4 px-20 w-full bg-blue-500 text-white font-bold">Submit</button>
    </div>
    <!-- if the user is signed in, show them their profile -->
    <div v-if="data.profile">
      <h2 class="text-xl">Hello, {{ data.profile.email }}</h2>
      <p class="text-gray-400 my-3">User ID: {{ data.profile.id }}</p>
      <button
        @click="signOut"
        class="mt-4 py-4 px-20 w-full bg-blue-500 text-white font-bold"
      >Sign Out</button>
    </div>
    <div v-if="data.submitted">
      <h1 class="text-xl text-center">Please check your email to sign in</h1>
    </div>
  </main>
</template>

<script setup>
import { reactive, useNuxtApp, onMounted, toRefs } from '#app'

const { $supabase } = useNuxtApp().nuxt2Context

const data = reactive({
  profile: null,
  submitted: false,
  email: ''
})

const signOut = async () => {
  /* signOut deletes the user's session */
  await $supabase.auth.signOut()
  data.profile = null
}

const signIn = async () => {
  /* signIn sends the user a magic link */
  const { email } = data
  if (!email) return
  const { error, datasb } = await $supabase.auth.signIn({
    email
  })
  data.submitted = true
}

onMounted(async () => {
  /* when the component loads, fetch the user's profile */
  const profile = await $supabase.auth.user()
  data.profile = profile
})

</script>
