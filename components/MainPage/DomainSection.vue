<template>
  <section
    ref="el"
    class="group relative flex h-screen min-h-[600px] cursor-pointer items-end overflow-hidden"
  >
    <!-- BG -->
    <div ref="img" class="absolute inset-0">
      <video
        v-if="domain.mainVideo"
        :src="domain.mainVideo"
        autoplay
        loop
        muted
        playsinline
        class="h-full w-full object-cover"
      />
      <img
        v-else
        :src="domain.image"
        :alt="domain.title"
        class="h-full w-full object-cover"
      />
      <div
        class="absolute inset-0 bg-background/55 transition duration-1000 group-hover:bg-background/35"
      />
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/60 to-transparent"
    />

    <!-- CONTENT -->
    <div class="container relative pb-20 md:pb-28">
      <p
        class="content-item mb-4 text-[10px] uppercase tracking-[0.4em] text-primary"
      >
        {{ String(index + 1).padStart(1, '0') }}
      </p>

      <AnimatedText
        :text="domain.title"
        as="h3"
        animation="reveal"
        class="mb-4 font-display text-5xl md:text-7xl lg:text-8xl"
        :ready="ready"
      />

      <p
        class="content-item mb-10 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
      >
        {{ domain.description }}
      </p>

      <div class="content-item">
        <MagneticButton>
          <NuxtLink
            :to="`/works#${domain.slug}`"
            class="group/btn inline-flex items-center gap-3 border px-8 py-4 text-[10px] uppercase tracking-[0.3em] transition-all duration-500"
          >
            View Works
          </NuxtLink>
        </MagneticButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import type { Domain } from '~/types/global-type'

  gsap.registerPlugin(ScrollTrigger)

  defineProps<{
    domain: Domain
    index: number
    ready: boolean
  }>()

  const el = ref<HTMLElement | null>(null)
  const img = ref<HTMLElement | null>(null)

  onMounted(() => {
    if (!el.value || !img.value) return

    // PARALLAX
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    tl.fromTo(
      img.value,
      {
        y: -100,
        scale: 1.2,
      },
      {
        y: 100,
        scale: 0.95,
        ease: 'none',
      },
    )

    // 🔥 CONTENT REVEAL
    const content = el.value.querySelectorAll('.content-item')

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: el.value,
          start: 'top 70%', // 🔥 mulai saat section masuk
          toggleActions: 'play none none reverse', // scroll up balik lagi
        },
      },
    )
  })
</script>
