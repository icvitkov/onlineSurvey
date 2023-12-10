import { defineStore } from 'pinia'
import type { Question, SurveyAnswer, SurveyData } from '@/types'
import { useMyFetch } from '@/api/api'
import { ref } from 'vue'

export const useSurveyStore = defineStore('survey', () => {
  const error = ref()
  const surveyQuestions = ref()
  const surveyAnswers = ref()

  const fetchSurveyData = async () => {
    const { data, error } = await useMyFetch<SurveyData>('/survey').json()
    surveyQuestions.value = { data, error }
  }

  const fetchSurveyAnswers = async () => {
    const { data, error } = await useMyFetch<SurveyAnswer[]>('/answers').json()
    surveyAnswers.value = { data, error }
  }

  const submitSurveyAnswers = async (id: string, payload: SurveyAnswer) => {
    const { data, error } = await useMyFetch(`/survey/${id}/answers`).post(payload).json()
    surveyAnswers.value = { data, error }
  }

  const mergedData = async () => {
    if (!surveyQuestions.value?.data?.data) {
      await fetchSurveyData()
    }

    if (!surveyAnswers.value?.data?.data) {
      await fetchSurveyAnswers()
    }
    const questions = surveyQuestions.value.data?.data.questions
    const answers = surveyAnswers.value?.data.answers
    return answers.map((answer: any) => {
      const question = questions.find((q: Question) => q.questionId === answer.questionId)
      return {
        label: question ? question.label : '',
        answer: answer.answer
      }
    })
  }

  return {
    error,
    surveyQuestions,
    surveyAnswers,
    mergedData,
    fetchSurveyData,
    submitSurveyAnswers
  }
})
