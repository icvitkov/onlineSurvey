import { defineStore } from 'pinia'
import type { SurveyData } from '@/types'
import { useMyFetch } from '@/api/api'

export const useSurveyStore = defineStore('survey', () => {
  async function fetchSurveyData() {
    return useMyFetch<SurveyData>('http://localhost:3000/survey').json()
  }

  return {
    fetchSurveyData,
  }
})
