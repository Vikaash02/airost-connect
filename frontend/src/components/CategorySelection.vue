<!-- src/components/CategorySelection.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Select your preferred categories:</h2>
    <div v-if="selectedCategories && selectedCategories.length > 0">
      <div v-for="category in allCategories" :key="category">
        <label class="block">
          <input 
            type="checkbox" 
            :value="category" 
            v-model="selectedCategories" 
            class="mr-2"
          />
          {{ category }}
        </label>
      </div>
    </div>
    <div v-else>
      <p>No categories available.</p>
    </div>
    <button 
      @click="saveCategories" 
      class="bg-airost-primary text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-600"
    >
      Save Categories
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      allCategories: ['Technology', 'Science', 'Mathematics', 'Arts', 'Business'],  // Example categories
    }
  },
  computed: {
    ...mapState({
      selectedCategories: state => state.selectedCategories,
    })
  },
  methods: {
    saveCategories() {
      if (this.selectedCategories.length > 0) {
        this.$store.dispatch('selectCategories', this.selectedCategories)
        this.$router.push('/recommend')  // Navigate to recommendations
      } else {
        alert('Please select at least one category')
      }
    }
  }
}
</script>
