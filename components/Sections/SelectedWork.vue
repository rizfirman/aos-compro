<template>
  <section ref="el" class="py-28 md:py-40">
    <div class="container">
      <!-- HEADER -->
      <div class="mb-16 md:mb-24">
        <p class="text-primary mb-3 text-[10px] uppercase tracking-[0.4em]">
          Selected Work
        </p>

        <AnimatedText
          text="Recent Projects"
          as="h2"
          animation="slide"
          class="font-display text-5xl md:text-7xl"
          :ready="ready"
        />
      </div>

      <!-- PROJECTS -->
      <div class="space-y-6 md:space-y-8">
        <div
          v-for="(project, i) in featured"
          :key="i"
          class="project group relative overflow-hidden"
        >
          <div class="aspect-[21/9] overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-110"
            />
            <div
              class="bg-background/40 group-hover:bg-background/15 absolute inset-0 transition duration-700"
            />
          </div>

          <div
            class="from-background via-background/70 absolute bottom-0 left-0 right-0 bg-gradient-to-t to-transparent p-8 md:p-12"
          >
            <h3 class="font-display text-3xl md:text-5xl">
              {{ project.title }}
            </h3>
            <p class="text-muted-foreground mt-1 text-xs">
              {{ project.client }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-20 text-center">
        <MagneticButton>
          <NuxtLink
            to="/works"
            class="inline-flex items-center gap-3 border px-10 py-5 text-[10px] uppercase tracking-[0.3em] transition-all duration-500"
          >
            View All Works
          </NuxtLink>
        </MagneticButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useIntersectionObserver } from '@vueuse/core'
  import gsap from 'gsap'
  import { domains } from '@/constanta/dataList'

  defineProps<{ ready: boolean }>()

  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)

  const allProjects = domains.flatMap((d) => d.projects.slice(0, 2))
  const featured = allProjects.slice(0, 4)

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
      el.value.querySelectorAll('.project'),
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      },
    )
  })
</script>
