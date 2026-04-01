<template>
  <PageTransition>
    <!-- HERO -->
    <section class="pb-24 pt-32 md:pb-32 md:pt-44">
      <div class="container">
        <p class="mb-4 text-[10px] uppercase tracking-[0.4em] text-primary">
          About
        </p>

        <AnimatedText
          text="The Studio Behind the Visual"
          as="h1"
          animation="kinetic"
          :delay="0.4"
          :ready="ready"
          class="max-w-5xl font-display text-5xl leading-[0.9] md:text-7xl lg:text-8xl xl:text-9xl"
        />
      </div>
    </section>

    <!-- SECTIONS -->
    <AboutPageBlockSection
      v-for="(section, i) in sections"
      :key="section.label"
      :section="section"
      :index="i"
      :ready="ready"
    />

    <!-- CONTACT -->
    <AboutPageContactSection :ready="ready" />
  </PageTransition>
</template>

<script setup lang="ts">
  import { sections } from '@/constanta/dataList'

  const ready = ref(false)

  onMounted(() => {
    // sync dengan page transition
    setTimeout(() => {
      ready.value = true
    }, 900)
  })
</script>
