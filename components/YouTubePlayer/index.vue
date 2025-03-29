<template>
  <div class="mt-5 flex items-center justify-center xl:mt-0 xl:min-h-screen">
    <div
      class="flex items-center justify-center rounded-lg bg-black shadow-lg xl:h-[90vh] xl:w-[80vw]"
    >
      <!-- Loading Spinner -->
      <div
        v-if="isLoading"
        class="absolute z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200"
        />
      </div>

      <!-- Video Element -->
      <video
        ref="videoElement"
        class="h-full w-full rounded-lg"
        :src="props.videoSrc"
        playsinline
        muted
        loop
        @loadeddata="emit('loadeddata')"
        @canplaythrough="emit('canplaythrough')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    videoSrc: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(['loadeddata', 'canplaythrough'])

  const videoContainer = ref<HTMLElement | null>(null)
  const videoElement = ref<HTMLVideoElement | null>(null)
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    if (!videoContainer.value || !videoElement.value) return

    observer.value = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.value?.play()
        } else {
          videoElement.value?.pause()
        }
      },
      { threshold: 0.5 },
    )

    observer.value.observe(videoContainer.value)
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })
</script>

<style scoped>
  /* Spinner Styles */
  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
