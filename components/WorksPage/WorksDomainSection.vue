<template>
  <div ref="el">
    <!-- TITLE -->
    <div class="container pb-10 pt-20 md:pb-14 md:pt-28">
      <p
        class="fade-item mb-3 text-[10px] uppercase tracking-[0.4em] text-primary"
      >
        {{ String(index + 1).padStart(2, '0') }}
      </p>

      <AnimatedText
        :text="domain.title"
        as="h2"
        :ready="visible"
        class="font-display text-5xl md:text-7xl lg:text-8xl"
      />
    </div>

    <!-- HERO AREA -->
    <div class="container mb-16 md:mb-20">
      <div class="group relative aspect-video overflow-hidden">
        <!-- VIDEO / IMAGE -->
        <div ref="img" class="absolute inset-0">
          <!-- IMAGE (default) -->
          <img
            v-if="!isPlaying"
            :src="domain.image"
            class="h-full w-full object-cover"
          />

          <!-- VIDEO -->
          <video
            v-else
            ref="video"
            class="h-full w-full object-cover"
            :src="domain.video"
            autoplay
            controls
          />
        </div>

        <!-- OVERLAY -->
        <div
          v-if="!isPlaying"
          class="absolute inset-0 bg-background/30 transition duration-700 group-hover:bg-background/10"
        />

        <!-- PLAY BUTTON -->
        <button
          v-if="!isPlaying && domain.video"
          class="absolute inset-0 flex items-center justify-center"
          @click="playVideo"
        >
          <div
            class="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-primary"
          >
            <svg
              class="ml-1 h-6 w-6 text-white transition group-hover:text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- DESCRIPTION -->
    <div
      class="container mb-16 grid grid-cols-1 gap-10 md:mb-24 md:gap-16 lg:grid-cols-12"
    >
      <div class="lg:col-span-5">
        <p class="fade-item leading-relaxed text-muted-foreground">
          {{ domain.longDescription }}
        </p>
      </div>

      <div class="lg:col-span-5 lg:col-start-8">
        <p
          class="mb-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          Capabilities
        </p>

        <ul class="space-y-4">
          <li
            v-for="(cap, i) in domain.capabilities"
            :key="i"
            class="fade-item flex items-center gap-4"
          >
            <span class="h-1 w-1 rounded-full bg-primary" />
            <span class="text-sm">{{ cap }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- PROJECT GRID -->
    <div class="container pb-24 md:pb-32">
      <div class="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        <div
          v-for="(project, i) in domain.projects"
          :key="i"
          class="group relative aspect-[4/3] overflow-hidden"
        >
          <img
            :src="project.image"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div
            class="absolute inset-0 bg-background/50 transition group-hover:bg-background/10"
          />

          <div
            class="absolute bottom-0 translate-y-full p-3 transition group-hover:translate-y-0"
          >
            <p class="font-display text-sm">{{ project.title }}</p>
            <p class="text-xs text-muted-foreground">
              {{ project.client }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useIntersectionObserver } from '@vueuse/core'
  import gsap from 'gsap'
  import type { Domain } from '@/types/global-type'

  defineProps<{
    domain: Domain
    index: number
  }>()

  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  const img = ref<HTMLElement | null>(null)

  const isPlaying = ref(false)
  const video = ref<HTMLVideoElement | null>(null)

  const playVideo = () => {
    isPlaying.value = true

    nextTick(() => {
      video.value?.play()
    })
  }

  useIntersectionObserver(
    el,
    ([entry]) => {
      if (entry.isIntersecting) visible.value = true
    },
    { threshold: 0.2 },
  )

  onMounted(() => {
    if (!el.value || !img.value) return

    // smooth parallax
    gsap.fromTo(
      img.value,
      { scale: 1.15, y: -80 },
      {
        scale: 0.95,
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: el.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      },
    )

    // fade in content
    gsap.fromTo(
      el.value.querySelectorAll('.fade-item'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.value,
          start: 'top 80%',
        },
      },
    )
  })
</script>
