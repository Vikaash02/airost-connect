// App.vue
<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <nav class="bg-airost-primary text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold">AIROST: Connect</router-link>
        <div v-if="isLoggedIn" class="space-x-4">
          <router-link to="/categories" class="hover:text-gray-300">Categories</router-link>
          <a @click="logout" class="cursor-pointer hover:text-gray-300">Logout</a>
        </div>
      </div>
    </nav>
    
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
