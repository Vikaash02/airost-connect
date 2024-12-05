import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

// Dispatch the action to initialize the default admin user if not exists
store.dispatch('initializeDefaultAdmin')

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
