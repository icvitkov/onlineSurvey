<script setup lang="ts">
import { useForm } from 'vee-validate'
import Button from 'primevue/button'
import FieldText from '@/components/FieldText.vue'
import FieldRating from '@/components/FieldRating.vue'
import * as yup from 'yup'
import { ref } from 'vue'
import type { SurveyData } from '@/types/survey'

const props = defineProps<{
  surveyData: SurveyData
}>()

const emit = defineEmits<{
  (e: 'submit', form: { film: string; review: number }): void
}>()

const createValidationSchema = () => {
  let schemaFields: { [key: string]: any } = {}

  props.surveyData.questions.forEach((question) => {
    if (question.questionType === 'text') {
      schemaFields.film = question.required
        ? yup.string().required().label('Film name')
        : yup.string().label('Film name')
    } else if (question.questionType === 'rating') {
      schemaFields.review = question.required
        ? yup.string().required().label('Review')
        : yup.string().label('Review')
    }
  })

  return yup.object().shape(schemaFields)
}

const validationSchema = ref(createValidationSchema())

const { defineComponentBinds, handleSubmit, resetForm, errors } = useForm({
  validationSchema
})

const film = defineComponentBinds('film')
const review = defineComponentBinds('review')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  emit('submit', { film: film.value.modelValue, review: review.value.modelValue })
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
