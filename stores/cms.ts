import { defineStore } from 'pinia'
import { collection, getDocs, query, orderBy, doc, getDoc, deleteDoc } from 'firebase/firestore'
import type { Domain, SocialSettings, HomeSettings, Section } from '@/types/global-type'
import { domains as initialDomains } from '@/constanta/dataList'

export const useCmsStore = defineStore('cms', () => {
  const domains = ref<Domain[]>([])
  const socialSettings = ref<SocialSettings | null>(null)
  const homeSettings = ref<HomeSettings | null>(null)
  const aboutSections = ref<Section[]>([])
  const loading = ref(false)
  const isInitialized = ref(false)

  const fetchSocialSettings = async () => {
    try {
      const { $firebase } = useNuxtApp() as any
      const docRef = doc($firebase.db, 'settings', 'social')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data() as SocialSettings
        socialSettings.value = {
          ...data,
          playlists: data.playlists || []
        }
      }
    } catch (err) {
      console.error('Error fetching social settings:', err)
    }
  }

  const fetchHomeSettings = async () => {
    try {
      const { $firebase } = useNuxtApp() as any
      const docRef = doc($firebase.db, 'settings', 'home')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data() as HomeSettings
        homeSettings.value = {
          ...data,
          heroVideo: optimizeVideoAggressive(data.heroVideo)
        }
      }
    } catch (err) {
      console.error('Error fetching home settings:', err)
    }
  }

  const fetchAboutSections = async () => {
    try {
      const { $firebase } = useNuxtApp() as any
      const q = query(collection($firebase.db, 'about_sections'))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        aboutSections.value = querySnapshot.docs.map(doc => doc.data() as Section)
      }
    } catch (err) {
      console.error('Error fetching about sections:', err)
    }
  }

  // HELPER: Optimasi URL Cloudinary & Pembersihan Aset Lokal
  const optimizeUrl = (url?: string | null) => {
    if (!url) return ''
    
    const isLocal = typeof url === 'string' && (url.includes('/_nuxt/') || url.includes('@/assets/'))
    if (isLocal) return ''

    if (!url.includes('cloudinary.com')) return url
    if (url.includes('/f_auto,q_auto/')) return url
    return url.replace('/upload/', '/upload/f_auto,q_auto/')
  }

  // HELPER: Optimasi Video Agresif (Mendukung Responsif)
  const optimizeVideoAggressive = (url?: string | null, width = 1280) => {
    if (!url || !url.includes('cloudinary.com')) return url || ''
    
    const bitrate = width <= 640 ? '1m' : '1.5m'
    const transformation = `f_auto,q_60,w_${width},br_${bitrate}`

    // Bersihkan transformasi lama jika ada untuk mencegah duplikasi
    if (url.includes('/upload/')) {
      const parts = url.split('/upload/')
      // Ambil bagian setelah /upload/, tapi buang folder transformasi jika ada (ada di antara dua slash pertama)
      const afterUpload = parts[1].includes('/') && !parts[1].startsWith('v') 
        ? parts[1].substring(parts[1].indexOf('/') + 1)
        : parts[1]
      
      return `${parts[0]}/upload/${transformation}/${afterUpload}`
    }
    
    return url
  }

  const fetchDomains = async () => {
    // Jika sudah ada data, jangan fetch lagi
    if (isInitialized.value) return

    loading.value = true
    try {
      const { $firebase } = useNuxtApp() as any
      const q = query(collection($firebase.db, 'domains'), orderBy('id', 'asc'))
      
      // Ambil semua data pengaturan dan domain secara PARALEL agar jauh lebih cepat
      const [_, __, ___, querySnapshot] = await Promise.all([
        fetchSocialSettings(),
        fetchHomeSettings(),
        fetchAboutSections(),
        getDocs(q)
      ])
      
      if (querySnapshot.empty) {
        // Fallback ke data statis jika Firestore kosong
        domains.value = initialDomains
      } else {
        const rawDocs = querySnapshot.docs.map(doc => doc.data() as Domain)
        
        // Terpakan optimasi otomatis pada setiap aset
        domains.value = rawDocs.map(domain => ({
          ...domain,
          image: optimizeUrl(domain.image),
          video: optimizeUrl(domain.video),
          mainVideo: optimizeUrl(domain.mainVideo),
          projects: domain.projects?.map(p => ({
            ...p,
            image: optimizeUrl(p.image)
          })) || []
        }))

        isInitialized.value = true
      }
      
      // Pastikan status inisialisasi diset untuk branch fallback juga
      isInitialized.value = true
    } catch (err) {
      console.error('Error fetching CMS data:', err)
      // Fallback fallback
      domains.value = initialDomains
    } finally {
      loading.value = false
    }
  }

  return {
    domains,
    socialSettings,
    homeSettings,
    aboutSections,
    loading,
    fetchDomains,
    fetchSocialSettings,
    fetchHomeSettings,
    fetchAboutSections,
    optimizeVideoAggressive,
    isInitialized
  }
})
