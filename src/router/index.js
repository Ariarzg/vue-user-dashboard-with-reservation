import DashboardPage from '@/views/DashboardPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

import { useToast } from 'primevue';

import { useUserStore } from '@/stores/user';
import ReservationPage from '@/views/ReservationPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LoginPage, name: 'Login' },
    { path: '/signup', component: SignupPage, name: 'Sign Up' },
    {
      path: '/dashboard',
      component: DashboardPage,
      name: `Dashboard`,
    },
    {
      path: '/reservation',
      component: ReservationPage,
      name: 'Reservation',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const toast = useToast();
  if ((to.name === 'Dashboard' || to.name === 'Reservation') && !userStore.currentUser) {
    toast.add({
      severity: 'error',
      detail: 'You are not authorized. Please Login First.',
      summary: 'Account',
      life: 6000,
    });
    next('/');
  } else {
    next();
  }

  if (to.path === '/dashboard' && userStore.currentUser) {
    to.name = `${userStore.currentUser.name}'s Dashboard`;
  }
});

export default router;
