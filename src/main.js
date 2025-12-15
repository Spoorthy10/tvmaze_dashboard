import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './css/tailwind.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

// createApp(App).mount('#app')
createApp(App)
  .use(router).use(pinia)
  .mount('#app')
