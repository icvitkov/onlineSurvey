<script setup lang="ts">
import { useSurveyStore } from '@/store/surveyStore'
import { onMounted, ref } from 'vue'

const surveyStore = useSurveyStore()
const surveyResults = ref()

onMounted(async () => {
  surveyResults.value = await surveyStore.mergedData()
})
</script>

<template>
  <section class="success">
    <h1 class="title">Thank You!</h1>
    <h3 class="subtitle">These were your answers:</h3>
    <div v-for="(survey, index) in surveyResults" :key="index" class="answer">
      <p class="question">{{ index + 1 }}. {{ survey?.label }}</p>
      <p>{{ survey?.answer }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.success {
  padding-inline: 2rem;
}
.title {
  padding-block-end: 2rem;
}

.subtitle,
.answer {
  padding-block-end: 1rem;
}

.question {
  font-weight: bold;
}
</style>
