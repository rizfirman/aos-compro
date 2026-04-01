<template>
  <!-- NAVBAR -->
  <nav
    ref="navRef"
    class="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
    :class="scrolled ? 'nav-blur border-b border-border' : ''"
  >
    <div class="container flex h-20 items-center justify-between md:h-24">
      <!-- LOGO -->
      <MagneticButton>
        <NuxtLink
          to="/"
          class="font-display text-3xl tracking-[0.15em] md:text-4xl"
        >
          AOS
        </NuxtLink>
      </MagneticButton>

      <!-- DESKTOP MENU -->
      <div class="hidden items-center gap-12 md:flex">
        <MagneticButton v-for="item in navItems" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="group relative text-[11px] uppercase tracking-[0.3em] transition-colors duration-300"
            :class="
              route.path === item.path
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            "
          >
            {{ item.label }}

            <span
              class="absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-500"
              :class="
                route.path === item.path ? 'w-full' : 'w-0 group-hover:w-full'
              "
            />
          </NuxtLink>
        </MagneticButton>
      </div>

      <!-- BURGER -->
      <button class="relative z-50 md:hidden" @click="open = !open">
        <div class="flex flex-col gap-1.5">
          <span
            class="block h-[1.5px] w-6 bg-foreground transition-all duration-300"
            :class="open ? 'translate-y-[6px] rotate-45' : ''"
          />
          <span
            class="block h-[1.5px] w-6 bg-foreground transition-all duration-300"
            :class="open ? 'opacity-0' : ''"
          />
          <span
            class="block h-[1.5px] w-6 bg-foreground transition-all duration-300"
            :class="open ? '-translate-y-[6px] -rotate-45' : ''"
          />
        </div>
      </button>
    </div>
  </nav>

  <!-- MOBILE MENU -->
  <div
    v-show="open"
    ref="mobileMenu"
    class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-background"
  >
    <div v-for="item in navItems" :key="item.path" class="menu-item">
      <NuxtLink
        :to="item.path"
        class="font-display text-6xl transition-colors duration-300 hover:text-primary md:text-8xl"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useWindowScroll } from '@vueuse/core'
  import { useRoute } from 'vue-router'
  import gsap from 'gsap'

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Works', path: '/works' },
    { label: 'About', path: '/about' },
  ]

  const open = ref(false)
  const scrolled = ref(false)

  const route = useRoute()

  const navRef = ref<HTMLElement | null>(null)
  const mobileMenu = ref<HTMLElement | null>(null)

  // ✅ scroll detection (VueUse)
  const { y } = useWindowScroll()

  watch(y, (val) => {
    scrolled.value = val > 60
  })

  // ✅ close menu on route change
  watch(
    () => route.path,
    () => {
      open.value = false
      window.scrollTo(0, 0)
    },
  )

  // ✅ initial navbar animation
  onMounted(() => {
    if (!navRef.value) return

    gsap.fromTo(
      navRef.value,
      { y: -100 },
      {
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
    )
  })

  // ✅ mobile menu animation
  watch(open, (val) => {
    if (!mobileMenu.value) return

    if (val) {
      gsap.fromTo(
        mobileMenu.value,
        { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
        {
          clipPath: 'circle(150% at calc(100% - 40px) 40px)',
          duration: 0.7,
          ease: 'power3.out',
        },
      )

      // stagger items
      gsap.fromTo(
        mobileMenu.value.querySelectorAll('.menu-item'),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          delay: 0.2,
          duration: 0.6,
          ease: 'power3.out',
        },
      )
    } else {
      gsap.to(mobileMenu.value, {
        clipPath: 'circle(0% at calc(100% - 40px) 40px)',
        duration: 0.5,
        ease: 'power3.inOut',
      })
    }
  })
</script>
