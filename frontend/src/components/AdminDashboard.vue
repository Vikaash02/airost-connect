<!-- src/components/AdminDashboard.vue -->
<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-center text-airost-primary">
      Admin Program Management
    </h2>
    
    <form @submit.prevent="addProgram" class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Program Name</label>
        <input 
          v-model="newProgram.name" 
          type="text" 
          required 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Venue</label>
        <input 
          v-model="newProgram.venue" 
          type="text" 
          required 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Date and Time</label>
        <input 
          v-model="newProgram.dateTime" 
          type="datetime-local" 
          required 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Category</label>
        <select 
          v-model="newProgram.category" 
          required 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        >
          <option value="">Select Category</option>
          <option>Technology</option>
          <option>Science</option>
          <option>Arts</option>
          <option>Music</option>
        </select>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Additional Notes</label>
        <textarea 
          v-model="newProgram.notes" 
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        class="bg-airost-secondary text-white px-4 py-2 rounded hover:bg-green-600 w-full"
      >
        Add Program
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProgram: {
        name: '',
        venue: '',
        dateTime: '',
        category: '',
        notes: ''
      }
    }
  },
  methods: {
    addProgram() {
      this.$store.dispatch('addProgram', this.newProgram)
      
      // Reset form
      this.newProgram = {
        name: '',
        venue: '',
        dateTime: '',
        category: '',
        notes: ''
      }
      
      alert('Program added successfully!')
    }
  }
}
</script>
