import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/error/404' } // Catch-all route
  ]
})

export default router
