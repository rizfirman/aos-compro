<template>
  <div
    class="relative lg:w-screen xl:h-screen flex items-center justify-center bg-black"
  >
    <!-- Loading Animation -->
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse"
    >
      <span class="loader" />
    </div>

    <!-- Nuxt Image dengan Lazy Load & Tidak Terpotong -->
    <nuxt-img
      :src="img"
      class="w-full h-full object-contain transition-opacity duration-500"
      :class="{ 'opacity-0': loading, 'opacity-100': !loading }"
      loading="lazy"
      @load="loading = false"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  img: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Animasi Loader */
.loader {
  width: 32px;
  height: 32px;
  border: 4px solid #fff;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
