<template>
  <div>
    <LogoAnimation
      :loading="loading"
      :loading-video-profile="loadingVideoProfile"
      :interaction-required="interactionRequired"
      @load-complete="onSplineLoaded"
    />
    <div v-for="data in dataList" :key="data.id">
      <ImageCard v-if="data.type === 'image'" v-intersect :img="data.link" />
      <YouTubePlayer
        v-else-if="data.type === 'video'"
        :video-src="data.link"
        @loadeddata="onVideoLoadedData"
        @canplaythrough="onVideoCanPlayThrough"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { dataList } from '~/constanta/dataList'

  const loading = ref(true) // State untuk loading
  const loadingVideoProfile = ref(true) // State untuk loading video profile
  const interactionRequired = ref(true) // State untuk layar interaksi

  const onVideoLoadedData = () => {
    console.log('Video data loaded')
  }

  // Event handler for when video can play through without interruptions
  const onVideoCanPlayThrough = () => {
    console.log('Video can play through')
    loadingVideoProfile.value = false // Set loading to false when video can play through
  }
  const removeLogo = () => {
    const observer = new MutationObserver(() => {
      const splineViewer = document.querySelector('spline-viewer')

      if (splineViewer && splineViewer.shadowRoot) {
        const logoElement = splineViewer.shadowRoot.querySelector('#logo')
        if (logoElement) {
          logoElement.remove() // Hapus logo dari Shadow DOM
          observer.disconnect() // Stop observer setelah logo dihapus
        }
      }
    })

    // Pantau perubahan dalam <body> dan subtree
    observer.observe(document.body, { childList: true, subtree: true })
  }

  const handleUserInteraction = () => {
    interactionRequired.value = false // Hilangkan layar interaksi setelah gerakan
    console.log('✅ Akses halaman diberikan setelah interaksi.')
  }

  // Tambahkan event listener untuk mendeteksi gerakan user di scene
  onMounted(() => {
    document.addEventListener('click', handleUserInteraction, { once: true })
  })

  const onSplineLoaded = () => {
    console.log('✨ Spline telah di-render!')
    loading.value = false // Selesai loading setelah 3 detik
    removeLogo() // Hapus logo setelah loading selesai
  }
</script>

<style>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.2);
    border-top: 5px solid #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Interaksi Overlay */
  .interaction-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: bold;
    z-index: 1001;
    text-align: center;
  }

  .interaction-text {
    animation: blink 1.5s infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0.5;
    }
  }

  .interaction-icon {
    font-size: 50px;
    margin-top: 10px;
    animation: bounce 1.5s infinite ease-in-out;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
      opacity: 0.5;
    }
  }
</style>
