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
      <WorksDomainSection :domain="domain" :index="domain.id" />
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
          class="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-6"
        >
          <MagneticButton
            v-for="domain in domains"
            :key="domain.slug"
            as="a"
            :href="domain.playlistUrl"
            target="_blank"
            class="group inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-foreground/20 px-8 py-5 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 hover:border-primary hover:text-primary sm:w-auto"
          >
            {{ domain.title }} Playlist
          </MagneticButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  import { domains } from '@/constanta/dataList'
  import WorksDomainSection from '~/components/WorksPage/WorksDomainSection.vue'

  gsap.registerPlugin(ScrollTrigger)

  /* ================= HERO ================= */
  const heroReady = ref(false)

  onMounted(() => {
    setTimeout(() => {
      heroReady.value = true
    }, 700)
  })
</script>
