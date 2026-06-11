<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'

const uiStore = useUiStore()
const { notification } = storeToRefs(uiStore)
</script>

<template>
  <Transition name="notification">
    <div v-if="notification.show" 
      class="fixed bottom-10 right-10 z-[100] min-w-[300px] border border-foreground/10 bg-background/80 p-6 backdrop-blur-xl shadow-2xl"
      :class="{
        'border-primary/50': notification.type === 'success',
        'border-red-500/50': notification.type === 'error',
      }"
    >
      <div class="flex items-start gap-4">
        <div class="flex-1">
          <p class="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
            {{ notification.type === 'success' ? 'System Success' : 'System Alert' }}
          </p>
          <p class="text-xs tracking-wide text-foreground leading-relaxed">
            {{ notification.message }}
          </p>
        </div>
        <button @click="notification.show = false" class="text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="lucide:x" size="14" />
        </button>
      </div>
      
      <!-- Progress Bar -->
      <div class="absolute bottom-0 left-0 h-[2px] bg-primary/30 transition-all duration-300 ease-linear"
        :style="{ width: notification.show ? '100%' : '0%' }"
      ></div>
    </div>
  </Transition>
</template>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.95);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
