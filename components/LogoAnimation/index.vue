<template>
  <div>
    <!-- Loading Screen -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner" />
    </div>

    <!-- Layar Interaktif Setelah Loading -->
    <div v-if="interactionRequired && !loading" class="interaction-overlay">
      <div>
        <p class="interaction-text">TAP SCREEN</p>
        <Icon
          name="material-symbols:touch-app-outline"
          class="interaction-icon"
        />
      </div>
    </div>

    <!-- Spline Viewer -->
    <spline-viewer
      v-show="!interactionRequired"
      ref="splineViewer"
      url="https://prod.spline.design/4sjtweJtjCY2CpmN/scene.splinecode"
      events-target="global"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const loading = ref(true); // State untuk loading
const interactionRequired = ref(true); // State untuk layar interaksi

const removeLogo = () => {
  const observer = new MutationObserver(() => {
    const splineViewer = document.querySelector("spline-viewer");

    if (splineViewer && splineViewer.shadowRoot) {
      const logoElement = splineViewer.shadowRoot.querySelector("#logo");
      if (logoElement) {
        logoElement.remove(); // Hapus logo dari Shadow DOM
        observer.disconnect(); // Stop observer setelah logo dihapus
      }
    }
  });

  // Pantau perubahan dalam <body> dan subtree
  observer.observe(document.body, { childList: true, subtree: true });
};

onMounted(() => {
  console.log("⌛ Menunggu Spline di-render...");

  // Simulasi loading sebelum Spline muncul
  setTimeout(() => {
    loading.value = false; // Selesai loading setelah 3 detik
    removeLogo(); // Hapus logo setelah loading selesai
  }, 3000);
});

// Fungsi untuk menangani gerakan dan membuka akses halaman
const handleUserInteraction = () => {
  interactionRequired.value = false; // Hilangkan layar interaksi setelah gerakan
  console.log("✅ Akses halaman diberikan setelah interaksi.");
};

// Tambahkan event listener untuk mendeteksi gerakan user di scene
onMounted(() => {
  document.addEventListener("mousemove", handleUserInteraction, { once: true });
  document.addEventListener("touchmove", handleUserInteraction, { once: true });
});
</script>

<style scoped>
/* Loading Screen Styling */
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
