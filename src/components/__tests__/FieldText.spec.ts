// FieldText.spec.ts
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import FieldText from '@/components/FieldText.vue'

test('FieldText - renders label and error message correctly', async () => {
  const wrapper = mount(FieldText, {
    props: {
      id: 'yourId',
      label: 'Your Label',
      bindingValue: {
        'onUpdate:modelValue': () => {}, // Mock the onUpdate:modelValue function
        modelValue: 'example', // Mock the modelValue
        "onBlur": () => {}
      },
      error: 'This is an error message',
    },
  })

  // Check if the label is rendered
  expect(wrapper.find('.label').text()).toBe('Your Label')

  // Check if the input has the correct id
  expect(wrapper.find('input').attributes('id')).toBe('yourId')

  // Check if the error message is rendered
  expect(wrapper.find('.error').text()).toBe('This is an error message')

  // Check if the input has the correct class when there is an error
  expect(wrapper.find('input').classes()).toContain('p-invalid')
})
