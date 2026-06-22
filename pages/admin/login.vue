<template>
  <div class="flex min-h-screen items-center justify-center bg-background px-4">
    <div class="w-full max-w-md space-y-8 text-center">
      <div class="space-y-2">
        <h1 class="font-display text-4xl tracking-tight text-foreground">
          AOS CMS
        </h1>
        <p class="text-sm text-muted-foreground">
          Masuk untuk mengelola konten website
        </p>
      </div>

      <div class="mt-8">
        <button
          @click="login"
          :disabled="loading"
          class="flex w-full items-center justify-center gap-3 border border-foreground/10 bg-foreground/5 py-4 text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-foreground/10 disabled:opacity-50"
        >
          <Icon v-if="loading" name="lucide:loader-2" class="animate-spin" />
          <Icon v-else name="logos:google-icon" size="18" />
          {{ loading ? 'Sabar ya...' : 'Masuk dengan Google' }}
        </button>
      </div>

      <p v-if="error" class="mt-4 text-xs text-red-500">
        {{ error }}
      </p>

      <NuxtLink to="/" class="mt-10 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
        ← Kembali ke Website
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

  definePageMeta({
    layout: 'admin',
    middleware: ['auth']
  })

  const route = useRoute()
  const { $firebase } = useNuxtApp() as any
  const loading = ref(false)
  const error = ref('')

  onMounted(() => {
    if (route.query.error === 'unauthorized') {
      error.value = 'Gagal login. Pastikan Anda menggunakan email yang diizinkan.'
    }
    if ($firebase.auth.currentUser && route.query.error !== 'unauthorized') {
       navigateTo('/admin')
    }
  })

  const login = async () => {
    loading.value = true
    error.value = ''

    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup($firebase.auth, provider)
      navigateTo('/admin')
    } catch (err: any) {
      console.error('Auth Error:', err)
      error.value = 'Gagal login. Pastikan Anda menggunakan email yang diizinkan.'
      loading.value = false
    }
  }
</script>
