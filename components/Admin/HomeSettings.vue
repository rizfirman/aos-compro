<template>
  <div class="p-8 border border-border bg-foreground/[0.02]">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h3 class="text-xl font-display uppercase tracking-widest text-primary">Homepage Settings</h3>
        <p class="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Manage Hero Banner Video</p>
      </div>
      <button 
        @click="save" 
        class="bg-foreground text-background px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        {{ loading ? 'Updating...' : 'Update Homepage' }}
      </button>
    </div>

    <div class="w-full">
      <AdminMediaUpload 
        v-model="formData.heroVideo"
        label="Hero Video (.webm)"
        type="video"
        accept="video/webm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { doc, setDoc } from 'firebase/firestore'
import type { HomeSettings } from '@/types/global-type'
import { useCmsStore } from '@/stores/cms'
import { useUiStore } from '@/stores/ui'

const props = defineProps<{
  initialData: HomeSettings
}>()

const { $firebase } = useNuxtApp() as any
const ui = useUiStore()
const cmsStore = useCmsStore()

const formData = ref<HomeSettings>({ ...props.initialData })
const loading = ref(false)

watch(() => props.initialData, (newVal) => {
  formData.value = { ...newVal }
}, { deep: true })

const save = async () => {
  loading.value = true
  try {
    const docRef = doc($firebase.db, 'settings', 'home')
    await setDoc(docRef, formData.value)
    cmsStore.homeSettings = { ...formData.value }
    ui.notify('Homepage settings updated!')
  } catch (err: any) {
    console.error(err)
    ui.notify(err.message || 'Gagal menyimpan home settings', 'error')
  } finally {
    loading.value = false
  }
}
</script>
