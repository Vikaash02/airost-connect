<!-- src/components/RegisterForm.vue -->
<template>
  <form @submit.prevent="handleRegister" class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl mb-6 text-center text-airost-primary">Create Your Account</h2>
    
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
    
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input 
        v-model="email" 
        type="email" 
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
        minlength="6"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
      />
    </div>
    
    <button 
      type="submit" 
      class="bg-airost-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
    >
      Register
    </button>
    
    <p class="text-center mt-4">
      Already have an account? 
      <router-link to="/login" class="text-airost-primary hover:underline">
        Login here
      </router-link>
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async handleRegister() {
      try {
        await this.$store.dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        
        // Redirect to login after successful registration
        this.$router.push('/login')
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>
