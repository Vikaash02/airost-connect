<!-- src/views/ProgramRecommendationView.vue -->
<template>
  <div>
    <ProgramList :programs="programs" />
  </div>
</template>

<script>
import ProgramList from '@/components/ProgramList.vue'

export default {
  components: {
    ProgramList
  },
  computed: {
    programs() {
      return this.$store.getters.recommendedPrograms
    }
  },
  created() {
    // Fetch program recommendations when component is created
    this.$store.dispatch('recommendPrograms')
  }
}
</script>
