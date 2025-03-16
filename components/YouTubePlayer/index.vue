<template>
  <div class="flex justify-center items-center xl:min-h-screen">
    <div
      ref="videoContainer"
      class="w-[90vw] max-w-4xl h-[50vh] bg-gray-200 flex justify-center items-center rounded-lg shadow-lg"
    >
      <iframe
        v-if="isPlaying"
        :src="embedUrl"
        class="w-full h-full rounded-lg"
        frameborder="0"
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
});

const videoContainer = ref<HTMLElement | null>(null);
const isPlaying = ref(false);
const observer = ref<IntersectionObserver | null>(null);

// Perbarui URL saat video masuk viewport
const embedUrl = computed(() =>
  isPlaying.value
    ? `https://www.youtube.com/embed/${props.videoId}?&autoplay=1&mute=1&enablejsapi=1&playsinline=1`
    : "",
);

onMounted(() => {
  if (!videoContainer.value) return;

  observer.value = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isPlaying.value = true;
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
/* Tambahan styling untuk animasi masuk */
</style>
