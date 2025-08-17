<script setup>
import { useLayoutStore } from '@/stores/layout';
import { userReservationStore } from '@/stores/reservation';
import { Button, useToast } from 'primevue';
import { onMounted } from 'vue';

const reservationStore = userReservationStore();
const layoutStore = useLayoutStore();

const toast = useToast();

const reservations = reservationStore.reservations;

function reserve(reservationId) {
  const reservationResponse = reservationStore.reserveForUser(reservationId);

  if (reservationResponse.valid) {
    toast.add({
      severity: 'success',
      summary: 'Reservation',
      detail: reservationResponse.message,
      life: 3000,
    });
  } else {
    toast.add({
      severity: 'error',
      summary: 'Reservation',
      detail: reservationResponse.message,
      life: 3000,
    });
  }
}

onMounted(() => {
  layoutStore.primary = 'violet';
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 mt-[20svh]">
    <ul class="flex flex-col gap-2 max-w-2xs w-full">
      <li
        v-for="(reservation, index) in reservations"
        :key="index"
        class="flex justify-between items-center p-2 rounded-xl bg-primary-300 dark:bg-primary-900"
      >
        <p class="text-sm">{{ reservation.time }}</p>
        <Button
          :disabled="reservation.reservedBy !== null"
          @click.prevent="reserve(reservation.id)"
          >{{ reservation.reservedBy ? 'Reserved' : 'Reserve' }}</Button
        >
      </li>
    </ul>
  </div>
</template>
