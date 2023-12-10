import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import SurveyForm from '@/components/SurveyForm.vue'

test('SurveyForm - component is mounted', async () => {
  const surveyData = {
    id: 'id',
    title: 'Survey Title',
    description: '<p>Survey Description</p>',
    questions: [
      {
        questionId: 'film',
        label: 'What film did you watch?',
        questionType: 'text',
        required: true,
        attributes: null
      },
      {
        questionId: "review",
        questionType: "rating",
        label: "How would you rate the film? (1 - Very bad, 5 - Very good)",
        required: true,
        attributes: {
          min: 1,
          max: 5
        }
      }
    ],
  }

  const wrapper = mount(SurveyForm, {
    props: {
      surveyData,
    },
  })

    // Check if the component is mounted
    expect(wrapper.exists()).toBe(true)
})
