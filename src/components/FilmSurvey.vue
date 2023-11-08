<script setup lang="ts">
import SurveyForm from '@/components/SurveyForm.vue'
import type { SurveyData } from '@/types'
import { onMounted, ref } from 'vue'

const surveyData = ref({} as SurveyData)

// Function to simulate fetching data with a delay and setting surveyData
function fetchSurveyDataWithDelay() {
  // Mock delay to simulate fetching data
  const delay = 10000 // delay in milliseconds

  setTimeout(() => {
    surveyData.value = {
      data: {
        type: 'surveys',
        id: '2660dd24-e2db-42c1-8093-284b1df2664c',
        attributes: {
          title: 'Film feedback form',
          description:
            '<p>Thank you for participating in the film festival!</p><p>Please fill out this short survey so we can record your feedback.</p>',
          questions: [
            {
              questionId: 'film',
              questionType: 'text',
              label: 'What film did you watch?',
              required: true,
              attributes: null
            },
            {
              questionId: 'review',
              questionType: 'rating',
              label: 'How would you rate the film? (1 - Very bad, 5 - Very good)',
              required: true,
              attributes: {
                min: 1,
                max: 5
              }
            }
          ]
        }
      }
    }
  }, delay)
}

// Use onMounted lifecycle hook to fetch data after component is mounted
onMounted(() => {
  fetchSurveyDataWithDelay()
})
</script>

<template>
  <div v-if="Object.keys(surveyData).length">
    <SurveyForm :survey-data="surveyData" />
  </div>
</template>

<style lang="scss" scoped></style>
