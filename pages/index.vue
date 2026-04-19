<template>
  <PageTransition @done="pageReady = true">
    <MainPageHeroSection :ready="pageReady" />
    <MainPagePositioningSection :ready="pageReady" />

    <MainPageDomainSection
      v-for="(domain, i) in domains"
      :key="domain.slug"
      :domain="domain"
      :index="i"
      :ready="pageReady"
    />

    <MainPageSelectedWorkSection :ready="pageReady" />
  </PageTransition>
</template>

<script setup lang="ts">
  import { useCmsStore } from '@/stores/cms'
  import { storeToRefs } from 'pinia'

  const cmsStore = useCmsStore()
  const { domains } = storeToRefs(cmsStore)
  const pageReady = ref(false)

  onMounted(async () => {
    await cmsStore.fetchDomains()
  })
</script>
