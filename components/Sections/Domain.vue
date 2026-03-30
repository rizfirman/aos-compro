<template>
  <section
    ref="el"
    class="group relative flex h-screen min-h-[600px] cursor-pointer items-end overflow-hidden"
  >
    <!-- BG -->
    <div ref="img" class="absolute inset-0">
      <img
        :src="domain.image"
        :alt="domain.title"
        class="h-full w-full object-cover"
      />
      <div
        class="bg-background/55 group-hover:bg-background/35 absolute inset-0 transition duration-1000"
      />
    </div>

    <div
      class="from-background via-background/60 absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t to-transparent"
    />

    <!-- CONTENT -->
    <div class="container relative pb-20 md:pb-28">
      <p
        class="content-item text-primary mb-4 text-[10px] uppercase tracking-[0.4em]"
      >
        {{ String(index + 1).padStart(2, '0') }}
      </p>

      <AnimatedText
        :text="domain.title"
        as="h3"
        animation="reveal"
        class="font-display mb-4 text-5xl md:text-7xl lg:text-8xl"
        :ready="ready"
      />

      <p
        class="content-item text-muted-foreground mb-10 max-w-xl text-sm leading-relaxed md:text-base"
      >
        {{ domain.description }}
      </p>

      <div class="content-item">
        <MagneticButton>
          <NuxtLink
            to="/works"
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

  gsap.registerPlugin(ScrollTrigger)

  const props = defineProps<{
    domain: any
    index: number
    ready: boolean
  }>()

  const el = ref<HTMLElement | null>(null)
  const img = ref<HTMLElement | null>(null)

  onMounted(() => {
    if (!el.value || !img.value) return

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
  })
</script>
