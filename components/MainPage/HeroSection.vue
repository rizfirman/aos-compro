<template>
  <section
    ref="section"
    class="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden"
  >
    <!-- BG -->
    <div ref="bg" class="absolute inset-0">
      <video
        :src="heroVideo"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-background/60" />
    </div>

    <!-- GRADIENT -->
    <div
      class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent"
    />

    <!-- CONTENT -->
    <div ref="content" class="container relative translate-y-2 text-center">
      <p
        class="mb-10 font-body text-[10px] uppercase tracking-[0.5em] text-muted-foreground md:text-xs"
      >
        Integrated Visual Production Studio
      </p>

      <div class="overflow-hidden">
        <AnimatedText
          text="Where Visual"
          as="h1"
          class="font-display text-6xl leading-[0.9] tracking-wide text-foreground sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem]"
          :ready="ready"
        />
      </div>

      <!-- <div class="overflow-hidden">
        <div
          class="text-gradient-primary font-display text-6xl leading-[0.85] tracking-wide sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem]"
        />
      </div> -->

      <div class="overflow-hidden">
        <AnimatedText
          text="Comes Alive"
          as="h1"
          class="font-display text-6xl leading-[0.9] tracking-wide text-foreground sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem]"
          :ready="ready"
        />
      </div>

      <p
        class="mb-10 font-body text-[10px] uppercase tracking-[0.5em] text-muted-foreground md:text-xs"
      >
        Integrated visual systems for screen, stage, and space.
      </p>

      <div class="mt-14">
        <MagneticButton>
          <NuxtLink
            to="/works"
            class="inline-flex items-center gap-3 border px-10 py-5 font-display text-[20px] uppercase"
          >
            Explore Works
          </NuxtLink>
        </MagneticButton>
      </div>
    </div>

    <!-- SCROLL INDICATOR -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2">
      <div
        ref="indicator"
        class="h-12 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'
  import { useCmsStore } from '@/stores/cms'
  import { storeToRefs } from 'pinia'



  import { useWindowSize } from '@vueuse/core'

  defineProps<{ ready: boolean }>()

  const { width } = useWindowSize()
  const cmsStore = useCmsStore()
  const { homeSettings } = storeToRefs(cmsStore)

  gsap.registerPlugin(ScrollTrigger)

  const section = ref(null)
  const bg = ref(null)
  const content = ref(null)
  const indicator = ref(null)

  const isMobile = computed(() => width.value > 0 && width.value < 768)

  const heroVideo = computed(() => {
    const rawUrl = homeSettings.value?.heroVideo || ''
    return cmsStore.optimizeVideoAggressive(rawUrl, isMobile.value ? 640 : 1280)
  })

  onMounted(() => {
    // PARALLAX BG
    gsap.to(bg.value, {
      y: 300,
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // FADE OUT CONTENT
    gsap.to(content.value, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top top',
        end: '60% top',
        scrub: true,
      },
    })

    // SCROLL INDICATOR LOOP
    gsap.to(indicator.value, {
      y: 12,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut',
    })
  })
</script>
