<template>
  <div
    ref="el"
    class="inline-block"
    @mousemove="handleMouse"
    @mouseleave="reset"
  >
    <component :is="as" v-bind="$attrs" :class="className">
      <slot />
    </component>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import gsap from 'gsap'

  interface Props {
    className?: string
    as?: 'button' | 'a' | 'div'
    href?: string
    target?: string
    rel?: string
    type?: 'button' | 'submit'
  }

  const props = withDefaults(defineProps<Props>(), {
    className: '',
    as: 'div',
  })

  const el = ref<HTMLElement | null>(null)

  const handleMouse = (e: MouseEvent) => {
    if (!el.value) return

    const rect = el.value.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const x = (e.clientX - cx) * 0.3
    const y = (e.clientY - cy) * 0.3

    gsap.to(el.value, {
      x,
      y,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const reset = () => {
    if (!el.value) return

    gsap.to(el.value, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)', // 🔥 feel spring
    })
  }
</script>
