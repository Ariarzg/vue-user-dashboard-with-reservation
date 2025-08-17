import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from './user';

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

    const userStore = useUserStore();

    function reserveForUser(reservationId) {
      console.log('called reserveUser in reserve store');

      let wantedReservation = _getReservation(reservationId);
      console.log(wantedReservation);

      if (wantedReservation) {
        wantedReservation.reservedBy = userStore.currentUser.email;

        userStore.addReservation(wantedReservation);

        return {
          valid: true,
          message: 'Reservation successfully added to your profile dashboard.',
        };
      } else {
        return {
          valid: false,
          message: 'Unknown Error.',
        };
      }
    }

    function cancelReservation(reservationId) {
      userStore.cancelReservation(reservationId);
      let wantedReservation = _getReservation(reservationId);
      wantedReservation.reservedBy = null;
    }

    function _getReservation(reservationId) {
      let wantedReservation = null;

      reservations.value.forEach((reservation) => {
        if (reservation.id === reservationId) {
          wantedReservation = reservation;
        }
      });

      return wantedReservation;
    }

    return {
      reservations,
      reserveForUser,
      cancelReservation,
    };
  },
  {
    persist: {
      key: 'reservations',
      pick: ['reservations'],
    },
  },
);
