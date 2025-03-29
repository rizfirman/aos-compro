<template>
  <div class="mt-5 flex items-center justify-center xl:mt-0 xl:min-h-screen">
    <!-- Menampilkan GIF Loader -->
    <img class="h-full w-full" :src="src" alt="Loading..." />
  </div>
</template>

<script setup lang="ts">
  // Properti untuk mengontrol status loading
  defineProps({
    src: {
      type: String,
      required: true,
    },
  })
</script>
