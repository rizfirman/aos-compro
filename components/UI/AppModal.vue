<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'

const uiStore = useUiStore()
const { modal } = storeToRefs(uiStore)

const handleCancel = () => {
  if (modal.value.onCancel) modal.value.onCancel()
  modal.value.show = false
}
</script>

<template>
  <Transition name="modal">
    <div v-if="modal.show" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-background/60 backdrop-blur-sm" @click="handleCancel"></div>
      
      <!-- Modal Content -->
      <div class="relative w-full max-w-md border border-foreground/10 bg-background p-8 shadow-2xl">
        <div class="space-y-6">
          <div class="space-y-2">
            <p class="text-[10px] uppercase tracking-[0.4em] text-primary">System Confirmation</p>
            <h3 class="text-2xl font-display tracking-tight text-foreground">{{ modal.title }}</h3>
          </div>
          
          <p class="text-sm leading-relaxed text-muted-foreground">
            {{ modal.message }}
          </p>

          <div class="flex flex-col gap-3 pt-4">
            <button 
              @click="modal.onConfirm"
              class="w-full bg-foreground text-background py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all"
            >
              Confirm Action
            </button>
            <button 
              @click="handleCancel"
              class="w-full border border-foreground/10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/5 transition-all text-muted-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from .relative {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
