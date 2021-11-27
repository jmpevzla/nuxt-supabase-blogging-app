<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <th>Id</th>
          <th>UserName</th>
          <th>Avatar URL</th>
          <th>Website</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user of users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.avatar_url }}</td>
          <td>{{ user.website }}</td>
          <td>{{ user.updated_at }}</td>
        </tr>
      </tbody>
    </table>
    <h2>{{ extra }}</h2>
  </div>
</template>

<script>
import { onMounted, getCurrentInstance } from '#app'

export default {
  async asyncData({ $supabase }) {

    const { data: users } = await $supabase.from('profiles').select('*')

    return {
      users
    }
  },
  setup(props) {
    const page = getCurrentInstance()
    const extra = ref('Fanatico')

    onMounted(() => {
      page.data.users = [{ id: 2, username: 'Vanesa Reyes' }]
      extra.value = 'Hello Extra!'
      //console.log(app.vue2App.data)
    })

    return {
      extra
    }
  }
}
</script>
