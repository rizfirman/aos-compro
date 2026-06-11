<template>
  <div class="admin-layout bg-background min-h-screen text-foreground font-sans">
    <!-- Global UI Systems -->
    <UIAppNotification />
    <UIAppModal />
    
    <slot />
  </div>
</template>

<script setup>
import UIAppNotification from '@/components/UI/AppNotification.vue'
import UIAppModal from '@/components/UI/AppModal.vue'
</script>

<style scoped>
.admin-layout {
  /* Memastikan tidak ada interferensi style dari luar */
  position: relative;
  z-index: 1;
}
</style>
