import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userReservationStore = defineStore(
  'reservation',
  () => {
    const reservations = ref([
      {
        id: 0,
        time: 'Saturday 10:00 AM',
        reservedBy: null,
      },
      {
        id: 1,
        time: 'Saturday 03:00 PM',
        reservedBy: null,
      },
      {
        id: 2,
        time: 'Sunday 11:00 AM',
        reservedBy: null,
      },
      {
        id: 3,
        time: 'Monday 02:00 PM',
        reservedBy: null,
      },
      {
        id: 4,
        time: 'Tuesday 09:00 AM',
        reservedBy: null,
      },
    ]);

    function getReservation(reservationIndex) {
      let wantedReservation = null;
      reservations.value.forEach((reservation, index) => {
        if (reservationIndex === index) {
          wantedReservation = reservation;
        }
      });
      return wantedReservation;
    }

    return {
      reservations,
      getReservation,
    };
  },
  {
    persist: {
      key: 'reservations',
      pick: ['reservations'],
    },
  },
);
