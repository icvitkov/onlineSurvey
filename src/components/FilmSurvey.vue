<script setup lang="ts">
import type { SurveyAnswer, BackendValidationError } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/store/surveyStore'
import { useToast } from 'primevue/usetoast'
import SurveyForm from '@/components/SurveyForm.vue'
import Toast from 'primevue/toast'

const toast = useToast()

const router = useRouter()

const surveyStore = useSurveyStore()
const surveyData = ref()

const fetchSurveyData = async () => {
  await surveyStore.fetchSurveyData()
  if (surveyStore.surveyQuestions.data.error) {
    // usually handled in interceptors
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
  if (surveyStore.surveyAnswers.error?.data.errors) {
    surveyStore.surveyAnswers.error?.data.errors.forEach((error: BackendValidationError) => {
      const parts = error.source.pointer.split('/')
      const errorField = parts[parts.length - 1].toUpperCase()

      toast.add({
        severity: 'error',
        summary: errorField,
        detail: error.detail,
        life: 3000
      })
    })
    return
  }
  router.push('/success')
}
</script>

<template>
  <section class="survey">
    <Toast />
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
