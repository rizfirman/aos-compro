<template>
  <div class="space-y-10 p-10 border border-border bg-foreground/[0.01]">
    <!-- DOMAIN HEADER -->
    <div class="flex items-center justify-between gap-6 border-b border-border pb-8">
      <div class="flex items-center gap-6 flex-1">
        <span class="text-3xl font-display text-muted-foreground/30">{{ String(domain.id).padStart(2, '0') }}</span>
        <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-1">
            <label class="text-[9px] uppercase text-muted-foreground">Title</label>
            <input v-model="localDomain.title" class="w-full bg-background border border-border px-3 py-2 font-display text-2xl outline-none focus:border-primary" />
          </div>
          <div class="space-y-1">
            <label class="text-[9px] uppercase text-muted-foreground">Label</label>
            <input v-model="localDomain.label" class="w-full bg-background border border-border px-3 py-2 text-xs outline-none focus:border-primary" />
          </div>
          <div class="space-y-1">
            <label class="text-[9px] uppercase text-muted-foreground">Slug (for URL)</label>
            <input v-model="localDomain.slug" class="w-full bg-background border border-border px-3 py-2 text-xs outline-none focus:border-primary" placeholder="auto-generated" />
          </div>
        </div>
      </div>
      <button @click="$emit('delete', localDomain)" class="text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30 px-4 py-2 transition-all">
        Delete Section
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <!-- LEFT: BASIC INFO -->
      <div class="lg:col-span-4 space-y-6">
        <div class="space-y-2">
          <label class="text-[10px] uppercase tracking-widest text-muted-foreground">Short Description</label>
          <textarea 
            v-model="localDomain.description" 
            rows="3" 
            class="w-full bg-foreground/5 border border-border p-4 text-sm focus:border-primary outline-none transition-colors"
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] uppercase tracking-widest text-muted-foreground">Long Description (Max 250 words)</label>
          <textarea 
            v-model="localDomain.longDescription" 
            rows="6" 
            class="w-full bg-foreground/5 border border-border p-4 text-sm focus:border-primary outline-none transition-colors"
          ></textarea>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-[10px] uppercase tracking-widest text-muted-foreground">Capabilities (Max 6)</label>
            <button @click="addCapability" class="text-[18px] text-muted-foreground hover:text-primary">+</button>
          </div>
          <div class="space-y-2">
            <div v-for="(cap, idx) in localDomain.capabilities" :key="idx" class="flex gap-2">
              <input 
                v-model="localDomain.capabilities[idx]" 
                type="text" 
                class="flex-1 bg-foreground/5 border border-border px-3 py-2 text-sm focus:border-primary outline-none"
              />
              <button @click="localDomain.capabilities.splice(idx, 1)" class="text-muted-foreground hover:text-red-500">×</button>
            </div>
          </div>
        </div>
      </div>

      <!-- CENTER: MEDIA ASSETS -->
      <div class="lg:col-span-8 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AdminMediaUpload 
            v-model="localDomain.mainVideo"
            label="Main Video (Cloudinary URL)"
            type="video"
          />
          <AdminMediaUpload 
            v-model="localDomain.image"
            label="Thumbnail Image (Cloudinary URL)"
            type="image"
          />
        </div>

        <!-- PROJECTS TABLE -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-border pb-2">
            <label class="text-[10px] uppercase tracking-widest text-muted-foreground">Projects (Max 10)</label>
            <button 
              @click="addProject" 
              class="text-[10px] uppercase tracking-widest text-primary hover:underline disabled:opacity-30 disabled:no-underline" 
              :disabled="localDomain.projects.length >= 10 || isUploading"
            >
              + Add Project
            </button>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
             <div v-for="(project, pIdx) in localDomain.projects" :key="pIdx" class="relative group aspect-[4/3] bg-foreground/5 border border-border overflow-hidden">
              <img v-if="project.image" :src="project.image" class="h-full w-full object-cover" />
              <div v-else class="h-full w-full flex items-center justify-center text-[8px] text-muted-foreground">No Img</div>
              
              <div class="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                 <input v-model="project.title" placeholder="Title" class="w-full bg-transparent border-b border-border text-[9px] outline-none" />
                 <input v-model="project.client" placeholder="Client" class="w-full bg-transparent border-b border-border text-[8px] outline-none text-muted-foreground" />
                 <div class="flex justify-between items-center">
                   <input 
                      type="file" 
                      class="hidden" 
                      :id="'pimg' + localDomain.id + pIdx" 
                      :disabled="isUploading"
                      @change="e => uploadProjectImg(e, project, pIdx)" 
                    />
                    <label :for="'pimg' + localDomain.id + pIdx" 
                      class="cursor-pointer text-[8px] uppercase tracking-tighter hover:text-primary"
                      :class="{ 'opacity-30 cursor-not-allowed pointer-events-none': isUploading }"
                    >
                      {{ uploadingPIdx === pIdx ? '...' : 'Upload' }}
                    </label>
                    <button @click="localDomain.projects.splice(pIdx, 1)" class="text-[8px] text-red-500 uppercase">Delete</button>
                 </div>
              </div>
              <!-- Project Progress Bar -->
              <div v-if="uploadingPIdx === pIdx" class="absolute bottom-0 left-0 right-0 h-1 bg-foreground/10 z-10">
                <div class="h-full bg-primary transition-all duration-300" :style="{ width: uploadProgress + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SAVE BUTTON -->
    <div class="flex justify-end border-t border-border pt-6">
      <button 
        @click="save" 
        class="bg-foreground text-background px-10 py-4 text-[10px] uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="saving || isUploading"
      >
        {{ saving ? 'Saving Changes...' : 'Save Domain Settings' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import type { Domain } from '@/types/global-type'
import { useUiStore } from '@/stores/ui'
import { useUpload } from '@/composables/useUpload'

const props = defineProps<{
  domain: Domain
}>()

const emit = defineEmits(['delete', 'saved'])
const { $firebase } = useNuxtApp() as any
const ui = useUiStore()
const { performUpload } = useUpload()

const localDomain = ref<Domain & { _orgSlug?: string }>(JSON.parse(JSON.stringify(props.domain)))
const saving = ref(false)
const isUploading = ref(false)
const uploadingPIdx = ref<number | null>(null)
const uploadProgress = ref(0)

// Keep local state in sync if parent updates
watch(() => props.domain, (newVal) => {
  localDomain.value = JSON.parse(JSON.stringify(newVal))
  localDomain.value._orgSlug = newVal.slug
}, { deep: true, immediate: true })

const addCapability = () => {
  if (localDomain.value.capabilities.length < 6) {
    localDomain.value.capabilities.push('')
  }
}

const addProject = () => {
  if (localDomain.value.projects.length < 10) {
    localDomain.value.projects.push({ title: '', client: '', image: '' })
  }
}

const uploadProjectImg = async (e: Event, project: any, pIdx: number) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    ui.notify('File gambar proyek terlalu besar (Maks 5MB).', 'error')
    return
  }

  isUploading.value = true
  uploadingPIdx.value = pIdx
  uploadProgress.value = 0

  try {
    const url = await performUpload(file, 'image', (p) => {
      uploadProgress.value = p
    })
    project.image = url
    ui.notify('Project image updated!')
  } catch (err: any) {
    console.error(err)
    ui.notify(err.message || 'Gagal update gambar project', 'error')
  } finally {
    isUploading.value = false
    uploadingPIdx.value = null
    uploadProgress.value = 0
  }
}

const save = async () => {
  saving.value = true
  try {
    // Generate slug if empty
    if (!localDomain.value.slug) {
      localDomain.value.slug = localDomain.value.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '')
    }

    // Handle slug change
    if (localDomain.value._orgSlug && localDomain.value.slug !== localDomain.value._orgSlug) {
      await deleteDoc(doc($firebase.db, 'domains', localDomain.value._orgSlug))
    }
    
    const { _orgSlug, ...dataToSave } = localDomain.value
    const domainRef = doc($firebase.db, 'domains', localDomain.value.slug)
    await setDoc(domainRef, dataToSave)
    
    localDomain.value._orgSlug = localDomain.value.slug
    ui.notify(`${localDomain.value.title} berhasil disimpan!`)
    emit('saved')
  } catch (err: any) {
    console.error(err)
    ui.notify(err.message || 'Gagal menyimpan perubahan', 'error')
  } finally {
    saving.value = false
  }
}
</script>
