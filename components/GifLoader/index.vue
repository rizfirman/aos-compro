<template>
  <div
    class="mt-5 flex items-center justify-center p-10 xl:mt-0 xl:min-h-screen xl:p-0"
  >
    <div class="flex items-center justify-center rounded-lg bg-black shadow-lg">
      <!-- Menampilkan GIF Loader -->
      <img class="h-full w-full" :src="src" alt="Loading..." />
    </div>
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
