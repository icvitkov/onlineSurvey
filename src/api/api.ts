import { createFetch } from '@vueuse/core'
import router from '@/router' // Import your Vue Router instance

// Access the environment variable for the base API URL
const baseUrl = import.meta.env.VITE_BACKEND_API_URL

// Define your custom useFetch
const useMyFetch = createFetch({
  baseUrl,
  options: {
    onFetchError(ctx) {
      // error response interceptor

      const requestUrl = ctx.data?.requestUrl
      const statusCode = ctx.response?.status
      if (statusCode) {
        /* if (statusCode === 404) {
          // redirect to 404 page
          router.push('/404')
        } */
        if (statusCode === 403) {
          // should not happen. something on frontend side is not validated correctly or the flow is bad
        }
        if (statusCode === 401) {
          // trigger soft logout
          // redirect to login screen
        }
        /* if (statusCode >= 500) {
          if (requestUrl && requestUrl.includes('/api/v1/survey')) {
            // Mock 500 response specifically for '/api/v1/survey'
            ctx.error.title = 'Internal Server Error'
            ctx.error.data = {
              errors: [
                {
                  title: 'Internal Server Error',
                  detail: "Something went wrong. We're working on it!"
                }
              ]
            }
          } else {
            // Redirect to maintenance page for other 500 errors
          }
        } */
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
