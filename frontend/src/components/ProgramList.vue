<!-- src/components/ProgramList.vue -->
<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-center text-airost-primary">
      Recommended Programs
    </h2>
    
    <div v-if="programs.length === 0" class="text-center text-gray-500">
      No programs match your selected categories.
    </div>
    
    <div class="grid gap-4">
      <div 
        v-for="program in programs" 
        :key="program.name"
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <h3 class="text-xl font-semibold mb-2">{{ program.name }}</h3>
        <p class="text-gray-600">Venue: {{ program.venue }}</p>
        <p class="text-gray-600">Date & Time: {{ program.dateTime }}</p>
        <p class="text-gray-600">Category: {{ program.category }}</p>
        <p class="mt-2 text-gray-700">{{ program.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    programs() {
      return this.$store.getters.recommendedPrograms
    }
  },
  created() {
    // Trigger recommendation when component is created
    this.$store.dispatch('recommendPrograms')
  }
}
</script>
