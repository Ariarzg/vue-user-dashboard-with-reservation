import DashboardPage from '@/views/DashboardPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LoginPage, name: 'Login' },
    { path: '/signup', component: SignupPage, name: 'Sign Up' },
    { path: '/dashboard', component: DashboardPage, name: 'Dashboard' },
  ],
});

export default router;
