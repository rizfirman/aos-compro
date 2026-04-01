<template>
  <footer ref="el" class="border-t border-border">
    <div class="container py-16 md:py-24">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
        <!-- LOGO -->
        <div class="footer-item">
          <MagneticButton>
            <NuxtLink to="/" class="font-display text-4xl tracking-[0.15em]">
              AOS
            </NuxtLink>
          </MagneticButton>

          <p
            class="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground"
          >
            Integrated visual production studio.
            <br />
            Screen. Stage. Space.
          </p>
        </div>

        <!-- NAVIGATION -->
        <div class="footer-item">
          <p
            class="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Navigation
          </p>

          <div class="flex flex-col gap-3">
            <NuxtLink
              to="/"
              class="text-sm text-foreground/70 transition-all duration-300 hover:tracking-wider hover:text-foreground"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/works"
              class="text-sm text-foreground/70 transition-all duration-300 hover:tracking-wider hover:text-foreground"
            >
              Works
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-sm text-foreground/70 transition-all duration-300 hover:tracking-wider hover:text-foreground"
            >
              About
            </NuxtLink>
          </div>
        </div>

        <!-- CONNECT -->
        <div class="footer-item">
          <p
            class="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Connect
          </p>

          <div class="flex flex-col gap-3">
            <a
              href="mailto:aosthetics@gmail.com"
              class="text-sm text-foreground/70 transition-all duration-300 hover:tracking-wider hover:text-foreground"
            >
              aosthetics@gmail.com
            </a>

            <a
              href="https://instagram.com/aos.thetics"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-foreground/70 transition-all duration-300 hover:tracking-wider hover:text-foreground"
            >
              Instagram
            </a>

            <a
              href="https://youtube.com/@aosthetics"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-foreground/70 transition-all duration-300 hover:tracking-wider hover:text-foreground"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      <!-- divider -->
      <div class="glow-line mb-8 mt-16" />

      <!-- copyright -->
      <p class="text-xs tracking-wide text-muted-foreground">
        © {{ new Date().getFullYear() }} AOS Studio. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { useIntersectionObserver } from '@vueuse/core'
  import gsap from 'gsap'

  const el = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  // detect in-view
  useIntersectionObserver(
    el,
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    },
    { threshold: 0.2 },
  )

  // animation trigger
  watchEffect(() => {
    if (!isVisible.value || !el.value) return

    const items = el.value.querySelectorAll('.footer-item')

    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      },
    )
  })
</script>
