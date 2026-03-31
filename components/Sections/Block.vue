<template>
  <section ref="el" class="border-t border-border py-20 md:py-28">
    <div class="container">
      <div class="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-12">
        <!-- LEFT -->
        <div class="lg:col-span-4">
          <p class="mb-3 text-[10px] uppercase tracking-[0.4em] text-primary">
            {{ String(index + 1).padStart(2, '0') }} — {{ section.label }}
          </p>

          <AnimatedText
            :text="section.title"
            as="h2"
            animation="blur"
            :ready="visible && ready"
            class="font-display text-3xl md:text-5xl"
          />
        </div>

        <!-- RIGHT -->
        <p
          class="content font-body leading-[1.8] text-muted-foreground lg:col-span-7 lg:col-start-6"
        >
          {{ section.content }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useIntersectionObserver } from '@vueuse/core'
  import gsap from 'gsap'

  defineProps<{
    section: any
    index: number
    ready: boolean
  }>()

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
      el.value.querySelectorAll('.content'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      },
    )
  })
</script>
