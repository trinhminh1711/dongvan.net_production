
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import 'vue3-toastify/dist/index.css'
import Vue3Toastify, { toast } from 'vue3-toastify'
import router from './router'
import { QuillEditor } from '@vueup/vue-quill'
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth";
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App)
const pinia = createPinia();
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('QuillEditor', QuillEditor)
app.use(Vue3Toastify, {
  timeout: 2000, // 2s
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  position: "top-right"
})
app.use(ElementPlus)
const userStore = useAuthStore();
if (userStore.token) {
  await userStore.fetchProfile();
}
app.use(router)
app.mount('#app')
