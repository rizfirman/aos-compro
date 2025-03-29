<template>
  <div
    class="relative flex items-center justify-center bg-black lg:w-screen xl:h-screen"
  >
    <!-- Loading Animation -->
    <div
      v-if="loading"
      class="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-200"
    >
      <span class="loader" />
    </div>
    <!-- Nuxt Image dengan Lazy Load & Tidak Terpotong -->
    <nuxt-img
      :src="img"
      class="h-full w-full object-contain transition-opacity duration-500"
      :class="{ 'opacity-0': loading, 'opacity-100': !loading }"
      loading="lazy"
      @load="handleImageLoad"
    />
  </div>
</template>

<script setup lang="ts">
  // Properti gambar yang diterima oleh komponen
  defineProps({
    img: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      default: 'png',
    },
  })

  // Status untuk loading gambar
  const loading = ref(true)

  // Fungsi untuk menangani ketika gambar selesai dimuat
  const handleImageLoad = () => {
    loading.value = false
  }
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
