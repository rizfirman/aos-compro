<template>
  <div class="flex justify-center items-center mt-5 xl:mt-0 xl:min-h-screen">
    <div
      ref="videoContainer"
      class="w-[90vw] max-w-4xl h-[50vh] bg-black flex justify-center items-center rounded-lg shadow-lg"
    >
      <video
        ref="videoElement"
        class="w-full h-full rounded-lg"
        :src="props.videoSrc"
        playsinline
        muted
        loop
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
});

const videoContainer = ref<HTMLElement | null>(null);
const videoElement = ref<HTMLVideoElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  if (!videoContainer.value || !videoElement.value) return;

  observer.value = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        videoElement.value?.play();
      } else {
        videoElement.value?.pause();
      }
    },
    { threshold: 0.5 },
  );

  observer.value.observe(videoContainer.value);
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>
