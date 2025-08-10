import './assets/styles/main.css';

import { createApp } from 'vue';

import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { ToastService } from 'primevue';

//---------------------------------------

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersistedState);

app.use(pinia);

app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.p-dark',
    },
  },
});
app.use(ToastService);

app.mount('#app');
