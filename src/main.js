import { inject } from '@vercel/analytics'
import { createApp } from 'vue'

import './assets/css/index.css'

import App from './App.vue'

createApp(App).mount('#app')

inject()
