<template>
  <section class="py-36 md:py-52">
    <div ref="el" class="container max-w-5xl">
      <AnimatedText
        text="Structured by Vision."
        as="h2"
        animation="blur"
        class="mb-2 font-display text-5xl leading-[0.9] md:text-7xl lg:text-8xl"
        :ready="ready"
      />

      <AnimatedText
        text="Executed with Precision."
        as="h2"
        animation="blur"
        :delay="0.3"
        class="mb-10 font-display text-5xl leading-[0.9] text-muted-foreground md:text-7xl lg:text-8xl"
        :ready="ready"
      />

      <p
        class="desc max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        AOS operates through structured visual domains and integrated production
        workflows — delivering complete visual ecosystems from concept through
        production to delivery. We work across screen, stage, and space to build
        visual systems that perform at every scale.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useIntersectionObserver } from '@vueuse/core'
  import gsap from 'gsap'

  defineProps<{ ready: boolean }>()

  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)

  useIntersectionObserver(
    el,
    ([entry]) => {
      if (entry.isIntersecting) visible.value = true
    },
    { threshold: 0.2 },
  )

  watch(visible, (val) => {
    if (!val || !el.value) return

    gsap.fromTo(
      el.value.querySelector('.desc'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      },
    )
  })
</script>
