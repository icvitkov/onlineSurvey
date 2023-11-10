<script setup lang="ts">
import { useForm } from 'vee-validate'
import Button from 'primevue/button'
import FieldText from '@/components/FieldText.vue'
import FieldRating from '@/components/FieldRating.vue'
import * as yup from 'yup'
import { ref } from 'vue'
import type { SurveyData } from '@/types/survey'

defineProps<{
  surveyData: SurveyData
}>()

const schema = yup.object({
  film: yup.string().required().label('Film name'),
  review: yup.string().required().label('Review')
})

const { defineComponentBinds, handleSubmit, resetForm, errors, values } = useForm({
  validationSchema: schema
})

const film = defineComponentBinds('film')
const review = defineComponentBinds('review')

const onSubmit = handleSubmit((values) => {
  console.log('Submitted with', values)
})
</script>

<template>
  <h1>{{ surveyData.title }}</h1>
  <div v-html="surveyData.description"></div>
  <form @submit="onSubmit">
    <div v-for="question in surveyData.questions" :key="question.questionId">
      <div v-if="question.questionType === 'text'">
        <FieldText
          :id="question.questionId"
          :label="question.label"
          :binding-value="film"
          :error="errors.film"
        />
      </div>

      <div
        v-else-if="
          question.questionType === 'rating' && question.attributes?.max && question.attributes.min
        "
        class="field"
      >
        <FieldRating
          :label="question.label"
          :binding-value="review"
          :max="question.attributes.max"
          :min="question.attributes.min"
          :error="errors.review"
        />
      </div>
    </div>

    <div class="footer">
      <Button label="Submit" type="submit" />

      <Button label="Reset" type="button" @click="resetForm()" class="p-button-secondary" />
    </div>
  </form>
</template>
