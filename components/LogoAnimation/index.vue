<template>
  <div>
    <!-- Loading Screen dengan Hitungan Mundur -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner" />
    </div>

    <!-- Spline Viewer -->
    <spline-viewer
      v-else
      ref="splineViewer"
      url="https://prod.spline.design/4sjtweJtjCY2CpmN/scene.splinecode"
      events-target="global"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const loading = ref(true); // State untuk loading
const countdown = ref(3); // Hitungan mundur

const removeLogo = () => {
  const splineViewer = document.querySelector("spline-viewer");
  if (splineViewer && splineViewer.shadowRoot) {
    const logoElement = splineViewer.shadowRoot.querySelector("#logo");
    if (logoElement) {
      logoElement.style.display = "none"; // Sembunyikan logo tanpa menghapusnya
      console.log("✅ Logo berhasil disembunyikan.");
    }
  }
};

// Hitungan mundur sebelum loading selesai
const startCountdown = () => {
  const timer = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value -= 1;
    } else {
      clearInterval(timer);
      loading.value = false; // Matikan loading setelah countdown selesai
    }
  }, 1000); // Kurangi 1 setiap 1 detik
};

// Watch untuk mendeteksi perubahan loading dan menghapus logo setelah selesai
watch(loading, (newValue) => {
  if (!newValue) {
    setTimeout(removeLogo, 100); // Beri waktu 1 detik sebelum menghapus logo
  }
});

onMounted(() => {
  startCountdown(); // Mulai hitungan mundur saat komponen dimuat
});
</script>

<style scoped>
/* Loading Screen Styling */
/* Latar belakang gelap semi-transparan */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black; /* Latar belakang gelap */
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

/* Keyframes untuk animasi berputar */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
