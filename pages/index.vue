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
  import { domains } from '@/constanta/dataList'

  const pageReady = ref(false)
</script>
