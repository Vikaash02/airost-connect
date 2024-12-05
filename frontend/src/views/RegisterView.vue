<!-- src/views/RegisterView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  components: {
    RegisterForm
  }
}
</script>
