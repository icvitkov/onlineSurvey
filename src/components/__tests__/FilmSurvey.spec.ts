import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import FilmSurvey from '@/components/FilmSurvey.vue'

test('FilmSurvey - component is mounted', async () => {
  const wrapper = mount(FilmSurvey)

  // Check if the component is mounted
  expect(wrapper.exists()).toBe(true)
})
