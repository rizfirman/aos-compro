<template>
  <section ref="el" class="py-28 md:py-40">
    <div class="container">
      <!-- HEADER -->
      <div class="mb-16 md:mb-24">
        <p class="mb-3 text-[10px] uppercase tracking-[0.4em] text-primary">
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
              class="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-background/40 transition duration-700 group-hover:bg-background/15"
            />
          </div>

          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/70 to-transparent p-8 md:p-12"
          >
            <h3 class="font-display text-3xl md:text-5xl">
              {{ project.title }}
            </h3>
            <p class="mt-1 text-xs text-muted-foreground">
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
  import gsap from 'gsap'
  import { useCmsStore } from '@/stores/cms'
  import { storeToRefs } from 'pinia'

  defineProps<{ ready: boolean }>()

  const cmsStore = useCmsStore()
  const { domains } = storeToRefs(cmsStore)

  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)

  // Ambil 2 project awal dari tiap domain, lalu batasi total 4 project
  const allProjects = computed(() => domains.value.flatMap((d) => d.projects.slice(0, 2)))
  const featured = computed(() => allProjects.value.slice(0, 4))

  onMounted(async () => {
    await cmsStore.fetchDomains()
  })

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
