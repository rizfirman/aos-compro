<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- TOP BAR -->
    <nav class="border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-30">
      <div class="container flex h-16 items-center justify-between px-4">
        <h1 class="font-display text-xl tracking-tight">AOS CMS Dashboard</h1>
        <div class="flex items-center gap-4">
          <span class="text-[10px] uppercase tracking-widest text-muted-foreground">{{ user?.email }}</span>
          <button @click="logout" class="text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors">Logout</button>
        </div>
      </div>
    </nav>

    <div class="container py-10 px-4 max-w-6xl">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
        <div class="h-8 w-8 border-2 border-primary border-t-transparent animate-spin rounded-full"></div>
        <p class="text-[10px] uppercase tracking-widest text-muted-foreground">Memuat data...</p>
      </div>

      <div v-else class="space-y-20">
        <!-- HEADER & MIGRATION TOOL -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-10">
          <div>
            <h2 class="text-3xl font-display mb-2">Content Management</h2>
            <p class="text-sm text-muted-foreground max-w-xl">Kelola visual domain, project, dan aset media secara langsung. Semua perubahan akan langsung terlihat di website utama.</p>
          </div>
          
          <div v-if="dataDomains.length === 0">
            <button 
              @click="migrateData" 
              class="border border-primary/30 px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all text-primary"
            >
              🚀 Migrate Initial Data from Code
            </button>
          </div>
        </div>

        <!-- GLOBAL SETTINGS -->
        <AdminGlobalSettings 
          v-if="socialData" 
          :initial-data="socialData" 
        />

        <!-- HOMEPAGE SETTINGS -->
        <AdminHomeSettings 
          v-if="homeData" 
          :initial-data="homeData" 
        />

        <!-- ABOUT PAGE SECTIONS -->
        <AdminAboutSettings 
          v-if="aboutData.length" 
          :initial-data="aboutData" 
        />

        <!-- DOMAINS EDITOR -->
        <div class="space-y-10">
          <div class="flex justify-between items-center bg-primary/5 p-6 border border-primary/20">
            <div>
              <h3 class="text-xl font-display uppercase tracking-widest text-primary">Domain Sections</h3>
              <p class="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 text-primary/70">Manage Visual Categories (Stage, Screen, etc)</p>
            </div>
            <button 
              @click="createNewDomain" 
              class="bg-primary text-white px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-primary/80 transition-all shadow-lg shadow-primary/20"
            >
              + Add New Domain Section
            </button>
          </div>

          <AdminDomainSection 
            v-for="domain in dataDomains" 
            :key="domain.id" 
            :domain="domain"
            @delete="deleteDomain"
            @saved="fetchData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { collection, getDocs, doc, query, orderBy, writeBatch, deleteDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { domains as initialDomains, sections as initialSections } from '@/constanta/dataList'
import type { Domain, HomeSettings, Section, SocialSettings } from '@/types/global-type'
import { useCmsStore } from '@/stores/cms'
import { useUiStore } from '@/stores/ui'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const { $firebase } = useNuxtApp() as any
const ui = useUiStore()
const cmsStore = useCmsStore()
const user = ref($firebase.auth.currentUser)

const loading = ref(true)
const dataDomains = ref<Domain[]>([])
const socialData = ref<SocialSettings | null>(null)
const homeData = ref<HomeSettings | null>(null)
const aboutData = ref<Section[]>([])

