<script setup lang="ts">
import FilmSurvey from '@/components/FilmSurvey.vue'
</script>

<template>
  <main>
    <Suspense>
      <FilmSurvey />
      <template #fallback> Loading... </template>
    </Suspense>
  </main>
</template>

<style lang="scss" scoped></style>
