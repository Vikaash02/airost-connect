<!-- src/components/LoginForm.vue -->
<template>
  <form @submit.prevent="handleLogin" class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl mb-6 text-center text-airost-primary">Login to AIROST</h2>
    
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      {{ error }}
    </div>
    
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
      <input 
        v-model="username" 
        type="text" 
        required 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
      />
    </div>
    
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
      <input 
        v-model="password" 
        type="password" 
        required 
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
      />
    </div>
    
    <button 
      type="submit" 
      class="bg-airost-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
    >
      Login
    </button>
    
    <p class="text-center mt-4">
      Don't have an account? 
      <router-link to="/register" class="text-airost-secondary hover:underline">
        Register here
      </router-link>
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async handleLogin() {
      try {
        // Special case for admin login
        if (this.username === 'admin' && this.password === 'admin') {
          await this.$store.dispatch('login', { username: 'admin', password: 'admin' })
          this.$router.push('/admin')
          return
        }
        
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
        
        // Successful login redirects to home
        this.$router.push('/')
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>
