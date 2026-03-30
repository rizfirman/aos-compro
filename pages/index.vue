<template>
  <PageTransition @done="pageReady = true">
    <SectionsHero :ready="pageReady" />
    <SectionsPositioning :ready="pageReady" />

    <SectionsDomain
      v-for="(domain, i) in domains"
      :key="domain.slug"
      :domain="domain"
      :index="i"
      :ready="pageReady"
    />

    <SectionsSelectedWork :ready="pageReady" />
  </PageTransition>
</template>

<script setup lang="ts">
  import { domains } from '@/constanta/dataList'

  definePageMeta({
    layout: 'default',
  })

  const pageReady = ref(false)
</script>
