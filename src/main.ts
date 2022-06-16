import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './tailwind.scss'
import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
