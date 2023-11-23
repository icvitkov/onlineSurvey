<script setup lang="ts">
import SurveyForm from '@/components/SurveyForm.vue'
import { ref } from 'vue'
import { useSurveyStore } from '@/store/surveyStore'
import type { SurveyAnswer } from '@/types'
import { useRouter } from 'vue-router'

const router = useRouter()

const surveyStore = useSurveyStore()
const surveyData = ref()

const fetchSurveyData = async () => {
  await surveyStore.fetchSurveyData()
  if (surveyStore.surveyQuestions.error) {
    console.log('error', surveyStore.surveyQuestions.error)
    return
  }
  surveyData.value = surveyStore.surveyQuestions.data
}

await fetchSurveyData()

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
  await surveyStore.submitSurveyAnswers(surveyData.value.data.id, payload)
  if (surveyStore.surveyAnswers.error) {
    console.log(surveyStore.surveyAnswers.error)
    return
  }
  router.push('/success')
}
</script>

<template>
  <section class="survey">
    <div v-if="surveyData && Object.keys(surveyData).length">
      <SurveyForm :survey-data="surveyData.data" @submit="submitSurvey" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.survey {
  padding-inline: 2rem;
}
</style>
