<template>
  <div>
    <div class="page-curtain fixed inset-0 z-[60] bg-primary" />
    <slot />
  </div>
</template>

<script setup lang="ts">
  import gsap from 'gsap'

  const emit = defineEmits(['done'])

  onMounted(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        emit('done')
      },
    })

    tl.to('.page-curtain', {
      scaleY: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      transformOrigin: 'top',
    })
  })
</script>
