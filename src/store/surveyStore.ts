import { defineStore } from 'pinia'
import type { SurveyAnswer, SurveyData } from '@/types'
import { useMyFetch } from '@/api/api'

export const useSurveyStore = defineStore('survey', () => {
  const fetchSurveyData = async () => {
    return useMyFetch<SurveyData>('/survey').json()
  }

  const submitSurveyAnswers = async (id: string, payload: SurveyAnswer) => {
    return useMyFetch(`/survey/${id}/answers`).post(payload).json()
  }

  return {
    fetchSurveyData,
    submitSurveyAnswers
  }
})
