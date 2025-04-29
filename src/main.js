import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores'
import { inject } from '@vercel/analytics'
import { createApp } from 'vue'

import '@/assets/css/index.css'

import { useDiaryStore } from '@/stores/diary'

const app = createApp(App)

app.use(pinia)
app.use(router)

// Load initial data
const diaryStore = useDiaryStore()
diaryStore.loadData()

inject()
app.mount('#app')
