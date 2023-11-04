import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'

const upateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
})


const app = createApp(App)

app.use(router)

app.mount('#app')
