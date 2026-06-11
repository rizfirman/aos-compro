<template>
  <div class="space-y-4">
    <label class="text-[10px] uppercase tracking-widest text-muted-foreground">{{ label }}</label>
    
    <div class="aspect-video bg-foreground/5 border border-dashed border-border flex flex-col items-center justify-center relative overflow-hidden group">
      <!-- Image Preview -->
      <img 
        v-if="type === 'image' && modelValue" 
        :key="'img-' + modelValue"
        :src="modelValue" 
        class="h-full w-full object-cover" 
      />
      
      <!-- Video Preview -->
      <video 
        v-else-if="type === 'video' && modelValue" 
        :key="'vid-' + modelValue"
        :src="modelValue" 
        class="h-full w-full object-cover" 
        autoplay 
        loop 
        muted 
      />
      
      <!-- Placeholder -->
      <div v-else :key="'placeholder-' + type" class="text-xs text-muted-foreground text-center p-4">
        No {{ type }} uploaded
      </div>

      <!-- Upload Button Overlay -->
      <div class="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <input 
          type="file" 
          :accept="accept || (type === 'video' ? 'video/webm' : 'image/*')" 
          class="hidden" 
          :id="'upload-' + uid" 
          :disabled="isUploading"
          @change="handleFileChange" 
        />
        <label :for="'upload-' + uid" 
          class="cursor-pointer border border-foreground/20 px-4 py-2 text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary"
          :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': isUploading }"
        >
          {{ isUploading ? 'Uploading...' : 'Upload ' + (type === 'video' ? 'Video' : 'Image') }}
        </label>
      </div>

      <!-- Progress Bar -->
      <div v-if="isUploading" class="absolute bottom-0 left-0 right-0 h-1 bg-foreground/10 z-10">
        <div class="h-full bg-primary transition-all duration-300" :style="{ width: uploadProgress + '%' }"></div>
      </div>
    </div>

    <!-- Static URL Display (Read Only) -->
    <div class="p-2 border border-border bg-foreground/[0.02] rounded text-[9px] text-muted-foreground/50 font-mono truncate max-w-full overflow-hidden">
      {{ modelValue || 'No file selected' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUpload } from '@/composables/useUpload'
import { useUiStore } from '@/stores/ui'

const props = defineProps<{
  modelValue?: string | null
  label: string
  type: 'image' | 'video'
  accept?: string
  maxSizeMb?: number
}>()

const emit = defineEmits(['update:modelValue'])
const ui = useUiStore()
const { performUpload } = useUpload()

const uid = Math.random().toString(36).substring(2, 9)
const isUploading = ref(false)
const uploadProgress = ref(0)

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Validation: Size
  const max = (props.maxSizeMb || (props.type === 'image' ? 5 : 100)) * 1024 * 1024
  if (file.size > max) {
    ui.notify(`File terlalu besar (Maks ${props.maxSizeMb || (props.type === 'image' ? 5 : 100)}MB).`, 'error')
    return
  }

  // Validation: Webm for Video
  if (props.type === 'video') {
    const isWebm = file.type === 'video/webm' || file.name.toLowerCase().endsWith('.webm')
    if (!isWebm) {
      ui.notify('Format video wajib .webm untuk performa terbaik.', 'error')
      return
    }
  }

  isUploading.value = true
  uploadProgress.value = 0

  try {
    const url = await performUpload(file, props.type, (p) => {
      uploadProgress.value = p
    })
    emit('update:modelValue', url)
    ui.notify('Upload berhasil!')
  } catch (err: any) {
    console.error('Upload failed:', err)
    ui.notify(err.message || 'Upload gagal!', 'error')
  } finally {
    isUploading.value = false
    uploadProgress.value = 0
  }
}
</script>
