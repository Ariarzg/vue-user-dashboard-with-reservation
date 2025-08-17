<script setup>
import { useLayoutStore } from '@/stores/layout';
import { userReservationStore } from '@/stores/reservation';
import { useUserStore } from '@/stores/user';
import { Button, useToast } from 'primevue';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const reservationStore = userReservationStore();
const layoutStore = useLayoutStore();
const toast = useToast();
const router = useRouter();

const userName = userStore.currentUser.name;
const reservations = computed(() => {
  return userStore.currentUser.reservations;
});

function logoutUser() {
  const logoutResponse = userStore.logoutUser();
  if (logoutResponse.valid) {
    router.push('/');
    toast.add({
      severity: 'success',
      detail: logoutResponse.message,
      summary: 'Account',
      life: 3000,
    });
  } else {
    toast.add({
      severity: 'warn',
      detail: logoutResponse.message,
      summary: 'Account',
      life: 3000,
    });
  }
}

function cancelReservation(reservationId) {
  reservationStore.cancelReservation(reservationId);
}

onMounted(() => {
  layoutStore.setPrimary('rose');
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 mt-[5svh]">
    <h1>
      Welcome back,
      <span class="font-bold text-primary-600 dark:text-primary-400">{{ userName }}</span>
    </h1>
    <div
      class="w-2xs p-4 rounded-2xl shadow-sm shadow-surface-300/50 dark:shadow-surface-800/50 inset-shadow-sm inset-shadow-surface-600/20 dark:inset-shadow-surface-300/50"
    >
      <RouterLink to="/reservation" class="underline underline-offset-4 font-bold"
        >Reservations:</RouterLink
      >
      <div class="mt-4 flex items-center w-full justify-between" v-if="reservations.length === 0">
        <p>No Reservations:</p>
        <Button severity="contrast" @click.prevent="router.push('/reservation')">Reserve</Button>
      </div>
      <div v-else class="mt-4 flex flex-col gap-4">
        <div
          v-for="reservation in reservations"
          :key="reservation.id"
          class="p-2 bg-surface-200/60 dark:bg-surface-900/60 rounded-md flex items-center justify-between"
        >
          <p>{{ reservation.time }}</p>
          <Button severity="warn" @click.prevent="cancelReservation(reservation.id)">Cancel</Button>
        </div>
      </div>
    </div>
    <Button severity="danger" type="button" @click.prevent="logoutUser">Logout</Button>
  </div>
</template>
