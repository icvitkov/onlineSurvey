// FieldRating.spec.ts
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import FieldRating from '@/components/FieldRating.vue' // Update the path based on your actual project structure



test('FieldRating - renders the component with labels and radio buttons', async () => {
  const wrapper = mount(FieldRating, {
    props: {
      label: 'Rating Label',
      min: 1,
      max: 5,
      bindingValue: {
        'onUpdate:modelValue': () => {}, // Mock the onUpdate:modelValue function
        modelValue: 3,
        'onBlur': () => {}
      },
    },
  })

  // Check if the label is rendered
  expect(wrapper.find('.label').text()).toBe('Rating Label')

  // Check if the radio buttons and labels are rendered correctly
  for (let rate = 1; rate <= 5; rate++) {
    expect(wrapper.find(`#rate${rate}`).exists()).toBe(true)
    expect(wrapper.find(`[for=rate${rate}]`).text()).toBe(rate.toString())
  }
})

test('FieldRating - displays an error message when an error prop is provided', async () => {
  const wrapper = mount(FieldRating, {
    props: {
      label: 'Rating Label',
      min: 1,
      max: 5,
      bindingValue: {
        'onUpdate:modelValue': () => {}, 
        modelValue: 3, 
        'onBlur': () => {}
      },
      error: 'This is an error message',
    },
  })

  // Check if the error message is rendered
  expect(wrapper.find('.error').text()).toBe('This is an error message')
})
