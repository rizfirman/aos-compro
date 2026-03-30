<template>
  <section
    ref="section"
    class="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden"
  >
    <!-- BG -->
    <div ref="bg" class="absolute inset-0">
      <img :src="heroBg" class="h-full w-full object-cover" />
      <div class="bg-background/60 absolute inset-0" />
    </div>

    <!-- GRADIENT -->
    <div
      class="from-background absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t to-transparent"
    />

    <!-- CONTENT -->
    <div ref="content" class="container relative text-center">
      <p
        class="text-muted-foreground mb-10 text-[10px] uppercase tracking-[0.5em]"
      >
        Integrated Visual Production Studio
      </p>

      <div class="overflow-hidden">
        <AnimatedText
          text="Where Visual"
          as="h1"
          class="font-display mb-6 whitespace-nowrap text-[clamp(2.5rem,8vw,8rem)] leading-[0.9]"
          :ready="ready"
        />
      </div>

      <div class="overflow-hidden">
        <AnimatedText
          text="Comes Alive"
          as="h1"
          class="font-display mb-6 whitespace-nowrap text-[clamp(2.5rem,8vw,8rem)] leading-[0.9]"
          :ready="ready"
        />
      </div>

      <p class="text-muted-foreground mx-auto mt-10 max-w-md text-sm">
        Integrated visual systems for screen, stage, and space.
      </p>

      <div class="mt-14">
        <MagneticButton>
          <NuxtLink
            to="/works"
            class="inline-flex items-center gap-3 border px-10 py-5 text-[10px] uppercase"
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
        class="via-primary h-12 w-[1px] bg-gradient-to-b from-transparent to-transparent"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'

  import heroBg from '@/assets/hero-bg.jpg'

  defineProps<{ ready: boolean }>()

  gsap.registerPlugin(ScrollTrigger)

  const section = ref(null)
  const bg = ref(null)
  const content = ref(null)
  const indicator = ref(null)

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
