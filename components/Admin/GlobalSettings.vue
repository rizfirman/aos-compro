<template>
  <div class="p-8 border border-border bg-foreground/[0.02]">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h3 class="text-xl font-display uppercase tracking-widest text-primary">Global Settings</h3>
        <p class="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Manage Social Media & Footer Links</p>
      </div>
      <button 
        @click="save" 
        class="bg-foreground text-background px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        {{ loading ? 'Updating...' : 'Update Global Settings' }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="space-y-3">
        <label class="text-[10px] uppercase tracking-widest text-muted-foreground">Instagram URL</label>
        <input v-model="formData.instagram" type="text" placeholder="https://instagram.com/..." class="w-full bg-foreground/5 border border-border p-3 text-xs outline-none focus:border-primary transition-colors" />
      </div>
      <div class="space-y-3">
        <label class="text-[10px] uppercase tracking-widest text-muted-foreground">YouTube URL</label>
        <input v-model="formData.youtube" type="text" placeholder="https://youtube.com/@..." class="w-full bg-foreground/5 border border-border p-3 text-xs outline-none focus:border-primary transition-colors" />
      </div>
      <div class="space-y-3">
        <label class="text-[10px] uppercase tracking-widest text-muted-foreground">Studio Email</label>
        <input v-model="formData.email" type="email" placeholder="hello@studio.com" class="w-full bg-foreground/5 border border-border p-3 text-xs outline-none focus:border-primary transition-colors" />
      </div>
    </div>

    <!-- PLAYLISTS SETTINGS -->
    <div class="mt-10 pt-10 border-t border-border">
      <div class="flex justify-between items-center mb-6">
        <label class="text-[10px] uppercase tracking-widest text-muted-foreground">YouTube Archives (Max 6)</label>
        <button 
          @click="addPlaylist" 
          v-if="formData.playlists.length < 6"
          class="text-[18px] text-muted-foreground hover:text-primary transition-colors"
          title="Add Playlist"
        >+</button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(pl, idx) in formData.playlists" :key="idx" class="flex gap-2 items-start bg-foreground/5 p-4 border border-border">
          <div class="flex-1 space-y-2">
            <input v-model="pl.title" placeholder="Playlist Title" class="w-full bg-background border border-border p-2 text-[10px] outline-none" />
            <input v-model="pl.url" placeholder="YouTube Playlist URL" class="w-full bg-background border border-border p-2 text-[10px] outline-none" />
          </div>
          <button @click="removePlaylist(idx)" class="text-muted-foreground hover:text-red-500 p-1">×</button>
        </div>
      </div>
      
      <div v-if="formData.playlists.length === 0" class="text-center py-6 border border-dashed border-border text-[10px] uppercase tracking-widest text-muted-foreground">
        No playlists added
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { doc, setDoc } from 'firebase/firestore'
import type { SocialSettings } from '@/types/global-type'
import { useCmsStore } from '@/stores/cms'
import { useUiStore } from '@/stores/ui'

const props = defineProps<{
  initialData: SocialSettings
}>()

const { $firebase } = useNuxtApp() as any
const ui = useUiStore()
const cmsStore = useCmsStore()

const formData = ref<SocialSettings>({ ...props.initialData })
const loading = ref(false)

// Sync form with initialData when it updates from parent
watch(() => props.initialData, (newVal) => {
  formData.value = { ...newVal }
}, { deep: true })

const addPlaylist = () => {
  if (formData.value.playlists.length < 6) {
    formData.value.playlists.push({ title: '', url: '' })
  }
}

const removePlaylist = (idx: number) => {
  formData.value.playlists.splice(idx, 1)
}

const save = async () => {
  loading.value = true
  try {
    const docRef = doc($firebase.db, 'settings', 'social')
    await setDoc(docRef, formData.value)
    cmsStore.socialSettings = { ...formData.value }
    ui.notify('Global settings updated!')
  } catch (err: any) {
    console.error(err)
    ui.notify(err.message || 'Gagal menyimpan social settings', 'error')
  } finally {
    loading.value = false
  }
}
</script>
