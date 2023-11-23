import { createFetch } from '@vueuse/core'
import router from '@/router'
import { useSurveyStore } from '@/store/surveyStore'

// Access the environment variable for the base API URL
const baseUrl = import.meta.env.VITE_BACKEND_API_URL

// Define your custom useFetch
const useMyFetch = createFetch({
  baseUrl,
  options: {
    onFetchError(ctx) {
      const surveyStore = useSurveyStore()
      // error response interceptor

      const statusCode = ctx.response?.status
      if (statusCode) {
        if (statusCode === 404) {
          // redirect to 404 page
          router.push('/error/404')
        }
        if (statusCode === 403) {
          // should not happen. something on frontend side is not validated correctly or the flow is bad
        }
        if (statusCode === 401) {
          // trigger soft logout
          // redirect to login screen
        }
        if (statusCode >= 500) {
          // redirect to 500 page
          router.push('/error/500')
        }
      }

      return ctx
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

// Export your custom useFetch function
export { useMyFetch }
