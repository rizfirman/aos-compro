<template>
  <div class="p-8 border border-border bg-foreground/[0.02]">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h3 class="text-xl font-display uppercase tracking-widest text-primary">About Page Sections</h3>
        <p class="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Manage Studio Philosophy & Process</p>
      </div>
      <button 
        @click="save" 
        class="bg-foreground text-background px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        {{ loading ? 'Updating...' : 'Update About Sections' }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="(section, idx) in formData" :key="idx" class="border border-border p-4 space-y-4 flex flex-col">
        <div class="flex justify-between items-center">
          <span class="text-[10px] uppercase tracking-tighter text-primary bg-primary/10 px-2 py-1">{{ section.label }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-[9px] uppercase tracking-widest text-muted-foreground">Title</label>
          <input v-model="section.title" class="w-full bg-foreground/5 border border-border p-2 text-xs outline-none focus:border-primary transition-colors" />
        </div>
        <div class="space-y-2 flex-1 flex flex-col">
          <label class="text-[9px] uppercase tracking-widest text-muted-foreground">Content</label>
          <textarea v-model="section.content" rows="8" class="flex-1 w-full bg-foreground/5 border border-border p-2 text-xs outline-none focus:border-primary transition-colors"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { doc, writeBatch } from 'firebase/firestore'
import type { Section } from '@/types/global-type'
import { useCmsStore } from '@/stores/cms'
import { useUiStore } from '@/stores/ui'

const props = defineProps<{
  initialData: Section[]
}>()

const { $firebase } = useNuxtApp() as any
const ui = useUiStore()
const cmsStore = useCmsStore()

const formData = ref<Section[]>(JSON.parse(JSON.stringify(props.initialData)))
const loading = ref(false)

watch(() => props.initialData, (newVal) => {
  formData.value = JSON.parse(JSON.stringify(newVal))
}, { deep: true })

const save = async () => {
  loading.value = true
  try {
    const batch = writeBatch($firebase.db)
    formData.value.forEach((section, idx) => {
      const docRef = doc($firebase.db, 'about_sections', `section_${idx}`)
      batch.set(docRef, section)
    })
    await batch.commit()
    cmsStore.aboutSections = JSON.parse(JSON.stringify(formData.value))
    ui.notify('About page sections updated!')
  } catch (err: any) {
    console.error(err)
    ui.notify(err.message || 'Gagal menyimpan about sections', 'error')
  } finally {
    loading.value = false
  }
}
</script>