// FETCH DATA
const fetchData = async () => {
  loading.value = true
  try {
    // Fetch Domains
    const q = query(collection($firebase.db, 'domains'), orderBy('id', 'asc'))
    const querySnapshot = await getDocs(q)
    const docs = querySnapshot.docs.map(doc => doc.data() as Domain)
    
    // Auto-cleanup local paths
    dataDomains.value = docs.map(domain => {
      const d = { ...domain } as Domain
      const isLocal = (path: any) => typeof path === 'string' && (path.includes('/_nuxt/') || path.includes('@/assets/'))
      if (isLocal(d.image)) d.image = ''
      if (isLocal(d.video)) d.video = ''
      if (isLocal(d.mainVideo)) d.mainVideo = ''
      if (d.projects) {
        d.projects = d.projects.map(p => ({ ...p, image: isLocal(p.image) ? '' : p.image }))
      }
      return d
    })

    // Fetch Other Settings
    await cmsStore.fetchDomains()
    
    // Gunakan data dari store, jika kosong buatkan struktur template default agar form tetap muncul
    socialData.value = cmsStore.socialSettings 
      ? { ...cmsStore.socialSettings }
      : { email: '', instagram: '', youtube: '', playlists: [] }

    homeData.value = cmsStore.homeSettings 
      ? { ...cmsStore.homeSettings }
      : {
          heroTitle1: '',
          heroTitle2: '',
          heroSubtitle: '',
          heroVideo: '',
          positioningTitle1: '',
          positioningTitle2: '',
          positioningDesc: ''
        }

    if (cmsStore.aboutSections.length > 0) aboutData.value = [...cmsStore.aboutSections]
    else aboutData.value = JSON.parse(JSON.stringify(initialSections))
  } catch (err) {
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

// DELETE DOMAIN
const deleteDomain = async (domain: Domain) => {
  ui.confirm(
    'Delete Section',
    `Apakah Anda yakin ingin menghapus section "${domain.title}"? Tindakan ini tidak dapat dibatalkan.`,
    async () => {
      try {
        if (domain.slug) {
          await deleteDoc(doc($firebase.db, 'domains', domain.slug))
        }
        await fetchData()
        ui.notify('Section deleted successfully')
      } catch (err: any) {
        console.error(err)
        ui.notify(err.message || 'Gagal menghapus domain', 'error')
      }
    }
  )
}

// CREATE NEW DOMAIN
const createNewDomain = () => {
  const maxId = dataDomains.value.length > 0 ? Math.max(...dataDomains.value.map(d => d.id)) : 0
  const newDomain: Domain = {
    id: maxId + 1,
    title: 'New Domain Section',
    label: '0' + (maxId + 1),
    slug: '',
    image: '',
    description: 'Short description for this domain.',
    longDescription: 'Detailed description for this domain.',
    capabilities: ['Capability 1'],
    projects: []
  }
  dataDomains.value.push(newDomain)
  ui.notify('New domain added to list. Please configure and save.')
}

// MIGRATE DATA
const migrateData = async () => {
  ui.confirm(
    'Migrate Initial Data',
    'Ini akan menimpa data yang ada dengan data default dari kodingan. Lanjutkan?',
    async () => {
      try {
        const batch = writeBatch($firebase.db)
        
        // Migrate Domains
        initialDomains.forEach(domain => {
          const { playlistUrl, ...d } = domain as any
          const docRef = doc($firebase.db, 'domains', d.slug)
          batch.set(docRef, d)
        })

        // Migrate Social
        const socialRef = doc($firebase.db, 'settings', 'social')
        batch.set(socialRef, {
          email: 'aosthetics@gmail.com',
          instagram: 'https://instagram.com/aos.thetics',
          youtube: 'https://youtube.com/@aosthetics',
          playlists: []
        })

        // Migrate Home
        const homeRef = doc($firebase.db, 'settings', 'home')
        batch.set(homeRef, {
          heroTitle1: 'Where Visual',
          heroTitle2: 'Comes Alive',
          heroSubtitle: 'Integrated visual systems for screen, stage, and space.',
          heroVideo: 'https://res.cloudinary.com/dfm769y9f/video/upload/v1713296068/aos/hero-bg_f8u1zv.webm',
          positioningTitle1: 'Structured by Vision.',
          positioningTitle2: 'Executed with Precision.',
          positioningDesc: 'AOS operates through structured visual domains...'
        })

        // Migrate About Sections
        initialSections.forEach((section, idx) => {
          const docRef = doc($firebase.db, 'about_sections', `section_${idx}`)
          batch.set(docRef, section)
        })

        await batch.commit()
        await fetchData()
        ui.notify('Data initial berhasil dimigrasi ke Firestore!')
      } catch (err: any) {
        console.error(err)
        ui.notify(err.message || 'Migration failed', 'error')
      }
    }
  )
}

// LOGOUT
const logout = async () => {
  try {
    await signOut($firebase.auth)
    navigateTo('/admin/login')
  } catch (err: any) {
    ui.notify(err.message, 'error')
  }
}
</script>
