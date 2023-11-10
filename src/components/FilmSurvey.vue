<script setup lang="ts">
import SurveyForm from '@/components/SurveyForm.vue'
import type { SurveyData } from '@/types'
import { onMounted, ref } from 'vue'
import { useFetch } from '@vueuse/core'

const surveyData = ref()

// Use useFetch to fetch data from the JSON server
const { data, error, loading } = await useFetch('http://localhost:3000/survey').json()

// Load the data into the surveyData ref when it's available
onMounted(() => {
  if (data.value) {
    try {
      surveyData.value = data.value
      console.log(typeof data.value)
    } catch (e) {
      console.error('Error parsing JSON:', e)
    }
  }
})
</script>

<template>
  <div>
    <div v-if="surveyData && Object.keys(surveyData).length">
      <SurveyForm :survey-data="surveyData.data" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
