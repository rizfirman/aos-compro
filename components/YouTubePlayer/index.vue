<template>
  <div class="mt-5 flex items-center justify-center xl:mt-0 xl:min-h-screen">
    <div
      ref="videoContainer"
      class="flex items-center justify-center rounded-lg bg-black shadow-lg xl:h-[90vh] xl:w-[80vw]"
    >
      <video
        ref="videoElement"
        class="h-full w-full rounded-lg xl:object-cover"
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
  /* Tambahan styling jika diperlukan */
</style>
