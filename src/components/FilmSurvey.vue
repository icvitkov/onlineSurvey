<script setup lang="ts">
import SurveyForm from '@/components/SurveyForm.vue'
import { onMounted, ref } from 'vue'
import { useSurveyStore } from '@/store/surveyStore'
import type { SurveyAnswer } from '@/types'

const surveyStore = useSurveyStore()
const surveyData = ref()

const fetchSurveyData = async () => {
  const { data, error } = await surveyStore.fetchSurveyData()
  if (error.value) {
    console.log('error', error)
    return
  }
  surveyData.value = data.value
}
onMounted(() => {
  fetchSurveyData()
})

const submitSurvey = async (form: { film: string; review: number }) => {
  const payload: SurveyAnswer = {
    data: {
      type: 'surveyAnswers',
      attributes: {
        answers: [
          {
            questionId: 'film',
            answer: form.film
          },
          {
            questionId: 'review',
            answer: form.review
          }
        ]
      }
    }
  }
  const { data, error } = await surveyStore.submitSurveyAnswers(surveyData.value.data.id, payload)
}
</script>

<template>
  <div>
    <div v-if="surveyData && Object.keys(surveyData).length">
      <SurveyForm :survey-data="surveyData.data" @submit="submitSurvey" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
