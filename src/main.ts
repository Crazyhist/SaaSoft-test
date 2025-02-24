import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { createVuetify } from 'vuetify'

import 'vuetify/styles'

import App from './App.vue'

const vuetify = createVuetify()
const pinia = createPinia()

const app = createApp(App)

app.use(vuetify)
app.use(pinia)
app.mount('#app')
