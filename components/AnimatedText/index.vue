<template>
  <Tag ref="el" :class="className">
    <span
      v-for="(item, i) in items"
      :key="i"
      class="inline-block overflow-hidden"
    >
      <span class="animated-item inline-block">
        {{ item }}
        <span v-if="splitBy === 'word'">&nbsp;</span>
      </span>
    </span>
  </Tag>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed, watch, nextTick } from 'vue'
  import gsap from 'gsap'

  interface Props {
    text: string
    className?: string
    delay?: number
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
    splitBy?: 'word' | 'char'
    ready?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    className: '',
    delay: 0,
    as: 'h1',
    splitBy: 'word',
    ready: false,
  })

  const el = ref<HTMLElement | null>(null)
  const Tag = computed(() => props.as)

  const items = computed(() => {
    return props.splitBy === 'char'
      ? props.text.split('')
      : props.text.split(' ')
  })

  // 🔥 INIT HIDDEN STATE ASAP
  onMounted(async () => {
    await nextTick()

    if (!el.value) return
    const spans = el.value.querySelectorAll('.animated-item')

    // 🔥 ini kunci: hide dari awal
    gsap.set(spans, {
      y: 100,
      opacity: 0,
    })
  })

  // 🔥 animate setelah ready
  watch(
    () => props.ready,
    async (val) => {
      if (!val) return

      await nextTick()

      if (!el.value) return
      const spans = el.value.querySelectorAll('.animated-item')

      gsap.to(spans, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: props.splitBy === 'char' ? 0.03 : 0.08,
        delay: props.delay,
      })
    },
  )
</script>
