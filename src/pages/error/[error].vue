<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <h1>{{ route.params.error }}</h1>
    <h2 v-if="route.params.error === '500'" class="description">
      Plot Twist! Our server is improvising. Unfortunately, we're experiencing some technical
      difficulties. Please stay tuned while we resolve this unexpected storyline.
    </h2>
    <h2 v-else-if="route.params.error === '404'">
      Cut! This scene is missing. We can't find the page you're looking for. Perhaps it's waiting
      for a sequel?
    </h2>
    <router-link to="/" class="link">Go back to main page</router-link>
  </div>
</template>

<style lang="scss" scoped>
.description {
  padding-block: 1rem;
}
</style>
