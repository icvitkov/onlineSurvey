<script setup lang="ts">
import SurveyForm from '@/components/SurveyForm.vue'
import { onMounted, ref } from 'vue'
import { useSurveyStore } from '@/store/surveyStore'

const surveyStore = useSurveyStore()
const surveyData = ref()

const fetchSurveyData = async () => {
  const { data, error, isFetching } = await surveyStore.fetchSurveyData()
  if (error.value) {
    console.log('error', error)
    return
  }
  surveyData.value = data.value
  console.log(surveyData.value)
}
onMounted(() => {
  fetchSurveyData()
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
