<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="pb-20 pt-32 md:pb-28 md:pt-44">
      <div class="container">
        <p
          class="mb-4 animate-fade-in text-[10px] uppercase tracking-[0.4em] text-primary opacity-0"
        >
          Portfolio
        </p>

        <AnimatedText
          text="Our Works"
          as="h1"
          animation="kinetic"
          :ready="heroReady"
          class="font-display text-6xl leading-[0.85] md:text-8xl lg:text-9xl"
        />

        <p
          class="mt-6 max-w-lg animate-fade-in text-sm text-muted-foreground opacity-0 delay-500"
        >
          Visual systems across screen, stage, and space.
        </p>
      </div>
    </section>

    <!-- ================= DOMAIN ================= -->
    <section
      v-for="domain in domains"
      :key="domain.slug"
      class="border-t border-border"
    >
      <WorksPageWorksDomainSection :domain="domain" :index="domain.id" />
    </section>

    <!-- ================= PLAYLIST ================= -->
    <section class="border-t border-border py-24 md:py-32">
      <div class="container text-center">
        <AnimatedText
          text="Explore Our Visual Archives"
          as="h2"
          animation="blur"
          :ready="true"
          class="mb-6 font-display text-5xl md:text-7xl"
        />

        <p class="mb-14 text-sm text-muted-foreground">
          Watch our full portfolio of work organized by visual domain.
        </p>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          <MagneticButton
            v-for="(pl, i) in cmsStore.socialSettings?.playlists || []"
            :key="i"
            as="a"
            :href="pl.url"
            target="_blank"
            class="group inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-foreground/20 px-8 py-5 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 hover:border-primary hover:text-primary"
          >
            {{ pl.title || 'Visual Archive' }}
          </MagneticButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { useCmsStore } from '@/stores/cms'
  import { storeToRefs } from 'pinia'

  const cmsStore = useCmsStore()
  const { domains } = storeToRefs(cmsStore)

  gsap.registerPlugin(ScrollTrigger)

  /* ================= HERO ================= */
  const heroReady = ref(false)
  const route = useRoute()

  onMounted(async () => {
    // Fetch CMS data
    await cmsStore.fetchDomains()

    setTimeout(() => {
      heroReady.value = true
    }, 700)

    if (route.hash) {
      setTimeout(() => {
        const targetId = route.hash.slice(1)
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 1000)
    }
  })
</script>
