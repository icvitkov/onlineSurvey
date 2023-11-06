import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { registerSW } from 'virtual:pwa-register'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/soho-dark/theme.css'



const upateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
})


const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.mount('#app')
