<!-- src/components/CategorySelection.vue -->
<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-center text-airost-primary">
      Select Your Interests
    </h2>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="category in categories" 
        :key="category"
        @click="toggleCategory(category)"
        class="p-4 border rounded cursor-pointer transition-all duration-300"
        :class="{
          'bg-airost-primary text-white': selectedCategories.includes(category),
          'bg-white text-gray-700 hover:bg-gray-100': !selectedCategories.includes(category)
        }"
      >
        {{ category }}
      </div>
    </div>
    
    <div class="text-center mt-8">
      <button 
        @click="saveCategories"
        class="bg-airost-secondary text-white px-6 py-2 rounded hover:bg-green-600"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        'Technology', 'Science', 'Arts', 'Music', 
        'Sports', 'Literature', 'Film', 'Education', 
        'Business', 'Healthcare', 'Environment', 'Politics'
      ],
      selectedCategories: []
    }
  },
  methods: {
    toggleCategory(category) {
      if (this.selectedCategories.includes(category)) {
        this.selectedCategories = this.selectedCategories.filter(c => c !== category)
      } else {
        this.selectedCategories.push(category)
      }
    },
    saveCategories() {
      if (this.selectedCategories.length === 0) {
        alert('Please select at least one category')
        return
      }
      
      this.$store.dispatch('selectCategories', this.selectedCategories)
      this.$router.push('/recommendations')
    }
  }
}
</script>
