<!-- src/views/HomeView.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-8 text-airost-primary">
      Welcome to AIROST: Connect
    </h1>
    <div class="text-center">
      <p class="mb-4 text-gray-700">
        Discover personalized programs based on your interests!
      </p>
      <router-link 
        to="/categories" 
        class="bg-airost-secondary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
      >
        Explore Categories
      </router-link>
    </div>
  </div>
</template>
