<template>
  <div>
    <LogoAnimation />
    <div v-for="data in dataList" :key="data.id">
      <ImageCard v-if="data.type === 'image'" v-intersect :img="data.link" />
      <YouTubePlayer v-else-if="data.type === 'video'" :video-src="data.link" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { dataList } from "~/constanta/dataList";

// Intersection Observer Directive untuk animasi lazy load gambar
</script>

<style scoped></style>
